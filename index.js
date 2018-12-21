'use stricts';

(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/mySw/ws.js')
      .then(function () {
        navigator.serviceWorker.ready
          .then(function (worker) {
            worker.sync.register('syncdata');
          })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
})();