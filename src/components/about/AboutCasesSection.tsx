import React from 'react';
import { motion } from 'framer-motion';

const AboutCasesSection: React.FC = () => {
  const cases = [
    {
      title: "REELS SEMANAIS",
      subtitle: "Avatar apresentadora digital",
      category: "SOCIAL"
    },
    {
      title: "SUPLEMENTOS FITNESS",
      subtitle: "Influenciador virtual atlético",
      category: "FITNESS"
    },
    {
      title: "MODA DE LUXO",
      subtitle: "Modelo editorial exclusivo",
      category: "FASHION"
    },
    {
      title: "EDUCAÇÃO DIGITAL",
      subtitle: "Mentor virtual especialista",
      category: "EDTECH"
    },
    {
      title: "DIVERSIDADE",
      subtitle: "Avatares inclusivos representativos",
      category: "IMPACT"
    },
    {
      title: "COMUNICAÇÃO CORPORATIVA",
      subtitle: "Porta-voz institucional",
      category: "CORPORATE"
    }
  ];

  return (
    <section className="w-screen min-h-screen bg-background">
      {/* Editorial Title */}
      <div className="px-16 lg:px-24 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-futura-light text-6xl md:text-7xl lg:text-8xl text-primary tracking-[0.2em] leading-none mb-8"
        >
          NOSSOS
          <br />
          CASOS
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-futura text-lg text-foreground/60 max-w-lg font-light tracking-wide"
        >
          Experiências digitais que transformaram marcas e redefinaram possibilidades criativas.
        </motion.p>
      </div>

      {/* Full-width Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {cases.map((caseItem, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative group cursor-pointer bg-secondary hover:bg-primary transition-all duration-700"
          >
            <div className="p-12 md:p-16 min-h-[50vh] flex flex-col justify-between">
              {/* Category */}
              <div>
                <span className="font-futura text-xs text-foreground/40 tracking-[0.3em] uppercase group-hover:text-white/60 transition-colors duration-500">
                  {caseItem.category}
                </span>
              </div>
              
              {/* Content */}
              <div>
                <h3 className="font-futura-light text-3xl md:text-4xl text-primary mb-4 tracking-wide leading-tight group-hover:text-white transition-colors duration-500">
                  {caseItem.title}
                </h3>
                
                <p className="font-futura text-foreground/60 text-lg font-light leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                  {caseItem.subtitle}
                </p>
              </div>
              
              {/* Index number */}
              <div className="self-end">
                <span className="font-futura-light text-6xl text-foreground/10 group-hover:text-white/20 transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
            
            {/* Vertical dividers */}
            {index < cases.length - 1 && (
              <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-border/30" />
            )}
            
            {/* Horizontal dividers for mobile */}
            {index < cases.length - 1 && (
              <div className="lg:hidden absolute bottom-0 left-0 right-0 h-px bg-border/30" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutCasesSection;