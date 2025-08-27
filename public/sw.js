// Service Worker para Orchestra AI Visions
// Otimizações de cache e performance

const CACHE_NAME = 'orchestra-v1.0.0';
const STATIC_CACHE = 'orchestra-static-v1';
const IMAGES_CACHE = 'orchestra-images-v1';
const API_CACHE = 'orchestra-api-v1';

// Recursos para cache imediato
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Estratégias de cache por tipo
const CACHE_STRATEGIES = {
  images: {
    name: IMAGES_CACHE,
    maxAge: 30 * 24 * 60 * 60, // 30 dias
    maxEntries: 100
  },
  api: {
    name: API_CACHE,
    maxAge: 5 * 60, // 5 minutos
    maxEntries: 50
  },
  static: {
    name: STATIC_CACHE,
    maxAge: 7 * 24 * 60 * 60, // 7 dias
    maxEntries: 200
  }
};

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('SW: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('SW: Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        console.log('SW: Installation complete');
        return self.skipWaiting();
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('SW: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Remove caches antigos
            if (!Object.values(CACHE_STRATEGIES).some(s => s.name === cacheName) && 
                cacheName !== CACHE_NAME) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('SW: Activation complete');
        return self.clients.claim();
      })
  );
});

// Interceptação de requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requests de outras origens (exceto Supabase)
  if (!url.href.startsWith(self.location.origin) && 
      !url.href.includes('supabase.co')) {
    return;
  }

  // Estratégia por tipo de recurso
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isStaticResource(request)) {
    event.respondWith(handleStaticRequest(request));
  }
});

// Identifica requests de imagem
function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|avif|svg)(\?.*)?$/i.test(request.url);
}

// Identifica requests de API
function isAPIRequest(request) {
  return request.url.includes('supabase.co') || 
         request.url.includes('/api/');
}

// Identifica recursos estáticos
function isStaticResource(request) {
  return request.destination === 'script' ||
         request.destination === 'style' ||
         request.destination === 'document' ||
         /\.(js|css|woff|woff2|ttf|eot)(\?.*)?$/i.test(request.url);
}

// Handle de requests de imagem - Cache First com fallback
async function handleImageRequest(request) {
  const strategy = CACHE_STRATEGIES.images;
  
  try {
    // Tenta buscar do cache primeiro
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('SW: Image served from cache:', request.url);
      return cachedResponse;
    }

    // Se não está no cache, busca da rede
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache apenas respostas válidas
      const cache = await caches.open(strategy.name);
      cache.put(request, response.clone());
      console.log('SW: Image cached:', request.url);
      
      // Limpa cache se necessário
      await cleanupCache(strategy.name, strategy.maxEntries);
    }
    
    return response;
  } catch (error) {
    console.error('SW: Image request failed:', error);
    
    // Retorna imagem placeholder em caso de erro
    return new Response(
      `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="#6b7280">
          Imagem indisponível
        </text>
      </svg>`,
      {
        headers: { 'Content-Type': 'image/svg+xml' },
        status: 200
      }
    );
  }
}

// Handle de requests de API - Network First com cache
async function handleAPIRequest(request) {
  const strategy = CACHE_STRATEGIES.api;
  
  try {
    // Tenta buscar da rede primeiro
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache apenas GET requests
      if (request.method === 'GET') {
        const cache = await caches.open(strategy.name);
        cache.put(request, response.clone());
        console.log('SW: API response cached:', request.url);
        
        await cleanupCache(strategy.name, strategy.maxEntries);
      }
    }
    
    return response;
  } catch (error) {
    // Em caso de erro, tenta buscar do cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('SW: API served from cache (offline):', request.url);
      return cachedResponse;
    }
    
    throw error;
  }
}

// Handle de recursos estáticos - Cache First
async function handleStaticRequest(request) {
  const strategy = CACHE_STRATEGIES.static;
  
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('SW: Static resource served from cache:', request.url);
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(strategy.name);
      cache.put(request, response.clone());
      console.log('SW: Static resource cached:', request.url);
      
      await cleanupCache(strategy.name, strategy.maxEntries);
    }
    
    return response;
  } catch (error) {
    console.error('SW: Static request failed:', error);
    throw error;
  }
}

// Limpa cache mantendo apenas os mais recentes
async function cleanupCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  
  if (requests.length > maxEntries) {
    const requestsToDelete = requests.slice(0, requests.length - maxEntries);
    await Promise.all(
      requestsToDelete.map(request => cache.delete(request))
    );
    console.log(`SW: Cleaned up ${requestsToDelete.length} entries from ${cacheName}`);
  }
}

// Background Sync para retry de requests falhados
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('SW: Background sync triggered');
    event.waitUntil(retryFailedRequests());
  }
});

async function retryFailedRequests() {
  // Implementar retry de requests que falharam
  console.log('SW: Retrying failed requests...');
}

// Push notifications (para futuro)
self.addEventListener('push', (event) => {
  console.log('SW: Push message received');
  // Implementar notificações push se necessário
});

// Preload de recursos críticos
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PRELOAD_IMAGES') {
    console.log('SW: Preloading critical images');
    event.waitUntil(preloadImages(event.data.urls));
  }
});

async function preloadImages(imageUrls) {
  const cache = await caches.open(IMAGES_CACHE);
  
  const preloadPromises = imageUrls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
        console.log('SW: Preloaded image:', url);
      }
    } catch (error) {
      console.warn('SW: Failed to preload image:', url, error);
    }
  });
  
  await Promise.all(preloadPromises);
  console.log('SW: Image preloading complete');
}