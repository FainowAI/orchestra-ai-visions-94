-- Fix security issues with form_response and orchestraForm tables

-- Add user_id columns to associate records with users
ALTER TABLE public.form_response 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.orchestraForm 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Enable Row Level Security on both tables
ALTER TABLE public.form_response ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orchestraForm ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for form_response table
CREATE POLICY "Users can view their own form responses" 
ON public.form_response 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own form responses" 
ON public.form_response 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own form responses" 
ON public.form_response 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own form responses" 
ON public.form_response 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for orchestraForm table
CREATE POLICY "Users can view their own orchestra forms" 
ON public.orchestraForm 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orchestra forms" 
ON public.orchestraForm 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orchestra forms" 
ON public.orchestraForm 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own orchestra forms" 
ON public.orchestraForm 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add updated_at columns and triggers
ALTER TABLE public.form_response 
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

ALTER TABLE public.orchestraForm 
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_form_response_updated_at
BEFORE UPDATE ON public.form_response
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orchestraForm_updated_at
BEFORE UPDATE ON public.orchestraForm
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();