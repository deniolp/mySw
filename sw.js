'use stricts';

let CACHE_NAME = 'my-site-cache';
let urlsToCache = [
  'style.css',
  'index.js',
  'broken.png',
  'index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('my-site-cache')
      .then((cache) => {
          cache.addAll(urlsToCache);
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
            if (response.ok) {
              return response;
            }
            if (isImage(event.request)) {
              return caches.match('broken.png')
                  .then(function(response) {
                    if (response) {
                      return response;
                    }
                    return fetch('broken.png');
                  })
            }
          })
          .catch(() => {
            if (isImage(event.request)) {
                return caches.match('broken.png');
              }
          })
      })
    )
});
