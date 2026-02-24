import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-digital-purple/20 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-digital-violet/15 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-digital-blue/10 blur-[80px] animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--digital-purple)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--digital-purple)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
        >
          <span className="text-sm font-body text-foreground/90">🔥 Vagas Abertas — Turma 2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tight mb-6"
        >
          <span className="text-gradient-purple">DO ZERO</span>
          <br />
          <span className="text-foreground">AOS R$10K/MÊS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          O único curso que te leva do absoluto zero ao domínio completo do tráfego pago no Meta Ads — com estratégias testadas em 2026.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="#preco"
            className="inline-flex items-center justify-center px-10 py-5 rounded-xl font-body font-bold text-lg bg-gradient-purple text-foreground animate-glow-pulse hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            QUERO ENTRAR AGORA
          </a>
          <p className="text-sm text-muted-foreground font-body">
            Acesso anual por R$399,00 • Garantia de 7 dias
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground font-body"
        >
          <span>🔒 Pagamento Seguro</span>
          <span>📱 Acesso Vitalício</span>
          <span>⚡ Conteúdo 2026</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
