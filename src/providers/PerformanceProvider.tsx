import React, { createContext, useContext, useEffect, useState } from 'react';
import { mediaService } from '@/services/mediaService';
import { useAvatarImages } from '@/hooks/useMediaFiles';

interface PerformanceContextType {
  isOptimizationEnabled: boolean;
  connectionType: string;
  preloadProgress: number;
  criticalResourcesLoaded: boolean;
}

const PerformanceContext = createContext<PerformanceContextType>({
  isOptimizationEnabled: true,
  connectionType: 'unknown',
  preloadProgress: 0,
  criticalResourcesLoaded: false
});

export const usePerformance = () => useContext(PerformanceContext);

interface PerformanceProviderProps {
  children: React.ReactNode;
  enableOptimizations?: boolean;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({
  children,
  enableOptimizations = true
}) => {
  const [isOptimizationEnabled, setIsOptimizationEnabled] = useState(enableOptimizations);
  const [connectionType, setConnectionType] = useState('unknown');
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [criticalResourcesLoaded, setCriticalResourcesLoaded] = useState(false);

  const { mediaFiles: avatarImages, loading: avatarLoading } = useAvatarImages();

  // Detecta tipo de conexão
  useEffect(() => {
    const detectConnection = () => {
      // @ts-ignore
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');
        
        // Desabilita otimizações em conexões muito lentas
        if (connection.effectiveType === 'slow-2g' || connection.saveData) {
          setIsOptimizationEnabled(false);
        }
        
        // Listener para mudanças na conexão
        const handleConnectionChange = () => {
          setConnectionType(connection.effectiveType || 'unknown');
        };
        
        connection.addEventListener('change', handleConnectionChange);
        
        return () => {
          connection.removeEventListener('change', handleConnectionChange);
        };
      }
    };

    detectConnection();
  }, []);

  // Inicializa otimizações quando avatares carregam
  useEffect(() => {
    if (!avatarLoading && avatarImages.length > 0 && isOptimizationEnabled) {
      initializeOptimizations();
    }
  }, [avatarLoading, avatarImages, isOptimizationEnabled]);

  const initializeOptimizations = async () => {
    try {
      console.log('PerformanceProvider: Initializing optimizations...');
      
      // 1. Registra Service Worker
      await mediaService.registerServiceWorker();
      
      // 2. Preload de imagens críticas
      setPreloadProgress(20);
      await mediaService.preloadCriticalImages(avatarImages);
      setPreloadProgress(60);
      
      // 3. Preload de resources críticos do DOM
      await preloadCriticalResources();
      setPreloadProgress(80);
      
      // 4. Otimizações de runtime
      setupRuntimeOptimizations();
      setPreloadProgress(100);
      
      setCriticalResourcesLoaded(true);
      console.log('PerformanceProvider: Optimizations complete');
      
    } catch (error) {
      console.error('PerformanceProvider: Optimization failed:', error);
      setCriticalResourcesLoaded(true); // Continua mesmo com erro
    }
  };

  const preloadCriticalResources = async (): Promise<void> => {
    return new Promise((resolve) => {
      // Preload de fonts críticas
      const fonts = [
        'Montserrat',
        'Futura'
      ];

      // Preload de recursos críticos
      const criticalResources = [
        '/logo.png',
        '/favicon.ico'
      ];

      const promises = [
        // Font preload
        ...fonts.map(font => {
          return document.fonts.load(`1em ${font}`).catch(() => {});
        }),
        
        // Resource preload
        ...criticalResources.map(resource => {
          return new Promise<void>((resolve) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.png') ? 'image' : 'fetch';
            link.onload = () => resolve();
            link.onerror = () => resolve(); // Continue mesmo com erro
            document.head.appendChild(link);
            
            // Timeout para não travar
            setTimeout(() => resolve(), 2000);
          });
        })
      ];

      Promise.all(promises).finally(() => {
        setTimeout(resolve, 500); // Buffer adicional
      });
    });
  };

  const setupRuntimeOptimizations = () => {
    // 1. Image lazy loading observer otimizado
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '100px', // Carrega 100px antes
          threshold: 0.1
        }
      );

      // Observa todas as imagens com data-src
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }

    // 2. Prefetch de páginas importantes no hover
    const prefetchOnHover = (selector: string, urls: string[]) => {
      document.addEventListener('mouseover', (e) => {
        const target = e.target as HTMLElement;
        if (target.matches(selector)) {
          urls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
          });
        }
      }, { once: true });
    };

    // Prefetch de páginas de avatares
    prefetchOnHover('a[href*="/avatares/"]', [
      '/avatares/lorenzo-bellini',
      '/avatares/isabela-matos',
      '/avatares/tay-jackson',
      '/avatares/zack'
    ]);

    // 3. Cleanup de resources não utilizados
    const cleanupInterval = setInterval(() => {
      // Remove preload links após uso
      document.querySelectorAll('link[rel="preload"]').forEach((link) => {
        const htmlLink = link as HTMLLinkElement;
        if (Date.now() - parseInt(htmlLink.dataset.created || '0') > 60000) {
          link.remove();
        }
      });
    }, 30000);

    // 4. Memory management
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pausa animações pesadas quando tab não está ativo
        document.querySelectorAll('video[autoplay]').forEach((video: any) => {
          video.pause();
        });
      } else {
        // Resume animações quando volta
        document.querySelectorAll('video[autoplay]').forEach((video: any) => {
          video.play().catch(() => {});
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(cleanupInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  };

  const contextValue: PerformanceContextType = {
    isOptimizationEnabled,
    connectionType,
    preloadProgress,
    criticalResourcesLoaded
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
};

export default PerformanceProvider;