import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PhoneNotifications from "@/components/SaleNotifications";
const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-4 py-12 md:py-20 pt-24">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-primary/12 blur-[180px] animate-ambient" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[120px] animate-ambient" style={{ animationDelay: "3s" }} />
      </div>

      {/* Main cinematic card — inspired by anime reference */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: cardY, scale: cardScale }}
        className="w-full max-w-6xl mx-auto relative rounded-[2.5rem] overflow-hidden"
        // Cinematic card styles
      >
        {/* Card border glow */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-foreground/[0.06]" style={{
          boxShadow: "0 30px 100px hsl(270 80% 40% / 0.3), 0 10px 40px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
        }} />

        {/* Card background gradient */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(160deg, hsl(270 60% 20% / 0.9), hsl(280 50% 15% / 0.8) 40%, hsl(328 70% 35% / 0.6) 80%, hsl(340 80% 45% / 0.4))",
        }} />

        {/* Starfield overlay */}
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: `radial-gradient(1px 1px at 15% 25%, white 0.5px, transparent 0),
            radial-gradient(1px 1px at 35% 65%, white 0.3px, transparent 0),
            radial-gradient(1px 1px at 55% 15%, white 0.5px, transparent 0),
            radial-gradient(1px 1px at 75% 45%, white 0.4px, transparent 0),
            radial-gradient(1px 1px at 5% 75%, white 0.3px, transparent 0),
            radial-gradient(1px 1px at 65% 85%, white 0.5px, transparent 0),
            radial-gradient(1px 1px at 25% 55%, white 0.4px, transparent 0),
            radial-gradient(1px 1px at 85% 10%, white 0.3px, transparent 0),
            radial-gradient(1px 1px at 45% 95%, white 0.2px, transparent 0),
            radial-gradient(1px 1px at 95% 70%, white 0.4px, transparent 0)`,
        }} />

        {/* Inner content */}
        <div className="relative z-10 px-8 md:px-16 pt-8 pb-10 min-h-[75vh] flex flex-col justify-between">
          {/* Nav inside card */}
          <nav className="flex items-center justify-between mb-12">
            <div className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-gradient-pink">360</span>
              <span className="text-foreground ml-1">DIGITAL</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-foreground/60 font-medium">
              <a href="#modulos" className="hover:text-foreground transition-colors duration-300">Módulos</a>
              <a href="#transformacao" className="hover:text-foreground transition-colors duration-300">Transformação</a>
              <a href="#bonus" className="hover:text-foreground transition-colors duration-300">Bônus</a>
              <a href="#preco" className="font-semibold text-foreground hover:text-primary transition-colors duration-300">Garantir Vaga</a>
            </div>
          </nav>

          {/* Hero body — two columns */}
          <div className="flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left: text */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.3 }}
                className="mb-3"
              >
                <span className="text-xs md:text-sm text-primary uppercase tracking-[0.3em] font-bold">
                  🚨 PARE DE TESTAR NO ESCURO.
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.4 }}
                className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-black leading-[0.85] tracking-tight mb-6"
                style={{ textShadow: "0 4px 30px hsl(328 100% 48% / 0.3)" }}
              >
                DO ZERO
                <br />
                <span className="text-gradient-pink">AOS R$10K/MÊS</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-sm md:text-base text-foreground/50 max-w-md leading-relaxed mb-8 font-light space-y-3"
              >
                <p>Você não precisa de mais vídeos soltos.<br />Você precisa de um <span className="text-foreground font-medium">método</span>.</p>
                <p>O 360 Digital foi criado para transformar completo iniciantes em pessoas capazes de gerar resultado real com Meta Ads — mesmo começando do absoluto zero.</p>
                <p className="text-foreground/40">Sem achismo. Sem fórmula mágica. Sem promessas vazias.</p>
                <p className="text-foreground/70 font-medium">Só estrutura. Estratégia. Execução.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.75 }}
                className="flex flex-col items-start gap-3"
              >
                <span className="text-xs text-primary font-bold uppercase tracking-[0.2em]">🔥 Turma 2026 aberta</span>
                <a
                  href="#preco"
                  className="px-8 py-4 rounded-full bg-gradient-pink text-primary-foreground font-bold text-sm animate-glow-pulse hover:scale-105 transition-transform cursor-pointer"
                >
                  👉 QUERO ENTRAR AGORA
                </a>
              </motion.div>
            </div>

            {/* Right: 3D phone mockup */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ ...spring, delay: 0.5 }}
              className="flex-shrink-0"
              style={{ perspective: "1200px" }}
            >
              <div
                className="relative animate-float"
                style={{
                  transform: "rotateY(-8deg) rotateX(5deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Phone shell */}
                <div
                  className="w-[220px] md:w-[260px] h-[440px] md:h-[520px] rounded-[2.5rem] overflow-hidden relative"
                  style={{
                    background: "linear-gradient(160deg, hsl(0 0% 12%), hsl(0 0% 6%))",
                    border: "3px solid hsl(0 0% 20%)",
                    boxShadow: "0 30px 80px hsl(0 0% 0% / 0.6), 0 0 60px hsl(328 100% 48% / 0.15), inset 0 1px 0 hsl(0 0% 30%)",
                  }}
                >
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20" />

                  {/* Screen content */}
                  <PhoneNotifications />
                </div>

                {/* Reflection glow underneath */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl" style={{
                  background: "hsl(328 100% 48% / 0.2)",
                }} />
              </div>
            </motion.div>
          </div>

          {/* Bottom marquee carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.9 }}
            className="mt-10 overflow-hidden"
          >
            <p className="text-xs text-foreground/40 mb-4 font-medium">Destaques do curso</p>
            <div className="relative">
              <div className="flex gap-3 animate-marquee w-max">
                {[
                  { icon: "🎯", label: "Meta Ads do Zero" },
                  { icon: "💰", label: "Vendas Online" },
                  { icon: "🏪", label: "Negócios Locais" },
                  { icon: "📊", label: "Métricas & Dados" },
                  { icon: "⚙️", label: "Otimização" },
                  { icon: "🛡️", label: "Perfis Blindados" },
                  { icon: "📱", label: "Instagram Perfeito" },
                  { icon: "🎯", label: "Meta Ads do Zero" },
                  { icon: "💰", label: "Vendas Online" },
                  { icon: "🏪", label: "Negócios Locais" },
                  { icon: "📊", label: "Métricas & Dados" },
                  { icon: "⚙️", label: "Otimização" },
                  { icon: "🛡️", label: "Perfis Blindados" },
                  { icon: "📱", label: "Instagram Perfeito" },
                ].map((chip, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl glass"
                  >
                    <span className="text-lg">{chip.icon}</span>
                    <span className="text-xs text-foreground/70 whitespace-nowrap font-medium">{chip.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
