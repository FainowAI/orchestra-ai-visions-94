import React from 'react';
import { motion } from 'framer-motion';
import { MediaImage } from '@/components/media';
import { useAvatarPortfolio } from '@/hooks/useMediaFiles';

interface AvatarGalleryProps {
  avatarName: string;
  title?: string;
  className?: string;
}

export const AvatarGallery: React.FC<AvatarGalleryProps> = ({ 
  avatarName, 
  title,
  className = "" 
}) => {
  const { mediaFiles: portfolioImages, loading, error } = useAvatarPortfolio(avatarName);

  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 ${className}`}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className="aspect-square bg-muted animate-pulse rounded-md" />
        ))}
      </div>
    );
  }

  if (error || portfolioImages.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">
          {error ? 'Erro ao carregar imagens' : 'Nenhuma imagem encontrada'}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-futura-light text-3xl md:text-4xl text-primary mb-8 tracking-wide"
        >
          {title}
        </motion.h3>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {portfolioImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <MediaImage
              src={image.url}
              alt={`${avatarName} portfolio ${index + 1}`}
              className="w-full aspect-[4/5] sm:aspect-square object-cover rounded-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AvatarGallery;