-- Insert Sofia image into media_files table for carousel display
INSERT INTO public.media_files (
  bucket,
  name, 
  url,
  type,
  category,
  storage_path
) VALUES (
  'media',
  'sofia_desf.png',
  'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/sofia-desf.png',
  'image',
  'carousel',
  'sofia-desf.png'
);