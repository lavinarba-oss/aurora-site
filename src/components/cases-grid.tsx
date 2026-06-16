"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/glow-card";
import { TiltCard } from "@/components/tilt-card";
import { CaseVisual } from "@/components/case-visual";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { CASES } from "@/lib/cases";
import { SERVICES, type ServiceSlug } from "@/lib/services";
import { getSolution } from "@/lib/solutions";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

type Filter = "all" | ServiceSlug;

/** Filterable grid of all cases — used on /cases */
export function CasesGrid() {
  const locale = useLocale() as Locale;
  const tHub = useTranslations("cases.hub");
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(() => {
    const all = [...CASES].sort((a, b) => b.year - a.year);
    return filter === "all" ? all : all.filter((c) => c.service === filter);
  }, [filter]);

  return (
    <>
      {/* Filter chips */}
      <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <Chip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={tHub("filterAll")}
        />
        {SERVICES.map((s) => (
          <Chip
            key={s.slug}
            active={filter === s.slug}
            onClick={() => setFilter(s.slug)}
            label={getSolution(s.slug)![locale].title}
          />
        ))}
      </Reveal>

      {items.length === 0 ? (
        <p className="mt-20 text-center text-sm text-muted-foreground">
          {tHub("empty")}
        </p>
      ) : (
        <Reveal stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => {
            const content = c.i18n[locale];
            return (
              <Reveal key={c.slug} child>
                <Link
                  href={`/cases/${c.slug}` as never}
                  className="block h-full"
                >
                  <TiltCard intensity={6} className="h-full">
                    <GlowCard
                      padding="none"
                      className="flex h-full flex-col overflow-hidden"
                    >
                      <div className="relative h-44 w-full overflow-hidden border-b border-white/[0.06] bg-[#070A1A]">
                        <CaseVisual
                          kind={c.visual}
                          accent={c.accent}
                          client={content.client}
                          image={c.image}
                          className="transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <span className="absolute left-4 top-4 z-10 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white/95 backdrop-blur">
                          {c.tag}
                        </span>
                        <span className="absolute bottom-3 right-4 z-10 text-xs uppercase tracking-[0.18em] text-white/60">
                          {c.year}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <h3 className="font-display text-base font-semibold leading-tight line-clamp-2">
                          {content.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {content.summary}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-3 text-[11px] uppercase tracking-[0.18em]">
                          <span className="text-[var(--aurora-cyan)]">
                            {content.metric}
                          </span>
                          <ArrowUpRight
                            className="size-4 text-muted-foreground"
                            aria-hidden
                          />
                        </div>
                      </div>
                    </GlowCard>
                  </TiltCard>
                </Link>
              </Reveal>
            );
          })}
        </Reveal>
      )}
    </>
  );
}

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm transition-colors",
        active
          ? "border-white/[0.18] bg-white/[0.08] text-foreground"
          : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:border-white/[0.12] hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
