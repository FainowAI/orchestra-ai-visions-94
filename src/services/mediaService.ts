import { supabase } from "@/integrations/supabase/client";
import type { MediaFile, MediaQueryOptions } from "@/types/media";

class MediaService {
  private cache = new Map<string, MediaFile[]>();
  private cacheExpiry = new Map<string, number>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private preloadQueue = new Set<string>();
  private compressionCache = new Map<string, string>();

  private getCacheKey(options: MediaQueryOptions): string {
    return JSON.stringify(options);
  }

  private isCacheValid(key: string): boolean {
    const expiry = this.cacheExpiry.get(key);
    return expiry ? Date.now() < expiry : false;
  }

  async getMediaFiles(options: MediaQueryOptions = {}): Promise<MediaFile[]> {
    const cacheKey = this.getCacheKey(options);
    
    // Check cache first
    if (this.cache.has(cacheKey) && this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let query = supabase.from('media_files').select('*');

    // Apply filters
    if (options.category) {
      query = query.eq('category', options.category);
    }
    if (options.avatar_name) {
      query = query.eq('avatar_name', options.avatar_name);
    }
    if (options.type) {
      query = query.eq('type', options.type);
    }

    const { data, error } = await query.order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching media files:', error);
      return [];
    }

    const mediaFiles = (data || []) as MediaFile[];
    
    // Ensure URLs are correct based on storage_path
    const validatedFiles = mediaFiles.map(file => ({
      ...file,
      url: this.validateUrl(file)
    }));
    
    // Cache the result
    this.cache.set(cacheKey, validatedFiles);
    this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);

