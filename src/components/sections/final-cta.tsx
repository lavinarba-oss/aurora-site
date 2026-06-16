import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { SparklesGlow } from "@/components/sparkles-glow";
import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Full-bleed final CTA: aurora, sparkles, magnetic CTA buttons */
export async function FinalCta() {
  const t = await getTranslations("home.cta");
  const tCta = await getTranslations("common.cta");

  return (
    <section className="relative py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card/40">
            <AuroraBackground
              intensity="soft"
              grain={false}
              className="rounded-[2rem]"
            />
            <SparklesGlow color="#B967FF" density={70} />

            <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center sm:px-12 sm:py-24">
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
                {t("title")}
              </h2>
              <p className="max-w-xl text-base text-muted-foreground text-balance sm:text-lg">
                {t("subtitle")}
              </p>

              <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
                <MagneticButton strength={0.32}>
                  <Link
                    href="/contacts"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "group gap-2 px-6"
                    )}
                  >
                    {tCta("discuss")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.28}>
                  <Link
                    href="/services"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "px-6"
                    )}
                  >
                    {tCta("learnMore")}
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
