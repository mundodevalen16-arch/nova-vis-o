import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const TOTAL_FRAMES = 60;

export default function FrameAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Aumentado para 400vh para travar o scroll do usuário por mais tempo
  // e dar aquela sensação cinematográfica completa antes de liberar a página.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Mapear o progresso do scroll para os frames (de 0 a 0.85 para focar a animação primeiro)
  const frameIndex = useTransform(scrollYProgress, [0, 0.85], [1, TOTAL_FRAMES]);
  const [currentFrame, setCurrentFrame] = useState(1);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    // Evitar passar do limite
    const index = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(latest)));
    setCurrentFrame(index);
  });

  // Animar o texto puramente com base no scroll para surgir do meio para o fim
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.95], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.95], [40, 0]);
  
  // Um pequeno efeito de zoom na imagem inteira ao longo do scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  // Preload images to prevent flickering
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, '0');
      img.src = `/frame/ezgif-frame-${num}.jpg`;
    }
  }, []);

  const imageNumber = currentFrame.toString().padStart(3, '0');

  return (
    <section ref={containerRef} className="h-[400vh] bg-background relative z-10 w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: imageScale }}
        >
          <img 
            src={`/frame/ezgif-frame-${imageNumber}.jpg`}
            alt={`Frame animation`}
            className="w-full h-full object-cover"
          />
          {/* Gradients to blend smoothly with sections above and below */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-90" />
        </motion.div>
        
        {/* Texto sobreposto amarrado 100% ao scroll */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto pointer-events-none"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            A Nova Visão
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-zinc-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
            Acompanhe a transformação em cada detalhe.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
