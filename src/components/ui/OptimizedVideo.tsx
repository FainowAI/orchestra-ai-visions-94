import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
  priority?: boolean;
  poster?: string;
  fallbackImage?: string;
  onLoadComplete?: () => void;
  preloadStrategy?: 'none' | 'metadata' | 'auto';
}

export const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  className = '',
  priority = false,
  poster,
  fallbackImage,
  onLoadComplete,
  preloadStrategy = 'metadata',
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !videoRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          // Se o vídeo deve ser autoplay, só inicia quando está visível
          if (autoPlay) {
            setShouldAutoPlay(true);
          }
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '100px', // Carrega 100px antes para vídeos
        threshold: 0.25 // 25% do vídeo deve estar visível
      }
    );

    observerRef.current.observe(videoRef.current);

    return () => observerRef.current?.disconnect();
  }, [priority, autoPlay]);

  // Handle autoplay quando o vídeo entra na tela
  useEffect(() => {
    if (shouldAutoPlay && videoRef.current && isLoaded) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video autoplay started');
          })
          .catch((error) => {
            console.warn('Video autoplay failed:', error);
          });
      }
    }
  }, [shouldAutoPlay, isLoaded]);

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleError = useCallback(() => {
    setIsError(true);
    console.error('Video failed to load:', src);
  }, [src]);

  // Detectar conexão lenta e ajustar qualidade
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc.includes('supabase')) return originalSrc;
    
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      const { effectiveType, downlink } = connection;
      
      // Conexão lenta - usa qualidade reduzida
      if (effectiveType === 'slow-2g' || effectiveType === '2g' || downlink < 1) {
        const url = new URL(originalSrc);
        url.searchParams.set('quality', '50');
        url.searchParams.set('width', '720');
        return url.toString();
      }
      
      // Conexão média - usa qualidade média
      if (effectiveType === '3g' || downlink < 5) {
        const url = new URL(originalSrc);
        url.searchParams.set('quality', '70');
        url.searchParams.set('width', '1280');
        return url.toString();
      }
    }
    
    return originalSrc; // Qualidade original para conexões boas
  };

  const shouldRender = priority || isInView;

  if (isError && fallbackImage) {
    return (
      <motion.img
        src={fallbackImage}
        alt="Fallback for video"
        className={`w-full h-full object-cover ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && shouldRender && (
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          {poster && (
            <img
              src={poster}
              alt="Video poster"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          
          {/* Loading Indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-12 h-12 border-4 border-white/20 border-t-white/80 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}

      {/* Main Video */}
      {shouldRender && (
        <motion.video
          ref={videoRef}
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          poster={poster}
          preload={preloadStrategy}
          autoPlay={priority ? autoPlay : false} // Só autoplay se priority
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          onLoadedData={handleLoadedData}
          onError={handleError}
          style={{
            willChange: 'transform',
            ...props.style
          }}
          // Spread only safe HTML props, excluding potential conflicts with motion props
          {...(Object.fromEntries(
            Object.entries(props).filter(([key]) => 
              !['onDrag', 'onDragStart', 'onDragEnd', 'style'].includes(key)
            )
          ))}
        >
          <source src={getOptimizedSrc(src)} type="video/mp4" />
          
          {/* WebM fallback se disponível */}
          {src.includes('.mp4') && (
            <source 
              src={src.replace('.mp4', '.webm')} 
              type="video/webm" 
            />
          )}
          
          Seu navegador não suporta vídeo HTML5.
        </motion.video>
      )}

      {/* Error State */}
      {isError && !fallbackImage && (
        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM10 8a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm0 6a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <p className="text-lg font-medium">Vídeo indisponível</p>
            <p className="text-sm text-white/70">Falha no carregamento</p>
          </div>
        </div>
      )}
    </div>
  );
};