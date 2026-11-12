import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { generateSocialImages, hash } from '../scripts/social-images.mjs';

test('social images rebuild only changed inputs and verify committed output without writing', async (t) => {
    const siteRoot = await mkdtemp(join(tmpdir(),'brewerlogic-social-test-'));
    t.after(() => rm(siteRoot,{recursive:true,force:true}));
    for (const path of ['assets/fonts','assets/css','package-lock.json']) {
        const target = join(siteRoot,path);
        await mkdir(join(target,'..'),{recursive:true});
        await cp(new URL(`../${path}`,import.meta.url),target,{recursive:true});
    }
    const content = join(siteRoot,'src/content/blog');
    await mkdir(content,{recursive:true});
    const post = (title='First title', extra='') => `---\ntitle: ${title}\ndescription: A practical description.\n${extra}---\nPost body.\n`;
    await writeFile(join(content,'first.md'),post());
    await writeFile(join(content,'second.md'),post('Second title'));
    await writeFile(join(content,'draft.md'),post('Private draft','draft: true\n'));
    await writeFile(join(content,'custom.md'),post('Custom image','image:\n  url: https://example.com/custom.png\n  alt: Custom\n'));
    const run = (check=false) => generateSocialImages({siteRoot,check});
    const manifest = async () => JSON.parse(await readFile(join(siteRoot,'src/data/social-images.json'),'utf8'));
    const imagePath = (entry) => join(siteRoot,entry.url);

    assert.deepEqual(await run(),{generated:3,skipped:0,total:3});
    const before = await manifest();
    assert.deepEqual(Object.keys(before),['listing','post:first','post:second']);
    for (const entry of Object.values(before)) {
        const png = await readFile(imagePath(entry));
        assert.equal(png.readUInt32BE(16),1200);
        assert.equal(png.readUInt32BE(20),630);
        assert.equal(hash(png),entry.pngHash);
    }
    const originalStat = await stat(imagePath(before['post:first']));
    assert.deepEqual(await run(),{generated:0,skipped:3,total:3});
    await run(true);
    assert.equal((await stat(imagePath(before['post:first']))).mtimeMs,originalStat.mtimeMs);

    await writeFile(join(content,'first.md'),post('Changed title'));
    await assert.rejects(run(true),/Social images are stale: post:first/);
    assert.deepEqual(await manifest(),before,'Check mode must not rewrite the manifest');
    assert.deepEqual(await run(),{generated:1,skipped:2,total:3});
    const changed = await manifest();
    assert.notEqual(changed['post:first'].inputHash,before['post:first'].inputHash);
    assert.equal(changed['post:first'].seedHash,before['post:first'].seedHash,'Title edits preserve the waveform');
    assert.notEqual(changed['post:first'].pngHash,before['post:first'].pngHash);
    assert.deepEqual(changed['post:second'],before['post:second']);
    assert.notEqual(changed['post:first'].seedHash,changed['post:second'].seedHash);
    await assert.rejects(readFile(imagePath(before['post:first'])),{code:'ENOENT'});

    await writeFile(imagePath(changed['post:first']),'damaged');
    await assert.rejects(run(true),/Social images are stale: post:first/);
    assert.equal(await readFile(imagePath(changed['post:first']),'utf8'),'damaged');
    assert.equal((await run()).generated,1);
    assert.equal((await manifest())['post:first'].pngHash,changed['post:first'].pngHash);
    await rm(imagePath(changed['post:second']));
    await assert.rejects(run(true),/post:second/);
    assert.equal((await run()).generated,1);

    const palette = join(siteRoot,'assets/css/palette.css');
    await writeFile(palette,(await readFile(palette,'utf8')).replace('#00e5ff','#00d5ee'));
    assert.equal((await run()).generated,3,'Palette changes invalidate every image');
    await writeFile(join(content,'first.md'),post('Changed title','draft: true\n'));
    await rm(join(content,'second.md'));
    await assert.rejects(run(true),/Social images are stale/);
    assert.deepEqual(await run(),{generated:0,skipped:1,total:1});
    assert.deepEqual(Object.keys(await manifest()),['listing']);
    assert.equal((await readdir(join(siteRoot,'assets/img/social'))).length,1);
    await run(true);

    await writeFile(join(content,'merged-draft.md'),'---\ndefaults: &defaults\n  draft: true\n<<: *defaults\ntitle: Inherited private draft\ndescription: Private description\n---\n');
    assert.deepEqual(await run(),{generated:0,skipped:1,total:1});
    assert.deepEqual(Object.keys(await manifest()),['listing'],'Inherited drafts must not produce public assets');
    await writeFile(join(content,'toml.md'),'+++\ntitle = "TOML article"\ndescription = "A supported format."\n+++\n');
    await writeFile(join(content,'whitespace.md'),'\n  \n'+post('Leading whitespace'));
    assert.deepEqual(await run(),{generated:2,skipped:1,total:3});
    assert.deepEqual(Object.keys(await manifest()),['listing','post:toml','post:whitespace']);
    await run(true);
});
