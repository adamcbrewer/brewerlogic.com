# Portfolio & CV Rebuild Plan

## Project Overview
Complete rewrite of brewerlogic.com from Kirby CMS to a **static HTML site** (no framework/build), deployed via Digital Ocean Apps from `master` branch merges. Includes CV revamp and GitHub profile README update.

---

## Gathered Information

### Full Work History (from LinkedIn export)

| Period | Company | Role | Key Tech |
|--------|---------|------|----------|
| Jan 2024 - Present | **Quilter** | Senior Developer | React, Next.js, React Native, TS, Azure, Nx, Ionic |
| Mar 2019 - Present | **Paper Trails** | Technical Director / Co-Founder | React, TS, PHP, Laravel, Docker, Stripe |
| Feb 2023 - Oct 2023 | Meshii WiFi | Software Architect | React Native, AWS Serverless, Polygon blockchain |
| Mar 2022 - Nov 2022 | Novata | Senior Frontend Developer | React, TS, Prisma, PostgreSQL, Jest |
| Apr 2021 - Jan 2022 | Etch | Lead Front-end Developer | React, TS |
| Feb 2020 - Jun 2020 | **The Economist** | Senior Front-end Developer | Design Systems |
| Sep 2019 - Oct 2019 | **Apple** | Lead Web Developer | Internal tools |
| Aug 2017 - Jun 2018 | Applied Works | Senior Web Developer | React, TS, Redux, Storybook, team of 15-20 |
| Sep 2015 - Jul 2016 | Toaster | Interactive Developer | **Google** campaigns, Polymer |
| Oct 2014 - Feb 2015 | **Burberry** | Front-end Web Developer | Burberry.com, Burberry Experiences |
| Mar 2014 - Oct 2014 | Blackwell's | Front-end Developer | eBook platform |
| Dec 2012 - Jul 2013 | Saatchi & Saatchi | Senior Front End Developer | Mobile-responsive |
| Mar 2011 - Jul 2013 | Outside Line | Front-end Web Developer | Cravendale, Budweiser, etc. |
| Feb 2005 - Nov 2009 | **British Army** | Aircraft Technician (Corporal) | UK, Germany, Iraq |

### Education
- LPIC-1 Certification (2009) - Self-study post-Army
- REME School of Aeronautical Engineering (2005-2006) - Apprenticeship
- University of Cape Town (2003) - 1 year Mechanical Engineering

### Existing Assets
- `docs/portfolio.html` - Clean HTML/CSS resume template (usable as base)
- `docs/Adam Brewer - Resume - 2025-07.pdf` - Current PDF resume
- `docs/linkedin-profile.pdf` - Full LinkedIn export

---

## User Interview Summary

### Career Goals
Primarily contract, open to right permanent role

### Tech Focus
React, TypeScript, Next.js, Node, PHP. Hands-on but open to lead roles. Strong track record of learning new stacks as needed.

### Tone
Personality-driven

### Featured Projects
1. Paper Trails (co-founded SaaS)
2. The Economist (design system)
3. Google projects (Play Policy, Search Indonesia)
4. **Quilter** (current) - Enterprise financial management app for clients/account execs
   - Stack: Next.js, React, TypeScript, Azure, Nx, Ionic (mobile)

### Differentiators
- **Army background** → Discipline, adaptability, unique perspective
- **Design sensibility** → Collaboration with designer brother, eye for UX
- **Product mindset** → Paper Trails shows end-to-end ownership
- **Brand experience** → Google, Burberry, Economist, Adidas, Virgin

### Core Strength
**Communication** - Ability to translate technical concepts to stakeholders

### Skills to Add (missing from current portfolio)
- Testing expertise (Jest, Cypress, TDD)
- Team leadership (mentoring, code reviews, tech decisions)
- **AI fluency** ← Strong differentiator. Emphasis on adapting to AI-augmented workflows

---

## Bio Content (from current portfolio/LinkedIn)

**Philosophy:**
> "Design and function should be centred around the needs of users, being playful, but not overthought; I strive for simplicity in what I make."

**LinkedIn Summary:**
> Having spent more than a decade developing websites and applications, I love building and extending component systems, interfaces and APIs. I understand what it takes to both lead and support a team – communication is one of my strongest assets. I have extensive experience working in both large and small teams, being able collaborate and work autonomously.
>
> My experience is primarily in JavaScript, React/React Native, Typescript, HTML and CSS. My strengths are predominantly front-end with notable experience in back-end environments as well (Node and PHP). I'm very comfortable communicating needs and requirements to the back-end and devops teams and getting stuck in myself as and when required.

**Personal:**
- Former British Army Aircraft Technician (Corporal), served in UK, Germany, Iraq
- Interests: running, climbing, woodworking, bonsai, ultramarathons
- Brother Jake is a designer/illustrator at studiobrewer.com
- Co-founded Paper Trails together

---

## Tech Decision

### Pure Static HTML
- No framework, no build step, no dependencies
- Extend existing `docs/portfolio.html` as foundation
- CSS: Single stylesheet, modern CSS (grid, custom properties)
- JS: Minimal vanilla JS only if needed (dark mode toggle)
- Zero maintenance burden

### Site Structure
```
/
├── index.html          # Landing + About + Work + Experience + Contact (single page)
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js     # Dark/light toggle
│   └── img/
│       └── projects/   # Project screenshots
└── Adam-Brewer-Resume.pdf  # Downloadable
```

---

## Design Direction

