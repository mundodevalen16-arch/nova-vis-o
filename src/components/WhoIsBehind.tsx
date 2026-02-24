import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";

const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };
  const handlePointerUp = () => { isDragging.current = false; };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="cinematic-card relative w-full aspect-[3/4] cursor-ew-resize select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerUp}
      >
        {/* AFTER */}
        <div className="absolute inset-0 bg-gradient-hero flex items-end p-6 rounded-[2rem]">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-body font-bold bg-primary/20 border border-primary/30 text-foreground mb-2 uppercase tracking-wider">Depois</span>
            <p className="font-display text-2xl">Método. Clareza. R$10k/mês.</p>
          </div>
        </div>

        {/* BEFORE */}
        <div
          className="absolute inset-0 flex items-end p-6 rounded-[2rem]"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            background: "linear-gradient(160deg, hsl(0 0% 12%), hsl(0 0% 8%))",
            filter: "grayscale(100%) brightness(0.5)",
          }}
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-body font-bold bg-muted text-muted-foreground mb-2 uppercase tracking-wider">Antes</span>
            <p className="font-display text-2xl text-foreground/50">Sem direção. Sem resultado.</p>
          </div>
        </div>

        {/* Handle */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-foreground/60 z-20 pointer-events-none" style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/90 border-2 border-primary flex items-center justify-center text-background font-bold text-xs glow-purple pointer-events-none">
            ⟨⟩
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground font-body animate-pulse">← Arraste para ver a transformação →</p>
    </div>
  );
};

const Counter = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <motion.p
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="font-display text-3xl md:text-4xl text-gradient-purple"
    >
      {value}
    </motion.p>
    <p className="font-body text-xs text-muted-foreground mt-1">{label}</p>
  </div>
);

const WhoIsBehind = () => {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl text-center mb-16"
          style={{ textShadow: "0 4px 20px hsl(var(--digital-purple) / 0.3)" }}
        >
          QUEM ESTÁ <span className="text-gradient-purple">POR TRÁS</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <BeforeAfterSlider />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-display text-5xl md:text-6xl text-gradient-purple">iBielZz</h3>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary/60">
              Especialista em Tráfego Pago e Marketing Digital
            </p>
            <div className="space-y-4 font-body text-foreground/65 leading-relaxed text-sm">
              <p>Mais de 5 anos no mercado digital. Especialista em Meta Ads e Direct Response.</p>
              <p>Já ajudou centenas de pessoas a saírem do zero e construírem renda consistente na internet.</p>
              <p className="text-foreground/90 font-semibold">
                Não vendo teoria — ensino o que funciona na prática, com resultados reais e método testado.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border/20">
              <Counter value="5+" label="Anos de experiência" />
              <Counter value="R$10M+" label="Em anúncios" />
              <Counter value="500+" label="Alunos" />
              <Counter value="100%" label="Conteúdo 2026" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsBehind;
