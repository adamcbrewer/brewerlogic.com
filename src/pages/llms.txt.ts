import type { APIRoute } from 'astro';
import existingIndex from '../data/llms.txt?raw';
import { escapeMarkdown } from '../lib/markdown';
import { getPosts } from '../lib/posts';
import { getPostPath } from '../lib/urls';

export const GET: APIRoute = async ({ site }) => {
    if (import.meta.env.DEV) {
        return new Response(existingIndex, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    const posts = await getPosts();
    const articles = posts.map((post) => {
        const url = new URL(`${getPostPath(post.id)}index.md`, site).href;
        return `- [${escapeMarkdown(post.data.title)}](${url}): ${escapeMarkdown(post.data.description)}`;
    });
    const section = [
        '## Thoughts',
        '',
        `- [Thoughts](${new URL('/blog/', site).href}): Notes on building software.`,
        ...articles,
    ].join('\n');
    return new Response(`${existingIndex.trimEnd()}\n\n${section}\n`, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
};
