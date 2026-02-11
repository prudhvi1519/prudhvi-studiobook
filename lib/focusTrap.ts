import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) return;

        const element = containerRef.current;
        if (!element) return;

        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                // Optional: trigger close? managed by parent usually
            }
        }

        element.addEventListener('keydown', handleTab);
        element.addEventListener('keydown', handleEsc);

        // Initial focus
        setTimeout(() => {
            firstElement?.focus();
        }, 50); // slight delay for animation

        return () => {
            element.removeEventListener('keydown', handleTab);
            element.removeEventListener('keydown', handleEsc);
        };
    }, [isActive]);

    return containerRef;
}
