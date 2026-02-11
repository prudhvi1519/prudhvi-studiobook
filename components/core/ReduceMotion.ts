'use client';

import { useEffect, useState } from 'react';

export function useReduceMotion() {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        // Set initial value
        setMatches(mediaQuery.matches);

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
    }, []);

    return matches;
}
