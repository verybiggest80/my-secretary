(function () {
  const TITLES = { home: '首頁', todo: 'To Do', work: 'Work' };
  window.Pages = window.Pages || {};
  const inited = {};

  const container = {
    home: document.getElementById('page-home'),
    todo: document.getElementById('page-todo'),
    work: document.getElementById('page-work')
  };
  const headerBtn = document.getElementById('header-action');
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
      page.init(container[name], { headerBtn, navigate });
      inited[name] = true;
    }

    document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
    container[name].classList.add('active');
    document.querySelectorAll('.tab').forEach((t) =>
      t.classList.toggle('active', t.dataset.page === name));

    titleEl.textContent = TITLES[name];
    headerBtn.classList.add('hidden');

    if (page.show) page.show(subview);
    window.scrollTo(0, 0);
  }
  window.navigateTo = navigate;

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => navigate(tab.dataset.page));
  });

  navigate('home');

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
