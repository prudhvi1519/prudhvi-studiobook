'use client';

import { cn } from '../../lib/cn';
import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    id?: string;
}

export default function Card({ children, className, onClick, id }: CardProps) {
    return (
        <div
            id={id}
            onClick={onClick}
            className={cn(
                "bg-panel border border-white/5 rounded-xl p-6 transition-all duration-300 hover:border-accent/50 cursor-pointer",
                className
            )}
        >
            {children}
        </div>
    );
}
