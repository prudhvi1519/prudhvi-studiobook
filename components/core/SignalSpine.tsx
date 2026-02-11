'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useMotion } from './MotionProvider';
import gsap from 'gsap';

/**
 * SignalSpine
 * -----------
 * Renders either a 3D Spline embed (when motion is on + fine pointer) or a 2D
 * SVG fallback with subtle parallax.  In both cases it is positioned as a fixed
 * background layer behind the scroll frame.
 *
 * 3D is lazy-loaded (intersection observer) so it never blocks first paint.
 */

/* ── helpers ────────────────────────────────────────────────── */

function isCoarsePointer() {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(pointer: coarse)').matches;
}

/* ── 2D fallback (SVG with parallax + ping) ────────────────── */

function SpineFallback({ pingSignal }: { pingSignal: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pingRef = useRef<SVGCircleElement | null>(null);

    // Subtle parallax on mouse move (desktop only)
    useEffect(() => {
        if (isCoarsePointer()) return;

        const onMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            gsap.to(containerRef.current, {
                x,
                y,
                duration: 0.8,
                ease: 'power2.out',
                overwrite: true,
            });
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // Glow ping along SVG when `pingSignal` changes
    useEffect(() => {
        if (pingSignal === 0) return;
        const el = pingRef.current;
        if (!el) return;

        gsap.fromTo(
            el,
            { attr: { r: 6 }, opacity: 0.8 },
            { attr: { r: 40 }, opacity: 0, duration: 0.8, ease: 'power2.out' }
        );
    }, [pingSignal]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 800 600"
                className="w-full max-w-[800px] h-auto opacity-40"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <defs>
                    <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                    </linearGradient>
                    <filter id="sb">
                        <feGaussianBlur stdDeviation="3" />
                    </filter>
                </defs>

                {/* Main spine */}
                <path
                    d="M400 0 C380 60,420 120,400 180 C380 240,420 300,400 360 C380 420,420 480,400 540 L400 600"
                    stroke="url(#sg)"
                    strokeWidth="2"
                />
                {/* Glow */}
                <path
                    d="M400 0 C380 60,420 120,400 180 C380 240,420 300,400 360 C380 420,420 480,400 540 L400 600"
                    stroke="url(#sg)"
                    strokeWidth="8"
                    filter="url(#sb)"
                    opacity="0.4"
                />

                {/* Branches */}
                <path d="M400 100 L340 80" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
                <path d="M400 200 L320 220" stroke="#a78bfa" strokeWidth="1" opacity="0.25" />
                <path d="M400 320 L350 340" stroke="#6366f1" strokeWidth="1" opacity="0.2" />
                <path d="M400 150 L460 130" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
                <path d="M400 270 L480 250" stroke="#6366f1" strokeWidth="1" opacity="0.25" />

                {/* Nodes */}
                <circle cx="400" cy="100" r="3" fill="#6366f1" opacity="0.5" />
                <circle cx="400" cy="200" r="2" fill="#a78bfa" opacity="0.4" />
                <circle cx="400" cy="320" r="3" fill="#6366f1" opacity="0.3" />

                {/* Ping circle */}
                <circle
                    ref={pingRef}
                    cx="400"
                    cy="300"
                    r="6"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                    opacity="0"
                />
            </svg>
        </div>
    );
}

/* ── 3D Spline embed (lazy-loaded) ─────────────────────────── */

function Spine3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);

    // Lazy-load via intersection observer — only start when scrolled past Proof
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoaded(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none select-none"
            aria-hidden="true"
        >
            {loaded && (
                <iframe
                    src="about:blank"     /* Replace with real Spline URL when ready */
                    title="Signal Spine 3D"
                    className="w-full h-full border-0 opacity-60"
                    loading="lazy"
                    style={{ pointerEvents: 'none' }}
                />
            )}
        </div>
    );
}

/* ── Public API ─────────────────────────────────────────────── */

interface SignalSpineProps {
    /** Increment to trigger a ping animation (e.g. on card hover) */
    pingSignal?: number;
}

export default function SignalSpine({ pingSignal = 0 }: SignalSpineProps) {
    const { motionEnabled, reduceMotion } = useMotion();
    const [canRun3D, setCanRun3D] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Evaluate capabilities on client side only to avoid hydration mismatch
        // (SSR thinks isCoarsePointer=true, Client might say false)
        const checkCapabilities = () => {
            const safe = motionEnabled && !reduceMotion && !isCoarsePointer();
            setCanRun3D(safe);
        };

        checkCapabilities();
    }, [motionEnabled, reduceMotion]);

    if (!mounted) return <div className="fixed inset-0 z-0 overflow-hidden" />;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            {canRun3D ? <Spine3D /> : <SpineFallback pingSignal={pingSignal} />}
        </div>
    );
}
