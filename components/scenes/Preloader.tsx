'use client';

import { cn } from '@/lib/cn';
import { useEffect, useState } from 'react';

export default function Preloader() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // fast exit for Phase 1
        const timer = setTimeout(() => setVisible(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div
            className={cn(
                'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500',
                visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
        >
            <div className="text-accent font-mono text-sm animate-pulse">Running diagnostics...</div>
        </div>
    );
}
