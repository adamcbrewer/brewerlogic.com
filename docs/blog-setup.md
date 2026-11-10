# Blog setup

Work on `feat/astro-blog` in `/home/adam/localhost/brewerlogic-blog`. Nothing has been pushed or deployed.

## Local development

Use Node.js 22.23.4 or newer. Node.js 24 LTS is a suitable build version for DigitalOcean.

```sh
npm ci
npm run dev
```

Open `http://localhost:4321/blog/`. The homepage and existing static pages are also available on this server. The Blog links in the homepage desktop, mobile and no-JavaScript navigation have `hidden` attributes until launch.

Articles live in `src/content/blog/`. The filename determines the URL, for example `hello-world.md` becomes `/blog/hello-world/`.

```md
---
title: Article title
description: A short summary.
pubDate: 2026-11-10
draft: true
---

Write the article in Markdown here.
```

Drafts appear in development and are excluded from both the listing and article routes in production builds. Set `draft: false` to include an article in the build. Blog pages currently have `noindex, nofollow` while the design is being developed. That is a crawler instruction, not access control.

The initial layout is deliberately unstyled. Design approval, removing the hidden attributes and noindex metadata, and adding published blog URLs to `sitemap.xml` and `llms.txt` are launch work.

## Static build

```sh
npm run build
npm run preview
```

`prepare-static.mjs` copies the existing public files into the ignored `.site-public/` directory. Astro then combines them with the generated blog in `dist/`. Existing source files stay where they are. When adding another top-level static file or directory, add it to the list in that script. Restart development after changing the original static files to refresh the staged copies.

Only `dist/` should be published. It contains the homepage, existing assets and pages, the existing `404.html`, and the blog. It does not contain build scripts, package files, or draft Markdown sources.

Dependency versions are recorded in `package-lock.json`; use `npm ci` for repeatable installs. `.npmrc` disables dependency lifecycle scripts. These choices follow [npm security best practices](https://github.com/lirantal/npm-security-best-practices). The build succeeds without dependency install scripts.

## DigitalOcean deployment investigation

The repository README identifies DigitalOcean App Platform static hosting. There is no checked-in app spec or deployment workflow, and the current dashboard settings could not be inspected. No DigitalOcean settings have been changed.

Before deployment, check the existing component settings:

| Setting | Value |
| --- | --- |
| Resource type | Static Site |
| Source directory | Repository root |
| Build environment | Node.js |
| Build command | `npm run build` |
| Output directory | `dist` |
| Index document | `index.html` |
| Error document | `404.html` |
| Runtime command | None |

DigitalOcean detects the root `package.json` and uses `npm ci` when a lockfile exists. See the [Node.js buildpack documentation](https://docs.digitalocean.com/products/app-platform/reference/buildpacks/nodejs/) and [static site settings](https://docs.digitalocean.com/products/app-platform/how-to/manage-static-sites/).

Preserve root routing and the real 404 response. Do not enable an SPA catchall or create a separate `/blog` service. The blog is part of the same static output. See the [app specification reference](https://docs.digitalocean.com/products/app-platform/reference/app-spec/).

Keep production on its existing branch during local design work. Verify its tracked branch and deploy-on-push setting before publishing. Change the output directory together with the Astro release; the current production branch does not generate `dist/`.
