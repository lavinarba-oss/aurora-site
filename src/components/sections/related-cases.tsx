import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/glow-card";
import { TiltCard } from "@/components/tilt-card";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { CASES } from "@/lib/cases";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import type { ServiceSlug } from "@/lib/services";

type RelatedCasesProps = {
  service: ServiceSlug;
  limit?: number;
};

/** Filtered list of cases that match the given service */
export async function RelatedCases({ service, limit = 3 }: RelatedCasesProps) {
  const locale = (await getLocale()) as Locale;
  const tHub = await getTranslations("services.hub");
  const tCases = await getTranslations("home.cases");

  const items = CASES.filter((c) => c.service === service).slice(0, limit);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow={tHub("sectionCases")}
            title={tHub("sectionCases")}
            align="left"
          />
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-4 md:grid-cols-3">
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
                      <div
                        aria-hidden
                        className="relative h-36 w-full overflow-hidden"
                        style={{ background: c.accent }}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_100%,rgba(5,8,22,0.65)_0%,rgba(5,8,22,0)_60%)]" />
                        <span className="absolute left-4 top-4 rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white/95 backdrop-blur">
                          {c.tag}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <h3 className="font-display text-base font-semibold leading-tight">
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

        <Reveal className="mt-10 flex justify-start">
          <Link
            href="/cases"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "px-6"
            )}
          >
            {tCases("viewAll")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
