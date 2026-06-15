"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { easeAurora } from "@/lib/motion";
import { TESTIMONIALS } from "@/lib/testimonials";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const ROTATE_MS = 6000;
// Deterministic per-index tilt (no Math.random → stable SSR/CSR)
const TILTS = [-7, 6, -4, 8, -6, 5, -8, 4];

/**
 * Featured, auto-rotating testimonial — a stack of gradient "avatar" cards on
 * the left, the quote and author on the right. Adapted from the 21st.dev
 * AnimatedTestimonials pattern to the Aurora design system, using initials
 * avatars instead of stock photos.
 */
export function TestimonialsSpotlight({ locale }: { locale: Locale }) {
  const items = TESTIMONIALS;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((i) => (i + 1) % items.length),
    [items.length]
  );
  const prev = () => setActive((i) => (i - 1 + items.length) % items.length);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, ROTATE_MS);
    return () => clearTimeout(t);
  }, [active, paused, next]);

  return (
    <div
      className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Avatar stack */}
      <div className="relative mx-auto h-60 w-60 shrink-0 sm:h-64 sm:w-64">
        <AnimatePresence>
          {items.map((item, index) => {
            const isActive = index === active;
            const tilt = TILTS[index % TILTS.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 40, rotate: tilt }}
                animate={{
                  opacity: isActive ? 1 : 0.35,
                  scale: isActive ? 1 : 0.92,
                  y: isActive ? 0 : 16,
                  rotate: isActive ? 0 : tilt,
                  zIndex: isActive
                    ? items.length
                    : items.length - Math.abs(index - active),
                }}
                exit={{ opacity: 0, scale: 0.9, y: -40 }}
                transition={{ duration: 0.55, ease: easeAurora }}
                className="absolute inset-0 origin-bottom"
              >
                <div
                  className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-2xl shadow-black/40"
                  style={{ background: item.accent }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_120%,rgba(5,8,22,0.6),transparent_60%)]" />
                  <Quote
                    className="relative size-9 text-[#0A0E27]/40"
                    strokeWidth={2.2}
                  />
                  <span className="relative font-display text-5xl font-bold text-[#0A0E27]/85">
                    {item.initials}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Quote + author */}
      <div className="flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: easeAurora }}
          >
            <p className="font-display text-xl leading-snug tracking-tight text-foreground/95 text-balance sm:text-2xl">
              “{items[active][locale].quote}”
            </p>
            <div className="mt-6">
              <p className="text-base font-semibold">
                {items[active][locale].name}
              </p>
              <p className="text-sm text-muted-foreground">
                {items[active][locale].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="group grid size-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] transition-colors hover:border-white/[0.2] hover:bg-white/[0.06]"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="group grid size-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] transition-colors hover:border-white/[0.2] hover:bg-white/[0.06]"
          >
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          <div className="ml-2 flex items-center gap-1.5">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active ? "w-5 bg-[var(--aurora-cyan)]" : "w-1.5 bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
