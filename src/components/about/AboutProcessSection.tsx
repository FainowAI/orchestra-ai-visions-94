import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Settings, TestTube, Rocket } from 'lucide-react';

const AboutProcessSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: "Briefing estratégico com a marca",
      description: "Entendemos profundamente seus objetivos, público-alvo e necessidades específicas para definir a estratégia do avatar."
    },
    {
      number: "02",
      icon: Settings,
      title: "Desenvolvimento e testes do avatar",
      description: "Criamos protótipos iterativos, refinamos características visuais e testamos diferentes cenários de uso."
    },
    {
      number: "03",
      icon: TestTube,
      title: "Entrega com conteúdo customizado",
      description: "Fornecemos o avatar finalizado junto com conteúdo inicial personalizado para suas primeiras campanhas."
    },
    {
      number: "04",
      icon: Rocket,
      title: "Suporte contínuo ou avulso",
      description: "Oferecemos acompanhamento contínuo ou suporte pontual para futuras campanhas e atualizações do avatar."
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
            NOSSO PROCESSO
          </h2>
          <div className="w-24 h-px bg-orchestra-gradient mx-auto mb-8"></div>
          <p className="font-futura text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Metodologia estruturada em 4 etapas
            <br />
            para garantir avatares únicos e resultados excepcionais
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border transform -translate-y-1/2"></div>
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative z-10 w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="font-futura-medium text-xl text-accent-foreground tracking-wide">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-background border-2 border-border rounded-xl flex items-center justify-center mx-auto mb-6 hover:border-accent transition-colors duration-300 shadow-sm">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>

                {/* Content */}
                <div className="bg-background rounded-2xl p-6 shadow-sm border border-border/50 hover:border-accent/30 transition-all duration-300">
                  <h3 className="font-futura-medium text-lg text-primary mb-3 tracking-wide leading-snug">
                    {step.title}
                  </h3>
                  
                  <p className="font-futura text-sm text-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connection Line for Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-px h-12 bg-border mx-auto mt-8"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="font-futura text-lg text-foreground/70">
            Cada etapa é cuidadosamente planejada para garantir o sucesso do seu projeto
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutProcessSection;