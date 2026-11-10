export function escapeMarkdown(value: string) {
    return value.replace(/\s+/g, ' ').replace(/[\\[\]<>*_`]/g, '\\$&');
}
