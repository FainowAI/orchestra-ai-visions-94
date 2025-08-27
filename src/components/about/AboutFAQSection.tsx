import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AboutFAQSection: React.FC = () => {
  const faqs = [
    {
      question: "Como funcionam os direitos de uso do avatar?",
      answer: "Você recebe propriedade integral do avatar criado para sua marca. Isso inclui direitos exclusivos de uso comercial, modificação e distribuição. Fornecemos contrato detalhado garantindo todos os direitos legais."
    },
    {
      question: "Como funciona o processo de criação de um clone digital?",
      answer: "O clone é criado através de análise de fotos e vídeos de referência, utilizando IA generativa para replicar características físicas, expressões e maneirismos. O processo leva de 2-4 semanas dependendo da complexidade."
    },
    {
      question: "Quais são os prazos de entrega?",
      answer: "Avatar original: 3-4 semanas. Clone personalizado: 2-4 semanas. Squad de avatares prontos: disponibilidade imediata. Conteúdo adicional: 1-2 semanas. Prazos podem variar conforme complexidade do projeto."
    },
    {
      question: "Como garantem a segurança e ética da imagem?",
      answer: "Seguimos protocolos rigorosos de consentimento, contratos de direitos de imagem, e políticas de uso responsável. Todos os clones são criados apenas com autorização expressa e documentada dos envolvidos."
    },
    {
      question: "Em quais formatos o avatar é entregue?",
      answer: "Entregamos imagens (PNG/JPG) até 4K, vídeos (MP4/MOV) em Full HD ou 4K, modelos 3D quando aplicável, e assets editáveis. Também fornecemos guidelines de uso e kit de aplicação da marca."
    },
    {
      question: "Oferecem suporte após a entrega?",
      answer: "Sim! Oferecemos 30 dias de suporte gratuito pós-entrega para ajustes menores. Também temos planos de suporte contínuo e criação de conteúdo adicional conforme necessidade do cliente."
    }
  ];

  return (
    <section className="py-24 bg-muted/30 dark:bg-card/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-futura-light text-5xl md:text-6xl text-primary mb-6 tracking-widest">
            PERGUNTAS FREQUENTES
          </h2>
          <div className="w-24 h-px bg-orchestra-gradient mx-auto mb-8"></div>
          <p className="font-futura text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Esclarecemos as principais dúvidas
            <br />
            sobre avatares digitais e nossos serviços
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-2xl border border-border/50 px-6 hover:border-accent/50 transition-all duration-300"
              >
                <AccordionTrigger className="font-playfair text-lg font-semibold text-primary hover:text-accent transition-colors py-6 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-futura text-foreground/70 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-background rounded-2xl p-8 border border-border/50 max-w-2xl mx-auto">
            <p className="font-futura text-lg font-medium text-primary mb-4">
              Ainda tem dúvidas?
            </p>
            <p className="font-futura text-foreground/70 mb-6">
              Nossa equipe está pronta para esclarecer qualquer questão sobre avatares de IA
            </p>
            <a
              href="#contact"
              className="font-futura text-accent font-medium hover:text-accent/80 transition-colors underline underline-offset-4"
            >
              Entre em contato conosco
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFAQSection;