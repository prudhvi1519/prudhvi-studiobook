'use client';

import { ReactNode, useRef, useEffect, useCallback } from 'react';
import { useCursor } from './useCursor';
import gsap from 'gsap';
import type { CursorMode } from './cursorTypes';

interface MagneticTargetProps {
    children: ReactNode;
    className?: string;
    /** 0 – 1, how strongly the element pulls toward the mouse (default 0.3) */
    strength?: number;
    /** Label shown on hover, e.g. "View", "Open", "Play", "Drag" */
    label?: string;
    /** Cursor mode while hovering (default "label" if label provided, else "default") */
    cursorMode?: CursorMode;
}

export default function MagneticTarget({
    children,
    className,
    strength = 0.3,
    label,
    cursorMode,
}: MagneticTargetProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { setLabel, setMode, setActive, reset, enabled } = useCursor();

    const resolvedMode = cursorMode ?? (label ? 'label' : 'default');

    const handleEnter = useCallback(() => {
        if (!enabled) return;
        setActive(true);
        setMode(resolvedMode);
        if (label) setLabel(label);
    }, [enabled, setActive, setMode, setLabel, label, resolvedMode]);

    const handleLeave = useCallback(() => {
        if (!enabled) return;
        // Snap element back
        if (ref.current) {
            gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
        }
        reset();
    }, [enabled, reset]);

    useEffect(() => {
        const el = ref.current;
        if (!el || !enabled) return;

        const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1,0.4)' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1,0.4)' });

        const onMove = (e: MouseEvent) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const dx = e.clientX - (left + width / 2);
            const dy = e.clientY - (top + height / 2);
            xTo(dx * strength);
            yTo(dy * strength);
        };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);

        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseenter', handleEnter);
            el.removeEventListener('mouseleave', handleLeave);
            gsap.set(el, { x: 0, y: 0 });
        };
    }, [enabled, strength, handleEnter, handleLeave]);

    return (
        <div ref={ref} className={className} style={{ display: 'inline-block' }}>
            {children}
        </div>
    );
}
