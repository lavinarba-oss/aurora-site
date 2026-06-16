import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { SplineRobot } from "@/components/spline-robot";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Hero — split layout:
 *   left: eyebrow, headline, subtitle, two CTAs
 *   right: 3D Spline robot
 * Aurora background sits behind everything; the robot canvas overlays it.
 */
export async function HeroSection() {
  const t = await getTranslations("home.hero");
  const tCta = await getTranslations("common.cta");

  return (
    <section className="relative overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-8 md:pt-28 md:pb-24 lg:gap-12">
        {/* Copy */}
        <div className="text-center md:text-left">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-base uppercase tracking-[0.14em] text-muted-foreground sm:text-lg">
            <Sparkles
              className="size-3.5 text-[var(--aurora-cyan)]"
              aria-hidden
            />
            {t("eyebrow")}
          </span>

          <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl md:text-[3.75rem] lg:text-7xl xl:text-[5rem]">
            {t("title")}{" "}
            <GradientText>{t("titleAccent")}</GradientText>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground text-balance sm:text-lg md:mx-0">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
            <Link
              href="/contacts"
              className={cn(buttonVariants({ size: "lg" }), "group gap-2 px-6")}
            >
              {tCta("discuss")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/cases"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "px-6"
              )}
            >
              {tCta("cases")}
            </Link>
          </div>
        </div>

        {/* 3D robot — hidden on mobile to save bandwidth */}
        <div className="relative hidden h-[420px] w-full md:block md:h-[520px] lg:h-[600px]">
          <SplineRobot />
        </div>
      </div>

      {/* Soft bottom fade to merge with next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
