// this is a service worker that caches needed resources

const api_server = 'localhost:8080'

function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("://") > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

const staticCacheName = 'project_fuse-static'
const dynamicCacheName = 'project_fuse-dynamic'

// Listen for install event, set callback
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      let bundle_files = []
      
      //cache needed offline-files
      return cache.addAll([
        '.',
        '/assets/styles/animate.min.css',
        '/assets/styles/normalize.css',
        '/common.bundle.js',
        '/app.bundle.js',
        '/vendor.bundle.js',
        '/assets/images/project_fuse.svg',
        '/index.html'
      ].concat(bundle_files));
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method != 'GET') return;

  // handle dynamic content (network with cache fallback)
  if (extractHostname(event.request.url) === api_server) {
    // Get from network and then fallback to cache if needed
    event.respondWith(
      caches.open(dynamicCacheName).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        }).catch(function (err) {
          return cache.match(event.request)
        })
      })
    )
  }
  // handle static content (return from cache and update in the background) 
  else {
    // return from cache but update for next time
    event.respondWith(
      caches.open(staticCacheName).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          var fetchPromise = fetch(event.request).then(function (networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          return response || fetchPromise;
        })
      })
    );
  }
});

self.addEventListener('activate', function (event) {
  // clear non-approved caches
  var cacheWhitelist = [staticCacheName, dynamicCacheName];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data === 'clear-cached-user-data') {
    caches.delete(dynamicCacheName)
  }
});

// foreign fetch events
self.addEventListener('foreignfetch', event => {
  event.respondWith(fetch(event.request).then(response => {
    return {
      response: response,
      origin: event.origin,
      headers: ['Content-Type']
    }
  }));
});