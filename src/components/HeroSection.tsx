import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useHeroVideo } from '@/hooks/useMediaFiles';
import { MediaVideo } from '@/components/media';

const HeroSection = () => {
  const { heroVideo, loading: videoLoading } = useHeroVideo();

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 30,
        stiffness: 300
      }
    }
  };

  const titleVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 200
      }
    }
  };

  const separatorVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 400,
        delay: 0.8
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const scrollToSquad = () => {
    const element = document.querySelector('#squad');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-screen h-screen overflow-hidden">
      {/* Background Video - Full bleed */}
      <div className="absolute inset-0 z-0">
        {videoLoading ? (
          <div className="w-full h-full animate-pulse bg-muted" />
        ) : (
          <MediaVideo
            src={heroVideo?.url}
            className="w-full h-full object-cover md:object-cover sm:object-center"
            autoPlay 
            loop 
            muted 
            playsInline
            category="hero"
            fallback="/placeholder.svg"
          />
        )}
      </div>

      {/* Minimal Content Overlay */}
      <motion.div 
        className="absolute inset-0 z-10 flex flex-col justify-center items-start px-6 sm:px-8 md:px-16 lg:px-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl">
          <motion.h1 
            variants={titleVariants}
            className="font-futura-light text-[clamp(2.5rem,8vw,6rem)] sm:text-[clamp(3rem,8vw,7rem)] md:text-7xl lg:text-8xl xl:text-9xl mb-4 sm:mb-6 tracking-[0.1em] sm:tracking-[0.2em] leading-[0.9] hero-title-text bg-transparent inline-block"
          >
            ORCHESTRA
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="font-futura text-[clamp(1rem,4vw,1.25rem)] md:text-2xl text-white/90 dark:text-slate-100 mb-16 tracking-wide leading-[1.4] max-w-[28ch] sm:max-w-lg font-light"
          >
            Criatividade digital sem limites.
            <br />
            Avatares de IA que transformam marcas.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button 
              onClick={scrollToSquad}
              variant="ghost" 
              size="lg"
              className="font-futura tracking-widest bg-transparent border-none text-white dark:text-slate-50 hover:bg-white/10 dark:hover:bg-slate-50/10 transition-all duration-500 px-0 py-6 text-[clamp(1rem,4vw,1.125rem)] uppercase underline decoration-1 underline-offset-8 hover:decoration-2 min-h-[44px] min-w-[44px]"
            >
              Explorar
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Minimal Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 right-16 lg:right-24"
        variants={floatingVariants}
        initial="animate"
        animate="animate"
      >
        <button 
          onClick={scrollToSquad}
          className="text-white/60 dark:text-slate-300 hover:text-white dark:hover:text-slate-50 transition-all duration-300 text-sm font-futura tracking-widest uppercase writing-mode-vertical-rl min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Rolar para baixo"
        >
          Scroll
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;