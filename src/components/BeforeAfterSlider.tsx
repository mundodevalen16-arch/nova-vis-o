import { useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import antesImg from "@/assets/antes_digital.jpg";
import depoisImg from "@/assets/depois_do_digital.jpg";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isDragging = useRef(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  // Dramatic flip reveal — entire slider does a backflip into view
  const flipRotateX = useTransform(scrollYProgress, [0, 0.35], [120, 0]);
  const flipScale = useTransform(scrollYProgress, [0, 0.35], [0.3, 1]);
  const flipOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const flipY = useTransform(scrollYProgress, [0, 0.35], [200, 0]);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6" style={{ perspective: "2000px" }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-5xl md:text-7xl font-black text-center mb-6 tracking-tight"
        >
          A <span className="text-gradient-pink">transformação</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm font-light mb-12"
        >
          Arraste o slider para ver a diferença →
        </motion.p>

        {/* Slider does a dramatic backflip */}
        <motion.div
          style={{ 
            rotateX: flipRotateX, 
            scale: flipScale, 
            opacity: flipOpacity, 
            y: flipY,
            transformOrigin: "center bottom",
          }}
          className="max-w-4xl mx-auto"
        >
          <div
            ref={containerRef}
            className="relative w-full aspect-[3/4] md:aspect-[16/10] rounded-3xl overflow-hidden cursor-ew-resize select-none touch-none"
            style={{
              border: "1px solid hsl(0 0% 100% / 0.08)",
              boxShadow: "0 30px 80px hsl(0 0% 0% / 0.5), 0 0 60px hsl(328 100% 48% / 0.1)",
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerUp}
          >
            {/* AFTER (full background) */}
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <img src={depoisImg} alt="Depois do digital" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(270 50% 10% / 0.85), transparent 60%)" }} />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-primary/20 border border-primary/30 text-primary uppercase tracking-wider mb-3">
                  Depois
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-foreground">
                  Método. Clareza. R$10k/mês.
                </h3>
                <p className="text-sm text-foreground/60 mt-2 font-light max-w-md">
                  Campanhas rodando, resultados aparecendo, confiança total no que faz.
                </p>
              </div>
            </div>

            {/* BEFORE (clipped) */}
            <div
              className="absolute inset-0 flex items-end p-8 md:p-12"
              style={{
                clipPath: `inset(0 ${100 - position}% 0 0)`,
              }}
            >
              <img src={antesImg} alt="Antes do digital" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(0 0% 5% / 0.85), transparent 60%)" }} />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-muted border border-muted-foreground/20 text-muted-foreground uppercase tracking-wider mb-3">
                  Antes
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-foreground/40">
                  Sem direção. Sem resultado.
                </h3>
                <p className="text-sm text-foreground/25 mt-2 font-light max-w-md">
                  Dinheiro jogado fora em anúncios, sem saber o que está errado.
                </p>
              </div>
            </div>

            {/* Drag handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] z-20 pointer-events-none"
              style={{
                left: `${position}%`,
                background: "hsl(0 0% 100% / 0.5)",
                boxShadow: "0 0 15px hsl(328 100% 48% / 0.5)",
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs"
                style={{
                  background: "linear-gradient(135deg, hsl(328 100% 48%), hsl(270 80% 55%))",
                  boxShadow: "0 0 30px hsl(328 100% 48% / 0.5)",
                  color: "white",
                }}
              >
                ⟨⟩
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4 animate-pulse font-light">
            ← Arraste para ver a transformação →
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
