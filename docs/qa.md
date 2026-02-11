# QA Checklist

## Accessibility

### Keyboard Navigation
- [x] All interactive elements reachable via Tab
- [x] Visible `:focus-visible` ring on all focusable elements (accent blue, 2px, offset 2px)
- [x] `:focus:not(:focus-visible)` suppresses ring on mouse clicks
- [x] Skip-to-content link (hidden until focused, appears top-left)
- [x] `<main id="main-content">` landmark for skip link target

### Overlays & Drawers
- [x] Drawer: ESC closes, focus trapped inside, focus returns to trigger on close
- [x] Modal: ESC closes, focus trapped inside, focus returns to trigger on close
- [x] CaseStudyOverlay: ESC closes (via existing `useFocusTrap`), body scroll locked
- [x] Backdrop click closes all overlays
- [x] All overlays use `role="dialog"`, `aria-modal="true"`, `aria-label`

### Aria Labels
- [x] MotionToggle: `aria-label` with dynamic state, `aria-pressed`
- [x] Drawer close button: `aria-label="Close drawer"`
- [x] Modal close button: `aria-label="Close dialog"`
- [x] Lucide icons: `aria-hidden="true"` (decorative)

### Semantic HTML
- [x] Single `<h1>` per page (Hero scene)
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] `<main>` landmark wraps content

---

## Reduce Motion

| Component       | Behavior when reduced motion |
|-----------------|------------------------------|
| SceneWrapper    | No pinning, progress = 0, natural scroll |
| ProgressHUD     | Hidden entirely |
| CursorController| Disabled, native cursor restored |
| SignalSpine     | SVG fallback only (no 3D, no parallax) |
| CSS Global      | All animations/transitions → 0.01ms |

---

## Browser Matrix

| Browser         | Priority | Status  |
|-----------------|----------|---------|
| Chrome (latest) | P0       | ✅ Build |
| Firefox (latest)| P1       | Untested |
| Safari (latest) | P1       | Untested |
| Mobile Safari   | P1       | Untested |
| Chrome Android  | P1       | Untested |

---

## Manual Test Procedures

1. **Keyboard Tab**: press Tab from page load → focus ring should appear on MotionToggle → continue through page
2. **ESC**: open Drawer via experience card → press ESC → should close and refocus card
3. **Reduce Motion**: enable in OS settings → reload → no animations, natural scroll, no cursor
4. **Motion Toggle**: click OFF → same as reduce motion but user-controlled
5. **Mobile**: no custom cursor, SVG fallback spine, touch interactions work normally
