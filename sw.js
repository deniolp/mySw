'use stricts';

let CACHE_NAME = 'my-site-cache';
let urlsToCache = [
  'style.css',
  'index.js',
  'index.html',
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
              return fetch('broken.png')
                .then((response) => {
                  return response;
                })
            }
          })
          .catch(function() {
            console.log('Error!');
            if (isImage(event.request)) {
              return caches.match('broken.png');
            }
            return cache.match(event.request);
          })
      })
    )
});
