import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sparkles } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { Reveal } from "@/components/reveal";
import { CostCalculator } from "@/components/cost-calculator";
import { ServiceCta } from "@/components/sections/service-cta";
import { asLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  const t = await getTranslations({ locale, namespace: "calculator" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/calculator`,
      languages: { ru: "/ru/calculator", en: "/en/calculator" },
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  setRequestLocale(locale);
  const t = await getTranslations("calculator");

  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-12 text-center sm:pt-36 sm:pb-16">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            <Sparkles className="size-3.5 text-[var(--aurora-cyan)]" aria-hidden />
            {t("eyebrow")}
          </span>
          <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl">
            <GradientText>{t("title")}</GradientText>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground text-balance sm:text-lg">
            {t("subtitle")}
          </p>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />
      </section>

      <section className="relative pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <CostCalculator />
          </Reveal>
        </div>
      </section>

      <ServiceCta />
    </>
  );
}
