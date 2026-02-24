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
    <section className="relative py-4 overflow-hidden border-y border-primary/20" style={{ background: "hsl(var(--digital-purple) / 0.1)" }}>
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="mx-8 text-sm md:text-base font-body text-foreground/80 font-medium">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
