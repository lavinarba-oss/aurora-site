import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  /** Choose between full Aurora gradient or single-tone variants */
  variant?: "aurora" | "purple-cyan" | "pink-purple";
};

// Use the explicit `image:` hint so Tailwind emits `background-image` (a bare
// `bg-[var(--x)]` is treated as background-COLOR, which silently drops a
// gradient value and leaves the clipped text invisible).
const variantMap: Record<NonNullable<GradientTextProps["variant"]>, string> = {
  aurora: "bg-[image:var(--aurora-gradient)]",
  "purple-cyan":
    "bg-[image:linear-gradient(120deg,var(--aurora-purple),var(--aurora-cyan))]",
  "pink-purple":
    "bg-[image:linear-gradient(120deg,var(--aurora-pink),var(--aurora-purple))]",
};

/** Inline gradient-text span. Use for accent phrases inside headings. */
export function GradientText({
  children,
  className,
  variant = "aurora",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        variantMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
