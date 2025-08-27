import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCriticalImagesPreload } from '@/hooks/useImagePreloader';
import { useAvatarImages } from '@/hooks/useMediaFiles';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  minLoadingTime?: number; // Tempo mínimo de loading (ms)
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
  minLoadingTime = 2000
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState('Carregando');
  
  // Buscar imagens críticas para preload
  const { mediaFiles: avatarImages } = useAvatarImages();
  const criticalImages = avatarImages.map(img => img.url).slice(0, 4); // Primeiras 4 imagens
  
  const { 
    preloadProgress, 
    criticalImagesLoaded, 
    isPreloading 
  } = useCriticalImagesPreload(criticalImages);

  // Animação do texto de loading
  useEffect(() => {
    const texts = ['Carregando', 'Carregando.', 'Carregando..', 'Carregando...'];
    let index = 0;
    
    const interval = setInterval(() => {
      setLoadingText(texts[index]);
      index = (index + 1) % texts.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Controla quando o loading deve finalizar
  useEffect(() => {
    const startTime = Date.now();
    
    const checkComplete = () => {
      const elapsedTime = Date.now() - startTime;
      const imagesReady = criticalImagesLoaded || !isPreloading;
      const minTimeReached = elapsedTime >= minLoadingTime;
      
      if (imagesReady && minTimeReached) {
        setTimeout(() => {
          setIsVisible(false);
          onLoadingComplete?.();
        }, 500); // Delay para suavizar transição
      } else {
        // Verifica novamente em 100ms
        setTimeout(checkComplete, 100);
      }
    };

    // Inicia verificação após um delay inicial
    const timer = setTimeout(checkComplete, 500);
    
    return () => clearTimeout(timer);
  }, [criticalImagesLoaded, isPreloading, minLoadingTime, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)'
          }}
          transition={{ 
            duration: 1,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          {/* Logo/Brand */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="font-futura-light text-6xl md:text-8xl text-white tracking-[0.3em]">
              ORCHESTRA
            </h1>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-64 md:w-80 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              {/* Background bar */}
              <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                {/* Progress fill */}
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${preloadProgress}%` }}
                  transition={{ 
                    duration: 0.5,
                    ease: 'easeOut'
                  }}
                />
              </div>
              
              {/* Progress percentage */}
              <div className="absolute -top-6 right-0 text-white/60 text-xs font-futura tracking-widest">
                {Math.round(preloadProgress)}%
              </div>
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.p
            className="text-white/80 font-futura tracking-widest text-sm uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {loadingText}
          </motion.p>

          {/* Preload Info (apenas em dev) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              className="absolute bottom-8 left-8 text-white/40 text-xs font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div>Preload: {isPreloading ? 'Ativo' : 'Completo'}</div>
              <div>Imagens: {criticalImages.length}</div>
              <div>Progresso: {preloadProgress.toFixed(1)}%</div>
            </motion.div>
          )}

          {/* Animated dots */}
          <motion.div
            className="absolute bottom-16 flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white/40 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;