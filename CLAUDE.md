# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Static portfolio website for Adam Brewer. No build tools, no frameworks—just HTML, CSS, and vanilla JavaScript.

## Structure

```
index.html              # Single-page portfolio
assets/
├── css/styles.css      # Styles with CSS custom properties for theming
├── js/main.js          # Theme toggle + active nav via Intersection Observer
└── img/                # Site assets
docs/
├── portfolio.html      # Downloadable CV/resume
└── *.pdf               # Resume PDFs
```

## Features

- **Dark/light theme**: Toggle with localStorage persistence, respects `prefers-color-scheme`
- **Active nav states**: Intersection Observer highlights current section
- **Responsive**: Mobile-first, works without JS

## Code Patterns

**CSS**
- CSS custom properties for theming (`--bg-primary`, `--accent`, etc.)
- BEM-inspired naming (`.section--alt`, `.btn--primary`)
- `[data-theme="dark"]` / `[data-theme="light"]` attribute selectors

**JavaScript**
- Vanilla JS, no dependencies
- IIFE pattern to avoid globals
- Intersection Observer for scroll-based interactions

## Deployment

Static files—deploy anywhere (GitHub Pages, Netlify, Digital Ocean, etc.)

No build step required.
