"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  className?: string;
};

/** Compact RU/EN segmented switcher. Preserves current pathname. */
export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const t = useTranslations("common.lang.short");
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const onSelect = (next: Locale) => {
    if (next === current) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] p-1 text-xs font-medium",
        className
      )}
    >
      {routing.locales.map((loc) => {
        const active = loc === current;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => onSelect(loc)}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              active
                ? "bg-white/[0.08] text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={active}
          >
            {t(loc)}
          </button>
        );
      })}
    </div>
  );
}
