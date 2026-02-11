'use client';

import { useEffect, useRef, useState, useMemo, ReactNode, useCallback } from 'react';
import gsap from 'gsap';
import { cn } from '../../lib/cn';
import { useMotion } from './MotionProvider';
import { CursorContext, CursorContextValue } from './cursor/useCursor';
import { CursorMode, CursorState, CURSOR_DEFAULTS } from './cursor/cursorTypes';

/* ── CursorStyles (inject global cursor-hide CSS) ──────────── */

const CURSOR_CSS = `
@media (pointer: fine) {
  html { cursor: none !important; }
  a, button, [role="button"], input, select, textarea, label { cursor: none !important; }
}
@media (pointer: coarse) {
  .cc-dot, .cc-ring, .cc-label { display: none !important; }
}
`;

function CursorStyles() {
    useEffect(() => {
        const style = document.createElement('style');
        style.setAttribute('data-cursor', '');
        style.textContent = CURSOR_CSS;
        document.head.appendChild(style);
        return () => { style.remove(); };
    }, []);
    return null;
}

/* ── CursorRenderer (the visual) ───────────────────────────── */

function CursorRenderer({ state }: { state: CursorState }) {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!state.enabled) return;

        const move = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;

            gsap.to(dotRef.current, { x, y, duration: 0.08, ease: 'power2.out', overwrite: true });
            gsap.to(ringRef.current, { x, y, duration: 0.25, ease: 'power2.out', overwrite: true });
            if (labelRef.current) {
                gsap.to(labelRef.current, { x: x + 22, y: y + 22, duration: 0.12, ease: 'power2.out', overwrite: true });
            }
        };

        window.addEventListener('mousemove', move, { passive: true });
        return () => window.removeEventListener('mousemove', move);
    }, [state.enabled]);

    if (!state.enabled) return null;

    const isDrag = state.mode === 'drag';
    const isLabel = state.mode === 'label';

    return (
        <>
            <CursorStyles />

            {/* Dot */}
            <div
                ref={dotRef}
                className={cn(
                    'cc-dot fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference transition-[width,height,opacity] duration-300',
                    isDrag ? 'w-0 h-0 opacity-0' : state.active ? 'w-1 h-1 bg-accent opacity-60' : 'w-2 h-2 bg-accent'
                )}
            />

            {/* Ring */}
            <div
                ref={ringRef}
                className={cn(
                    'cc-ring fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300',
                    isDrag
                        ? 'w-16 h-8 rounded-full border-accent bg-accent/15 rotate-6'
                        : state.active
                            ? 'w-12 h-12 border-accent/50 bg-accent/5'
                            : 'w-8 h-8 border-white/20'
                )}
            />

            {/* Label */}
            <div
                ref={labelRef}
                className={cn(
                    'cc-label fixed top-0 left-0 z-[9999] pointer-events-none font-mono text-[10px] uppercase tracking-widest text-accent whitespace-nowrap transition-opacity duration-200',
                    isLabel && state.label ? 'opacity-100' : 'opacity-0'
                )}
            >
                {state.label}
            </div>
        </>
    );
}

/* ── CursorController (Provider + Renderer) ────────────────── */

/* ── CursorController (Provider + Renderer) ────────────────── */

export default function CursorController({ children }: { children: ReactNode }) {
    const { motionEnabled, reduceMotion } = useMotion();
    const [state, setState] = useState<CursorState>(CURSOR_DEFAULTS);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Derive `enabled` from motion + pointer
    useEffect(() => {
        const isCoarse = window.matchMedia('(pointer: coarse)').matches;
        const shouldEnable = motionEnabled && !reduceMotion && !isCoarse;
        setState((s) => ({ ...s, enabled: shouldEnable }));
    }, [motionEnabled, reduceMotion]);

    const setMode = useCallback((mode: CursorMode) => setState((s) => ({ ...s, mode })), []);
    const setLabel = useCallback((label: string | null) => setState((s) => ({ ...s, label })), []);
    const setActive = useCallback((active: boolean) => setState((s) => ({ ...s, active })), []);
    const reset = useCallback(() => setState((s) => ({ ...s, mode: 'default', label: null, active: false })), []);

    const value: CursorContextValue = useMemo(
        () => ({ ...state, setMode, setLabel, setActive, reset }),
        [state, setMode, setLabel, setActive, reset]
    );

    // Don't render cursor elements until mounted to avoid hydration mismatch
    return (
        <CursorContext.Provider value={value}>
            {mounted && <CursorRenderer state={state} />}
            {children}
        </CursorContext.Provider>
    );
}
