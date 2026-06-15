"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  /** Inner padding preset */
  padding?: "default" | "lg" | "none";
  /** Border glow color, defaults to aurora purple */
  glowColor?: string;
};

/**
 * Glassmorphism card with a cursor-following Aurora glow.
 * Use for service cards, case tiles, feature blocks.
 */
export function GlowCard({
  children,
  className,
  padding = "default",
  glowColor = "rgba(185, 103, 255, 0.35)",
}: GlowCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 60%)`;

  const padClass =
    padding === "lg" ? "p-8 sm:p-10" : padding === "none" ? "" : "p-6 sm:p-8";

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card/60 backdrop-blur-xl",
        "transition-colors duration-300 hover:border-white/[0.16]",
        padClass,
        className
      )}
    >
      {/* Cursor-following aurora glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {/* Top edge highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
