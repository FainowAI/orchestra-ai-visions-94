import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AvatarProfileLayout from '@/components/AvatarProfileLayout';
import { getAvatarBySlug } from '@/lib/avatarData';

const AvatarProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!slug) {
    navigate('/');
    return null;
  }

  const avatar = getAvatarBySlug(slug);

  if (!avatar) {
    navigate('/404');
    return null;
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": avatar.name,
    "jobTitle": avatar.subtitle,
    "alternateName": avatar.subtitle,
    "description": avatar.bio?.join(' ') || `${avatar.name} - ${avatar.subtitle}`,
    "url": `https://orchestra.ai/avatares/${avatar.slug}`,
    "image": `https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/hero/${avatar.slug === 'lorenzo-bellini' ? 'lorenzo' : avatar.slug === 'isabela-matos' ? 'isabela' : avatar.slug === 'tay-jackson' ? 'tay' : 'zack'}-hero.jpg`,
    "height": avatar.facts.find(f => f.label === "ALTURA")?.value || "[placeholder]",
    "hairColor": avatar.facts.find(f => f.label === "CABELO")?.value || "[placeholder]",
    "eyeColor": avatar.facts.find(f => f.label === "OLHOS")?.value || "[placeholder]",
    "addressLocality": avatar.facts.find(f => f.label === "ORIGEM")?.value || "[placeholder]",
    "worksFor": {
      "@type": "Organization",
      "name": "Orchestra",
      "url": "https://orchestra.ai"
    },
    "knowsAbout": ["Digital Modeling", "Brand Ambassador", "Virtual Influencer"]
  };

  return (
    <>
      <Helmet>
        <title>
          {avatar.slug === 'isabela-matos' 
            ? 'Isabela Matos – Avatar de IA | Natureza, Bem-estar e Moda Sustentável' 
            : avatar.slug === 'zack'
            ? 'Zack Blanco – Avatar de IA | Lifestyle, Humor e Esportes Radicais'
            : avatar.slug === 'tay-jackson'
            ? 'Tay Jackson – Avatar de IA | Esporte, Luxo e Estilo Global'
            : avatar.slug === 'lorenzo-bellini'
            ? 'Lorenzo Bellini – Avatar de IA | Lifestyle, Elegância Mediterrânea e Moda Masculina'
            : `${avatar.name} — Avatar`
          }
        </title>
        <meta
          name="description"
          content={
            avatar.slug === 'isabela-matos' 
              ? 'Avatar da Orchestra com alma carioca e raízes nordestinas. Parcerias em causas ambientais, bem-estar, arte e moda sustentável. Contato comercial via WhatsApp.'
              : avatar.slug === 'zack'
              ? 'Avatar da Orchestra, paulista, irreverente e energético. Parcerias em lifestyle, humor e esportes radicais. Conteúdo autêntico, leve e ousado.'
              : avatar.slug === 'tay-jackson'
              ? 'Avatar da Orchestra com espírito vencedor e raízes EUA–Brasil–Angola. Parcerias em lifestyle de alto padrão, esportes e moda masculina premium.'
              : avatar.slug === 'lorenzo-bellini'
              ? 'Avatar da Orchestra, flâneur contemporâneo que une cultura, moda e arte. Parcerias em lifestyle refinado, moda masculina e viagens com estética mediterrânea.'
              : `Conheça ${avatar.name}, ${avatar.subtitle}. ${avatar.bio?.[0] || 'Avatar digital da Orchestra.'}`
          }
        />
        <meta name="keywords" content={`${avatar.name}, avatar digital, modelo virtual, IA generativa, Orchestra`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={
          avatar.slug === 'isabela-matos' 
            ? 'Isabela Matos – Avatar de IA | Natureza, Bem-estar e Moda Sustentável'
            : avatar.slug === 'zack'
            ? 'Zack Blanco – Avatar de IA | Lifestyle, Humor e Esportes Radicais'
            : avatar.slug === 'tay-jackson'
            ? 'Tay Jackson – Avatar de IA | Esporte, Luxo e Estilo Global'
            : avatar.slug === 'lorenzo-bellini'
            ? 'Lorenzo Bellini – Avatar de IA | Lifestyle, Elegância Mediterrânea e Moda Masculina'
            : `${avatar.name} | Avatar Digital Orchestra`
        } />
        <meta property="og:description" content={
          avatar.slug === 'isabela-matos'
            ? 'Avatar da Orchestra com alma carioca e raízes nordestinas. Parcerias em causas ambientais, bem-estar, arte e moda sustentável.'
            : avatar.slug === 'zack'
            ? 'Avatar da Orchestra, paulista, irreverente e energético. Parcerias em lifestyle, humor e esportes radicais.'
            : avatar.slug === 'tay-jackson'
            ? 'Avatar da Orchestra com espírito vencedor e raízes EUA–Brasil–Angola. Parcerias em lifestyle de alto padrão, esportes e moda masculina premium.'
            : avatar.slug === 'lorenzo-bellini'
            ? 'Avatar da Orchestra, flâneur contemporâneo que une cultura, moda e arte. Parcerias em lifestyle refinado, moda masculina e viagens com estética mediterrânea.'
            : `Conheça ${avatar.name}, ${avatar.subtitle}.`
        } />
        <meta property="og:image" content={`https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/hero/${avatar.slug === 'lorenzo-bellini' ? 'lorenzo' : avatar.slug === 'isabela-matos' ? 'isabela' : avatar.slug === 'tay-jackson' ? 'tay' : 'zack'}-hero.jpg`} />
        <meta property="og:url" content={`https://orchestra.ai/avatares/${avatar.slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={
          avatar.slug === 'isabela-matos'
            ? 'Isabela Matos – Avatar de IA | Natureza, Bem-estar e Moda Sustentável'
            : avatar.slug === 'zack'
            ? 'Zack Blanco – Avatar de IA | Lifestyle, Humor e Esportes Radicais'
            : avatar.slug === 'tay-jackson'
            ? 'Tay Jackson – Avatar de IA | Esporte, Luxo e Estilo Global'
            : avatar.slug === 'lorenzo-bellini'
            ? 'Lorenzo Bellini – Avatar de IA | Lifestyle, Elegância Mediterrânea e Moda Masculina'
            : `${avatar.name} | Avatar Digital Orchestra`
        } />
        <meta name="twitter:description" content={
          avatar.slug === 'isabela-matos'
            ? 'Avatar da Orchestra com alma carioca e raízes nordestinas. Parcerias em causas ambientais, bem-estar, arte e moda sustentável.'
            : avatar.slug === 'zack'
            ? 'Avatar da Orchestra, paulista, irreverente e energético. Parcerias em lifestyle, humor e esportes radicais.'
            : avatar.slug === 'tay-jackson'
            ? 'Avatar da Orchestra com espírito vencedor e raízes EUA–Brasil–Angola. Parcerias em lifestyle de alto padrão, esportes e moda masculina premium.'
            : avatar.slug === 'lorenzo-bellini'
            ? 'Avatar da Orchestra, flâneur contemporâneo que une cultura, moda e arte. Parcerias em lifestyle refinado, moda masculina e viagens com estética mediterrânea.'
            : `Conheça ${avatar.name}, ${avatar.subtitle}.`
        } />
        <meta name="twitter:image" content={`https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/hero/${avatar.slug === 'lorenzo-bellini' ? 'lorenzo' : avatar.slug === 'isabela-matos' ? 'isabela' : avatar.slug === 'tay-jackson' ? 'tay' : 'zack'}-hero.jpg`} />
        
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <AvatarProfileLayout avatar={avatar} />
        <Footer />
      </div>
    </>
  );
};

export default AvatarProfile;
