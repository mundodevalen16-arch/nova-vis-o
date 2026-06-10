import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const TOTAL_FRAMES = 60;

// Pré-gera os paths para evitar recalcular a cada render
const framePaths = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = (i + 1).toString().padStart(3, "0");
  return `/frame/ezgif-frame-${num}.jpg`;
});

export default function FrameAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [loadedFrames, setLoadedFrames] = useState<Set<number>>(new Set([1]));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const phrase = "A maioria tenta. Poucos dominam.";
  const [visibleChars, setVisibleChars] = useState(0);

  const textY = useTransform(scrollYProgress, [0.6, 0.95], [40, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  // Preload inteligente: carrega apenas o frame necessário + 3 à frente
  // Evita baixar 60 imagens de uma vez ao abrir a página
  const preloadNear = useCallback((frame: number) => {
    for (let i = frame; i <= Math.min(TOTAL_FRAMES, frame + 3); i++) {
      if (!loadedFrames.has(i)) {
        const img = new Image();
        img.src = framePaths[i - 1];
        img.onload = () => {
          setLoadedFrames((prev) => new Set(prev).add(i));
        };
      }
    }
  }, [loadedFrames]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const fIndex = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.round(latest * (TOTAL_FRAMES / 0.85)))
    );
    setCurrentFrame(fIndex);
    preloadNear(fIndex);

    // Letras surgindo entre 60% e 90% do scroll
    if (latest < 0.6) {
      setVisibleChars(0);
    } else if (latest > 0.9) {
      setVisibleChars(phrase.length);
    } else {
      const progress = (latest - 0.6) / 0.3;
      setVisibleChars(Math.round(progress * phrase.length));
    }
  });

  // Preload leve: após 2 segundos, carrega os frames em pequenos grupos de 5
  // para não competir com o carregamento inicial da página
  useEffect(() => {
    // Carrega o frame 1 imediatamente
    const first = new Image();
    first.src = framePaths[0];

    const timer = setTimeout(() => {
      let batch = 0;
      const loadBatch = () => {
        const start = batch * 5 + 1;
        const end = Math.min(TOTAL_FRAMES, start + 4);
        if (start > TOTAL_FRAMES) return;
        for (let i = start; i <= end; i++) {
          const img = new Image();
          img.src = framePaths[i - 1];
        }
        batch++;
        setTimeout(loadBatch, 300); // aguarda 300ms entre cada grupo de 5
      };
      loadBatch();
    }, 2000); // começa só após 2s da abertura da página

    return () => clearTimeout(timer);
  }, []);

  const imageNumber = currentFrame.toString().padStart(3, "0");

  return (
    <section
      ref={containerRef}
      className="h-[200vh] md:h-[400vh] bg-background relative z-10 w-full"
    >
      <div className="sticky top-0 h-[56vw] md:h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: imageScale }}
        >
          <img
            src={`/frame/ezgif-frame-${imageNumber}.jpg`}
            alt="Frame animation"
            className="w-full h-full object-cover contrast-[1.15] saturate-[1.3] brightness-[1.1]"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-90" />
        </motion.div>

        {/* Texto com máquina de escrever amarrada ao scroll */}
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
