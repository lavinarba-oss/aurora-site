import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { text: "text-base", dot: "size-1.5" },
  md: { text: "text-lg", dot: "size-2" },
  lg: { text: "text-xl", dot: "size-2.5" },
};

/** AURORA wordmark with animated aurora dot — used in header and footer */
export function BrandMark({ className, size = "md" }: BrandMarkProps) {
  const s = sizeMap[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display font-semibold tracking-tight",
        s.text,
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "relative inline-block rounded-full bg-[var(--aurora-gradient)] shadow-[0_0_18px_color-mix(in_oklab,var(--aurora-purple)_70%,transparent)]",
          s.dot
        )}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--aurora-purple)] opacity-30" />
      </span>
      AURORA
    </span>
  );
}
