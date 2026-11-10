# brewerlogic.com

Personal portfolio website for Adam Brewer, senior full-stack developer based in Bristol, UK.

## About Me

I enjoy building things with JavaScript, TypeScript, React and Node.js—whether that's enterprise fintech platforms, design systems, or side projects with my brother.

My focus is on creating robust component systems, clean APIs, and interfaces that just work. I care about performance, accessibility, and writing code that other developers actually want to maintain.

Previously served as an Aircraft Technician in the British Army before moving into web development in 2010.

### Co-founder

I co-founded [Paper Trails](https://papertrails.io) with my brother [Jake](https://studiobrewer.com)—a platform for creating custom art prints from your Strava and adventure data.

### Beyond Code

Running, climbing, cycling, woodworking, reading, and anything with an 80s aesthetic.

## Tech Stack

This site is a simple static HTML/CSS/JS portfolio hosted on DigitalOcean App Platform:

- Dark/light theme toggle
- Intersection Observer for active nav states
- CSS custom properties for theming
- Astro builds Markdown blog articles under `/blog/`
- Existing pages remain plain HTML/CSS/JS; deployment remains static
- Markdown companion files for agents

## Blog development

See [the blog setup issue](https://github.com/adamcbrewer/brewerlogic.com/issues/12) for the full task checklist, local commands, Markdown articles and draft behaviour. DigitalOcean configuration happens after the production PR is merged. The blog is under development and its homepage navigation links remain hidden.

### Preview and public builds

`npm run build` defaults to preview mode: blog HTML has `noindex, nofollow`, homepage Thoughts links stay hidden, and the sitemap and agent index contain only the existing portfolio content.

Build the approved public release with:

```sh
BLOG_PUBLIC=true npm run build
```

Only the literal value `true` enables public mode. Set it in the build environment or on the command above; it isn't a browser setting. Public mode enables blog indexing, reveals desktop, mobile and no-JavaScript homepage links, and includes the blog in the sitemap and agent index. Drafts remain excluded from every production output. Development HTML always stays unindexed, including draft previews.

Use `npm run preview` to inspect the last build. To return to preview mode, rebuild without `BLOG_PUBLIC=true`; changing the environment after a build doesn't change its static files. The source homepage keeps its links hidden; the build updates only the staged copy. Publish only `dist/`.

Enable `BLOG_PUBLIC=true` in DigitalOcean's build environment only during the final post-merge configuration task. No DigitalOcean configuration is needed for local checks.

Blog URLs use `/blog/` and `/blog/article-name/`. Keep article filenames and folders stable after publication. If a published URL changes, add a permanent redirect from its old URL before deploying the change.

Article frontmatter requires `title`, `description` and `pubDate`. Add `updatedDate` only for a meaningful content update; omit it on initial publication. Dates appear on the article and in its structured metadata. Set `draft: true` to keep an article in local previews only.

For an article's social preview, optionally add `image` with an absolute public `url` and descriptive `alt` text. Use an image that represents the article. Articles without a supplied image use a text-only preview.

Published articles also generate `/blog/article-name/index.md` from the same content, with title, description, author, dates and canonical HTML URL. HTML advertises the matching Markdown file. Drafts have no public Markdown companion, including during development.

### Build checks

Run `npm ci --ignore-scripts` to install the locked dependencies, then `npm test` to check preview and public builds. The tests use a temporary copy of the repository with disposable published/draft articles, followed by an all-draft collection to check the empty listing. Your articles, `dist/` and local dev server are left untouched.

Checks cover indexing and all homepage navigation variants, article metadata and Markdown, sitemap and agent discovery, draft exclusion, existing static files, and internal file/anchor links. Visual and keyboard checks remain part of the manual release review.

GitHub Actions runs these checks on pushes and pull requests using Node.js 24. The workflow has read-only repository permissions and doesn't deploy. DigitalOcean continues to build the approved `master` branch.

Pinned dependency versions, locked installs and disabled lifecycle scripts follow the [npm security best practices](https://github.com/lirantal/npm-security-best-practices).

## Agent Discovery

- `sitemap.xml` lists canonical public URLs and is referenced from `robots.txt`.
- `robots.txt` includes AI crawler rules and Content Signals.
- `llms.txt` tells agents when to use the site and points them to canonical resources.
- HTML pages link to Markdown companions with `rel="alternate"` and to `llms.txt` with `rel="describedby"`.
- `404.html` gives agents recovery links while DigitalOcean preserves a real 404 response.
- DigitalOcean static sites cannot negotiate Markdown from the `Accept` header; agents use the advertised `.md` URLs instead.
- Keep every HTML/Markdown page pair and `sitemap.xml` in sync when publishing public content changes.

The template `src/data/sitemap.xml` holds the existing portfolio URLs and their content dates. In public mode, Astro adds the blog listing and published articles to `dist/sitemap.xml`. Preview mode preserves the template unchanged. Article modification dates use `updatedDate` when supplied, otherwise `pubDate`; builds don't advance these dates.

The template `src/data/llms.txt` holds the portfolio guidance. In public mode, Astro appends a Thoughts section linking to published articles' Markdown copies in `dist/llms.txt`. Preview mode preserves the template unchanged. Blog pages advertise this optional agent index with a `rel="describedby"` head link. `robots.txt` keeps its existing search and training crawler policy.

## Links

- [brewerlogic.com](https://brewerlogic.com)
- [LinkedIn](https://linkedin.com/in/adamcbrewer)
- [GitHub](https://github.com/adamcbrewer)

## License

Content is copyright Adam Brewer. Code is available under MIT license.
