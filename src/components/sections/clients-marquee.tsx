import { getTranslations } from "next-intl/server";
import { Marquee } from "@/components/marquee";
import { cn } from "@/lib/utils";

/**
 * Placeholder clients strip — text "logos" until we have real assets.
 * Two rows running in opposite directions, with edge fade masks.
 */
const CLIENT_LOGOS = [
  "VETRA",
  "FleetMind",
  "Neva Beauty",
  "Kondor",
  "Lumen Lab",
  "Northstack",
  "Pulse Auto",
  "Volta Foods",
  "Sirius Cloud",
  "Echo Retail",
  "Helix Bio",
  "Orbit Travel",
];

export async function ClientsMarquee() {
  const t = await getTranslations("home.clients");

  return (
    <section className="relative py-12" aria-label={t("eyebrow")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          {t("eyebrow")}
        </p>

        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

          <Marquee
            duration={60}
            className="[--marquee-gap:2.5rem]"
          >
            {CLIENT_LOGOS.map((name, i) => (
              <Logo key={`a-${i}`} name={name} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function Logo({ name }: { name: string }) {
  return (
    <span
      className={cn(
        "shrink-0 select-none font-display text-xl font-semibold tracking-tight",
        "text-muted-foreground/70 transition-colors hover:text-foreground sm:text-2xl"
      )}
    >
      {name}
    </span>
  );
}
