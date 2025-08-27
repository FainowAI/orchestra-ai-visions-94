import React from 'react';
import { motion } from 'framer-motion';

const WhatWeDoSection: React.FC = () => {
  const services = [
    {
      title: "Criação de Avatares Originais",
      description: "avatares únicos e exclusivos, feitos do zero."
    },
    {
      title: "Clone IA Personalizado (Digital Twin)",
      description: "replicação de pessoas reais com fidelidade."
    },
    {
      title: "Squad de Avatares Prontos",
      description: "casting com estilos e personalidades distintas."
    },
    {
      title: "Conteúdo com Avatares",
      description: "Reels, fotos, vídeos institucionais e conteúdo para redes sociais."
    }
  ];

  return (
    <section id="what-we-do" className="w-screen py-16 lg:py-24 bg-background">
      <div className="px-6 lg:px-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-20 text-center"
        >
          <h2 className="font-futura-light text-[clamp(2.5rem,8vw,4rem)] md:text-6xl lg:text-7xl text-primary tracking-[clamp(0.1em,2vw,0.2em)] leading-[0.9] mb-6 sm:mb-8">
            O QUE
            <br />
            FAZEMOS
          </h2>
        </motion.div>

        {/* Content Layout */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                {/* Bullet Point */}
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-3" />
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-futura-medium text-[clamp(1.125rem,4vw,1.25rem)] md:text-2xl text-foreground mb-3 tracking-wide leading-[1.3] max-w-[20ch] sm:max-w-none">
                    {service.title}:
                  </h3>
                  <p className="font-futura text-[clamp(0.875rem,3.5vw,1rem)] md:text-xl text-foreground/70 leading-[1.5] font-light max-w-[35ch] sm:max-w-none">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
