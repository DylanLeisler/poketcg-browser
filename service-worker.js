const CACHE_NAME = 'card-game-cache-v1';
const urlsToCache = [
    '/',
    './src/index.html',
    './src/style.css',
    './src/script.js',
    '/manifest.json',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png'
    // Add any additional resources you want to cache
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Failed to open cache on install: ', error);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If there's a cached version, return it; otherwise, make a network request
                return response || fetch(event.request).catch(() => {
                    // You can optionally provide a fallback response here if offline
                    return new Response('You are offline');
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
