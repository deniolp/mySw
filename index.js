'use stricts';

(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/mySw/sw.js')
      .then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
})();