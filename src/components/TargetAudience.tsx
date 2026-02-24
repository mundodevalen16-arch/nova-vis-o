import { motion } from "framer-motion";

const forWho = [
  "Quem quer ter uma renda extra sem sair de casa",
  "Quem nunca fez um anúncio na vida e quer começar do zero",
  "Quem tem um negócio local e quer atrair mais clientes",
  "Quem tenta vender no digital mas não sabe o que está errando",
  "Quem quer dominar o Meta Ads de verdade, não só no básico",
  "Quem busca uma habilidade que paga cada vez mais",
];

const notForWho = [
  "Quem quer resultado sem colocar esforço",
  "Quem não está disposto a aprender e aplicar",
  "Quem acha que marketing digital é 'coisa de sorte'",
];

const TargetAudience = () => {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl text-center mb-16"
        >
          PARA QUEM É <span className="text-gradient-purple">ISSO?</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass rounded-2xl p-8"
          >
            <h3 className="font-display text-2xl md:text-3xl mb-6 text-green-400">✅ Para quem É</h3>
            <ul className="space-y-4 font-body">
              {forWho.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80">
                  <span className="text-green-400 mt-0.5">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass rounded-2xl p-8"
          >
            <h3 className="font-display text-2xl md:text-3xl mb-6 text-red-400">❌ Para quem NÃO É</h3>
            <ul className="space-y-4 font-body">
              {notForWho.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/60">
                  <span className="text-red-400 mt-0.5">❌</span>
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

export default TargetAudience;
