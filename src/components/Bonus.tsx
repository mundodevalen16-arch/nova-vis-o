import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const smooth = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };

const bonuses = [
  { icon: "💬", title: "Comunidade WhatsApp & Discord", desc: "Grupo exclusivo de alunos para tirar dúvidas, trocar experiências e networking." },
  { icon: "🎁", title: "Sorteio de equipamentos do setup", desc: "Participação automática em sorteios de itens do setup pessoal do iBielZz." },
  { icon: "🔄", title: "Atualizações gratuitas durante 2026", desc: "Receba todas as atualizações de conteúdo sem pagar nada a mais." },
];

const bonusScatter = [
  { x: -300, y: 200, rotate: -35 },
  { x: 0, y: -400, rotate: 20 },
  { x: 350, y: 250, rotate: 40 },
];

const Bonus = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const titleScale = useTransform(scrollYProgress, [0.05, 0.25], [1.8, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  return (
    <section ref={ref} id="bonus" className="py-16 md:py-20 px-6 overflow-hidden" style={{ perspective: "1500px" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="text-center mb-20"
        >
          <p className="text-xs text-primary font-bold uppercase tracking-[0.3em] mb-4">🎁 O QUE VEM JUNTO</p>
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            Bônus <span className="text-gradient-pink">exclusivos</span>
          </h2>
          <p className="text-muted-foreground font-light text-sm">Além dos 12 módulos completos</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10 justify-items-center max-w-4xl mx-auto [&>*:last-child]:sm:col-span-2 [&>*:last-child]:md:col-span-1 [&>*:last-child]:max-w-sm">
          {bonuses.map((bonus, i) => (
            <motion.div
              key={i}
              initial={{
                x: bonusScatter[i].x,
                y: bonusScatter[i].y,
                rotate: bonusScatter[i].rotate,
                scale: 0.3,
                opacity: 0,
              }}
              whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 45, damping: 14, mass: 1.3, delay: i * 0.08 }}
            >
              <SpotlightCard>
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
            </motion.div>
          ))}
        </div>

        {/* Community Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          <div className="max-w-3xl mx-auto text-center mb-8 space-y-3">
            <p className="text-xs text-primary font-bold uppercase tracking-[0.3em]">👀 POR DENTRO DA COMUNIDADE</p>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">
              Isso aqui <span className="text-gradient-pink">não é slide bonito.</span>
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
              É movimento real. Assista um trecho de uma pré-call exclusiva com membros do Networking 360.
              Aqui não tem guru vendendo sonho — tem gente executando, trocando ideia e escalando resultado de verdade.
            </p>
          </div>

          <div className="max-w-xs sm:max-w-sm mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10">
              <video
                controls
                preload="metadata"
                className="w-full aspect-[9/16] bg-black object-cover"
                poster=""
              >
                <source src="/videos/community-call.mp4" type="video/mp4" />
                Seu navegador não suporta vídeo.
              </video>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-1 text-sm text-foreground/50 font-light mt-14"
        >
          <p>Você não compra algo estático.</p>
          <p className="text-foreground/80 font-semibold">Você entra num ecossistema que respira resultado.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Bonus;
