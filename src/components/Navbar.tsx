import { motion, useScroll, useTransform } from "framer-motion";

const Navbar = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `hsla(0, 0%, 2%, ${v * 0.9})`),
        borderBottom: useTransform(borderOpacity, (v) => `1px solid hsla(0, 0%, 100%, ${v})`),
        backdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 20}px)`),
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-extrabold tracking-tight">
          <span className="text-gradient-pink">360</span>
          <span className="text-foreground ml-1">DIGITAL</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground font-medium">
          <a href="#modulos" className="hover:text-foreground transition-colors duration-300">Módulos</a>
          <a href="#transformacao" className="hover:text-foreground transition-colors duration-300">Transformação</a>
          <a href="#bonus" className="hover:text-foreground transition-colors duration-300">Bônus</a>
          <a
            href="#preco"
            className="px-5 py-2 rounded-full bg-gradient-pink text-primary-foreground font-semibold text-sm hover:scale-105 transition-transform"
          >
            Garantir Vaga
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
