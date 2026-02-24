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
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl text-center mb-16"
        >
          A <span className="text-gradient-purple">TRANSFORMAÇÃO</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-0 md:gap-0 relative">
          {/* Divider line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

          {/* ANTES */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:pr-12"
          >
            <h3 className="font-display text-2xl md:text-3xl text-muted-foreground mb-6">ANTES</h3>
            <ul className="space-y-4 font-body">
              {before.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground/70">
                  <span className="text-muted-foreground/50 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* DEPOIS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:pl-12"
          >
            <h3 className="font-display text-2xl md:text-3xl text-gradient-purple mb-6">DEPOIS</h3>
            <ul className="space-y-4 font-body">
              {after.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/90">
                  <span className="text-primary mt-1">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Transformation;
