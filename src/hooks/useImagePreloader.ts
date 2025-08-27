import { useEffect, useState, useCallback } from 'react';

interface PreloadOptions {
  priority?: boolean;
  crossOrigin?: 'anonymous' | 'use-credentials';
  timeout?: number; // ms
}

interface PreloadState {
  loaded: boolean;
  error: boolean;
  loading: boolean;
}

/**
 * Hook para preload de uma única imagem
 */
export function useImagePreload(src: string, options: PreloadOptions = {}): PreloadState {
  const [state, setState] = useState<PreloadState>({
    loaded: false,
    error: false,
    loading: false
  });

  const { priority = false, crossOrigin, timeout = 10000 } = options;

  useEffect(() => {
    if (!src) return;

    setState({ loaded: false, error: false, loading: true });

    const img = new Image();
    let timeoutId: NodeJS.Timeout;

    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }

    // Timeout para evitar loading infinito
    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        setState({ loaded: false, error: true, loading: false });
      }, timeout);
    }

    img.onload = () => {
      clearTimeout(timeoutId);
      setState({ loaded: true, error: false, loading: false });
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      setState({ loaded: false, error: true, loading: false });
    };

    // Se é prioridade, carrega imediatamente
    if (priority) {
      img.src = src;
    } else {
      // Delay pequeno para não bloquear a thread principal
      const delayId = setTimeout(() => {
        img.src = src;
      }, 100);

      return () => {
        clearTimeout(delayId);
        clearTimeout(timeoutId);
      };
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [src, priority, crossOrigin, timeout]);

  return state;
}

/**
 * Hook para preload de múltiplas imagens
 */
export function useBatchImagePreload(
  sources: string[], 
  options: PreloadOptions = {}
): { 
  loadedCount: number; 
  totalCount: number; 
  allLoaded: boolean; 
  hasErrors: boolean;
  progress: number;
} {
  const [loadedCount, setLoadedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const { priority = false, crossOrigin, timeout = 10000 } = options;

  useEffect(() => {
    if (!sources.length) return;

    setLoadedCount(0);
    setErrorCount(0);

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        
        if (crossOrigin) {
          img.crossOrigin = crossOrigin;
        }

        const timeoutId = setTimeout(() => {
          setErrorCount(prev => prev + 1);
          resolve();
        }, timeout);

        img.onload = () => {
          clearTimeout(timeoutId);
          setLoadedCount(prev => prev + 1);
          resolve();
        };

        img.onerror = () => {
          clearTimeout(timeoutId);
          setErrorCount(prev => prev + 1);
          resolve();
        };

        img.src = src;
      });
    };

    // Se é prioridade, carrega tudo em paralelo
    if (priority) {
      Promise.all(sources.map(loadImage));
    } else {
      // Carrega sequencialmente para não sobrecarregar
      sources.reduce((promise, src) => {
        return promise.then(() => loadImage(src));
      }, Promise.resolve());
    }
  }, [sources, priority, crossOrigin, timeout]);

  return {
    loadedCount,
    totalCount: sources.length,
    allLoaded: loadedCount === sources.length,
    hasErrors: errorCount > 0,
    progress: sources.length > 0 ? (loadedCount / sources.length) * 100 : 0
  };
}

/**
 * Hook para preload inteligente baseado em viewport e connection
 */
export function useSmartPreload() {
  const [shouldPreload, setShouldPreload] = useState(false);

  useEffect(() => {
    // Verifica se deve fazer preload baseado na conexão
    const checkConnection = () => {
      // @ts-ignore - navigator.connection é experimental
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      if (!connection) {
        setShouldPreload(true); // Se não conseguir detectar, assume conexão boa
        return;
      }

      const { effectiveType, saveData, downlink } = connection;
      
      // Não preload em conexões muito lentas ou modo economia
      if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
        setShouldPreload(false);
        return;
      }

      // Preload apenas em conexões razoáveis
      setShouldPreload(downlink > 1.5);
    };

    checkConnection();

    // Escuta mudanças na conexão
    const handleConnectionChange = () => checkConnection();
    
    // @ts-ignore
    navigator.connection?.addEventListener('change', handleConnectionChange);
    
    return () => {
      // @ts-ignore
      navigator.connection?.removeEventListener('change', handleConnectionChange);
    };
  }, []);

  return shouldPreload;
}

/**
 * Hook para preload de imagens críticas do site
 */
export function useCriticalImagesPreload(avatarImages: string[]) {
  const shouldPreload = useSmartPreload();
  
  const { progress, allLoaded } = useBatchImagePreload(
    shouldPreload ? avatarImages : [],
    { 
      priority: true,
      timeout: 8000 // 8s timeout para imagens críticas
    }
  );

  return {
    preloadProgress: progress,
    criticalImagesLoaded: allLoaded,
    isPreloading: shouldPreload && !allLoaded
  };
}