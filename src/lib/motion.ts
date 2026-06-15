import type { Transition, Variants } from "motion/react";

/** Aurora-feeling easing: smooth deceleration, used everywhere */
export const easeAurora: Transition["ease"] = [0.16, 1, 0.3, 1];

/** Default spring for soft, interactive responses */
export const springSoft: Transition = {
  type: "spring",
  damping: 22,
  stiffness: 180,
  mass: 0.8,
};

/** Standard fade-up reveal for section content */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeAurora },
  },
};

/** Larger fade-up for hero pieces */
export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeAurora },
  },
};

/** Scale-and-fade for cards/badges */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeAurora },
  },
};

/** Parent container that staggers its children */
export const staggerContainer = (delayChildren = 0.05, stagger = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: {
      delayChildren,
      staggerChildren: stagger,
    },
  },
});
