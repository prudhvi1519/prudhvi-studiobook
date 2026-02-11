'use client';

import { cn } from '../../lib/cn';
import { ReactNode } from 'react';

interface TagProps {
    children: ReactNode;
    className?: string;
    active?: boolean;
    onClick?: () => void;
}

export default function Tag({ children, className, active, onClick }: TagProps) {
    return (
        <span
            onClick={onClick}
            className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono border transition-colors duration-200 uppercase tracking-wider",
                active
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-white",
                onClick && "cursor-pointer",
                className
            )}
        >
            {children}
        </span>
    );
}
