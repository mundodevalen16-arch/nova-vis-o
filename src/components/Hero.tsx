import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/10 blur-[200px] animate-ambient" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[150px] animate-ambient" style={{ animationDelay: "4s" }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.1) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      <motion.div style={{ y: titleY, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground tracking-widest uppercase">
            Domine o Tráfego Pago em 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight mb-6"
        >
          <span className="text-gradient-white">DO ZERO</span>
          <br />
          <span className="text-gradient-pink">AOS R$10K</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.4 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10 font-light"
        >
          O único curso que te leva do absoluto zero ao domínio completo do tráfego pago no Meta Ads.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#preco"
            className="px-10 py-4 rounded-full bg-gradient-pink text-primary-foreground font-bold text-base animate-glow-pulse hover:scale-105 transition-transform cursor-pointer"
          >
            QUERO ENTRAR AGORA
          </a>
          <span className="text-sm text-muted-foreground">R$399/ano • 7 dias de garantia</span>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.7 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {["🎯 Meta Ads", "💰 Vendas Online", "🏪 Negócios Locais", "📊 Métricas", "⚙️ Otimização"].map((label, i) => (
            <div
              key={i}
              className="glass rounded-full px-5 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:border-primary/20 transition-all duration-300 cursor-pointer"
            >
              {label}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
