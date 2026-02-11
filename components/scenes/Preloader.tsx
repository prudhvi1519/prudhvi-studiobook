'use client';

import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';

export default function Preloader() {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        // Fake minimal load time
        const timer = setTimeout(() => {
            setComplete(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (complete) return null;

    return (
        <div className={cn(
            "fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500",
            complete ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
            <div className="w-12 h-12 border-2 border-white/10 border-t-accent rounded-full animate-spin" />
        </div>
    );
}
