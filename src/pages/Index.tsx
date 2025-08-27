import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import SquadSection from '@/components/SquadSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="fullscreen-layout">
      <Navigation />
      <main>
        <HeroSection />
        <WhatWeDoSection />
        <SquadSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
