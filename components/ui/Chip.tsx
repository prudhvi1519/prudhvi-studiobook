import { cn } from '../../lib/cn';
import { ReactNode } from 'react';

interface ChipProps {
    children: ReactNode;
    variant?: 'default' | 'outline';
    className?: string;
}

export default function Chip({ children, variant = 'default', className }: ChipProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border",
                variant === 'outline' ? "border-white/20 bg-transparent text-muted" : "border-transparent bg-white/10 text-foreground",
                className
            )}
        >
            {children}
        </span>
    );
}
