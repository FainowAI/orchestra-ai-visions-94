import { useState, useCallback } from 'react';
import { useMediaFiles } from '@/hooks/useMediaFiles';
import type { MediaImageProps } from '@/types/media';

export function MediaImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  category,
  avatar_name,
  fallback = '/placeholder.svg'
}: MediaImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // If src is provided directly, use it; otherwise fetch from media files
  const shouldFetchFromDB = !src && (category || avatar_name);
  const { mediaFiles, loading: mediaLoading } = useMediaFiles(
    shouldFetchFromDB ? {
      category,
      avatar_name,
      type: 'image'
    } : {}
  );

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Determine the image source
  let imageSrc = src;
  if (!imageSrc && mediaFiles.length > 0) {
    imageSrc = mediaFiles[0].url;
  }

  // Show loading skeleton while fetching from DB
  if (shouldFetchFromDB && mediaLoading) {
    return (
      <div className={`animate-pulse bg-muted ${className}`}>
        <div className="w-full h-full bg-muted-foreground/10 rounded" />
      </div>
    );
  }

  // Use fallback if no source found or error occurred
  const finalSrc = imageError || !imageSrc ? fallback : imageSrc;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 animate-pulse bg-muted">
          <div className="w-full h-full bg-muted-foreground/10 rounded" />
        </div>
      )}
      
      <img
        src={finalSrc}
        alt={alt}
        className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading={loading}
        decoding={decoding}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
}