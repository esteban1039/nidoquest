const CACHE_NAME = 'nidoquest-v2';
const OFFLINE_URL = '/offline.html';
const APP_SHELL = ['/', OFFLINE_URL, '/manifest.webmanifest', '/icons/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (!['http:', 'https:'].includes(requestUrl.protocol)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        return cached || caches.match(OFFLINE_URL);
      })
  );
});

self.addEventListener('push', (event) => {
  const fallback = {
    title: 'NidoQuest',
    body: 'Tienes una actualización en tu Nido.',
    url: '/'
  };
  const payload = event.data ? event.data.json() : fallback;

  event.waitUntil(
    self.registration.showNotification(payload.title || fallback.title, {
      body: payload.body || fallback.body,
      icon: '/icons/icon.svg',
      badge: '/icons/icon.svg',
      data: { url: payload.url || fallback.url }
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/dashboard/guide';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      return clients.openWindow(targetUrl);
    })
  );
});
