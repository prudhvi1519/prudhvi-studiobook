'use client';

import SectionShell from '../core/SectionShell';
import Container from '../core/Container';
import SceneWrapper from '../core/SceneWrapper';
import Card from '../ui/Card';
import Chip from '../ui/Chip';
import Modal from '../ui/Modal';
import { CREDENTIALS, CredentialItem } from '../../data/credentials';
import { useState } from 'react';

export default function Credentials() {
    const [selectedCred, setSelectedCred] = useState<CredentialItem | null>(null);

    return (
        <SectionShell id="credentials" data-scene="credentials">
            <Container>
                <h2 className="text-3xl font-display font-bold mb-12 text-foreground">Credentials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CREDENTIALS.map((cred) => (
                        <Card
                            key={cred.id}
                            onClick={() => setSelectedCred(cred)}
                            className="group hover:bg-white/5 p-5"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-mono text-accent">{cred.date}</span>
                                <Chip variant="outline" className="text-[10px]">{cred.issuer}</Chip>
                            </div>
                            <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">
                                {cred.title}
                            </h3>
                        </Card>
                    ))}
                </div>

                <Modal
                    isOpen={!!selectedCred}
                    onClose={() => setSelectedCred(null)}
                    title={selectedCred?.title}
                >
                    {selectedCred && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-muted">
                                <span>{selectedCred.issuer}</span>
                                <span>•</span>
                                <span>{selectedCred.date}</span>
                            </div>
                            <p className="text-muted/80">{selectedCred.oneLiner}</p>
                            <div className="pt-4 border-t border-white/5">
                                <a
                                    href="#"
                                    className="text-accent text-sm hover:underline"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    View Certificate (Placeholder)
                                </a>
                            </div>
                        </div>
                    )}
                </Modal>
            </Container>
        </SectionShell>
    );
}
