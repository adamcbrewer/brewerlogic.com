import type { APIRoute } from 'astro';
import existingSitemap from '../../sitemap.xml?raw';
import { getPosts } from '../lib/posts';
import { getPostPath } from '../lib/urls';
import { escapeXML } from '../lib/xml';

export const GET: APIRoute = async ({ site }) => {
    const posts = await getPosts();
    const entries = [
        `  <url><loc>${escapeXML(new URL('/blog/', site).href)}</loc></url>`,
        ...posts.map((post) => {
            const url = escapeXML(new URL(getPostPath(post.id), site).href);
            const lastmod = (post.data.updatedDate ?? post.data.pubDate).toISOString();
            return `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`;
        }),
    ];
    const sitemap = existingSitemap.replace('</urlset>', `${entries.join('\n')}\n</urlset>`);
    return new Response(sitemap, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
