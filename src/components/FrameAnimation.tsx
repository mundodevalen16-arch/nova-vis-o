import { useEffect, useRef, useState, useCallback } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
} from "framer-motion";

const TOTAL_FRAMES = 60;
const FRAME_INTERVAL_MS = 50; // ~20fps no auto-play mobile

export default function FrameAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const currentFrameRef = useRef(1);
  const animTimerRef = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);
  const [autoPlayDone, setAutoPlayDone] = useState(false);
  const phrase = "A maioria tenta. Poucos dominam.";

  // Detecta se é mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll-based (usado apenas no desktop)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const textY = useTransform(scrollYProgress, [0.6, 0.95], [40, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  // Desenha no canvas sem piscadas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex - 1];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.filter = "contrast(1.15) saturate(1.3) brightness(1.1)";
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Desktop: controle por scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;
    const fIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(latest * (TOTAL_FRAMES / 0.85))));
    if (fIndex !== currentFrameRef.current) {
      currentFrameRef.current = fIndex;
      drawFrame(fIndex);
    }
    if (latest < 0.6) setVisibleChars(0);
    else if (latest > 0.9) setVisibleChars(phrase.length);
    else setVisibleChars(Math.round(((latest - 0.6) / 0.3) * phrase.length));
  });

  // Mobile: auto-play ao entrar na viewport
  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !autoPlayDone) {
          let frame = 1;
          animTimerRef.current = window.setInterval(() => {
            frame++;
            if (frame > TOTAL_FRAMES) {
              clearInterval(animTimerRef.current!);
              setAutoPlayDone(true);
              // Digita a frase após a animação terminar
              let charIndex = 0;
              const charTimer = setInterval(() => {
                charIndex++;
                setVisibleChars(charIndex);
                if (charIndex >= phrase.length) clearInterval(charTimer);
              }, 40);
              return;
            }
            currentFrameRef.current = frame;
            drawFrame(frame);
          }, FRAME_INTERVAL_MS);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (animTimerRef.current) clearInterval(animTimerRef.current);
    };
  }, [isMobile, autoPlayDone, drawFrame, phrase.length]);

  // Carrega todas as imagens
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frame/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
      const idx = i;
      img.onload = () => {
        imagesRef.current[idx - 1] = img;
        if (idx === currentFrameRef.current || idx === 1) drawFrame(currentFrameRef.current);
      };
    }
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas, drawFrame]);

  // ──────────────────────────────────
  // MOBILE: seção normal, auto-play, sem scroll-lock
  // ──────────────────────────────────
  if (isMobile) {
    return (
      <section ref={containerRef} className="bg-background relative z-10 w-full py-4">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <canvas ref={canvasRef} className="w-full h-full rounded-xl overflow-hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 rounded-xl" />

          {/* Frase digitada */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center px-4">
            <p className="text-lg text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-bold tracking-wide text-center">
              {phrase.split("").map((char, index) => (
                <span
                  key={index}
                  style={{
                    opacity: index < visibleChars ? 1 : 0,
                    transition: "opacity 0.06s ease-in-out",
                  }}
                >
                  {char}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ──────────────────────────────────
  // DESKTOP: scroll-lock cinematográfico
  // ──────────────────────────────────
  return (
    <section ref={containerRef} className="h-[400vh] bg-background relative z-10 w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: imageScale }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-90" />
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto pointer-events-none"
        >
          <p className="text-2xl md:text-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-bold tracking-wide">
            {phrase.split("").map((char, index) => (
              <span
                key={index}
                style={{
                  opacity: index < visibleChars ? 1 : 0,
                  transition: "opacity 0.08s ease-in-out",
                }}
              >
                {char}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
