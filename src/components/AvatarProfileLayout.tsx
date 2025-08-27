import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getOtherAvatars } from '@/lib/avatarData';
import { useMediaFiles } from '@/hooks/useMediaFiles';
import { MediaImage } from '@/components/media';
import type { AvatarData } from '@/lib/avatarData';
import { Link } from 'react-router-dom';

// Mapeamento de slugs para avatar_name
const slugToAvatarName: Record<string, string> = {
  'lorenzo-bellini': 'lorenzo',
  'isabela-matos': 'isabela',
  'tay-jackson': 'tay',
  'zack': 'zack'
};

interface AvatarProfileLayoutProps {
  avatar: AvatarData;
}

const AvatarProfileLayout: React.FC<AvatarProfileLayoutProps> = ({ avatar }) => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  
  // Busca outros avatares relacionados
  const otherAvatars = getOtherAvatars(avatar.slug);
  
  // Busca imagens do avatar atual
  const avatarName = slugToAvatarName[avatar.slug];
  const { mediaFiles: heroImages } = useMediaFiles({
    category: 'avatar',
    avatar_name: avatarName,
    type: 'image'
  });
  const { mediaFiles: galleryImages } = useMediaFiles({
    category: 'gallery',
    avatar_name: avatarName,
    type: 'image'
  });
  
  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => 
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => 
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  // Reset current hero image when avatar changes
  useEffect(() => {
    setCurrentHeroImage(0);
  }, [avatar.slug]);

  return (
    <main className="pt-20 avatar-profile">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-24 py-3 sm:py-4">
        <nav className="font-futura text-[clamp(0.75rem,3vw,0.875rem)] tracking-wide text-foreground/60">
          <Link 
            to="/#squad" 
            className="hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[44px] inline-flex items-center"
          >
            Avatares
          </Link>
          <span className="mx-2">›</span>
          <span className="text-foreground max-w-[20ch] truncate">{avatar.name}</span>
        </nav>
      </div>

      {/* Hero Editorial */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
        <div className="relative w-full h-full">
          {/* Hero Image Slider */}
          {heroImages.length > 0 ? (
            <motion.div 
              key={currentHeroImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full overflow-hidden"
            >
              <MediaImage 
                src={heroImages[currentHeroImage]?.url}
                alt={`${avatar.name} - Imagem ${currentHeroImage + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full animate-pulse bg-muted" />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Navigation Controls */}
          {heroImages.length > 1 && (
            <>
              <div className="absolute inset-0 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
                <button 
                  onClick={prevHeroImage}
                  className="pointer-events-auto p-3 sm:p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button 
                  onClick={nextHeroImage}
                  className="pointer-events-auto p-3 sm:p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              
              {/* Indicators */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroImage(index)}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-200 ${
                      index === currentHeroImage 
                        ? 'bg-white w-6 h-3 rounded-full' 
                        : 'bg-white/50 hover:bg-white/70 w-3 h-3 rounded-full'
                    }`}
                    aria-label={`Imagem ${index + 1} de ${heroImages.length}`}
                    aria-current={index === currentHeroImage ? 'true' : 'false'}
                  />
                ))}
              </div>
            </>
          )}

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="hero-title font-futura-light text-[clamp(2.5rem,8vw,4rem)] md:text-7xl lg:text-8xl text-white mb-3 sm:mb-4 tracking-[clamp(0.1em,2vw,0.2em)] leading-[0.9]">
                {avatar.name}
              </h1>
              <p className="hero-subtitle font-futura text-[clamp(1rem,4vw,1.25rem)] md:text-2xl text-white/80 tracking-wide font-light leading-[1.3] max-w-[35ch] sm:max-w-none">
                {avatar.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="px-4 sm:px-6 lg:px-24 py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-futura-light text-[clamp(2rem,6vw,3rem)] md:text-5xl text-primary mb-6 sm:mb-8 tracking-wide leading-[1.1]">
              {avatar.name}
            </h2>
            <div className="space-y-4 sm:space-y-6 max-w-[65ch] mx-auto">
              {avatar.bio.map((paragraph, index) => (
                <p 
                  key={index}
                  className="font-futura text-[clamp(1rem,3.5vw,1.125rem)] text-foreground/80 leading-[1.6] font-light text-left sm:text-center"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl mx-auto"
        >
          <h3 className="font-futura-light text-[clamp(1.75rem,5vw,2.5rem)] md:text-4xl text-primary mb-8 sm:mb-12 tracking-wide leading-[1.2]">
            Detalhes
          </h3>
          <div className="facts-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8">
            {avatar.facts.map((fact, index) => (
              <div key={index} className="text-left sm:text-center lg:text-left">
                <dt className="font-futura text-[clamp(0.75rem,3vw,0.875rem)] tracking-widest uppercase text-foreground/60 mb-2 leading-[1.3]">
                  {fact.label}
                </dt>
                <dd className="font-futura text-[clamp(1.125rem,4vw,1.25rem)] md:text-2xl font-bold text-foreground leading-[1.3] max-w-[25ch] sm:max-w-none">
                  {fact.value}
                </dd>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Estética & Styling */}
      <section className="px-4 sm:px-6 lg:px-24 py-12 sm:py-16 lg:py-24 bg-accent/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="font-futura-light text-[clamp(2rem,6vw,3rem)] md:text-5xl text-primary mb-8 sm:mb-12 tracking-wide leading-[1.1]">
            Estética & Styling
          </h3>
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h4 className="font-futura text-[clamp(0.875rem,3.5vw,1rem)] tracking-widest uppercase text-foreground/60 mb-3 sm:mb-4 leading-[1.3]">
                Look & vibe
              </h4>
              <p className="font-futura-light text-[clamp(1rem,3.5vw,1.125rem)] text-foreground leading-[1.6] max-w-[65ch]">
                {avatar.slug === 'zack'
                  ? 'Urbano-moderno com pegada esportiva — blazer leve + camiseta básica + sneakers; bomber e peças casuais; mistura de street com performance (pronto tanto para um evento quanto para uma aventura). Pele clara, sorriso largo e expressivo; cabelo castanho curto e bem finalizado.'
                  : avatar.slug === 'tay-jackson'
                  ? 'Esportivo premium + casual de luxo — polos, jaquetas de couro, sneakers exclusivos, ternos sob medida. Pele negra radiante, sorriso confiante, porte atlético; cabelo curto e sempre bem finalizado.'
                  : avatar.slug === 'lorenzo-bellini'
                  ? 'Elegância natural; alfaiataria desconstruída, camisas de linho, blazers leves, jeans de corte preciso, mocassins de couro; acessórios discretos (relógios, lenços, óculos Persol).'
                  : 'Boêmio-brasileiro com influências cariocas e nordestinas (vestidos fluidos, tecidos crus/linho/algodão, acessórios artesanais, sandálias de palha, tons terrosos). Pele iluminada; make minimalista (realçar pele e olhar).'
                }
              </p>
            </div>
            <div>
              <h4 className="font-futura text-[clamp(0.875rem,3.5vw,1rem)] tracking-widest uppercase text-foreground/60 mb-3 sm:mb-4 leading-[1.3]">
                Paleta Sugerida
              </h4>
              <p className="font-futura-light text-[clamp(1rem,3.5vw,1.125rem)] text-foreground leading-[1.6] max-w-[65ch]">
                {avatar.slug === 'zack'
                  ? 'Vermelho vibrante, azul elétrico, preto e branco (urbano/energético).'
                  : avatar.slug === 'tay-jackson'
                  ? 'Azul-marinho, preto, cinza metálico, branco minimalista; acentos dourado/prata e verde-esporte em detalhes.'
                  : avatar.slug === 'lorenzo-bellini'
                  ? 'Bege, off-white, cáqui, terracota, vinho, verde oliva com detalhes azul-marinho/preto.'
                  : 'Verdes (musgo/oliva/verde-claro), marrons (caramelo/terracota/areia), neutros (cru/bege/off-white), toques de coral queimado/mostarda/azul-petróleo.'
                }
              </p>
            </div>
            <div>
              <h4 className="font-futura text-[clamp(0.875rem,3.5vw,1rem)] tracking-widest uppercase text-foreground/60 mb-3 sm:mb-4 leading-[1.3]">
                Adequação
              </h4>
              <p className="font-futura-light text-[clamp(1rem,3.5vw,1.125rem)] text-foreground leading-[1.6] max-w-[65ch]">
                {avatar.slug === 'zack'
                  ? 'Marcas que buscam autenticidade, leveza e ousadia (moda/athleisure, streetwear, gadgets/tech, bebidas & food service, turismo de aventura, eventos/experiências).'
                  : avatar.slug === 'tay-jackson'
                  ? 'Campanhas premium (luxo esportivo, moda urbana de alto padrão, viagens/extras exclusivas, relógios & acessórios, automotivo, bebidas & gastronomia fine dining).'
                  : avatar.slug === 'lorenzo-bellini'
                  ? 'Moda premium/alfaiataria, eyewear de design, relojoaria/acessórios discretos, hotelaria & viagens de charme, vinhos & gastronomia, automotivo de luxo.'
                  : 'Campanhas com propósito, produtos "clean/eco", experiências na natureza e projetos culturais.'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-24">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-futura-light text-[clamp(2.5rem,7vw,4rem)] lg:text-6xl text-primary mb-8 sm:mb-12 lg:mb-16 tracking-[clamp(0.1em,2vw,0.2em)] leading-[0.9]"
        >
          PORTFOLIO
        </motion.h2>
        
        {galleryImages.length > 0 ? (
          <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {galleryImages.map((mediaFile, index) => (
              <motion.div
                key={mediaFile.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <MediaImage 
                    src={mediaFile.url}
                    alt={`${avatar.name} - Portfolio ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-[4/5] animate-pulse bg-muted rounded-lg" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AvatarProfileLayout;