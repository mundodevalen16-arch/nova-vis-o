import { motion } from "framer-motion";

const included = [
  "12 Módulos completos do zero ao avançado",
  "Conteúdo 100% atualizado para 2026",
  "Área de membros personalizada",
  "Comunidade no WhatsApp & Discord",
  "Sorteios de equipamentos do setup",
  "Atualizações gratuitas inclusas",
];

const Price = () => {
  return (
    <section id="preco" className="py-20 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-[1px] bg-gradient-to-br from-digital-purple via-digital-violet to-digital-blue animate-glow-pulse"
        >
          <div className="rounded-3xl bg-card p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl md:text-5xl mb-8">
              ACESSO COMPLETO AO <span className="text-gradient-purple">360 DIGITAL</span>
            </h2>

            <ul className="space-y-3 mb-10 text-left max-w-md mx-auto">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-foreground/80">
                  <span className="text-green-400 mt-0.5">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="font-body text-muted-foreground line-through text-lg mb-1">DE: R$997,00</p>
            <p className="font-body text-sm text-primary uppercase tracking-widest mb-2">POR APENAS:</p>

            <div className="mb-2">
              <span className="font-display text-7xl md:text-8xl text-gradient-purple">R$399</span>
              <span className="font-body text-xl text-muted-foreground">/ano</span>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-8">Menos de R$1,10 por dia</p>

            <a
              href="#"
              className="inline-flex items-center justify-center px-12 py-5 rounded-xl font-body font-bold text-lg bg-gradient-purple text-foreground animate-glow-pulse hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              GARANTIR MINHA VAGA AGORA
            </a>

            <p className="font-body text-sm text-muted-foreground mt-6">
              🔒 Pagamento 100% Seguro • Garantia incondicional de 7 dias
            </p>

            <div className="flex items-center justify-center gap-6 mt-4 text-muted-foreground/60 text-sm font-body">
              <span>💳 Cartão</span>
              <span>📲 Pix</span>
              <span>📄 Boleto</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Price;
