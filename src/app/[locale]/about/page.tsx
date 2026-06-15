import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sparkles, Compass, Rocket, BarChart3, Heart } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { SectionHeader } from "@/components/section-header";
import { GlowCard } from "@/components/glow-card";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { ServiceCta } from "@/components/sections/service-cta";
import { asLocale, type Locale } from "@/i18n/routing";

const VALUE_KEYS = ["v1", "v2", "v3", "v4"] as const;
const VALUE_ICONS = [Rocket, Compass, BarChart3, Heart];

const MEMBER_KEYS = ["m1", "m2", "m3", "m4"] as const;

const MEMBER_GRADIENTS = [
  "linear-gradient(135deg,#B967FF,#01CDFE)",
  "linear-gradient(135deg,#01CDFE,#FF71CE)",
  "linear-gradient(135deg,#FF71CE,#B967FF)",
  "linear-gradient(135deg,#7C3AED,#38BDF8)",
];

const STAT_KEYS = ["projects", "years", "retention", "team"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  const t = await getTranslations({ locale, namespace: "about.hero" });
  return {
    title: t("title") + " " + t("titleAccent"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { ru: "/ru/about", en: "/en/about" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  setRequestLocale(locale);

  const tHero = await getTranslations("about.hero");
  const tValues = await getTranslations("about.values");
  const tTeam = await getTranslations("about.team");
  const tStats = await getTranslations("about.stats");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-20 text-center sm:pt-36 sm:pb-28">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            <Sparkles
              className="size-3.5 text-[var(--aurora-cyan)]"
              aria-hidden
            />
            {tHero("eyebrow")}
          </span>

          <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl md:text-7xl">
            {tHero("title")}{" "}
            <GradientText>{tHero("titleAccent")}</GradientText>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground text-balance sm:text-lg">
            {tHero("subtitle")}
          </p>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />
      </section>

      {/* Stats */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
            <div className="relative grid grid-cols-2 gap-px overflow-hidden bg-white/[0.04] md:grid-cols-4">
              {STAT_KEYS.map((key) => (
                <div
                  key={key}
                  className="flex flex-col gap-1 bg-background/40 px-6 py-7"
                >
                  <span className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {tStats(`items.${key}.value`)}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground sm:text-sm">
                    {tStats(`items.${key}.label`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeader
              eyebrow={tValues("eyebrow")}
              title={tValues("title")}
            />
          </Reveal>

          <Reveal stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {VALUE_KEYS.map((key, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <Reveal key={key} child>
                  <TiltCard intensity={6} className="h-full">
                    <GlowCard className="flex h-full flex-col gap-4">
                      <span
                        aria-hidden
                        className="grid size-11 place-items-center rounded-xl text-[#0A0E27]"
                        style={{
                          background:
                            "linear-gradient(135deg,#B967FF,#01CDFE)",
                        }}
                      >
                        <Icon className="size-5" strokeWidth={2.2} />
                      </span>
                      <h3 className="font-display text-lg font-semibold leading-tight">
                        {tValues(`items.${key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tValues(`items.${key}.desc`)}
                      </p>
                    </GlowCard>
                  </TiltCard>
                </Reveal>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeader
              eyebrow={tTeam("eyebrow")}
              title={tTeam("title")}
            />
          </Reveal>

          <Reveal stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {MEMBER_KEYS.map((key, i) => {
              const grad = MEMBER_GRADIENTS[i];
              const name = tTeam(`members.${key}.name`);
              const initials = name
                .split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("");
              return (
                <Reveal key={key} child>
                  <TiltCard intensity={6} className="h-full">
                    <GlowCard className="flex h-full flex-col gap-4">
                      <span
                        aria-hidden
                        className="grid size-14 place-items-center rounded-2xl font-display text-base font-semibold text-[#0A0E27]"
                        style={{ background: grad }}
                      >
                        {initials}
                      </span>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-display text-lg font-semibold leading-tight">
                          {name}
                        </h3>
                        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {tTeam(`members.${key}.role`)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tTeam(`members.${key}.bio`)}
                      </p>
                    </GlowCard>
                  </TiltCard>
                </Reveal>
              );
            })}
          </Reveal>
        </div>
      </section>

      <ServiceCta />
    </>
  );
}
