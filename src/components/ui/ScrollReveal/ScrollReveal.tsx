import { useRef } from "react";
import {
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/** Framer Motion scroll offset pair — numeric viewport positions only */
type ScrollOffsetPair = [`start ${number}`, `start ${number}`];

/**
 * Builds the offset tuple Framer Motion expects for scroll tracking.
 * start/end are 0–1 viewport positions.
 */
const buildScrollOffset = (start: number, end: number): ScrollOffsetPair => [
  `start ${start}`,
  `start ${end}`,
];

interface UseScrollRevealOptions {
  /** Viewport position (0–1) when the reveal animation begins */
  start: number;
  /** Viewport position (0–1) when the reveal animation finishes */
  end: number;
  /** Starting vertical offset in px that scrubs down to 0 */
  verticalOffset: number;
}

interface UseScrollRevealResult {
  /** Ref to attach to the wrapper div so Framer can track its position */
  targetRef: React.RefObject<HTMLDivElement | null>;
  /** Animated opacity value — goes from 0 → 1 as user scrolls */
  animatedOpacity: MotionValue<number>;
  /** Animated Y translate value — goes from verticalOffset → 0 as user scrolls */
  animatedY: MotionValue<number>;
  /** True when the user has reduced-motion preference enabled */
  isReducedMotion: boolean | null;
}

/**
 * Encapsulates all scroll-scrub logic for the ScrollReveal component.
 * Returns the ref, animated values, and reduced-motion flag — no UI concern here.
 */
const useScrollReveal = ({
  start,
  end,
  verticalOffset,
}: UseScrollRevealOptions): UseScrollRevealResult => {
  const targetRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: buildScrollOffset(start, end),
  });

  // Map scroll progress [0 → 1] to opacity [0 → 1]
  const animatedOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Map scroll progress [0 → 1] to Y position [verticalOffset → 0]
  const animatedY = useTransform(scrollYProgress, [0, 1], [verticalOffset, 0]);

  return {
    targetRef,
    animatedOpacity,
    animatedY,
    isReducedMotion,
  };
};

export default useScrollReveal;
export type { UseScrollRevealOptions, UseScrollRevealResult };
