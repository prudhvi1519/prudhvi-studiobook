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
    caseStudy?: {
        problem: string;
        constraints: string[];
        solution: string[];
        result: string[];
        demo?: string; // URL to video or interactive demo if any
    };
    buildLog?: {
        date: string;
        note: string;
    }[];
}

export const PROJECTS: Project[] = [
    {
        id: 'studiobook',
        title: 'StudioBook',
        oneLiner: 'Cinematic portfolio with GSAP & Next.js',
        tags: ['Next.js', 'GSAP', 'Tailwind', 'TypeScript'],
        links: { repo: 'https://github.com/prudhvi1519/prudhvi-studiobook' },
        caseStudy: {
            problem: "Traditional portfolios are static and fail to demonstrate improved engineering capabilities or attention to detail in motion design.",
            constraints: [
                "Must achieve 60fps animations on average devices",
                "Strict TypeScript strictness",
                "Zero layout shift during transitions"
            ],
            solution: [
                "Implemented a custom SceneEngine using GSAP ScrollTrigger for precise timeline control",
                "Used FLIP (First Last Invert Play) technique for seamless layout morphing",
                "Optimized rendering with hardware acceleration and 'will-change' properties"
            ],
            result: [
                "Achieved < 100ms TBT (Total Blocking Time)",
                "Smooth scroll scrubbing across all scene transitions",
                "Modular architecture allowing easy addition of new case studies"
            ]
        },
        buildLog: [
            { date: '2026-02-10', note: 'Initialized project with Next.js 15 and Tailwind v4' },
            { date: '2026-02-11', note: 'Implemented SceneEngine and Docking Transitions' },
            { date: '2026-02-12', note: 'Added Bento Grid and Case Study Overlay' }
        ]
    },
    {
        id: 'commerce-core',
        title: 'Commerce Core',
        oneLiner: 'Headless e-commerce engine with infinite scalability',
        tags: ['Node.js', 'GraphQL', 'Redis', 'Docker'],
        links: { live: '#' },
        caseStudy: {
            problem: "Legacy monolithic platforms were unable to handle Black Friday traffic spikes, leading to downtime and lost revenue.",
            constraints: ["Maintain data consistency", "Sub-200ms API response time", "Zero downtime deployment"],
            solution: ["Microservices architecture with Redis caching layer", "Event-driven order processing using Kafka", "Horizontal auto-scaling on Kubernetes"],
            result: [" handled 50k concurrent users", "99.99% uptime during peak sales", "Reduced infrastructure costs by 30%"]
        }
    },
    {
        id: 'dashboard-ui',
        title: 'Analytics Dashboard',
        oneLiner: 'Real-time data visualization platform',
        tags: ['React', 'D3.js', 'WebSockets'],
        links: { live: '#' },
        caseStudy: {
            problem: "Users needed actionable insights from terabytes of streaming data in real-time, but existing tools were too slow.",
            constraints: ["Visualizing 1M+ data points", "Low latency updates", "Mobile responsive"],
            solution: ["Canvas-based rendering for high-density charts", "WebSocket aggregation service", "Virtualization for data grids"],
            result: ["Real-time updates with < 50ms latency", "Smooth 60fps rendering of massive datasets", "Positive user feedback on interactivity"]
        }
    }
];
