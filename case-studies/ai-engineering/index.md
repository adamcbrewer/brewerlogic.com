---
title: AI-Assisted Engineering Case Study | Adam Brewer
description: A Paper Trails production incident showing how Adam Brewer diagnosed and designed a checkout fix before AI drafted code, tests and review.
canonical: https://brewerlogic.com/case-studies/ai-engineering/
---

# AI-Assisted Engineering

Production incident record, January 2026.

A real Paper Trails checkout failure showing how I use AI as part of a human-led engineering process. I diagnosed the problem and designed the solution before involving AI. A written plan then guided Claude Code and OpenCode as they drafted code, tests and review. I simplified their output and checked the fix before deployment.

- Role: Technical Director and Co-Founder
- System: Paper Trails checkout, using Next.js / Stripe / MongoDB
- AI tools: Claude Code and OpenCode
- Result: No repeat failures observed from January through July 2026

## The Incident

A customer completed a checkout with a 100% discount, but Paper Trails did not create an order.

Stripe does not create its usual payment record, called a PaymentIntent, when a checkout total is zero. The order details had been stored only on that record, so Paper Trails could not create the order.

I confirmed the cause using Paper Trails logs and Stripe records before involving AI. I chose the Stripe Checkout Session, which exists for both paid and free orders, as the one reliable place for order details. I then wrote a plan covering the diagnosis, chosen solution, files to change and checks the fix had to pass.

## Plan to Proof

```text
Customer report
  -> Adam diagnoses the problem
  -> Adam designs the solution and writes the plan
  -> Claude Code and OpenCode draft code, tests and review
  -> Adam reviews and simplifies the result
  -> Checks before deployment
  -> Deployment and monitoring
  -> Playwright browser test added later
```

This reflects how I use AI in production work. I make the technical decisions and define what success means first. AI then drafts a limited, agreed part of the work.

## Who Decided What

### Adam's Decisions

- Identify how Stripe handles checkouts with a zero total.
- Choose the Stripe Checkout Session as the reliable source of order details.
- Prevent duplicate orders by requiring each Stripe checkout session ID to be unique in the database.
- Choose the automated and manual checks required before deployment.
- Add an automated browser test later as further protection.

### Claude Code and OpenCode

- Drafted the production code from my written plan.
- Drafted focused automated tests for payments and orders.
- Drafted code and security reviews against my agreed design.

### My Review Changed the Result

I removed two extra browser-side checks that made the code more complicated. The database's unique Stripe session ID was the real protection against duplicate orders, so I kept the browser code straightforward. I also kept a larger checkout redesign separate from this incident fix and completed it as later follow-up work.

## Checks and Result

Checks and confirmation:

- Automated unit tests passed.
- Code quality, formatting and production build checks passed.
- A checkout with a zero total was completed manually in Stripe's test environment.
- The order was saved and matched to its Stripe checkout session.
- The affected customer confirmed successful completion.

No repeat failures were observed from the January 2026 deployment through July 2026.

After deployment, I added a Playwright automated browser test for checkouts with a zero total. This was added alongside a broader redesign that moved thank-you page processing from the browser to the server. It was later protection, not a check completed before deployment.

## What This Proves

This case shows a structured, repeatable way to use AI in production engineering. It does not prove that AI increased speed or reduced defects. AI did not diagnose the problem, design the solution or deliver the change without human oversight.

## Evidence Reviewed

- My incident plan, including the cause, chosen solution, files to change and completed checks.
- Project history showing the initial fix, my simplification and the later redesign.
- Automated tests covering payments, orders and Stripe settings.
- The later Playwright browser test for a digital checkout with a zero total.
- Automated checks for formatting, code quality, unit tests, production builds and browser tests.

Paper Trails is named with permission. No repository or pull request links are included. Customer identity, order data, logs, environment settings and credentials are also omitted.

- Portfolio: https://brewerlogic.com/
- CV: https://brewerlogic.com/Adam-Brewer-Senior-Full-Stack-Engineer-CV.pdf
