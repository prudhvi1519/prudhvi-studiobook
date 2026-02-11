import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface ChipProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'accent' | 'outline';
}

export default function Chip({ children, className, variant = 'default' }: ChipProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                {
                    'bg-panel border-panel text-muted': variant === 'default',
                    'bg-accent/10 border-accent/20 text-accent': variant === 'accent',
                    'bg-transparent border-muted/30 text-muted': variant === 'outline',
                },
                className
            )}
        >
            {children}
        </span>
    );
}
