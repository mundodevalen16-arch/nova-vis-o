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

          <p className="text-muted-foreground line-through text-lg mb-1">DE: R$997,00</p>
          <p className="text-xs text-primary uppercase tracking-[0.3em] font-medium mb-3">POR APENAS:</p>

          <div className="mb-2">
            <span className="text-7xl md:text-8xl font-black text-gradient-pink">R$399</span>
            <span className="text-xl text-muted-foreground font-light">/ano</span>
          </div>
          <p className="text-xs text-muted-foreground mb-10 font-light">Menos de R$1,10 por dia</p>

          <a
            href="#"
            className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-gradient-pink text-primary-foreground font-bold text-lg animate-glow-pulse hover:scale-105 transition-transform cursor-pointer"
          >
            GARANTIR MINHA VAGA AGORA
          </a>

          <p className="text-xs text-muted-foreground mt-6 font-light">
            🔒 Pagamento 100% Seguro • Garantia incondicional de 7 dias
          </p>

          <div className="flex items-center justify-center gap-6 mt-4 text-muted-foreground/50 text-xs">
            <span>💳 Cartão</span>
            <span>📲 Pix</span>
            <span>📄 Boleto</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Price;
