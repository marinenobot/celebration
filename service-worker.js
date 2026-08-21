self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (!request || request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isAppAsset = /\.(html|js|json|webmanifest|png|svg|ico)$/i.test(url.pathname);
  if (!isAppAsset) return;

  event.respondWith(
    fetch(request).catch(() => caches.match('/index.html'))
  );
});
