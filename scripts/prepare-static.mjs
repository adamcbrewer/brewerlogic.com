import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { blogIsPublic } from '../blog.config.mjs';

const root = new URL('../', import.meta.url);
const destination = new URL('.site-public/', root);
const paths = [
    'index.html',
    'index.md',
    '404.html',
    'assets',
    'case-studies',
    'portfolio',
    'privacy',
    'Adam-Brewer-Senior-Full-Stack-Engineer-CV.pdf',
    'robots.txt',
];

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
await Promise.all(paths.map((path) => cp(
    new URL(path, root),
    new URL(path, destination),
    { recursive: true },
)));

if (blogIsPublic) {
    const homepage = new URL('index.html', destination);
    const html = await readFile(homepage, 'utf8');
    await writeFile(homepage, html.replaceAll('data-blog-link hidden', 'data-blog-link'));
}
