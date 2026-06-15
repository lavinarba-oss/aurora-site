import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sparkles, Check } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { GlowCard } from "@/components/glow-card";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { ServiceCta } from "@/components/sections/service-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FAQ_CATEGORIES,
  ENGAGEMENT_MODELS,
  PRICE_RANGES,
} from "@/lib/faq";
import { asLocale, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/faq`,
      languages: { ru: "/ru/faq", en: "/en/faq" },
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeStr } = await params;
  const locale: Locale = asLocale(localeStr);
  setRequestLocale(locale);
  const t = await getTranslations("faq");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-28 pb-12 text-center sm:pt-36 sm:pb-16">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            <Sparkles className="size-3.5 text-[var(--aurora-cyan)]" aria-hidden />
            {t("eyebrow")}
          </span>
          <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl">
            <GradientText>{t("title")}</GradientText>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground text-balance sm:text-lg">
            {t("subtitle")}
          </p>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />
      </section>

      {/* Engagement models */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeader eyebrow={t("modelsTitle")} title={t("modelsTitle")} subtitle={t("modelsSubtitle")} />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((m) => {
              const c = m[locale];
              return (
                <Reveal key={m.id} child>
                  <GlowCard className="flex h-full flex-col gap-3">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--aurora-cyan)]">
                      {c.tagline}
                    </span>
                    <h3 className="font-display text-2xl font-semibold tracking-tight">
                      {c.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{c.desc}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm text-foreground/80">
                      <Check className="size-4 text-[var(--aurora-cyan)]" />
                      {c.best}
                    </span>
                  </GlowCard>
                </Reveal>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Price ranges */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <SectionHeader eyebrow={t("pricesTitle")} title={t("pricesTitle")} subtitle={t("pricesSubtitle")} />
          </Reveal>

          <Reveal className="mt-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-card/40 backdrop-blur-xl">
            {/* header row */}
            <div className="hidden grid-cols-[1.6fr_1fr_1fr] gap-4 border-b border-white/[0.06] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:grid">
              <span>{t("colType")}</span>
              <span>{t("colPrice")}</span>
              <span>{t("colTime")}</span>
            </div>
            {PRICE_RANGES.map((p, i) => {
              const c = p[locale];
              return (
                <div
                  key={p.id}
                  className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[1.6fr_1fr_1fr] sm:items-center sm:gap-4 ${
                    i !== 0 ? "border-t border-white/[0.05]" : ""
                  }`}
                >
                  <span className="font-medium text-foreground">{c.type}</span>
                  <span
                    className="bg-gradient-to-r from-[var(--aurora-cyan)] to-[var(--aurora-purple)] bg-clip-text text-sm font-semibold text-transparent"
                  >
                    {c.range}
                  </span>
                  <span className="text-sm text-muted-foreground">{c.time}</span>
                </div>
              );
            })}
          </Reveal>
          <Reveal className="mt-4">
            <p className="text-xs text-muted-foreground/70 text-balance">{t("pricesNote")}</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ accordions */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-col gap-14">
            {FAQ_CATEGORIES.map((cat) => {
              const cc = cat[locale];
              return (
                <Reveal key={cat.id}>
                  <div className="mb-5">
                    <h2 className="font-display text-2xl font-semibold tracking-tight">
                      {cc.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{cc.blurb}</p>
                  </div>
                  <Accordion className="w-full">
                    {cat.items.map((item) => {
                      const ic = item[locale];
                      return (
                        <AccordionItem
                          key={item.id}
                          value={item.id}
                          className="border-white/[0.06]"
                        >
                          <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                            {ic.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                            {ic.a}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceCta />
    </>
  );
}
