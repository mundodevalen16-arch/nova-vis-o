const items = [
  "⚡ +200 mentorados ativos",
  "📈 Resultados reais desde o dia 1",
  "🎯 Estratégias 2026",
  "💰 Do zero a R$10k/mês",
  "🔥 Conteúdo atualizado",
];

const SocialProof = () => {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className="relative py-4 overflow-hidden border-y border-border/50">
      <div className="absolute inset-0 bg-primary/[0.03]" />
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="mx-10 text-sm font-medium text-muted-foreground">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
