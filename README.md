# brewerlogic.com

Personal portfolio website for Adam Brewer, senior full-stack developer based in Bristol, UK.

## About Me

I enjoy building things with JavaScript, TypeScript, React and Node.js—whether that's enterprise fintech platforms, design systems, or side projects with my brother.

I build products across the stack, from interfaces and APIs to data processing, deployment and production support. I care about performance, accessibility and code that other developers can maintain.

Previously served as an Aircraft Technician in the British Army before moving into web development in 2010.

### Co-founder

I co-founded [Paper Trails](https://papertrails.io) with my brother [Jake](https://studiobrewer.com)—a platform for creating custom art prints from your Strava and adventure data.

### Beyond Code

Running, climbing, cycling, woodworking, reading, and anything with an 80s aesthetic.

## Tech Stack

Astro generates this static portfolio for DigitalOcean App Platform:

- Intersection Observer for active nav states
- CSS custom properties for theming
- Astro manages the home page in `src/pages/index.astro` and Markdown blog articles under `/blog/`
- The home page and blog share header and footer components in `src/components/`
- Home, Thoughts, case studies, privacy and 404 use a shared Astro document layout; deployment remains static
- The printable CV remains independent HTML/CSS and can be tailored separately from the website
- Markdown companion files for agents

## Templates and presentation

`SiteLayout.astro` owns the HTML document, metadata, local fonts, navigation, skip link and footer. `ListingLayout.astro` gives Thoughts and Case Studies the same section heading and numbered-list presentation. `ArticleHeader.astro` and shared reading styles keep blog posts and individual case studies consistent. `BlogLayout.astro` adds article metadata and draft indexing rules. `CaseStudyLayout.astro` keeps case-study navigation and presentation together while each study owns its story and diagrams. Home-only analytics remain in the home page.

`assets/css/palette.css` owns site tokens and font families. `src/styles/base.css` owns resets, focus, links and reduced-motion defaults. Page styles own composition and reading layouts. Case-study styles are scoped to their diagrams, facts and content blocks; headings, reading width and accents follow the shared article presentation.

`SectionHeading.astro`, `NumberedEntry.astro`, `ExternalProjectLink.astro` and `TagList.astro` own repeated presentation and accessible markup. Website content stays in its pages. The printable CV, its Markdown version and the PDF are separate editorial outputs, with no shared portfolio-data dependency or automatic PDF generation.

## Blog development

See [the blog setup issue](https://github.com/adamcbrewer/brewerlogic.com/issues/12) for the full task checklist, local commands, Markdown articles and draft behaviour. Production changes deploy through DigitalOcean after the approved PR is merged into main.

### Development and production builds

Use `mise install` to prepare the pinned Node.js version, then `npm run dev` for local development. Draft articles appear locally; development blog HTML always uses `noindex, nofollow`. Development sitemap and agent-index responses retain only the portfolio templates, and blog Markdown companions are not served.

Build the production site with:

```sh
npm run build
```

Normal builds show Thoughts in all homepage navigation variants, use `index, follow` on blog pages, and include the listing and published articles in the sitemap and agent index. No launch environment variable is required. Drafts remain excluded from all production outputs. Keep `Hello World` as a draft until it is ready to publish.

Use `npm run preview` to inspect the production build locally. It serves the same indexable files that DigitalOcean publishes. Deploy only `dist/`.

Blog URLs use `/blog/` and `/blog/article-name/`. Keep article filenames and folders stable after publication. If a published URL changes, add a permanent redirect from its old URL before deploying the change.

Article frontmatter requires `title`, `description` and `pubDate`. Add `updatedDate` only for a meaningful content update; omit it on initial publication. Dates appear on the article and in its structured metadata. Set `draft: true` to keep an article in local previews only.

For an article's social preview, optionally add `image` with an absolute public `url` and descriptive `alt` text. Use an image that represents the article. Articles without a supplied image use a text-only preview.

Production builds generate `/blog/article-name/index.md` for published articles from the same content, with title, description, author, dates and canonical HTML URL. HTML advertises the matching Markdown file. Drafts and development servers have no blog Markdown companions.

### Build checks

Run `npm ci --ignore-scripts` to install the locked dependencies, then `npm test` to check default production builds and development previews. The tests use a temporary copy of the repository with disposable published/draft articles, followed by an all-draft collection to check the empty listing. Your articles, `dist/` and local dev server are left untouched.

Checks cover indexing and all homepage navigation variants, article metadata and Markdown, sitemap and agent discovery, draft exclusion, existing static files, and internal file/anchor links. Checks also cover case-study navigation, shared metadata, privacy, 404 recovery, and unchanged CV and Markdown outputs. Visual and keyboard checks remain part of the manual release review.

Mise, GitHub Actions and DigitalOcean use Node.js v26.12.1, pinned in `mise.toml`, the workflow and `package.json`. Run `mise install` to prepare the local version. The workflow has read-only repository permissions and doesn't deploy. DigitalOcean builds the approved `main` branch and reads its Node.js version from `package.json`.

Pinned dependency versions, locked installs and disabled lifecycle scripts follow the [npm security best practices](https://github.com/lirantal/npm-security-best-practices).

## Agent Discovery

- `sitemap.xml` lists canonical public URLs and is referenced from `robots.txt`.
- `robots.txt` includes AI crawler rules and Content Signals.
- `llms.txt` tells agents when to use the site and points them to canonical resources.
- HTML pages link to Markdown companions with `rel="alternate"` and to `llms.txt` with `rel="describedby"`.
- `404.html` gives agents recovery links while DigitalOcean preserves a real 404 response.
- DigitalOcean static sites cannot negotiate Markdown from the `Accept` header; agents use the advertised `.md` URLs instead.
- Keep every HTML/Markdown page pair and `sitemap.xml` in sync when publishing public content changes.

The template `src/data/sitemap.xml` holds the existing portfolio URLs and their content dates. Production builds add the blog listing and published articles to `dist/sitemap.xml`. Development preserves the template unchanged. Article modification dates use `updatedDate` when supplied, otherwise `pubDate`; builds don't advance these dates.

The template `src/data/llms.txt` holds the portfolio guidance. Production builds append a Thoughts section linking to published articles' Markdown copies in `dist/llms.txt`. Development preserves the template unchanged. Blog pages advertise this optional agent index with a `rel="describedby"` head link. `robots.txt` keeps its existing search and training crawler policy.

## Links

- [brewerlogic.com](https://brewerlogic.com)
- [LinkedIn](https://linkedin.com/in/adamcbrewer)
- [GitHub](https://github.com/adamcbrewer)

## License

Content is copyright Adam Brewer. Code is available under MIT license.
