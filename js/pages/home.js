/* home.js — Dashboard:時段問候語、可自訂方塊(square/bar+順序)、設置(名字) */
window.Pages.home = (function () {
  const ls = window.Store.ls;

  /* 區域字串:原表格換行處會缺逗號(A1,A2,A8B1,B2,B3)→ 補成 A1,A2,A8,B1,B2,B3 */
  const fixRegion = (x) => String(x).replace(/(\d)([A-Za-z])/g, '$1,$2');

  const DEFAULT_TILES = [
    { id: 'date', size: 'bar' },
    { id: 'todo', size: 'bar' },
    { id: 'cover', size: 'bar' },
    { id: 'meeting', size: 'bar' }
  ];

  function ymOf(dt) { return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0'); }
  function monthData(dt) {
    const SD = window.ScheduleData;
    if (!SD || !SD.months) return null;
    return SD.months[ymOf(dt)] || null;
  }

  /* 名字是否出現在任一月份班表的名單中(通訊錄/Cover/值班/會診) */
  function nameInRoster(q) {
    const SD = window.ScheduleData;
    if (!SD || !SD.months) return false;
    const clean = (s) => String(s).replace(/[((].*?[))]/g, '').trim();
    const names = new Set();
    Object.values(SD.months).forEach((md) => {
      (md.directory || []).forEach((d) => names.add(d.name));
      Object.values(md.cover || {}).forEach((arr) => arr.forEach((p) => {
        names.add(clean(p.by));
        names.add(clean(p.off));
      }));
      Object.values(md.oncallB || {}).forEach((n) => names.add(n));
      Object.values(md.consult || {}).forEach((n) => names.add(n));
    });
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
  let meetingShowToday = false;
  let crTexts = [];              // 病房CR 提醒文字(對應卡片上的複製鈕)  // 會議卡片:false=明天(預設), true=今天

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
        const target = new Date();
        if (tm) target.setDate(target.getDate() + 1);
        const md = monthData(target);
        if (!md) {
          body = `<div class="cover-msg" style="color:var(--text-2)">${ymOf(target)} 班表尚未更新,無法查詢 Cover</div>`;
        } else if (!nameInRoster(q)) {
          /* 名字在整份班表中查不到(綽號/英文)→ 引導設置真實姓名 */
          body = `<div class="cover-msg" style="color:var(--text-2)">請按右上角齒輪設置真實姓名</div>`;
        } else {
          const day = target.getDate();
          const pairs = (md.cover && md.cover[day]) || [];
          const mine = pairs.filter((p) => p.by.includes(q) || q.includes(p.by));
          /* 會診欄位日期前有 F → 當期負責的總醫師要幫忙會診 */
          const hp = (md.consultHelper || []).find((r) => day >= r.from && day <= r.to);
          const helpConsult = (md.consultF || []).indexOf(day) >= 0 && !!hp &&
            (hp.name.includes(q) || q.includes(hp.name));
          /* 復大查房日期前有 F → 當期負責的總醫師要代查 */
          const rh = (md.roundHelper || []).find((r) => day >= r.from && day <= r.to);
          const mineRounds = (!!rh && (rh.name.includes(q) || q.includes(rh.name)))
            ? (((md.vsDuty && md.vsDuty.rounds && md.vsDuty.rounds[day]) || []).filter((r) => r.f))
            : [];

          const msgs = [];
          mineRounds.forEach((r) => {
            const regs = String(r.region).split('〉和〈').map(fixRegion).map(esc).join('〉和〈');
            msgs.push(`<div class="cover-msg">你${word}要代查喔! 區域是 <b>${esc(r.shift)}班</b>〈${regs}〉 <b>${esc(r.doctor)}</b></div>`);
          });
          if (helpConsult) msgs.push(`<div class="cover-msg">你${word}要幫忙會診喔!</div>`);
          if (mine.length) msgs.push(`<div class="cover-msg">你${word}要Cover${mine.map((m) => esc(m.off)).join('、')}喔! 辛苦了!</div>`);
          if (!msgs.length) msgs.push(`<div class="cover-msg">${word}不用Cover別人，舒服!</div>`);
          body = msgs.join('');
        }
      }
      if (q) body += `<button id="cover-toggle" class="cover-btn">${tm ? '回到今天' : '看看明天'}</button>`;
      return { title: `🤝 Cover${tm ? '(明天)' : ''}`, body, onTap: null };
    },
    meeting() {
      const today = meetingShowToday;
      const target = new Date();
      if (!today) target.setDate(target.getDate() + 1);
      const word = today ? '今天' : '明天';
      const md = monthData(target);
      const list = (md && md.meetings && md.meetings[target.getDate()]) || [];

      /* 病房CR:隔天有 CR teaching 時,給一則可複製的提醒 */
      const who = ((ls.get('realName', '') || '').trim()) || ((ls.get('userName', '') || '').trim());
      const d2 = target.getDate();
      const crRule = md && (md.wardCR || []).find((r) => d2 >= r.from && d2 <= r.to);
      const isWardCR = !!crRule && !!who && (crRule.name.includes(who) || who.includes(crRule.name));
      const notices = (!today && isWardCR && md && md.crNotices && md.crNotices[d2]) || [];
      const crBlock = notices.map((n, i) => `
        <div class="mt-cr">
          <span class="mt-cr-t">📣 提醒 ${esc(n.label)}</span>
          <button class="mt-cr-btn cr-copy" data-i="${i}">複製</button>
        </div>`).join('');
      crTexts = notices.map((n) => n.text);

      let body;
      if (!md) {
        body = `<div class="mt-empty">${ymOf(target)} 會議表尚未更新</div>`;
      } else if (!list.length) {
        body = `<div class="mt-empty">${word}沒有需要提醒的會議 🎉</div>`;
      } else {
        body = list.map((m) => {
          /* 場地/主講/主持可能缺少(TimeTree 來源)，有才顯示 */
          const meta = [];
          if (m.place) meta.push(`📍 ${esc(m.place)}`);
          if (m.speaker) meta.push(`主講 ${esc(m.speaker)}`);
          if (m.host) meta.push(`主持 ${esc(m.host)}`);
          return `<div class="mt-item">
            <div class="mt-time">${esc(m.time)}</div>
            <div class="mt-title">${esc(m.title)}</div>
            ${meta.length ? `<div class="mt-meta">${meta.join('・')}</div>` : ''}
          </div>`;
        }).join('');
      }
      body = crBlock + body;
      body += `<button id="meeting-toggle" class="cover-btn">${today ? '回到明天' : '看今天會議'}</button>`;
      return {
        title: `📣 ${today ? '今日' : '明日'}會議提醒<span class="mt-date">${target.getMonth() + 1}/${target.getDate()}</span>`,
        body, onTap: null
      };
    }
  };

  /* 讀取方塊設定;過濾已移除的方塊(如舊版的 CRRT/班表)
     Cover 只給住院醫師版;主治醫師版改用 VS Duty 分頁 */
  function tiles() {
    const isVS = ls.get('role', 'resident') === 'vs';
    let t = ls.get('tiles', DEFAULT_TILES).filter((x) => RENDERERS[x.id]);
    if (isVS) t = t.filter((x) => x.id !== 'cover');
    else if (!t.some((x) => x.id === 'cover')) t.push({ id: 'cover', size: 'bar' });
    if (!t.some((x) => x.id === 'meeting')) t.push({ id: 'meeting', size: 'bar' });
    return t.length ? t : DEFAULT_TILES.filter((x) => !isVS || x.id !== 'cover');
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

    /* 首頁最下方免責聲明與署名 */
    const note = document.createElement('div');
    note.className = 'home-note';
    note.innerHTML = 'AI可能會犯錯，請依正式班表為準<br><span class="home-credit">Developed by Fellow 瑞廷</span>';
    root.appendChild(note);

    /* 會議卡片:明天/今天切換 */
    const mt = root.querySelector('#meeting-toggle');
    if (mt) mt.addEventListener('click', (e) => {
      e.stopPropagation();
      meetingShowToday = !meetingShowToday;
      render();
    });

    /* 病房CR:複製提醒文字 */
    root.querySelectorAll('.cr-copy').forEach((cc) => cc.addEventListener('click', (e) => {
      e.stopPropagation();
      const txt = crTexts[Number(cc.dataset.i)] || '';
      const done = () => { cc.textContent = '已複製'; setTimeout(() => { cc.textContent = '複製'; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, done);
      } else {
        const ta = document.createElement('textarea');
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (err) {}
        ta.remove(); done();
      }
    }));

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
        <div class="field">
          <label>職級版本</label>
          <div class="segmented" id="set-role">
            <button data-r="resident" class="${ls.get('role', 'resident') !== 'vs' ? 'active' : ''}">住院醫師版</button>
            <button data-r="vs" class="${ls.get('role', 'resident') === 'vs' ? 'active' : ''}">主治醫師版</button>
          </div>
          <div class="formula-hint" style="margin-top:6px">主治醫師版會在下方分頁列增加 <b>VS Duty</b>(腎超・健診・復大查房)。</div>
        </div>
        <button id="set-save" class="btn-primary">儲存</button>
        <button id="set-back" class="btn-secondary">返回</button>
      </div>
      <div class="work-card">
        <h2>📥 離線資料</h2>
        <div class="tile-sub" id="cache-status">檢查中…</div>
        <button id="cache-refresh" class="btn-secondary">立即下載離線資料</button>
        <div class="formula-hint">
          App 每天首次開啟時會自動在背景把班表檔案存到手機,<br>
          之後即使沒有網路也能查看會診/值班/Cover 與雲端班表。
        </div>
      </div>`;

    const done = () => {
      titleEl.textContent = greeting();
      headerBtn.classList.remove('hidden');
      render();
    };
    let curRole = ls.get('role', 'resident');
    root.querySelectorAll('#set-role button').forEach((b) =>
      b.addEventListener('click', () => {
        curRole = b.dataset.r;
        root.querySelectorAll('#set-role button').forEach((x) => x.classList.toggle('active', x === b));
      }));

    root.querySelector('#set-save').addEventListener('click', () => {
      ls.set('userName', root.querySelector('#set-name').value.trim());
      ls.set('realName', root.querySelector('#set-realname').value.trim());
      ls.set('role', curRole);
      if (window.applyRole) window.applyRole();
      done();
    });
    root.querySelector('#set-back').addEventListener('click', done);

    /* 離線資料狀態 */
    const statusEl = root.querySelector('#cache-status');
    const refreshBtn = root.querySelector('#cache-refresh');
    const ask = (type) => new Promise((resolve) => {
      const sw = navigator.serviceWorker && navigator.serviceWorker.controller;
      if (!sw) return resolve(null);
      const ch = new MessageChannel();
      const timer = setTimeout(() => resolve(null), 20000);
      ch.port1.onmessage = (e) => { clearTimeout(timer); resolve(e.data); };
      sw.postMessage({ type }, [ch.port2]);
    });
    const showStatus = async () => {
      const s = await ask('STATUS');
      statusEl.textContent = s
        ? `已存離線檔案 ${s.files} 個(含班表圖與原檔)・版本 ${s.version}`
        : '此環境不支援離線快取(需以網址開啟並允許 Service Worker)';
    };
    showStatus();
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.disabled = true;
      refreshBtn.textContent = '下載中…';
      const r = await ask('PREFETCH');
      refreshBtn.disabled = false;
      refreshBtn.textContent = '立即下載離線資料';
      if (r) statusEl.textContent = `已更新:${r.cached}/${r.total} 個班表檔案可離線使用`;
      else showStatus();
    });
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
    meetingShowToday = false;
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
