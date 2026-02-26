import { useEffect, useRef } from "react";

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let stars: { x: number; y: number; r: number; twinkle: number; speed: number }[] = [];
    let lightnings: { x1: number; y1: number; x2: number; y2: number; life: number; maxLife: number; branches: { x: number; y: number }[] }[] = [];
    
    const STAR_COUNT = 200;
    const CONNECTION_DIST = 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.004 + 0.001,
      }));
    };

    const spawnLightning = () => {
      if (lightnings.length > 3) return;
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height * 0.4;
      const endX = startX + (Math.random() - 0.5) * 400;
      const endY = startY + Math.random() * 300 + 100;
      
      const branches: { x: number; y: number }[] = [];
      const steps = 6 + Math.floor(Math.random() * 6);
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        branches.push({
          x: startX + (endX - startX) * t + (Math.random() - 0.5) * 60,
          y: startY + (endY - startY) * t + (Math.random() - 0.5) * 30,
        });
      }

      lightnings.push({
        x1: startX, y1: startY,
        x2: endX, y2: endY,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        branches,
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn lightning periodically
      if (Math.random() < 0.015) spawnLightning();

      // Draw lightning bolts
      lightnings = lightnings.filter(l => l.life < l.maxLife);
      for (const l of lightnings) {
        l.life++;
        const progress = l.life / l.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : (1 - progress) * 0.8;
        
        if (alpha > 0.01) {
          // Main bolt
          ctx.strokeStyle = `rgba(180, 120, 255, ${alpha * 0.6})`;
          ctx.lineWidth = 2;
          ctx.shadowColor = 'rgba(160, 80, 255, 0.8)';
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.moveTo(l.branches[0].x, l.branches[0].y);
          for (let i = 1; i < l.branches.length; i++) {
            ctx.lineTo(l.branches[i].x, l.branches[i].y);
          }
          ctx.stroke();

          // Inner bright core
          ctx.strokeStyle = `rgba(220, 200, 255, ${alpha * 0.9})`;
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(l.branches[0].x, l.branches[0].y);
          for (let i = 1; i < l.branches.length; i++) {
            ctx.lineTo(l.branches[i].x, l.branches[i].y);
          }
          ctx.stroke();

          // Sub-branches
          ctx.strokeStyle = `rgba(140, 80, 255, ${alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 5;
          for (let i = 1; i < l.branches.length - 1; i += 2) {
            const bx = l.branches[i].x + (Math.random() - 0.5) * 80;
            const by = l.branches[i].y + Math.random() * 60;
            ctx.beginPath();
            ctx.moveTo(l.branches[i].x, l.branches[i].y);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
          
          ctx.shadowBlur = 0;
        }
      }

      // Draw constellation lines (purple tinted)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.07;
            ctx.strokeStyle = `rgba(140, 80, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw stars with purple/magenta tint
      for (const star of stars) {
        star.twinkle += star.speed;
        const alpha = 0.25 + Math.sin(star.twinkle + time * 0.001) * 0.45;
        const glow = star.r * 3.5;

        // Outer glow - purple
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glow);
        gradient.addColorStop(0, `rgba(170, 120, 255, ${alpha * 0.5})`);
        gradient.addColorStop(0.5, `rgba(130, 60, 220, ${alpha * 0.2})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glow, 0, Math.PI * 2);
        ctx.fill();

        // Core - bright white/purple
        ctx.fillStyle = `rgba(230, 210, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ opacity: 0.85 }}
    />
  );
};

export default ConstellationBackground;
