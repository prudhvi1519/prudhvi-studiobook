'use client';

import { cn } from '../../lib/cn';
import { X } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
    const [mounted, setMounted] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<Element | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    // Capture trigger element for focus return
    useEffect(() => {
        if (isOpen) {
            triggerRef.current = document.activeElement;
        }
    }, [isOpen]);

    // ESC to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Body scroll lock + focus management
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Focus first focusable element after open
            requestAnimationFrame(() => {
                closeRef.current?.focus();
            });
        } else {
            document.body.style.overflow = '';
            // Return focus to trigger
            if (triggerRef.current && triggerRef.current instanceof HTMLElement) {
                triggerRef.current.focus();
            }
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Focus trap
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== 'Tab' || !drawerRef.current) return;

        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                last.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    }, []);

    if (!mounted) return null;

    return createPortal(
        <>
            <div
                className={cn(
                    'fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300',
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-label={title || 'Detail drawer'}
                onKeyDown={handleKeyDown}
                className={cn(
                    'fixed top-0 right-0 z-[70] h-full w-full sm:w-[500px] bg-panel border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out transform',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <h2 className="text-xl font-display font-bold text-foreground">{title}</h2>
                        <button
                            ref={closeRef}
                            onClick={onClose}
                            aria-label="Close drawer"
                            className="p-2 rounded-full hover:bg-white/5 text-muted hover:text-white transition-colors"
                        >
                            <X size={20} aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}
