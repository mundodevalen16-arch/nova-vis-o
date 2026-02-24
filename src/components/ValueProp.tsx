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

const ValueProp = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const cardsRotateX = useTransform(scrollYProgress, [0, 0.5], [8, 0]);
  const cardsScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <section ref={sectionRef} className="py-32 px-6" style={{ perspective: "1200px" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          style={{ y: titleY }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="text-xs text-primary font-bold uppercase tracking-[0.3em] mb-4"
          >
            ⚡ NÃO É SOBRE APRENDER.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            É sobre <span className="text-gradient-pink">DOMINAR.</span>
          </motion.h2>
          <div className="max-w-xl mx-auto space-y-3 text-sm text-foreground/50 font-light leading-relaxed">
            <p>Todo mundo fala de tráfego pago.<br />Poucos sabem estruturar campanhas que realmente vendem.</p>
            <p>O 360 Digital não ensina só a "apertar botão".</p>
            <p className="text-foreground/70 font-medium">Ele te entrega:</p>
          </div>
        </motion.div>

        <motion.div
          style={{ rotateX: cardsRotateX, scale: cardsScale, transformOrigin: "center bottom" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          {delivers.map((item, i) => (
            <SpotlightCard key={i} delay={i * 0.06}>
              <div className="p-6 flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm text-foreground/80 font-medium">{item.text}</span>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>

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
