const Footer = () => {
  return (
    <footer className="border-t border-border/10 pt-12 pb-6 px-4" style={{ background: "hsl(240 60% 2%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="font-display text-2xl tracking-wider">
            <span className="text-gradient-purple">360</span> DIGITAL
          </div>
          <div className="flex items-center gap-6 font-body text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground text-lg">
            <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">📸</a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="YouTube">▶️</a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="TikTok">🎵</a>
          </div>
        </div>
        <p className="text-center text-xs font-body text-muted-foreground/40 mb-6">
          © 2026 360 Digital — Todos os direitos reservados
        </p>
        <div className="border-t border-border/10 pt-4">
          <p className="text-center text-[11px] font-body text-muted-foreground/30">
            Desenvolvido por{" "}
            <a href="https://wa.me/SEUNUMEROAQUI" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              Valentor Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
