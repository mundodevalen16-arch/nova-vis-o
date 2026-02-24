import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";

/* Before/After Slider */
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

  const handlePointerDown = () => { isDragging.current = true; };
  const handlePointerUp = () => { isDragging.current = false; };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden cursor-ew-resize select-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerUp}
      >
        {/* AFTER (background) */}
        <div className="absolute inset-0 bg-gradient-to-br from-digital-purple/40 via-digital-violet/30 to-digital-blue/20 flex items-end p-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-body font-semibold bg-primary/20 border border-primary/30 text-foreground mb-2">DEPOIS</span>
            <p className="font-display text-xl text-foreground">Método. Clareza. R$10k/mês.</p>
          </div>
        </div>

        {/* BEFORE (clipped) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 grayscale brightness-[0.6] flex items-end p-6"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-body font-semibold bg-gray-700 text-gray-300 mb-2">ANTES</span>
            <p className="font-display text-xl text-gray-400">Sem direção. Sem resultado.</p>
          </div>
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-foreground/80 z-10"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/90 border-2 border-primary flex items-center justify-center text-background font-bold text-xs glow-purple">
            ⟨⟩
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground font-body animate-pulse">
        ← Arraste para ver a transformação →
      </p>
    </div>
  );
};

/* Counter */
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
    <p className="font-body text-sm text-muted-foreground mt-1">{label}</p>
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
          className="font-display text-4xl md:text-6xl text-center mb-16"
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
            <h3 className="font-display text-4xl md:text-5xl text-gradient-purple">iBielZz</h3>
            <p className="font-body text-sm uppercase tracking-widest text-primary/70">
              Especialista em Tráfego Pago e Marketing Digital
            </p>
            <div className="space-y-4 font-body text-foreground/80 leading-relaxed">
              <p>Mais de 5 anos no mercado digital. Especialista em Meta Ads e Direct Response.</p>
              <p>Já ajudou centenas de pessoas a saírem do zero e construírem renda consistente na internet.</p>
              <p className="text-foreground font-semibold">
                Não vendo teoria — ensino o que funciona na prática, com resultados reais e método testado.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border/30">
              <Counter value="5+" label="Anos de experiência" />
              <Counter value="R$10M+" label="Gerenciados em anúncios" />
              <Counter value="500+" label="Alunos impactados" />
              <Counter value="100%" label="Conteúdo 2026" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsBehind;
