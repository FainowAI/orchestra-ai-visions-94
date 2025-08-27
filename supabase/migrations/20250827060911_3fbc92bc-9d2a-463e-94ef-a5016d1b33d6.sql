-- Fix Lorenzo's storage_path by removing extra spaces
UPDATE media_files 
SET storage_path = TRIM(storage_path),
    url = 'https://baljebbufdedzfokhqty.supabase.co/storage/v1/object/public/media/' || TRIM(storage_path)
WHERE storage_path LIKE '%lorenzo%' AND (storage_path LIKE '% %' OR storage_path != TRIM(storage_path));