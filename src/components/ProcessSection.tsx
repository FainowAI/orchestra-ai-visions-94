import { MessageCircle, Brush, Cpu, Rocket } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ProcessSection = () => {
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

  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: "Briefing",
      description: "Entendemos sua marca, objetivos e visão para o avatar perfeito"
    },
    {
      number: "02", 
      icon: Brush,
      title: "Design",
      description: "Criamos conceitos visuais únicos que refletem sua identidade"
    },
    {
      number: "03",
      icon: Cpu,
      title: "IA Training",
      description: "Treinamos a inteligência artificial com dados específicos da sua marca"
    },
    {
      number: "04",
      icon: Rocket,
      title: "Deploy",
      description: "Implementamos e integramos o avatar nas suas plataformas digitais"
    }
  ];

  return (
    <section ref={sectionRef} id="process" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`font-futura-light text-5xl md:text-6xl text-primary mb-6 tracking-widest transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            CRIAÇÃO PERSONALIZADA
          </h2>
          <div className={`w-24 h-px bg-orchestra-gradient mx-auto mb-8 transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transformOrigin: 'center' }}></div>
          <p className={`font-futura text-xl text-foreground/70 max-w-3xl mx-auto tracking-wide transition-all duration-800 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Nosso processo de criação em 4 etapas garante
            <br />
            um avatar de IA único e perfeitamente alinhado à sua marca
          </p>
        </div>

        <div className="relative">
          {/* Process Timeline */}
          <div className={`hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border transform -translate-y-1/2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transformOrigin: 'center' }}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative text-center transition-all duration-1000 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                {/* Step Number */}
                <div className={`relative z-10 w-24 h-24 bg-orchestra-gradient rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-800 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'}`} style={{ transitionDelay: `${1200 + index * 200}ms` }}>
                  <span className="font-futura-medium text-2xl text-primary-foreground tracking-wide">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-background border-2 border-border rounded-full flex items-center justify-center mx-auto mb-6 hover:border-accent hover:scale-110 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>

                {/* Content */}
                <h3 className="font-futura-medium text-xl text-primary mb-4 tracking-wide">
                  {step.title}
                </h3>
                
                <p className="font-futura text-foreground/70 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Connection Line for Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-px h-12 bg-border mx-auto mt-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;