import { useEffect, useRef } from "react";

const COLORS = ["#42D1C3", "#103942", "#F5F5F7", "#FFFFFF"];

/**
 * Lightweight one-shot confetti burst. Canvas is pointer-events:none so it
 * never blocks the Continue button. Respects prefers-reduced-motion.
 */
export function Confetti({ duration = 1800 }: { duration?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const pieces = Array.from({ length: 70 }, () => ({
      x: rect.width / 2 + (Math.random() - 0.5) * rect.width * 0.5,
      y: rect.height * 0.28 + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 5,
      vy: -Math.random() * 6 - 2,
      w: 4 + Math.random() * 5,
      h: 6 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const start = performance.now();
    let raf = 0;

    const tick = (t: number) => {
      const elapsed = t - start;
      const fade = Math.max(0, 1 - elapsed / duration);
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.globalAlpha = fade;
      for (const p of pieces) {
        p.vy += 0.18;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (elapsed < duration) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, rect.width, rect.height);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
