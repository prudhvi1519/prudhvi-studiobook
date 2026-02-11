'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useReduceMotion } from './ReduceMotion';

interface MotionContextType {
    motionEnabled: boolean;
    reduceMotion: boolean;
    toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: ReactNode }) {
    const reduceMotion = useReduceMotion();
    const [motionEnabled, setMotionEnabled] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Sync motionEnabled with reduceMotion
    useEffect(() => {
        if (reduceMotion) {
            setMotionEnabled(false);
        }
    }, [reduceMotion]);

    const toggleMotion = () => {
        if (reduceMotion) return; // Cannot enable if OS says reduce
        setMotionEnabled((prev) => !prev);
    };

    // Prepare context value
    const value = { motionEnabled, reduceMotion, toggleMotion };

    // Prevent hydration mismatch by rendering a consistent server/client shell first
    // or by deferring motion-dependent logic until mount.
    // However, to fix the specific "insertBefore" error which often comes from
    // differing component trees, we will ensure the provider renders consistently.
    // If we return null on server, we hurt SEO. 
    // Instead, we just pass children through, but the HOOKS inside children
    // (like CursorController) should be aware of mount state.
    // ACTUALLY: The error often happens when `useReduceMotion` differs on server vs client.

    return (
        <MotionContext.Provider value={value}>
            {children}
        </MotionContext.Provider>
    );
}

export function useMotion() {
    const context = useContext(MotionContext);
    if (context === undefined) {
        throw new Error('useMotion must be used within a MotionProvider');
    }
    return context;
}
