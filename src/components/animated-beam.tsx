"use client";

import { motion } from "motion/react";
import {
  useEffect,
  useState,
  type RefObject,
  type SVGAttributes,
} from "react";
import { cn } from "@/lib/utils";

type AnimatedBeamProps = {
  /** Element that wraps both endpoints */
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  /** Curvature: positive = arch up, negative = arch down */
  curvature?: number;
  /** Stroke colors */
  baseColor?: string;
  beamColor?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Beam runs for `duration` seconds; delay before each run */
  duration?: number;
  delay?: number;
  className?: string;
} & SVGAttributes<SVGSVGElement>;

/**
 * Glowing beam that travels along a curved path between two DOM elements.
 * Recomputes path on resize.
 */
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = -30,
  baseColor = "rgba(255,255,255,0.10)",
  beamColor = "var(--aurora-cyan)",
  strokeWidth = 1.2,
  duration = 4,
  delay = 0,
  className,
  ...rest
}: AnimatedBeamProps) {
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;
      if (!container || !from || !to) return;
      const cRect = container.getBoundingClientRect();
      const fRect = from.getBoundingClientRect();
      const tRect = to.getBoundingClientRect();

      const x1 = fRect.left - cRect.left + fRect.width / 2;
      const y1 = fRect.top - cRect.top + fRect.height / 2;
      const x2 = tRect.left - cRect.left + tRect.width / 2;
      const y2 = tRect.top - cRect.top + tRect.height / 2;
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2 + curvature;

      setSize({ w: cRect.width, h: cRect.height });
      setPath(`M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`);
    };

    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("resize", compute);
      ro.disconnect();
    };
  }, [containerRef, fromRef, toRef, curvature]);

  if (!path) return null;

  const gradId = `beam-grad-${delay}`;

  return (
    <svg
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      className={cn(
        "pointer-events-none absolute inset-0 transform-gpu",
        className
      )}
      {...rest}
    >
      <defs>
        <motion.linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0", y1: "0", x2: "0", y2: "0" }}
          animate={{
            x1: ["0%", "100%"],
            y1: ["0%", "100%"],
            x2: ["10%", "110%"],
            y2: ["10%", "110%"],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <stop stopColor={beamColor} stopOpacity="0" />
          <stop offset="32.5%" stopColor={beamColor} />
          <stop offset="100%" stopColor={beamColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
      {/* Static base line */}
      <path
        d={path}
        stroke={baseColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      {/* Moving beam */}
      <path
        d={path}
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth * 1.6}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
