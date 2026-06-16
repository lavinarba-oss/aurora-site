import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { ProcessSteps } from "./process-steps";

/** 4-step process with animated beams between icons */
export async function ProcessSection() {
  const t = await getTranslations("home.process");
  const tSteps = await getTranslations("home.process.steps");

  const texts = {
    discovery: {
      title: tSteps("discovery.title"),
      desc: tSteps("discovery.desc"),
    },
    design: { title: tSteps("design.title"), desc: tSteps("design.desc") },
    build: { title: tSteps("build.title"), desc: tSteps("build.desc") },
    launch: { title: tSteps("launch.title"), desc: tSteps("launch.desc") },
  };

  return (
    <section className="relative py-14 sm:py-24" id="process">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        </Reveal>

        <div className="relative mt-16">
          <ProcessSteps texts={texts} />
        </div>
      </div>
    </section>
  );
}
