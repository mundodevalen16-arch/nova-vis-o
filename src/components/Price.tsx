import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const included = [
  "12 Módulos completos do zero ao avançado",
  "Conteúdo 100% atualizado para 2026",
  "Área de membros personalizada",
  "Comunidade no WhatsApp & Discord",
  "Sorteios de equipamentos do setup",
  "Atualizações gratuitas inclusas",
];

const Price = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Portal zoom-through effect
  const cardScale = useTransform(scrollYProgress, [0, 0.35], [0.1, 1]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.35], [80, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const cardBlur = useTransform(scrollYProgress, [0, 0.25], [30, 0]);
  
  // Portal ring that expands
  const ringScale = useTransform(scrollYProgress, [0, 0.2, 0.4], [0.3, 1.2, 2]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 0.8, 0]);

  return (
    <section ref={ref} id="preco" className="py-16 md:py-20 px-6 relative overflow-hidden" style={{ perspective: "2000px" }}>
      {/* Portal ring effect */}
      <motion.div
        style={{ scale: ringScale, opacity: ringOpacity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
      >
        <div className="w-full h-full rounded-full" style={{
          border: "3px solid hsl(328 100% 48% / 0.6)",
          boxShadow: "0 0 80px 20px hsl(328 100% 48% / 0.3), inset 0 0 80px 20px hsl(270 80% 55% / 0.2)",
        }} />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[200px] animate-ambient" />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          style={{ 
            scale: cardScale, 
            rotateX: cardRotateX, 
            opacity: cardOpacity,
            filter: useTransform(cardBlur, v => `blur(${v}px)`),
            transformOrigin: "center bottom",
          }}
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
            <p className="text-sm text-foreground/70 font-medium mb-1">ou 12x de R$33,32</p>
            <p className="text-xs text-muted-foreground mb-3 font-light">Menos de R$1,10 por dia.</p>
            <p className="text-sm text-foreground/50 font-light mb-10">
              Você gasta isso com coisa que não muda sua vida.<br />
              <span className="text-foreground/80 font-medium">Isso pode mudar.</span>
            </p>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full bg-gradient-pink text-primary-foreground font-bold text-lg animate-glow-pulse hover:scale-105 transition-transform cursor-pointer"
            >
              <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              GARANTIR MINHA VAGA AGORA
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
};

export default Price;
