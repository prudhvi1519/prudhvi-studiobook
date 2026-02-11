/** Cursor visual modes */
export type CursorMode = 'default' | 'label' | 'drag' | 'hidden';

export interface CursorState {
    mode: CursorMode;
    label: string | null;   // "View" | "Open" | "Play" | "Drag" etc.
    active: boolean;        // true when over a magnetic target
    enabled: boolean;       // false on touch / reduced-motion / motion-off
}

export interface CursorActions {
    setMode: (mode: CursorMode) => void;
    setLabel: (label: string | null) => void;
    setActive: (active: boolean) => void;
    reset: () => void;
}

export const CURSOR_DEFAULTS: CursorState = {
    mode: 'default',
    label: null,
    active: false,
    enabled: true,
};
