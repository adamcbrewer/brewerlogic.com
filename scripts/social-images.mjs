import { createHash } from 'node:crypto';
import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from '@astrojs/internal-helpers/frontmatter';
import { create } from 'fontkitten';
import { slug } from 'github-slugger';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
export const hash = (value) => createHash('sha256').update(value).digest('hex');
export const seedHash = (id) => hash(`brewerlogic:thoughts:waveform:${id}`);

async function readOptional(path) {
    try { return await readFile(path); }
    catch (error) { if (error.code === 'ENOENT') return undefined; throw error; }
}

async function markdownFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = await Promise.all(entries.filter((entry) => !entry.name.startsWith('.')).map(async (entry) => {
        if (entry.isDirectory()) return (await markdownFiles(join(directory, entry.name))).map((path) => `${entry.name}/${path}`);
        return entry.name.endsWith('.md') ? [entry.name] : [];
    }));
    return files.flat().sort();
}

function width(value, font, size) {
    return font.glyphsForString(value).reduce((sum, glyph) => sum + glyph.advanceWidth, 0) * size / font.unitsPerEm;
}

function wrap(value, font, size, maxWidth) {
    const lines = [];
    let line = '';
    for (const word of value.trim().split(/\s+/)) {
        if (line && width(`${line} ${word}`, font, size) > maxWidth) { lines.push(line); line = ''; }
        for (const character of (line ? ` ${word}` : word)) {
            if (line && width(line + character, font, size) > maxWidth) { lines.push(line); line = ''; }
            line += character;
        }
    }
    if (line) lines.push(line);
    return lines;
}

function fit(value, font, maxWidth, maxHeight, startSize) {
    for (let size = startSize; size >= 12; size -= 2) {
        const lines = wrap(value, font, size, maxWidth);
        if (lines.length * size * 1.15 <= maxHeight) return { lines, size };
    }
    throw new Error('Social image text is too long to fit. Shorten the title or description.');
}

function outlines(value, x, y, size, font, color) {
    const scale = size / font.unitsPerEm;
    return font.glyphsForString(value).map((glyph) => {
        const path = `<path d="${glyph.path.toSVG()}" fill="${color}" transform="translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${scale} ${-scale})"/>`;
        x += glyph.advanceWidth * scale;
        return path;
    }).join('');
}

