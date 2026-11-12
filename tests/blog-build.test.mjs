import assert from 'node:assert/strict';
import { execFile, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';
import { parse, serialize } from 'parse5';
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
        assert.ok(!existsSync(join(site, '.site-public/index.html')), 'Astro must own the home route');
        assert.deepEqual(elements(homepage, 'h1').map(text), ['AdamBrewer']);
        assert.equal(text(elements(homepage, 'title')[0]), 'Senior Full-Stack Engineer / Adam Brewer');
        assert.deepEqual(elements(homepage, 'section').map((node) => attribute(node, 'id')).filter(Boolean), ['about', 'work', 'experience', 'contact']);
        assert.deepEqual(links(homepage, 'canonical').map((node) => attribute(node, 'href')), [origin + '/']);
        assert.equal(meta(homepage, 'robots'), 'index, follow');
        assert.equal(meta(homepage, 'og:url'), origin + '/');
        assert.equal(meta(homepage, 'twitter:card'), 'summary_large_image');
        const person = elements(homepage, 'script').find((node) => attribute(node, 'type') === 'application/ld+json');
        assert.equal(JSON.parse(text(person))['@type'], 'Person');
        assert.ok(elements(homepage, 'script').some((node) => attribute(node, 'src') === '/assets/js/navigation.js'));
        assert.ok(elements(homepage, 'script').some((node) => text(node).includes('revealObserver')));
        assert.ok(elements(homepage, 'a').some((node) => attribute(node, 'download') !== undefined && attribute(node, 'href')?.endsWith('.pdf')));
        assert.ok(!elements(homepage, 'a').some((node) => attribute(node, 'aria-current') !== undefined));
        for (const id of ['about', 'work', 'experience', 'contact']) {
            assert.equal(elements(homepage, 'a').filter((node) => attribute(node, 'href') === '#' + id).length, id === 'work' ? 4 : 3);
        }
        for (const document of [homepage, await readPage(dist, '/blog/')]) {
            const fonts = links(document, 'preload').filter((node) => attribute(node, 'as') === 'font');
            assert.deepEqual(fonts.map((node) => attribute(node, 'href')), [
                '/assets/fonts/bebas-neue-latin.woff2', '/assets/fonts/jetbrains-mono-latin.woff2',
            ]);
            assert.ok(fonts.every((node) => attribute(node, 'crossorigin') !== undefined));
            assert.ok(!elements(document, 'link').some((node) => /fonts\.(googleapis|gstatic)\.com/.test(attribute(node, 'href') ?? '')));
            const faces = elements(document, 'style').map(text).join('\n');
            assert.equal((faces.match(/font-display:\s*block/g) ?? []).length, 3);
            for (const match of faces.matchAll(/url\(['"]?(\/assets\/fonts\/[^)'"\s]+)['"]?\)/g)) {
                const font = await readFile(join(dist, match[1]));
                assert.equal(font.subarray(0, 4).toString(), 'wOF2');
            }
        }
        const about = elements(homepage, 'section').find((node) => attribute(node, 'id') === 'about');
        assert.match(text(about), /I built\s+Mapbox TUI/);
        assert.match(text(about), /contribute to\s+Strata/);
        assert.ok(elements(homepage, 'p').every((node) => !/\SMy contribution:/.test(text(node))), 'Inline emphasis must keep its preceding space');
        const homeFooter = elements(homepage, 'footer')[0];
        assert.deepEqual(elements(homeFooter, 'a').map((node) => attribute(node, 'href')), [
            'https://github.com/adamcbrewer', 'https://linkedin.com/in/adamcbrewer', 'mailto:adam@brewerlogic.com',
            'https://papertrails.io', '/portfolio', '/privacy', '#main',
        ]);
        const listing = await readPage(dist, '/blog/');
        assert.ok(text(listing).indexOf(title) < text(listing).indexOf('Plain build check'));
        for (const path of ['/blog/', articlePath, plainPath]) {
            const document = await readPage(dist, path);
            const footer = elements(document, 'footer').find((node) => attribute(node, 'class') === 'footer');
            assert.equal(serialize(footer), serialize(homeFooter), 'Home and blog must share the same footer');
            const thoughts = elements(document, 'a').filter((node) => attribute(node, 'aria-current') !== undefined);
            assert.equal(thoughts.length, 2);
            assert.ok(thoughts.every((node) => attribute(node, 'href') === '/blog/' && attribute(node, 'aria-current') === (path === '/blog/' ? 'page' : 'location')));
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
        for (const path of ['index.md', 'privacy/index.md', 'portfolio/index.html', 'portfolio/index.md', 'case-studies/meshii/index.md', 'case-studies/ai-engineering/index.md', 'robots.txt', 'Adam-Brewer-Senior-Full-Stack-Engineer-CV.pdf']) {
            assert.deepEqual(await readFile(join(dist, path)), await readFile(join(site, path)));
        }
        for (const [path, canonical, heading] of [
            ['/case-studies/meshii/', '/case-studies/meshii/', 'Meshii WiFi'],
            ['/case-studies/ai-engineering/', '/case-studies/ai-engineering/', 'AI-assisted engineering'],
            ['/privacy/', '/privacy', 'Privacy Notice'],
        ]) {
            const document = await readPage(dist, path);
            assert.deepEqual(elements(document, 'h1').map(text), [heading]);
            assert.equal(elements(document, 'main').length, 1);
            assert.equal(meta(document, 'robots'), 'index, follow');
            assert.deepEqual(links(document, 'canonical').map((node) => attribute(node, 'href')), [origin + canonical]);
            assert.deepEqual(links(document, 'alternate').map((node) => attribute(node, 'href')), [path + 'index.md']);
            assert.equal(serialize(elements(document, 'footer').at(-1)), serialize(homeFooter));
            assert.ok(!elements(document, 'script').some((node) => /googletagmanager/.test(attribute(node, 'src') ?? '')));
            assert.ok(!elements(document, 'link').some((node) => /fonts\.(googleapis|gstatic)\.com/.test(attribute(node, 'href') ?? '')));
            assert.equal(links(document, 'preload').filter((node) => attribute(node, 'as') === 'font').length, 2);
            if (path.startsWith('/case-studies/')) {
                const header = elements(document, 'header').find((node) => attribute(node, 'data-site-header') !== undefined);
                const menu = elements(header, 'ul').find((node) => attribute(node, 'class') === 'nav__links');
                assert.deepEqual(elements(menu, 'a').map((node) => [attribute(node, 'href'), text(node)]), [
                    ['/#about', '#about'], ['/#work', '#work'], ['/#experience', '#experience'],
                    ['/#contact', '#contact'], ['/case-studies/', 'Case studies'], ['/blog/', 'Thoughts'],
                ]);
                const contents = elements(document, 'nav').find((node) => attribute(node, 'aria-label') === 'In this case study');
                const sectionIds = path.includes('meshii') ? ['architecture', 'decisions', 'boundaries'] : ['incident', 'workflow', 'outcome'];
                for (const id of sectionIds) {
                    assert.ok(elements(document, 'section').some((node) => attribute(node, 'id') === id));
                    assert.equal(elements(contents, 'a').filter((node) => attribute(node, 'href') === '#' + id).length, 1);
                }
            }
        }
        const studies = await readPage(dist, '/case-studies/');
        assert.equal(meta(studies, 'robots'), 'index, follow');
        assert.deepEqual(links(studies, 'canonical').map((node) => attribute(node, 'href')), [origin + '/case-studies/']);
        assert.deepEqual(links(studies, 'alternate').map((node) => attribute(node, 'href')), ['/case-studies/index.md']);
        const studyMain = elements(studies, 'main')[0];
        assert.ok(text(elements(studyMain, 'h1')[0]).endsWith('Case studies'));
        assert.deepEqual(elements(studyMain, 'h2').map(text), ['Meshii WiFi', 'AI-assisted engineering']);
        const studyMarkdown = await readFile(join(dist, 'case-studies/index.md'), 'utf8');
        for (const slug of ['meshii', 'ai-engineering']) {
            const path = `/case-studies/${slug}/`;
            assert.ok(elements(studyMain, 'a').some((node) => attribute(node, 'href') === path));
            assert.ok(studyMarkdown.includes(origin + path + 'index.md'));
            const study = await readPage(dist, path);
            assert.ok(elements(study, 'article').some((node) => attribute(node, 'class')?.split(' ').includes('article')));
            assert.ok(elements(study, 'header').some((node) => attribute(node, 'class')?.split(' ').includes('article-header')));
            assert.ok(elements(study, 'a').some((node) => attribute(node, 'href') === '/case-studies/' && text(node) === 'Back to case studies'));
            const current = elements(study, 'a').filter((node) => attribute(node, 'aria-current') !== undefined);
            assert.equal(current.length, 2);
            assert.ok(current.every((node) => attribute(node, 'href') === '/case-studies/' && attribute(node, 'aria-current') === 'location'));
        }
        assert.ok(byURL.has(origin + '/case-studies/'));
        const studyCurrent = elements(studies, 'a').filter((node) => attribute(node, 'aria-current') !== undefined);
        assert.equal(studyCurrent.length, 2);
        assert.ok(studyCurrent.every((node) => attribute(node, 'href') === '/case-studies/' && attribute(node, 'aria-current') === 'page'));
        const notFound = parse(await readFile(join(dist, '404.html'), 'utf8'));
        assert.equal(meta(notFound, 'robots'), 'noindex, nofollow');
        assert.deepEqual(elements(notFound, 'h1').map(text), ['Wrong Turn.']);
        assert.equal(elements(notFound, 'main').length, 1);
        assert.equal(links(notFound, 'canonical').length, 0);
        assert.ok(elements(notFound, 'a').some((node) => attribute(node, 'href') === '/sitemap.xml'));
        assert.ok(elements(notFound, 'a').some((node) => attribute(node, 'href') === '/llms.txt'));
        for (const [path, expectedTitle] of [
            ['/', 'Senior Full-Stack Engineer / Adam Brewer'],
            ['/portfolio/', 'CV / Adam Brewer'],
            ['/privacy/', 'Privacy Notice / Adam Brewer'],
            ['/blog/', 'Thoughts / Adam Brewer'],
            [articlePath, `${title} / Thoughts / Adam Brewer`],
            [plainPath, 'Plain build check / Thoughts / Adam Brewer'],
            ['/case-studies/', 'Case studies / Adam Brewer'],
            ['/case-studies/meshii/', 'Meshii WiFi / Case studies / Adam Brewer'],
            ['/case-studies/ai-engineering/', 'AI-assisted engineering / Case studies / Adam Brewer'],
        ]) {
            const document = await readPage(dist, path);
            assert.equal(text(elements(document, 'title')[0]), expectedTitle, `Page title: ${path}`);
        }
        assert.equal(text(elements(notFound, 'title')[0]), 'Page Not Found / Adam Brewer');
        for (const path of (await files(dist)).filter((path) => path.endsWith('.html'))) {
            const document = parse(await readFile(path, 'utf8'));
            const scripts = elements(document, 'script');
            assert.equal(scripts.filter((node) => attribute(node, 'src') === '/assets/js/analytics.js').length, 1, `Analytics coverage: ${path}`);
            assert.ok(!scripts.some((node) => /googletagmanager|gtag\(/.test((attribute(node, 'src') ?? '') + text(node))), `Duplicate analytics: ${path}`);
        }
        await checkInternalLinks(dist);
    });

    await t.test('development previews stay unindexed and omit Markdown discovery', { timeout: 45_000 }, async (t) => {
        const server = spawn(process.execPath, [join(site, 'node_modules/astro/bin/astro.mjs'), 'dev', '--ignore-lock', '--host', '127.0.0.1', '--port', '0'], {
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
        for (const path of ['/case-studies/', '/case-studies/meshii/', '/case-studies/ai-engineering/', '/privacy/', '/portfolio', '/portfolio/']) {
            const response = await fetch(new URL(path, localURL));
            assert.equal(response.status, 200, `Development route failed: ${path}`);
            assert.ok((await response.text()).includes('<h1'));
        }
        const missingResponse = await fetch(new URL('/missing-build-check-page/', localURL));
        assert.equal(missingResponse.status, 404);
        assert.ok((await missingResponse.text()).includes('Wrong Turn.'));
        const homeResponse = await fetch(localURL);
        assert.equal(homeResponse.status, 200);
        const homepage = parse(await homeResponse.text());
        assert.ok(!elements(homepage, 'script').some((node) => /analytics|googletagmanager/.test(attribute(node, 'src') ?? '')));
        assert.deepEqual(elements(homepage, 'h1').map(text), ['AdamBrewer']);
        assert.equal(text(elements(homepage, 'title')[0]), 'Senior Full-Stack Engineer / Adam Brewer');
        assert.ok(elements(homepage, 'a').some((node) => attribute(node, 'href') === '#about'));
        assert.equal(elements(homepage, 'footer').length, 1);
        for (const path of ['/blog/', '/case-studies/', articlePath, '/blog/build-check/draft/']) {
            const response = await fetch(new URL(path, localURL));
            assert.equal(response.status, 200);
            const document = parse(await response.text());
            assert.ok(!elements(document, 'script').some((node) => /analytics|googletagmanager/.test(attribute(node, 'src') ?? '')));
            assert.equal(meta(document, 'robots'), 'noindex, nofollow');
            assert.equal(links(document, 'alternate').length, path === '/case-studies/' ? 1 : 0);
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
