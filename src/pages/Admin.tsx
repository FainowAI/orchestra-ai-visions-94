import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Mail, Phone, Building, Instagram, Calendar, Lock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface ContactSubmission {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  instagram: string | null;
  created_at: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSubmissions(data || []);
    } catch (err: any) {
      console.error('Error fetching submissions:', err);
      setError(err.message || 'Erro ao carregar submissões');
      toast.error('Erro ao carregar submissões', {
        description: 'Verifique suas permissões de acesso',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin - Contatos | Sua Empresa</title>
        <meta name="description" content="Painel administrativo para visualizar submissões de contato" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Lock className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Painel Administrativo
                </h1>
                <p className="text-muted-foreground">
                  Visualizar submissões de contato
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Submissões de Contato
                </h2>
                <p className="text-muted-foreground">
                  {submissions.length} {submissions.length === 1 ? 'submissão' : 'submissões'} encontrada(s)
                </p>
              </div>
              <Button onClick={fetchSubmissions} disabled={loading}>
                {loading ? 'Carregando...' : 'Atualizar'}
              </Button>
            </div>

            {error && (
              <Card className="mb-6 border-destructive">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-destructive">
                    <Lock className="h-5 w-5" />
                    <span className="font-medium">Erro de Acesso</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {error}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Este painel requer permissões administrativas. Entre em contato com o desenvolvedor para configurar o acesso.
                  </p>
                </CardContent>
              </Card>
            )}

            {loading ? (
              <div className="grid gap-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="space-y-2">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-3 bg-muted rounded w-1/6"></div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : submissions.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-muted-foreground">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Nenhuma submissão encontrada</p>
                    <p className="text-sm">As submissões de contato aparecerão aqui</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {submissions.map((submission) => (
                  <Card key={submission.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">
                          {submission.nome}
                        </CardTitle>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(submission.created_at)}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">Email</p>
                            <p className="text-sm text-muted-foreground">{submission.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">Telefone</p>
                            <p className="text-sm text-muted-foreground">{submission.telefone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">Empresa</p>
                            <p className="text-sm text-muted-foreground">{submission.empresa}</p>
                          </div>
                        </div>
                        
                        {submission.instagram && (
                          <div className="flex items-center gap-3">
                            <Instagram className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">Instagram</p>
                              <p className="text-sm text-muted-foreground">{submission.instagram}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Admin;