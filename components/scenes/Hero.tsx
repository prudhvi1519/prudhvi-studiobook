'use client';

import SectionShell from '../core/SectionShell';
import Container from '../core/Container';
import SceneWrapper from '../core/SceneWrapper';
import SignalSpine from '../core/SignalSpine';
import { calculateDock } from '../core/transitions/dockingPanels';

export default function Hero() {
    return (
        <SceneWrapper id="hero-wrapper" scrubLength={1000}>
            {(progress) => (
                <div style={calculateDock(progress)} className="w-full h-full origin-top will-change-transform bg-background z-10 relative">
                    {/* Signal Spine — fixed background layer */}
                    <SignalSpine />

                    <SectionShell id="hero" data-scene="hero" className="min-h-[100vh]">
                        <Container className="flex flex-col items-start justify-center h-full relative z-10">
                            {/* Brand mark */}
                            <img
                                src="/brand/mark.svg"
                                alt=""
                                className="w-12 h-12 mb-6 text-accent opacity-60"
                                aria-hidden="true"
                            />
                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-foreground leading-tight tracking-tight mb-8">
                                Crafting <span className="text-accent">Digital</span> <br />
                                <span className="text-muted">Experiences</span>
                            </h1>
                            <p className="text-sm sm:text-base font-mono text-muted/70 max-w-md">
                                Senior Full-Stack Engineer specializing in cinematic web interactions and scalable architecture.
                            </p>
                        </Container>
                    </SectionShell>
                </div>
            )}
        </SceneWrapper>
    );
}

