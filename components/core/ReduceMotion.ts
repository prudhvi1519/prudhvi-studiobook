'use client';

import { useSyncExternalStore } from 'react';

export function useReduceMotion() {
    const subscribe = (callback: () => void) => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', callback);
        return () => mediaQuery.removeEventListener('change', callback);
    };

    const getSnapshot = () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    const getServerSnapshot = () => false;

    return useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );
}
