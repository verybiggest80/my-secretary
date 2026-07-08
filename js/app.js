/* app.js — 入口:分頁路由 + 頁面腳本延遲載入(需要時才注入 <script>)
   不使用 ES modules,file:// 直接開啟也能運作 */
(function () {
  const TITLES = { home: '首頁', todo: 'To Do', work: 'Work' };
  window.Pages = window.Pages || {};   // 各頁面腳本會把自己註冊到這裡
  const inited = {};

  const container = {
    home: document.getElementById('page-home'),
    todo: document.getElementById('page-todo'),
    work: document.getElementById('page-work')
  };
  const headerBtn = document.getElementById('header-action');
  const gearBtn = document.getElementById('header-gear');
  const titleEl = document.getElementById('page-title');

  function loadScript(name) {
    return new Promise((resolve, reject) => {
      if (window.Pages[name]) return resolve();
      const s = document.createElement('script');
      s.src = 'js/pages/' + name + '.js';
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('無法載入頁面:' + name));
      document.head.appendChild(s);
    });
  }

  async function navigate(name, subview) {
    await loadScript(name);
    const page = window.Pages[name];
    if (!inited[name]) {
      page.init(container[name], { headerBtn, gearBtn, titleEl, navigate });
      inited[name] = true;
    }

    document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
    container[name].classList.add('active');
    document.querySelectorAll('.tab').forEach((t) =>
      t.classList.toggle('active', t.dataset.page === name));

    titleEl.textContent = TITLES[name];
    headerBtn.classList.add('hidden');
    gearBtn.classList.add('hidden');

    if (page.show) page.show(subview);
    window.scrollTo(0, 0);
  }
  window.navigateTo = navigate;

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => navigate(tab.dataset.page));
  });

  /* 首頁優先載入,其餘分頁點擊時才載入 */
  navigate('home');

  /* PWA service worker(僅在 http/https 環境註冊;file:// 直接開時跳過)
     含自動更新:開啟或切回前景時背景檢查,偵測到新版自動重新載入 */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        const check = () => reg.update().catch(() => {});
        check();
        setInterval(check, 30 * 60 * 1000); // 每30分鐘
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') check(); // App 切回前景時
        });
      }).catch(() => {});

      let hadController = !!navigator.serviceWorker.controller;
      let reloaded = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!hadController) { hadController = true; return; } // 首次安裝不重載
        if (reloaded) return;
        reloaded = true;
        location.reload(); // 新版本接管 → 自動重新載入
      });
    });
  }
})();
/* end */
