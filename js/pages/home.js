/* home.js — Dashboard:時段問候語、可自訂方塊(square/bar+順序)、設置(名字) */
window.Pages.home = (function () {
  const ls = window.Store.ls;

  const DEFAULT_TILES = [
    { id: 'date', size: 'bar' },
    { id: 'todo', size: 'bar' },
    { id: 'cover', size: 'bar' }
  ];

  /* 名字是否出現在本月班表任何名單中(通訊錄/Cover/值班/會診) */
  function nameInRoster(q) {
    const SD = window.ScheduleData;
    if (!SD) return false;
    const clean = (s) => String(s).replace(/[((].*?[))]/g, '').trim();
    const names = new Set();
    (SD.directory || []).forEach((d) => names.add(d.name));
    Object.values(SD.cover || {}).forEach((arr) => arr.forEach((p) => {
      names.add(clean(p.by));
      names.add(clean(p.off));
    }));
    Object.values(SD.oncallB || {}).forEach((n) => names.add(n));
    Object.values(SD.consult || {}).forEach((n) => names.add(n));
    for (const n of names) {
      if (n && (n.includes(q) || q.includes(n))) return true;
    }
    return false;
  }

  /* 班表資料延遲載入(Cover 卡片需要) */
  function ensureData(cb) {
    if (window.ScheduleData) return cb();
    const s = document.createElement('script');
    s.src = 'js/schedule-data.js';
    s.onload = cb;
    s.onerror = cb;
    document.head.appendChild(s);
  }

  let root, nav, headerBtn, gearBtn, titleEl;
  let editing = false;
  let coverShowTomorrow = false; // Cover 卡片:false=今天, true=明天

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* 時段問候語:5-11 早安、11-18 午安、其餘 晚安 */
  function greeting() {
    const h = new Date().getHours();
    const g = (h >= 5 && h < 11) ? '早安' : (h >= 11 && h < 18) ? '午安' : '晚安';
    const name = (ls.get('userName', '') || '').trim();
    return name ? `${g},${name}` : g;
  }

  const RENDERERS = {
    date() {
      const now = new Date();
      const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
      return {
        title: '今天',
        body: `<div class="tile-big">${now.getMonth() + 1}月${now.getDate()}日</div>
               <div class="tile-sub">${now.getFullYear()} 年・星期${weekdays[now.getDay()]}</div>`,
        onTap: null
      };
    },
    todo() {
      const items = ls.get('todos', []);
      const open = items.filter((i) => !i.done);
      const preview = open.slice(0, 3).map((i) =>
        `<div>・${esc(i.text)}</div>`).join('') || '<div>目前沒有未完成事項 🎉</div>';
      return {
        title: '✓ 待辦事項',
        body: `<div class="tile-big">${open.length}<span style="font-size:.9rem;color:var(--text-2)"> 項未完成</span></div>
               <div class="tile-sub">${preview}</div>`,
        onTap: () => nav('todo')
      };
    },
    cover() {
      const nick = (ls.get('userName', '') || '').trim();
      const real = (ls.get('realName', '') || '').trim();
      const q = real || nick; // 查 Cover 優先用真實姓名
      const tm = coverShowTomorrow;
      const word = tm ? '明天' : '今天';
      let body;
      if (!q) {
        body = `<div class="cover-msg" style="color:var(--text-2)">請按右上角齒輪圖案設置姓名以開啟貼心功能</div>`;
      } else {
        const SD = window.ScheduleData;
        const target = new Date();
        if (tm) target.setDate(target.getDate() + 1);
        const ym = target.getFullYear() + '-' + String(target.getMonth() + 1).padStart(2, '0');
        if (!SD || SD.month !== ym) {
          body = `<div class="cover-msg" style="color:var(--text-2)">${tm ? '明天已是下個月,' : ''}班表尚未更新,無法查詢 Cover</div>`;
        } else if (!nameInRoster(q)) {
          /* 名字在整份班表中查不到(綽號/英文)→ 引導設置真實姓名 */
          body = `<div class="cover-msg" style="color:var(--text-2)">請按右上角齒輪設置真實姓名</div>`;
        } else {
          const pairs = (SD.cover && SD.cover[target.getDate()]) || [];
          const mine = pairs.filter((p) => p.by.includes(q) || q.includes(p.by));
          body = mine.length
            ? `<div class="cover-msg">你${word}要Cover${mine.map((m) => esc(m.off)).join('、')}喔! 辛苦了!</div>`
            : `<div class="cover-msg">${word}不用Cover別人，舒服!</div>`;
        }
      }
      if (q) body += `<button id="cover-toggle" class="cover-btn">${tm ? '回到今天' : '看看明天'}</button>`;
      return { title: `🤝 Cover${tm ? '(明天)' : ''}`, body, onTap: null };
    }
  };

  /* 讀取方塊設定;過濾已移除的方塊(如舊版的 CRRT/班表),補上新的 Cover 卡片 */
  function tiles() {
    const t = ls.get('tiles', DEFAULT_TILES).filter((x) => RENDERERS[x.id]);
    if (!t.some((x) => x.id === 'cover')) t.push({ id: 'cover', size: 'bar' });
    return t.length ? t : DEFAULT_TILES;
  }
  function saveTiles(t) { ls.set('tiles', t); }

  function render() {
    const t = tiles();
    root.innerHTML = `<div class="tile-grid ${editing ? 'editing' : ''}"></div>`;
    const grid = root.firstElementChild;

    t.forEach((cfg, idx) => {
      const { title, body, onTap } = RENDERERS[cfg.id]();
      const el = document.createElement('div');
      el.className = `tile ${cfg.size}`;
      el.innerHTML = `<h3>${title}</h3>${body}`;

      if (editing) {
        const ctl = document.createElement('div');
        ctl.className = 'tile-controls';
        ctl.innerHTML = `
          <button data-act="size" title="切換大小">${cfg.size === 'square' ? '▭' : '◻'}</button>
          <button data-act="up" title="上移" ${idx === 0 ? 'disabled' : ''}>↑</button>
          <button data-act="down" title="下移" ${idx === t.length - 1 ? 'disabled' : ''}>↓</button>`;
        ctl.addEventListener('click', (e) => {
          const act = e.target.dataset.act;
          if (!act) return;
          e.stopPropagation();
          const arr = tiles();
          if (act === 'size') arr[idx].size = arr[idx].size === 'square' ? 'bar' : 'square';
          if (act === 'up' && idx > 0) [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
          if (act === 'down' && idx < arr.length - 1) [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
          saveTiles(arr);
          render();
        });
        el.appendChild(ctl);
      } else if (onTap) {
        el.addEventListener('click', onTap);
      }
      grid.appendChild(el);
    });

    /* Cover 卡片:今天/明天切換 */
    const ct = root.querySelector('#cover-toggle');
    if (ct) ct.addEventListener('click', (e) => {
      e.stopPropagation();
      coverShowTomorrow = !coverShowTomorrow;
      render();
    });
  }

  /* 設置頁:設定名字 */
  function renderSettings() {
    headerBtn.classList.add('hidden');
    root.innerHTML = `
      <div class="work-card">
        <h2>⚙️ 設置</h2>
        <div class="field">
          <label for="set-name">你的稱呼(顯示在首頁問候語)</label>
          <input id="set-name" type="text" value="${esc(ls.get('userName', ''))}" placeholder="例:Jeffrey" autocomplete="off">
        </div>
        <div class="field">
          <label for="set-realname">真實姓名(用於查詢班表 Cover)</label>
          <input id="set-realname" type="text" value="${esc(ls.get('realName', ''))}" placeholder="例:許瑞廷" autocomplete="off">
        </div>
        <button id="set-save" class="btn-primary">儲存</button>
        <button id="set-back" class="btn-secondary">返回</button>
      </div>`;

    const done = () => {
      titleEl.textContent = greeting();
      headerBtn.classList.remove('hidden');
      render();
    };
    root.querySelector('#set-save').addEventListener('click', () => {
      ls.set('userName', root.querySelector('#set-name').value.trim());
      ls.set('realName', root.querySelector('#set-realname').value.trim());
      done();
    });
    root.querySelector('#set-back').addEventListener('click', done);
  }

  function init(el, ctx) {
    root = el;
    nav = ctx.navigate;
    headerBtn = ctx.headerBtn;
    gearBtn = ctx.gearBtn;
    titleEl = ctx.titleEl;
  }

  function show() {
    editing = false;
    coverShowTomorrow = false;
    titleEl.textContent = greeting();

    headerBtn.textContent = '編輯';
    headerBtn.classList.remove('hidden');
    headerBtn.onclick = () => {
      editing = !editing;
      headerBtn.textContent = editing ? '完成' : '編輯';
      render();
    };

    gearBtn.classList.remove('hidden');
    gearBtn.onclick = renderSettings;

    ensureData(render);
  }

  return { init, show };
})();
