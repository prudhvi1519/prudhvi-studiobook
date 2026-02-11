# Performance Guidelines

## Loading Strategy

### Critical Path
1. HTML + CSS render immediately (static shell)
2. Fonts: `next/font/google` (automatic `font-display: swap`, no FOIT)
3. JS hydration: React 19 + Next.js 16 (Turbopack)

### Lazy Loading
| Asset | Strategy |
|-------|----------|
| GSAP ScrollTrigger | Loaded with SceneWrapper (client component) |
| SignalSpine 3D | IntersectionObserver, only after Proof scene visible |
| Case Study Overlay | Portal, mounted on demand |
| Drawer / Modal | Portal, mounted on demand |

### What NOT to load at first paint
- 3D Spline embed (deferred via IntersectionObserver + 200px margin)
- GSAP Flip (only imported in CaseStudyOverlay)

---

## CLS Prevention

| Element | Technique |
|---------|-----------|
| Hero heading | Fixed `min-h-[100vh]` on SectionShell |
| Bento grid | `auto-rows-[300px]` fixed row height |
| MotionToggle | Fixed position (`fixed top-6 right-6`) |
| ProgressHUD | Fixed position (`fixed right-6 top-1/2`) |

---

## Bundle Size

- No external state library (cursor uses React Context, not Zustand)
- Lucide React: tree-shaken (only `X`, `ChevronLeft`, `ChevronRight` imported)
- GSAP: core + ScrollTrigger + Flip (no extras)
- No framer-motion dependency

---

## Reduce Motion = Fast Mode

When `prefers-reduced-motion: reduce` or Motion OFF:
- No ScrollTrigger pinning → standard scroll flow
- No GSAP animations
- CSS `transition-duration: 0.01ms` globally
- No 3D loading
- No custom cursor overhead
- Content is fully readable and fast

This means the **motion-off** version is the most performant and the most crawlable by search engines.

---

## SEO

- Full `<Metadata>` with title template, description, keywords
- Open Graph tags (type, locale, site name, title, description)
- Twitter Card (summary_large_image)
- `robots: { index: true, follow: true }`
- Semantic landmarks: `<html lang="en">`, `<main>`, heading hierarchy
- Skip-to-content link for accessibility bots
- Motion OFF state is fully crawlable (no JS-dependent content hiding)
