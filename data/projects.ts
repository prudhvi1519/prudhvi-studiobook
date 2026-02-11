export interface Project {
    id: string;
    title: string;
    oneLiner: string;
    tags: string[];
    links: {
        live?: string;
        repo?: string;
        case?: string;
    };
}

export const PROJECTS: Project[] = [
    {
        id: 'studiobook',
        title: 'StudioBook',
        oneLiner: 'Cinematic portfolio with GSAP & Next.js',
        tags: ['Next.js', 'GSAP', 'Tailwind', 'TypeScript'],
        links: { repo: 'https://github.com/prudhvi1519/prudhvi-studiobook' }
    },
    {
        id: 'commerce-core',
        title: 'Commerce Core',
        oneLiner: 'Headless e-commerce engine with infinite scalability',
        tags: ['Node.js', 'GraphQL', 'Redis', 'Docker'],
        links: { live: '#' }
    },
    {
        id: 'dashboard-ui',
        title: 'Analytics Dashboard',
        oneLiner: 'Real-time data visualization platform',
        tags: ['React', 'D3.js', 'WebSockets'],
        links: { live: '#' }
    }
];
