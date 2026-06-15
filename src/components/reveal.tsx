"use client";

import { motion, type Variants } from "motion/react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { fadeUp, popIn, staggerContainer } from "@/lib/motion";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  variants?: Variants;
  /** When children should also stagger */
  stagger?: boolean;
  delay?: number;
  /** When true, animation re-fires each time element enters viewport */
  once?: boolean;
  /**
   * When true, this Reveal does not register its own viewport observer —
   * it inherits the show/hide state from a parent stagger container.
   * Use for items inside <Reveal stagger>.
   */
  child?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className">;

/**
 * Reveals its children when scrolled into view.
 * Defaults to a soft fade-up; pass `stagger` to animate children one after another.
 * Pass `child` for items inside a stagger container.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  variants,
  stagger = false,
  delay = 0,
  once = true,
  child = false,
  className,
  ...rest
}: RevealProps<T>) {
  const Component = (motion[(as ?? "div") as keyof typeof motion] ??
    motion.div) as typeof motion.div;

  const v =
    variants ??
    (child ? popIn : stagger ? staggerContainer(delay) : fadeUp);

  if (child) {
    return (
      <Component variants={v} className={className} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={v}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
