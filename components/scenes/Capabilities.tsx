import SectionShell from '@/components/core/SectionShell';
import Container from '@/components/core/Container';
import Chip from '@/components/ui/Chip';

const CAPABILITIES = [
    'Full-Stack Architecture',
    'Next.js & React Ecosystem',
    'Cloud Infrastructure (AWS/GCP)',
    'System Design',
    'Performance Optimization',
    'Design Systems',
    'Technical Leadership',
    'CI/CD Pipelines'
];

export default function Capabilities() {
    return (
        <SectionShell id="capabilities" data-scene="capabilities">
            <Container>
                <h2 className="text-3xl font-display font-bold mb-8 text-foreground">Capabilities</h2>

                <div className="flex flex-wrap gap-3 max-w-2xl">
                    {CAPABILITIES.map((cap) => (
                        <Chip key={cap} className="text-sm px-4 py-2 bg-panel/50 border-white/10 text-muted hover:text-accent hover:border-accent/30 transition-colors">
                            {cap}
                        </Chip>
                    ))}
                </div>
            </Container>
        </SectionShell>
    );
}
