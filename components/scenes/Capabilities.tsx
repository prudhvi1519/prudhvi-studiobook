'use client';

import SectionShell from '../core/SectionShell';
import Container from '../core/Container';
import SceneWrapper from '../core/SceneWrapper';
import Card from '../ui/Card';

const CAPABILITIES = [
    { title: "Frontend Architecture", items: ["React/Next.js", "TypeScript", "Tailwind CSS", "Micro-frontends"] },
    { title: "Backend Systems", items: ["Node.js", "PostgreSQL", "Redis", "Serverless"] },
    { title: "DevOps & Cloud", items: ["AWS", "Docker", "CI/CD", "Terraform"] },
    { title: "Performance", items: ["Web Vitals", "Optimization", "Caching", "Analytics"] }
];

export default function Capabilities() {
    return (
        <SectionShell id="capabilities" data-scene="capabilities">
            <Container>
                <h2 className="text-3xl font-display font-bold mb-12 text-foreground">Capabilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {CAPABILITIES.map((cap) => (
                        <Card key={cap.title} className="hover:border-accent/30">
                            <h3 className="text-lg font-bold mb-4 text-accent">{cap.title}</h3>
                            <ul className="space-y-2">
                                {cap.items.map((item) => (
                                    <li key={item} className="text-sm text-muted flex items-center gap-2">
                                        <span className="w-1 h-1 bg-white/50 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>
            </Container>
        </SectionShell>
    );
}
