"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { CASES } from "@/lib/cases";
import { SERVICES, type ServiceSlug } from "@/lib/services";
import { cn, assetPath } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

/**
 * Orbital view of all cases.
 * Nodes orbit around a central pulsing hub; click a node to expand a card
 * with summary, metric, related cases and a link to the detail page.
 * Adapted from https://21st.dev/r/jatin-yadav05/radial-orbital-timeline
 * under our Aurora design tokens.
 */
export function CasesOrbit() {
  const locale = useLocale() as Locale;
  const t = useTranslations("cases.detail");
  const tHub = useTranslations("cases.hub");

  // Internal sequential ids so the orbit math is dense even if cases.ts changes
  const items = CASES.map((c, i) => ({ ...c, n: i + 1 }));

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // Responsive sizing — the orbit math is pixel-based, so scale the radius and
  // rings to the viewport instead of clipping a fixed 480px circle on phones.
  const [vw, setVw] = useState(1280);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const compact = vw < 640;
  const mid = vw >= 640 && vw < 1024;
  const radius = compact ? 108 : mid ? 188 : 240;
  const ringOuter = radius * 2;
  const ringInner = compact ? 150 : mid ? 252 : 300;
  const containerH = compact ? 500 : mid ? 680 : 760;
  const nodeSize = compact ? 40 : 48;

  // The expanded case card can be taller than the static orbit. Measure it and
  // grow the container so the card is never clipped — and the section below the
  // orbit is pushed down accordingly.
  const cardRef = useRef<HTMLDivElement>(null);
  const [extraH, setExtraH] = useState(0);
  useEffect(() => {
    if (expandedId === null) {
      setExtraH(0);
      return;
    }
    // Measure the card's actual bottom relative to the container top (stable —
    // the card is absolutely anchored to its node, so growing the container
    // downward never moves it). Re-measure after the node-centering animation
    // settles so we account for the final position.
    const measure = () => {
      const card = cardRef.current;
      const cont = containerRef.current;
      if (!card || !cont) return;
      const bottomFromTop =
        card.getBoundingClientRect().bottom - cont.getBoundingClientRect().top;
      setExtraH(Math.max(0, Math.round(bottomFromTop + 32 - containerH)));
    };
    const t1 = setTimeout(measure, 60);
    const t2 = setTimeout(measure, 780);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [expandedId, containerH, vw]);

  // Auto rotation
  useEffect(() => {
    if (!autoRotate) return;
    const tick = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.18) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(tick);
  }, [autoRotate]);

  const closeAll = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedId(null);
      setAutoRotate(true);
    }
  };

  const toggle = (n: number) => {
    if (expandedId === n) {
      setExpandedId(null);
      setAutoRotate(true);
      return;
    }
    setExpandedId(n);
    setAutoRotate(false);
    // Center the clicked node at the top of the orbit
    const idx = items.findIndex((it) => it.n === n);
    const target = (idx / items.length) * 360;
    setRotationAngle(270 - target);
  };

  const calcPos = (index: number, total: number, radius: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      z: Math.round(100 + 50 * Math.cos(rad)),
      opacity: Math.max(0.45, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2))),
    };
  };

  return (
    <div
      ref={containerRef}
      onClick={closeAll}
      style={{ height: containerH + extraH }}
      className="relative w-full overflow-hidden select-none transition-[height] duration-300 ease-out"
    >
      {/* Hub — pinned to the base-height top region so that growing the
          container (to fit an expanded card) adds empty space BELOW the orbit
          instead of pushing the orbit's center (and the card) down. */}
      <div
        ref={orbitRef}
        className="absolute inset-x-0 top-0 flex items-center justify-center"
        style={{ perspective: "1200px", height: containerH }}
      >
        {/* Central pulse */}
        <div className="pointer-events-none absolute z-10 grid size-20 place-items-center">
          <div
            className="absolute size-20 rounded-full opacity-90"
            style={{
              background:
                "conic-gradient(from 0deg, var(--aurora-purple), var(--aurora-cyan), var(--aurora-pink), var(--aurora-purple))",
              filter: "blur(2px)",
            }}
          />
          <div className="absolute size-32 animate-ping rounded-full border border-white/15 opacity-50" />
          <div
            className="absolute size-40 animate-ping rounded-full border border-white/10 opacity-30"
            style={{ animationDelay: "0.6s" }}
          />
          <div className="relative size-9 rounded-full bg-background/80 backdrop-blur-md" />
        </div>

        {/* Orbit ring */}
        <div
          style={{ width: ringOuter, height: ringOuter }}
          className="pointer-events-none absolute rounded-full border border-white/[0.06]"
        />
        <div
          style={{ width: ringOuter, height: ringOuter }}
          className="pointer-events-none absolute rounded-full border border-[var(--aurora-cyan)]/[0.08]"
        />

        {/* Inner orbit ring */}
        <div
          style={{ width: ringInner, height: ringInner }}
          className="pointer-events-none absolute rounded-full border border-white/[0.04]"
        />

        {/* Nodes */}
        {items.map((c, idx) => {
          const pos = calcPos(idx, items.length, radius);
          const isExpanded = expandedId === c.n;
          const service = SERVICES.find((s) => s.slug === c.service);
          const Icon = service?.icon;
          const accent = service?.accent ?? c.accent;
          const content = c.i18n[locale];

          return (
            <div
              key={c.slug}
              className="absolute transition-all duration-700 ease-out"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex: isExpanded ? 300 : pos.z,
                opacity: isExpanded ? 1 : pos.opacity,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggle(c.n);
              }}
            >
              {/* Node halo */}
              <div
                aria-hidden
                className="absolute -inset-2 rounded-full opacity-50 blur-md"
                style={{ background: accent }}
              />

              {/* Node button */}
              <button
                type="button"
                aria-label={content.title}
                className={cn(
                  "relative grid cursor-pointer place-items-center rounded-full border transition-all duration-300",
                  isExpanded
                    ? "scale-125 border-white/40 shadow-[0_0_40px_var(--aurora-purple)]"
                    : "border-white/20 hover:border-white/40 hover:scale-110"
                )}
                style={{
                  width: nodeSize,
                  height: nodeSize,
                  background: isExpanded
                    ? "var(--background)"
                    : "color-mix(in oklab, var(--background) 70%, transparent)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {Icon && (
                  <Icon
                    className="size-5"
                    style={{
                      color: isExpanded
                        ? "var(--aurora-cyan)"
                        : "var(--foreground)",
                    }}
                    strokeWidth={2.2}
                  />
                )}
              </button>

              {/* Label */}
              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-medium uppercase tracking-[0.16em] transition-all duration-300",
                  compact ? "top-11 text-[9px]" : "top-14 text-[11px]",
                  isExpanded
                    ? "text-foreground scale-110"
                    : "text-muted-foreground"
                )}
              >
                {c.name[locale]}
              </span>

              {/* Expanded card */}
              {isExpanded && (
                <div
                  ref={cardRef}
                  className="absolute left-1/2 top-24 z-50 w-[80vw] max-w-xs -translate-x-1/2 overflow-visible rounded-2xl border border-white/[0.1] bg-card/95 p-5 shadow-[0_20px_60px_-12px_rgba(185,103,255,0.35)] backdrop-blur-xl sm:w-80 sm:max-w-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    aria-hidden
                    className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/30"
                  />

                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-full border border-white/[0.1] bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {c.tag}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggle(c.n)}
                      aria-label="Close"
                      className="grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>

                  {c.image && (
                    <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/[0.08] bg-[#070A1A]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={assetPath(c.image)}
                        alt={content.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  )}

                  <h3 className="mt-3 font-display text-base font-semibold leading-tight">
                    {content.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {content.client} · {c.year}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                    {content.summary}
                  </p>

                  {/* Metric pill */}
                  <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      {t("metric")}
                    </span>
                    <p className="mt-0.5 text-sm font-medium text-[var(--aurora-cyan)]">
                      {content.metric}
                    </p>
                  </div>

                  {/* Related cases */}
                  <RelatedRow
                    currentSlug={c.slug}
                    service={c.service}
                    locale={locale}
                    onSelect={(n) => toggle(n)}
                    items={items}
                  />

                  <Link
                    href={`/cases/${c.slug}` as never}
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "mt-4 w-full justify-center gap-2"
                    )}
                  >
                    {tHub("filterAll") === "Все" ? "Открыть кейс" : "Open case"}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom hint — hidden while a case card is open so it never overlaps it */}
      {expandedId === null && (
        <p className="pointer-events-none absolute inset-x-0 -bottom-2 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground/60">
          {locale === "ru"
            ? "Кликните по точке, чтобы открыть кейс"
            : "Click a node to open a case"}
        </p>
      )}
    </div>
  );
}

function RelatedRow({
  currentSlug,
  service,
  locale,
  items,
  onSelect,
}: {
  currentSlug: string;
  service: ServiceSlug;
  locale: Locale;
  items: (typeof CASES[number] & { n: number })[];
  onSelect: (n: number) => void;
}) {
  const related = items
    .filter((c) => c.slug !== currentSlug && c.service === service)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-4 border-t border-white/[0.06] pt-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {locale === "ru" ? "Похожие" : "Related"}
      </span>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {related.map((r) => (
          <button
            key={r.slug}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(r.n);
            }}
            className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-white/[0.16] hover:text-foreground"
          >
            {r.i18n[locale].client}
            <ArrowRight className="size-3" />
          </button>
        ))}
      </div>
    </div>
  );
}
