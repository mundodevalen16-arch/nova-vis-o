import { motion } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const stats = [
  { value: "5+", label: "Anos de experiência" },
  { value: "R$10M+", label: "Em anúncios" },
  { value: "500+", label: "Alunos" },
  { value: "100%", label: "Conteúdo 2026" },
];

const WhoIsBehind = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tight"
      >
        Quem está <span className="text-gradient-pink">por trás</span>
      </motion.h2>

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <h3 className="text-5xl md:text-6xl font-black text-gradient-pink mb-2">iBielZz</h3>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.3em] mb-8">
            Especialista em Tráfego Pago e Marketing Digital
          </p>
          <div className="space-y-4 text-foreground/60 text-sm font-light leading-relaxed max-w-xl mx-auto mb-12">
            <p>Mais de 5 anos no mercado digital. Especialista em Meta Ads e Direct Response.</p>
            <p>Já ajudou centenas de pessoas a saírem do zero e construírem renda consistente na internet.</p>
            <p className="text-foreground/90 font-medium">
              Não vendo teoria — ensino o que funciona na prática, com resultados reais e método testado.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <p className="text-3xl font-black text-gradient-pink">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhoIsBehind;
