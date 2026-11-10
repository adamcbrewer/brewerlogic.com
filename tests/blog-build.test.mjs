import assert from 'node:assert/strict';
import { execFile, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';
import { parse } from 'parse5';
import sax from 'sax';

const execute = promisify(execFile);
const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://brewerlogic.com';
const articlePath = '/blog/build-check/published/';
const plainPath = '/blog/build-check/plain/';
const title = 'Build check [article] </script> & "quotes"';
const description = 'A published article & its metadata.';
const body = '\nPublished fixture body.\n\n## Details\n\n- A list item\n\n```js\nconst value = "<raw> & code";\n```\n\n[Thoughts](/blog/) and [work](/#work).\n';
const draftMarker = 'BUILD_CHECK_UNPUBLISHED_SECRET';
const fixtures = {
    'published.md': `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\npubDate: 2024-01-01\nupdatedDate: 2024-02-03\ndraft: false\nimage:\n  url: ${origin}/assets/img/logo-og.png\n  alt: A fixture image\n---\n${body}`,
    'plain.md': '---\ntitle: Plain build check\ndescription: Optional metadata omitted\npubDate: 2023-01-01\n---\n\nPlain fixture body.\n',
    'draft.md': `---\ntitle: ${draftMarker}\ndescription: Draft fixture\npubDate: 2025-01-01\ndraft: true\n---\n\n${draftMarker}\n`,
};

function nodes(node) {
    return [node, ...(node.childNodes ?? []).flatMap(nodes), ...(node.content ? nodes(node.content) : [])];
}

function elements(document, tag) {
    return nodes(document).filter((node) => node.tagName === tag);
}

function attribute(node, name) {
    return node.attrs?.find((entry) => entry.name === name)?.value;
}

function text(node) {
    return node.value ?? (node.childNodes ?? []).map(text).join('');
}

function meta(document, key) {
    const matches = elements(document, 'meta').filter((node) =>
        attribute(node, 'name') === key || attribute(node, 'property') === key,
    );
    assert.equal(matches.length, 1, `Expected exactly one ${key} meta tag`);
    return attribute(matches[0], 'content');
}

function links(document, rel) {
    return elements(document, 'link').filter((node) => attribute(node, 'rel') === rel);
}

function sitemapEntries(source) {
    const parser = sax.parser(true, { xmlns: true });
    const entries = [];
    let entry;
    let field;
    parser.onopentag = (node) => {
        assert.equal(node.uri, 'http://www.sitemaps.org/schemas/sitemap/0.9');
        if (node.local === 'url') entry = {};
        field = ['loc', 'lastmod'].includes(node.local) ? node.local : undefined;
    };
    parser.ontext = (value) => {
        if (entry && field) entry[field] = (entry[field] ?? '') + value;
    };
    parser.onclosetag = (name) => {
        if (name.split(':').at(-1) === 'url') entries.push(entry);
        field = undefined;
    };
    parser.write(source).close();
    assert.ok(entries.length, 'The sitemap must contain URLs');
    assert.equal(new Set(entries.map((item) => item.loc)).size, entries.length, 'Duplicate sitemap URL');
    return entries;
}

async function files(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    return (await Promise.all(entries.map((entry) => {
        const path = join(directory, entry.name);
        return entry.isDirectory() ? files(path) : [path];
    }))).flat();
}

async function readPage(dist, path) {
    return parse(await readFile(join(dist, path, 'index.html'), 'utf8'), { scriptingEnabled: false });
}

async function checkInternalLinks(dist) {
    const documents = new Map();
    for (const path of (await files(dist)).filter((path) => path.endsWith('.html'))) {
        documents.set(path, parse(await readFile(path, 'utf8'), { scriptingEnabled: false }));
    }
    let count = 0;
    for (const [path, document] of documents) {
        const base = new URL(relative(dist, path).replaceAll('\\', '/'), `${origin}/`);
        for (const node of nodes(document)) {
            for (const key of ['href', 'src']) {
                const value = attribute(node, key);
                if (!value) continue;
                const url = new URL(value, base);
                if (url.origin !== origin) continue;
                let file = join(dist, decodeURIComponent(url.pathname));
                if (existsSync(file) && (await stat(file)).isDirectory()) file = join(file, 'index.html');
                assert.ok(existsSync(file), `${base.pathname}: missing ${value}`);
                if (url.hash && documents.has(file)) {
                    const id = decodeURIComponent(url.hash.slice(1));
                    assert.ok(nodes(documents.get(file)).some((node) => attribute(node, 'id') === id), `${base.pathname}: missing anchor ${value}`);
                }
                count++;
            }
        }
    }
    assert.ok(count > 0, 'No internal links were checked');
}

test('static blog release builds', { timeout: 180_000 }, async (t) => {
    const site = await mkdtemp(join(tmpdir(), 'brewerlogic-build-test-'));
    t.after(() => rm(site, { recursive: true, force: true }));
    const { stdout } = await execute('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { cwd: root });
    await Promise.all(stdout.split('\0').filter((path) => path && existsSync(join(root, path))).map(async (path) => {
        await mkdir(dirname(join(site, path)), { recursive: true });
        await cp(join(root, path), join(site, path));
    }));
    await symlink(join(root, 'node_modules'), join(site, 'node_modules'), 'dir');
    const content = join(site, 'src/content/blog');
    const fixtureDirectory = join(content, 'build-check');
    assert.ok(!existsSync(fixtureDirectory), 'Fixture directory conflicts with site content');
    await mkdir(fixtureDirectory);
    await Promise.all(Object.entries(fixtures).map(([name, source]) => writeFile(join(fixtureDirectory, name), source)));
    const dist = join(site, 'dist');
    const sourceHomepage = await readFile(join(site, 'index.html'), 'utf8');
    const originalSitemap = await readFile(join(site, 'src/data/sitemap.xml'), 'utf8');
    const originalIndex = await readFile(join(site, 'src/data/llms.txt'), 'utf8');

    const buildEnvironment = { ...process.env };
    delete buildEnvironment.BLOG_PUBLIC;

    async function build() {
        try {
            await execute('npm', ['run', 'build'], {
                cwd: site,
                env: buildEnvironment,
                timeout: 60_000,
                maxBuffer: 4 * 1024 * 1024,
            });
        } catch (error) {
            throw new Error(`Build failed:\n${error.stdout ?? ''}\n${error.stderr ?? ''}`, { cause: error });
        }
    }

    await t.test('default build: indexing, navigation, metadata, discovery and draft exclusion', async () => {
        await build();
        const homepage = await readPage(dist, '/');
        const navItems = elements(homepage, 'li').filter((node) => attribute(node, 'data-blog-link') !== undefined);
        assert.equal(navItems.length, 3);
        assert.deepEqual(navItems.map((node) => attribute(node, 'hidden') !== undefined), [false, false, false]);
        assert.equal(await readFile(join(site, 'index.html'), 'utf8'), sourceHomepage);
        const listing = await readPage(dist, '/blog/');
        assert.ok(text(listing).indexOf(title) < text(listing).indexOf('Plain build check'));
        for (const path of ['/blog/', articlePath, plainPath]) {
            const document = await readPage(dist, path);
            assert.equal(meta(document, 'robots'), 'index, follow');
            assert.deepEqual(links(document, 'canonical').map((node) => attribute(node, 'href')), [origin + path]);
            assert.deepEqual(links(document, 'describedby').map((node) => attribute(node, 'href')), ['/llms.txt']);
            assert.equal(meta(document, 'og:url'), origin + path);
            assert.equal(meta(document, 'og:type'), path === '/blog/' ? 'website' : 'article');
            assert.equal(meta(document, 'og:title'), meta(document, 'twitter:title'));
            assert.equal(meta(document, 'description'), meta(document, 'og:description'));
            assert.equal(meta(document, 'description'), meta(document, 'twitter:description'));
            const data = elements(document, 'script').filter((node) => attribute(node, 'type') === 'application/ld+json');
            if (path === '/blog/') {
                assert.equal(data.length, 0);
                continue;
            }
            assert.equal(data.length, 1);
            const article = JSON.parse(text(data[0]));
            assert.equal(article['@type'], 'BlogPosting');
            assert.equal(article.author.name, 'Adam Brewer');
            assert.equal(article.url, origin + path);
            assert.equal(article.mainEntityOfPage, origin + path);
            assert.equal(article.description, meta(document, 'description'));
            const alternates = links(document, 'alternate').filter((node) => attribute(node, 'type') === 'text/markdown');
            assert.deepEqual(alternates.map((node) => attribute(node, 'href')), [path + 'index.md']);
            const markdown = await readFile(join(dist, path, 'index.md'), 'utf8');
            assert.ok(markdown.includes(`Canonical: ${origin}${path}`) && markdown.includes('Author: Adam Brewer'));
            assert.ok(!markdown.startsWith('---') && !markdown.includes('draft:'));
            if (path === articlePath) {
                assert.equal(article.headline, title);
                assert.equal(meta(document, 'description'), description);
                assert.equal(article.datePublished, '2024-01-01T00:00:00.000Z');
                assert.equal(article.dateModified, '2024-02-03T00:00:00.000Z');
                assert.equal(article.image, `${origin}/assets/img/logo-og.png`);
                assert.equal(article.image, meta(document, 'og:image'));
                assert.equal(article.image, meta(document, 'twitter:image'));
                assert.equal(meta(document, 'og:image:alt'), 'A fixture image');
                assert.equal(meta(document, 'twitter:image:alt'), 'A fixture image');
                assert.equal(meta(document, 'twitter:card'), 'summary_large_image');
                assert.deepEqual(elements(document, 'time').map((node) => attribute(node, 'datetime')), [article.datePublished, article.dateModified]);
                assert.ok(text(document).includes('Updated') && text(document).includes('Published fixture body.'));
                assert.ok(markdown.includes(body.trim()) && markdown.includes('Updated: 2024-02-03'));
            } else {
                assert.equal(article.datePublished, '2023-01-01T00:00:00.000Z');
                assert.ok(!('dateModified' in article) && !('image' in article));
                assert.ok(!elements(document, 'meta').some((node) => attribute(node, 'property') === 'og:image'));
                assert.equal(meta(document, 'twitter:card'), 'summary');
                assert.ok(markdown.includes('Plain fixture body.'));
            }
        }
        const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
        const index = await readFile(join(dist, 'llms.txt'), 'utf8');
        const entries = sitemapEntries(sitemap);
        const byURL = new Map(entries.map((entry) => [entry.loc, entry]));
        for (const entry of sitemapEntries(originalSitemap)) assert.deepEqual(byURL.get(entry.loc), entry);
        assert.deepEqual(byURL.get(origin + '/blog/'), { loc: origin + '/blog/' });
        assert.equal(byURL.get(origin + articlePath).lastmod, '2024-02-03T00:00:00.000Z');
        assert.equal(byURL.get(origin + plainPath).lastmod, '2023-01-01T00:00:00.000Z');
        assert.ok(index.startsWith(originalIndex.trimEnd()));
        for (const path of [articlePath, plainPath]) assert.ok(index.includes(origin + path + 'index.md'));
        assert.ok(!existsSync(join(dist, 'blog/build-check/draft')));
        for (const path of await files(dist)) assert.ok(!(await readFile(path)).includes(Buffer.from(draftMarker)), `Draft leaked into ${path}`);
        for (const path of ['src', 'package.json', 'scripts']) assert.ok(!existsSync(join(dist, path)));
        for (const path of await files(join(site, '.site-public'))) {
            assert.deepEqual(await readFile(join(dist, relative(join(site, '.site-public'), path))), await readFile(path));
        }
        for (const path of ['index.md', '404.html', 'privacy/index.html', 'portfolio/index.html', 'case-studies/meshii/index.html', 'case-studies/ai-engineering/index.html', 'robots.txt', 'Adam-Brewer-Senior-Full-Stack-Engineer-CV.pdf']) {
            assert.deepEqual(await readFile(join(dist, path)), await readFile(join(site, path)));
        }
        await checkInternalLinks(dist);
    });

    await t.test('development previews stay unindexed and omit Markdown discovery', { timeout: 45_000 }, async (t) => {
        const server = spawn(process.execPath, [join(site, 'node_modules/astro/bin/astro.mjs'), 'dev', '--host', '127.0.0.1', '--port', '0'], {
            cwd: site,
            env: buildEnvironment,
            stdio: ['ignore', 'pipe', 'pipe'],
        });
        const stopped = new Promise((resolve) => server.once('exit', resolve));
        t.after(async () => {
            server.kill();
            await stopped;
        });
        const localURL = await new Promise((resolve, reject) => {
            let output = '';
            const timer = setTimeout(() => reject(new Error(`Development server did not start: ${output}`)), 30_000);
            server.once('error', (error) => { clearTimeout(timer); reject(error); });
            server.once('exit', () => { clearTimeout(timer); reject(new Error(`Development server exited: ${output}`)); });
            server.stderr.on('data', (chunk) => { output += chunk; });
            server.stdout.on('data', (chunk) => {
                output += chunk;
                const url = output.match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];
                if (url) { clearTimeout(timer); resolve(url); }
            });
        });
        for (const path of ['/blog/', articlePath, '/blog/build-check/draft/']) {
            const response = await fetch(new URL(path, localURL));
            assert.equal(response.status, 200);
            const document = parse(await response.text());
            assert.equal(meta(document, 'robots'), 'noindex, nofollow');
            assert.equal(links(document, 'alternate').length, 0);
            if (path.endsWith('/draft/')) assert.ok(text(document).includes(draftMarker));
        }
        for (const path of [articlePath, '/blog/build-check/draft/']) {
            assert.equal((await fetch(new URL(path + 'index.md', localURL))).status, 404);
        }
        for (const [path, template] of [['/sitemap.xml', originalSitemap], ['/llms.txt', originalIndex]]) {
            const response = await fetch(new URL(path, localURL));
            assert.equal(response.status, 200);
            assert.equal(await response.text(), template);
        }
    });

    await t.test('an all-draft collection produces an empty public listing', async () => {
        await rm(content, { recursive: true });
        await mkdir(content);
        await writeFile(join(content, 'draft.md'), fixtures['draft.md']);
        await build();
        const document = await readPage(dist, '/blog/');
        assert.ok(text(document).includes('No articles published yet.'));
        assert.equal(meta(document, 'robots'), 'index, follow');
        assert.deepEqual((await files(join(dist, 'blog'))).map((path) => relative(join(dist, 'blog'), path)), ['index.html']);
        const sitemap = sitemapEntries(await readFile(join(dist, 'sitemap.xml'), 'utf8'));
        assert.deepEqual(sitemap.filter((entry) => new URL(entry.loc).pathname.startsWith('/blog/')), [{ loc: origin + '/blog/' }]);
        assert.ok(!(await readFile(join(dist, 'llms.txt'), 'utf8')).includes(draftMarker));
    });
});
