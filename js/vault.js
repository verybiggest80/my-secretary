/* vault.js — 帳密保險箱
   資料只存在這台裝置的 localStorage,並以 PIN 經 PBKDF2 導出金鑰後用 AES-GCM 加密。
   任何時候都不會上傳到網站或 GitHub;沒有 PIN 就解不開密文。 */
window.Vault = (function () {
  const KEY = 'sec_vault';
  const ITER = 150000;
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  let list = null;   /* 解鎖後的明文清單(僅存在記憶體) */
  let pin = null;    /* 本次開啟期間暫存,供儲存時重新加密 */

  const subtle = () => (window.crypto && window.crypto.subtle) || null;
  const b64 = (buf) => btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
  const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

  async function deriveKey(p, salt) {
    const base = await subtle().importKey('raw', enc.encode(p), 'PBKDF2', false, ['deriveKey']);
    return subtle().deriveKey(
      { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  }

  function raw() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }

  async function persist() {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(pin, salt);
    const ct = await subtle().encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(list)));
    localStorage.setItem(KEY, JSON.stringify({ v: 1, salt: b64(salt), iv: b64(iv), ct: b64(ct) }));
  }

  return {
    available() { return !!subtle(); },
    exists() { return !!raw(); },
    unlocked() { return list !== null; },

    /* 首次建立保險箱 */
    async create(p) { list = []; pin = p; await persist(); },

    /* 以 PIN 解鎖;PIN 錯誤會拋出例外 */
    async unlock(p) {
      const o = raw();
      if (!o) throw new Error('尚未建立');
      const key = await deriveKey(p, unb64(o.salt));
      const pt = await subtle().decrypt({ name: 'AES-GCM', iv: unb64(o.iv) }, key, unb64(o.ct));
      list = JSON.parse(dec.decode(pt));
      pin = p;
      return true;
    },

    lock() { list = null; pin = null; },
    /* 解鎖期間才取得得到;供啟用 Face ID 時綁定,避免再彈出輸入框 */
    currentPin() { return list ? pin : null; },
    all() { return list ? list.slice() : []; },

    find(name) {
      if (!list || !name) return null;
      const n = String(name).trim();
      return list.find((x) => x.name === n) ||
             list.find((x) => x.name && (x.name.includes(n) || n.includes(x.name))) || null;
    },

    /* item: { name, account, password, note };有同名就覆寫 */
    async put(item) {
      if (!list) throw new Error('未解鎖');
      const i = list.findIndex((x) => x.name === item.name);
      if (i >= 0) list[i] = item; else list.push(item);
      list.sort((a, b) => String(a.name).localeCompare(String(b.name), 'zh-Hant'));
      await persist();
    },

    async remove(name) {
      if (!list) throw new Error('未解鎖');
      list = list.filter((x) => x.name !== name);
      await persist();
    },

    async changePin(p) {
      if (!list) throw new Error('未解鎖');
      pin = p;
      await persist();
    },

    /* 匯出的是密文,可安全放雲端;匯入後仍需原 PIN 才解得開 */
    exportBlob() {
      const o = raw();
      return o ? new Blob([JSON.stringify(o)], { type: 'application/json' }) : null;
    },
    async importText(text) {
      const o = JSON.parse(text);
      if (!o || !o.ct || !o.salt || !o.iv) throw new Error('格式不符');
      localStorage.setItem(KEY, JSON.stringify(o));
      list = null; pin = null;
    },

    destroy() { localStorage.removeItem(KEY); list = null; pin = null; }
  };
})();

/* bio.js 部分 — 用 Face ID / Touch ID 解鎖
   原理:以 WebAuthn 建立一組 passkey,並透過 PRF(hmac-secret)擴充從中導出一把固定金鑰,
   再用這把金鑰把 PIN 加密存起來。通過 Face ID 才拿得到那把金鑰,因此不是「只擋在門口」,
   而是真的沒有生物辨識就解不開。若裝置不支援 PRF,就維持只能用 PIN。 */
window.Bio = (function () {
  const KEY = 'sec_bio';
  const SALT = new TextEncoder().encode('sec-vault-prf-v1');
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const b64 = (b) => btoa(String.fromCharCode.apply(null, new Uint8Array(b)));
  const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

  function saved() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }

  async function keyFrom(secret) {
    return crypto.subtle.importKey('raw', secret, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
  }

  /* 用既有 credential 取得 PRF 秘密 */
  async function prfSecret(credId) {
    const opts = {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      userVerification: 'required',
      extensions: { prf: { eval: { first: SALT } } }
    };
    if (credId) opts.allowCredentials = [{ id: unb64(credId), type: 'public-key' }];
    const a = await navigator.credentials.get({ publicKey: opts });
    const r = a.getClientExtensionResults();
    if (!r || !r.prf || !r.prf.results || !r.prf.results.first) return null;
    return { secret: r.prf.results.first, id: b64(a.rawId) };
  }

  return {
    supported() {
      return !!(window.PublicKeyCredential && navigator.credentials &&
                window.crypto && window.crypto.subtle);
    },
    enabled() { return !!saved(); },

    async platformAvailable() {
      if (!this.supported()) return false;
      try {
        return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      } catch (e) { return false; }
    },

    /* 啟用:需要目前的 PIN,才能把它加密保存 */
    async enable(pin) {
      const cred = await navigator.credentials.create({
        publicKey: {
          challenge: crypto.getRandomValues(new Uint8Array(32)),
          rp: { name: '個人秘書', id: location.hostname },
          user: {
            id: crypto.getRandomValues(new Uint8Array(16)),
            name: 'secretary', displayName: '個人秘書'
          },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            residentKey: 'required',
            userVerification: 'required'
          },
          timeout: 60000,
          extensions: { prf: {} }
        }
      });
      const ext = cred.getClientExtensionResults();
      if (!ext || !ext.prf || ext.prf.enabled === false) {
        throw new Error('此裝置的生物辨識不支援金鑰導出(PRF)');
      }
      /* 建立後再做一次 get 才拿得到 PRF 秘密 */
      const got = await prfSecret(b64(cred.rawId));
      if (!got) throw new Error('無法取得金鑰,此裝置可能不支援 PRF');
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const ct = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv }, await keyFrom(got.secret), enc.encode(pin));
      localStorage.setItem(KEY, JSON.stringify({ v: 1, id: got.id, iv: b64(iv), ct: b64(ct) }));
      return true;
    },

    /* 解鎖:通過 Face ID 後取回 PIN */
    async unlock() {
      const o = saved();
      if (!o) throw new Error('尚未啟用');
      const got = await prfSecret(o.id);
      if (!got) throw new Error('無法取得金鑰');
      const pt = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: unb64(o.iv) }, await keyFrom(got.secret), unb64(o.ct));
      return dec.decode(pt);
    },

    disable() { localStorage.removeItem(KEY); }
  };
})();