export function renderSvg(input, fonts, palette) {
    const seed = seedHash(input.id);
    const frequency = 2.1 + parseInt(seed.slice(0,8),16) / 0xffffffff * 1.4;
    const phase = parseInt(seed.slice(8,16),16) / 0xffffffff * Math.PI * 2;
    const sample = (t, offset=0) => 284 + Math.sin(t * Math.PI * 2 * frequency + phase + offset) * Math.sin(t * Math.PI) ** 1.7 * 120;
    const { background, text, muted, accent, border } = palette;
    let body = `<rect width="1200" height="630" fill="${background}"/><path d="M798 284H1136" stroke="${border}"/>`;
    for (const offset of [-.65,.65,0]) {
        let path = '';
        for (let i=0;i<=240;i++) {
            const t=i/240;
            path += `${i===0?'M':'L'}${(798+t*338).toFixed(2)} ${sample(t,offset).toFixed(2)}`;
        }
        body += `<path d="${path}" fill="none" stroke="${offset===0?accent:muted}" stroke-opacity="${offset===0?1:.45}" stroke-width="${offset===0?4:1.5}"/>`;
    }
    for (const t of [.29,.71]) body += `<circle cx="${798+t*338}" cy="${sample(t).toFixed(2)}" r="7" fill="${background}" stroke="${accent}" stroke-width="2"/>`;
    const title = fit(input.title.toUpperCase(),fonts.display,680,300,160);
    title.lines.forEach((line,i) => {
        body += outlines(line,64,96 + fonts.display.capHeight / fonts.display.unitsPerEm * title.size + i * title.size * 1.15,title.size,fonts.display,text);
    });
    const caption = fit(input.description,fonts.mono,1072,104,26);
    caption.lines.forEach((line,i) => {
        body += outlines(line,64,526 - (caption.lines.length-1-i) * caption.size * 1.4,caption.size,fonts.mono,muted);
    });
    body += outlines('brewerlogic.com',64,582,20,fonts.mono,muted);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${body}</svg>`;
}

export async function generateSocialImages({ siteRoot = root, check = false } = {}) {
    const output = join(siteRoot,'assets/img/social');
    const manifestPath = join(siteRoot,'src/data/social-images.json');
    const inputs = [{ id: 'listing', title: 'Thoughts', description: 'Notes on building software.' }];
    const content = join(siteRoot,'src/content/blog');
    for (const path of await markdownFiles(content)) {
        const source = await readFile(join(content,path),'utf8');
        const { frontmatter: data } = parseFrontmatter(source);
        if (data.draft === true || data.image) continue;
        if (typeof data.title !== 'string' || typeof data.description !== 'string') throw new Error(`Missing title or description: ${path}`);
        const id = data.slug ? String(data.slug) : path.replace(/\.md$/,'').split('/').map((segment) => slug(segment)).join('/').replace(/\/index$/,'');
        inputs.push({ id: `post:${id}`, title: data.title, description: data.description });
    }
    if (new Set(inputs.map((input) => input.id)).size !== inputs.length) throw new Error('Duplicate social image IDs.');
    const fontFiles = await Promise.all(['bebas-neue','jetbrains-mono'].map((name) => readFile(join(siteRoot,`assets/fonts/${name}-latin.woff2`))));
    const fonts = { display:create(fontFiles[0]), mono:create(fontFiles[1]) };
    const paletteSource = await readFile(join(siteRoot,'assets/css/palette.css'),'utf8');
    const palette = Object.fromEntries(['background','text','muted','accent','border'].map((key) => {
        const value = paletteSource.match(new RegExp(`--site-${key}:\\s*(#[a-fA-F0-9]+)`))?.[1];
        if (!value) throw new Error(`Missing site color: ${key}`);
        return [key,value];
    }));
    const packageLock = JSON.parse(await readFile(join(siteRoot,'package-lock.json'),'utf8'));
    const versions = ['sharp','@img/sharp-libvips-linux-x64','fontkitten','@astrojs/internal-helpers','yaml','smol-toml','github-slugger'].map((name) => [name,packageLock.packages[`node_modules/${name}`]?.version]);
    const designHash = hash(JSON.stringify({ source:hash(await readFile(fileURLToPath(import.meta.url))), fonts:fontFiles.map(hash), palette, versions }));
    const previousSource = await readOptional(manifestPath);
    const previous = previousSource ? JSON.parse(previousSource) : {};
    const manifest = {};
    const stale = [];
    let generated = 0;
    for (const input of inputs) {
        const inputHash = hash(JSON.stringify({ input, seedHash:seedHash(input.id), designHash }));
        const name = `${input.id==='listing'?'thoughts':hash(input.id).slice(0,16)}-${inputHash.slice(0,16)}.png`;
        const url = `/assets/img/social/${name}`;
        const existing = await readOptional(join(output,name));
        const old = previous[input.id];
        const alt = `${input.title}. ${input.description}`;
        const entry = { url, alt, inputHash, seedHash:seedHash(input.id), pngHash:existing ? hash(existing) : undefined };
        if (old?.inputHash !== inputHash || old?.url !== url || old?.alt !== alt || !existing || old?.pngHash !== entry.pngHash) {
            stale.push(input.id);
            if (!check) {
                const png = await sharp(Buffer.from(renderSvg(input,fonts,palette))).png().toBuffer();
                await mkdir(output,{recursive:true});
                await writeFile(join(output,name),png);
                entry.pngHash = hash(png);
                generated++;
            }
        }
        manifest[input.id] = entry;
    }
    const expected = new Set(Object.values(manifest).map((entry) => entry.url.split('/').at(-1)));
    const files = await readdir(output).catch((error) => { if(error.code==='ENOENT')return []; throw error; });
    const obsolete = files.filter((name) => !expected.has(name));
    const manifestSource = JSON.stringify(manifest,null,2)+'\n';
    if (check) {
        if (stale.length || obsolete.length || previousSource?.toString() !== manifestSource) {
            throw new Error(`Social images are stale${stale.length ? `: ${stale.join(', ')}` : ''}. Run npm run social:generate and commit the PNGs and src/data/social-images.json.`);
        }
    } else {
        for (const name of obsolete) await rm(join(output,name));
        if (previousSource?.toString() !== manifestSource) {
            await mkdir(dirname(manifestPath),{recursive:true});
            await writeFile(manifestPath,manifestSource);
        }
    }
    return { generated, skipped:inputs.length-generated, total:inputs.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        const check = process.argv.includes('--check');
        const result = await generateSocialImages({ check });
        console.log(check ? `Social images verified: ${result.total}.` : `Social images: ${result.generated} generated, ${result.skipped} unchanged.`);
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
