export const pulseSeedInput = (id) => `brewerlogic:thoughts:waveform:${id}`;

export function pulseGraph(seed, { accent, muted }) {
    const columns = Array.from({ length: 8 }, (_, index) =>
        Number.parseInt(seed.slice(index * 2, index * 2 + 2), 16),
    );
    const peak = columns.indexOf(Math.max(...columns));

    return columns.map((byte, index) => {
        const height = index === peak ? 6 : 2 + byte % 4;
        const x = 811 + index * 42;

        return Array.from({ length: height }, (_, level) => {
            const y = 337 - level * 21;
            const highlight = index === peak && level === height - 1;
            const opacity = highlight ? '.85' : (.36 + level * .045).toFixed(2);
            return `<rect x="${x}" y="${y}" width="25" height="11" fill="${highlight ? accent : muted}" opacity="${opacity}"/>`;
        }).join('');
    }).join('');
}
