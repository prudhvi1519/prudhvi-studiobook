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

    // Sync motionEnabled with reduceMotion
    useEffect(() => {
        if (reduceMotion) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMotionEnabled(false);
        }
    }, [reduceMotion]);

    const toggleMotion = () => {
        if (reduceMotion) return; // Cannot enable if OS says reduce
        setMotionEnabled((prev) => !prev);
    };

    return (
        <MotionContext.Provider value={{ motionEnabled, reduceMotion, toggleMotion }}>
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
