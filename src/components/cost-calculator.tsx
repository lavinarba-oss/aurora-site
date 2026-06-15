"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SOLUTIONS } from "@/lib/solutions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

type AddOn = {
  id: string;
  /** Flat addition in rubles, or a multiplier if `mult` set */
  add?: number;
  mult?: number;
  ru: string;
  en: string;
};

const ADDONS: AddOn[] = [
  { id: "design", add: 40000, ru: "Дизайн под ключ", en: "Turnkey design" },
  { id: "integrations", add: 50000, ru: "Интеграции (CRM, оплата, 1С)", en: "Integrations (CRM, payments, ERP)" },
  { id: "content", add: 20000, ru: "Наполнение контентом", en: "Content filling" },
  { id: "multilang", add: 30000, ru: "Мультиязычность", en: "Multiple languages" },
  { id: "account", add: 80000, ru: "Личный кабинет", en: "User account area" },
  { id: "support", add: 45000, ru: "Поддержка 3 месяца", en: "3 months of support" },
  { id: "urgent", mult: 1.25, ru: "Срочный запуск", en: "Rush delivery" },
];

function money(n: number, locale: Locale) {
  if (locale === "en") return `$${Math.round(n / 85 / 50) * 50}`;
  return `${Math.round(n / 1000) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

/** Interactive cost estimator. Honest range; the real quote comes after the PRD. */
export function CostCalculator() {
  const locale = useLocale() as Locale;
  const t = useTranslations("calculator");
  const [slug, setSlug] = useState(SOLUTIONS[0].slug);
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const sol = SOLUTIONS.find((s) => s.slug === slug)!;

  const { low, high } = useMemo(() => {
    let lo = sol.price.from;
    let hi = sol.price.to;
    let mult = 1;
    for (const a of ADDONS) {
      if (!picked.has(a.id)) continue;
      if (a.add) {
        lo += a.add;
        hi += a.add;
      }
      if (a.mult) mult *= a.mult;
    }
    return { low: Math.round(lo * mult), high: Math.round(hi * mult) };
  }, [sol, picked]);

  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* Inputs */}
      <div className="flex flex-col gap-6 rounded-3xl border border-white/[0.08] bg-card/40 p-6 backdrop-blur-xl sm:p-8">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("step1")}
          </span>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SOLUTIONS.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setSlug(s.slug)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left text-sm transition-colors",
                  s.slug === slug
                    ? "border-transparent bg-gradient-to-r from-[var(--aurora-purple)] to-[var(--aurora-cyan)] font-semibold text-[#0A0E27]"
                    : "border-white/[0.08] bg-white/[0.02] text-foreground/80 hover:border-white/20"
                )}
              >
                {s[locale].title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("step2")}
          </span>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {ADDONS.map((a) => {
              const on = picked.has(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => toggle(a.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-colors",
                    on
                      ? "border-white/[0.16] bg-white/[0.06]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/12"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
                      on
                        ? "border-transparent bg-[var(--aurora-cyan)] text-[#0A0E27]"
                        : "border-white/20"
                    )}
                  >
                    {on && <Check className="size-3.5" strokeWidth={3} />}
                  </span>
                  <span className={on ? "text-foreground" : "text-foreground/80"}>
                    {a[locale]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-white/[0.1] bg-card/60 p-6 backdrop-blur-xl sm:p-8">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("resultLabel")}
          </span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="bg-gradient-to-r from-[var(--aurora-cyan)] to-[var(--aurora-purple)] bg-clip-text font-display text-3xl font-bold text-transparent sm:text-4xl">
              {money(low, locale)}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("upTo")} {money(high, locale)}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">
            {t("note")}
          </p>
        </div>

        <Link
          href="/contacts"
          className={cn(buttonVariants({ size: "lg" }), "group w-full justify-center gap-2")}
        >
          {t("cta")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
