import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Preciso ter experiência prévia?", a: "Não. O curso foi feito do zero ao avançado. Se você nunca fez um anúncio na vida, é exatamente para você." },
  { q: "Por quanto tempo terei acesso?", a: "O acesso é anual. Você pode assistir as aulas quantas vezes quiser durante 1 ano." },
  { q: "O conteúdo é atualizado?", a: "Sim. Você recebe todas as atualizações sem custo adicional." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se não ficar satisfeito, devolvemos 100% do seu dinheiro." },
  { q: "Como funciona a área de membros?", a: "Após a compra, você recebe acesso imediato à plataforma com todos os módulos organizados e fáceis de navegar." },
  { q: "Os bônus estão inclusos no preço?", a: "Sim. Comunidade, sorteios e atualizações estão incluídos no valor anual de R$399." },
];

const FAQ = () => {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl text-center mb-16"
        >
          PERGUNTAS <span className="text-gradient-purple">FREQUENTES</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="card-glass rounded-xl px-6 border-none data-[state=open]:border data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="font-body font-semibold text-left hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
