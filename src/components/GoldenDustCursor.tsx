import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

export default function GoldenDustCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    let mx = -100;
    let my = -100;
    let lastX = -100;
    let lastY = -100;
    let glow = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const dx = mx - lastX;
      const dy = my - lastY;
      const speed = Math.hypot(dx, dy);
      lastX = mx;
      lastY = my;
      glow = Math.min(1, glow + speed / 60);

      const count = Math.min(4, Math.round(speed / 6));
      for (let i = 0; i < count; i++) {
        const maxLife = 550 + Math.random() * 550;
        particles.push({
          x: mx + (Math.random() - 0.5) * 10,
          y: my + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.35 - dx * 0.01,
          vy: (Math.random() - 0.5) * 0.25 + 0.02,
          life: maxLife,
          maxLife,
          size: 0.8 + Math.random() * 1.9,
        });
      }
      if (particles.length > 260) particles.splice(0, particles.length - 260);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    let prev = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(48, now - prev);
      prev = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "lighter";

      glow = Math.max(0, glow - dt / 700);

      // Halo around the cursor
      if (mx > -50) {
        const r = 26 + glow * 16;
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, r);
        halo.addColorStop(0, `rgba(255, 214, 122, ${0.3 + glow * 0.25})`);
        halo.addColorStop(0.45, `rgba(231, 184, 75, ${0.14 + glow * 0.14})`);
        halo.addColorStop(1, "rgba(231, 184, 75, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(mx, my, r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.vy += 0.004 * (dt / 16);

        const t = p.life / p.maxLife;
        const alpha = Math.sin(t * Math.PI) * 0.9;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        g.addColorStop(0, `rgba(255, 233, 176, ${alpha})`);
        g.addColorStop(0.4, `rgba(231, 184, 75, ${alpha * 0.55})`);
        g.addColorStop(1, "rgba(231, 184, 75, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
