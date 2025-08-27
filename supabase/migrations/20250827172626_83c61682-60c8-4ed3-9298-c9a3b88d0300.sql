-- Remove unused carousel images from media_files table
DELETE FROM public.media_files 
WHERE name IN ('tay-oculos.png', 'lorenzo-carro.png', 'sofia-desf.png')
   OR storage_path LIKE '%tay-oculos.png%'
   OR storage_path LIKE '%lorenzo-carro.png%' 
   OR storage_path LIKE '%sofia-desf.png%';