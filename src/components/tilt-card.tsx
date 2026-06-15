"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees */
  intensity?: number;
  /** Scale on hover */
  scale?: number;
  /** Disable on small screens */
  disableMobile?: boolean;
};

/**
 * 3D parallax tilt wrapper.
 * Reads cursor position relative to the card and rotates it on X and Y.
 * Springs for buttery motion. No external dependency.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
  scale = 1.02,
  disableMobile = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  // Scale — must start at 1, otherwise the card renders at scale(0) (invisible)
  // until the first pointer move sets it.
  const z = useMotionValue(1);

  const springRotX = useSpring(rotateX, { damping: 20, stiffness: 200 });
  const springRotY = useSpring(rotateY, { damping: 20, stiffness: 200 });
  const springZ = useSpring(z, { damping: 20, stiffness: 200 });

  const transform = useMotionTemplate`perspective(900px) rotateX(${springRotX}deg) rotateY(${springRotY}deg) scale(${springZ})`;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    // Negative on X because moving cursor down should tilt forward
    rotateX.set(-py * intensity);
    rotateY.set(px * intensity);
    z.set(scale);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={cn(
        "will-change-transform",
        disableMobile && "md:will-change-transform",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
