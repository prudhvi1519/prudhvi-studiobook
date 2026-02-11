export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    period: string;
    summary: string;
    bullets: string[]; // 2-3 short proof bullets
}

export const EXPERIENCE: ExperienceItem[] = [
    {
        id: 'exp1',
        role: 'Senior Frontend Engineer',
        company: 'TechFlow Systems',
        period: '2023 - Present',
        summary: 'Leading the frontend architecture for the core SaaS platform.',
        bullets: [
            'Reduced initial load time by 40% using Next.js optimization strategies.',
            'Implemented a reusable design system used by 5+ internal teams.',
            'Mentored 3 junior developers to promotion.',
        ],
    },
    {
        id: 'exp2',
        role: 'Full Stack Developer',
        company: 'Creative Solutions',
        period: '2021 - 2023',
        summary: 'Built and scaled multiple client applications from scratch.',
        bullets: [
            'Developed a real-time collaboration tool using WebSockets and React.',
            'Optimized database queries reducing API latency by 60%.',
        ],
    },
];
