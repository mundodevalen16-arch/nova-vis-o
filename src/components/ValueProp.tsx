import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const delivers = [
  { icon: "🗺️", text: "A rota exata para sair do zero" },
  { icon: "🏗️", text: "Estrutura validada de campanhas" },
  { icon: "⚙️", text: "Configuração profissional de contas" },
  { icon: "📊", text: "Leitura estratégica de métricas" },
  { icon: "🚀", text: "Otimização para escalar resultados" },
];

// Explosion scatter positions — each card flies in from a wild position
const scatterPositions = [
  { x: -400, y: -300, rotate: -45, scale: 0.3 },
  { x: 500, y: -200, rotate: 60, scale: 0.2 },
  { x: -300, y: 400, rotate: -30, scale: 0.4 },
  { x: 400, y: 300, rotate: 50, scale: 0.3 },
  { x: 0, y: -500, rotate: -20, scale: 0.2 },
];

const ValueProp = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  // Title zooms in dramatically
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [3, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 0.5, 1]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.3], [20, 0]);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden" style={{ perspective: "1500px" }}>
      {/* Explosion flash */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.35], [0, 0.6, 0]) }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, hsl(328 100% 48% / 0.5), hsl(270 80% 55% / 0.3), transparent)" }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title zooms in like flying through space */}
        <motion.div
          style={{ 
            scale: titleScale, 
            opacity: titleOpacity,
            filter: useTransform(titleBlur, v => `blur(${v}px)`),
          }}
          className="text-center mb-16"
        >
          <p className="text-xs text-primary font-bold uppercase tracking-[0.3em] mb-4">
            ⚡ NÃO É SOBRE APRENDER.
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            É sobre <span className="text-gradient-pink">DOMINAR.</span>
          </h2>
          <div className="max-w-xl mx-auto space-y-3 text-sm text-foreground/50 font-light leading-relaxed">
            <p>Todo mundo fala de tráfego pago.<br />Poucos sabem estruturar campanhas que realmente vendem.</p>
            <p>O 360 Digital não ensina só a "apertar botão".</p>
            <p className="text-foreground/70 font-medium">Ele te entrega:</p>
          </div>
        </motion.div>

        {/* Cards explode in from scattered positions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {delivers.map((item, i) => {
            const scatter = scatterPositions[i];
            return (
              <motion.div
                key={i}
                initial={{ 
                  x: scatter.x, 
                  y: scatter.y, 
                  rotate: scatter.rotate, 
                  scale: scatter.scale, 
                  opacity: 0 
                }}
                whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 60, 
                  damping: 12, 
                  delay: i * 0.08,
                }}
              >
                <SpotlightCard>
                  <div className="p-6 flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm text-foreground/80 font-medium">{item.text}</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-1 text-sm text-foreground/50 font-light"
        >
          <p>Você deixa de ser curioso.</p>
          <p className="text-foreground/80 font-semibold">E começa a agir como profissional.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProp;
