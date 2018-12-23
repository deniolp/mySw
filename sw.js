'use stricts';

let CACHE_NAME = 'my-site-cache';
let urlsToCache = [
  'myServiceWorker/',
  'style.css',
  'index.js',
  'broken.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
          return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activated!');
});

function isImage(fetchRequest) {
    return fetchRequest.method === 'GET'
           && fetchRequest.destination === 'image';
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return fetch(event.request)
          .then(function(response) {
            cache.put(event.request, response.clone());
            if (response.ok) {
              return response;
            }
            if (isImage(event.request)) {
              return caches.match('broken.png')
                .then((response) => {
                  console.log('Online, but I took image from the cache.')
                  return response;
                })
            }
          })
          .catch(function() {
            return cache.match(event.request)
              .then(function(response) {
                if (isImage(event.request)) {
                  console.log('Offline! Return image.');
                  return caches.match('broken.png');
                }
                console.log('Offline! Return file.');
                return response;
              })
          })
      })
    )
});
