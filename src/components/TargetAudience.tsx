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
          className="font-display text-5xl md:text-7xl text-center mb-16"
          style={{ textShadow: "0 4px 20px hsl(var(--digital-purple) / 0.3)" }}
        >
          PARA QUEM É <span className="text-gradient-purple">ISSO?</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="cinematic-card"
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, hsl(140 60% 20% / 0.15), hsl(var(--card)))" }} />
            <div className="relative z-10 p-8">
              <h3 className="font-display text-3xl mb-6" style={{ color: "hsl(140 70% 60%)" }}>Para quem É</h3>
              <ul className="space-y-4 font-body">
                {forWho.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/75">
                    <span className="mt-0.5" style={{ color: "hsl(140 70% 60%)" }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="cinematic-card"
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, hsl(0 60% 20% / 0.15), hsl(var(--card)))" }} />
            <div className="relative z-10 p-8">
              <h3 className="font-display text-3xl mb-6" style={{ color: "hsl(0 70% 65%)" }}>Para quem NÃO É</h3>
              <ul className="space-y-4 font-body">
                {notForWho.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/50">
                    <span className="mt-0.5" style={{ color: "hsl(0 70% 65%)" }}>✕</span>
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

export default TargetAudience;
