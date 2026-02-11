import SectionShell from '@/components/core/SectionShell';
import Container from '@/components/core/Container';

export default function Hero() {
    return (
        <SectionShell id="hero" data-scene="hero">
            <Container className="flex flex-col items-start justify-center h-full">
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-foreground leading-tight tracking-tight mb-8">
                    Crafting <span className="text-accent">Digital</span> <br />
                    <span className="text-muted">Experiences</span>
                </h1>
                <p className="text-sm sm:text-base font-mono text-muted/70 max-w-md">
                    Senior Full-Stack Engineer specializing in cinematic web interactions and scalable architecture.
                </p>
            </Container>
        </SectionShell>
    );
}
