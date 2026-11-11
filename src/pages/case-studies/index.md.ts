import type { APIRoute } from 'astro';
import { caseStudies } from '../../data/case-studies';
import { getCaseStudyPath } from '../../lib/urls';

export const GET: APIRoute = ({ site }) => {
    const entries = caseStudies.map((study) => [
        `## ${study.title}`,
        '',
        study.context,
        '',
        study.summary,
        '',
        `- Read: ${new URL(getCaseStudyPath(study.slug), site).href}`,
        `- Markdown: ${new URL(`${getCaseStudyPath(study.slug)}index.md`, site).href}`,
    ].join('\n'));
    const markdown = ['# Case studies', 'Architecture, production fixes and engineering decisions.', ...entries].join('\n\n');
    return new Response(markdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
