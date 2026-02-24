import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const smooth = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };

const delivers = [
  { icon: "🗺️", text: "A rota exata para sair do zero", detail: "Sem achismo, sem tentativa e erro." },
  { icon: "🏗️", text: "Estrutura validada de campanhas", detail: "Copie, cole e adapte pro seu nicho." },
  { icon: "⚙️", text: "Configuração profissional de contas", detail: "Perfis blindados contra bloqueios." },
  { icon: "📊", text: "Leitura estratégica de métricas", detail: "Saiba exatamente onde está o lucro." },
  { icon: "🚀", text: "Otimização para escalar resultados", detail: "Dobre o resultado sem dobrar o investimento." },
  { icon: "🧪", text: "Testes que eliminam desperdício", detail: "Descubra o que funciona antes de gastar." },
  { icon: "💰", text: "Funis que convertem no automático", detail: "Venda enquanto dorme, viaja ou treina." },
  { icon: "🔮", text: "Pixel e API configurados do jeito certo", detail: "Dados precisos = decisões certeiras." },
];

const scatterPositions = [
  { x: -400, y: -300, rotate: -45, scale: 0.3 },
  { x: 500, y: -200, rotate: 60, scale: 0.2 },
  { x: -300, y: 400, rotate: -30, scale: 0.4 },
  { x: 400, y: 300, rotate: 50, scale: 0.3 },
  { x: 0, y: -500, rotate: -20, scale: 0.2 },
  { x: -500, y: 100, rotate: 35, scale: 0.3 },
  { x: 350, y: -400, rotate: -55, scale: 0.2 },
  { x: -200, y: 500, rotate: 40, scale: 0.3 },
];

const ValueProp = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  const titleScale = useTransform(scrollYProgress, [0.05, 0.3], [2.5, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.3], [0, 0.6, 1]);
  const titleBlur = useTransform(scrollYProgress, [0.05, 0.3], [15, 0]);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden" style={{ perspective: "1500px" }}>
      {/* Explosion flash */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.12, 0.22, 0.35], [0, 0.5, 0]) }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, hsl(328 100% 48% / 0.4), hsl(270 80% 55% / 0.2), transparent)" }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          style={{ 
            scale: titleScale, 
            opacity: titleOpacity,
            filter: useTransform(titleBlur, v => `blur(${v}px)`),
          }}
          className="text-center mb-16"
        >
          <p className="text-xs text-primary font-bold uppercase tracking-[0.3em] mb-4">
            ⚡ NÃO É SOBRE APRENDER.
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            É sobre <span className="text-gradient-pink">DOMINAR.</span>
          </h2>
          <div className="max-w-xl mx-auto space-y-3 text-sm text-foreground/50 font-light leading-relaxed">
            <p>Todo mundo fala de tráfego pago.<br />Poucos sabem estruturar campanhas que realmente vendem.</p>
            <p>O 360 Digital não ensina só a "apertar botão".</p>
            <p className="text-foreground/70 font-medium">Ele te entrega:</p>
          </div>
        </motion.div>

        {/* Cards explode in — NO once:true for bidirectional */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {delivers.map((item, i) => {
            const scatter = scatterPositions[i];
            return (
              <motion.div
                key={i}
                initial={{ 
                  x: scatter.x, 
                  y: scatter.y, 
                  rotate: scatter.rotate, 
                  scale: scatter.scale, 
                  opacity: 0 
                }}
                whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ margin: "-80px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 40, 
                  damping: 12, 
                  mass: 1.5,
                  delay: i * 0.06,
                }}
              >
                <SpotlightCard>
                  <div className="p-5 flex flex-col gap-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm text-foreground/90 font-semibold leading-tight">{item.text}</span>
                    <span className="text-xs text-muted-foreground font-light leading-relaxed">{item.detail}</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Reforço visual com frase de impacto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-60px" }}
          transition={{ type: "spring", stiffness: 50, damping: 18 }}
          className="max-w-2xl mx-auto text-center mb-12 premium-card border-gradient p-8"
        >
          <p className="text-lg md:text-xl font-bold text-foreground/90 mb-2">
            "Não é curso de guru. É sistema de execução."
          </p>
          <p className="text-xs text-muted-foreground font-light">
            Cada módulo foi desenhado para você aplicar no mesmo dia — e ver resultado na mesma semana.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-1 text-sm text-foreground/50 font-light"
        >
          <p>Você deixa de ser curioso.</p>
          <p className="text-foreground/80 font-semibold">E começa a agir como profissional.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProp;
