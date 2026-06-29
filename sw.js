const CACHE = 'scriptorium-v2';
const ASSETS = [
  '/',
  '/scriptorium.html',
  '/index.html',
  '/MAP.html',
  '/genealogy.html',
  '/covenant-map.html',
  '/narthex.html',
  '/onomasticon.html',
  '/scribes-chamber.html',
  '/tabernacle.html',
  '/typology.html',
  '/assets/css/shared.css',
  '/assets/css/gallery.css',
  '/assets/fonts/fonts.css',
  '/assets/js/auth.js',
  '/assets/js/sidebar.js',
  '/assets/js/scriptorium-core.js',
  '/assets/audio/scriptorium-audio.js',
  '/assets/js/canon-data.js',
  '/assets/js/map-data.js',
  '/assets/js/features.js',
  '/assets/js/lectionary.js',
  '/assets/js/scriptorium-reader.js',
  '/assets/css/features.css',
  '/settings.html',
  '/manifest.json',
  '/assets/icons/icon-192.svg',
  '/assets/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Bible JSON data — cache-first
  if (url.pathname.includes('/assets/data/bible-text/') && url.pathname.endsWith('.json')) {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(event.request).then(match =>
          match || fetch(event.request).then(res => {
            cache.put(event.request, res.clone());
            return res;
          })
        )
      )
    );
    return;
  }

  // Static assets (CSS, JS, fonts, images, audio) — cache-first
  if (/\.(css|js|woff2?|png|jpg|svg|ico|mp3|wav|ogg)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(event.request).then(match =>
          match || fetch(event.request).then(res => {
            cache.put(event.request, res.clone());
            return res;
          })
        )
      )
    );
    return;
  }

  // API calls — network-first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).then(res => {
        return caches.open(CACHE).then(cache => {
          cache.put(event.request, res.clone());
          return res;
        });
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // HTML pages and everything else — network-first
  event.respondWith(
    fetch(event.request).then(res => {
      return caches.open(CACHE).then(cache => {
        if (res.type === 'basic') cache.put(event.request, res.clone());
        return res;
      });
    }).catch(() => caches.match(event.request).then(match => match || caches.match('/')))
  );
});
