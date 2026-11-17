---
title: Paper Trails platform rewrite / Case studies / Adam Brewer
description: How I planned and delivered the Paper Trails migration from a React frontend and PHP API to Next.js, keeping existing orders accessible and launching ahead of the target.
canonical: https://brewerlogic.com/case-studies/paper-trails/
---

# Paper Trails platform rewrite

Platform migration / January 2026.

I co-founded Paper Trails with my brother and run its technical side. In late 2025, I rebuilt our React frontend and PHP API as one Next.js and TypeScript application. We launched in early January 2026, ahead of our February target, after roughly three months of part-time implementation alongside my full-time job.

- Role: Technical Director and Co-Founder
- Migration: React / PHP API to Next.js / TypeScript
- Launch: Early January 2026
- Transition: Less than one hour of downtime

## A working product that was becoming harder to change

Paper Trails turns outdoor activity data into personalised prints. Our frontend and PHP backend lived in separate repositories, and keeping them in step had become awkward as small bugs accumulated. Partner campaigns exposed another problem: adding a custom theme meant changing numerous files, making each release harder to publish and check.

We reviewed analytics, order history and database logs to decide which features customers used enough to justify their maintenance cost. Success meant preserving the important customer journeys, making custom work easier and keeping previous order images accessible. A possible partner campaign gave us a February 2026 target.

I owned the architecture, technical decisions, implementation and delivery planning. My brother contributed branding, marketing and theme design, and helped agree the reduced scope and customer experience.

## One application to build and release

I considered refactoring the existing PHP application. It already worked, and replacing it meant spending time on a rewrite, changing our deployment setup and risking regressions. But I'd over-engineered the original architecture. Refactoring would still leave me maintaining two applications in different languages.

I'd already used Next.js at Quilter. It gave me a familiar way to bring the client and server code together, with shared TypeScript models, schemas and validation. Server actions replaced our separate application REST API. Server-side validation and third-party credentials still belonged on the server, and external integrations and webhooks remained part of the system.

We kept much of the database structure and brought existing test cases into the replacement. We also moved checkout to Stripe's hosted payment flow, reducing the payment code we maintained ourselves.

## Keep the first release focused

My brother and I agreed the must-haves before implementation. We removed preloaded example activities that customers sometimes ordered by mistake, starting with an empty map instead. We also removed automatic print labels, which created support work around differing units and inconsistent activity data. The old feature backlog stayed outside the launch requirements.

I used technical design documents for major features and domains to break the work into smaller GitHub issues beneath parent issues. Labels, milestones and a Kanban board helped me track progress across several months of part-time work.

AI agents helped organise the work and draft much of the implementation. They updated issues and supplied test results, screenshots and browser reproductions. I checked the customer experience myself, using manual checks and Storybook to inspect themes and component variations.

I put developer tooling and tests first, then worked through the application structure, print creation, checkout and integrations. Checking features as we went helped keep the work manageable.

## Keep old orders accessible and a way back

Before launch, I worked through a deployment checklist on staging and a production release candidate. I retained database, storage and repository backups, and used analytics to choose a quiet period for the domain switch.

The transition included moving existing order data and images and took less than an hour of downtime. Customers could still retrieve previous print images using their existing order IDs. ID prefixes distinguished versions and routed requests to the appropriate images.

After switching the domain, we made a live payment ourselves and watched for errors. The old application stayed operational with the data and integrations needed to take orders. If verification failed, the plan was to reverse the domain switch and investigate the logs. This was a manual rollback plan.

## Launched ahead of the February target

We went live in early January 2026 after approximately three months of part-time implementation in late 2025. Custom themes now involve only a few files. Shared models and validation reduce duplicated logic, and we spend less time switching repositories and coordinating separate releases.

GitHub Actions runs the checks, and a merge to main deploys the application together on DigitalOcean. The improvement is in maintenance and release coordination. I haven't measured a before-and-after time saving or a revenue or conversion change.

After launch, we added an order dashboard that brings payment, email and fulfilment events into a traceable history. Better logging also helped us diagnose memory growth during on-demand image processing. We addressed that by generating optimised images ahead of deployment.

## Check the whole customer journey earlier

I'd introduced complexity for possibilities that never became important. Actual usage gave us a better basis for deciding what to keep.

I'd also verify smaller changes through the complete ordering flow earlier. Breaking work into small GitHub tasks wasn't enough if the checks stopped at the boundaries between features.

A post-launch review found gaps in our end-to-end tests around the return from Stripe checkout. Unfinished print configurations lived in browser storage, making retrieval after payment dependent on browser state and difficult to test across browsers. I introduced temporary MongoDB records with a 72-hour expiry so the configuration could be retrieved independently of the browser. The trigger was the test review, rather than a reported customer payment failure.

Next time, I'd check something as specific as a print's orientation all the way through checkout and into the completed order before expanding to the other customisation options.

For a separate production incident, read the [Paper Trails checkout case study](https://brewerlogic.com/case-studies/ai-engineering/).

- Case studies: https://brewerlogic.com/case-studies/
- Portfolio: https://brewerlogic.com/
