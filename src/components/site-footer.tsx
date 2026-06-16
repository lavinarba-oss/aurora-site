import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NAV, SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { getSolution } from "@/lib/solutions";
import type { Locale } from "@/i18n/routing";
import { BrandMark } from "./brand-mark";

/**
 * SEO keyword cloud — mid-frequency commercial queries for the niche,
 * derived from the service line-up. Each links to the most relevant service
 * page so the internal linking reinforces those landing pages.
 */
const KEYWORDS: Record<Locale, { label: string; href: string }[]> = {
  ru: [
    { label: "Разработка лендинга под ключ", href: "/services/landing" },
    { label: "Заказать landing page", href: "/services/landing" },
    { label: "Создание корпоративного сайта", href: "/services/multipage" },
    { label: "Разработка сайта под ключ", href: "/services/multipage" },
    { label: "Сайт-каталог для бизнеса", href: "/services/catalog" },
    { label: "Создание интернет-магазина", href: "/services/ecommerce" },
    { label: "Разработка интернет-магазина", href: "/services/ecommerce" },
    { label: "Разработка веб-приложения", href: "/services/webapp" },
    { label: "Веб-сервис на заказ", href: "/services/webapp" },
    { label: "Разработка Telegram-бота", href: "/services/integrations" },
    { label: "Интеграция CRM и 1С", href: "/services/integrations" },
    { label: "Внедрение и настройка CRM", href: "/services/automation" },
    { label: "Автоматизация бизнес-процессов", href: "/services/automation" },
    { label: "UX/UI дизайн сайта", href: "/services/design" },
    { label: "Разработка фирменного стиля", href: "/services/design" },
    { label: "SEO-продвижение сайта", href: "/services/marketing" },
    { label: "Настройка контекстной рекламы", href: "/services/marketing" },
    { label: "Поддержка и сопровождение сайта", href: "/services/support" },
  ],
  en: [
    { label: "Landing page development", href: "/services/landing" },
    { label: "Order a landing page", href: "/services/landing" },
    { label: "Corporate website development", href: "/services/multipage" },
    { label: "Custom website build", href: "/services/multipage" },
    { label: "Product catalogue website", href: "/services/catalog" },
    { label: "Online store development", href: "/services/ecommerce" },
    { label: "E-commerce website build", href: "/services/ecommerce" },
    { label: "Web app development", href: "/services/webapp" },
    { label: "Custom web service", href: "/services/webapp" },
    { label: "Telegram bot development", href: "/services/integrations" },
    { label: "CRM & ERP integration", href: "/services/integrations" },
    { label: "CRM setup & rollout", href: "/services/automation" },
    { label: "Business process automation", href: "/services/automation" },
    { label: "UX/UI website design", href: "/services/design" },
    { label: "Brand identity design", href: "/services/design" },
    { label: "SEO & website promotion", href: "/services/marketing" },
    { label: "Paid ads setup", href: "/services/marketing" },
    { label: "Website support & maintenance", href: "/services/support" },
  ],
};

/** Site-wide footer with brand block, nav, services and legal */
export async function SiteFooter() {
  const tFooter = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tTeam = await getTranslations("contacts.team");
  const locale = (await getLocale()) as Locale;
  const team = tTeam.raw("people") as { name: string; phone?: string }[];
  const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="relative mt-24 border-t border-white/[0.06] bg-background">
      {/* Soft aurora glow above the line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--aurora-purple)]/60 to-transparent"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="AURORA">
            <BrandMark size="lg" />
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {tFooter("tagline")}
          </p>
        </div>

        <FooterColumn title={tFooter("navigation")}>
          {NAV.map((n) => (
            <FooterLink key={n.key} href={n.href}>
              {tNav(n.key)}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title={tFooter("services")}>
          {SERVICES.map((s) => (
            <FooterLink key={s.slug} href={s.href}>
              {getSolution(s.slug)![locale].title}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title={tFooter("contacts")}>
          <FooterExternal href={`mailto:${SITE.email}`}>
            {SITE.email}
          </FooterExternal>
          <FooterExternal href={SITE.telegram}>Telegram</FooterExternal>
          <FooterExternal href={SITE.whatsapp}>WhatsApp</FooterExternal>
          {team
            .filter((p) => p.phone)
            .map((p) => (
              <FooterExternal key={p.name} href={telHref(p.phone!)}>
                {p.name}: {p.phone}
              </FooterExternal>
            ))}
        </FooterColumn>
      </div>

      {/* SEO keyword cloud */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <span className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground/80">
            {locale === "ru" ? "Популярные запросы" : "Popular searches"}
          </span>
          <ul className="mt-4 flex flex-wrap gap-2">
            {KEYWORDS[locale].map((k) => (
              <li key={k.label}>
                <Link
                  href={k.href}
                  className="inline-flex rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-xs uppercase tracking-[0.04em] text-muted-foreground/80 transition-colors hover:border-white/[0.16] hover:text-foreground"
                >
                  {k.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <span>
            {tFooter("rights", { year: new Date().getFullYear() })}
          </span>
          <div className="flex items-center gap-6">
            <Link href="/policy" className="hover:text-foreground">
              {tFooter("policy")}
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              {tFooter("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground/80">
        {title}
      </span>
      <ul className="flex flex-col gap-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="font-display uppercase tracking-[0.05em] text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterExternal({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        className="text-muted-foreground transition-colors hover:text-foreground"
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    </li>
  );
}
