export interface Project {
    id: string;
    title: string;
    oneLiner: string; // max 1 line
    tags: string[]; // max 6
    imageUrl: string;
    links: {
        live?: string;
        repo?: string;
        caseStudy?: string;
    };
}

export const PROJECTS: Project[] = [
    {
        id: 'p1',
        title: 'Neon Nexus',
        oneLiner: 'Cyberpunk dashboard with real-time data visualization.',
        tags: ['Next.js', 'TypeScript', 'D3.js', 'Tailwind'],
        imageUrl: '/images/project1-placeholder.jpg',
        links: {
            live: 'https://example.com',
            repo: 'https://github.com/example/repo',
            caseStudy: '/cases/neon-nexus',
        },
    },
    {
        id: 'p2',
        title: 'Aether Finance',
        oneLiner: 'DeFi protocol interface for staking and swapping assets.',
        tags: ['React', 'Ethers.js', 'Solidity', 'Framer Motion'],
        imageUrl: '/images/project2-placeholder.jpg',
        links: {
            live: 'https://example.com',
            repo: 'https://github.com/example/repo',
        },
    },
    {
        id: 'p3',
        title: 'Quantum Chat',
        oneLiner: 'E2E encrypted messaging app with zero-knowledge architecture.',
        tags: ['Vue', 'WebSockets', 'Node.js', 'Redis'],
        imageUrl: '/images/project3-placeholder.jpg',
        links: {
            repo: 'https://github.com/example/repo',
        },
    },
];
