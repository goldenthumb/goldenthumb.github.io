var CACHE_NAME = 'pwa-example-basic';
var filesToCache = [
  '/',
  '/assets',
];

self.addEventListener('install', function(event) {
  console.log('Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
      .catch(function(error) {
        return console.log(error);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetch');
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
      .catch(function(error) {
        return console.log(error);
      })
  );
});

self.addEventListener('activate', function(event) {
  var newCacheList = ['pwa-example-basic'];

  event.waitUntil(
    caches.keys().then(function(cacheList) {
      return Promise.all(
        cacheList.map(function(cacheName) {
          if (newCacheList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    }).catch(function(error) {
      return console.log(error);
    })
  );
});