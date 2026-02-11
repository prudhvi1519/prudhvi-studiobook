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

---

## Signal Spine (Phase 5)

A background visual element (3D or 2D SVG) that runs behind the scroll frame.

### Loading Strategy

| Condition | Rendering |
|-----------|-----------|
| Motion ON + fine pointer + desktop | **3D** Spline embed (lazy-loaded via IntersectionObserver) |
| Motion OFF / reduce-motion / touch | **2D** SVG fallback with subtle parallax |

> 3D **never** loads at first paint. It initializes only after the Proof scene is visible (intersection observer with 200px margin).

### SVG Fallback

The fallback (`spine-fallback.svg`) renders a vertical signal wave with:
- Gradient-stroked main path
- Branch signal lines
- Node dots
- A `ping` circle for interaction feedback

Parallax: On desktop, the SVG subtly shifts with mouse position (±12px, GSAP `power2.out`).

### Interaction Ping

When a project card is hovered:
- `pingSignal` counter increments
- SVG: ping circle at center expands (r: 6 → 40) and fades out
- 3D: placeholder for Spline event trigger (to be wired when scene is ready)

### Brand Assets

| File | Purpose |
|------|---------|
| `public/brand/mark.svg` | Single continuous stroke signal/pulse motif |
| `public/brand/wordmark.svg` | "STUDIOBOOK" monospace wordmark |
| `public/spine/spine-fallback.svg` | Full SVG fallback for 3D spine |

