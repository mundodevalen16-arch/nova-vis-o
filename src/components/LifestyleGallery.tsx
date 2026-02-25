import { motion } from "framer-motion";
import setupImg from "@/assets/lifestyle-setup.png";
import keysImg from "@/assets/lifestyle-keys.jpeg";
import plaquesImg from "@/assets/lifestyle-plaques.jpg";
import salesImg from "@/assets/lifestyle-sales.jpg";

const images = [
  { src: setupImg, alt: "Setup de trabalho", caption: "Onde a mágica acontece 🎮" },
  { src: keysImg, alt: "Casa própria", caption: "Casa própria antes dos 25 🏠" },
  { src: plaquesImg, alt: "Placas de vendas", caption: "R$500mil+ em vendas na Cakto 🏆" },
  { src: salesImg, alt: "Notificações de vendas", caption: "Vendas no automático 💰" },
];

const LifestyleGallery = () => (
  <section className="py-20 md:py-28 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="text-4xl md:text-6xl font-black text-center mb-4 tracking-tight"
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: i * 0.1 }}
            className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
            style={{
              border: "1px solid hsl(0 0% 100% / 0.06)",
              boxShadow: "0 8px 30px hsl(0 0% 0% / 0.3)",
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 flex items-end p-4 transition-opacity duration-300"
              style={{
                background: "linear-gradient(to top, hsl(0 0% 0% / 0.8), transparent 60%)",
              }}
            >
              <p className="text-xs md:text-sm font-semibold text-foreground/90">
                {img.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LifestyleGallery;
