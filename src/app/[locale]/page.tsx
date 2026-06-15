import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero-section";
import { ClientsMarquee } from "@/components/sections/clients-marquee";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CasesPreview } from "@/components/sections/cases-preview";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsWall } from "@/components/sections/testimonials-wall";
import { FinalCta } from "@/components/sections/final-cta";
import { asLocale, type Locale } from "@/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ClientsMarquee />
      <TrustBar />
      <ServicesGrid />
      <CasesPreview />
      <ProcessSection />
      <TestimonialsWall />
      <FinalCta />
    </>
  );
}
