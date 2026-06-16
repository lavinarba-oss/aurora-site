import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sparkles } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { CasesOrbit } from "@/components/cases-orbit";
import { CasesGrid } from "@/components/cases-grid";
import { ServiceCta } from "@/components/sections/service-cta";
import { asLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  const t = await getTranslations({ locale, namespace: "cases.hub" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/cases`,
      languages: { ru: "/ru/cases", en: "/en/cases" },
    },
  };
}

export default async function CasesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  setRequestLocale(locale);
  const t = await getTranslations("cases.hub");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-20 pb-6 text-center sm:pt-28 sm:pb-10">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-base uppercase tracking-[0.14em] text-muted-foreground sm:text-lg">
            <Sparkles
              className="size-4 text-[var(--aurora-cyan)]"
              aria-hidden
            />
            {t("eyebrow")}
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl md:text-7xl">
            <GradientText>{t("title")}</GradientText>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground text-balance sm:text-lg">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Orbital constellation — click a node to expand a case card */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <CasesOrbit />
        </div>
      </section>

      {/* Full list below the orbit */}
      <section className="relative pt-4 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-center gap-3">
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {locale === "ru" ? "Весь список" : "Full list"}
            </span>
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-transparent"
            />
          </div>
          <CasesGrid />
        </div>
      </section>

      <ServiceCta />
    </>
  );
}
