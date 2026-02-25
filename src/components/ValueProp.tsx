import { motion } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const delivers = [
  { icon: "🗺️", text: "A rota exata para sair do zero", detail: "Sem achismo, sem tentativa e erro." },
  { icon: "🏗️", text: "Estrutura validada de campanhas", detail: "Copie, cole e adapte pro seu nicho." },
  { icon: "⚙️", text: "Configuração profissional de contas", detail: "Perfis blindados contra bloqueios." },
  { icon: "📊", text: "Leitura estratégica de métricas", detail: "Saiba exatamente onde está o lucro." },
  { icon: "🚀", text: "Otimização para escalar resultados", detail: "Dobre o resultado sem dobrar o investimento." },
  { icon: "🧪", text: "Testes que eliminam desperdício", detail: "Descubra o que funciona antes de gastar." },
  { icon: "💰", text: "Funis que convertem no automático", detail: "Venda enquanto dorme, viaja ou treina." },
  { icon: "🔮", text: "Pixel e API configurados do jeito certo", detail: "Dados precisos = decisões certeiras." },
  { icon: "🎯", text: "Segmentação cirúrgica de público", detail: "Apareça só pra quem está pronto pra comprar." },
];

const scatterPositions = [
  { x: -220, y: -170, rotate: -18, scale: 0.72 },
  { x: 240, y: -120, rotate: 22, scale: 0.75 },
  { x: -190, y: 210, rotate: -16, scale: 0.74 },
  { x: 220, y: 170, rotate: 18, scale: 0.76 },
  { x: 0, y: -240, rotate: -12, scale: 0.7 },
  { x: -250, y: 70, rotate: 14, scale: 0.73 },
  { x: 190, y: -230, rotate: -20, scale: 0.72 },
  { x: -130, y: 240, rotate: 15, scale: 0.75 },
  { x: 150, y: -180, rotate: -17, scale: 0.74 },
];

const smooth = { type: "spring" as const, stiffness: 60, damping: 20, mass: 1 };

const ValueProp = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-10 md:py-12 px-6 relative overflow-hidden" style={{ perspective: "1500px" }}>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 1.4, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={smooth}
          className="text-center mb-5"
        >
          <p className="text-xs text-primary font-bold uppercase tracking-[0.3em] mb-4">⚡ NÃO É SOBRE APRENDER.</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-5">
            É sobre <span className="text-gradient-pink">DOMINAR.</span>
          </h2>
          <div className="max-w-xl mx-auto space-y-3 text-sm text-foreground/50 font-light leading-relaxed">
            <p>
              Todo mundo fala de tráfego pago.
              <br />
              Poucos sabem estruturar campanhas que realmente vendem.
            </p>
            <p>O 360 Digital não ensina só a "apertar botão".</p>
            <p className="text-foreground/70 font-medium">Ele te entrega:</p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {delivers.map((item, i) => {
            const scatter = scatterPositions[i];
            return (
              <motion.div
                key={i}
                initial={{ x: scatter.x, y: scatter.y, rotate: scatter.rotate, scale: scatter.scale, opacity: 0 }}
                whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40px", amount: 0.2 }}
                transition={{ type: "spring", stiffness: 70, damping: 20, mass: 1.05, delay: i * 0.04 }}
              >
                <SpotlightCard animateIn={false}>
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
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 50, damping: 18 }}
          className="max-w-2xl mx-auto text-center mb-10 premium-card border-gradient p-8"
        >
          <p className="text-lg md:text-xl font-bold text-foreground/90 mb-2">"Não é curso de guru. É sistema de execução."</p>
          <p className="text-xs text-muted-foreground font-light">
            Cada módulo foi desenhado para você aplicar no mesmo dia — e ver resultado na mesma semana.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
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
