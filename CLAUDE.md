# Project guidance

The website uses Astro to generate static HTML. See README.md for the template structure and development workflow.

## Ownership

- `SiteLayout.astro` owns the document, metadata, fonts, site navigation and footer.
- Blog and case-study layouts add their own presentation and metadata rules. Case studies keep local section navigation and custom diagrams.
- Site tokens belong in `assets/css/palette.css`; shared base and accessibility rules belong in `src/styles/base.css`. Components own repeated markup and their styles. Page CSS owns composition.
- Keep home-only analytics in the home page. Preserve draft exclusion, development noindex rules, canonical paths and Markdown discovery when changing templates.

## Independent CV

`portfolio/index.html`, `portfolio/index.md` and the downloadable PDF are independently tailored job-application documents. Keep their content and print layout separate from website data and templates. Differences from the website can be intentional; edit the CV only when asked. There is no automatic PDF generation.

## Content and verification

Keep website HTML and its Markdown companion aligned when editing the same published story. Preserve stable URLs, section anchors and declared publication dates. Sitemap and agent-index templates contain curated portfolio guidance; the blog appends published content during builds.

Use the existing build tests for output contracts. Legacy CSS and JavaScript under `assets/css/styles.css` and `assets/js/main.js` are currently unreferenced; do not treat them as the active theme or navigation implementation.
