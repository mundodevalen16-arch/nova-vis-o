import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import bielImg from "@/assets/biel-lifestyle-1.jpeg";

const smooth = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };

const stats = [
  { value: "5+", label: "Anos no digital" },
  { value: "R$10M+", label: "Em faturamento gerado" },
  { value: "500+", label: "Alunos transformados" },
  { value: "100%", label: "Método atualizado 2026" },
  { value: "24/7", label: "Suporte e comunidade" },
];

const credentials = [
  "Milionário antes dos 25 🏌🏻",
  "Construiu 7 dígitos com Meta Ads",
  "Direct Response Specialist",
  "Mentor de +500 alunos ativos",
  "Escala previsível com execução real",
];

const statScatter = [
  { x: -200, y: -300, rotate: -40 },
  { x: 200, y: -250, rotate: 35 },
  { x: -250, y: 200, rotate: -25 },
  { x: 300, y: 150, rotate: 45 },
  { x: -180, y: -200, rotate: 30 },
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
    <section ref={ref} className="py-10 md:py-20 px-6 relative overflow-hidden" style={{ perspective: "1500px" }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={smooth}
          className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tight"
        >
          👤 Quem está <span className="text-gradient-pink">por trás</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto text-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
            className="w-64 md:w-80 mx-auto mb-10 rounded-3xl overflow-hidden ring-2 ring-primary/30 ring-offset-4 ring-offset-background"
            style={{
              boxShadow: "0 0 60px hsl(328 100% 48% / 0.2)",
            }}
          >
            <img src={bielImg} alt="iBielZz" className="w-full h-full object-cover object-top" />
          </motion.div>

          {/* Name zooms in dramatically — graffiti style with paint drips */}
          <div className="relative inline-block mb-2">
            <motion.h3
              style={{ 
                scale: nameScale, 
                opacity: nameOpacity,
                filter: useTransform(nameBlur, v => `blur(${v}px) drop-shadow(0 0 30px hsl(300 100% 50% / 0.7)) drop-shadow(0 0 60px hsl(280 100% 55% / 0.4)) drop-shadow(3px 3px 0px hsl(260 100% 20% / 0.8))`),
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                fontStyle: "italic",
                letterSpacing: "-0.02em",
                transform: "skewX(-12deg)",
                background: "linear-gradient(135deg, hsl(320 100% 60%), hsl(290 100% 75%), hsl(260 100% 80%), hsl(220 100% 65%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-6xl md:text-8xl font-black relative"
            >
              iBielZz
            </motion.h3>

            {/* Paint drips */}
            <motion.div
              style={{ opacity: nameOpacity }}
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
            >
              {/* Drip 1 — left */}
              <div
                className="absolute"
                style={{
                  left: "18%",
                  top: "-2px",
                  width: "4px",
                  height: "32px",
                  borderRadius: "0 0 4px 4px",
                  background: "linear-gradient(180deg, hsl(320 100% 60%), hsl(320 100% 50% / 0.3))",
                  animation: "drip-grow 2s ease-out 0.5s both",
                }}
              />
              {/* Drip 2 — center-left */}
              <div
                className="absolute"
                style={{
                  left: "35%",
                  top: "-4px",
                  width: "3px",
                  height: "48px",
                  borderRadius: "0 0 3px 3px",
                  background: "linear-gradient(180deg, hsl(290 100% 75%), hsl(290 100% 60% / 0.2))",
                  animation: "drip-grow 2.5s ease-out 0.8s both",
                }}
              />
              {/* Drip 3 — center */}
              <div
                className="absolute"
                style={{
                  left: "52%",
                  top: "-1px",
                  width: "5px",
                  height: "40px",
                  borderRadius: "0 0 5px 5px",
                  background: "linear-gradient(180deg, hsl(260 100% 80%), hsl(260 100% 65% / 0.25))",
                  animation: "drip-grow 2.2s ease-out 0.3s both",
                }}
              />
              {/* Drip 4 — right */}
              <div
                className="absolute"
                style={{
                  left: "72%",
                  top: "-3px",
                  width: "3px",
                  height: "55px",
                  borderRadius: "0 0 4px 4px",
                  background: "linear-gradient(180deg, hsl(320 100% 60%), hsl(300 100% 50% / 0.15))",
                  animation: "drip-grow 3s ease-out 1s both",
                }}
              />
              {/* Drip 5 — far right, small */}
              <div
                className="absolute"
                style={{
                  left: "85%",
                  top: "0px",
                  width: "3px",
                  height: "22px",
                  borderRadius: "0 0 3px 3px",
                  background: "linear-gradient(180deg, hsl(220 100% 65%), hsl(220 100% 55% / 0.2))",
                  animation: "drip-grow 1.8s ease-out 1.2s both",
                }}
              />
            </motion.div>
          </div>

          <motion.div style={{ y: bioY, opacity: bioOpacity }}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.3em] mb-8">
              Especialista em Meta Ads e Direct Response
            </p>

            <div className="space-y-5 text-foreground/60 text-sm font-light leading-relaxed max-w-xl mx-auto mb-8">
              <p className="text-foreground/90 font-semibold text-lg">
                Milionário antes dos 25. 🏌🏻
              </p>
              <p>
                Enquanto a maioria ainda tava decidindo o que fazer da vida, Biel já tinha 
                <span className="text-foreground/90 font-medium"> ultrapassado os 7 dígitos</span> — 
                com nada além de um notebook e Meta Ads.
              </p>
              <p>
                Mais de <span className="text-foreground/90 font-medium">R$10 milhões em faturamento gerado</span>.
                Mais de <span className="text-foreground/90 font-medium">500 alunos</span> que saíram do zero 
                e construíram renda real — não promessa de guru.
              </p>
              <p>
                Começou do absoluto zero. Sem conexão. Sem herança. Sem atalho.
                Só <span className="text-foreground/90 font-medium">estratégia, execução e obsessão por resultado</span>.
              </p>
              <p className="text-foreground/40">
                Não ensino teoria. Ensino o que funciona.<br />
                O que eu aplico. O que gera resultado. O que escala.
              </p>
              <p className="text-foreground/90 font-semibold text-base italic">
                "Eu não vendo sonho — entrego o mapa, a bússola e caminho junto."
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
                viewport={{ once: true, margin: "-50px" }}
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
