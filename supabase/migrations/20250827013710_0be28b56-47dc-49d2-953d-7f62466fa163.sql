-- Fix storage_path values to reflect images are in bucket root (no folders)

-- Update main avatar images with correct mapping
UPDATE media_files 
SET storage_path = 'lorenzo-hero.jpg', 
    name = 'lorenzo-hero.jpg'
WHERE name = 'avatar-1.jpg';

UPDATE media_files 
SET storage_path = 'isabela-hero.jpg', 
    name = 'isabela-hero.jpg'
WHERE name = 'avatar-2.jpg';

UPDATE media_files 
SET storage_path = 'tay-hero.jpg', 
    name = 'tay-hero.jpg'
WHERE name = 'avatar-3.jpg';

UPDATE media_files 
SET storage_path = 'zack-hero.jpg', 
    name = 'zack-hero.jpg'
WHERE name = 'avatar-4.jpg';

-- Update gallery images - remove folder structure, keep just filename
UPDATE media_files 
SET storage_path = regexp_replace(storage_path, '^.*/', '')
WHERE category = 'gallery';

-- Update carousel images - remove folder structure, keep just filename  
UPDATE media_files 
SET storage_path = regexp_replace(storage_path, '^.*/', '')
WHERE category = 'carousel';

-- Update hero videos - remove folder structure, keep just filename
UPDATE media_files 
SET storage_path = regexp_replace(storage_path, '^.*/', '')
WHERE category = 'hero' AND type = 'video';

-- Regenerate all URLs to use correct storage_path format
UPDATE media_files 
SET url = 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/' || storage_path;