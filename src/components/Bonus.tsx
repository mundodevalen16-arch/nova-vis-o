import { motion } from "framer-motion";

const bonuses = [
  { icon: "🎁", title: "Comunidade WhatsApp & Discord", desc: "Grupo exclusivo de alunos para tirar dúvidas, trocar experiências e networking." },
  { icon: "🎁", title: "Sorteio de Setup", desc: "Participação automática em sorteios de itens do setup pessoal do iBielZz." },
  { icon: "🎁", title: "Atualizações Gratuitas", desc: "Receba todas as atualizações de conteúdo sem pagar nada a mais." },
];

const Bonus = () => {
  return (
    <section id="bonus" className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl text-center mb-4"
          style={{ textShadow: "0 4px 20px hsl(var(--digital-purple) / 0.3)" }}
        >
          BÔNUS <span className="text-gradient-purple">EXCLUSIVOS</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground font-body mb-16 text-sm"
        >
          Incluídos sem custo adicional
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5">
          {bonuses.map((bonus, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="cinematic-card cursor-pointer"
              style={{ borderColor: "hsl(var(--bonus-gold) / 0.2)" }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, hsl(43 80% 30% / 0.1), hsl(var(--card)))" }} />
              <div className="relative z-10 p-7">
                <div className="text-3xl mb-3">{bonus.icon}</div>
                <h3 className="font-display text-xl md:text-2xl mb-2 text-bonus-gold">{bonus.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{bonus.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bonus;
