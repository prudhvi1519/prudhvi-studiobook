import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface SectionShellProps {
    children: ReactNode;
    id?: string;
    className?: string;
    'data-scene'?: string;
}

export default function SectionShell({ children, id, className, 'data-scene': dataScene }: SectionShellProps) {
    return (
        <section
            id={id}
            data-scene={dataScene}
            className={cn(
                'relative w-full min-h-screen flex flex-col justify-center py-20 overflow-hidden',
                className
            )}
        >
            {children}
        </section>
    );
}
