"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  className?: string;
  /** Reduce intensity for in-section uses */
  intensity?: "default" | "soft";
  /** Add the subtle grain overlay */
  grain?: boolean;
};

/**
 * Decorative animated aurora gradient layer.
 * Placed as `<div className="relative"><AuroraBackground />…</div>`.
 * Pure CSS animation via Motion — respects prefers-reduced-motion globally.
 */
export function AuroraBackground({
  className,
  intensity = "default",
  grain = true,
}: AuroraBackgroundProps) {
  const opacity = intensity === "soft" ? 0.22 : 0.4;

  return (
    <div
      aria-hidden
      className={cn("aurora-canvas", className)}
      style={{ zIndex: 0 }}
    >
      <motion.div
        className="aurora-blob"
        style={{
          background: "var(--aurora-purple)",
          width: "55vw",
          height: "55vw",
          top: "-15vw",
          left: "-10vw",
          opacity,
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          ease: [0.16, 1, 0.3, 1],
          repeat: Infinity,
        }}
      />
      <motion.div
        className="aurora-blob"
        style={{
          background: "var(--aurora-cyan)",
          width: "45vw",
          height: "45vw",
          top: "10vh",
          right: "-10vw",
          opacity: opacity * 0.85,
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 26,
          ease: [0.16, 1, 0.3, 1],
          repeat: Infinity,
        }}
      />
      <motion.div
        className="aurora-blob"
        style={{
          background: "var(--aurora-pink)",
          width: "40vw",
          height: "40vw",
          bottom: "-15vw",
          left: "20vw",
          opacity: opacity * 0.7,
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 30,
          ease: [0.16, 1, 0.3, 1],
          repeat: Infinity,
        }}
      />
      {grain && <div className="aurora-noise" />}
    </div>
  );
}
