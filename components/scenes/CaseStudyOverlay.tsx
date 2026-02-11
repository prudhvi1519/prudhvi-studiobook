'use client';

import { Project } from '@/data/projects';
import { cn } from '@/lib/cn';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface CaseStudyOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

export default function CaseStudyOverlay({ isOpen, onClose, project }: CaseStudyOverlayProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!mounted || !project) return null;

    return createPortal(
        <div
            className={cn(
                'fixed inset-0 z-[90] bg-background transition-transform duration-500 ease-in-out',
                isOpen ? 'translate-y-0' : 'translate-y-full'
            )}
        >
            <div className="relative h-full w-full overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="max-w-4xl mx-auto px-6 py-20">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">{project.title}</h1>
                    <p className="text-xl text-muted font-mono mb-12">{project.oneLiner}</p>

                    <div className="aspect-video w-full bg-panel rounded-xl mb-12 border border-white/10 flex items-center justify-center text-muted/30">
                        Case Study Visual Placeholder
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p>Full case study content will act as a deep dive into the problem, approach, and outcome of this project.</p>
                        <p>Phase 3 will implement the full content and FLIP morph transitions.</p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
