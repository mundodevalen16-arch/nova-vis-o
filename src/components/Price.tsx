import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import instagramIcon from "@/assets/instagram.ico";
import youtubeIcon from "@/assets/youtube.ico";

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
    <section ref={ref} id="preco" className="py-10 md:py-20 px-6 relative overflow-hidden" style={{ perspective: "2000px" }}>
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
              className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-gradient-pink text-primary-foreground font-bold text-lg animate-glow-pulse hover:scale-105 transition-transform cursor-pointer"
            >
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

      {/* Social Follow Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="max-w-md mx-auto text-center mt-20 relative z-10"
      >
        <p className="text-xs text-primary font-bold uppercase tracking-[0.3em] mb-3">📲 NÃO FIQUE DE FORA</p>
        <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">
          Acompanhe de perto
        </h3>
        <p className="text-sm text-foreground/50 font-light leading-relaxed mb-8">
          Siga nas redes para conteúdo gratuito, bastidores e avisos antes de todo mundo.
        </p>
        <div className="flex items-center justify-center gap-5">
          <a
            href="https://www.instagram.com/gab_rochazz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors text-sm font-medium"
          >
            <img src={instagramIcon} alt="Instagram" className="w-5 h-5" /> Instagram
          </a>
          <a
            href="https://www.youtube.com/@ibielZz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors text-sm font-medium"
          >
            <img src={youtubeIcon} alt="YouTube" className="w-5 h-5" /> YouTube
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Price;
