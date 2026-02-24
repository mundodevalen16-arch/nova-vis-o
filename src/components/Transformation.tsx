import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const before = [
  "Perdido sem saber por onde começar",
  "Gastando dinheiro em anúncios que não convertem",
  "Assistindo tutoriais do YouTube sem resultado",
  "Sem uma rota clara de crescimento",
];
const after = [
  "Estrutura de anúncios montada e funcionando",
  "Primeiro cliente ou venda fechada no digital",
  "Campanhas otimizadas gerando retorno real",
  "Caminho claro rumo aos R$10k/mês",
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
        A <span className="text-gradient-pink">transformação</span>
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
    </div>
  </section>
);

export default Transformation;
