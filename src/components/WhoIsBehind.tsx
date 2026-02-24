import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const smooth = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };

const stats = [
  { value: "5+", label: "Anos no digital" },
  { value: "R$10M+", label: "Em ads gerenciados" },
  { value: "500+", label: "Alunos transformados" },
  { value: "30+", label: "Nichos dominados" },
  { value: "100%", label: "Método atualizado 2026" },
  { value: "24/7", label: "Suporte e comunidade" },
];

const credentials = [
  "Meta Ads Expert — certificado oficial",
  "Direct Response Specialist",
  "Estrategista de funis de alta conversão",
  "Mentor de +500 alunos ativos",
  "Gestor de tráfego para grandes players",
];

const statScatter = [
  { x: -200, y: -300, rotate: -40 },
  { x: 200, y: -250, rotate: 35 },
  { x: -250, y: 200, rotate: -25 },
  { x: 300, y: 150, rotate: 45 },
  { x: -180, y: -200, rotate: 30 },
  { x: 250, y: 250, rotate: -35 },
];

const WhoIsBehind = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const nameScale = useTransform(scrollYProgress, [0.1, 0.35], [4, 1]);
  const nameOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const nameBlur = useTransform(scrollYProgress, [0.1, 0.35], [20, 0]);
  
  const bioY = useTransform(scrollYProgress, [0.2, 0.4], [60, 0]);
  const bioOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden" style={{ perspective: "1500px" }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={smooth}
          className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tight"
        >
          👤 Quem está <span className="text-gradient-pink">por trás</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto text-center">
          {/* Name zooms in dramatically */}
          <motion.h3
            style={{ 
              scale: nameScale, 
              opacity: nameOpacity,
              filter: useTransform(nameBlur, v => `blur(${v}px)`),
            }}
            className="text-5xl md:text-6xl font-black text-gradient-pink mb-2"
          >
            iBielZz
          </motion.h3>

          <motion.div style={{ y: bioY, opacity: bioOpacity }}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.3em] mb-8">
              Especialista em Meta Ads e Direct Response
            </p>

            <div className="space-y-5 text-foreground/60 text-sm font-light leading-relaxed max-w-xl mx-auto mb-8">
              <p>
                Mais de <span className="text-foreground/90 font-medium">5 anos no mercado digital</span>. 
                Especialista em Meta Ads e Direct Response com mais de 
                <span className="text-foreground/90 font-medium"> R$10 milhões gerenciados em anúncios</span>.
              </p>
              <p>
                Já ajudou <span className="text-foreground/90 font-medium">centenas de pessoas</span> a saírem do zero 
                e construírem renda consistente na internet — com método, estratégia e acompanhamento real.
              </p>
              <p>
                Atuou em <span className="text-foreground/90 font-medium">+30 nichos diferentes</span>, de infoprodutos 
                a e-commerce, dominando as particularidades de cada mercado e criando estratégias sob medida.
              </p>
              <p className="text-foreground/40">
                Não ensino teoria. Ensino o que funciona.<br />
                O que eu aplico. O que gera resultado. O que escala.
              </p>
              <p className="text-foreground/90 font-semibold text-base italic">
                "Não vendo promessa — entrego preparação para resultado."
              </p>
            </div>

            {/* Credentials list */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {credentials.map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 80, damping: 15 }}
                  className="px-4 py-1.5 text-xs font-medium rounded-full border border-primary/20 bg-primary/5 text-foreground/70"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Stats explode in from scattered positions — bidirectional */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: statScatter[i].x, 
                  y: statScatter[i].y, 
                  rotate: statScatter[i].rotate, 
                  scale: 0.3, 
                  opacity: 0 
                }}
                whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ margin: "-50px" }}
                transition={{ type: "spring", stiffness: 50, damping: 15, mass: 1.2, delay: i * 0.08 }}
                className="glass rounded-2xl p-5"
              >
                <p className="text-3xl font-black text-gradient-pink">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsBehind;
