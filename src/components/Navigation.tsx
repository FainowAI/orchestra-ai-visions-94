import { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/hooks/use-theme';
// Using logo from public directory

// Componente do Logo Orchestra com troca fluida entre temas
const OrchestraLogo = ({ isScrolled, isHomePage }: { isScrolled: boolean; isHomePage: boolean }) => {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Inicialização correta baseada no tema atual
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default
  });
  const textColor = isScrolled || !isHomePage ? 'text-primary' : 'text-white dark:text-slate-50';
  
  // Função para determinar se está em modo escuro
  const checkDarkMode = () => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default
  };

  // Atualizar estado quando tema muda
  useEffect(() => {
    setIsDarkMode(checkDarkMode());
  }, [theme]);

  // Listener para mudanças no sistema (quando theme === 'system')
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => setIsDarkMode(mediaQuery.matches);
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);
  
  // Lógica para determinar qual logo usar
  const getLogoSrc = () => {
    if (isDarkMode) {
      return '/logo.png'; // Logo escura sempre a mesma
    }
    
    // Modo claro - lógica especial para homepage
    if (isHomePage) {
      return isScrolled ? '/logo-light.png' : '/logo-light-first.png';
    }
    
    // Outras páginas em modo claro
    return '/logo-light.png';
  };
  
  const logoSrc = getLogoSrc();
  
  return (
    <div className="flex items-center space-x-4">
      {/* Logo gráfico com transição fluida */}
      <div className="flex-shrink-0 relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={logoSrc} // Key muda quando a logo muda, forçando re-render
            src={logoSrc}
            alt="Orchestra Logo" 
            className="w-14 h-14 object-contain"
            style={{
              imageRendering: 'crisp-edges',
              filter: 'contrast(1.1) brightness(1.05)',
            }}
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94], // Easing mais suave para fade
              type: "tween"
            }}
            onError={(e) => {
              // Fallback para logo padrão se a nova não carregar
              e.currentTarget.src = '/logo.png';
              e.currentTarget.style.display = 'block';
            }}
          />
        </AnimatePresence>
      </div>
      
      {/* Texto ORCHESTRA */}
      <div className="flex-shrink-0">
        <span className={`font-futura-light text-2xl lg:text-3xl tracking-widest transition-colors duration-200 ${textColor}`}>
          ORCHESTRA
        </span>
      </div>
    </div>
  );
};

// Componente do Botão Instagram com animação pulsante
const InstagramButton = ({ isScrolled, isHomePage }: { isScrolled: boolean; isHomePage: boolean }) => {
  const textColor = isScrolled || !isHomePage ? 'text-primary' : 'text-white dark:text-slate-50';
  const hoverColor = isScrolled || !isHomePage ? 'hover:text-accent' : 'hover:text-white/80 dark:hover:text-slate-100';
  
  return (
    <motion.button
      onClick={() => window.open('https://www.instagram.com/agenciaorchestra?igsh=dXNsZmN5M29iZDR0', '_blank')}
      className={`transition-colors duration-200 ${textColor} ${hoverColor}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Instagram size={20} />
      </motion.div>
    </motion.button>
  );
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Início', href: '#hero', type: 'section' },
    { label: 'Quem somos', href: '/quem-somos', type: 'page' },
    { label: 'Serviços', href: '#what-we-do', type: 'section' },
    { label: 'Modelos', href: '#squad', type: 'section' },
    { label: 'Contato', href: '/contato', type: 'page' }
  ];

  const handleNavigation = (item: { label: string; href: string; type: string }) => {
    if (item.type === 'page') {
      navigate(item.href);
    } else if (item.type === 'section') {
      // Se estamos em outra página que não seja home, navegar para home primeiro
      if (location.pathname !== '/') {
        navigate('/');
        // Aguardar um momento para a página carregar e então fazer scroll
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Se já estamos na home, fazer scroll direto
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || !isHomePage 
        ? 'bg-background/95 backdrop-blur-md border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('/')}
              className="transition-opacity duration-200 hover:opacity-80"
            >
              <OrchestraLogo isScrolled={isScrolled} isHomePage={isHomePage} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item)}
                  className={`font-futura text-sm tracking-wide transition-colors duration-200 ${
                    isScrolled || !isHomePage
                      ? 'text-foreground/70 hover:text-primary' 
                      : 'text-white/90 hover:text-white dark:text-slate-50 dark:hover:text-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <ThemeToggle variant={isScrolled || !isHomePage ? 'default' : 'white'} />
              <InstagramButton isScrolled={isScrolled} isHomePage={isHomePage} />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle variant={isScrolled || !isHomePage ? 'default' : 'white'} />
            <InstagramButton isScrolled={isScrolled} isHomePage={isHomePage} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors duration-200 ${
                isScrolled || !isHomePage
                  ? 'text-primary hover:text-accent' 
                  : 'text-white hover:text-white/80 dark:text-slate-50 dark:hover:text-slate-100'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <div className="px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item)}
                className="block font-futura text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
