import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const forWho = [
  "Quem quer ter uma renda extra sem sair de casa",
  "Quem nunca fez um anúncio na vida e quer começar do zero",
  "Quem tem um negócio local e quer atrair mais clientes",
  "Quem tenta vender no digital mas não sabe o que está errando",
  "Quem quer dominar o Meta Ads de verdade",
  "Quem busca uma habilidade que paga cada vez mais",
];

const notForWho = [
  "Quem quer resultado sem colocar esforço",
  "Quem não está disposto a aprender e aplicar",
  "Quem acha que marketing digital é 'coisa de sorte'",
];

const TargetAudience = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tight"
      >
        Para quem é <span className="text-gradient-pink">isso?</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        <SpotlightCard>
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6" style={{ color: "hsl(150 70% 55%)" }}>
              ✓ Para quem É
            </h3>
            <ul className="space-y-4">
              {forWho.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/70 text-sm font-light">
                  <span className="mt-0.5" style={{ color: "hsl(150 70% 55%)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SpotlightCard>

        <SpotlightCard delay={0.1}>
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6" style={{ color: "hsl(0 70% 60%)" }}>
              ✕ Para quem NÃO É
            </h3>
            <ul className="space-y-4">
              {notForWho.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/40 text-sm font-light">
                  <span className="mt-0.5" style={{ color: "hsl(0 70% 60%)" }}>✕</span>
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

export default TargetAudience;
