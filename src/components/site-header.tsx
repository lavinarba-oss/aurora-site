"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV } from "@/lib/site";
import { BrandMark } from "./brand-mark";
import { LocaleSwitcher } from "./locale-switcher";
import { ServicesMenu } from "./services-menu";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Sticky glass header with scroll-aware border + nav dropdown */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tCta = useTranslations("common.cta");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="AURORA — home">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV.filter((n) => n.key === "home").map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "font-display uppercase tracking-[0.08em] text-[0.95rem] transition-colors",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tNav(item.key)}
              </Link>
            ))}
            <ServicesMenu />
            {NAV.filter((n) => n.key !== "services" && n.key !== "home").map(
              (item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "font-display uppercase tracking-[0.08em] text-[0.95rem] transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tNav(item.key)}
                  </Link>
                );
              }
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <Link
            href="/contacts"
            className={cn(
              buttonVariants({ size: "default" }),
              "hidden px-4 md:inline-flex"
            )}
          >
            {tCta("discuss")}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
