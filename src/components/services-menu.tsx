"use client";

import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/services";
import { getSolution } from "@/lib/solutions";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ServicesMenuProps = {
  className?: string;
};

/** Hover-aware services dropdown for the desktop header */
export function ServicesMenu({ className }: ServicesMenuProps) {
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors outline-none",
          "hover:text-foreground focus-visible:text-foreground",
          "data-[state=open]:text-foreground",
          className
        )}
      >
        {tNav("services")}
        <ChevronDown
          className="size-3.5 transition-transform data-[state=open]:rotate-180"
          aria-hidden
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={14}
        className="w-[640px] max-w-[calc(100vw-2rem)] rounded-2xl border-white/[0.08] bg-card/90 p-3 backdrop-blur-2xl"
      >
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const sol = getSolution(s.slug)![locale];
            return (
              <Link
                key={s.slug}
                href={s.href}
                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.04]"
              >
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-lg text-[#0A0E27]"
                  style={{ background: s.accent }}
                >
                  <Icon className="size-5" strokeWidth={2.2} />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {sol.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {sol.short}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
        <Link
          href="/services"
          className="mt-2 flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-sm transition-colors hover:bg-white/[0.06]"
        >
          <span className="font-medium">
            {tNav("services")} — все направления
          </span>
          <span className="text-[var(--aurora-cyan)]">→</span>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
