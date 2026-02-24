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

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const Modules = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="modulos" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-2"
        >
          <p className="text-xs text-primary font-bold uppercase tracking-[0.3em] mb-4">🧠 O QUE VOCÊ VAI DOMINAR</p>
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            Blocos <span className="text-gradient-pink">estratégicos</span>
          </h2>
          <div className="space-y-1 text-sm text-muted-foreground font-light">
            <p>Não são "aulinhas". São blocos estratégicos de evolução.</p>
            <p className="text-xs mt-2">Arraste para explorar →</p>
          </div>
        </motion.div>
      </div>

      {/* Draggable horizontal carousel */}
      <div ref={constraintsRef} className="overflow-hidden px-6">
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          className="flex gap-5 cursor-grab active:cursor-grabbing pb-4"
          style={{ width: "max-content" }}
        >
          {modules.map((mod, i) => (
            <motion.div
              key={mod.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.04 }}
              whileHover={{ scale: 1.04, y: -6 }}
              className="premium-card border-gradient min-w-[260px] md:min-w-[300px] flex-shrink-0 cursor-pointer group"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: "radial-gradient(circle at 50% 50%, hsl(328 100% 48% / 0.06), transparent 70%)",
              }} />
              <div className="relative z-10 p-6">
                <div className="text-3xl mb-3">{mod.icon}</div>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.25em]">
                  Módulo {mod.num}
                </span>
                <h3 className="text-xl font-bold mt-1 mb-2 leading-tight">{mod.name}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">{mod.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-6 mt-8 text-center space-y-1 text-sm text-foreground/50 font-light"
      >
        <p>Você não sai sabendo "um pouco".</p>
        <p className="text-foreground/80 font-semibold">Você sai com estrutura montada.</p>
      </motion.div>
    </section>
  );
};

export default Modules;
