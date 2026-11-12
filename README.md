# brewerlogic.com

I'm Adam Brewer. This is my personal site, with some of my work and thoughts on building software.

- [Website](https://brewerlogic.com)
- [CV](https://brewerlogic.com/portfolio)
- [Case studies](https://brewerlogic.com/case-studies/)

## Find me

- [GitHub](https://github.com/adamcbrewer)
- [LinkedIn](https://linkedin.com/in/adamcbrewer)
- [Email](mailto:adam@brewerlogic.com)
- [Paper Trails](https://papertrails.io), the custom art print business I co-founded with my brother Jake.

## Thoughts

I write about software and the ideas behind it. [Read all my thoughts](https://brewerlogic.com/blog/).

- [All the untold stories](https://brewerlogic.com/blog/all-the-untold-stories/) · 12 November 2026

  We attach too much importance to the code we write.

## Social-preview images

Thoughts uses a sound-wave image for the listing and a separate image for each published post without a custom `image`. Each waveform is seeded from a SHA-256 hash of the post's slug. Editing the title or description changes the text while keeping that waveform stable. Drafts use the generic image in development and do not get public image files. Article-specific image overrides take precedence.

Run `npm run social:generate` after changing article metadata or the image design. This also runs before `npm run dev` and `npm run build`. It generates only missing, changed or damaged images and removes obsolete ones. Images are 1200 × 630 PNGs under `assets/img/social/`; the hashes and metadata live in `src/data/social-images.json`. Commit both the generated PNGs and that manifest alongside the source changes.

The manifest records the waveform seed hash, an input hash covering the slug, title, description, renderer source, font files, palette and relevant dependency versions, and a SHA-256 hash of the PNG bytes. Filenames include the input hash so changed artwork gets a new URL. Article body edits alone do not regenerate images.

Run `npm run social:check` before opening a PR. It recomputes input hashes and verifies the saved PNG hashes without writing files. The **Verify committed social image hashes** step also runs on every PR and push, before the build can regenerate anything. Missing, stale, damaged or obsolete output fails the check with the regeneration command.

Rendering uses the existing local fonts as SVG outlines, with no system-font or browser dependency. The renderer packages are pinned in `package-lock.json`. Install with `npm ci --ignore-scripts`, following [npm security best practices](https://github.com/lirantal/npm-security-best-practices).

Local verification covers incremental generation, stale-output detection, metadata, custom image overrides and draft exclusion. Public image content types and LinkedIn, Slack and X cache refreshes still need checking after deployment.

### RSS

[Subscribe to Thoughts](https://brewerlogic.com/blog/rss.xml) in a feed reader. The feed includes each published post's summary and a link to the full article. Drafts stay out in development and production. The listing and article headers have an RSS link, and their HTML heads advertise the canonical feed URL for automatic discovery.

`npm test` checks RSS XML, summary escaping, canonical links and stable GUIDs, authors, publication dates, newest-first ordering, draft exclusion, discovery links and empty feeds. It also checks the development response's RSS content type.

After deployment, check `/blog/rss.xml` returns HTTP 200 with an XML content type rather than an HTML fallback. Confirm its items match the published articles, then follow the RSS link from `/blog/` and a published post on desktop and mobile. Import the feed URL into a feed reader and check that summaries link to the full posts. Deployment checks remain pending until this branch is merged and deployed.

## Agent discovery

If you're using an agent to read the site, these are the places to start:

- [llms.txt](https://brewerlogic.com/llms.txt) points to my CV, work and published thoughts, with guidance on what each page covers.
- [Sitemap](https://brewerlogic.com/sitemap.xml) lists the public page URLs.
- [robots.txt](https://brewerlogic.com/robots.txt) sets out the crawler policy, allowing search access while blocking the listed training crawlers.

Pages link to their Markdown copies with `rel="alternate"` and to the agent index with `rel="describedby"`. Use those Markdown links to read the content directly.

## Analytics

[Issue #15](https://github.com/adamcbrewer/brewerlogic.com/issues/15) covers HTML page views. The shared Astro layout and standalone CV use `assets/js/analytics.js` with the existing GA4 measurement ID, `G-TWKH9DPEMN`. The loader runs only on HTTPS at `brewerlogic.com` and `www.brewerlogic.com`. Astro development pages omit it entirely; production builds omit draft articles. Deploy previews must use a separate hostname to stay excluded.

The Google tag's single `config` call sends the initial page view automatically, using the document title, current URL and normal referrer. There is no manual page-view event or custom click, scroll or conversion tracking. Existing property-level enhanced measurement settings still apply. No consent controls were present in the original snippet, and this change adds none. See [Google's page-view behaviour](https://developers.google.com/analytics/devguides/collection/ga4/views).

### Saved traffic reports

Open **Reports > Acquisition** in the brewerlogic.com GA4 property:

- [Traffic overview](https://analytics.google.com/analytics/web/#/a31471338p364661771/reports/explorer?r=16326191297) shows all visitors, sessions and page views by session source/medium. Switch the table dimension to **Page referrer** for referring URLs when available, or **Page path and screen class** for pages visited.
- [Agent referrals](https://analytics.google.com/analytics/web/#/a31471338p364661771/reports/explorer?r=16326113549) groups visits attributed to GA4's built-in **AI Assistant** channel by session source/medium.
- [Agent Views](https://analytics.google.com/analytics/web/#/a31471338p364661771/reports/explorer?r=16326156793) shows page views across the whole site during those sessions, grouped by page path.

For page views from all sources, open **Reports > Engagement > Pages and screens** and select **Page path and screen class**. Use the page title dimension to inspect titles.

AI referrals measure visits attributed to assistants, not crawler requests. Missing referrers can appear as Direct, and GA4 automatically excludes known bots. See Google's [AI Assistant announcement](https://support.google.com/analytics/answer/9164320), [traffic acquisition report](https://support.google.com/analytics/answer/12923437), and [bot exclusion](https://support.google.com/analytics/answer/9888366).

Agent fetches of HTML, Markdown and `llms.txt` without JavaScript are outside this setup. The site uses GA4 referral reporting without additional CDN/request monitoring.

### Verification

`npm test` checks analytics coverage once per generated HTML page, a single tag configuration, production hostname restrictions, draft exclusion and development pages without tracking.

The three saved reports and their Acquisition menu entries were configured and reopened in GA4 on 12 November 2026. The AI reports showed no matching visits for 15 October to 11 November 2026.

Adam confirmed on 12 November 2026 that page views from the deployed tracking arrive in GA4 in real time.

After changes to tracking, visit `/`, `/portfolio/`, `/case-studies/meshii/`, `/privacy/`, `/blog/` and a published article. In browser network tools, check for one initial `page_view` sent to `G-TWKH9DPEMN` per load, with the expected URL, title and referrer. Confirm receipt in GA4 Realtime pages or DebugView. Inspect the stream's enhanced measurement settings if additional page views appear.

## Licence

The writing is copyright Adam Brewer. The code is available under the MIT licence.
