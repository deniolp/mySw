'use stricts';

(function() {
  let path = '/mySw/sw.js';
  if (location.host === 'localhost:3000') {
    path = '/sw.js';
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(path)
      .then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
})();
