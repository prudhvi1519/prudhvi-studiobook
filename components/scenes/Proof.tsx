'use client';

import SectionShell from '../core/SectionShell';
import Container from '../core/Container';
import Card from '../ui/Card';
import Chip from '../ui/Chip';
import Drawer from '../ui/Drawer';
import SceneWrapper from '../core/SceneWrapper';
import { calculateMask } from '../core/transitions/typographicMask';
import { EXPERIENCE, ExperienceItem } from '../../data/experience';
import { useState } from 'react';

export default function Proof() {
    const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

    return (
        <SceneWrapper id="proof-wrapper" scrubLength={800}>
            {(progress) => (
                <div className="relative min-h-screen bg-panel z-20">
                    <SectionShell id="experience" data-scene="proof">
                        <Container>
                            <h2 className="text-3xl font-display font-bold mb-12 text-foreground">Track Record</h2>

                            <div className="grid gap-6 md:grid-cols-2">
                                {EXPERIENCE.map((exp) => (
                                    <Card key={exp.id} onClick={() => setSelectedExp(exp)} className="group">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                                                {exp.role}
                                            </h3>
                                            <Chip variant="outline">{exp.period}</Chip>
                                        </div>
                                        <p className="text-muted text-sm mb-2">{exp.company}</p>
                                        <p className="text-muted/60 text-sm line-clamp-2">{exp.summary}</p>
                                    </Card>
                                ))}
                            </div>

                            <Drawer
                                isOpen={!!selectedExp}
                                onClose={() => setSelectedExp(null)}
                                title={selectedExp?.role}
                            >
                                {selectedExp && (
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-lg font-bold text-foreground">{selectedExp.company}</h4>
                                            <p className="text-sm text-accent">{selectedExp.period}</p>
                                        </div>
                                        <p className="text-muted leading-relaxed">{selectedExp.summary}</p>

                                        <div>
                                            <h5 className="text-sm font-mono text-muted/50 uppercase tracking-wider mb-3">Key Achievements</h5>
                                            <ul className="space-y-3">
                                                {selectedExp.bullets.map((bullet, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-muted/80">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </Drawer>
                        </Container>
                    </SectionShell>

                    {/* Mask Reveal for Next Section (Projects) */}
                    <div
                        className="absolute inset-0 bg-accent pointer-events-none z-30"
                        style={{
                            ...calculateMask(progress),
                            opacity: progress > 0 ? 0.1 : 0 // Minimal visibility for effect, or could reveal next section
                        }}
                    />
                </div>
            )}
        </SceneWrapper>
    );
}
