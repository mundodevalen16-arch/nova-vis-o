import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const before = [
  "Perdido",
  "Testando campanha aleatória",
  "Gastando dinheiro sem retorno",
  "Dependendo de tutorial no YouTube",
];
const after = [
  "Campanhas organizadas",
  "Estratégia clara",
  "Primeiro cliente ou venda validada",
  "Caminho estruturado rumo aos R$10k/mês",
];

const Transformation = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Before card: flies in from far left with dramatic barrel roll
  const leftX = useTransform(scrollYProgress, [0, 0.4], [-800, 0]);
  const leftRotateY = useTransform(scrollYProgress, [0, 0.4], [90, 0]);
  const leftRotateZ = useTransform(scrollYProgress, [0, 0.4], [-30, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  // After card: flies in from far right with opposite barrel roll
  const rightX = useTransform(scrollYProgress, [0.05, 0.45], [800, 0]);
  const rightRotateY = useTransform(scrollYProgress, [0.05, 0.45], [-90, 0]);
  const rightRotateZ = useTransform(scrollYProgress, [0.05, 0.45], [30, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

  // Impact shockwave when they meet
  const shockwaveScale = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 1.5, 0]);
  const shockwaveOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.55], [0, 0.8, 0]);

  return (
    <section ref={ref} id="transformacao" className="py-32 px-6 relative overflow-hidden" style={{ perspective: "2000px" }}>
      {/* Shockwave impact effect */}
      <motion.div
        style={{ scale: shockwaveScale, opacity: shockwaveOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
      >
        <div className="w-full h-full rounded-full" style={{
          background: "radial-gradient(circle, hsl(328 100% 48% / 0.4), hsl(270 80% 55% / 0.2), transparent 70%)",
          boxShadow: "0 0 100px 50px hsl(328 100% 48% / 0.2)",
        }} />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tight"
        >
          🔄 A <span className="text-gradient-pink">transformação</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* BEFORE card — slams in from left */}
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

          {/* AFTER card — slams in from right */}
          <motion.div style={{ x: rightX, rotateY: rightRotateY, rotateZ: rightRotateZ, opacity: rightOpacity, transformOrigin: "left center" }}>
            <SpotlightCard delay={0.1}>
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10 space-y-1 text-sm text-foreground/50 font-light"
        >
          <p>Isso não é exagero.</p>
          <p className="text-foreground/80 font-semibold">É método aplicado.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Transformation;
