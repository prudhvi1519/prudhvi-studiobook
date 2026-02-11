'use client';

import { Project } from '../../data/projects';
import { cn } from '../../lib/cn';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Stepper from '../ui/Stepper';
import TimelineScrubber from '../ui/TimelineScrubber';
import Tag from '../ui/Tag';
import { captureFlipState, applyFlip } from '../../lib/flip';
import gsap from 'gsap';
import { useFocusTrap } from '../../lib/focusTrap';

interface CaseStudyOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

const STEPS = ['Problem', 'Constraints', 'Solution', 'Result'];

export default function CaseStudyOverlay({ isOpen, onClose, project }: CaseStudyOverlayProps) {
    const [mounted, setMounted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const focusTrapRef = useFocusTrap(isOpen);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen && project) {
            document.body.style.overflow = 'hidden';

            // FLIP Animation
            const sourceId = `project-card-${project.id}`;
            const sourceEl = document.getElementById(sourceId);

            if (sourceEl && overlayRef.current) {
                // Capture state of source
                const state = captureFlipState(sourceEl);

                // Using GSAP Flip is tricky with Portals because the element *changes* completely.
                // Usually FLIP is for *shared layout* transition where the *same* element moves.
                // Here we have a *different* element (Overlay) that wants to *expand* from the Card.
                // We can simulate this by fitting the Overlay to the Card's rect, then animating to full.

                // Simple alternative: specific "morph" animation.
                // But let's try to match the source rect first.

                // 1. Set overlay to source position (scale/translate)
                // 2. Animate to fixed inset-0

                const rect = sourceEl.getBoundingClientRect();

                gsap.fromTo(overlayRef.current,
                    {
                        clipPath: `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round 12px)`,
                        opacity: 0,
                    },
                    {
                        clipPath: 'inset(0px 0px 0px 0px round 0px)',
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power4.inOut'
                    }
                );

                gsap.fromTo(contentRef.current,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
                );
            }
        } else {
            document.body.style.overflow = '';
            setCurrentStep(0); // Reset step on close
        }
    }, [isOpen, project]);

    if (!mounted || !project) return null;

    const caseData = project.caseStudy || {
        problem: "No case study data available.",
        constraints: [],
        solution: [],
        result: []
    };

    const stepContent = [
        { title: 'The Problem', content: caseData.problem },
        { title: 'Constraints', list: caseData.constraints },
        { title: 'The Solution', list: caseData.solution },
        { title: 'The Result', list: caseData.result }
    ];

    const activeContent = stepContent[currentStep];

    return createPortal(
        <div
            ref={overlayRef}
            className={cn(
                'fixed inset-0 z-[100] bg-background flex flex-col',
                !isOpen && 'pointer-events-none opacity-0'
            )}
        >
            {/* Header / Nav */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5 bg-panel/50 backdrop-blur-md z-20">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold font-display">{project.title}</h2>
                    <div className="h-4 w-[1px] bg-white/20" />
                    <span className="text-sm font-mono text-muted uppercase">Case Study</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Close Case Study"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden relative">
                {/* Left: Stepper */}
                <div className="w-64 hidden md:flex flex-col justify-center border-r border-white/5 bg-panel/20 p-8">
                    <Stepper
                        currentStep={currentStep}
                        steps={STEPS}
                        onStepClick={setCurrentStep}
                    />
                </div>

                {/* Center: Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-12 relative" ref={contentRef}>
                    <div className="max-w-3xl mx-auto">
                        <div className="aspect-video w-full bg-panel rounded-xl mb-12 border border-white/10 flex items-center justify-center text-muted/30 relative overflow-hidden group">
                            {/* Demo/Image Placeholder */}
                            <p>Visual for {activeContent.title}</p>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-3xl font-bold mb-6 text-accent">{activeContent.title}</h3>

                            {activeContent.content && (
                                <p className="text-xl leading-relaxed text-muted-foreground">{activeContent.content}</p>
                            )}

                            {activeContent.list && (
                                <ul className="space-y-4">
                                    {activeContent.list.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <ChevronRight className="text-accent shrink-0 mt-1" size={20} />
                                            <span className="text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Build Log Teaser */}
                        {project.buildLog && (
                            <div className="mt-16 pt-8 border-t border-white/10">
                                <h4 className="text-sm font-mono uppercase tracking-wider text-muted mb-4">Build Log</h4>
                                <div className="space-y-2 font-mono text-sm max-h-40 overflow-y-auto pr-2">
                                    {project.buildLog.map((log, i) => (
                                        <div key={i} className="flex gap-4">
                                            <span className="text-white/40">{log.date}</span>
                                            <span className="text-white/80">{log.note}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Timeline Scrubber + Nav */}
                <div className="w-20 hidden md:flex flex-col items-center justify-center border-l border-white/5 bg-panel/20 gap-8">
                    <button
                        disabled={currentStep === 0}
                        onClick={() => setCurrentStep(p => Math.max(0, p - 1))}
                        className="p-2 disabled:opacity-20 hover:text-accent disabled:hover:text-inherit transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <TimelineScrubber
                        total={STEPS.length}
                        current={currentStep}
                        onChange={setCurrentStep}
                    />

                    <button
                        disabled={currentStep === STEPS.length - 1}
                        onClick={() => setCurrentStep(p => Math.min(STEPS.length - 1, p + 1))}
                        className="p-2 disabled:opacity-20 hover:text-accent disabled:hover:text-inherit transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Nav Bottom */}
            <div className="md:hidden flex items-center justify-between p-4 border-t border-white/5 bg-panel">
                <button onClick={() => setCurrentStep(p => Math.max(0, p - 1))} disabled={currentStep === 0}>
                    <ChevronLeft />
                </button>
                <span className="font-mono text-sm">{currentStep + 1} / {STEPS.length}</span>
                <button onClick={() => setCurrentStep(p => Math.min(STEPS.length - 1, p + 1))} disabled={currentStep === STEPS.length - 1}>
                    <ChevronRight />
                </button>
            </div>

        </div>,
        document.body
    );
}
