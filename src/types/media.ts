export interface MediaFile {
  id: string;
  bucket: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  category: 'avatar' | 'hero' | 'gallery' | 'background' | 'branding' | 'other';
  avatar_name?: string;
  storage_path: string;
  created_at: string;
  updated_at: string;
}

export interface MediaQueryOptions {
  category?: string;
  avatar_name?: string;
  type?: 'image' | 'video';
}

export interface MediaImageProps {
  src?: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
  category?: string;
  avatar_name?: string;
  fallback?: string;
}

export interface MediaVideoProps {
  src?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  category?: string;
  fallback?: string;
}