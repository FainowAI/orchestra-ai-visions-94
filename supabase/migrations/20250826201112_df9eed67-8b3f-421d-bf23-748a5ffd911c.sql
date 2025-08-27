-- Fase 1: Configuração do Supabase Storage
-- Criar bucket público "media" para todas as mídias do site

-- 1. Criar o bucket público "media"
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media', 
  'media', 
  true,
  52428800, -- 50MB limit per file
  ARRAY[
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/avif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
);

-- 2. Políticas RLS para acesso público de leitura
CREATE POLICY "Public read access for media files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'media');

-- 3. Política para uploads autenticados (para futuros uploads pelo admin)
CREATE POLICY "Authenticated users can upload media files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'media' AND
  auth.role() = 'authenticated'
);

-- 4. Política para updates autenticados
CREATE POLICY "Authenticated users can update media files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'media' AND
  auth.role() = 'authenticated'
);

-- 5. Política para deletar (apenas service role para segurança)
CREATE POLICY "Service role can delete media files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'media' AND
  auth.role() = 'service_role'
);