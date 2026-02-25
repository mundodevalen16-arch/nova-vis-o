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
    const STAR_COUNT = 180;
    const CONNECTION_DIST = 120;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.003 + 0.001,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw constellation lines
      ctx.strokeStyle = "rgba(160, 130, 255, 0.06)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.08;
            ctx.strokeStyle = `rgba(160, 130, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw stars with twinkle
      for (const star of stars) {
        star.twinkle += star.speed;
        const alpha = 0.3 + Math.sin(star.twinkle + time * 0.001) * 0.4;
        const glow = star.r * 3;

        // Outer glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glow);
        gradient.addColorStop(0, `rgba(190, 170, 255, ${alpha * 0.6})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glow, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(220, 210, 255, ${alpha})`;
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
      style={{ opacity: 0.7 }}
    />
  );
};

export default ConstellationBackground;
