import { Brain, Palette, Users, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Brain,
      title: "IA Personalizada",
      description: "Desenvolvemos avatares únicos usando tecnologia de ponta em inteligência artificial"
    },
    {
      icon: Palette,
      title: "Design Exclusivo",
      description: "Criação visual refinada que reflete perfeitamente a identidade da sua marca"
    },
    {
      icon: Users,
      title: "Experiência Humana",
      description: "Avatares que criam conexões emocionais autênticas com seu público-alvo"
    },
    {
      icon: Zap,
      title: "Implementação Rápida",
      description: "Integração eficiente em suas plataformas digitais existentes"
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`font-futura-light text-5xl md:text-6xl text-primary mb-6 tracking-widest transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            O QUE FAZEMOS
          </h2>
          <div className={`w-24 h-px bg-orchestra-gradient mx-auto mb-8 transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transformOrigin: 'center' }}></div>
          <p className={`font-futura text-xl text-foreground/70 max-w-3xl mx-auto tracking-wide transition-all duration-800 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Transformamos ideias em avatares de IA que redefinem
            <br />
            a experiência digital das marcas mais inovadoras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`border-0 bg-card group transition-all duration-800 hover:shadow-2xl hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${700 + index * 150}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="service-icon w-16 h-16 bg-orchestra-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="font-futura-medium text-xl text-primary mb-4 tracking-wide">
                  {service.title}
                </h3>
                
                <p className="font-futura text-foreground/70 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;