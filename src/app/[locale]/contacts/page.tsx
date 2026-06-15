import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sparkles, Mail, Send, MessageCircle, User } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { GlowCard } from "@/components/glow-card";
import { ContactForm } from "@/components/contact-form";
import { SITE } from "@/lib/site";
import { asLocale, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  const t = await getTranslations({ locale, namespace: "contacts.hero" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/contacts`,
      languages: { ru: "/ru/contacts", en: "/en/contacts" },
    },
  };
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  setRequestLocale(locale);

  const tHero = await getTranslations("contacts.hero");
  const tCh = await getTranslations("contacts.channels");
  const tTeam = await getTranslations("contacts.team");
  const team = tTeam.raw("people") as {
    name: string;
    role?: string;
    phone?: string;
  }[];
  const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

  const channels = [
    {
      key: "email" as const,
      icon: Mail,
      href: `mailto:${SITE.email}`,
      accent: "linear-gradient(135deg,#01CDFE,#B967FF)",
    },
    {
      key: "telegram" as const,
      icon: Send,
      href: SITE.telegram,
      accent: "linear-gradient(135deg,#38BDF8,#B967FF)",
    },
    {
      key: "whatsapp" as const,
      icon: MessageCircle,
      href: SITE.whatsapp,
      accent: "linear-gradient(135deg,#FF71CE,#B967FF)",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-16 text-center sm:pt-36 sm:pb-20">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            <Sparkles
              className="size-3.5 text-[var(--aurora-cyan)]"
              aria-hidden
            />
            {tHero("eyebrow")}
          </span>

          <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl md:text-7xl">
            <GradientText>{tHero("title")}</GradientText>
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

      {/* Form + channels grid */}
      <section className="relative pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-4">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {tCh("title")}
            </h2>
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.key}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block h-full"
                >
                  <GlowCard className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="grid size-12 shrink-0 place-items-center rounded-xl text-[#0A0E27]"
                      style={{ background: c.accent }}
                    >
                      <Icon className="size-5" strokeWidth={2.2} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {tCh(`items.${c.key}.title`)}
                      </span>
                      <span className="font-display text-base font-semibold leading-tight">
                        {tCh(`items.${c.key}.value`)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {tCh(`items.${c.key}.desc`)}
                      </span>
                    </div>
                  </GlowCard>
                </a>
              );
            })}

            <h2 className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {tTeam("title")}
            </h2>
            {team.map((p) => (
              <GlowCard key={p.name} className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded-xl text-[#0A0E27]"
                  style={{ background: "linear-gradient(135deg,#01CDFE,#FF71CE)" }}
                >
                  <User className="size-5" strokeWidth={2.2} />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-base font-semibold leading-tight">
                    {p.name}
                  </span>
                  {p.role ? (
                    <span className="text-sm text-muted-foreground">{p.role}</span>
                  ) : null}
                  {p.phone ? (
                    <a
                      href={telHref(p.phone)}
                      className="text-sm font-medium text-foreground/90 transition-colors hover:text-[var(--aurora-cyan)]"
                    >
                      {p.phone}
                    </a>
                  ) : null}
                </div>
              </GlowCard>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
