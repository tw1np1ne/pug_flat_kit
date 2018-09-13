/* jshint
    esversion: 6
*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js');


workbox.routing.registerRoute('https://fonts.googleapis.com/(.*)',
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

// We want no more than 50 images in the cache. We check using a cache first strategy
workbox.routing.registerRoute(/\.(?:png|gif|jpg|webp|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
    cacheExpiration: {
      maxEntries: 50
    }
  })
);

workbox.precaching.precacheAndRoute([])

self.addEventListener('fetch', function(event) {

  event.respondWith(

    caches.match(event.request).then(function(response) {

      return response || fetch(event.request);

    })

  );

});
