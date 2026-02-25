import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PhoneNotifications from "@/components/SaleNotifications";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const highlightChips = [
  { icon: "🎯", label: "Meta Ads do Zero" },
  { icon: "💰", label: "Vendas Online" },
  { icon: "🏪", label: "Negócios Locais" },
  { icon: "📊", label: "Métricas & Dados" },
  { icon: "⚙️", label: "Otimização" },
  { icon: "🛡️", label: "Perfis Blindados" },
  { icon: "📱", label: "Instagram Perfeito" },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // Smooth exit on scroll
  const cardScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);
  const cardY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const cardOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[150vh] px-4 py-12 md:py-20 pt-24" style={{ perspective: "1500px" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-primary/10 blur-[180px] animate-ambient" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[120px] animate-ambient" style={{ animationDelay: "3s" }} />
      </div>

      {/* Sticky card that tears apart */}
      <div className="sticky top-0 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ scale: cardScale, y: cardY, opacity: cardOpacity }}
          className="w-full max-w-6xl mx-auto relative rounded-[2.5rem] overflow-hidden"
        >
          {/* Card border glow */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-foreground/[0.06]" style={{
            boxShadow: "0 30px 100px hsl(260 70% 35% / 0.4), 0 10px 40px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
          }} />

          {/* Card background gradient */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(160deg, hsl(250 50% 15% / 0.95), hsl(260 45% 12% / 0.9) 40%, hsl(270 60% 25% / 0.7) 80%, hsl(265 70% 35% / 0.5))",
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
            {/* Logo */}
            <div className="mb-12">
              <div className="text-2xl md:text-3xl font-black tracking-tight">
                <span className="text-gradient-pink">360</span>
                <span className="text-foreground ml-1">DIGITAL</span>
              </div>
            </div>

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
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-pink text-primary-foreground font-bold text-sm animate-glow-pulse hover:scale-105 transition-transform cursor-pointer"
                  >
                    <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    QUERO ENTRAR AGORA
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
              className="mt-10"
            >
              <p className="text-xs text-foreground/40 mb-4 font-medium">Destaques do curso</p>
              <Carousel opts={{ align: "start", loop: true }} className="w-full px-1">
                <CarouselContent>
                  {highlightChips.map((chip, i) => (
                    <CarouselItem key={`${chip.label}-${i}`} className="basis-auto pl-3">
                      <div className="w-max flex items-center gap-2 px-5 py-3 rounded-xl glass">
                        <span className="text-lg">{chip.icon}</span>
                        <span className="text-xs text-foreground/70 whitespace-nowrap font-medium">{chip.label}</span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-1 top-1/2 border-border/50 bg-background/70 hover:bg-background/90" />
                <CarouselNext className="-right-1 top-1/2 border-border/50 bg-background/70 hover:bg-background/90" />
              </Carousel>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
