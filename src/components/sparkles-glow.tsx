"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SparklesGlowProps = {
  className?: string;
  /** Sparkle base color */
  color?: string;
  /** Maximum particles on screen */
  density?: number;
  /** Min/max radius */
  minSize?: number;
  maxSize?: number;
};

/**
 * Canvas of slowly-floating glowing dots.
 * Sits absolutely positioned behind hero / CTA content.
 * Respects prefers-reduced-motion.
 */
export function SparklesGlow({
  className,
  color = "#B967FF",
  density = 60,
  minSize = 0.4,
  maxSize = 1.6,
}: SparklesGlowProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    type P = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      pulseSpeed: number;
    };

    const particles: P[] = Array.from({ length: density }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: minSize + Math.random() * (maxSize - minSize),
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      a: Math.random() * Math.PI * 2,
      pulseSpeed: 0.6 + Math.random() * 1.2,
    }));

    let raf = 0;
    let last = performance.now();

    const loop = (t: number) => {
      const dt = Math.min(48, t - last) / 1000;
      last = t;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          p.a += dt * p.pulseSpeed;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        const alpha = 0.35 + Math.sin(p.a) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, density, minSize, maxSize]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    />
  );
}
