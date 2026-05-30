import type { Variants } from "framer-motion";

const cubicEase = [0.4, 0, 0.2, 1] as [number, number, number, number];

/**
 * Fades and slides a child element up into view.
 * Used inside a staggered parent container in the Hero section.
 */
export const fadeUpVariant: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: cubicEase },
  },
};

/**
 * Parent container that staggers its children's reveal animations.
 * Used in the Hero section to sequence the tagline, heading, and body text.
 */
export const staggerContainerVariant: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};
