'use stricts';

let CACHE_NAME = 'my-site-cache';
let urlsToCache = [
  'style.css',
  'index.js',
  'broken.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
    event.waitUntil(
        caches.open('my-site-cache')
        .then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
  console.log('Активирован');
});

function isImage(fetchRequest) {
    return fetchRequest.method === 'GET'
           && fetchRequest.destination === 'image';
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(function(response) {
            if (response.ok) return response;
            if (isImage(event.request)) {
              return caches.match('broken.png');
            }
          })
          .catch((error) => {
            if (isImage(event.request)) {
                return caches.match('broken.png');
              }
          })
      })
      .catch((error) => {
        cosole.log(error);
      })
    )
});
