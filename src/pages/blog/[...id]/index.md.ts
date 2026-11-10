import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { escapeMarkdown } from '../../../lib/markdown';
import { getPosts } from '../../../lib/posts';
import { authorName } from '../../../lib/site';
import { getPostPath } from '../../../lib/urls';

export async function getStaticPaths() {
    if (import.meta.env.DEV) return [];
    const posts = await getPosts();
    return posts.map((post) => ({ params: { id: post.id }, props: { post } }));
}

export const GET: APIRoute<{ post: CollectionEntry<'blog'> }> = ({ props: { post }, site }) => {
    const { title, description, pubDate, updatedDate } = post.data;
    const metadata = [
        `# ${escapeMarkdown(title)}`,
        '',
        `> ${escapeMarkdown(description)}`,
        '',
        `Author: ${authorName}`,
        `Published: ${pubDate.toISOString().slice(0, 10)}`,
        ...(updatedDate ? [`Updated: ${updatedDate.toISOString().slice(0, 10)}`] : []),
        `Canonical: ${new URL(getPostPath(post.id), site).href}`,
    ];
    const markdown = `${metadata.join('\n')}\n\n---\n\n${post.body}`;
    return new Response(markdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
