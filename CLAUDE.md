# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website built on **Kirby CMS** (file-based, no database) with a Gulp-based frontend build pipeline. ES6 JavaScript transpiled via Babel/Browserify, SASS for styles.

## Commands

```bash
# Initial setup
chmod +x ./init.sh ./update-submodules.sh ./update-permissions.sh
./init.sh && ./update-submodules.sh && ./update-permissions.sh

# Development (build + watch)
gulp

# Individual tasks
gulp sass              # Compile SASS → CSS with autoprefixing & sourcemaps
gulp js                # Bundle ES6 → ES5 via Browserify/Babel
gulp images:build      # Optimize all images (raster + vector)
gulp modernizr         # Generate Modernizr build
gulp clean:assets      # Empty build directories
gulp build             # Full production build

# Version bumping
gulp bump --patch      # 0.0.X (default)
gulp bump --minor      # 0.X.0
gulp bump --major      # X.0.0
```

## Architecture

```
src/                    # Source files
├── js/app.js          # JS entry point, ES6 modules in modules/
├── sass/screen.scss   # SASS entry point, SMACSS organization
└── img/               # Unoptimized images

app/                    # Kirby CMS + compiled output
├── kirby/, panel/     # Git submodules (CMS core)
├── site/
│   ├── config/        # Routes, API endpoints, credentials
│   ├── templates/     # Page templates (PHP)
│   ├── models/        # Custom page models
│   ├── snippets/      # Reusable partials
│   └── blueprints/    # Content structure (YAML)
├── content/           # File-based content (not in git)
└── assets/            # Build output (CSS, JS, images)

gulp/
├── config.js          # All task configuration
└── tasks/             # Individual gulp tasks
```

## Code Patterns

**PHP (Kirby)**
- Methods: `snake_case` (e.g., `get_image_by_filename`)
- Custom routes in `app/site/config/config.php` return JSON
- Page models extend Kirby's `Page` class

**JavaScript (ES6)**
- Modules: named exports, ES6 classes with method chaining
- Global namespace: `global.Site` for shared state
- Entry: `src/js/app.js` → `app/assets/js/scripts.min.js`

**SASS**
- SMACSS: globals/, modules/, partials/, media/, mixins/
- BEM-inspired classes (e.g., `.section--alt`, `.btn--primary`)
- Entry: `src/sass/screen.scss` → `app/assets/css/styles.min.css`

## API Endpoints

- `GET /api/twitter` - Fetches filtered tweets (configured in `config.php`)

## Notes

- Content files (`app/content/`) not in git - obtain separately
- Kirby license key required for production
- Twitter/Tumblr API credentials configured in `app/site/config/config.php`
