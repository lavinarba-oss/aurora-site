"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { NAV } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { getSolution } from "@/lib/solutions";
import type { Locale } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";
import { BrandMark } from "./brand-mark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Mobile slide-over navigation, replaces the desktop header on small viewports */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const tCta = useTranslations("common.cta");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-foreground md:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[88vw] max-w-sm border-l-white/[0.08] bg-background p-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <BrandMark size="sm" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>
          <SheetTitle className="sr-only">Navigation</SheetTitle>

          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col gap-1 text-base font-medium">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
              <span className="px-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {tNav("services")}
              </span>
              <ul className="mt-2 flex flex-col">
                {SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.slug}>
                      <Link
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-white/[0.04]"
                      >
                        <span
                          aria-hidden
                          className="grid size-7 place-items-center rounded-md text-[#0A0E27]"
                          style={{ background: s.accent }}
                        >
                          <Icon className="size-4" strokeWidth={2.2} />
                        </span>
                        {getSolution(s.slug)![locale].title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-4">
            <LocaleSwitcher />
            <Link
              href="/contacts"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ size: "default" }), "px-4")}
            >
              {tCta("discuss")}
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
