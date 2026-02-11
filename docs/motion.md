# Motion Design System

## Core Principles
- **Cinematic**: Slow, smooth ease curves (e.g., `power2.out`, custom bezier).
- **Respectful**: Everything obeys `prefers-reduced-motion`.
- **Performance**: Use `transform` and `opacity` only.

## Tokens (Planned)
- **Duration**:
  - `fast`: 0.3s (UI interactions)
  - `medium`: 0.6s (Scene transitions)
  - `slow`: 1.2s+ (Cinematic reveals)
- **Ease**:
  - `default`: `power2.out`
  - `entrance`: `back.out(1.2)`
  - `cinematic`: `custom(0.25, 1, 0.5, 1)`

## Transitions
1. **Scene Pinning**: Sections lock in place while content scrolls or morphs.
2. **Signal Line**: A connecting graphical line that morphs between sections.
3. **FLIP Card**: Project cards expand to full screen using FLIP technique.
