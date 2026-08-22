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
- No build tools, frameworks or runtime dependencies
- Markdown companion files for agents

## Agent Discovery

- `sitemap.xml` lists canonical public URLs and is referenced from `robots.txt`.
- `robots.txt` includes AI crawler rules and Content Signals.
- `llms.txt` tells agents when to use the site and points them to canonical resources.
- HTML pages link to Markdown companions with `rel="alternate"` and to `llms.txt` with `rel="describedby"`.
- `404.html` gives agents recovery links while DigitalOcean preserves a real 404 response.
- DigitalOcean static sites cannot negotiate Markdown from the `Accept` header; agents use the advertised `.md` URLs instead.
- Keep every HTML/Markdown page pair and `sitemap.xml` in sync when publishing public content changes.

## Links

- [brewerlogic.com](https://brewerlogic.com)
- [LinkedIn](https://linkedin.com/in/adamcbrewer)
- [GitHub](https://github.com/adamcbrewer)

## License

Content is copyright Adam Brewer. Code is available under MIT license.
