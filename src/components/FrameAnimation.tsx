import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
} from "framer-motion";

const TOTAL_FRAMES = 60;

export default function FrameAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cache de imagens já carregadas
  const imagesRef = useRef<Array<HTMLImageElement | null>>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const currentFrameRef = useRef(1);

  const [visibleChars, setVisibleChars] = useState(0);
  const phrase = "A maioria tenta. Poucos dominam.";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0.6, 0.95], [40, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  // Desenha o frame no canvas — nunca pisca pois é uma operação atômica
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex - 1];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Aplica filtros visuais
    ctx.filter = "contrast(1.15) saturate(1.3) brightness(1.1)";

    // Comportamento "object-cover": escala e centraliza para preencher o canvas
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    let sx = 0,
      sy = 0,
      sw = img.naturalWidth,
      sh = img.naturalHeight;

    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  };

  // Ajusta o canvas ao container e redesenha quando a janela é redimensionada
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawFrame(currentFrameRef.current);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const fIndex = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.round(latest * (TOTAL_FRAMES / 0.85)))
    );

    if (fIndex !== currentFrameRef.current) {
      currentFrameRef.current = fIndex;
      drawFrame(fIndex);
    }

    // Máquina de escrever: letras entre 60% e 90% do scroll
    if (latest < 0.6) {
      setVisibleChars(0);
    } else if (latest > 0.9) {
      setVisibleChars(phrase.length);
    } else {
      setVisibleChars(
        Math.round(((latest - 0.6) / 0.3) * phrase.length)
      );
    }
  });

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Carrega todas as imagens em background, com prioridade para as primeiras
    // Uma vez carregada, redesnha o canvas se for o frame atual
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, "0");
      img.src = `/frame/ezgif-frame-${num}.jpg`;
      const frameIndex = i;
      img.onload = () => {
        imagesRef.current[frameIndex - 1] = img;
        // Se este é o frame atual ou o frame 1, desenha imediatamente
        if (frameIndex === currentFrameRef.current || frameIndex === 1) {
          drawFrame(currentFrameRef.current);
        }
      };
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

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
          {/* Canvas: sem piscadas, renderização atômica por frame */}
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Gradientes para fundir com o fundo do site */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-90" />
        </motion.div>

        {/* Texto com máquina de escrever */}
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
