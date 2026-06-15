import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  /** Choose between full Aurora gradient or single-tone variants */
  variant?: "aurora" | "purple-cyan" | "pink-purple";
};

const variantMap: Record<NonNullable<GradientTextProps["variant"]>, string> = {
  aurora: "bg-[var(--aurora-gradient)]",
  "purple-cyan":
    "bg-[linear-gradient(120deg,var(--aurora-purple),var(--aurora-cyan))]",
  "pink-purple":
    "bg-[linear-gradient(120deg,var(--aurora-pink),var(--aurora-purple))]",
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
