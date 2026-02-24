import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const stats = [
  { value: "5+", label: "Anos de experiência" },
  { value: "R$10M+", label: "Gerenciados em anúncios" },
  { value: "500+", label: "Alunos impactados" },
  { value: "100%", label: "Conteúdo 2026" },
];

// Each stat card has a dramatic scatter origin
const statScatter = [
  { x: -200, y: -300, rotate: -40 },
  { x: 200, y: -250, rotate: 35 },
  { x: -250, y: 200, rotate: -25 },
  { x: 300, y: 150, rotate: 45 },
];

const WhoIsBehind = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Name reveal: types in from blur
  const nameScale = useTransform(scrollYProgress, [0.05, 0.25], [5, 1]);
  const nameOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const nameBlur = useTransform(scrollYProgress, [0.05, 0.25], [25, 0]);

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden" style={{ perspective: "1500px" }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tight"
        >
          👤 Quem está <span className="text-gradient-pink">por trás</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto text-center">
          <div>
            {/* Name zooms in dramatically */}
            <motion.h3
              style={{ 
                scale: nameScale, 
                opacity: nameOpacity,
                filter: useTransform(nameBlur, v => `blur(${v}px)`),
              }}
              className="text-5xl md:text-6xl font-black text-gradient-pink mb-2"
            >
              iBielZz
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.1 }}
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.3em] mb-8">
                Especialista em Meta Ads e Direct Response
              </p>
              <div className="space-y-3 text-foreground/60 text-sm font-light leading-relaxed max-w-xl mx-auto mb-12">
                <p>+5 anos no mercado digital.<br />+R$10M gerenciados em anúncios.<br />Centenas de alunos impactados.</p>
                <p className="text-foreground/40">Não ensino teoria.<br />Ensino o que funciona.</p>
                <p className="text-foreground/90 font-medium">
                  O que eu aplico. O que gera resultado. O que escala.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Stats explode in from scattered positions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: statScatter[i].x, 
                  y: statScatter[i].y, 
                  rotate: statScatter[i].rotate, 
                  scale: 0.3, 
                  opacity: 0 
                }}
                whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 70, damping: 14, delay: i * 0.1 }}
                className="glass rounded-2xl p-5"
              >
                <p className="text-3xl font-black text-gradient-pink">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsBehind;
