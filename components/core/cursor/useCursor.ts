'use client';

import { createContext, useContext } from 'react';
import { CursorState, CursorActions, CURSOR_DEFAULTS } from './cursorTypes';

export type CursorContextValue = CursorState & CursorActions;

export const CursorContext = createContext<CursorContextValue>({
    ...CURSOR_DEFAULTS,
    setMode: () => { },
    setLabel: () => { },
    setActive: () => { },
    reset: () => { },
});

/** Hook to read/control custom cursor from any component */
export function useCursor() {
    return useContext(CursorContext);
}
