import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { GlowCard } from "@/components/glow-card";
import { CaseVisual } from "@/components/case-visual";
import { Reveal } from "@/components/reveal";
import { ServiceCta } from "@/components/sections/service-cta";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { CASES } from "@/lib/cases";
import { SERVICES } from "@/lib/services";
import { getSolution } from "@/lib/solutions";
import { routing, asLocale, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type RouteParams = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CASES.map((c) => ({ locale, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale: localeStr, slug } = await params;
  const locale = asLocale(localeStr);
  const c = CASES.find((x) => x.slug === slug);
  if (!c) return {};
  const content = c.i18n[locale];
  return {
    title: content.title,
    description: content.summary,
    alternates: {
      canonical: `/${locale}/cases/${slug}`,
      languages: {
        ru: `/ru/cases/${slug}`,
        en: `/en/cases/${slug}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.summary,
      type: "article",
    },
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale: localeStr, slug } = await params;
  const locale = asLocale(localeStr);
  const caseDef = CASES.find((c) => c.slug === slug);
  if (!caseDef) notFound();
  setRequestLocale(locale);

  const content = caseDef.i18n[locale];
  const t = await getTranslations("cases.detail");

  const service = SERVICES.find((s) => s.slug === caseDef.service);
  const Icon = service?.icon;
  const serviceTitle = getSolution(caseDef.service)?.[locale].title ?? "";

  // Next case (by year desc, then slug)
  const sorted = [...CASES].sort((a, b) => b.year - a.year || a.slug.localeCompare(b.slug));
  const idx = sorted.findIndex((c) => c.slug === slug);
  const next = sorted[(idx + 1) % sorted.length];
  const nextContent = next.i18n[locale];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {t("back")}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
              <Sparkles
                className="size-3.5 text-[var(--aurora-cyan)]"
                aria-hidden
              />
              {caseDef.tag}
            </span>
            <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted-foreground">
              {caseDef.year}
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-5xl md:text-6xl">
            <GradientText>{content.title}</GradientText>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground text-balance sm:text-lg">
            {content.summary}
          </p>

          {/* Meta strip */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <MetaItem label={t("client")} value={content.client} />
            <MetaItem
              label={t("service")}
              value={serviceTitle}
              icon={Icon}
              accent={service?.accent}
            />
            <MetaItem label={t("metric")} value={content.metric} accentText />
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />
      </section>

      {/* Visual cover — live product mockup */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-card/40 p-3 backdrop-blur-xl sm:p-6">
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-25 blur-2xl"
                style={{ background: caseDef.accent }}
              />
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#070A1A]">
                <CaseVisual
                  kind={caseDef.visual}
                  accent={caseDef.accent}
                  client={content.client}
                  image={caseDef.image}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Narrative */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid gap-12">
            <NarrativeBlock title={t("challenge")} text={content.challenge} />
            <NarrativeBlock title={t("approach")} text={content.approach} />
            <NarrativeBlock title={t("outcome")} text={content.outcome} />
          </div>
        </div>
      </section>

      {/* Stack */}
      {caseDef.stack.length > 0 && (
        <section className="relative pb-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("stack")}
              </span>
            </Reveal>
            <Reveal stagger className="mt-4 flex flex-wrap gap-2">
              {caseDef.stack.map((tech) => (
                <Reveal
                  key={tech}
                  child
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-foreground/90"
                >
                  {tech}
                </Reveal>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Next case */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Link href={`/cases/${next.slug}` as never} className="block">
            <Reveal>
              <GlowCard padding="lg" className="flex items-center justify-between gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t("next")}
                  </span>
                  <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {nextContent.title}
                  </span>
                </div>
                <ArrowRight
                  className="size-6 text-[var(--aurora-cyan)]"
                  aria-hidden
                />
              </GlowCard>
            </Reveal>
          </Link>
        </div>
      </section>

      <ServiceCta />
    </>
  );
}

function MetaItem({
  label,
  value,
  icon: Icon,
  accent,
  accentText,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accent?: string;
  accentText?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {Icon && (
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-md text-[#0A0E27]"
            style={{ background: accent }}
          >
            <Icon className="size-3.5" strokeWidth={2.4} />
          </span>
        )}
        <span
          className={cn(
            "font-medium",
            accentText && "text-[var(--aurora-cyan)]"
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function NarrativeBlock({ title, text }: { title: string; text: string }) {
  return (
    <Reveal>
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--aurora-cyan)]">
          {title}
        </span>
        <p className="font-display text-2xl leading-snug tracking-tight text-foreground/95 sm:text-3xl">
          {text}
        </p>
      </div>
    </Reveal>
  );
}
