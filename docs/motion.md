# Motion & Cursor Design System

## Custom Cursor (Phase 4)

The custom cursor replaces the browser default on **desktop devices with fine pointers only**.

### Cursor Modes

| Mode      | Visual                              | Trigger                                    |
|-----------|-------------------------------------|--------------------------------------------|
| `default` | Small dot + trailing ring           | Anywhere on page                           |
| `label`   | Ring expands, text label appears    | Hovering explicit targets (cards, buttons) |
| `drag`    | Pill shape, slight tilt             | Timeline scrubber in Case Study Overlay    |
| `hidden`  | Fully invisible                     | Reserved / fallback                        |

### Disable Rules

The cursor is **automatically disabled** when any of these conditions are true:

- `prefers-reduced-motion: reduce` → Cursor OFF
- Motion toggle OFF (user choice) → Cursor OFF
- `pointer: coarse` (touch devices) → Cursor OFF

When disabled, the browser's native cursor is restored. No visual artifacts remain.

### Architecture

```
CursorController (layout.tsx)
├── CursorContext Provider (state + actions)
├── CursorRenderer (dot + ring + label, GSAP-driven)
└── Children
    ├── MagneticTarget (wrapper for magnetic pull)
    ├── useCursor() hook (read/write cursor state)
    └── Any component can setMode / setLabel / setActive
```

### Integration Points

| Component          | Cursor Behavior                   |
|--------------------|-----------------------------------|
| `Button.tsx`       | Magnetic pull + "Open" label      |
| Project Cards      | "View" label on hover             |
| TimelineScrubber   | `drag` mode (pill cursor)         |
| Case Study buttons | "Play" / "View" via MagneticTarget|

### Magnetic Pull

`MagneticTarget` wraps any element to add:
- Subtle elastic pull toward the mouse (GSAP `quickTo`)
- Configurable `strength` (0–1, default 0.3)
- Auto-reset on mouse leave

### Implementation Notes

- All cursor elements use `pointer-events: none` — clicks pass through
- Keyboard navigation is completely unaffected
- Labels appear **only** on explicitly marked targets (no blanket hover behavior)
- GSAP handles smooth interpolation (dot: 80ms, ring: 250ms, label: 120ms)
- `mix-blend-difference` on dot for visibility on any background
