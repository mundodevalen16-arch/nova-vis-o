import { motion } from "framer-motion";
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

const Transformation = () => (
  <section id="transformacao" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
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

export default Transformation;
