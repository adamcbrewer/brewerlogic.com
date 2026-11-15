export function getReadingTime(markdown: string) {
    const text = markdown
        .replace(/<!--[\s\S]*?-->/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/^\s*\[[^\]]+\]:.*$/gm, ' ')
        .replace(/<[^>]*>/g, ' ');
    const words = text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
    return `~${Math.max(1, Math.ceil(words / 250))} min read`;
}
