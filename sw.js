// Italian Brainrot Generator - Service Worker

const CACHE_NAME = 'italian-brainrot-v1.1.0';
const STATIC_CACHE = 'static-v1.1.0';
const DYNAMIC_CACHE = 'dynamic-v1.1.0';

// 需要缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/image.html',
  '/voice.html',
  '/quiz.html',
  '/css/variables.css',
  '/css/components.css',
  '/css/layout.css',
  '/js/common.js',
  '/js/text-generator.js',
  '/js/image-generator.js',
  '/js/voice-synth.js',
  '/js/quiz.js',
  '/js/utils/performance.js',
  '/style.css',
  '/favicon.svg',
  '/favicon.ico'
];

// 需要缓存的API响应
const API_CACHE = [
  '/api/tts'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(error => {
        console.error('Failed to cache static assets:', error);
      })
  );
  
  // 立即激活新的Service Worker
  self.skipWaiting();
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        // 立即控制所有页面
        return self.clients.claim();
      })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源请求
  if (url.origin !== location.origin) {
    return;
  }

  // 处理API请求
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // 处理静态资源请求
  if (request.method === 'GET') {
    event.respondWith(handleStaticRequest(request));
    return;
  }
});

// 处理静态资源请求
async function handleStaticRequest(request) {
  try {
    // 首先尝试从缓存获取
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // 如果缓存中没有，从网络获取
    const networkResponse = await fetch(request);
    
    // 缓存成功的响应
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Failed to fetch:', error);
    
    // 如果是HTML页面，返回离线页面
    if (request.headers.get('accept').includes('text/html')) {
      return caches.match('/index.html');
    }
    
    // 其他资源返回默认响应
    return new Response('Offline content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// 处理API请求
async function handleApiRequest(request) {
  try {
    // 尝试从网络获取
    const networkResponse = await fetch(request);
    
    // 缓存成功的响应
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('API request failed:', error);
    
    // 尝试从缓存获取
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 返回错误响应
    return new Response(JSON.stringify({
      error: 'Network error and no cached response available'
    }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 消息处理
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_NAME,
      staticCache: STATIC_CACHE,
      dynamicCache: DYNAMIC_CACHE
    });
  }
});

// 后台同步
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// 后台同步任务
async function doBackgroundSync() {
  try {
    // 清理过期缓存
    await cleanExpiredCache();
    
    // 预缓存重要资源
    await preCacheImportantResources();
    
    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// 清理过期缓存
async function cleanExpiredCache() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  
  // 删除超过7天的缓存
  const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  
  for (const request of requests) {
    const response = await cache.match(request);
    if (response) {
      const date = response.headers.get('date');
      if (date && new Date(date).getTime() < oneWeekAgo) {
        await cache.delete(request);
      }
    }
  }
}

// 预缓存重要资源
async function preCacheImportantResources() {
  const cache = await caches.open(STATIC_CACHE);
  const importantResources = [
    '/js/common.js',
    '/css/variables.css'
  ];
  
  for (const resource of importantResources) {
    try {
      await cache.add(resource);
    } catch (error) {
      console.log('Failed to pre-cache:', resource, error);
    }
  }
}

// 推送通知处理
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'New Italian Brainrot content available!',
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Explore',
          icon: '/favicon.svg'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/favicon.svg'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Italian Brainrot', options)
    );
  }
});

// 通知点击处理
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 