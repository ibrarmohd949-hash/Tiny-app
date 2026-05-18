const CACHE_NAME = 'tiny-tok-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://api.dicebear.com/7.x/shapes/svg?seed=TTTT&backgroundColor=ff2d55'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
