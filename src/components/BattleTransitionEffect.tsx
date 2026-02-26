import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  saturation: number;
  lightness: number;
  size: number;
  kind: "beam" | "explosion" | "spark" | "ember";
}

const BattleTransitionEffect = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const totalScroll = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      progressRef.current = progress;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let time = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", resize);
    resize();

    const createParticle = (
      x: number,
      y: number,
      kind: Particle["kind"],
      hue: number,
      saturation: number,
      lightness: number,
      direction = 1,
    ): Particle => {
      if (kind === "beam") {
        return {
          x,
          y,
          vx: direction * (Math.random() * 10 + 6),
          vy: (Math.random() - 0.5) * 6,
          life: 30 + Math.random() * 24,
          maxLife: 30 + Math.random() * 24,
          hue,
          saturation,
          lightness,
          size: Math.random() * 3 + 1.2,
          kind,
        };
      }

      if (kind === "spark") {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 3;
        return {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 20 + Math.random() * 18,
          maxLife: 20 + Math.random() * 18,
          hue,
          saturation,
          lightness,
          size: Math.random() * 2 + 0.8,
          kind,
        };
      }

      if (kind === "ember") {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 0.5;
        return {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 1.5,
          life: 60 + Math.random() * 80,
          maxLife: 60 + Math.random() * 80,
          hue,
          saturation,
          lightness,
          size: Math.random() * 2.5 + 0.6,
          kind,
        };
      }

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 18 + 6;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 26 + Math.random() * 28,
        maxLife: 26 + Math.random() * 28,
        hue,
        saturation,
        lightness,
        size: Math.random() * 4 + 1.5,
        kind,
      };
    };

    const drawBeam = (
      startX: number,
      endX: number,
      y: number,
      hue: number,
      coreHue: number,
      intensity: number,
      localTime: number,
    ) => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const distance = Math.abs(endX - startX);
      if (distance < 1) return;

      const segments = Math.max(4, Math.floor(distance / (isMobile ? 24 : 16)));
      const dx = (endX - startX) / segments;

      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.moveTo(startX, y);

        for (let i = 1; i <= segments; i++) {
          const x = startX + dx * i;
          const noiseFactor = i / segments;
          const noise =
            Math.sin(localTime * 0.03 + i * 0.4 + layer * 0.8) *
            (isMobile ? 22 : 36) *
            intensity *
            noiseFactor;
          ctx.lineTo(x, y + noise);
        }

        const isCore = layer === 2;
        const beamHue = isCore ? coreHue : hue;
        const beamLightness = isCore ? 86 : 58;

        ctx.strokeStyle = `hsla(${beamHue}, 100%, ${beamLightness}%, ${isCore ? 0.95 : 0.7})`;
        ctx.lineWidth = isCore
          ? (isMobile ? 3 : 5) + intensity * (isMobile ? 3 : 6)
          : (isMobile ? 7 : 12) + intensity * (isMobile ? 8 : 14) - layer * 2;
        ctx.shadowColor = `hsl(${hue}, 100%, 62%)`;
        ctx.shadowBlur = isCore ? 0 : (isMobile ? 18 : 32);
        ctx.stroke();
      }

      if (Math.random() > 0.45) {
        ctx.beginPath();
        let lx = startX;
        let ly = y;
        ctx.moveTo(lx, ly);

        for (let i = 1; i <= segments; i++) {
          lx += dx;
          ly = y + (Math.random() - 0.5) * (isMobile ? 44 : 72) * intensity;
          ctx.lineTo(lx, ly);
        }

        ctx.strokeStyle = `hsla(${coreHue}, 100%, 88%, 0.95)`;
        ctx.lineWidth = isMobile ? 1.6 : 2.4;
        ctx.shadowBlur = isMobile ? 8 : 14;
        ctx.shadowColor = `hsl(${coreHue}, 100%, 80%)`;
        ctx.stroke();
      }
    };

    const render = () => {
      time += 0.55;
      const progress = progressRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const isMobile = width < 768;
      const particleCap = isMobile ? 70 : 180;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "hsla(242, 40%, 4%, 0.24)";
      ctx.fillRect(0, 0, width, height);

      if (progress <= 0) {
        if (particles.length) particles = [];
        animationFrame = requestAnimationFrame(render);
        return;
      }

      ctx.globalCompositeOperation = "lighter";

      let redX = 0;
      let blueX = width;
      let beamIntensity = 0;
      let collisionIntensity = 0;
      let explosionRadius = 0;
      let flashOpacity = 0;
      let introFlash = 0;

      // --- Intro flash (lightning effect at start) ---
      if (progress < 0.08) {
        const ip = progress / 0.08;
        introFlash = Math.sin(ip * Math.PI) * 0.5;
      }

      if (progress < 0.22) {
        const p = progress / 0.22;
        redX = width * 0.05 + width * 0.12 * p;
        blueX = width * 0.95 - width * 0.12 * p;
        beamIntensity = 0.3 + p * 0.25;
      } else if (progress < 0.72) {
        const p = (progress - 0.22) / 0.5;
        redX = width * 0.17 + (centerX - width * 0.17) * p;
        blueX = width * 0.83 - (width * 0.83 - centerX) * p;
        beamIntensity = 0.55 + p * 0.68;
      } else if (progress < 0.9) {
        const p = (progress - 0.72) / 0.18;
        redX = centerX;
        blueX = centerX;
        beamIntensity = 1.23 + p * 0.54;
        collisionIntensity = p;
        explosionRadius = p * (isMobile ? 160 : 250);
        flashOpacity = Math.max(flashOpacity, Math.sin(p * Math.PI) * 0.75);
      } else if (progress < 0.99) {
        const p = (progress - 0.9) / 0.09;
        redX = centerX;
        blueX = centerX;
        beamIntensity = 1.77 * (1 - p);
        collisionIntensity = 1 - p * 0.8;
        explosionRadius = (isMobile ? 160 : 250) + p * Math.max(width, height) * 0.66;

        if (progress < 0.95) {
          const fp = (progress - 0.9) / 0.05;
          flashOpacity = Math.max(flashOpacity, Math.sin(fp * Math.PI) * 0.96);
        } else {
          const fp = Math.min((progress - 0.95) / 0.04, 1);
          flashOpacity = Math.max(flashOpacity, (1 - fp) * 0.34);
        }
      } else {
        // Buffer zone — spawn trailing embers that fade out
        beamIntensity = 0;
        collisionIntensity = 0;
        const fadeOut = Math.max(0, 1 - (progress - 0.99) / 0.01);
        if (particles.length < (isMobile ? 25 : 50) && Math.random() > 0.7 && fadeOut > 0.15) {
          const rx = centerX + (Math.random() - 0.5) * width * 0.6;
          const ry = centerY + (Math.random() - 0.5) * height * 0.4;
          particles.push(
            createParticle(rx, ry, "ember", 286, 80, 60),
            createParticle(rx, ry, "ember", 344, 90, 55),
          );
        }
      }

      let shakeX = 0;
      let shakeY = 0;
      if (progress > 0.4 && progress < 0.985) {
        const shakeStrength = collisionIntensity * (isMobile ? 7 : 12);
        shakeX = (Math.random() - 0.5) * shakeStrength;
        shakeY = (Math.random() - 0.5) * shakeStrength;
      }

      ctx.save();
      ctx.translate(shakeX, shakeY);

      const leftGlow = ctx.createRadialGradient(redX * 0.6, centerY, 0, redX * 0.6, centerY, isMobile ? 160 : 240);
      leftGlow.addColorStop(0, "hsla(344, 100%, 56%, 0.30)");
      leftGlow.addColorStop(1, "hsla(344, 100%, 56%, 0)");
      ctx.fillStyle = leftGlow;
      ctx.fillRect(0, 0, width, height);

      const rightGlow = ctx.createRadialGradient(blueX + (width - blueX) * 0.4, centerY, 0, blueX + (width - blueX) * 0.4, centerY, isMobile ? 170 : 250);
      rightGlow.addColorStop(0, "hsla(220, 100%, 62%, 0.30)");
      rightGlow.addColorStop(1, "hsla(220, 100%, 62%, 0)");
      ctx.fillStyle = rightGlow;
      ctx.fillRect(0, 0, width, height);

      if (beamIntensity > 0.06) {
        drawBeam(0, redX, centerY, 344, 350, beamIntensity, time);
        drawBeam(width, blueX, centerY, 220, 208, beamIntensity, time + 40);

        if (particles.length < particleCap && Math.random() > (isMobile ? 0.58 : 0.4)) {
          particles.push(
            createParticle(redX, centerY + (Math.random() - 0.5) * 70, "beam", 344, 100, 62, 1),
            createParticle(blueX, centerY + (Math.random() - 0.5) * 70, "beam", 220, 100, 68, -1),
          );
        }
      }

      if (progress >= 0.38) {
        if (particles.length < particleCap && progress < 0.96 && Math.random() > (isMobile ? 0.64 : 0.35)) {
          particles.push(
            createParticle(centerX, centerY, "explosion", 286, 100, 66),
            createParticle(centerX, centerY, "explosion", 332, 100, 76),
            createParticle(centerX, centerY, "spark", 210, 100, 80),
            createParticle(centerX, centerY, "spark", 4, 100, 78),
          );
        }

        if (collisionIntensity > 0) {
          const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(explosionRadius * 0.7, 40));
          coreGradient.addColorStop(0, `hsla(0, 0%, 100%, ${Math.min(collisionIntensity * 0.85, 0.85)})`);
          coreGradient.addColorStop(0.25, `hsla(300, 100%, 60%, ${collisionIntensity * 0.7})`);
          coreGradient.addColorStop(1, "hsla(300, 100%, 60%, 0)");

          ctx.fillStyle = coreGradient;
          ctx.beginPath();
          ctx.arc(centerX, centerY, Math.max(explosionRadius * 0.72, 32), 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(centerX, centerY, Math.max(explosionRadius, 40), 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(286, 100%, 74%, ${collisionIntensity * 0.45})`;
          ctx.lineWidth = (isMobile ? 4 : 8) * collisionIntensity;
          ctx.shadowColor = "hsl(286, 100%, 72%)";
          ctx.shadowBlur = isMobile ? 12 : 20;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      particles = particles.filter((particle) => particle.life > 0 && particle.size > 0.12);
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.kind === "spark") {
          particle.vy += 0.36;
          particle.vx *= 0.95;
        } else if (particle.kind === "ember") {
          particle.vy -= 0.08;
          particle.vx *= 0.99;
          particle.vy *= 0.99;
        } else {
          particle.vx *= 0.98;
          particle.vy *= 0.98;
        }

        particle.life -= 1;
        particle.size *= particle.kind === "explosion" ? 0.97 : particle.kind === "ember" ? 0.993 : 0.98;

        const alpha = Math.max(0, particle.life / particle.maxLife);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Math.max(0.1, particle.size), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, ${alpha})`;
        ctx.shadowColor = `hsl(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%)`;
        ctx.shadowBlur = particle.size * (isMobile ? 5 : 9);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.restore();

      // Intro lightning flash
      if (introFlash > 0.01) {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `hsla(260, 80%, 90%, ${introFlash})`;
        ctx.fillRect(0, 0, width, height);
      }

      // Explosion flash
      if (flashOpacity > 0.01) {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `hsla(0, 0%, 100%, ${flashOpacity})`;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      id="battle-transition"
      ref={sectionRef}
      className="relative h-[120vh] md:h-[170vh] overflow-hidden"
      aria-hidden="true"
    >
      <div className="sticky top-0 h-screen w-full pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
    </section>
  );
};

export default BattleTransitionEffect;