### Primary Inspiration
- [Brittany Chiang](https://brittanychiang.com/) - Single-page scroll, dark minimal, sticky nav, section anchors
- [Sean O'Shea](https://seanoshea.me) - Resume-like, mobile-first, accessibility-focused

### Your Unique Flair
- **Monospace font** - JetBrains Mono, Fira Code, or IBM Plex Mono
- **80s aesthetic** - Subtle gradients (cyan→magenta, synthwave-inspired)
- **Dark/light toggle** - Default dark, smooth transition

### Layout
- Single-page scroll with section anchors (About, Work, Experience, Contact)
- Sticky left sidebar or top nav with social links (GitHub, LinkedIn, email)
- Timeline for experience
- Project cards with hover states
- Smooth scroll behavior

### Typography
- Monospace for headings + code snippets
- Clean sans-serif (Inter or system font) for body text
- High contrast for accessibility

### Color Palette (Dark Mode)
```css
--bg-dark: #0a192f;        /* Brittany-inspired navy or #1a1a2e deeper */
--text: #ccd6f6;
--accent: linear-gradient(135deg, #00d4ff, #ff00ff);  /* 80s gradient */
--highlight: #64ffda;      /* cyan or #ff6b9d hot pink */
```

### Contact
Simple mailto: link (no form needed)

---

## Featured Projects (Top 4-5)

1. **Quilter** (current)
   - Enterprise fintech portfolio planner for financial advisers
   - Web (React/Next) + Mobile (React Native/Ionic)
   - Shipped POC in <1 year, multiple releases since launch
   - Stack: Next.js, React, TypeScript, Azure, Nx

2. **Paper Trails**
   - Co-founded SaaS with brother Jake
   - Create custom art prints from Strava/GPX adventure data
   - Full-stack ownership: React frontend, Laravel API, Stripe payments
   - Stack: React, TypeScript, PHP, Laravel, Docker, TDD

3. **The Economist**
   - Contributed to Design System used across all digital products
   - Built styleguide showcase website
   - Enterprise scale, high standards

4. **Google (via Toaster)**
   - Google Play Policy developer guidelines
   - Google Search Indonesia mobile localization
   - Polymer web components, Material Design

5. *Optional:* Adidas Statement Collection or Burberry work

---

## Content Strategy

- **Personality-driven** tone
- Lead with the Army → self-taught → senior dev narrative
- Emphasize: Communication, AI fluency, adaptability
- Show, don't tell: Code quality visible in site itself

---

## CV/Resume Updates

### Already Have
- `docs/portfolio.html` - Good HTML/CSS template
- PDF version exists

### Updates Needed
- Add AI fluency to skills
- Add team leadership/mentoring
- Add testing expertise (Jest, TDD)
- Update summary to reflect current goals
- Ensure print stylesheet works well

---

## GitHub Profile README

Update `adamcbrewer/adamcbrewer/README.md`:
- Link to brewerlogic.com prominently
- Brief intro with personality
- Current focus: React/TS/Next, AI-augmented workflows
- Contact links

---

## Implementation Steps

### Step 1: Review Design Examples ✅
- Brittany Chiang + Sean O'Shea chosen
- 80s flair with monospace font confirmed

### Step 2: Build Site Structure
- Create clean HTML pages
- Responsive CSS (mobile-first)
- Dark/light toggle with localStorage persistence
- Test print stylesheet for resume

### Step 3: Write Content
- Refine bio/summary
- Project descriptions
- Skills section with AI fluency

### Step 4: Deploy
- Configure Digital Ocean App Platform
- Point brewerlogic.com domain
- Verify SSL

### Step 5: GitHub README
- Update profile README
- Link to new portfolio

---

## Deployment

- Digital Ocean App Platform
- Auto-deploy from `master` branch
- Custom domain: brewerlogic.com
- Free tier should suffice for static

---

## Verification Plan

1. **Local testing** - Open HTML files in browser, test all links
2. **Responsive check** - Test at mobile (375px), tablet (768px), desktop (1200px+)
3. **Print stylesheet** - Print resume page to PDF, verify formatting
4. **Dark/light toggle** - Test theme switch, verify persistence
5. **Accessibility** - Run Lighthouse audit, verify keyboard nav
6. **Deploy test** - Push to DO, verify auto-deploy works
7. **Domain check** - Confirm brewerlogic.com resolves correctly

---

## Tracking

| Task | Status |
|------|--------|
| Scrape portfolio | ✅ Done |
| Scrape GitHub | ✅ Done |
| Scrape LinkedIn | ✅ Done (PDF provided) |
| Best practices research | ✅ Done |
| User interview | ✅ Done |
| Design review | ✅ Done (Brittany + Sean + 80s flair) |
| Site implementation | ⏳ Ready to start |
| CV update | ⏳ Ready to start |
| GitHub README update | ⏳ Ready to start |
| DO deployment | ⏳ After site build |

---

## Best Practices Research Summary

Sources: [SEED Infotech](https://www.seedinfotech.com/how-to-build-a-strong-portfolio-as-a-full-stack-developer-in-2026/), [Hostinger](https://www.hostinger.com/tutorials/web-developer-portfolio), [Arc.dev](https://arc.dev/talent-blog/web-developer-portfolio/), [Colorlib](https://colorlib.com/wp/developer-portfolios/), [Really Good Designs](https://reallygooddesigns.com/developer-portfolio-examples/)

1. **3-5 Featured Projects** with problem/context, your role, tech used, live demo + source links
2. **Clear Skills Section** - Frontend/Backend/Tools separated
3. **Fast & Mobile-First** - Performance is part of the portfolio
4. **Personal Brand** - Show personality, not just tech
5. **Easy Contact** - Clear CTA, not buried
6. **Clean Code** - Portfolio itself demonstrates skills
