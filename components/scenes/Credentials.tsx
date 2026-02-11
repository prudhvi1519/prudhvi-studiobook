'use client';

import SectionShell from '@/components/core/SectionShell';
import Container from '@/components/core/Container';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { CREDENTIALS, CredentialItem } from '@/data/credentials';
import { useState } from 'react';

export default function Credentials() {
    const [selectedCred, setSelectedCred] = useState<CredentialItem | null>(null);

    // Group by category helper (optional for Phase 1, just listing grid for now)

    return (
        <SectionShell id="credentials" data-scene="credentials">
            <Container>
                <h2 className="text-3xl font-display font-bold mb-12 text-foreground">Credentials</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {CREDENTIALS.map((cred) => (
                        <Card
                            key={cred.id}
                            onClick={() => setSelectedCred(cred)}
                            className="p-4 flex flex-col justify-between aspect-[4/3] hover:bg-panel/80 hover:border-accent/50 cursor-pointer"
                        >
                            <div className="text-xs font-mono text-accent/70 uppercase mb-2">{cred.category}</div>
                            <h3 className="text-lg font-bold leading-tight group-hover:text-accent">{cred.title}</h3>
                        </Card>
                    ))}
                </div>

                <Modal
                    isOpen={!!selectedCred}
                    onClose={() => setSelectedCred(null)}
                    title="Credential Details"
                >
                    {selectedCred && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-foreground">{selectedCred.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted">
                                <span>{selectedCred.issuer}</span>
                                <span>•</span>
                                <span>{selectedCred.date}</span>
                            </div>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-muted/80">{selectedCred.oneLiner}</p>
                            </div>
                        </div>
                    )}
                </Modal>
            </Container>
        </SectionShell>
    );
}
