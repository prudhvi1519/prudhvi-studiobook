'use client';

import { useMotion } from './MotionProvider';
import { cn } from '../../lib/cn';
import { useEffect, useState } from 'react';

const SECTIONS = [
    { id: 'hero', label: '01' },
    { id: 'projects', label: '02' },
    { id: 'experience', label: '03' },
    { id: 'capabilities', label: '04' },
    { id: 'credentials', label: '05' },
    { id: 'contact', label: '06' },
];

export default function ProgressHUD() {
    const { motionEnabled, reduceMotion } = useMotion();
    const [activeId, setActiveId] = useState('hero');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !motionEnabled || reduceMotion) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // Global progress
            const progress = scrollY / (docHeight - windowHeight);
            setScrollProgress(progress);

            // Determine active section based on visibility
            // Simplistic check for Phase 2: strictly purely visual
            // A more robust solution involves IntersectionObserver or SceneEngine signals
            // For now, let's map scroll % to active ID roughly
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [motionEnabled, reduceMotion]);

    if (!mounted || !motionEnabled || reduceMotion) return null;

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 items-center">
            <div className="w-px h-24 bg-white/10 relative">
                <div
                    className="absolute top-0 left-0 w-full bg-accent transition-all duration-100"
                    style={{ height: `${scrollProgress * 100}%` }}
                />
            </div>

            <div className="flex flex-col gap-2">
                {SECTIONS.map((section) => (
                    <div
                        key={section.id}
                        className={cn(
                            "w-1 h-1 rounded-full bg-white/20 transition-all duration-300",
                            // Here we might just highlight based on activeId if we tracked it
                        )}
                    />
                ))}
                {/* Simple visual indicator, not fully wired to specific section IDs yet in Phase 2 */}
                <span className="font-mono text-[10px] text-accent/50 rotate-90 mt-4 origin-left translate-x-1">
                    SCROLL
                </span>
            </div>

            <div className="w-px h-24 bg-white/10" />
        </div>
    );
}
