"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Direction of motion */
  direction?: "left" | "right";
  /** Animation duration in seconds */
  duration?: number;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Vertical mode (animates along Y) */
  vertical?: boolean;
  className?: string;
};

/**
 * Pure-CSS infinite marquee.
 * Duplicates its children once so the loop is seamless.
 * No JS animation — pause and direction via CSS variables.
 */
export function Marquee({
  children,
  direction = "left",
  duration = 40,
  pauseOnHover = true,
  vertical = false,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      style={
        {
          "--marquee-duration": `${duration}s`,
          "--marquee-direction": direction === "left" ? "normal" : "reverse",
        } as React.CSSProperties
      }
    >
      {[0, 1].map((idx) => (
        <div
          key={idx}
          aria-hidden={idx === 1}
          className={cn(
            "flex shrink-0 items-center justify-around gap-[var(--marquee-gap,3rem)]",
            vertical
              ? "flex-col animate-marquee-vertical"
              : "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
