"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** Pull strength — higher = stronger magnetism */
  strength?: number;
  /** Radius (in px from button center) within which the magnet activates */
  radius?: number;
  /** Render as <button> by default; pass `asChild=false` to render a wrapper div */
  asChild?: boolean;
};

/**
 * Element that drifts towards the cursor when it's nearby.
 * Use to give CTA buttons a tactile, "alive" feeling.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  radius = 140,
  asChild = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 200 });
  const springY = useSpring(y, { damping: 20, stiffness: 200 });

  const transform = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const distance = Math.hypot(dx, dy);
    if (distance > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform }}
      className={cn("inline-block", className)}
    >
      {asChild ? children : <div className="inline-block">{children}</div>}
    </motion.div>
  );
}
