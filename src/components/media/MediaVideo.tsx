import { useState, useCallback, useRef, useEffect } from 'react';
import { useMediaFiles } from '@/hooks/useMediaFiles';
import type { MediaVideoProps } from '@/types/media';

export function MediaVideo({
  src,
  className = '',
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = false,
  category,
  fallback
}: MediaVideoProps) {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // If src is provided directly, use it; otherwise fetch from media files
  const shouldFetchFromDB = !src && category;
  const { mediaFiles, loading: mediaLoading } = useMediaFiles(
    shouldFetchFromDB ? {
      category,
      type: 'video'
    } : {}
  );

  const handleVideoError = useCallback(() => {
    setVideoError(true);
    // Hide video on error and show fallback if provided
    if (videoRef.current && fallback) {
      videoRef.current.style.display = 'none';
    }
  }, [fallback]);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  // Determine the video source
  let videoSrc = src;
  if (!videoSrc && mediaFiles.length > 0) {
    videoSrc = mediaFiles[0].url;
  }

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoError && fallback) {
      // Create fallback image element
      const img = document.createElement('img');
      img.src = fallback;
      img.className = className;
      img.alt = 'Video fallback';
      
      // Replace video with image
      video.parentNode?.replaceChild(img, video);
    }
  }, [videoError, fallback, className]);

  // Show loading skeleton while fetching from DB
  if (shouldFetchFromDB && mediaLoading) {
    return (
      <div className={`animate-pulse bg-muted ${className}`}>
        <div className="w-full h-full bg-muted-foreground/10 rounded" />
      </div>
    );
  }

  // Don't render if no source and error occurred without fallback
  if ((!videoSrc || videoError) && !fallback) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 animate-pulse bg-muted">
          <div className="w-full h-full bg-muted-foreground/10 rounded" />
        </div>
      )}
      
      <video
        ref={videoRef}
        className={`${className} ${videoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{ objectPosition: 'center center' }}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
      >
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
        Seu navegador não suporta vídeo HTML5.
      </video>
    </div>
  );
}