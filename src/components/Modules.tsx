import { motion } from "framer-motion";
import { useRef } from "react";

const modules = [
  { num: "01", icon: "🗺️", name: "TRILHA COMPLETA", desc: "O mapa definitivo para sua jornada no tráfego pago." },
  { num: "02", icon: "🛡️", name: "PERFIS BLINDADOS", desc: "Crie contas no Meta Ads sem risco de bloqueio." },
  { num: "03", icon: "📱", name: "INSTAGRAM PERFEITO", desc: "Configure tudo para vender todos os dias." },
  { num: "04", icon: "🎯", name: "DOMÍNIO DE PÚBLICOS", desc: "Encontre as pessoas certas para o seu produto." },
  { num: "05", icon: "🔓", name: "DESBLOQUEIO", desc: "Recupere contas bloqueadas no Meta Ads." },
  { num: "06", icon: "🏪", name: "NEGÓCIOS LOCAIS", desc: "Atraia clientes locais com Meta Ads." },
  { num: "07", icon: "💰", name: "VENDAS ONLINE", desc: "Estruturas que vendem todos os dias no digital." },
  { num: "08", icon: "🧪", name: "TESTES INTELIGENTES", desc: "Teste públicos e criativos de forma rápida." },
  { num: "09", icon: "🔮", name: "META PIXEL & API", desc: "Extraia o máximo de cada real investido." },
  { num: "10", icon: "📊", name: "MÉTRICAS", desc: "Decisões baseadas em dados, não achismos." },
  { num: "11", icon: "⚙️", name: "OTIMIZAÇÃO", desc: "Escale o que funciona e corte o que drena." },
  { num: "12", icon: "🏗️", name: "ESTRUTURA 2026", desc: "A estrutura mais atualizada do mercado." },
];

const Modules = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="modulos" className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl text-center mb-4"
          style={{ textShadow: "0 4px 20px hsl(var(--digital-purple) / 0.3)" }}
        >
          O QUE VOCÊ VAI <span className="text-gradient-purple">DOMINAR</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground font-body"
        >
          12 módulos completos • Arraste para explorar →
        </motion.p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 px-4 md:px-8 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing"
      >
        {modules.map((mod, i) => (
          <motion.div
            key={mod.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.04, y: -4 }}
            className="cinematic-card min-w-[260px] md:min-w-[300px] flex-shrink-0 cursor-pointer group"
          >
            <div className="absolute inset-0 bg-gradient-hero opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="relative z-10 p-6">
              <div className="text-3xl mb-3">{mod.icon}</div>
              <span className="font-body text-[10px] font-bold text-foreground/40 uppercase tracking-[0.25em]">
                Módulo {mod.num}
              </span>
              <h3 className="font-display text-2xl mt-1 mb-2 leading-tight">{mod.name}</h3>
              <p className="font-body text-xs text-foreground/50 leading-relaxed">{mod.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Modules;
