# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Portfolio website for Adam Brewer. No build tools or frameworks; HTML, CSS, vanilla JavaScript, and a zero-dependency Node server for headers/content negotiation.

## Structure

```
index.html              # Single-page portfolio
index.md                # Markdown homepage for agents
server.js               # Node static server with Link headers + markdown negotiation
assets/
├── css/styles.css      # Styles with CSS custom properties for theming
├── js/main.js          # Theme toggle + active nav via Intersection Observer
└── img/                # Site assets
portfolio/
├── index.html          # Downloadable CV/resume at /portfolio
└── index.md            # Markdown CV/resume for agents
```

## Features

- **Dark/light theme**: Toggle with localStorage persistence, respects `prefers-color-scheme`
- **Active nav states**: Intersection Observer highlights current section
- **Responsive**: Mobile-first, works without JS
- **Agent discovery**: Sitemap, robots AI rules, Content Signals, Link headers, markdown negotiation

## Code Patterns

**CSS**
- CSS custom properties for theming (`--bg-primary`, `--accent`, etc.)
- BEM-inspired naming (`.section--alt`, `.btn--primary`)
- `[data-theme="dark"]` / `[data-theme="light"]` attribute selectors

**JavaScript**
- Vanilla JS, no dependencies
- IIFE pattern to avoid globals
- Intersection Observer for scroll-based interactions

## Content Sync

**IMPORTANT**: `index.html` and `portfolio/index.html` share content that must stay in sync:

| Section | index.html | portfolio/index.html |
|---------|------------|----------------|
| Job title | Hero section | Header `.title` |
| About/Summary | `#about` section | `.summary` paragraph |
| Skills | `.skills-list` | `.skills-grid` |
| Experience | `.timeline` | `.job` entries |
| Contact | Footer + contact section | `.contact-info` |

When updating copy in one file, check the other for corresponding content and update both.
