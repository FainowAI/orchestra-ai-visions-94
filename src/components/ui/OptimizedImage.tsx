import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean; // Para imagens above-the-fold
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  progressive?: boolean;
  onLoadComplete?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes = '100vw',
  quality = 85,
  progressive = true,
  onLoadComplete,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Se priority, já considera "in view"
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px', // Carrega 50px antes de aparecer
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => observerRef.current?.disconnect();
  }, [priority]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleError = useCallback(() => {
    setIsError(true);
  }, []);

  // Gerar diferentes tamanhos da imagem
  const generateSrcSet = (baseSrc: string) => {
    if (!baseSrc.includes('supabase')) return baseSrc;
    
    // Para Supabase, podemos usar transformações de URL
    const widths = [320, 640, 768, 1024, 1280, 1600];
    return widths
      .map(width => {
        // Adiciona parâmetros de transformação do Supabase
        const url = new URL(baseSrc);
        url.searchParams.set('width', width.toString());
        url.searchParams.set('quality', quality.toString());
        if (progressive) url.searchParams.set('format', 'webp');
        return `${url.toString()} ${width}w`;
      })
      .join(', ');
  };

  // Placeholder blur SVG
  const generateBlurPlaceholder = () => {
    if (blurDataURL) return blurDataURL;
    
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" fill="url(#grad)" />
      </svg>
    `)}`;
  };

  const shouldRender = priority || isInView;

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading State */}
      {placeholder === 'blur' && !isLoaded && shouldRender && (
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={generateBlurPlaceholder()}
            alt=""
            className="w-full h-full object-cover filter blur-sm scale-110"
            aria-hidden="true"
          />
        </motion.div>
      )}

      {/* Skeleton Loading */}
      {placeholder === 'empty' && !isLoaded && shouldRender && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Main Image */}
      {shouldRender && (
        <motion.img
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
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
        />
      )}

      {/* Error State */}
      {isError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-center p-4">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Falha ao carregar</p>
          </div>
        </div>
      )}
    </div>
  );
};