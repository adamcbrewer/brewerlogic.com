import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../assets/js/analytics.js', import.meta.url), 'utf8');

for (const origin of [
    'https://brewerlogic.com', 'https://www.brewerlogic.com',
    'http://brewerlogic.com', 'http://localhost:4321', 'https://localhost:4321',
    'http://127.0.0.1:4321', 'https://preview.ondigitalocean.app',
    'https://brewerlogic.com.example.org',
]) {
    test(`analytics collection on ${origin}`, () => {
        const scripts = [];
        const existing = ['existing consent configuration'];
        const window = { dataLayer: [...existing] };
        const document = {
            createElement: (tag) => { assert.equal(tag, 'script'); return {}; },
            head: { appendChild: (script) => scripts.push(script) },
        };
        runInNewContext(source, { location: new URL(origin), window, document });
        const enabled = ['https://brewerlogic.com', 'https://www.brewerlogic.com'].includes(origin);
        assert.equal(scripts.length, enabled ? 1 : 0);
        assert.equal(window.dataLayer[0], existing[0]);
        if (!enabled) {
            assert.equal(window.dataLayer.length, 1);
            assert.equal(window.gtag, undefined);
            return;
        }
        assert.equal(scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-TWKH9DPEMN');
        assert.equal(scripts[0].async, true);
        const commands = window.dataLayer.slice(1).map((args) => Array.from(args));
        assert.equal(commands.length, 2);
        assert.equal(commands[0][0], 'js');
        assert.deepEqual(commands[1], ['config', 'G-TWKH9DPEMN']);
    });
}
