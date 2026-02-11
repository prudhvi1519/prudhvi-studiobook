'use client';

import { useMotion } from './MotionProvider';

export default function MotionToggle() {
    const { motionEnabled, toggleMotion, reduceMotion } = useMotion();

    if (reduceMotion) return null;

    return (
        <button
            onClick={toggleMotion}
            aria-label={`Toggle motion: currently ${motionEnabled ? 'on' : 'off'}`}
            aria-pressed={motionEnabled}
            className="fixed top-6 right-6 z-50 text-xs font-mono text-muted hover:text-foreground transition-colors px-3 py-1.5 border border-white/10 rounded-full hover:border-accent/40"
        >
            MOTION: {motionEnabled ? 'ON' : 'OFF'}
        </button>
    );
}
