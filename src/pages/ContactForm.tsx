import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fadeInUp, slideInStagger, createScrollObserver } from '@/utils/animations';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    instagram: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = createScrollObserver((entry) => {
      if (entry.isIntersecting) {
        if (titleRef.current) {
          fadeInUp(titleRef.current, 0);
        }
        if (formRef.current) {
          const formElements = formRef.current.querySelectorAll('.form-element') as NodeListOf<HTMLElement>;
          slideInStagger(Array.from(formElements), 150);
        }
      }
    }, 0.2);

    if (titleRef.current) observer.observe(titleRef.current);
    if (formRef.current) observer.observe(formRef.current);

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 30,
        stiffness: 300
      }
    }
  };

  const titleVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 200
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      // Success feedback
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Entraremos em contato em breve.',
        duration: 5000,
      });

      // Reset form
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        instagram: ''
      });
      
    } catch (error) {
      toast.error('Erro ao enviar mensagem', {
        description: 'Tente novamente ou entre em contato diretamente.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <motion.div
          className="container mx-auto px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-16">
              <motion.button
                onClick={() => navigate('/')}
                variants={itemVariants}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8 font-futura tracking-wider"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                VOLTAR
              </motion.button>

              <motion.h1
                ref={titleRef}
                variants={titleVariants}
                className="font-futura-light text-6xl md:text-7xl lg:text-8xl mb-8 tracking-[0.2em] leading-none"
                style={{ 
                  opacity: 0, 
                  transform: 'translateY(60px)' 
                }}
              >
                CONTATO
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="w-24 h-px bg-accent mb-8"
              />

              <motion.p
                variants={itemVariants}
                className="font-futura text-xl text-muted-foreground max-w-2xl tracking-wide"
              >
                Vamos criar algo extraordinário juntos. 
                <br />
                Conte-nos sobre seu projeto.
              </motion.p>
            </div>

            {/* Form */}
            <div ref={formRef} className="max-w-2xl mx-auto">
              <Card className="p-8 md:p-12 border-border bg-card backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="form-element" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                    <Label htmlFor="nome" className="font-futura tracking-wider uppercase text-sm mb-3 block">
                      Nome Completo
                    </Label>
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="h-14 border-border bg-background font-futura tracking-wide text-lg focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="form-element" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                    <Label htmlFor="email" className="font-futura tracking-wider uppercase text-sm mb-3 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-14 border-border bg-background font-futura tracking-wide text-lg focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="form-element" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                    <Label htmlFor="telefone" className="font-futura tracking-wider uppercase text-sm mb-3 block">
                      Telefone
                    </Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                      className="h-14 border-border bg-background font-futura tracking-wide text-lg focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="form-element" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                    <Label htmlFor="empresa" className="font-futura tracking-wider uppercase text-sm mb-3 block">
                      Nome da Empresa
                    </Label>
                    <Input
                      id="empresa"
                      name="empresa"
                      type="text"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      required
                      className="h-14 border-border bg-background font-futura tracking-wide text-lg focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="Sua empresa"
                    />
                  </div>

                  <div className="form-element" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                    <Label htmlFor="instagram" className="font-futura tracking-wider uppercase text-sm mb-3 block">
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      type="text"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      className="h-14 border-border bg-background font-futura tracking-wide text-lg focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="@seuinstagram"
                    />
                  </div>

                  <motion.div 
                    className="form-element pt-4"
                    style={{ opacity: 0, transform: 'translateY(40px)' }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground font-futura tracking-[0.2em] uppercase text-lg transition-all duration-300 btn-luxury"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-3" />
                          Enviando...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-5 h-5 mr-3" />
                          Enviar Mensagem
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </div>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="mt-16 text-center"
            >
              <p className="font-futura text-muted-foreground tracking-wide">
                Ou entre em contato diretamente:
              </p>
              <p className="font-futura-medium text-lg mt-2 tracking-wide">
              comercial@agenciaorchestra.ai
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactForm;