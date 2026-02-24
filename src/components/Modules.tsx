import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const modules = [
  { num: "01", icon: "🗺️", name: "Trilha Completa", desc: "O mapa definitivo para sua jornada no tráfego pago." },
  { num: "02", icon: "🛡️", name: "Perfis Blindados", desc: "Crie contas no Meta Ads sem risco de bloqueio." },
  { num: "03", icon: "📱", name: "Instagram Perfeito", desc: "Configure tudo para vender todos os dias." },
  { num: "04", icon: "🎯", name: "Domínio de Públicos", desc: "Encontre as pessoas certas para o seu produto." },
  { num: "05", icon: "🔓", name: "Desbloqueio", desc: "Recupere contas bloqueadas no Meta Ads." },
  { num: "06", icon: "🏪", name: "Negócios Locais", desc: "Atraia clientes locais com Meta Ads." },
  { num: "07", icon: "💰", name: "Vendas Online", desc: "Estruturas que vendem todos os dias no digital." },
  { num: "08", icon: "🧪", name: "Testes Inteligentes", desc: "Teste públicos e criativos de forma rápida." },
  { num: "09", icon: "🔮", name: "Meta Pixel & API", desc: "Extraia o máximo de cada real investido." },
  { num: "10", icon: "📊", name: "Métricas", desc: "Decisões baseadas em dados, não achismos." },
  { num: "11", icon: "⚙️", name: "Otimização", desc: "Escale o que funciona e corte o que drena." },
  { num: "12", icon: "🏗️", name: "Estrutura 2026", desc: "A estrutura mais atualizada do mercado." },
];

// Sticky stacking cards — show 4 at a time in a stacked layout
const stickyModules = modules.slice(0, 6);

const StickyCard = ({ mod, index }: { mod: typeof modules[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  return (
    <div ref={ref} className="sticky" style={{ top: `${120 + index * 30}px` }}>
      <motion.div style={{ scale, opacity }} className="premium-card border-gradient p-8 mb-4">
        <div className="flex items-start gap-5">
          <span className="text-4xl">{mod.icon}</span>
          <div>
            <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Módulo {mod.num}
            </span>
            <h3 className="text-xl font-bold mt-1 mb-2 text-foreground">{mod.name}</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">{mod.desc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Modules = () => {
  return (
    <section id="modulos" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            O que você vai{" "}
            <span className="text-gradient-pink">dominar</span>
          </h2>
          <p className="text-muted-foreground font-light">12 módulos completos • Do zero ao avançado</p>
        </motion.div>

        {/* Sticky stacking section */}
        <div className="max-w-2xl mx-auto mb-20">
          {stickyModules.map((mod, i) => (
            <StickyCard key={mod.num} mod={mod} index={i} />
          ))}
        </div>

        {/* Grid for the remaining */}
        <div className="grid md:grid-cols-3 gap-4">
          {modules.slice(6).map((mod, i) => (
            <SpotlightCard key={mod.num} delay={i * 0.05}>
              <div className="p-6">
                <span className="text-3xl">{mod.icon}</span>
                <span className="block text-[10px] font-medium text-muted-foreground tracking-widest uppercase mt-3">
                  Módulo {mod.num}
                </span>
                <h3 className="text-lg font-bold mt-1 mb-2">{mod.name}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">{mod.desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;
