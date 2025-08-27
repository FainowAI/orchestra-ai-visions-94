import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutCTASection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="w-screen min-h-screen bg-primary flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-16 lg:px-24 text-left">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-futura-light text-6xl md:text-7xl lg:text-8xl text-white mb-8 tracking-[0.2em] leading-none"
            >
              VAMOS
              <br />
              CRIAR
              <br />
              JUNTOS?
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-futura text-xl text-white/70 mb-12 font-light tracking-wide leading-relaxed max-w-lg"
            >
              Sua visão merece se tornar realidade digital. 
              Criamos experiências que transcendem o comum.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <button 
                onClick={() => navigate('/contato')}
                className="font-futura tracking-widest bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition-all duration-500 px-12 py-6 text-lg uppercase rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-100 dark:focus-visible:ring-slate-100 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                Solicitar Proposta
              </button>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-12"
          >
            <div className="border-l border-white/20 pl-8">
              <h3 className="font-futura text-white/90 text-sm tracking-widest uppercase mb-2">Proposta Gratuita</h3>
              <p className="font-futura text-white/60 text-sm font-light">Análise completa sem compromisso</p>
            </div>
            
            <div className="border-l border-white/20 pl-8">
              <h3 className="font-futura text-white/90 text-sm tracking-widest uppercase mb-2">Entrega Rápida</h3>
              <p className="font-futura text-white/60 text-sm font-light">Primeiros resultados em 2 semanas</p>
            </div>
            
            <div className="border-l border-white/20 pl-8">
              <h3 className="font-futura text-white/90 text-sm tracking-widest uppercase mb-2">Suporte Total</h3>
              <p className="font-futura text-white/60 text-sm font-light">Acompanhamento especializado</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTASection;