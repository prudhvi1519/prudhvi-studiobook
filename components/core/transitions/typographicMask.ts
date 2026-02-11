import gsap from 'gsap';

export const calculateMask = (progress: number) => {
    // progress 0 -> 1
    // Clip path expands from text center to full screen

    const percent = gsap.utils.interpolate(0, 100, progress);

    // Circle expanding mask
    return {
        clipPath: `circle(${percent * 1.5}% at 50% 50%)`,
        WebkitClipPath: `circle(${percent * 1.5}% at 50% 50%)`,
    };
};
