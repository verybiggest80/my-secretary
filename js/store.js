/* store.js — 資料層:localStorage(小型設定/待辦)+ IndexedDB(檔案 blob)
   以 window.Store 提供,不使用 ES modules,file:// 直接開也能運作 */
(function () {
  const LS_PREFIX = 'sec_';

  const ls = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(LS_PREFIX + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch { return fallback; }
    },
    set(key, value) {
      localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
    }
  };

  /* ---- IndexedDB:存班表等檔案 ---- */
  const DB_NAME = 'secretary-db';
  const DB_VER = 1;
  const FILES = 'files';

  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VER);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(FILES)) {
          db.createObjectStore(FILES, { keyPath: 'id', autoIncrement: true });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  const fileStore = {
    async add(record) { // { category, name, type, blob, date }
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(FILES, 'readwrite');
        const req = tx.objectStore(FILES).add(record);
        req.onsuccess = () => resolve(req.result);
        tx.onerror = () => reject(tx.error);
      });
    },
    async get(id) {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(FILES, 'readonly');
        const req = tx.objectStore(FILES).get(id);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    },
    async listMeta(category) {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(FILES, 'readonly');
        const req = tx.objectStore(FILES).getAll();
        req.onsuccess = () => {
          const rows = req.result
            .filter((r) => r.category === category)
            .sort((a, b) => b.date - a.date);
          resolve(rows);
        };
        req.onerror = () => reject(req.error);
      });
    },
    async remove(id) {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(FILES, 'readwrite');
        tx.objectStore(FILES).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }
  };

  window.Store = { ls, fileStore };
})();
/* end */
