import { type CSSProperties, type ReactNode } from "react";
import { motion, type MotionStyle, type MotionValue } from "framer-motion";
import type { UseScrollRevealResult } from "./useScrollReveal";

interface ScrollRevealUIProps
  extends Pick<UseScrollRevealResult, "targetRef" | "animatedOpacity" | "animatedY" | "isReducedMotion"> {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * Purely responsible for rendering.
 * Receives all values from useScrollReveal — decides nothing on its own.
 *
 * Two paths:
 *  - Reduced motion → plain div, no animation (accessibility)
 *  - Normal → motion.div with scroll-scrubbed opacity + Y transform
 */
const ScrollRevealUI = ({
  children,
  style,
  className,
  targetRef,
  animatedOpacity,
  animatedY,
  isReducedMotion,
}: ScrollRevealUIProps) => {
  // Accessibility path — no animation, just render children normally
  if (isReducedMotion) {
    return (
      <div ref={targetRef} className={className} style={style}>
        {children}
      </div>
    );
  }

  // Animated path — outer div is the scroll target, inner motion.div handles the animation
  return (
    <div ref={targetRef} className={className}>
      <motion.div
        style={
          {
            opacity: animatedOpacity,
            y: animatedY,
            willChange: "opacity, transform",
            ...style,
          } as MotionStyle
        }
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollRevealUI;
export type { ScrollRevealUIProps };
