import { getCollection } from 'astro:content';

export async function getPosts({ includeDrafts = false } = {}) {
    const posts = await getCollection('blog', ({ data }) =>
        !data.draft || (includeDrafts && import.meta.env.DEV),
    );
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
