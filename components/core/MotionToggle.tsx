'use client';

import { useMotion } from './MotionProvider';

export default function MotionToggle() {
    const { motionEnabled, toggleMotion, reduceMotion } = useMotion();

    if (reduceMotion) return null;

    return (
        <button onClick={toggleMotion} className="fixed top-6 right-6 z-50 text-xs font-mono">
            MOTION: {motionEnabled ? 'ON' : 'OFF'}
        </button>
    );
}
