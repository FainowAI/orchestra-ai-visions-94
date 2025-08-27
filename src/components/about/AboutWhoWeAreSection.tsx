import React from 'react';
import { motion } from 'framer-motion';

const AboutWhoWeAreSection: React.FC = () => {

  return (
    <section className="w-screen min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-futura-light text-6xl md:text-7xl lg:text-8xl text-primary mb-8 tracking-[0.2em] leading-none"
            >
              QUEM
              <br />
              SOMOS
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-futura text-xl text-foreground/70 mb-12 font-light tracking-wide leading-relaxed max-w-lg"
            >
              Criamos experiências visuais que redefinem o futuro das marcas através da arte digital e inteligência artificial.
            </motion.p>


          </div>

          {/* Philosophy Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-8"
          >
            <div className="border-l border-border/20 pl-8">
              <p className="font-futura text-lg text-foreground/80 leading-relaxed mb-6 font-light">
                Transformamos ideias em realidades digitais. Cada avatar é uma obra de arte única, criada para elevar marcas além das convenções tradicionais.
              </p>
              
              <p className="font-futura text-lg text-foreground/80 leading-relaxed font-light">
                Nossa filosofia é simples: a criatividade sem limites gera resultados extraordinários.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutWhoWeAreSection;