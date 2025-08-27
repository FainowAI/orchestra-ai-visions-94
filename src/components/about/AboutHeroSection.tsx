import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play } from 'lucide-react';

const AboutHeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-background via-background to-muted dark:from-background dark:via-background dark:to-card overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/10"></div>
      
      <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Headline */}
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            A Nova Era da Comunicação
            <span className="block text-accent font-medium">
              com Avatares de IA
            </span>
          </h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Influência, performance e inteligência visual com tecnologia generativa.
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-inter font-medium px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Fale com a Orchestra
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-inter font-medium px-8 py-4 rounded-2xl transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Ver nossos avatares
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-foreground/70 hover:text-accent transition-colors cursor-pointer"
          >
            <span className="font-inter text-sm mb-2 tracking-wider">Role para explorar</span>
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Subtle golden glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30"></div>
    </section>
  );
};

export default AboutHeroSection;