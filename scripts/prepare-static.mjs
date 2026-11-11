import { cp, mkdir, rm } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const destination = new URL('.site-public/', root);
const paths = [
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
