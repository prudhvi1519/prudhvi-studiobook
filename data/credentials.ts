export interface CredentialItem {
    id: string;
    title: string;
    issuer: string;
    date: string;
    oneLiner: string;
    category: 'Frontend' | 'Backend' | 'Cloud' | 'Tools';
}

export const CREDENTIALS: CredentialItem[] = [
    {
        id: 'c1',
        title: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2024',
        oneLiner: 'Associate level certification for cloud architecture.',
        category: 'Cloud',
    },
    {
        id: 'c2',
        title: 'Google Professional Cloud Developer',
        issuer: 'Google Cloud',
        date: '2023',
        oneLiner: 'Expertise in designing and building scalable apps on GCP.',
        category: 'Cloud',
    },
    {
        id: 'c3',
        title: 'Meta Frontend Developer',
        issuer: 'Coursera',
        date: '2022',
        oneLiner: 'Advanced React and UI/UX capability verification.',
        category: 'Frontend',
    },
    {
        id: 'c4',
        title: 'Node.js Application Development',
        issuer: 'OpenJS Foundation',
        date: '2022',
        oneLiner: 'Certified competence in building RESTful APIs.',
        category: 'Backend',
    },
    {
        id: 'c5',
        title: 'Docker Certified Associate',
        issuer: 'Mirantis',
        date: '2023',
        oneLiner: 'Containerization and orchestration mastery.',
        category: 'Tools',
    },
    {
        id: 'c6',
        title: 'MongoDB Developer',
        issuer: 'MongoDB University',
        date: '2021',
        oneLiner: 'NoSQL database modeling and performance tuning.',
        category: 'Backend',
    },
];
