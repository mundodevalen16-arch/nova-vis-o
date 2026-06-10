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

  // Progresso do scroll para a frase
  const phrase = "A maioria tenta. Poucos dominam.";
  const [visibleChars, setVisibleChars] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculando frames
    const fIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(latest * (TOTAL_FRAMES / 0.85))));
    setCurrentFrame(fIndex);

    // Calculando letras (surgindo entre 60% e 90% do scroll)
    if (latest < 0.6) {
      setVisibleChars(0);
    } else if (latest > 0.9) {
      setVisibleChars(phrase.length);
    } else {
      const progress = (latest - 0.6) / 0.3;
      setVisibleChars(Math.round(progress * phrase.length));
    }
  });

  const textY = useTransform(scrollYProgress, [0.6, 0.95], [40, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, '0');
      img.src = `/frame/ezgif-frame-${num}.jpg`;
    }
  }, []);

  const imageNumber = currentFrame.toString().padStart(3, '0');

  return (
    // Mobile: 200vh para a seção, container com altura proporcional ao aspecto 16:9 da imagem (56vw)
    // Desktop: 400vh para a seção, h-screen para efeito cinematográfico
    <section ref={containerRef} className="h-[200vh] md:h-[400vh] bg-background relative z-10 w-full">
      <div className="sticky top-0 h-[56vw] md:h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: imageScale }}
        >
          {/* Container tem exatamente o aspecto 16:9 no mobile, então object-cover
              preenche perfeitamente sem barras pretas e sem cortar o conteúdo importante */}
          <img 
            src={`/frame/ezgif-frame-${imageNumber}.jpg`}
            alt={`Frame animation`}
            className="w-full h-full object-cover contrast-[1.15] saturate-[1.3] brightness-[1.1]"
          />
          {/* Gradients to blend smoothly with sections above and below */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-90" />
        </motion.div>
        
        {/* Texto sobreposto amarrado 100% ao scroll */}
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
                  transition: "opacity 0.1s ease-in-out"
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
