import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
    fluid?: boolean;
}

export default function Container({ children, className, fluid = false }: ContainerProps) {
    return (
        <div
            className={cn(
                'w-full mx-auto px-4 sm:px-6 lg:px-8',
                fluid ? 'max-w-none' : 'max-w-7xl',
                className
            )}
        >
            {children}
        </div>
    );
}
