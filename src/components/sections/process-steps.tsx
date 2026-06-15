"use client";

import { useRef } from "react";
import { Compass, Pencil, Code2, Rocket, type LucideIcon } from "lucide-react";
import { AnimatedBeam } from "@/components/animated-beam";
import { Reveal } from "@/components/reveal";

type StepKey = "discovery" | "design" | "build" | "launch";

type StepTexts = Record<StepKey, { title: string; desc: string }>;

const STEPS: { key: StepKey; icon: LucideIcon; accent: string }[] = [
  { key: "discovery", icon: Compass, accent: "var(--aurora-cyan)" },
  { key: "design", icon: Pencil, accent: "var(--aurora-purple)" },
  { key: "build", icon: Code2, accent: "var(--aurora-pink)" },
  { key: "launch", icon: Rocket, accent: "var(--aurora-indigo)" },
];

/**
 * Client-side step grid that renders glowing AnimatedBeams between icons.
 * Receives pre-translated copy from its server parent.
 */
export function ProcessSteps({ texts }: { texts: StepTexts }) {
  const containerRef = useRef<HTMLDivElement>(null);
  // 4 fixed refs — one per step. Hooks must be called at top level, not in .map().
  const ref0 = useRef<HTMLSpanElement>(null);
  const ref1 = useRef<HTMLSpanElement>(null);
  const ref2 = useRef<HTMLSpanElement>(null);
  const ref3 = useRef<HTMLSpanElement>(null);
  const iconRefs = [ref0, ref1, ref2, ref3];

  return (
    <Reveal stagger>
      <div ref={containerRef} className="relative">
        {/* Three beams: between each consecutive pair of icons */}
        {STEPS.slice(0, -1).map((_, i) => (
          <AnimatedBeam
            key={i}
            containerRef={containerRef}
            fromRef={iconRefs[i] as React.RefObject<HTMLElement | null>}
            toRef={iconRefs[i + 1] as React.RefObject<HTMLElement | null>}
            duration={3.5}
            delay={i * 0.6}
            curvature={-26}
            strokeWidth={1.4}
          />
        ))}

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const t = texts[step.key];
            return (
              <Reveal key={step.key} child>
                <div className="flex flex-col items-start">
                  <span
                    ref={iconRefs[i]}
                    aria-hidden
                    className="relative grid size-14 place-items-center rounded-2xl border border-white/[0.08] bg-background/80 backdrop-blur"
                  >
                    <Icon
                      className="size-6"
                      style={{ color: step.accent }}
                      strokeWidth={2}
                    />
                    <span
                      aria-hidden
                      className="absolute -inset-1 -z-10 rounded-2xl opacity-30 blur-xl"
                      style={{ background: step.accent }}
                    />
                  </span>
                  <span className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
