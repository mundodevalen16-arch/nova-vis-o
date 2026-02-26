import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const faqs = [
  { q: "Preciso ter experiência prévia?", a: "Não. O curso foi feito do zero ao avançado. Se você nunca fez um anúncio na vida, é exatamente para você." },
  { q: "Por quanto tempo terei acesso?", a: "O acesso é anual. Você pode assistir as aulas quantas vezes quiser durante 1 ano." },
  { q: "O conteúdo é atualizado?", a: "Sim. Você recebe todas as atualizações sem custo adicional." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se não ficar satisfeito, devolvemos 100% do seu dinheiro." },
  { q: "Como funciona a área de membros?", a: "Após a compra, você recebe acesso imediato à plataforma com todos os módulos organizados e fáceis de navegar." },
  { q: "Os bônus estão inclusos no preço?", a: "Sim. Comunidade, sorteios e atualizações estão incluídos no valor anual de R$399." },
];

const FAQ = () => (
  <section className="py-10 md:py-20 px-6">
    <div className="max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-5xl md:text-7xl font-black text-center mb-20 tracking-tight"
      >
        Perguntas <span className="text-gradient-pink">frequentes</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="premium-card border-none overflow-visible px-6"
            >
              <AccordionTrigger className="font-semibold text-left hover:no-underline py-5 text-sm">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 text-sm font-light">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQ;
