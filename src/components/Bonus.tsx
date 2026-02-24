import { motion } from "framer-motion";

const bonuses = [
  {
    icon: "🎁",
    title: "Comunidade no WhatsApp & Discord",
    desc: "Acesso ao grupo exclusivo de alunos para tirar dúvidas, trocar experiências e fazer networking com quem está no mesmo caminho.",
  },
  {
    icon: "🎁",
    title: "Sorteio de Setup",
    desc: "Participação automática em sorteios de itens do setup pessoal do iBielZz — equipamentos reais usados por quem já chegou lá.",
  },
  {
    icon: "🎁",
    title: "Atualizações Gratuitas",
    desc: "O digital muda rápido. Você recebe todas as atualizações de conteúdo sem pagar nada a mais — sempre na vanguarda de 2026.",
  },
];

const Bonus = () => {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl text-center mb-4"
        >
          BÔNUS <span className="text-gradient-purple">EXCLUSIVOS</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground font-body mb-16"
        >
          Incluídos sem custo adicional
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {bonuses.map((bonus, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass-gold rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="text-4xl mb-4">{bonus.icon}</div>
              <h3 className="font-display text-xl md:text-2xl mb-3 text-bonus-gold">{bonus.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{bonus.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bonus;
