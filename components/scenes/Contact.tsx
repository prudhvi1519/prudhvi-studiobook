'use client';

import SectionShell from '../core/SectionShell';
import Container from '../core/Container';
import Button from '../ui/Button';
import { SOCIALS } from '../../data/socials';

export default function Contact() {
    return (
        <SectionShell id="contact" data-scene="contact" className="min-h-[60vh] flex items-center">
            <Container className="text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">
                    Let's <span className="text-accent">Create</span>
                </h2>
                <p className="text-muted text-lg max-w-2xl mx-auto mb-10">
                    Open for opportunities to build exceptional web experiences.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                    <Button onClick={() => window.location.href = 'mailto:hello@example.com'}>
                        Get in Touch
                    </Button>
                    <Button variant="outline" onClick={() => window.open('/resume.pdf')}>
                        View Resume
                    </Button>
                </div>

                <div className="flex flex-wrap gap-6 justify-center">
                    {SOCIALS.map((social) => (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-white transition-colors text-sm font-mono uppercase tracking-wider"
                        >
                            {social.platform}
                        </a>
                    ))}
                </div>
            </Container>
        </SectionShell>
    );
}
