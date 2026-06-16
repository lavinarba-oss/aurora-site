import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { CasesOrbit } from "@/components/cases-orbit";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Cases section on the home page — the orbital constellation of all cases */
export async function CasesPreview() {
  const t = await getTranslations("home.cases");

  return (
    <section className="relative py-14 sm:py-24" id="cases">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        {/* Orbital constellation — click a node to open a case */}
        <div className="mt-6">
          <CasesOrbit />
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link
            href="/cases"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "px-6"
            )}
          >
            {t("viewAll")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
