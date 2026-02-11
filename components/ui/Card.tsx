import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    hoverEffect?: boolean;
}

export default function Card({ children, className, onClick, hoverEffect = true }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                'relative bg-panel border border-white/5 rounded-xl p-6 overflow-hidden transition-all duration-300',
                hoverEffect && 'hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5',
                onClick && 'cursor-pointer',
                className
            )}
        >
            {/* Glossy gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {children}
        </div>
    );
}
