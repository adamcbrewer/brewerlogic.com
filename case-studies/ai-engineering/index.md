---
title: AI-assisted engineering case study | Adam Brewer
description: How I diagnosed and fixed a Paper Trails checkout failure, using OpenCode and Claude Code to draft code and tests from my plan.
canonical: https://brewerlogic.com/case-studies/ai-engineering/
---

# AI-assisted engineering

Paper Trails checkout, January 2026.

I used OpenCode and Claude Code while rewriting Paper Trails from Laravel to Next.js. A customer completed a free checkout, but the application didn't create an order. I traced the cause, wrote the plan and used the agents to draft the code and tests. I reviewed and simplified the result before deployment.

- Role: Technical Director and Co-Founder
- System: Paper Trails checkout: Next.js / Stripe / MongoDB
- AI tools: Claude Code and OpenCode
- Result: No repeat failures observed from January through July 2026

## The incident

### The report

A customer completed checkout with a 100% discount, but Paper Trails never created the order.

### The cause

Stripe doesn't create a PaymentIntent when the checkout total is zero. The application had stored the order details only on that payment record.

### The fix

I moved the order details to the Stripe Checkout Session, which exists for both paid and free orders.

I checked the Paper Trails logs and Stripe records to confirm the cause. Then I wrote a plan covering the change, the files involved and the checks I needed before deployment.

## From diagnosis to release

```text
Customer report
  -> I diagnose the problem
  -> I write the plan
  -> AI drafts code and tests
  -> I review and simplify
  -> Test, release and monitor
```

The agents worked from that plan. I reviewed their implementation and test coverage, simplified the code, then checked the fix before releasing it and monitoring the result.

## Implementation and review

### What I decided

- Confirm how Stripe handles a checkout with a zero total.
- Use the Checkout Session as the source of order details.
- Require a unique Stripe checkout session ID in the database to prevent duplicate orders.
- Choose the automated and manual checks needed before deployment.
- Add a browser test as follow-up protection.

### What the agents drafted

- Production code based on my written plan.
- Focused automated tests for payments and orders.
- Code and security reviews against the agreed design.

During review I removed two browser-side checks that added complexity. The database's unique Stripe session ID was the protection against duplicate orders. I kept the browser code straightforward and left the larger checkout redesign for a separate follow-up.

## Checks and outcome

I saw no repeat failures between the January 2026 deployment and July 2026.

### Checks before deployment

- Unit tests passed.
- Code quality, formatting and production build checks passed.
- I completed a free checkout manually in Stripe's test environment.
- The order was saved and matched to its Stripe checkout session.
- The affected customer confirmed successful completion.

### The later browser test

I added the Playwright browser test after the fix went live, alongside a later checkout redesign. That follow-up moved thank-you page processing from the browser to the server. The browser test wasn't one of the checks I ran before the initial deployment.

### What I took from it

The written plan gave the agents a clear change to work on and gave me something concrete to review against. I still needed to check the implementation and remove unnecessary code. I haven't measured a speed or defect-rate improvement for this incident.

## What I checked

- My incident plan, including the cause, chosen solution, files to change and completed checks.
- Project history covering the initial fix, my simplification and the later redesign.
- Automated tests for payments, orders and Stripe settings.
- The later Playwright test for a digital checkout with a zero total.
- Automated checks for formatting, code quality, unit tests, production builds and browser tests.

Paper Trails is named with permission. I've left out customer data, order details, logs, credentials, environment settings and private repository links.

- Case studies: https://brewerlogic.com/case-studies/
- Portfolio: https://brewerlogic.com/
- CV: https://brewerlogic.com/Adam-Brewer-Senior-Full-Stack-Engineer-CV.pdf
