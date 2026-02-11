'use client';

import { cn } from '../../lib/cn';
// import { motion } from 'framer-motion';

// Note: Using framer-motion here for micro-interactions if installed, else fallback to CSS/GSAP?
// Since `framer-motion` isn't in package.json (I assume), I should use pure CSS or GSAP. 
// "Implement ONLY Phase 3 from PRD. No cursor. No 3D yet."
// I will use Tailwind/CSS for simplicity unless animations are complex.
// The user prompt didn't say install framer-motion. I'll stick to standard.

interface StepperProps {
    currentStep: number;
    steps: string[];
    onStepClick: (index: number) => void;
}

export default function Stepper({ currentStep, steps, onStepClick }: StepperProps) {
    return (
        <div className="flex flex-col gap-6 border-l border-white/10 pl-6 relative">
            <div
                className="absolute left-[-1px] top-0 w-[1px] bg-accent transition-all duration-500 ease-in-out"
                style={{
                    height: `${(currentStep / (steps.length - 1)) * 100}%`,
                    maxHeight: '100%'
                }}
            />

            {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isPast = index < currentStep;

                return (
                    <button
                        key={step}
                        onClick={() => onStepClick(index)}
                        className={cn(
                            "text-left group relative",
                            isActive ? "text-accent" : isPast ? "text-white" : "text-muted"
                        )}
                    >
                        <span className={cn(
                            "absolute -left-[29px] top-1.5 w-1.5 h-1.5 rounded-full border border-background transition-colors duration-300",
                            isActive ? "bg-accent scale-125" : isPast ? "bg-white" : "bg-panel border-white/20 group-hover:border-white/50"
                        )} />

                        <h4 className={cn("text-sm font-bold transition-colors", isActive && "text-accent")}>
                            0{index + 1}
                        </h4>
                        <p className="text-xs font-mono uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                            {step}
                        </p>
                    </button>
                );
            })}
        </div>
    );
}
