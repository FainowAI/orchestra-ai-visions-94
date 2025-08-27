import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MediaImage } from '@/components/media';
import { useAvatarImages } from '@/hooks/useMediaFiles';
import { avatarMockData } from '@/lib/avatarData';

const SquadSection = () => {
  const [hoveredModel, setHoveredModel] = useState<number | null>(null);
  const { mediaFiles: avatarImages, loading: avatarsLoading } = useAvatarImages();

  // Mapear avatar names para nomes reais dos arquivos no Supabase
  const avatarMap: { [key: string]: string } = {
    'lorenzo': 'lorenzo-hero',
    'isabela': 'isabela-hero', 
    'tay': 'tay-hero',
    'zack': 'zack-hero'
  };

  const getAvatarImage = (avatar_name: string) => {
    const targetName = avatarMap[avatar_name];
    return avatarImages.find(img => img.name.includes(targetName) || img.storage_path.includes(targetName))?.url;
  };

  return (
    <section id="squad" className="w-screen min-h-screen bg-background">
      {/* Editorial Title */}
      <div className="px-6 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-futura-light text-[clamp(2.25rem,7vw,4rem)] md:text-6xl lg:text-7xl xl:text-8xl text-primary tracking-[clamp(0.05em,1.5vw,0.2em)] leading-[0.9] mb-6 sm:mb-8"
        >
          NOSSOS
          <br />
          MODELOS
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-futura text-[clamp(0.875rem,3.5vw,1.125rem)] text-foreground/60 max-w-[45ch] sm:max-w-lg font-light tracking-wide leading-[1.45]"
        >
          Uma seleção de avatares digitais criados para redefinir a presença visual das marcas mais visionárias.
        </motion.p>
      </div>

      {/* Full-width Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-auto">
        {avatarMockData.map((model, index) => (
          <motion.div 
            key={model.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative group"
            onMouseEnter={() => setHoveredModel(model.id)}
            onMouseLeave={() => setHoveredModel(null)}
          >
            <Link 
              to={`/avatares/${model.slug}`}
              className="block relative h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[400px]"
            >
              {avatarsLoading ? (
                <div className="w-full h-full animate-pulse bg-muted" />
              ) : (
                <MediaImage 
                  src={getAvatarImage(model.avatar_name)}
                  alt={`${model.name} - Avatar Digital`}
                  className="w-full h-full object-cover sm:object-cover md:object-cover transition-all duration-700 group-hover:scale-105"
                  loading={index < 2 ? "eager" : "lazy"}
                />
              )}
              
              {/* Minimal overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
              
              {/* Model name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <motion.h3 
                  initial={{ opacity: 0.7 }}
                  animate={{ 
                    opacity: hoveredModel === model.id ? 1 : 0.7,
                    y: hoveredModel === model.id ? -10 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-futura-light text-[clamp(1.5rem,5vw,2rem)] md:text-4xl lg:text-5xl squad-text-white tracking-[clamp(0.1em,2vw,0.3em)] leading-[1.1] max-w-[15ch]"
                >
                  {model.name}
                </motion.h3>
              </div>
            </Link>
            
            {/* Vertical divider (except last item) */}
            {index < avatarMockData.length - 1 && (
              <div className="hidden md:block absolute top-0 right-0 w-px h-full bg-border/30" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SquadSection;