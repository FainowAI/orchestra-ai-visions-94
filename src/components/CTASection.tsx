import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const CTASection = () => {
  const navigate = useNavigate();
  return <section id="contact" className="w-screen min-h-screen bg-primary flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 text-left">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <div>
            <motion.h2 initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="font-futura-light text-[clamp(3rem,8vw,5rem)] md:text-7xl lg:text-8xl text-white mb-6 sm:mb-8 tracking-[clamp(0.1em,2vw,0.2em)] leading-[0.9]">
              VAMOS
              <br />
              CRIAR
              <br />
              JUNTOS?
            </motion.h2>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="font-futura text-[clamp(1rem,4vw,1.25rem)] text-white/70 mb-10 sm:mb-12 font-light tracking-wide leading-[1.4] max-w-[35ch] sm:max-w-lg mx-auto">
              Transforme sua visão em realidade digital. 
              Criamos experiências visuais que redefinem o futuro das marcas.
            </motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }} className="space-y-4">
              <button 
                onClick={() => navigate('/contato')} 
                className="font-futura tracking-widest bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition-all duration-500 px-8 sm:px-12 py-4 sm:py-6 text-[clamp(1rem,4vw,1.125rem)] uppercase rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-100 dark:focus-visible:ring-slate-100 focus-visible:ring-offset-2 focus-visible:ring-offset-primary min-h-[44px] min-w-[200px]"
              >
                Começar Projeto
              </button>
            </motion.div>
          </div>


        </motion.div>
      </div>
    </section>;
};
export default CTASection;