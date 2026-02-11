'use client';

import SectionShell from '@/components/core/SectionShell';
import Container from '@/components/core/Container';
import Button from '@/components/ui/Button';
import { SOCIALS } from '@/data/socials';

export default function Contact() {
    return (
        <SectionShell id="contact" data-scene="contact">
            <Container className="text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">
                    Let&apos;s <span className="text-accent">Connect</span>
                </h2>
                <p className="text-lg text-muted/70 max-w-xl mx-auto mb-12">
                    Open to discussing new opportunities, collaborations, or just geek out over tech.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                    {SOCIALS.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-full border border-white/10 bg-panel hover:bg-white/10 hover:border-accent/50 hover:text-accent transition-all duration-300"
                            aria-label={social.label}
                        >
                            <social.icon size={24} />
                        </a>
                    ))}
                </div>

                <Button size="lg" onClick={() => window.location.href = 'mailto:contact@prudhvi.studio'}>
                    Say Hello
                </Button>
            </Container>
        </SectionShell>
    );
}
