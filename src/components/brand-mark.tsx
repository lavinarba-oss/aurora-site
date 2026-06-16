import { cn, assetPath } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { text: "text-base", mark: "h-6" },
  md: { text: "text-lg", mark: "h-7" },
  lg: { text: "text-2xl", mark: "h-10" },
};

/** AURORA logo — aurora-planet emblem + wordmark. Used in header and footer. */
export function BrandMark({ className, size = "md" }: BrandMarkProps) {
  const s = sizeMap[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display font-semibold tracking-tight",
        s.text,
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath("/brand/aurorra-emblem.png")}
        alt="AURORA"
        className={cn("w-auto select-none", s.mark)}
        draggable={false}
      />
      AURORA
    </span>
  );
}
