'use client';

import { cn } from '../../lib/cn';
import { X } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<Element | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    // Capture trigger for focus return
    useEffect(() => {
        if (isOpen) {
            triggerRef.current = document.activeElement;
        }
    }, [isOpen]);

    // ESC to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
            requestAnimationFrame(() => closeRef.current?.focus());
        } else {
            document.body.style.overflow = '';
            if (triggerRef.current && triggerRef.current instanceof HTMLElement) {
                triggerRef.current.focus();
            }
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    // Focus trap
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== 'Tab' || !modalRef.current) return;

        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
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
        <div
            className={cn(
                'fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 transition-all duration-300',
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}
        >
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label={title || 'Dialog'}
                onKeyDown={handleKeyDown}
                className={cn(
                    'relative w-full max-w-lg bg-panel border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300',
                    isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                )}
            >
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                    <h2 className="text-xl font-display font-bold text-foreground">{title}</h2>
                    <button
                        ref={closeRef}
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="p-1 rounded-full hover:bg-white/10 text-muted hover:text-white transition-colors"
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                </div>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
