export const calculateDock = (progress: number) => {
    // progress 0 -> 1 (entering -> fully docked -> leaving)

    // Phase 1: Scale down and borderRadius increase (0 -> 0.5)
    // Phase 2: Translate up/fade out or stay put (0.5 -> 1)

    const scale = gsap.utils.interpolate(1, 0.95, progress);
    const borderRadius = gsap.utils.interpolate(0, 24, progress);
    const opacity = gsap.utils.interpolate(1, 0.5, progress); // Dimming as it goes back

    return {
        transform: `scale(${scale})`,
        borderRadius: `${borderRadius}px`,
        opacity,
        filter: `brightness(${opacity})`,
    };
};

import gsap from 'gsap';
