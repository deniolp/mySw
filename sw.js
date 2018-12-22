'use stricts';

self.addEventListener('install', (event) => {
  console.log('Установлен');
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
        fetch(event.request)
            .then((response) => {
                if (response.ok) return response;
                if (isImage(event.request)) {
                  return fetch('broken.png');
                }
            })
            .catch((error) => {
              console.log(error);
            }))
});
