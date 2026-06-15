import { getTranslations } from "next-intl/server";
import { Counter } from "@/components/counter";

const ITEMS = ["projects", "years", "industries", "retention"] as const;

/** Compact numbers row — sits right under hero to anchor trust */
export async function TrustBar() {
  const t = await getTranslations("home.trust.items");
  const tEyebrow = await getTranslations("home.trust");

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
          {/* Subtle inner glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-1/2 h-full bg-[radial-gradient(50%_60%_at_50%_100%,color-mix(in_oklab,var(--aurora-cyan)_18%,transparent)_0%,transparent_70%)]"
          />

          <div className="relative grid grid-cols-2 gap-px overflow-hidden bg-white/[0.04] md:grid-cols-4">
            {ITEMS.map((key) => (
              <div
                key={key}
                className="flex flex-col gap-1 bg-background/40 px-6 py-7 sm:py-8"
              >
                <Counter
                  value={t.raw(`${key}.value`) as number}
                  suffix={t.raw(`${key}.suffix`) as string}
                  className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text font-display text-2xl font-semibold tracking-tight text-transparent sm:text-3xl"
                />
                <span className="text-xs leading-snug text-muted-foreground sm:text-sm">
                  {t(`${key}.label`)}
                </span>
              </div>
            ))}
          </div>

          <span className="sr-only">{tEyebrow("eyebrow")}</span>
        </div>
      </div>
    </section>
  );
}
