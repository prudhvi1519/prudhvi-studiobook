'use client';

import { useMotion } from './MotionProvider';
import { cn } from '@/lib/cn';
import { Zap, ZapOff } from 'lucide-react';

export default function MotionToggle() {
    const { motionEnabled, reduceMotion, toggleMotion } = useMotion();

    return (
        <button
            onClick={toggleMotion}
            disabled={reduceMotion}
            aria-label={motionEnabled ? 'Disable motion' : 'Enable motion'}
            className={cn(
                'fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-colors border',
                motionEnabled
                    ? 'border-accent/50 text-accent bg-accent/10 hover:bg-accent/20'
                    : 'border-muted/30 text-muted bg-panel/50 hover:bg-panel/80',
                reduceMotion && 'opacity-50 cursor-not-allowed'
            )}
        >
            {motionEnabled ? <Zap size={14} /> : <ZapOff size={14} />}
            <span>{reduceMotion ? 'REDUCED' : motionEnabled ? 'MOTION ON' : 'MOTION OFF'}</span>
        </button>
    );
}
