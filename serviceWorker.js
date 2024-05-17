const CACHE_NAME="1v";
const urlsToCache=[
  '/',
  '/index.html',
  '/styles.css',
  '/index.js',
'/db.json',
  // Add other assets here
];

self.addEventListener('install', event =&gt; {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache =&gt; cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event =&gt; {
  event.respondWith(
    caches.match(event.request)
      .then(response =&gt; response || fetch(event.request))
  );
});

self.addEventListener('activate', event =&gt; {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =&gt; 
      Promise.all(
        cacheNames.map(cacheName =&gt; {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

