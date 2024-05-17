const CACHE_NAME = 'dresses-cache-v1';
const urlsToCache = [
  '/Dresses/',
  '/Dresses/index.html',
  '/Dresses/index.css',
  '/Dresses/index.js',
  '/Dresses/db.json',
  '/Dresses/service-worker.js',
  '/Dresses/manifest.json',
  '/Dresses/assets/fonts/NRT-Bd.tff',
  '/Dresses/assets/fonts/Rabar_22.tff',
  '/Dresses/assets/icons/icon-128x128.png',
  '/Dresses/assets/icons/icon-144x144.png',
  '/Dresses/assets/icons/icon-152x152.png',
  '/Dresses/assets/icons/icon-192x192.png',
  '/Dresses/assets/icons/icon-384x384.png',
  '/Dresses/assets/icons/icon-48x48.png',
  '/Dresses/assets/icons/icon-512x512.png',
  '/Dresses/assets/icons/icon-72x72.png',
  '/Dresses/assets/icons/icon-96x96.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
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
