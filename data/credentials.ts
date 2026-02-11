export interface CredentialItem {
    id: string;
    title: string;
    issuer: string;
    date: string;
    oneLiner: string;
}

export const CREDENTIALS: CredentialItem[] = [
    {
        id: 'aws-sa',
        title: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2024',
        oneLiner: 'Professional certification for designing distributed systems on AWS.'
    },
    {
        id: 'meta-fe',
        title: 'Meta Frontend Developer',
        issuer: 'Meta',
        date: '2023',
        oneLiner: 'Advanced certification in React and modern frontend web development.'
    },
    {
        id: 'google-cloud',
        title: 'Google Cloud Engineer',
        issuer: 'Google Cloud',
        date: '2023',
        oneLiner: 'Associate Cloud Engineer certification.'
    }
];
