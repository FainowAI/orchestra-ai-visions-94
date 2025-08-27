import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Users, Award, TrendingUp } from 'lucide-react';

const AboutImpactSection: React.FC = () => {
  const metrics = [
    {
      icon: Play,
      number: "+1 milhão",
      label: "visualizações em vídeos",
      subtitle: "em menos de 1 mês",
      color: "from-accent/20 to-accent/5"
    },
    {
      icon: Users,
      number: "3",
      label: "criadores com clones ativos",
      subtitle: "perfeitamente integrados",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      icon: Award,
      number: "15+",
      label: "campanhas visuais",
      subtitle: "múltiplas categorias",
      color: "from-green-500/20 to-green-500/5"
    },
    {
      icon: TrendingUp,
      number: "300%",
      label: "aumento de engajamento",
      subtitle: "médio dos clientes",
      color: "from-purple-500/20 to-purple-500/5"
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
          <h2 className="font-futura-medium text-4xl md:text-5xl font-bold text-primary mb-6">
            Impacto Comprovado
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="font-futura text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Números reais que demonstram o poder dos avatares de IA
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-border/50 hover:border-accent/50">
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                    <metric.icon className="w-8 h-8 text-accent" />
                  </div>
                  
                  {/* Number */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="relative z-10"
                  >
                    <h3 className="font-futura-medium text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {metric.number}
                    </h3>
                  </motion.div>
                  
                  {/* Label */}
                  <div className="relative z-10">
                    <p className="font-futura text-lg font-medium text-primary mb-1">
                      {metric.label}
                    </p>
                    <p className="font-futura text-sm text-foreground/70">
                      {metric.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonial/Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20 max-w-4xl mx-auto">
            <blockquote className="font-futura-medium text-xl md:text-2xl font-medium text-primary mb-4 italic">
              "A tecnologia de avatares da Orchestra revolucionou nossa estratégia de conteúdo. Conseguimos manter consistência visual e acelerar nossa produção sem comprometer a qualidade."
            </blockquote>
            <cite className="font-futura text-foreground/70">
              — Cliente Orchestra, Agência de Marketing Digital
            </cite>
          </div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center mt-12 space-x-2"
        >
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <div className="w-2 h-2 bg-accent/70 rounded-full"></div>
          <div className="w-2 h-2 bg-accent/40 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutImpactSection;