import { motion } from "framer-motion";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";
import setupImg from "@/assets/lifestyle-setup.png";
import keysImg from "@/assets/lifestyle-keys.jpeg";
import plaquesImg from "@/assets/lifestyle-plaques.jpg";
import salesImg from "@/assets/lifestyle-sales.jpg";
import casalImg from "@/assets/lifestyle-casal.jpg";
import condomiImg from "@/assets/lifestyle-condomi.jpg";
import dinheiroImg from "@/assets/lifestyle-dinheiro.jpg";
import motoImg from "@/assets/lifestyle-moto.jpg";
import resulImg from "@/assets/lifestyle-resul.jpg";

const galleryItems: GalleryItem[] = [
  { common: "Setup dos sonhos 🎮", binomial: "Do sonho ao setup perfeito", photo: { url: setupImg, text: "Setup de trabalho", by: "iBielZz" } },
  { common: "Casa própria aos 20 🏠", binomial: "Da CLT à casa própria", photo: { url: keysImg, text: "Casa própria", by: "iBielZz" } },
  { common: "R$500mil+ em vendas 🏆", binomial: "Vendas comprovadas", photo: { url: plaquesImg, text: "Placas de vendas", by: "iBielZz" } },
  { common: "Vendas no automático 💰", binomial: "Notificações caindo", photo: { url: salesImg, text: "Notificações de vendas", by: "iBielZz" } },
  { common: "Construindo juntos 💍", binomial: "Casal empreendedor", photo: { url: casalImg, text: "Casal empreendedor", by: "iBielZz" } },
  { common: "O carro impossível 🚗", binomial: "Conquista de carro", photo: { url: condomiImg, text: "Conquista de carro", by: "iBielZz" } },
  { common: "O digital mudou tudo 💸", binomial: "Resultados financeiros", photo: { url: dinheiroImg, text: "Resultados financeiros", by: "iBielZz" } },
  { common: "Moto dos sonhos 🏍️", binomial: "Da CLT à moto", photo: { url: motoImg, text: "Moto esportiva", by: "iBielZz" } },
  { common: "Resultados reais 📈", binomial: "Não promessas", photo: { url: resulImg, text: "Resultados comprovados", by: "iBielZz" } },
];

const LifestyleGallery = () => {
  return (
    <section className="relative w-full" style={{ height: '200vh' }}>
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="text-center mb-4 absolute top-12 z-10 px-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight">
            O <span className="text-gradient-pink">lifestyle</span> que ele conquistou
          </h2>
          <p className="text-muted-foreground text-sm font-light mt-4 max-w-md mx-auto">
            De jovem sonhador e CLT — a isso aqui.
          </p>
        </motion.div>
        <div className="w-full h-full mt-28 md:mt-36">
          <CircularGallery items={galleryItems} radius={500} autoRotateSpeed={0.03} />
        </div>
      </div>
    </section>
  );
};

export default LifestyleGallery;
