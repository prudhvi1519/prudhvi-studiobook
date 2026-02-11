export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    period: string;
    summary: string;
    bullets: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
    {
        id: 'senior-eng',
        role: 'Senior Full-Stack Engineer',
        company: 'Tech Innovations Inc.',
        period: '2023 - Present',
        summary: 'Leading development of enterprise-grade cloud solutions and microservices architecture.',
        bullets: [
            'Architected scalable microservices system reducing latency by 40%',
            'Mentored junior developers and established code quality standards',
            'Implemented CI/CD pipelines increasing deployment frequency'
        ]
    },
    {
        id: 'frontend-lead',
        role: 'Frontend Lead',
        company: 'Digital Solutions',
        period: '2021 - 2023',
        summary: 'Spearheaded frontend modernization and component library development.',
        bullets: [
            'Developed core design system used across 5 products',
            'Optimized application performance improving LCP by 2s',
            'Led migration from legacy codebase to Next.js'
        ]
    }
];
