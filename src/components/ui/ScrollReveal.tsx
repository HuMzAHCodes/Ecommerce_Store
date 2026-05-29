import { useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";

/** Framer Motion scroll offset pair — numeric viewport positions only */
type ScrollOffsetPair = [`start ${number}`, `start ${number}`];

const scrollOffset = (start: number, end: number): ScrollOffsetPair => [
  `start ${start}`,
  `start ${end}`,
];

export interface ScrollRevealProps {
  children: ReactNode;
  style?: CSSProperties;
  /** Viewport position (0–1) when reveal begins */
  start?: number;
  /** Viewport position (0–1) when reveal finishes */
  end?: number;
  /** Starting vertical offset in px — scrubs to 0 */
  y?: number;
  className?: string;
}

/**
 * Scroll-scrubbed reveal: opacity and position follow scroll progress
 * while the element moves through the viewport (not on page load).
 */
const ScrollReveal = ({
  children,
  style,
  start = 0.94,
  end = 0.62,
  y = 40,
  className,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset(start, end),
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [y, 0]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={
          {
            opacity,
            y: translateY,
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

export default ScrollReveal;
