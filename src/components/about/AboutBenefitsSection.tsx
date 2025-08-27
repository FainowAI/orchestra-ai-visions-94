import React from 'react';
import { motion } from 'framer-motion';
import { Shield, DollarSign, Clock, Lightbulb, Eye } from 'lucide-react';

const AboutBenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Performance com segurança de imagem",
      description: "Controle total sobre a imagem da marca sem riscos de exposição indevida"
    },
    {
      icon: DollarSign,
      title: "Redução de custos de produção",
      description: "Elimine gastos com modelos, locações e sessões de fotos recorrentes"
    },
    {
      icon: Clock,
      title: "Disponibilidade 24/7 dos avatares",
      description: "Seus avatares estão sempre prontos para novas campanhas e conteúdos"
    },
    {
      icon: Lightbulb,
      title: "Campanhas mais rápidas e criativas",
      description: "Acelere a produção de conteúdo mantendo alta qualidade e consistência"
    },
    {
      icon: Eye,
      title: "Impacto visual que chama atenção",
      description: "Diferenciação no mercado com tecnologia inovadora que engaja o público"
    }
  ];

  return (
    <section className="py-24 bg-background">
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
            POR QUE ORCHESTRA
          </h2>
          <div className="w-24 h-px bg-orchestra-gradient mx-auto mb-8"></div>
          <p className="font-futura text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Vantagens competitivas que transformam sua comunicação
            <br />
            e posicionam sua marca à frente da concorrência
          </p>
        </motion.div>

        {/* Benefits List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start gap-6 p-6 rounded-2xl hover:bg-muted/30 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-accent" />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="font-futura-medium text-xl text-primary mb-2 tracking-wide group-hover:text-accent transition-colors">
                  {benefit.title}
                </h3>
                <p className="font-futura text-foreground/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="w-2 h-2 bg-accent rounded-full mx-auto mb-4"></div>
          <div className="w-4 h-4 bg-accent/50 rounded-full mx-auto mb-4"></div>
          <div className="w-6 h-6 bg-accent/25 rounded-full mx-auto"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBenefitsSection;