import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const bonuses = [
  { icon: "💬", title: "Comunidade WhatsApp & Discord", desc: "Grupo exclusivo de alunos para tirar dúvidas, trocar experiências e networking." },
  { icon: "🎁", title: "Sorteio de Setup", desc: "Participação automática em sorteios de itens do setup pessoal do iBielZz." },
  { icon: "🔄", title: "Atualizações Gratuitas", desc: "Receba todas as atualizações de conteúdo sem pagar nada a mais." },
];

const Bonus = () => (
  <section id="bonus" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
          Bônus <span className="text-gradient-pink">exclusivos</span>
        </h2>
        <p className="text-muted-foreground font-light text-sm">Incluídos sem custo adicional</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {bonuses.map((bonus, i) => (
          <SpotlightCard key={i} delay={i * 0.08}>
            <div className="p-7">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl mb-4">
                {bonus.icon}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "hsl(var(--bonus-gold))" }}>
                {bonus.title}
              </h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">{bonus.desc}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  </section>
);

export default Bonus;
