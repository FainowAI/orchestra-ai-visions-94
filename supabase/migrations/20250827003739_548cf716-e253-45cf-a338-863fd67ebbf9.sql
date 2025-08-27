-- Fix all media_files URLs to use correct storage_path format
UPDATE media_files 
SET url = 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/' || storage_path
WHERE url != 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/' || storage_path;