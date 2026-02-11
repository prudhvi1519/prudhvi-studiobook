'use client';

import { cn } from '../../lib/cn';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    children: ReactNode;
}

export default function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                variant === 'primary' && "bg-accent text-background hover:bg-accent/80",
                variant === 'secondary' && "bg-white/10 text-foreground hover:bg-white/20",
                variant === 'outline' && "border border-white/20 text-foreground hover:border-accent hover:text-accent",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
