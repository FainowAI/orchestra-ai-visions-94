-- Insert Tay image into media_files table for carousel display
INSERT INTO public.media_files (
  bucket,
  name, 
  url,
  type,
  category,
  storage_path
) VALUES (
  'media',
  'tay_oculos.png',
  'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/tay-oculos.png',
  'image',
  'carousel',
  'tay-oculos.png'
);