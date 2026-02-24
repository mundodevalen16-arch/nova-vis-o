const Footer = () => (
  <footer className="border-t border-border/30 pt-12 pb-6 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="text-xl font-extrabold tracking-tight">
          <span className="text-gradient-pink">360</span>
          <span className="text-foreground ml-1">DIGITAL</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground text-lg">
          <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">📸</a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="YouTube">▶️</a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="TikTok">🎵</a>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground/40 mb-6">
        © 2026 360 Digital — Todos os direitos reservados
      </p>
      <div className="border-t border-border/20 pt-4">
        <p className="text-center text-[11px] text-muted-foreground/30">
          Desenvolvido por{" "}
          <a href="https://wa.me/SEUNUMEROAQUI" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Valentor Solutions
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
