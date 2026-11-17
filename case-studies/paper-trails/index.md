---
title: Paper Trails platform rewrite / Case studies / Adam Brewer
description: Why I rebuilt Paper Trails in Next.js, what we left out, and how we moved existing orders across before the February deadline.
canonical: https://brewerlogic.com/case-studies/paper-trails/
---

# Paper Trails platform rewrite

Platform migration / January 2026.

I co-founded Paper Trails with my brother and look after everything technical. In late 2025, I rebuilt our React frontend and PHP API as one Next.js and TypeScript application. It took roughly three months of part-time work alongside my full-time job. We went live in early January 2026, ahead of our February target.

- Role: Technical Director and Co-Founder
- Migration: React / PHP API to Next.js / TypeScript
- Launch: Early January 2026
- Transition: Less than one hour of downtime

## The old app was getting in the way

Paper Trails turns outdoor activity data into personalised prints. The product worked, but maintaining it was becoming awkward. The frontend and PHP backend lived in separate repositories, small bugs were accumulating, and I had to keep both applications in step.

Partner campaigns made the problem more obvious. Adding a custom theme meant changing lots of files, then checking and releasing those changes across both apps. That was too much work for something we'd need to do again.

My brother and I went through analytics, order history and database logs to see what people actually used. We wanted to make custom work and maintenance easier while keeping the ordering flow and access to old print images working. A possible partner campaign gave us a February 2026 target.

I handled the architecture, implementation and delivery planning. My brother worked on branding, marketing and theme design. We agreed together what to keep and what to leave out.

## Why I chose a rewrite

I did consider refactoring the PHP application. Replacing a working product meant spending time on a rewrite, changing the deployment setup and risking new bugs. But I'd over-engineered the original system. Untangling it would still leave me with two applications in different languages to maintain.

I'd already used Next.js at Quilter, so it was familiar. Bringing the client and server code together meant I could share TypeScript models and validation, and make changes in one place. Server actions replaced our separate REST API. The server still handled validation and third-party credentials, and we still needed the external integrations and webhooks.

We kept much of the database structure and brought existing test cases across. We also moved checkout to Stripe's hosted payment flow, giving us less payment code to look after.

## Deciding what could wait

We agreed the must-haves before I started building. Customers sometimes ordered the preloaded example activities by mistake, so we removed them and started with an empty map. Automatic print labels also went. Differences in units and activity data had created too many edge cases and support questions.

The old feature backlog could wait. Getting the replacement into use and checking that it worked mattered more than adding everything we'd thought of along the way.

I wrote technical design docs for the main features and used them to break the work into smaller GitHub issues under parent issues. Labels, milestones and a Kanban board helped me pick things back up between other commitments.

AI agents helped organise the work and wrote much of the implementation. They updated issues and supplied test results, screenshots and browser reproductions for me to review. I checked the customer experience myself, with Storybook helping me inspect themes and component variations.

I started with tooling and tests, then worked through the application structure, print creation, checkout and integrations. Checking each feature as I went made several months of part-time work manageable.

## Moving across without losing old orders

Before launch, I worked through a deployment checklist on staging and a production release candidate. I backed up the database, image storage and repositories, then used analytics to choose a quiet time to switch the domain.

Moving the existing order data and images took less than an hour of downtime. Customers could still use their old order IDs to retrieve print images. Prefixes in those IDs let us tell the versions apart and return the right image.

Once we'd switched the domain, we made a live payment ourselves and watched for errors. I kept the old application running with everything it needed to take orders. If the payment check failed or errors appeared, I could switch the domain back and investigate the logs.

## What changed

We launched in early January, ahead of the February target. A custom theme now involves only a few files, and shared models and validation mean less duplicated code.

I also spend less time moving between repositories and coordinating releases. GitHub Actions runs the checks, and a merge to main deploys the whole application on DigitalOcean. I haven't put a number on the time saved, but there's less coordination involved in getting a change live.

After launch, we added an order dashboard that brings payment, email and fulfilment events together. Better logging helped us track down memory growth during on-demand image processing too. We addressed that by generating optimised images ahead of deployment.

## What I'd do differently

I'd built too much into the old system for things that never became important. Looking at actual usage helped us make better decisions about what deserved to stay.

The other lesson was about how I checked the work. I'd broken it into small tasks, but I needed to follow smaller changes all the way through the ordering flow too.

A post-launch review of our end-to-end tests showed gaps around the return from Stripe checkout. Unfinished print configurations lived in browser storage, so getting them back after payment depended on browser state. That was fragile and hard to test across browsers.

I introduced temporary MongoDB records with a 72-hour expiry so we could retrieve the configuration independently of the browser. The test review prompted that change.

Next time, I'd take something as specific as a print's orientation and check that it survived checkout and appeared correctly in the completed order. Then I'd expand to the other customisation options.

For a closer look at a separate production fix, read the [Paper Trails checkout case study](https://brewerlogic.com/case-studies/ai-engineering/).

- Case studies: https://brewerlogic.com/case-studies/
- Portfolio: https://brewerlogic.com/
