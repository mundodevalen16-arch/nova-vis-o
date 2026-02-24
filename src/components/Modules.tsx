import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const modules = [
  { num: "01", icon: "🗺️", name: "TRILHA COMPLETA", desc: "Receba o mapa definitivo para sua jornada no tráfego pago. Por onde começar, o que aprender e em que ordem." },
  { num: "02", icon: "🛡️", name: "PERFIS BLINDADOS", desc: "Crie suas contas no Meta Ads sem risco de bloqueio ou restrição. A base que 99% das pessoas ignora." },
  { num: "03", icon: "📱", name: "INSTAGRAM & PÁGINA PERFEITOS", desc: "Configure seu Instagram e Página do Facebook para vender todos os dias, do jeito certo." },
  { num: "04", icon: "🎯", name: "DOMÍNIO DE PÚBLICOS", desc: "Do básico ao avançado — descubra como encontrar as pessoas certas para o seu produto ou serviço." },
  { num: "05", icon: "🔓", name: "DESBLOQUEIO DE CONTAS", desc: "Aprenda a recuperar contas bloqueadas no Meta Ads e como nunca mais passar por isso." },
  { num: "06", icon: "🏪", name: "NEGÓCIOS LOCAIS", desc: "O passo a passo para atrair clientes locais usando Meta Ads, do zero ao avançado." },
  { num: "07", icon: "💰", name: "VENDAS ONLINE", desc: "Os segredos das estruturas que vendem todos os dias no digital. Do criativo à campanha." },
  { num: "08", icon: "🧪", name: "TESTES QUE GERAM RESULTADOS", desc: "Como testar públicos, criativos e ofertas de forma inteligente e rápida." },
  { num: "09", icon: "🔮", name: "META PIXEL & API", desc: "Configure e otimize o Pixel e a API de Conversões para extrair o máximo de cada real investido." },
  { num: "10", icon: "📊", name: "LEITURA DE MÉTRICAS", desc: "Entenda cada número das suas campanhas e tome decisões baseadas em dados." },
  { num: "11", icon: "⚙️", name: "OTIMIZAÇÃO DE CAMPANHAS", desc: "Mais importante que criar é saber otimizar. Aprenda a escalar o que funciona." },
  { num: "12", icon: "🏗️", name: "ESTRUTURA 2026", desc: "A estrutura de campanhas mais atualizada do mercado para vender no digital em 2026." },
];

const ModuleCard = ({ mod, index }: { mod: typeof modules[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    whileHover={{ scale: 1.03 }}
    className="min-w-[280px] md:min-w-[320px] card-glass rounded-2xl p-6 cursor-pointer transition-shadow duration-300 hover:glow-purple flex flex-col"
  >
    <div className="text-4xl mb-4">{mod.icon}</div>
    <span className="text-xs font-body font-semibold text-primary/80 uppercase tracking-widest mb-2">
      Módulo {mod.num}
    </span>
    <h3 className="font-display text-xl md:text-2xl mb-3 leading-tight">{mod.name}</h3>
    <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">{mod.desc}</p>
  </motion.div>
);

const Modules = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl text-center"
        >
          O QUE VOCÊ VAI <span className="text-gradient-purple">DOMINAR</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground font-body mt-4"
        >
          12 módulos do zero ao avançado • Arraste para explorar →
        </motion.p>
      </div>

      <motion.div
        ref={containerRef}
        className="flex gap-6 px-4 md:px-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-4"
        drag="x"
        dragConstraints={containerRef}
        style={{ touchAction: "pan-y" }}
      >
        {modules.map((mod, i) => (
          <ModuleCard key={mod.num} mod={mod} index={i} />
        ))}
      </motion.div>
    </section>
  );
};

export default Modules;
