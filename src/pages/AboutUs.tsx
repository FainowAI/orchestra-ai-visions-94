import React from 'react';
import { Helmet } from 'react-helmet-async';
import AboutWhoWeAreSection from '@/components/about/AboutWhoWeAreSection';
import AboutCasesSection from '@/components/about/AboutCasesSection';
import AboutCTASection from '@/components/about/AboutCTASection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AboutUs: React.FC = () => {
  // Schema.org JSON-LD
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Orchestra",
    "alternateName": "Agência Orchestra",
    "description": "Agência de criatividade e performance especializada em avatares digitais hiper-realistas, clones personalizados e modelos virtuais com IA generativa para campanhas de marketing e branding estratégico",
    "url": "https://orchestra.ai",
    "logo": "https://orchestra.ai/logo.png",
    "foundingDate": "2024",
    "numberOfEmployees": "10-50",
    "serviceArea": {
      "@type": "Country",
      "name": "Brasil"
    },
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Criação de Avatares Digitais com IA Generativa",
        "description": "Desenvolvimento de avatares digitais hiper-realistas, clones personalizados e modelos virtuais para campanhas de marketing"
      }
    },
    "knowsAbout": [
      "Avatares Digitais",
      "IA Generativa", 
      "Clones Personalizados",
      "Modelos Virtuais",
      "Marketing Digital",
      "Branding",
      "Digital Twins"
    ],
    "sameAs": [
      "https://instagram.com/orchestra.ai",
      "https://linkedin.com/company/orchestra-ai"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    }
  };

  return (
    <>
      <Helmet>
        <title>Quem Somos | Orchestra - Agência de Avatares Digitais Hiper-Realistas com IA Generativa</title>
        <meta 
          name="description" 
          content="Orchestra: agência de criatividade e performance especializada em avatares digitais hiper-realistas, clones personalizados e modelos virtuais com IA generativa para campanhas de marketing e branding estratégico." 
        />
        <meta name="keywords" content="avatares digitais hiper-realistas, IA generativa, clones personalizados, modelos virtuais, agência de performance, marketing com IA, avatares para campanhas, branding digital, digital twins, criatividade e performance" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Orchestra - Agência de Avatares Digitais Hiper-Realistas com IA Generativa" />
        <meta property="og:description" content="Agência especializada em avatares digitais hiper-realistas, clones personalizados e modelos virtuais com IA generativa. Criatividade e performance para sua marca." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://orchestra.ai/og-about.jpg" />
        <meta property="og:url" content="https://orchestra.ai/quem-somos" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Orchestra - Avatares Digitais Hiper-Realistas com IA Generativa" />
        <meta name="twitter:description" content="Agência de criatividade e performance especializada em avatares digitais, clones personalizados e modelos virtuais com IA generativa." />
        <meta name="twitter:image" content="https://orchestra.ai/og-about.jpg" />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background">
        <Navigation />
        <AboutWhoWeAreSection />
        <AboutCasesSection />
        <AboutCTASection />
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;