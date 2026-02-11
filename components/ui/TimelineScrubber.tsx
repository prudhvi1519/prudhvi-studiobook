'use client';

import { cn } from '../../lib/cn';
import { useRef, useEffect } from 'react';
import { useCursor } from '../core/cursor/useCursor';

interface TimelineScrubberProps {
    total: number;
    current: number;
    onChange: (index: number) => void;
}

export default function TimelineScrubber({ total, current, onChange }: TimelineScrubberProps) {
    const { setMode, reset } = useCursor();

    return (
        <div
            className="flex flex-col items-center gap-2 w-8"
            onMouseEnter={() => setMode('drag')}
            onMouseLeave={() => reset()}
        >
            {Array.from({ length: total }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onChange(i)}
                    className={cn(
                        "w-1 rounded-full transition-all duration-300",
                        current === i ? "h-6 bg-accent" : "h-1 bg-white/20 hover:bg-white/50 hover:h-2"
                    )}
                    aria-label={`Go to step ${i + 1}`}
                />
            ))}
        </div>
    );
}
