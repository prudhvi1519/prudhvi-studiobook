import { cn } from '../../lib/cn';
import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-12", className)}>
            {children}
        </div>
    );
}
