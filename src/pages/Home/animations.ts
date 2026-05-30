import type { Variants } from "framer-motion";

const cubicEase = [0.4, 0, 0.2, 1] as [number, number, number, number];

/** Fades and slides a single element up into view */
export const fadeUpVariant: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: cubicEase },
  },
};

/** Parent that staggers its children's fadeUpVariant reveals */
export const staggerContainerVariant: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};

/** Hero visual stack — scales + slides in from the right */
export const heroVisualVariant = {
  initial:    { opacity: 0, scale: 0.92, x: 30 },
  animate:    { opacity: 1, scale: 1,    x: 0  },
  transition: { duration: 0.7, delay: 0.2, ease: cubicEase },
};

/** Floating badge/review cards — oscillate up and down continuously */
export const floatUpVariant = {
  animate:    { y: [0, -8, 0] },
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
};

export const floatDownVariant = {
  animate:    { y: [0, 8, 0] },
  transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 },
};
