/* Service Worker — 頁面採網路優先(確保拿到新版),資源採快取優先+背景更新 */
const VERSION = 'v1.9.0';
const CACHE = `secretary-${VERSION}`;
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/app.css',
  './js/app.js',
  './js/store.js',
  './js/schedule-data.js',
  './js/consult-data.js',
  './js/pages/home.js',
  './js/pages/todo.js',
  './js/pages/work.js',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  /* no-cache:安裝新版時強制從網路抓最新檔案,不吃 HTTP 快取 */
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'no-cache' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const sameOrigin = new URL(e.request.url).origin === location.origin;

  /* 頁面導覽:網路優先,離線才用快取 → 每次開啟都拿最新版 */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  /* 其他資源:快取優先,同時背景更新快取(stale-while-revalidate) */
  e.respondWith(
    caches.match(e.request).then((hit) => {
      const refresh = fetch(e.request).then((res) => {
        if (res.ok && sameOrigin) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      }).catch(() => hit);
      return hit || refresh;
    })
  );
});
