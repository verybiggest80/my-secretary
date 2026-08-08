/* Service Worker — 頁面採網路優先(確保拿到新版),資源採快取優先+背景更新 */
const VERSION = 'v1.38.0';
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
  './js/dx-data.js',
  './js/mala-data.js',
  './js/di-data.js',
  './js/hyponatx-data.js',
  './js/pages/home.js',
  './js/pages/todo.js',
  './js/pages/work.js',
  './js/pages/vsduty.js',
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
      .then(() => prefetchAssets())   /* 換版後立刻把班表附件補齊 */
  );
});

/* 從 schedule-data.js 取出所有 files/... 路徑(班表 PDF/xlsx 與頁面圖),
   全部放進快取,確保離線也能開啟雲端班表 */
async function prefetchAssets() {
  const cache = await caches.open(CACHE);
  let urls = [];
  try {
    const res = await fetch('./js/schedule-data.js', { cache: 'no-cache' });
    if (res.ok) {
      cache.put('./js/schedule-data.js', res.clone());
      const text = await res.text();
      urls = [...new Set((text.match(/files\/[A-Za-z0-9._\/-]+/g) || []))].map((u) => './' + u);
    }
  } catch { /* 離線時略過 */ }

  let done = 0;
  await Promise.all(urls.map(async (u) => {
    try {
      if (await cache.match(u)) { done++; return; }        // 已有就不重抓
      const r = await fetch(u);
      if (r.ok) { await cache.put(u, r); done++; }
    } catch { /* 單檔失敗不影響其他 */ }
  }));
  return { total: urls.length, cached: done };
}

async function cacheStatus() {
  const cache = await caches.open(CACHE);
  const keys = await cache.keys();
  const files = keys.filter((r) => /\/files\//.test(r.url)).length;
  return { version: VERSION, entries: keys.length, files };
}

self.addEventListener('message', (e) => {
  const msg = e.data || {};
  const reply = (data) => {
    if (e.ports && e.ports[0]) e.ports[0].postMessage(data);
  };
  if (msg.type === 'PREFETCH') e.waitUntil(prefetchAssets().then(reply));
  else if (msg.type === 'STATUS') e.waitUntil(cacheStatus().then(reply));
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
