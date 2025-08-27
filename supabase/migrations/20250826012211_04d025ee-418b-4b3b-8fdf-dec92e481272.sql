-- Fix contact form admin access by creating a more permissive admin policy
-- Drop the overly restrictive policy
DROP POLICY IF EXISTS "No public read access" ON public.contact_submissions;

-- Create a policy that allows service role access for admin functions
-- This will allow admin access through service key while keeping public access restricted
CREATE POLICY "Admin can read contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (
  -- Allow access via service role (for admin functions)
  auth.role() = 'service_role' OR
  -- Allow access for authenticated admin users (when auth is implemented)
  (auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  ))
);

-- Create policy for admin updates (if needed)
CREATE POLICY "Admin can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (
  auth.role() = 'service_role' OR
  (auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  ))
);

-- Create policy for admin deletes (if needed)
CREATE POLICY "Admin can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (
  auth.role() = 'service_role' OR
  (auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  ))
);