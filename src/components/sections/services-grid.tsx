import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/glow-card";
import { TiltCard } from "@/components/tilt-card";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/services";
import { getSolution, formatPrice } from "@/lib/solutions";
import type { Locale } from "@/i18n/routing";

/**
 * Services overview on the home page — all seven solution types in a clean grid.
 */
export async function ServicesGrid() {
  const locale = (await getLocale()) as Locale;
  const tHome = await getTranslations("home.services");

  return (
    <section className="relative py-14 sm:py-24" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow={tHome("eyebrow")}
            title={tHome("title")}
            subtitle={tHome("subtitle")}
          />
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const sol = getSolution(s.slug)!;
            const c = sol[locale];
            return (
              <Reveal key={s.slug} child>
                <Link href={s.href} className="group block h-full">
                  <TiltCard intensity={7} className="h-full">
                    <GlowCard className="flex h-full min-h-[200px] flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <span
                          aria-hidden
                          className="grid size-11 shrink-0 place-items-center rounded-xl text-[#0A0E27]"
                          style={{ background: s.accent }}
                        >
                          <Icon className="size-5" strokeWidth={2.2} />
                        </span>
                        <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                          {formatPrice(sol, locale)}
                        </span>
                      </div>

                      <div className="mt-8 flex flex-col gap-2">
                        <h3 className="flex items-center gap-1.5 font-display text-lg font-semibold leading-tight tracking-tight sm:text-xl">
                          {c.title}
                          <ArrowUpRight
                            className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                            aria-hidden
                          />
                        </h3>
                        <p className="text-sm text-muted-foreground">{c.short}</p>
                      </div>
                    </GlowCard>
                  </TiltCard>
                </Link>
              </Reveal>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
