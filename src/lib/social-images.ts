import manifest from '../data/social-images.json';

export function getSocialImage(site: URL | undefined, postId?: string) {
    const images = manifest as Record<string, typeof manifest.listing>;
    const image = images[`post:${postId}`] ?? images.listing;
    return { url: new URL(image.url, site).href, alt: image.alt };
}
