import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://brewerlogic.com',
    output: 'static',
    publicDir: './.site-public',
    trailingSlash: 'ignore',
    integrations: [{
        name: 'printable-cv-route',
        hooks: {
            'astro:server:setup': ({ server }) => {
                server.middlewares.use((request, _response, next) => {
                    const url = new URL(request.url ?? '/', 'http://localhost');
                    const file = new URL('./.site-public/portfolio/index.html', import.meta.url);
                    if (['/portfolio', '/portfolio/'].includes(url.pathname) && existsSync(file)) {
                        request.url = `/portfolio/index.html${url.search}`;
                    }
                    next();
                });
            },
        },
    }],
});
