import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Check, Sparkles, Users } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { GlowCard } from "@/components/glow-card";
import { Reveal } from "@/components/reveal";
import { RelatedCases } from "@/components/sections/related-cases";
import { ServiceCta } from "@/components/sections/service-cta";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { routing, asLocale, type Locale } from "@/i18n/routing";
import { SERVICES, type ServiceSlug } from "@/lib/services";
import {
  getSolution,
  formatPrice,
  PROCESS_STEPS,
} from "@/lib/solutions";
import { cn } from "@/lib/utils";

type RouteParams = { locale: string; slug: string };

const VALID_SLUGS = SERVICES.map((s) => s.slug);

function isServiceSlug(value: string): value is ServiceSlug {
  return (VALID_SLUGS as string[]).includes(value);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale: localeStr, slug } = await params;
  const locale = asLocale(localeStr);
  const sol = getSolution(slug);
  if (!sol) return {};
  const c = sol[locale];
  return {
    title: c.title,
    description: c.short,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        ru: `/ru/services/${slug}`,
        en: `/en/services/${slug}`,
      },
    },
    openGraph: { title: c.title, description: c.short },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale: localeStr, slug } = await params;
  const locale: Locale = asLocale(localeStr);
  if (!isServiceSlug(slug)) notFound();
  setRequestLocale(locale);

  const sol = getSolution(slug)!;
  const c = sol[locale];
  const def = SERVICES.find((s) => s.slug === slug)!;
  const Icon = def.icon;
  const tCta = await getTranslations("common.cta");
  const paragraphs = c.article.split("\n\n");

  const audienceTitle = locale === "ru" ? "Кому подойдёт" : "Who it's for";
  const includesTitle = locale === "ru" ? "Что входит" : "What's included";
  const bestForTitle = locale === "ru" ? "Когда выбирать" : "When to choose it";
  const priceLabel = locale === "ru" ? "Стоимость" : "Price";
  const processTitle = locale === "ru" ? "Как мы работаем" : "How we work";
  const processSub =
    locale === "ru"
      ? "Перед разработкой составляем PRD и согласуем цену за каждый этап."
      : "Before development we write a PRD and agree the price for each stage.";
  const back = locale === "ru" ? "Все услуги" : "All services";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-12 sm:pt-36 sm:pb-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {back}
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <span
              aria-hidden
              className="grid size-14 shrink-0 place-items-center rounded-2xl text-[#0A0E27]"
              style={{ background: def.accent }}
            >
              <Icon className="size-7" strokeWidth={2.2} />
            </span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
              <Sparkles className="size-3.5 text-[var(--aurora-cyan)]" aria-hidden />
              {c.tagline}
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-5xl md:text-6xl">
            <GradientText>{c.title}</GradientText>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground text-balance sm:text-lg">
            {c.short}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contacts"
              className={cn(buttonVariants({ size: "lg" }), "group gap-2 px-6")}
            >
              {tCta("discuss")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {priceLabel}
              </span>
              <span
                className="bg-gradient-to-r from-[var(--aurora-cyan)] to-[var(--aurora-purple)] bg-clip-text text-lg font-semibold text-transparent"
              >
                {formatPrice(sol, locale)}
              </span>
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />
      </section>

      {/* Article + sidebar */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Article */}
          <Reveal className="prose max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <Reveal>
              <GlowCard className="flex flex-col gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--aurora-cyan)]">
                  <Users className="size-3.5" />
                  {audienceTitle}
                </span>
                <ul className="flex flex-col gap-2">
                  {c.audience.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-[var(--aurora-cyan)]" />
                      {a}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </Reveal>

            <Reveal>
              <GlowCard className="flex flex-col gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--aurora-cyan)]">
                  {includesTitle}
                </span>
                <ul className="flex flex-col gap-2">
                  {c.includes.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-[var(--aurora-cyan)]" />
                      {a}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </Reveal>

            <Reveal>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {bestForTitle}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {c.bestFor}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRD-based process with per-step pricing */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--aurora-cyan)]">
              {processTitle}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {processSub}
            </h2>
          </Reveal>
          <div className="mt-12 flex flex-col gap-3">
            {PROCESS_STEPS.map((step) => {
              const sc = step[locale];
              return (
                <Reveal key={step.n}>
                  <div className="flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
                    <span
                      className="bg-gradient-to-br from-[var(--aurora-purple)] to-[var(--aurora-cyan)] bg-clip-text font-display text-2xl font-bold text-transparent"
                    >
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {sc.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {sc.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <RelatedCases service={slug} />
      <ServiceCta />
    </>
  );
}
