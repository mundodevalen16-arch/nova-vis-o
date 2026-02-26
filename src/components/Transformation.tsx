import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const smooth = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };

const before = [
  "Mais um jovem sonhador",
  "Trabalhador, ajudante de padeiro e fazendo bicos",
  "Sem direção e sem previsibilidade de renda",
  "Tentando sozinho e travando nos resultados",
];
const after = [
  "Estratégia clara e rotina de execução",
  "Campanhas organizadas com foco em resultado",
  "Primeiros clientes e vendas consistentes",
  "Crescimento real rumo aos R$100k/mês",
];

const Transformation = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const leftX = useTransform(scrollYProgress, [0.05, 0.4], [-600, 0]);
  const leftRotateY = useTransform(scrollYProgress, [0.05, 0.4], [70, 0]);
  const leftRotateZ = useTransform(scrollYProgress, [0.05, 0.4], [-20, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  
  const rightX = useTransform(scrollYProgress, [0.1, 0.45], [600, 0]);
  const rightRotateY = useTransform(scrollYProgress, [0.1, 0.45], [-70, 0]);
  const rightRotateZ = useTransform(scrollYProgress, [0.1, 0.45], [20, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const shockwaveScale = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 1.5, 0]);
  const shockwaveOpacity = useTransform(scrollYProgress, [0.35, 0.42, 0.55], [0, 0.6, 0]);

  return (
    <section ref={ref} id="transformacao" className="pt-2 pb-16 md:pt-4 md:pb-20 px-6 relative overflow-hidden" style={{ perspective: "2000px" }}>
      {/* Shockwave */}
      <motion.div
        style={{ scale: shockwaveScale, opacity: shockwaveOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
      >
        <div className="w-full h-full rounded-full" style={{
          background: "radial-gradient(circle, hsl(328 100% 48% / 0.3), hsl(270 80% 55% / 0.15), transparent 70%)",
          boxShadow: "0 0 80px 40px hsl(328 100% 48% / 0.15)",
        }} />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div style={{ x: leftX, rotateY: leftRotateY, rotateZ: leftRotateZ, opacity: leftOpacity, transformOrigin: "right center" }}>
            <SpotlightCard>
              <div className="p-8">
                <span className="inline-block px-3 py-1 rounded-full glass text-xs font-medium text-muted-foreground uppercase tracking-wider mb-6">
                  Antes
                </span>
                <ul className="space-y-4">
                  {before.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/40 text-sm font-light">
                      <span className="text-muted-foreground/50">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div style={{ x: rightX, rotateY: rightRotateY, rotateZ: rightRotateZ, opacity: rightOpacity, transformOrigin: "left center" }}>
            <SpotlightCard>
              <div className="p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary uppercase tracking-wider mb-6">
                  Depois
                </span>
                <ul className="space-y-4">
                  {after.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/90 text-sm font-light">
                      <span className="text-primary">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Transformation;
