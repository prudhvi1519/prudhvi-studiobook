'use client';

import { useMotion } from './MotionProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

interface SceneWrapperProps {
    children: (progress: number) => ReactNode;
    id: string;
    className?: string;
    scrubLength?: number; // Distance in px to scrub (default 1000)
}

export default function SceneWrapper({
    children,
    id,
    className,
    scrubLength = 1000
}: SceneWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { motionEnabled, reduceMotion } = useMotion();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // If motion disabled or reduced, reset to natural layout
        if (!motionEnabled || reduceMotion) {
            setProgress(1); // Show final state or handled by CSS
            return;
        }

        const element = containerRef.current;
        if (!element) return;

        // Create ScrollTrigger
        const trigger = ScrollTrigger.create({
            trigger: element,
            start: 'top top',
            end: `+=${scrubLength}`,
            pin: true,
            scrub: 1, // Smooth scrub
            anticipatePin: 1,
            onUpdate: (self) => {
                setProgress(self.progress);
            },
        });

        return () => {
            trigger.kill();
        };
    }, [motionEnabled, reduceMotion, scrubLength]);

    return (
        <div
            ref={containerRef}
            id={id}
            className={cn(
                'relative w-full min-h-screen overflow-hidden',
                // When motion is OFF, we don't pin, so it behaves like a normal section
                !motionEnabled && 'h-auto py-20',
                className
            )}
        >
            {/* 
        Pass progress to children for internal animation.
        If motion is disabled, progress is effectively 1 or handled by CSS.
      */}
            {children(motionEnabled && !reduceMotion ? progress : 0)}
        </div>
    );
}
