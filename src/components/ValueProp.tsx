import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const delivers = [
  { icon: "🗺️", text: "A rota exata para sair do zero" },
  { icon: "🏗️", text: "Estrutura validada de campanhas" },
  { icon: "⚙️", text: "Configuração profissional de contas" },
  { icon: "📊", text: "Leitura estratégica de métricas" },
  { icon: "🚀", text: "Otimização para escalar resultados" },
];

const ValueProp = () => (
  <section className="py-32 px-6">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-center mb-16"
      >
        <p className="text-xs text-primary font-bold uppercase tracking-[0.3em] mb-4">⚡ NÃO É SOBRE APRENDER.</p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          É sobre <span className="text-gradient-pink">DOMINAR.</span>
        </h2>
        <div className="max-w-xl mx-auto space-y-3 text-sm text-foreground/50 font-light leading-relaxed">
          <p>Todo mundo fala de tráfego pago.<br />Poucos sabem estruturar campanhas que realmente vendem.</p>
          <p>O 360 Digital não ensina só a "apertar botão".</p>
          <p className="text-foreground/70 font-medium">Ele te entrega:</p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {delivers.map((item, i) => (
          <SpotlightCard key={i} delay={i * 0.06}>
            <div className="p-6 flex items-center gap-4">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm text-foreground/80 font-medium">{item.text}</span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-1 text-sm text-foreground/50 font-light"
      >
        <p>Você deixa de ser curioso.</p>
        <p className="text-foreground/80 font-semibold">E começa a agir como profissional.</p>
      </motion.div>
    </div>
  </section>
);

export default ValueProp;
