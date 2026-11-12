import type { APIRoute } from 'astro';
import { getPosts } from '../../lib/posts';
import { authorName } from '../../lib/site';
import { getPostPath } from '../../lib/urls';
import { escapeXML } from '../../lib/xml';

export const GET: APIRoute = async ({ site }) => {
    const posts = await getPosts();
    const blogURL = escapeXML(new URL('/blog/', site).href);
    const feedURL = escapeXML(new URL('/blog/rss.xml', site).href);
    const items = posts.map((post) => {
        const url = escapeXML(new URL(getPostPath(post.id), site).href);
        return `    <item>
      <title>${escapeXML(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <dc:creator>${escapeXML(authorName)}</dc:creator>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <description>${escapeXML(escapeXML(post.data.description))}</description>
    </item>`;
    });
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Thoughts / ${escapeXML(authorName)}</title>
    <description>Notes on building software.</description>
    <link>${blogURL}</link>
    <language>en</language>
    <atom:link href="${feedURL}" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`;
    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
