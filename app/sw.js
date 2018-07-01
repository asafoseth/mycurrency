var staticCacheName = 'mycurrency-cache-v1';

self.addEventListener('install', function(event) {
 event.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       'index.html',
       '/css/custom.css',
       '/scripts/currency.js',
       '../node_modules/jquery/dist/jquery.min.js',
       '../node_modules/bootstrap/dist/js/bootstrap.min.js',
       '../node_modules/bootstrap/dist/css/bootstrap.min.css',
       'https://free.currencyconverterapi.com/api/v5/currencies',
       'https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y'
     ]);
   })
 );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
      cacheNames.filter(function(cacheName){
        return cacheName.startsWith('mycurrency-')&&
               cacheName != staticCacheName;
      }).map(function(cacheName) {
        return cache.delete(cacheName);
      })
    );
    })
  )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response){
        if (response) return response;
        return fetch(event.request);
      })
    )

    });

    //incomplete