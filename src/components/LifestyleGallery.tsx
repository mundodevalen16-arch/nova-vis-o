import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import setupImg from "@/assets/lifestyle-setup.png";
import keysImg from "@/assets/lifestyle-keys.jpeg";
import plaquesImg from "@/assets/lifestyle-plaques.jpg";
import salesImg from "@/assets/lifestyle-sales.jpg";
import casalImg from "@/assets/lifestyle-casal.jpg";
import condomiImg from "@/assets/lifestyle-condomi.jpg";
import dinheiroImg from "@/assets/lifestyle-dinheiro.jpg";
import motoImg from "@/assets/lifestyle-moto.jpg";
import resulImg from "@/assets/lifestyle-resul.jpg";

const images = [
  { src: setupImg, alt: "Setup de trabalho", caption: "Onde a mágica acontece 🎮" },
  { src: keysImg, alt: "Casa própria", caption: "Casa própria antes dos 25 🏠" },
  { src: plaquesImg, alt: "Placas de vendas", caption: "R$500mil+ em vendas na Cakto 🏆" },
  { src: salesImg, alt: "Notificações de vendas", caption: "Vendas no automático 💰" },
  { src: casalImg, alt: "Casal empreendedor", caption: "Juntos no digital 💍" },
  { src: condomiImg, alt: "Carro conversível", caption: "Liberdade financeira real 🚗" },
  { src: dinheiroImg, alt: "Resultados financeiros", caption: "O digital paga bem 💸" },
  { src: motoImg, alt: "Moto esportiva", caption: "Conquistas que motivam 🏍️" },
  { src: resulImg, alt: "Setup com lucro", caption: "Quartou com lucro 🤓" },
];

const LifestyleGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="text-3xl sm:text-4xl md:text-6xl font-black text-center mb-4 tracking-tight leading-tight"
        >
          O <span className="text-gradient-pink">lifestyle</span> que o digital proporciona
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm font-light mb-14 max-w-md mx-auto"
        >
          Isso não é ostentação — é prova de que o método funciona.
        </motion.p>

        {/* Carousel */}
        <div className="relative max-w-sm md:max-w-lg mx-auto">
          <div ref={emblaRef} className="overflow-hidden rounded-3xl">
            <div className="flex">
              {images.map((img, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 relative">
                  <div
                    className="relative aspect-[3/4] mx-2 rounded-3xl overflow-hidden"
                    style={{
                      border: "1px solid hsl(0 0% 100% / 0.06)",
                      boxShadow: "0 20px 60px hsl(0 0% 0% / 0.4)",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 flex items-end p-6 md:p-8"
                      style={{
                        background: "linear-gradient(to top, hsl(0 0% 0% / 0.85), transparent 50%)",
                      }}
                    >
                      <p className="text-sm md:text-lg font-bold text-foreground/90">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-background/80 border border-border/30 flex items-center justify-center backdrop-blur-sm hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground/70" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-background/80 border border-border/30 flex items-center justify-center backdrop-blur-sm hover:bg-primary/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground/70" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "bg-primary w-6"
                    : "bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleGallery;
