# Engineering Decisions Log

## 001. Architecture - Next.js App Router
- **Context**: Need specific control over layout and rendering.
- **Decision**: Use App Router for modern features, but keep it single-page for the main flow.
- **Trade-off**: Slightly more complex routing for the "modal" case study, but better performance.

## 002. Styling - Tailwind + GSAP
- **Context**: Need rapid UI dev + complex motion.
- **Decision**: Tailwind for static styling, GSAP for all motion. avoiding CSS animations for complex sequences to prevent conflicts.

## 003. Recruiter Mode
- **Context**: Some users want speed over fancy animations.
- **Decision**: Implemented a global `MotionProvider` that wraps the app. Components must subscribe to `useMotion()` to decide whether to animate or render static.
