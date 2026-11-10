import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import { blogIsPublic } from './blog.config.mjs';

export default defineConfig({
    site: 'https://brewerlogic.com',
    output: 'static',
    publicDir: './.site-public',
    trailingSlash: 'ignore',
    vite: {
        define: { __BLOG_IS_PUBLIC__: JSON.stringify(blogIsPublic) },
    },
    integrations: [{
        name: 'existing-static-pages',
        hooks: {
            'astro:server:setup': ({ server }) => {
                server.middlewares.use((request, _response, next) => {
                    const url = new URL(request.url ?? '/', 'http://localhost');
                    const file = new URL(`./.site-public${url.pathname}index.html`, import.meta.url);
                    if (url.pathname.endsWith('/') && existsSync(file)) {
                        request.url = `${url.pathname}index.html${url.search}`;
                    }
                    next();
                });
            },
        },
    }],
});
