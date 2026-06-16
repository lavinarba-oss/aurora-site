import type { Metadata, Viewport } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteWidgets } from "@/components/site-widgets";
import "../globals.css";

// Single display face for BOTH Latin and Cyrillic, so EN and RU words sit at
// the same size next to each other (Bebas was Latin-only and looked larger
// beside Oswald Cyrillic). Oswald is a condensed, poster-style caps face with
// full Cyrillic support.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return {
    metadataBase: new URL("https://aurora.digital"),
    title: {
      default: isRu
        ? "AURORA — Цифровое агентство полного цикла"
        : "AURORA — Full-cycle digital agency",
      template: "%s · AURORA",
    },
    description: isRu
      ? "Сайты, CRM-системы, Telegram-боты, мобильные приложения. Помогаем бизнесу запускать продукты, которые работают."
      : "Websites, CRM systems, Telegram bots, mobile apps. We help businesses ship products that actually work.",
    applicationName: "AURORA",
    openGraph: {
      type: "website",
      siteName: "AURORA",
      locale: isRu ? "ru_RU" : "en_US",
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!routing.locales.includes(rawLocale as Locale)) {
    notFound();
  }
  const locale = rawLocale as Locale;

  // Enables static rendering for the segment
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${oswald.variable} ${inter.variable} ${jetbrains.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
          <SiteWidgets />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
