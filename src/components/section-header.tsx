import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Consistent section header used across all pages.
 * Eyebrow → Title → Subtitle, with Aurora accent on eyebrow.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow && (
        <span className="font-display inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-base uppercase tracking-[0.18em] text-muted-foreground sm:text-lg">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-[var(--aurora-cyan)] shadow-[0_0_12px_var(--aurora-cyan)]"
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl",
          align === "center" ? "max-w-3xl" : "max-w-3xl"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-xl text-base text-muted-foreground sm:text-lg",
            align === "center" && "text-balance"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
