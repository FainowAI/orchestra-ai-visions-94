import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { User, Copy, Users, Video } from 'lucide-react';

const AboutServicesSection: React.FC = () => {
  const services = [
    {
      icon: User,
      title: "Criação de Avatares Originais",
      description: "Desenvolvemos avatares únicos e exclusivos do zero, criados especificamente para sua marca com características visuais únicas que refletem sua identidade."
    },
    {
      icon: Copy,
      title: "Clone IA Personalizado",
      description: "Criamos Digital Twins hiper-realistas baseados em pessoas reais, mantendo todas as características e expressões naturais para comunicação autêntica."
    },
    {
      icon: Users,
      title: "Squad de Avatares Prontos",
      description: "Oferecemos um casting diversificado de avatares em diferentes estilos, idades e características para atender necessidades imediatas de campanha."
    },
    {
      icon: Video,
      title: "Conteúdo com Avatares",
      description: "Produzimos reels, fotos, vídeos institucionais e conteúdo para redes sociais utilizando avatares, garantindo consistência visual e agilidade na produção."
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
            NOSSOS SERVIÇOS
          </h2>
          <div className="w-24 h-px bg-orchestra-gradient mx-auto mb-8"></div>
          <p className="font-futura text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Soluções completas em avatares digitais hiper-realistas com IA generativa
            <br />
            para transformar sua comunicação e performance de marca
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-border/50 hover:border-accent/50 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300">
                    <service.icon className="w-10 h-10 text-accent" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-futura-medium text-xl text-primary mb-4 tracking-wide group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-futura text-foreground/70 leading-relaxed text-base">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="font-futura text-lg text-foreground/70 mb-6">
            Cada serviço é customizado para atender seus objetivos específicos
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutServicesSection;