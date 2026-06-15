"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AuroraBackground } from "@/components/aurora-background";
import { easeAurora } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Spline can only run client-side (touches window). Lazy & no SSR.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <RobotFallback />,
});

const SCENE_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/**
 * Color grade applied to the 3D scene. The robot mesh lives on Spline's servers
 * and can't be re-textured from code, so we shift its hue toward the Aurora
 * palette with a CSS filter. Tweak the degrees to taste.
 */
// Force a violet cast: sepia normalises the hue, hue-rotate lands it on the
// Aurora purple (#B967FF ≈ 277°), saturate makes it pop. Tune hue-rotate to shift.
const ROBOT_FILTER =
  "sepia(0.75) saturate(2.6) hue-rotate(225deg) brightness(1.02) contrast(1.03)";

const ROTATE_MS = 4600;

type SplineRobotProps = {
  className?: string;
  /** Optional override of the scene URL */
  scene?: string;
  /** Short agency lines the robot "says" in the speech bubble */
  messages?: string[];
  /** Tiny hint chip, e.g. "нажми на меня" */
  hint?: string;
};

/**
 * Animated 3D robot as the Hero focal point.
 * The scene follows the cursor (Spline's own interactivity); on top of it we
 * render an interactive speech bubble that cycles short facts about the agency
 * — auto-advances, pauses on hover, and steps forward on click.
 */
export function SplineRobot({
  className,
  scene = SCENE_URL,
  messages = [],
  hint,
}: SplineRobotProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [ready, setReady] = useState(false);

  const hasBubble = messages.length > 0;

  const advance = useCallback(() => {
    setInteracted(true);
    setIndex((i) => (i + 1) % messages.length);
  }, [messages.length]);

  // Reveal the bubble shortly after mount so it appears once the robot is in
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Auto-rotate the messages
  useEffect(() => {
    if (!hasBubble || paused || !ready) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % messages.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [index, paused, ready, hasBubble, messages.length]);

  return (
    <div
      className={cn("relative h-full w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Aurora glow that reinforces the recolored robot */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-10 bottom-10 -z-[1] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 45%, rgba(185,103,255,0.45), rgba(1,205,254,0.18) 60%, transparent 75%)",
        }}
      />

      {/* Recolored 3D scene */}
      <div className="h-full w-full" style={{ filter: ROBOT_FILTER }}>
        <Suspense fallback={<RobotFallback />}>
          <Spline
            scene={scene}
            style={{ width: "100%", height: "100%" }}
            onLoad={() => setReady(true)}
          />
        </Suspense>
      </div>

      {/* Mask Spline's watermark badge with a soft corner fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-24 w-56"
        style={{
          background:
            "radial-gradient(120% 120% at 100% 100%, var(--background) 38%, transparent 72%)",
        }}
      />

      {/* Speech bubble */}
      {hasBubble && (
        <div className="pointer-events-none absolute inset-x-0 top-2 z-20 flex justify-center px-4 sm:top-6">
          <AnimatePresence mode="wait">
            {ready && (
              <motion.button
                key={index}
                type="button"
                onClick={advance}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.45, ease: easeAurora }}
                className="pointer-events-auto group relative max-w-[19rem] cursor-pointer text-left"
                aria-label={hint ?? "next"}
              >
                <span className="glass block rounded-2xl rounded-bl-sm px-4 py-3 text-sm font-medium leading-snug text-foreground shadow-[0_12px_40px_-12px_rgba(185,103,255,0.5)]">
                  {messages[index]}
                </span>
                {/* tail */}
                <span
                  aria-hidden
                  className="glass absolute -bottom-1 left-5 size-3 rotate-45 rounded-[3px] border-t-0 border-l-0"
                />
                {/* progress dots */}
                <span className="mt-2 flex items-center gap-1.5 pl-1">
                  {messages.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        i === index
                          ? "w-4 bg-[var(--aurora-cyan)]"
                          : "w-1 bg-white/25"
                      )}
                    />
                  ))}
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* "tap me" hint — fades out after first interaction */}
      {hasBubble && hint && (
        <AnimatePresence>
          {ready && !interacted && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/[0.06] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur"
            >
              <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-[var(--aurora-cyan)] align-middle" />
              {hint}
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function RobotFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl">
      <AuroraBackground intensity="soft" grain={false} />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="size-1.5 animate-pulse rounded-full bg-[var(--aurora-cyan)]" />
          loading 3d
        </div>
      </div>
    </div>
  );
}