    return validatedFiles;
  }

  async getMediaFileByPath(storagePath: string): Promise<MediaFile | null> {
    const { data, error } = await supabase
      .from('media_files')
      .select('*')
      .eq('storage_path', storagePath)
      .maybeSingle();

    if (error) {
      console.error('Error fetching media file:', error);
      return null;
    }

    return data as MediaFile | null;
  }

  async getAvatarImages(avatarName: string): Promise<MediaFile[]> {
    return this.getMediaFiles({
      category: 'avatar',
      avatar_name: avatarName,
      type: 'image'
    });
  }

  async getHeroVideo(): Promise<MediaFile | null> {
    const files = await this.getMediaFiles({
      category: 'hero',
      type: 'video'
    });
    return files[0] || null;
  }

  getPublicUrl(storagePath: string, options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  }): string {
    const { data } = supabase.storage.from('media').getPublicUrl(storagePath);
    
    if (!options) return data.publicUrl;
    
    // Cache key para URL otimizada
    const cacheKey = `${storagePath}-${JSON.stringify(options)}`;
    if (this.compressionCache.has(cacheKey)) {
      return this.compressionCache.get(cacheKey)!;
    }
    
    // Adiciona parâmetros de otimização para Supabase Storage
    const url = new URL(data.publicUrl);
    
    if (options.width) url.searchParams.set('width', options.width.toString());
    if (options.height) url.searchParams.set('height', options.height.toString());
    if (options.quality) url.searchParams.set('quality', options.quality.toString());
    if (options.format) url.searchParams.set('format', options.format);
    
    // Cache da URL otimizada
    const optimizedUrl = url.toString();
    this.compressionCache.set(cacheKey, optimizedUrl);
    
    return optimizedUrl;
  }

  // Validate and fix URL if needed
  validateUrl(mediaFile: MediaFile): string {
    const correctUrl = this.getPublicUrl(mediaFile.storage_path);
    
    // If the stored URL doesn't match the correct URL, log and return correct one
    if (mediaFile.url !== correctUrl) {
      console.log('MediaService: URL mismatch detected', {
        stored: mediaFile.url,
        correct: correctUrl,
        storage_path: mediaFile.storage_path
      });
      return correctUrl;
    }
    
    return mediaFile.url;
  }

  // Preload de imagens críticas
  async preloadCriticalImages(mediaFiles: MediaFile[]): Promise<void> {
    const criticalImages = mediaFiles.slice(0, 4); // Primeiras 4 imagens
    
    const preloadPromises = criticalImages.map(async (file) => {
      if (this.preloadQueue.has(file.url)) return;
      
      this.preloadQueue.add(file.url);
      
      try {
        // Preload em diferentes qualidades
        const urls = [
          this.getPublicUrl(file.storage_path, { quality: 70, format: 'webp' }),
          this.getPublicUrl(file.storage_path, { quality: 85, format: 'webp' })
        ];
        
        await Promise.all(
          urls.map(url => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = url;
            });
          })
        );
        
        console.log('MediaService: Preloaded image:', file.name);
      } catch (error) {
        console.warn('MediaService: Failed to preload:', file.name, error);
      }
    });
    
    await Promise.all(preloadPromises);
  }
  
  // Otimizar URL baseado na conexão do usuário
  getOptimizedUrl(file: MediaFile, options?: {
    targetWidth?: number;
    preferWebP?: boolean;
  }): string {
    // @ts-ignore - navigator.connection é experimental
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    let quality = 85;
    let format: 'webp' | 'jpg' = 'webp';
    let width = options?.targetWidth;
    
    if (connection) {
      const { effectiveType, downlink, saveData } = connection;
      
      // Ajusta qualidade baseado na conexão
      if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
        quality = 50;
        width = Math.min(width || 800, 800);
      } else if (effectiveType === '3g' || downlink < 5) {
        quality = 70;
        width = Math.min(width || 1200, 1200);
      }
      
      // Fallback para JPG em conexões muito lentas
      if (downlink < 1) {
        format = 'jpg';
      }
    }
    
    // Força WebP se suportado e solicitado
    if (options?.preferWebP !== false && this.supportsWebP()) {
      format = 'webp';
    }
    
    return this.getPublicUrl(file.storage_path, {
      quality,
      format,
      width
    });
  }
  
  // Verifica suporte a WebP
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  }
  
  // Registra Service Worker para cache avançado
  async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('MediaService: SW registered:', registration);
        
        // Envia lista de imagens críticas para preload
        if (navigator.serviceWorker.controller) {
          const criticalImages = Array.from(this.preloadQueue);
          navigator.serviceWorker.controller.postMessage({
            type: 'PRELOAD_IMAGES',
            urls: criticalImages
          });
        }
      } catch (error) {
        console.error('MediaService: SW registration failed:', error);
      }
    }
  }
  
  clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
    this.compressionCache.clear();
    this.preloadQueue.clear();
  }

  // Force clear cache for specific deleted images to prevent 404s
  clearDeletedImagesCache(): void {
    const deletedImages = [
      'tay-oculos.png',
      'lorenzo-carro.png', 
      'sofia-desf.png'
    ];
    
    // Clear browser cache for these specific images
    deletedImages.forEach(imageName => {
      // Try to clear from browser cache by creating failed requests
      const testUrl = this.getPublicUrl(imageName);
      if ('caches' in window) {
        caches.open('media-cache').then(cache => {
          cache.delete(testUrl);
        }).catch(() => {}); // Silent fail if cache API not supported
      }
    });

    // Clear all internal caches
    this.clearCache();
    
    console.log('MediaService: Cleared cache for deleted carousel images');
  }

  // Enhanced cache clearing with storage cleanup
  async clearAllCaches(): Promise<void> {
    try {
      // Clear internal caches
      this.clearCache();
      
      // Clear browser storage caches if available
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }

      // Clear localStorage entries related to media
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('media') || key.includes('image') || key.includes('carousel'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));

      console.log('MediaService: All caches cleared successfully');
    } catch (error) {
      console.error('MediaService: Error clearing caches:', error);
    }
  }
}

export const mediaService = new MediaService();