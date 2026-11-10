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

Blog URLs use `/blog/` and `/blog/article-name/`. Keep article filenames and folders stable after publication. If a published URL changes, add a permanent redirect from its old URL before deploying the change.

Article frontmatter requires `title`, `description` and `pubDate`. Add `updatedDate` only for a meaningful content update; omit it on initial publication. Dates appear on the article and in its structured metadata. Set `draft: true` to keep an article in local previews only.

For an article's social preview, optionally add `image` with an absolute public `url` and descriptive `alt` text. Use an image that represents the article. Articles without a supplied image use a text-only preview.

Published articles also generate `/blog/article-name/index.md` from the same content, with title, description, author, dates and canonical HTML URL. HTML advertises the matching Markdown file. Drafts have no public Markdown companion, including during development.

## Agent Discovery

- `sitemap.xml` lists canonical public URLs and is referenced from `robots.txt`.
- `robots.txt` includes AI crawler rules and Content Signals.
- `llms.txt` tells agents when to use the site and points them to canonical resources.
- HTML pages link to Markdown companions with `rel="alternate"` and to `llms.txt` with `rel="describedby"`.
- `404.html` gives agents recovery links while DigitalOcean preserves a real 404 response.
- DigitalOcean static sites cannot negotiate Markdown from the `Accept` header; agents use the advertised `.md` URLs instead.
- Keep every HTML/Markdown page pair and `sitemap.xml` in sync when publishing public content changes.

The template `src/data/sitemap.xml` holds the existing portfolio URLs and their content dates. Astro uses it as a template and adds the blog listing and published articles to `dist/sitemap.xml`. Article modification dates use `updatedDate` when supplied, otherwise `pubDate`; builds don't advance these dates.

The template `src/data/llms.txt` holds the portfolio guidance. Astro preserves it and appends a Thoughts section linking to published articles' Markdown copies in `dist/llms.txt`. Blog pages advertise this optional agent index with a `rel="describedby"` head link. `robots.txt` keeps its existing search and training crawler policy.

## Links

- [brewerlogic.com](https://brewerlogic.com)
- [LinkedIn](https://linkedin.com/in/adamcbrewer)
- [GitHub](https://github.com/adamcbrewer)

## License

Content is copyright Adam Brewer. Code is available under MIT license.
