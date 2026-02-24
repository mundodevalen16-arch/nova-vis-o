import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12 md:py-20">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-digital-purple/15 blur-[150px] animate-ambient" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-digital-magenta/10 blur-[120px] animate-ambient" style={{ animationDelay: "3s" }} />
      </div>

      {/* Main cinematic card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="cinematic-card w-full max-w-6xl mx-auto relative"
      >
        {/* Card background gradient */}
        <div className="absolute inset-0 bg-gradient-hero" />

        {/* Starfield / noise overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(1px 1px at 20% 30%, white 0.5px, transparent 0),
            radial-gradient(1px 1px at 40% 70%, white 0.3px, transparent 0),
            radial-gradient(1px 1px at 60% 20%, white 0.5px, transparent 0),
            radial-gradient(1px 1px at 80% 50%, white 0.4px, transparent 0),
            radial-gradient(1px 1px at 10% 80%, white 0.3px, transparent 0),
            radial-gradient(1px 1px at 70% 90%, white 0.5px, transparent 0),
            radial-gradient(1px 1px at 30% 50%, white 0.4px, transparent 0),
            radial-gradient(1px 1px at 90% 10%, white 0.3px, transparent 0)`,
        }} />

        {/* Inner content */}
        <div className="relative z-10 px-8 md:px-16 pt-8 pb-10 min-h-[70vh] flex flex-col justify-between">
          {/* Nav bar */}
          <nav className="flex items-center justify-between mb-12">
            <div className="font-display text-2xl md:text-3xl tracking-wider">
              <span className="text-gradient-purple">360</span>
              <span className="text-foreground"> DIGITAL</span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-body text-sm text-foreground/70">
              <a href="#modulos" className="hover:text-foreground transition-colors">Módulos</a>
              <a href="#transformacao" className="hover:text-foreground transition-colors">Transformação</a>
              <a href="#bonus" className="hover:text-foreground transition-colors">Bônus</a>
              <a href="#preco" className="hover:text-foreground transition-colors font-semibold text-foreground">Garantir Vaga</a>
            </div>
          </nav>

          {/* Hero content */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-3"
            >
              <span className="font-body text-sm md:text-base text-foreground/50 uppercase tracking-[0.3em]">
                Domine o Tráfego Pago em 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight mb-6"
              style={{ textShadow: "0 4px 30px hsl(var(--digital-purple) / 0.4)" }}
            >
              DO ZERO
              <br />
              AOS R$10K
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="font-body text-base md:text-lg text-foreground/60 max-w-lg leading-relaxed mb-8"
            >
              O único curso que te leva do absoluto zero ao domínio completo do tráfego pago no Meta Ads.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#preco"
                className="inline-flex items-center px-8 py-4 rounded-2xl font-body font-bold text-base bg-gradient-purple text-foreground animate-glow-pulse hover:scale-105 transition-transform cursor-pointer"
              >
                QUERO ENTRAR AGORA
              </a>
              <span className="font-body text-sm text-foreground/40">R$399/ano • 7 dias de garantia</span>
            </motion.div>
          </div>

          {/* Bottom feature chips - like the "Popular clips" row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-10"
          >
            <p className="font-body text-sm text-foreground/50 mb-4">Destaques do curso</p>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {[
                { icon: "🎯", label: "Meta Ads do Zero" },
                { icon: "💰", label: "Vendas Online" },
                { icon: "🏪", label: "Negócios Locais" },
                { icon: "📊", label: "Métricas & Dados" },
                { icon: "⚙️", label: "Otimização" },
              ].map((chip, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl card-glass hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="text-lg">{chip.icon}</span>
                  <span className="font-body text-sm text-foreground/80 whitespace-nowrap">{chip.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
