import { motion } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const included = [
  "12 Módulos completos do zero ao avançado",
  "Conteúdo 100% atualizado para 2026",
  "Área de membros personalizada",
  "Comunidade no WhatsApp & Discord",
  "Sorteios de equipamentos do setup",
  "Atualizações gratuitas inclusas",
];

const Price = () => (
  <section id="preco" className="py-32 px-6 relative">
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[200px] animate-ambient" />
    </div>

    <div className="max-w-xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={spring}
        className="premium-card border-gradient animate-glow-pulse"
      >
        <div className="p-8 md:p-12 text-center">
          <p className="text-xs text-primary font-bold uppercase tracking-[0.3em] mb-6">💰 INVESTIMENTO</p>
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">
            Acesso completo ao{" "}
            <span className="text-gradient-pink">360 Digital</span>
          </h2>

          <ul className="space-y-3 mb-10 text-left max-w-sm mx-auto">
            {included.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/70 font-light">
                <span className="mt-0.5" style={{ color: "hsl(150 70% 55%)" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground line-through text-lg mb-1">De R$997</p>
          <p className="text-xs text-primary uppercase tracking-[0.3em] font-medium mb-3">Por apenas:</p>

          <div className="mb-2">
            <span className="text-7xl md:text-8xl font-black text-gradient-pink">R$399</span>
            <span className="text-xl text-muted-foreground font-light"> / ano</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 font-light">Menos de R$1,10 por dia.</p>
          <p className="text-sm text-foreground/50 font-light mb-10">
            Você gasta isso com coisa que não muda sua vida.<br />
            <span className="text-foreground/80 font-medium">Isso pode mudar.</span>
          </p>

          <a
            href="#"
            className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-gradient-pink text-primary-foreground font-bold text-lg animate-glow-pulse hover:scale-105 transition-transform cursor-pointer"
          >
            👉 GARANTIR MINHA VAGA AGORA
          </a>

          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-center gap-6 text-muted-foreground/50 text-xs">
              <span>🔒 Pagamento 100% seguro</span>
            </div>
            <div className="flex items-center justify-center gap-6 text-muted-foreground/50 text-xs">
              <span>💳 Cartão</span>
              <span>📲 Pix</span>
              <span>📄 Boleto</span>
            </div>
            <p className="text-xs text-muted-foreground/50">🛡️ Garantia incondicional de 7 dias</p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* DECISÃO section */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={spring}
      className="max-w-2xl mx-auto text-center mt-24 relative z-10"
    >
      <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">DECISÃO</h3>
      <div className="space-y-2 text-sm text-foreground/50 font-light leading-relaxed">
        <p>Você pode continuar assistindo.<br />Ou pode começar estruturando.</p>
        <p className="text-foreground/40">O 360 Digital não é promessa.<br />É preparação para resultado.</p>
        <p className="text-foreground/80 font-semibold mt-4">
          Se você quer virar o jogo,<br />essa é a porta.
        </p>
      </div>
    </motion.div>
  </section>
);

export default Price;
