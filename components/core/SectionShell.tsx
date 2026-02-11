import { cn } from '../../lib/cn';
import { ReactNode } from 'react';

interface SectionShellProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export default function SectionShell({ id, children, className }: SectionShellProps) {
    return (
        <section id={id} className={cn("relative py-20", className)}>
            {children}
        </section>
    );
}
