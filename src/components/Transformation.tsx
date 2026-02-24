import { motion } from "framer-motion";

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

const Transformation = () => {
  return (
    <section id="transformacao" className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl text-center mb-16"
          style={{ textShadow: "0 4px 20px hsl(var(--digital-purple) / 0.3)" }}
        >
          A <span className="text-gradient-purple">TRANSFORMAÇÃO</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ANTES */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="cinematic-card"
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, hsl(0 0% 15% / 0.6), hsl(var(--card)))" }} />
            <div className="relative z-10 p-8">
              <span className="inline-block font-body text-xs font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground mb-4 uppercase tracking-wider">
                Antes
              </span>
              <ul className="space-y-4 font-body">
                {before.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/40">
                    <span className="text-muted-foreground/50 mt-1 text-sm">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* DEPOIS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="cinematic-card"
          >
            <div className="absolute inset-0 bg-gradient-hero opacity-70" />
            <div className="relative z-10 p-8">
              <span className="inline-block font-body text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary mb-4 uppercase tracking-wider">
                Depois
              </span>
              <ul className="space-y-4 font-body">
                {after.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/90">
                    <span className="text-primary mt-1">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Transformation;
