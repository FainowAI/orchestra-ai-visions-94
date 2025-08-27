-- Remove the problematic isabela-5.jpg image that's not loading correctly
DELETE FROM public.media_files 
WHERE id = '907a9a7d-c5d2-4c2b-8185-89f4ee729173' 
AND name = 'isabela-5.jpg' 
AND avatar_name = 'isabela';