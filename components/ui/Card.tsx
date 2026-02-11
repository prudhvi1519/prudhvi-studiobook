'use client';

import { cn } from '../../lib/cn';
import { ReactNode, MouseEventHandler } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
    id?: string;
}

export default function Card({ children, className, onClick, onMouseEnter, onMouseLeave, id }: CardProps) {
    return (
        <div
            id={id}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={cn(
                "bg-panel border border-white/5 rounded-xl p-6 transition-all duration-300 hover:border-accent/50 cursor-pointer",
                className
            )}
        >
            {children}
        </div>
    );
}

