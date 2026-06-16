import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { SparklesGlow } from "@/components/sparkles-glow";
import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Reusable bottom CTA for service detail pages */
export async function ServiceCta() {
  const tHub = await getTranslations("services.hub");
  const tCta = await getTranslations("common.cta");

  return (
    <section className="relative py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card/40">
            <AuroraBackground intensity="soft" grain={false} className="rounded-[2rem]" />
            <SparklesGlow color="#01CDFE" density={50} />

            <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center sm:px-12 sm:py-20">
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                {tHub("ctaTitle")}
              </h2>
              <p className="max-w-xl text-base text-muted-foreground text-balance sm:text-lg">
                {tHub("ctaSubtitle")}
              </p>

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
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
