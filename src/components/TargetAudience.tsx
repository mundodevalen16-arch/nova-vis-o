import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const smooth = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };

const forWho = [
  "Pra quem quer gerar renda online",
  "Pra quem nunca fez um anúncio",
  "Pra quem já tentou e não conseguiu resultado",
  "Pra donos de negócios locais",
  "Pra quem quer uma habilidade que paga alto",
];

const notForWho = [
  "Não é pra quem quer dinheiro fácil",
  "Não é pra quem não aplica",
  "Não é pra quem terceiriza a própria responsabilidade",
];

const TargetAudience = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Left card flips in from the left
  const leftRotateY = useTransform(scrollYProgress, [0.05, 0.35], [90, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const leftX = useTransform(scrollYProgress, [0.05, 0.35], [-200, 0]);
  
  // Right card flips in from the right
  const rightRotateY = useTransform(scrollYProgress, [0.1, 0.4], [-90, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.4], [200, 0]);

  return (
    <section ref={ref} className="py-32 px-6 overflow-hidden" style={{ perspective: "1800px" }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={smooth}
          className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tight"
        >
          🎯 Pra quem <span className="text-gradient-pink">é?</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div style={{ rotateY: leftRotateY, opacity: leftOpacity, x: leftX, transformOrigin: "right center" }}>
            <SpotlightCard>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: "hsl(150 70% 55%)" }}>
                  ✔️ Para quem É
                </h3>
                <ul className="space-y-4">
                  {forWho.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/70 text-sm font-light">
                      <span className="mt-0.5" style={{ color: "hsl(150 70% 55%)" }}>✔️</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div style={{ rotateY: rightRotateY, opacity: rightOpacity, x: rightX, transformOrigin: "left center" }}>
            <SpotlightCard>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: "hsl(0 70% 60%)" }}>
                  ❌ Para quem NÃO É
                </h3>
                <ul className="space-y-4">
                  {notForWho.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/40 text-sm font-light">
                      <span className="mt-0.5" style={{ color: "hsl(0 70% 60%)" }}>❌</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-foreground/60 font-medium">Aqui você entra pra jogar sério.</p>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
