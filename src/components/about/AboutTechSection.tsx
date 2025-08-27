import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Shield, Award, Users, Palette, Zap } from 'lucide-react';

const AboutTechSection: React.FC = () => {
  const technologies = [
    {
      icon: Cpu,
      title: "IA Generativa",
      subtitle: "imagem + vídeo + fala",
      description: "Tecnologia de última geração para criação de avatares hiper-realistas"
    },
    {
      icon: Shield,
      title: "Processos éticos",
      subtitle: "protegidos por contrato",
      description: "Garantia legal e ética em todos os desenvolvimentos"
    },
    {
      icon: Award,
      title: "Qualidade premium",
      subtitle: "Full HD a 4K",
      description: "Máxima qualidade visual para todas as aplicações"
    }
  ];

  const guarantees = [
    {
      icon: Users,
      title: "Direitos de uso garantidos",
      description: "Propriedade integral do avatar para sua marca"
    },
    {
      icon: Palette,
      title: "Time criativo especializado",
      description: "IA + Moda + Performance Digital"
    },
    {
      icon: Zap,
      title: "Entrega ágil",
      description: "Processos otimizados para resultados rápidos"
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
            TECNOLOGIA E GARANTIAS
          </h2>
          <div className="w-24 h-px bg-orchestra-gradient mx-auto mb-8"></div>
          <p className="font-futura text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Inovação tecnológica com IA generativa
            <br />
            e garantias de segurança e qualidade
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technologies Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="font-futura-medium text-2xl font-semibold text-primary mb-8">
              Nossas Tecnologias
            </h3>
            
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <tech.icon className="w-6 h-6 text-accent" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-futura-medium text-lg font-semibold text-primary mb-1">
                          {tech.title}
                        </h4>
                        <p className="font-futura text-sm font-medium text-accent mb-2">
                          {tech.subtitle}
                        </p>
                        <p className="font-futura text-foreground/70 text-sm leading-relaxed">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Guarantees Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="font-futura-medium text-2xl font-semibold text-primary mb-8">
              Nossas Garantias
            </h3>
            
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <guarantee.icon className="w-6 h-6 text-accent" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-futura-medium text-lg font-semibold text-primary mb-2">
                          {guarantee.title}
                        </h4>
                        <p className="font-futura text-foreground/70 text-sm leading-relaxed">
                          {guarantee.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl border border-accent/20"
        >
          <p className="font-futura text-lg font-medium text-primary mb-2">
            Tecnologia de ponta com responsabilidade
          </p>
          <p className="font-futura text-foreground/70">
            Cada avatar é criado com os mais altos padrões de qualidade e ética
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutTechSection;