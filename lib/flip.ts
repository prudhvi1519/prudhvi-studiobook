import gsap from 'gsap';
import { Flip } from 'gsap/all';

gsap.registerPlugin(Flip);

interface FlipState {
    state: Flip.FlipState;
    kill: () => void;
}

export const captureFlipState = (elements: Element | Element[] | string): Flip.FlipState => {
    return Flip.getState(elements);
};

export const applyFlip = (
    state: any,
    targets: Element | Element[] | string,
    options?: any
) => {
    return Flip.from(state, {
        absolute: true,
        duration: 0.7,
        ease: 'power3.inOut',
        targets,
        simple: true,
        onEnter: (elements) => {
            return gsap.fromTo(
                elements,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, delay: 0.2 }
            );
        },
        onLeave: (elements) => {
            return gsap.to(elements, { opacity: 0, scale: 0.9 });
        },
        ...options
    });
};
