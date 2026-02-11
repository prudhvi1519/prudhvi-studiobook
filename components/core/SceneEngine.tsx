'use client';

import { useMotion } from './MotionProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';

// Register GSAP plugin only once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface SceneEngineContextType {
    registerTrigger: (trigger: globalThis.ScrollTrigger) => void;
}

const SceneEngineContext = createContext<SceneEngineContextType | undefined>(undefined);

export function SceneEngineProvider({ children }: { children: ReactNode }) {
    const { motionEnabled, reduceMotion } = useMotion();
    const triggersRef = useRef<globalThis.ScrollTrigger[]>([]);

    // Cleanup on unmount or motion change
    useEffect(() => {
        return () => {
            // Kill all registered triggers
            triggersRef.current.forEach(t => t.kill());
            triggersRef.current = [];
            ScrollTrigger.refresh();
        };
    }, [motionEnabled]);

    const registerTrigger = (trigger: globalThis.ScrollTrigger) => {
        // Only register if motion is enabled and not reduced
        if (!motionEnabled || reduceMotion) {
            trigger.kill();
            return;
        }
        triggersRef.current.push(trigger);
    };

    return (
        <SceneEngineContext.Provider value={{ registerTrigger }}>
            {children}
        </SceneEngineContext.Provider>
    );
}

export function useSceneEngine() {
    const context = useContext(SceneEngineContext);
    if (context === undefined) {
        throw new Error('useSceneEngine must be used within a SceneEngineProvider');
    }
    return context;
}
