import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Sparkles, Building2, Scale, Gavel, Layers } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { Reveal } from "@/components/reveal";
import { GlowCard } from "@/components/glow-card";
import { TiltCard } from "@/components/tilt-card";
import { ServiceCta } from "@/components/sections/service-cta";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { SERVICES } from "@/lib/services";
import { getSolution, formatPrice, PROCESS_STEPS } from "@/lib/solutions";
import { cn } from "@/lib/utils";
import { asLocale, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  const t = await getTranslations({ locale, namespace: "services.hub" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/services`,
      languages: { ru: "/ru/services", en: "/en/services" },
    },
    openGraph: { title: t("title"), description: t("subtitle") },
  };
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeStr } = await params;
  const locale: Locale = asLocale(localeStr);
  setRequestLocale(locale);

  const t = await getTranslations("services.hub");
  const tCta = await getTranslations("common.cta");
  const L = (ru: string, en: string) => (locale === "ru" ? ru : en);

  const trust = [
    { icon: Building2, label: L("Работаем с юр. лицами", "We work with legal entities") },
    { icon: Layers, label: L("Все ниши и отрасли", "Every niche & industry") },
    { icon: Gavel, label: L("Свой тендерный отдел", "In-house tender department") },
    { icon: Scale, label: L("Свой юридический отдел", "In-house legal department") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-12 text-center sm:pt-36 sm:pb-16">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            <Sparkles className="size-3.5 text-[var(--aurora-cyan)]" aria-hidden />
            {t("eyebrow")}
          </span>
          <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl md:text-7xl">
            <GradientText>{t("title")}</GradientText>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground text-balance sm:text-lg">
            {L(
              "Делаем интернет-магазины, каталоги, лендинги, многостраничные сайты, веб-приложения, интеграции и автоматизации. Цена — от 30 000 до 500 000 ₽ в зависимости от сложности проекта.",
              "We build online stores, catalogues, landing pages, multi-page sites, web apps, integrations and automations. From $350 to $6,000 depending on project complexity."
            )}
          </p>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {trust.map((b) => {
              const Icon = b.icon;
              return (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-foreground/85"
                >
                  <Icon className="size-3.5 text-[var(--aurora-cyan)]" />
                  {b.label}
                </span>
              );
            })}
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />
      </section>

      {/* Service cards */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal stagger className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              const sol = getSolution(s.slug)!;
              const c = sol[locale];
              return (
                <Reveal key={s.slug} child>
                  <Link href={s.href} className="group block h-full">
                    <TiltCard intensity={5} className="h-full">
                      <GlowCard
                        glowColor="rgba(185, 103, 255, 0.40)"
                        className="flex h-full flex-col gap-5"
                        padding="lg"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span
                            aria-hidden
                            className="grid size-14 place-items-center rounded-xl text-[#0A0E27]"
                            style={{ background: s.accent }}
                          >
                            <Icon className="size-6" strokeWidth={2.2} />
                          </span>
                          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-foreground/80">
                            {formatPrice(sol, locale)}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <h2 className="font-display text-2xl font-semibold leading-tight">
                            {c.title}
                          </h2>
                          <p className="text-base text-muted-foreground">
                            {c.short}
                          </p>
                        </div>

                        <div className="mt-auto flex items-center gap-2 text-sm font-medium text-[var(--aurora-cyan)]">
                          {tCta("learnMore")}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
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

      {/* PRD-based process */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--aurora-cyan)]">
              {L("Как мы работаем", "How we work")}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
              {L(
                "Сначала PRD и цена за каждый этап — потом разработка",
                "First a PRD and a price per stage — then development"
              )}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {L(
                "PRD (Product Requirements Document) — это документ требований к продукту: цели, функции, экраны и критерии готовности. Мы составляем его совместно с заказчиком, разбиваем проект на этапы и заранее озвучиваем стоимость каждого шага. Вы видите всю смету до старта разработки — никаких сюрпризов по ходу.",
                "A PRD (Product Requirements Document) captures goals, features, screens and acceptance criteria. We write it together with the client, split the project into stages and quote each step upfront. You see the full estimate before development starts — no surprises along the way."
              )}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-3">
            {PROCESS_STEPS.map((step) => {
              const sc = step[locale];
              return (
                <Reveal key={step.n}>
                  <div className="flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
                    <span className="bg-gradient-to-br from-[var(--aurora-purple)] to-[var(--aurora-cyan)] bg-clip-text font-display text-2xl font-bold text-transparent">
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

          <Reveal className="mt-10 flex justify-center">
            <Link
              href="/faq"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "px-6")}
            >
              {L("Цены и частые вопросы", "Pricing & FAQ")}
            </Link>
          </Reveal>
        </div>
      </section>

      <ServiceCta />
    </>
  );
}
