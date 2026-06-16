import { getLocale, getTranslations } from "next-intl/server";
import { Marquee } from "@/components/marquee";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { TestimonialsSpotlight } from "@/components/sections/testimonials-spotlight";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

/**
 * Two-row infinite marquee of testimonials, running in opposite directions.
 * Pauses on hover, glass cards inherit Aurora glow.
 */
export async function TestimonialsWall() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.testimonials");

  const mid = Math.ceil(TESTIMONIALS.length / 2);
  const row1 = TESTIMONIALS.slice(0, mid);
  const row2 = TESTIMONIALS.slice(mid);

  return (
    <section className="relative py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        </Reveal>

        {/* Featured rotating testimonial */}
        <Reveal className="mt-16">
          <TestimonialsSpotlight locale={locale} />
        </Reveal>
      </div>

      <Reveal className="relative mt-20">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <Marquee duration={64} className="[--marquee-gap:1.25rem]">
          {row1.map((t) => (
            <TestimonialCard key={t.id} item={t} locale={locale} />
          ))}
        </Marquee>

        <Marquee
          duration={72}
          direction="right"
          className="mt-5 [--marquee-gap:1.25rem]"
        >
          {row2.map((t) => (
            <TestimonialCard key={t.id} item={t} locale={locale} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}

function TestimonialCard({
  item,
  locale,
}: {
  item: Testimonial;
  locale: Locale;
}) {
  const content = item[locale];

  return (
    <figure
      className={cn(
        "group relative w-[340px] shrink-0 overflow-hidden rounded-2xl",
        "border border-white/[0.07] bg-card/60 backdrop-blur-xl",
        "p-6 transition-colors duration-300 hover:border-white/[0.16]"
      )}
    >
      {/* Top hairline highlight */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <blockquote className="text-sm leading-relaxed text-foreground/90">
        “{content.quote}”
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full font-display text-sm font-semibold text-[#0A0E27]"
          style={{ background: item.accent }}
        >
          {item.initials}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-medium text-foreground">
            {content.name}
          </span>
          <span className="text-xs text-muted-foreground">{content.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
