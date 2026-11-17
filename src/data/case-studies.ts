export const meshiiCaseStudy = {
    slug: 'meshii',
    title: 'Meshii WiFi',
    description: 'The app, AWS services, device data processing and Polygon test rewards I worked on as Software Architect for the Meshii WiFi private pilot.',
    summary: 'How I designed the app and AWS services for a private WiFi pilot, connecting device setup, network data and test rewards on Polygon.',
    context: 'Private pilot / 2023',
    variant: 'meshii',
} as const;

export const aiEngineeringCaseStudy = {
    slug: 'ai-engineering',
    title: 'AI-assisted engineering',
    description: 'How I diagnosed and fixed a Paper Trails checkout failure, using OpenCode and Claude Code to draft code and tests from my plan.',
    summary: 'A Paper Trails checkout fix covering Stripe, database constraints and how I used AI to draft and review the implementation.',
    context: 'Production fix / January 2026',
    variant: 'ai',
} as const;

export const paperTrailsCaseStudy = {
    slug: 'paper-trails',
    title: 'Paper Trails platform rewrite',
    description: 'How I planned and delivered the Paper Trails migration from a React frontend and PHP API to Next.js, keeping existing orders accessible and launching ahead of the target.',
    summary: 'Scope decisions, delivery planning and the move from a React frontend and PHP API to one Next.js application, launched in January 2026.',
    context: 'Platform migration / January 2026',
    variant: 'paper-trails',
} as const;

export const caseStudies = [paperTrailsCaseStudy, meshiiCaseStudy, aiEngineeringCaseStudy] as const;

export type CaseStudy = typeof caseStudies[number];
