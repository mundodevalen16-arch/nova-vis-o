const items = [
  "⚡ +500 alunos ativos",
  "📈 Resultados reais desde o dia 1",
  "🎯 Estratégias 2026",
  "💰 Do zero a R$10k/mês",
  "🔥 Conteúdo atualizado",
];

const SocialProof = () => {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className="relative py-5 overflow-hidden" style={{ background: "hsl(var(--digital-purple) / 0.08)" }}>
      <div className="absolute inset-0 border-y border-primary/10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="mx-8 text-sm md:text-base font-body text-foreground/60 font-medium">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
