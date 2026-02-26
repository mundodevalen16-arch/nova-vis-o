import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const modules = [
  { num: "01", icon: "🗺️", name: "Trilha Completa", desc: "O mapa definitivo para sua jornada no tráfego pago." },
  { num: "02", icon: "🛡️", name: "Perfis Blindados", desc: "Crie contas no Meta Ads sem risco de bloqueio." },
  { num: "03", icon: "📱", name: "Instagram Perfeito", desc: "Configure tudo para vender todos os dias." },
  { num: "04", icon: "🎯", name: "Domínio de Públicos", desc: "Encontre as pessoas certas para o seu produto." },
  { num: "05", icon: "🔓", name: "Desbloqueio", desc: "Recupere contas bloqueadas no Meta Ads." },
  { num: "06", icon: "🏪", name: "Negócios Locais", desc: "Atraia clientes locais com Meta Ads." },
  { num: "07", icon: "💰", name: "Vendas Online", desc: "Estruturas que vendem todos os dias no digital." },
  { num: "08", icon: "🧪", name: "Testes Inteligentes", desc: "Teste públicos e criativos de forma rápida." },
  { num: "09", icon: "🔮", name: "Meta Pixel & API", desc: "Extraia o máximo de cada real investido." },
  { num: "10", icon: "📊", name: "Métricas", desc: "Decisões baseadas em dados, não achismos." },
  { num: "11", icon: "⚙️", name: "Otimização", desc: "Escale o que funciona e corte o que drena." },
  { num: "12", icon: "🏗️", name: "Estrutura 2026", desc: "A estrutura mais atualizada do mercado." },
];

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const Modules = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  // Warp tunnel effect — carousel comes from extreme perspective
  const carouselRotateX = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const carouselScale = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);
  const carouselY = useTransform(scrollYProgress, [0, 0.4], [300, 0]);
  const carouselOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Speed lines behind carousel
  const linesOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.4], [0, 0.6, 0]);

  return (
    <section ref={sectionRef} id="modulos" className="py-10 md:py-20 overflow-hidden relative" style={{ perspective: "2500px" }}>
      {/* Speed lines / warp effect */}
      <motion.div
        style={{ opacity: linesOpacity }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-[2px] rounded-full"
            style={{
              width: `${150 + Math.random() * 300}px`,
              top: `${10 + (i * 7)}%`,
              left: `${Math.random() * 100}%`,
              background: `linear-gradient(90deg, transparent, hsl(328 100% 48% / ${0.2 + Math.random() * 0.4}), transparent)`,
              transform: `rotate(${-5 + Math.random() * 10}deg)`,
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-2"
        >
          <p className="text-xs text-primary font-bold uppercase tracking-[0.3em] mb-4">🧠 O QUE VOCÊ VAI DOMINAR</p>
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            Blocos <span className="text-gradient-pink">estratégicos</span>
          </h2>
          <div className="space-y-1 text-sm text-muted-foreground font-light">
            <p>Não são "aulinhas". São blocos estratégicos de evolução.</p>
            <p className="text-xs mt-2">Arraste para explorar →</p>
          </div>
        </motion.div>
      </div>

      {/* Carousel warps in from deep perspective */}
      <motion.div 
        style={{ 
          rotateX: carouselRotateX, 
          scale: carouselScale, 
          y: carouselY, 
          opacity: carouselOpacity,
          transformOrigin: "center bottom" 
        }}
        className="relative z-10"
      >
        <div className="relative px-6">
          <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]} className="w-full">
            <CarouselContent>
              {modules.map((mod, i) => (
                <CarouselItem key={mod.num} className="basis-[84%] sm:basis-[56%] lg:basis-[34%]">
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ ...spring, delay: i * 0.04 }}
                    whileHover={{ scale: 1.03, y: -6 }}
                    className="premium-card border-gradient h-full cursor-pointer group"
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(circle at 50% 50%, hsl(var(--pink-hot) / 0.08), transparent 70%)",
                      }}
                    />
                    <div className="relative z-10 p-6">
                      <div className="text-3xl mb-3">{mod.icon}</div>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.25em]">
                        Módulo {mod.num}
                      </span>
                      <h3 className="text-xl font-bold mt-1 mb-2 leading-tight">{mod.name}</h3>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">{mod.desc}</p>
                    </div>
                  </motion.article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 border-border/50 bg-background/70 hover:bg-background/90" />
            <CarouselNext className="right-2 top-1/2 border-border/50 bg-background/70 hover:bg-background/90" />
          </Carousel>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-6 mt-8 text-center space-y-1 text-sm text-foreground/50 font-light relative z-10"
      >
        <p>Você não sai sabendo "um pouco".</p>
        <p className="text-foreground/80 font-semibold">Você sai com estrutura montada.</p>
      </motion.div>
    </section>
  );
};

export default Modules;
