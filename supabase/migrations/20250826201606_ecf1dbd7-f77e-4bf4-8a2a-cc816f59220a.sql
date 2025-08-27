-- FASE 3: Catalogação das Mídias na Tabela media_files
-- Popular com todos os arquivos de mídia organizados por categoria

-- Inserir imagens hero dos avatares
INSERT INTO media_files (bucket, name, url, type, category, avatar_name, storage_path) VALUES
('media', 'avatar-1.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/hero/lorenzo-hero.jpg', 'image', 'avatar', 'lorenzo', 'avatars/hero/lorenzo-hero.jpg'),
('media', 'avatar-2.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/hero/isabela-hero.jpg', 'image', 'avatar', 'isabela', 'avatars/hero/isabela-hero.jpg'),
('media', 'avatar-3.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/hero/tay-hero.jpg', 'image', 'avatar', 'tay', 'avatars/hero/tay-hero.jpg'),
('media', 'avatar-4.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/hero/zack-hero.jpg', 'image', 'avatar', 'zack', 'avatars/hero/zack-hero.jpg');

-- Inserir galeria do Lorenzo (8 imagens)
INSERT INTO media_files (bucket, name, url, type, category, avatar_name, storage_path) VALUES
('media', 'lorenzo-1.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/lorenzo/lorenzo-1.jpg', 'image', 'gallery', 'lorenzo', 'avatars/lorenzo/lorenzo-1.jpg'),
('media', 'lorenzo-2.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/lorenzo/lorenzo-2.jpg', 'image', 'gallery', 'lorenzo', 'avatars/lorenzo/lorenzo-2.jpg'),
('media', 'lorenzo-3.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/lorenzo/lorenzo-3.jpg', 'image', 'gallery', 'lorenzo', 'avatars/lorenzo/lorenzo-3.jpg'),
('media', 'lorenzo-4.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/lorenzo/lorenzo-4.jpg', 'image', 'gallery', 'lorenzo', 'avatars/lorenzo/lorenzo-4.jpg'),
('media', 'lorenzo-5.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/lorenzo/lorenzo-5.jpg', 'image', 'gallery', 'lorenzo', 'avatars/lorenzo/lorenzo-5.jpg'),
('media', 'lorenzo-6.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/lorenzo/lorenzo-6.jpg', 'image', 'gallery', 'lorenzo', 'avatars/lorenzo/lorenzo-6.jpg'),
('media', 'lorenzo-7.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/lorenzo/lorenzo-7.jpg', 'image', 'gallery', 'lorenzo', 'avatars/lorenzo/lorenzo-7.jpg'),
('media', 'lorenzo-8.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/lorenzo/lorenzo-8.jpg', 'image', 'gallery', 'lorenzo', 'avatars/lorenzo/lorenzo-8.jpg');

-- Inserir galeria da Isabela (8 imagens)
INSERT INTO media_files (bucket, name, url, type, category, avatar_name, storage_path) VALUES
('media', 'isabela-1.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/isabela/isabela-1.jpg', 'image', 'gallery', 'isabela', 'avatars/isabela/isabela-1.jpg'),
('media', 'isabela-2.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/isabela/isabela-2.jpg', 'image', 'gallery', 'isabela', 'avatars/isabela/isabela-2.jpg'),
('media', 'isabela-3.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/isabela/isabela-3.jpg', 'image', 'gallery', 'isabela', 'avatars/isabela/isabela-3.jpg'),
('media', 'isabela-4.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/isabela/isabela-4.jpg', 'image', 'gallery', 'isabela', 'avatars/isabela/isabela-4.jpg'),
('media', 'isabela-5.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/isabela/isabela-5.jpg', 'image', 'gallery', 'isabela', 'avatars/isabela/isabela-5.jpg'),
('media', 'isabela-6.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/isabela/isabela-6.jpg', 'image', 'gallery', 'isabela', 'avatars/isabela/isabela-6.jpg'),
('media', 'isabela-7.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/isabela/isabela-7.jpg', 'image', 'gallery', 'isabela', 'avatars/isabela/isabela-7.jpg'),
('media', 'isabela-8.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/isabela/isabela-8.jpg', 'image', 'gallery', 'isabela', 'avatars/isabela/isabela-8.jpg');

-- Inserir galeria do Tay (4 imagens)
INSERT INTO media_files (bucket, name, url, type, category, avatar_name, storage_path) VALUES
('media', 'tay-1.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/tay/tay-1.jpg', 'image', 'gallery', 'tay', 'avatars/tay/tay-1.jpg'),
('media', 'tay-2.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/tay/tay-2.jpg', 'image', 'gallery', 'tay', 'avatars/tay/tay-2.jpg'),
('media', 'tay-3.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/tay/tay-3.jpg', 'image', 'gallery', 'tay', 'avatars/tay/tay-3.jpg'),
('media', 'tay-4.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/tay/tay-4.jpg', 'image', 'gallery', 'tay', 'avatars/tay/tay-4.jpg');

-- Inserir galeria do Zack (6 imagens)
INSERT INTO media_files (bucket, name, url, type, category, avatar_name, storage_path) VALUES
('media', 'zack-1.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/zack/zack-1.jpg', 'image', 'gallery', 'zack', 'avatars/zack/zack-1.jpg'),
('media', 'zack-2.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/zack/zack-2.jpg', 'image', 'gallery', 'zack', 'avatars/zack/zack-2.jpg'),
('media', 'zack-3.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/zack/zack-3.jpg', 'image', 'gallery', 'zack', 'avatars/zack/zack-3.jpg'),
('media', 'zack-4.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/zack/zack-4.jpg', 'image', 'gallery', 'zack', 'avatars/zack/zack-4.jpg'),
('media', 'zack-5.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/zack/zack-5.jpg', 'image', 'gallery', 'zack', 'avatars/zack/zack-5.jpg'),
('media', 'zack-6.jpg', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/avatars/zack/zack-6.jpg', 'image', 'gallery', 'zack', 'avatars/zack/zack-6.jpg');

-- Inserir vídeo hero
INSERT INTO media_files (bucket, name, url, type, category, avatar_name, storage_path) VALUES
('media', 'background-video.mp4', 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/videos/background-video.mp4', 'video', 'hero', NULL, 'videos/background-video.mp4');