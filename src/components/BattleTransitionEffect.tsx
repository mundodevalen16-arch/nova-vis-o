import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  side: "left" | "right" | "center";
  color: string;
}

const BattleTransitionEffect = () => {
  const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const shakeRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const MAX_PARTICLES = isMobile ? 60 : 250;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;
      const scrolled = -rect.top;
      progressRef.current = Math.max(0, Math.min(1, scrolled / sectionHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const spawnParticle = (side: "left" | "right" | "center", p: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      if (side === "left") {
        return {
          x: Math.random() * w * 0.15,
          y: cy + (Math.random() - 0.5) * h * 0.6,
          vx: 2 + Math.random() * 4 * p,
          vy: (Math.random() - 0.5) * 2,
          size: 2 + Math.random() * 4,
          life: 1,
          maxLife: 30 + Math.random() * 40,
          side,
          color: `hsl(${340 + Math.random() * 30}, 100%, ${55 + Math.random() * 25}%)`,
        };
      } else if (side === "right") {
        return {
          x: w - Math.random() * w * 0.15,
          y: cy + (Math.random() - 0.5) * h * 0.6,
          vx: -(2 + Math.random() * 4 * p),
          vy: (Math.random() - 0.5) * 2,
          size: 2 + Math.random() * 4,
          life: 1,
          maxLife: 30 + Math.random() * 40,
          side,
          color: `hsl(${200 + Math.random() * 40}, 100%, ${55 + Math.random() * 25}%)`,
        };
      } else {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6 * p;
        return {
          x: cx + (Math.random() - 0.5) * 20,
          y: cy + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 5,
          life: 1,
          maxLife: 20 + Math.random() * 30,
          side,
          color: `hsl(${280 + Math.random() * 40}, 100%, ${60 + Math.random() * 30}%)`,
        };
      }
    };

    const drawBeam = (
      ctx: CanvasRenderingContext2D,
      fromX: number, fromY: number,
      toX: number, toY: number,
      color: string, width: number, time: number
    ) => {
      const segments = 12;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const x = fromX + (toX - fromX) * t;
        const y = fromY + (toY - fromY) * t + Math.sin(time * 8 + i * 1.5) * (15 + Math.random() * 10);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.shadowColor = color;
      ctx.shadowBlur = width * 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const draw = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const p = progressRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      if (p < 0.01) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.globalCompositeOperation = "lighter";

      // Shake at collision phases
      if (p > 0.5) {
        const intensity = Math.min((p - 0.5) * 20, 10);
        shakeRef.current.x = (Math.random() - 0.5) * intensity;
        shakeRef.current.y = (Math.random() - 0.5) * intensity;
      } else {
        shakeRef.current.x = 0;
        shakeRef.current.y = 0;
      }
      ctx.save();
      ctx.translate(shakeRef.current.x, shakeRef.current.y);

      // Phase: beams from sides
      if (p > 0.05) {
        const beamProgress = Math.min((p - 0.05) / 0.45, 1);
        const beamReach = cx * beamProgress;

        // Left red beams
        const leftBeams = 3 + Math.floor(p * 4);
        for (let i = 0; i < leftBeams; i++) {
          const yOff = (i - leftBeams / 2) * 30;
          const alpha = 0.5 + beamProgress * 0.5;
          drawBeam(ctx, 0, cy + yOff, beamReach, cy + yOff * 0.3,
            `hsla(350, 100%, 60%, ${alpha})`, 3 + beamProgress * 5, t + i);
        }

        // Right blue beams
        for (let i = 0; i < leftBeams; i++) {
          const yOff = (i - leftBeams / 2) * 30;
          const alpha = 0.5 + beamProgress * 0.5;
          drawBeam(ctx, w, cy + yOff, w - beamReach, cy + yOff * 0.3,
            `hsla(220, 100%, 65%, ${alpha})`, 3 + beamProgress * 5, t + i + 5);
        }

        // Side glow orbs
        const leftGlow = ctx.createRadialGradient(beamReach * 0.3, cy, 0, beamReach * 0.3, cy, 150 + beamProgress * 200);
        leftGlow.addColorStop(0, `hsla(350, 100%, 55%, ${0.3 * beamProgress})`);
        leftGlow.addColorStop(1, "transparent");
        ctx.fillStyle = leftGlow;
        ctx.fillRect(0, 0, w, h);

        const rightGlow = ctx.createRadialGradient(w - beamReach * 0.3, cy, 0, w - beamReach * 0.3, cy, 150 + beamProgress * 200);
        rightGlow.addColorStop(0, `hsla(220, 100%, 60%, ${0.3 * beamProgress})`);
        rightGlow.addColorStop(1, "transparent");
        ctx.fillStyle = rightGlow;
        ctx.fillRect(0, 0, w, h);
      }

      // Phase: collision glow
      if (p > 0.4) {
        const collisionP = Math.min((p - 0.4) / 0.3, 1);

        // Center clash glow
        const clashRadius = 80 + collisionP * 300;
        const clashGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, clashRadius);
        clashGlow.addColorStop(0, `hsla(290, 100%, 80%, ${0.7 * collisionP})`);
        clashGlow.addColorStop(0.3, `hsla(320, 100%, 60%, ${0.4 * collisionP})`);
        clashGlow.addColorStop(1, "transparent");
        ctx.fillStyle = clashGlow;
        ctx.fillRect(0, 0, w, h);
      }

      // Phase: explosion
      if (p > 0.6) {
        const explosionP = Math.min((p - 0.6) / 0.3, 1);

        // Shockwave ring
        const ringRadius = explosionP * Math.max(w, h) * 0.6;
        const ringWidth = 3 + explosionP * 8;
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(280, 100%, 85%, ${0.8 * (1 - explosionP)})`;
        ctx.lineWidth = ringWidth;
        ctx.shadowColor = "hsl(280, 100%, 85%)";
        ctx.shadowBlur = 50;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Second shockwave
        if (explosionP > 0.2) {
          const ring2 = (explosionP - 0.2) * 1.2 * Math.max(w, h) * 0.5;
          ctx.beginPath();
          ctx.arc(cx, cy, ring2, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(330, 100%, 70%, ${0.4 * (1 - explosionP)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // White flash
        if (explosionP < 0.3) {
          const flashAlpha = (1 - explosionP / 0.3) * 0.8;
          ctx.fillStyle = `hsla(0, 0%, 100%, ${flashAlpha})`;
          ctx.fillRect(0, 0, w, h);
        }

        // Explosion core glow
        const coreRadius = 50 + explosionP * 250;
        const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
        coreGlow.addColorStop(0, `hsla(320, 100%, 90%, ${0.8 * (1 - explosionP * 0.6)})`);
        coreGlow.addColorStop(0.4, `hsla(280, 100%, 60%, ${0.5 * (1 - explosionP)})`);
        coreGlow.addColorStop(1, "transparent");
        ctx.fillStyle = coreGlow;
        ctx.fillRect(0, 0, w, h);
      }

      // Phase: dissipation
      if (p > 0.85) {
        const dissipateP = (p - 0.85) / 0.15;
        ctx.globalAlpha = 1 - dissipateP;
      }

      // Spawn particles
      if (p > 0.05 && particlesRef.current.length < MAX_PARTICLES) {
        const spawnRate = p < 0.5 ? 2 : p < 0.7 ? 4 : 2;
        for (let i = 0; i < spawnRate; i++) {
          if (p < 0.5) {
            particlesRef.current.push(spawnParticle(Math.random() > 0.5 ? "left" : "right", p));
          } else if (p < 0.8) {
            particlesRef.current.push(spawnParticle("center", p));
          }
        }
      }

      // Draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 1 / pt.maxLife;
        pt.vx *= 0.98;
        pt.vy *= 0.98;

        if (pt.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        const alpha = pt.life * 0.8;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.color.replace(")", `, ${alpha})`).replace("hsl(", "hsla(");
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = pt.size * 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="battle-transition"
      className="relative"
      style={{ height: isMobileDevice ? "120vh" : "150vh" }}
    >
      <canvas
        ref={canvasRef}
        className="sticky top-0 left-0 w-full pointer-events-none"
        style={{ height: "100vh", zIndex: 5 }}
      />
    </section>
  );
};

export default BattleTransitionEffect;
