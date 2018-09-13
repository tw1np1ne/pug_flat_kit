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

workbox.precaching.precacheAndRoute([
  {
    "url": "dist/css/app-large.css",
    "revision": "ca36e459a1b5370dda1d3e7ed155bcb2"
  },
  {
    "url": "dist/css/app.css",
    "revision": "73c90eb2647d90bbfbe9d3fde823fd67"
  },
  {
    "url": "dist/js/app.js",
    "revision": "050f3c3e2adb0d48ed787301015148e4"
  },
  {
    "url": "dist/js/modules/app.js",
    "revision": "111807063560d36ec800ad02aef2fd86"
  },
  {
    "url": "dist/js/modules/lib/jf-countdown/countdown.js",
    "revision": "ef317a1e42eb15717ae910b4391d54cd"
  },
  {
    "url": "dist/js/modules/lib/jf-forms/jf-forms.js",
    "revision": "bac8622bef3697bed3525955cead60f2"
  },
  {
    "url": "dist/js/modules/lib/jf-lightbox/jf-lightbox.css",
    "revision": "ed7f2f4b7c457ed00bc5f7a4901702da"
  },
  {
    "url": "dist/js/modules/lib/jf-menu/gestures.js",
    "revision": "3339cb980826697f5ecdc6d853d35f7a"
  },
  {
    "url": "dist/js/modules/lib/jf-menu/menu.js",
    "revision": "43d2f8d9341ffd77fa6fa50fde6b03a4"
  },
  {
    "url": "dist/js/modules/lib/jf-waypoints/jf-waypoints.js",
    "revision": "6d520ada4fe69f57a6943822c8793224"
  },
  {
    "url": "dist/js/modules/lib/lazyload/lazyload.js",
    "revision": "bd39a4d19768dc62a3c93d75ec9a0689"
  },
  {
    "url": "dist/js/modules/lib/mediabox/mediabox.css",
    "revision": "98c8190241d9a328673afbf5ecd12bf8"
  },
  {
    "url": "dist/js/modules/lib/mediabox/mediabox.js",
    "revision": "93de16c9bfe2d1ffd8a0a05960d66dc5"
  },
  {
    "url": "dist/js/modules/lib/modernizr/modernizr.js",
    "revision": "8b755e9f20fc5ff9d06ab03f703167bb"
  },
  {
    "url": "dist/js/modules/lib/smoothscroll/smooth-scroll.min.js",
    "revision": "51684ff991e83461a9d2379618bde11b"
  },
  {
    "url": "dist/js/modules/lib/ua-sniff/ua-sniff.js",
    "revision": "5d82a435a48112fa7d28762acea628a7"
  },
  {
    "url": "gulpfile.js",
    "revision": "072128c833f1a2c79698e801ec825a36"
  },
  {
    "url": "includes/config/config.php",
    "revision": "1043e097dcca2e73f4bc2ec433786f04"
  },
  {
    "url": "includes/forms/form.php",
    "revision": "11e1d8363b25ee6f1a890cc5aa4e4910"
  },
  {
    "url": "includes/modules/agenda.php",
    "revision": "a7a5314459545dd2ba99bc41c6c13ca5"
  },
  {
    "url": "includes/modules/speakers.php",
    "revision": "fb741ac9baa91f66f47113a48ac97af8"
  },
  {
    "url": "index.html",
    "revision": "68b329da9893e34099c7d8ad5cb9c940"
  },
  {
    "url": "src/app/service-worker.js",
    "revision": "762ee8355931f33df60de549d6edc3a5"
  },
  {
    "url": "src/img/seventh-wave-ident_editable.svg",
    "revision": "08bb861fd038b41dae7c1254b140365b"
  },
  {
    "url": "src/js/app.js",
    "revision": "111807063560d36ec800ad02aef2fd86"
  },
  {
    "url": "src/js/lib/jf-countdown/countdown.js",
    "revision": "ef317a1e42eb15717ae910b4391d54cd"
  },
  {
    "url": "src/js/lib/jf-forms/jf-forms.js",
    "revision": "bac8622bef3697bed3525955cead60f2"
  },
  {
    "url": "src/js/lib/jf-menu/gestures.js",
    "revision": "3339cb980826697f5ecdc6d853d35f7a"
  },
  {
    "url": "src/js/lib/jf-menu/menu.js",
    "revision": "43d2f8d9341ffd77fa6fa50fde6b03a4"
  },
  {
    "url": "src/js/lib/jf-waypoints/jf-waypoints.js",
    "revision": "6d520ada4fe69f57a6943822c8793224"
  },
  {
    "url": "src/js/lib/lazyload/lazyload.js",
    "revision": "bd39a4d19768dc62a3c93d75ec9a0689"
  },
  {
    "url": "src/js/lib/mediabox/mediabox.css",
    "revision": "98c8190241d9a328673afbf5ecd12bf8"
  },
  {
    "url": "src/js/lib/mediabox/mediabox.js",
    "revision": "93de16c9bfe2d1ffd8a0a05960d66dc5"
  },
  {
    "url": "src/js/lib/modernizr/modernizr.js",
    "revision": "8b755e9f20fc5ff9d06ab03f703167bb"
  },
  {
    "url": "src/js/lib/smoothscroll/smooth-scroll.min.js",
    "revision": "51684ff991e83461a9d2379618bde11b"
  },
  {
    "url": "src/js/lib/ua-sniff/ua-sniff.js",
    "revision": "5d82a435a48112fa7d28762acea628a7"
  },
  {
    "url": "vendor/autoload.php",
    "revision": "9823de8e7cea00564e8fd760a0e1c123"
  },
  {
    "url": "vendor/composer/autoload_classmap.php",
    "revision": "8645d3a4e3ad87e7cf4d88a46717aab4"
  },
  {
    "url": "vendor/composer/autoload_files.php",
    "revision": "8305bb0016951fd153b1dfbd5e0ad70e"
  },
  {
    "url": "vendor/composer/autoload_namespaces.php",
    "revision": "35e12c7d76c4a81633bcf547c0e229a9"
  },
  {
    "url": "vendor/composer/autoload_psr4.php",
    "revision": "dd3a00f0d13eb29781edd8c77d4c5100"
  },
  {
    "url": "vendor/composer/autoload_real.php",
    "revision": "1d28b44d9805deda51ee032c3d7c1ac9"
  },
  {
    "url": "vendor/composer/autoload_static.php",
    "revision": "f3cca46ce5bd3a82011bd5db7fc93fcd"
  },
  {
    "url": "vendor/composer/ClassLoader.php",
    "revision": "7bcd58ef2df6fe97165bea70fe9c7712"
  }
])

self.addEventListener('fetch', function(event) {

  event.respondWith(

    caches.match(event.request).then(function(response) {

      return response || fetch(event.request);

    })

  );

});
