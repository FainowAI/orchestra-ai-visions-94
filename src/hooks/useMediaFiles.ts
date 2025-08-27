import { useState, useEffect } from 'react';
import { mediaService } from '@/services/mediaService';
import type { MediaFile, MediaQueryOptions } from '@/types/media';

export function useMediaFiles(options: MediaQueryOptions = {}) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const files = await mediaService.getMediaFiles(options);
        setMediaFiles(files);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch media files');
        console.error('Error in useMediaFiles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaFiles();
  }, [JSON.stringify(options)]); // Dependency on stringified options to handle object changes

  const refetch = async () => {
    mediaService.clearCache();
    const fetchMediaFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const files = await mediaService.getMediaFiles(options);
        setMediaFiles(files);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch media files');
      } finally {
        setLoading(false);
      }
    };
    await fetchMediaFiles();
  };

  return {
    mediaFiles,
    loading,
    error,
    refetch
  };
}

// Hook específico para imagens de avatar (avatar-1, avatar-2, etc.)
export function useAvatarImages() {
  return useMediaFiles({
    category: 'avatar',
    type: 'image'
  });
}

// Hook para buscar imagem específica de avatar por nome
export function useAvatarImage(avatarName: string) {
  const { mediaFiles, loading, error } = useMediaFiles({
    category: 'avatar',
    type: 'image'
  });

  // Mapear avatar names para nomes reais dos arquivos no Supabase
  const avatarMap: { [key: string]: string } = {
    'lorenzo': 'lorenzo-hero',
    'isabela': 'isabela-hero', 
    'tay': 'tay-hero',
    'zack': 'zack-hero'
  };

  const targetName = avatarMap[avatarName.toLowerCase()];
  const avatarImage = mediaFiles.find(img => img.name.includes(targetName) || img.storage_path.includes(targetName));

  return {
    avatarImage,
    loading,
    error
  };
}

// Hook para buscar vídeo de background
export function useHeroVideo() {
  const { mediaFiles, loading, error } = useMediaFiles({
    category: 'hero',
    type: 'video'
  });

  // Buscar especificamente o background-video
  const heroVideo = mediaFiles.find(video => video.name.includes('background-video'));

  return {
    heroVideo: heroVideo || null,
    loading,
    error
  };
}

// Hook para buscar galeria/portfolio de um avatar específico
export function useAvatarPortfolio(avatarName: string) {
  const { mediaFiles, loading, error, refetch } = useMediaFiles({
    category: 'gallery',
    avatar_name: avatarName.toLowerCase(),
    type: 'image'
  });
  
  // Lista de imagens problemáticas que devem ser filtradas
  const problematicImages = [
    'isabela-4.jpg',
    'zack-6.jpg'
  ];
  
  // Filtra imagens problemáticas
  const filteredMediaFiles = mediaFiles.filter(image => 
    !problematicImages.some(problematic => 
      image.name.includes(problematic) || 
      image.storage_path.includes(problematic)
    )
  );
  
  return {
    mediaFiles: filteredMediaFiles,
    loading,
    error,
    refetch
  };
}
