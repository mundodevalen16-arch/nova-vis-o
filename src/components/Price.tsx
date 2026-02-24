import { motion } from "framer-motion";

const included = [
  "12 Módulos completos do zero ao avançado",
  "Conteúdo 100% atualizado para 2026",
  "Área de membros personalizada",
  "Comunidade no WhatsApp & Discord",
  "Sorteios de equipamentos do setup",
  "Atualizações gratuitas inclusas",
];

const Price = () => {
  return (
    <section id="preco" className="py-20 md:py-32 px-4 relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-digital-purple/15 blur-[150px] animate-ambient" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          className="cinematic-card animate-glow-pulse"
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-40" />
          <div className="relative z-10 p-8 md:p-14 text-center">
            <h2 className="font-display text-4xl md:text-6xl mb-8">
              ACESSO COMPLETO AO{" "}
              <span className="text-gradient-purple">360 DIGITAL</span>
            </h2>

            <ul className="space-y-3 mb-10 text-left max-w-md mx-auto">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm text-foreground/75">
                  <span className="mt-0.5" style={{ color: "hsl(140 70% 60%)" }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="font-body text-muted-foreground line-through text-lg mb-1">DE: R$997,00</p>
            <p className="font-body text-xs text-primary uppercase tracking-[0.3em] mb-3">POR APENAS:</p>

            <div className="mb-2">
              <span className="font-display text-7xl md:text-9xl text-gradient-purple">R$399</span>
              <span className="font-body text-xl text-muted-foreground">/ano</span>
            </div>
            <p className="font-body text-xs text-muted-foreground mb-10">Menos de R$1,10 por dia</p>

            <a
              href="#"
              className="inline-flex items-center justify-center px-12 py-5 rounded-2xl font-body font-bold text-lg bg-gradient-purple text-foreground animate-glow-pulse hover:scale-105 transition-transform cursor-pointer"
            >
              GARANTIR MINHA VAGA AGORA
            </a>

            <p className="font-body text-xs text-muted-foreground mt-6">
              🔒 Pagamento 100% Seguro • Garantia incondicional de 7 dias
            </p>

            <div className="flex items-center justify-center gap-6 mt-4 text-muted-foreground/50 text-xs font-body">
              <span>💳 Cartão</span>
              <span>📲 Pix</span>
              <span>📄 Boleto</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Price;
