/* work.js — Work 分頁:當日會診/值班/內外ICU + 醫師通訊錄 + 班表檔案 + CRRT FF 計算器 */
window.Pages.work = (function () {
  const ls = window.Store.ls;
  const fileStore = window.Store.fileStore;

  let root;

  /* ---------- 班表資料延遲載入 ---------- */
  function ensureData(cb) {
    if (window.ScheduleData) return cb();
    const s = document.createElement('script');
    s.src = 'js/schedule-data.js';
    s.onload = cb;
    s.onerror = cb; // 載入失敗也繼續,畫面會顯示「尚未更新」
    document.head.appendChild(s);
  }

  function findDoc(name) {
    const SD = window.ScheduleData;
    const d = SD && SD.directory.find((x) => x.name === name);
    return { name: name || '—', code: d ? d.code : '—', phone: (d && d.phone) || '—' };
  }

  /* 取得今日資訊;若資料月份與本月不符回傳 null */
  function todayInfo() {
    const SD = window.ScheduleData;
    if (!SD) return null;
    const now = new Date();
    const ymOf = (dt) => dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0');
    if (SD.month !== ymOf(now)) return null;
    const d = now.getDate();
    let consultNote = '';
    let consultName = SD.consult[d];
    if (!consultName) { consultName = SD.oncallB[d]; consultNote = '假日改急會診,由值班醫師負責'; }
    const inRange = (arr) => { const r = arr.find((r) => d >= r.from && d <= r.to); return r ? r.name : null; };

    /* 值班以每日 07:30 交接:07:30 前仍顯示前一日的值班醫師 */
    const shifted = new Date(now.getTime() - (7 * 60 + 30) * 60000);
    let oncall, oncallNote = '';
    if (ymOf(shifted) === SD.month) {
      oncall = findDoc(SD.oncallB[shifted.getDate()]);
      if (shifted.getDate() !== d) oncallNote = `${shifted.getMonth() + 1}/${shifted.getDate()} 值班・07:30 交接`;
    } else {
      oncall = findDoc(null);
      oncallNote = '前月班表已過期';
    }

    return {
      day: d,
      consult: findDoc(consultName), consultNote,
      oncall, oncallNote,
      icuMed: findDoc(inRange(SD.icuMed)),
      icuSurg: findDoc(inRange(SD.icuSurg))
    };
  }

  function docTile(id, icon, title, doc, note) {
    return `
      <div class="tile square doc-tile" id="${id}">
        <h3>${icon} ${title}</h3>
        <div>
          <div class="doc-name">${doc.name}</div>
          <div class="doc-meta">代號 <b>${doc.code}</b></div>
          <div class="doc-meta">☎ <b>${doc.phone}</b></div>
          ${note ? `<div class="doc-note">${note}</div>` : ''}
        </div>
      </div>`;
  }

  /* ---------- 主選單(方塊) ---------- */
  function renderMenu() {
    ensureData(() => {
      const info = todayInfo();
      const SD = window.ScheduleData;
      const now = new Date();

      let tilesHtml;
      if (info) {
        tilesHtml = `
          ${docTile('w-consult', '🩺', '會診', info.consult, info.consultNote)}
          ${docTile('w-oncall', '🌙', '值班', info.oncall, info.oncallNote)}
          ${docTile('w-icu-med', '🫁', '內ICU', info.icuMed)}
          ${docTile('w-icu-surg', '😷', '外ICU', info.icuSurg)}`;
      } else {
        tilesHtml = `
          <div class="tile bar">
            <h3>⚠️ 班表尚未更新</h3>
            <div class="tile-sub">目前資料為 ${SD ? SD.month : '無'},請上傳 ${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')} 的班表給 Claude 更新。</div>
          </div>`;
      }

      root.innerHTML = `
        <div class="tile-grid">
          ${tilesHtml}
          <div class="tile bar" id="w-dir">
            <h3>📖 醫師通訊錄</h3>
            <div class="tile-sub">點擊查看全部醫師(可搜尋姓名/代號/電話)</div>
          </div>
          <div class="tile square" id="w-crrt">
            <h3>🧮 CRRT</h3>
            <div class="tile-icon" style="font-size:2rem">🧮</div>
            <div class="tile-sub">Filtration Fraction 計算</div>
          </div>
          <div class="tile square" id="w-schedule">
            <h3>📅 班表</h3>
            <div class="tile-icon" style="font-size:2rem">📅</div>
            <div class="tile-sub">查看雲端/本機班表</div>
          </div>
        </div>
        <div class="formula-hint" style="margin-top:8px">資料來源:${SD ? SD.month + ' 班表(' + SD.updated + ' 更新)' : '—'}</div>`;

      root.querySelector('#w-dir').addEventListener('click', renderDirectory);
      root.querySelector('#w-crrt').addEventListener('click', renderCRRT);
      root.querySelector('#w-schedule').addEventListener('click', renderSchedule);
    });
  }

  function backRow() {
    const div = document.createElement('div');
    div.className = 'back-row';
    div.innerHTML = `<button class="back-btn">← Work</button>`;
    div.querySelector('button').addEventListener('click', renderMenu);
    return div;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------- 醫師通訊錄(含搜尋) ---------- */
  function renderDirectory() {
    root.innerHTML = '';
    root.appendChild(backRow());

    const card = document.createElement('div');
    card.className = 'work-card';
    card.innerHTML = `
      <h2>📖 醫師通訊錄</h2>
      <div class="field" style="margin-bottom:8px">
        <input id="dir-q" type="search" placeholder="搜尋姓名 / 代號 / 電話…" autocomplete="off">
      </div>
      <ul class="dir-list" id="dir-list"></ul>`;
    root.appendChild(card);

    const listEl = card.querySelector('#dir-list');
    const all = (window.ScheduleData && window.ScheduleData.directory) || [];

    function draw(q) {
      q = (q || '').trim().toLowerCase();
      const rows = all.filter((d) =>
        !q || d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q) || (d.phone || '').includes(q));
      listEl.innerHTML = rows.map((d) => `
        <li>
          <span class="dir-name">${esc(d.name)}</span>
          <span class="dir-code">${esc(d.code)}</span>
          <span class="dir-phone">${esc(d.phone || '—')}</span>
        </li>`).join('') || '<div class="empty-hint" style="padding:20px 0">查無符合的醫師</div>';
    }
    draw('');
    card.querySelector('#dir-q').addEventListener('input', (e) => draw(e.target.value));
  }

  /* ---------- 班表原檔 ---------- */
  async function renderSchedule() {
    root.innerHTML = '';
    root.appendChild(backRow());

    /* 雲端班表:隨網站部署,所有裝置皆可開啟(每個檔案一張卡片) */
    const SD = window.ScheduleData;
    const entries = (SD && SD.cloud) || [];
    if (entries.length === 0) {
      const cloud = document.createElement('div');
      cloud.className = 'work-card';
      cloud.innerHTML = `<h2>☁️ 雲端班表</h2><div class="empty-hint" style="padding:12px 0">尚無雲端班表</div>`;
      root.appendChild(cloud);
    }
    entries.forEach((entry) => {
      const cloud = document.createElement('div');
      cloud.className = 'work-card';
      cloud.innerHTML = `<h2>☁️ ${esc(entry.title || '雲端班表')}</h2>
        <div class="schedule-current">
          <span class="file-icon">📄</span>
          <div class="schedule-meta">
            <div class="fname">${esc(entry.label)}</div>
            <div class="fdate">${esc(entry.month || '')}・所有裝置皆可開啟</div>
          </div>
          <button class="cloud-open" style="border:none;background:var(--accent);color:#fff;padding:8px 14px;border-radius:10px;font-weight:600">開啟</button>
        </div>`;
      cloud.querySelector('.cloud-open').addEventListener('click', () => renderCloudViewer(entry));
      root.appendChild(cloud);
    });

    const card = document.createElement('div');
    card.className = 'work-card';
    card.innerHTML = `<h2>📱 本機檔案</h2><div id="sch-body">載入中…</div>
      <input id="sch-file" type="file" class="hidden">
      <button id="sch-upload" class="btn-primary">上傳新班表</button>`;
    root.appendChild(card);

    const body = card.querySelector('#sch-body');
    const fileInput = card.querySelector('#sch-file');

    async function refresh() {
      const files = await fileStore.listMeta('schedule');
      if (files.length === 0) {
        body.innerHTML = '<div class="empty-hint" style="padding:16px 0">尚未上傳班表</div>';
        return;
      }
      const latest = files[0];
      body.innerHTML = `
        <div class="schedule-current">
          <span class="file-icon">📄</span>
          <div class="schedule-meta">
            <div class="fname">${esc(latest.name)}</div>
            <div class="fdate">上傳於 ${new Date(latest.date).toLocaleDateString('zh-TW')}</div>
          </div>
          <button class="h-open" data-id="${latest.id}" style="border:none;background:var(--accent);color:#fff;padding:8px 14px;border-radius:10px;font-weight:600">開啟</button>
        </div>
        ${files.length > 1 ? `
          <div class="section-label">歷史班表</div>
          <ul class="history-list">
            ${files.slice(1).map((f) => `
              <li>
                <span class="h-name">${esc(f.name)}<br><small style="color:var(--text-2)">${new Date(f.date).toLocaleDateString('zh-TW')}</small></span>
                <button class="h-open" data-id="${f.id}">開啟</button>
                <button class="h-del" data-id="${f.id}">✕</button>
              </li>`).join('')}
          </ul>` : ''}`;

      body.querySelectorAll('.h-open').forEach((b) =>
        b.addEventListener('click', () => openFile(Number(b.dataset.id), files)));
      body.querySelectorAll('.h-del').forEach((b) =>
        b.addEventListener('click', async () => {
          await fileStore.remove(Number(b.dataset.id));
          refresh();
        }));
    }

    function openFile(id, files) {
      const rec = files.find((f) => f.id === id);
      if (!rec) return;
      const url = URL.createObjectURL(rec.blob);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }

    card.querySelector('#sch-upload').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async () => {
      const f = fileInput.files[0];
      if (!f) return;
      await fileStore.add({ category: 'schedule', name: f.name, type: f.type, blob: f, date: Date.now() });
      fileInput.value = '';
      refresh();
    });

    refresh();
  }

  /* ---------- 雲端班表閱覽器(App 內開啟,含返回鍵) ---------- */
  function renderCloudViewer(entry) {
    root.innerHTML = '';

    const back = document.createElement('div');
    back.className = 'back-row';
    back.innerHTML = `<button class="back-btn">← 班表</button>`;
    back.querySelector('button').addEventListener('click', renderSchedule);
    root.appendChild(back);

    const wrap = document.createElement('div');
    wrap.className = 'pdf-pages';
    const pages = entry.pages || [];
    wrap.innerHTML =
      pages.map((p, i) => `<img src="${esc(p)}" alt="${esc(entry.label)}第${i + 1}頁" loading="lazy">`).join('') +
      (entry.file ? `<a class="btn-secondary" style="display:block;text-align:center;text-decoration:none" href="${esc(entry.file)}" target="_blank" rel="noopener">下載原始檔案</a>` : '');
    root.appendChild(wrap);
    window.scrollTo(0, 0);
  }

  /* ---------- CRRT:FF 計算器 ---------- */
  function renderCRRT() {
    const saved = ls.get('crrtInputs', {});
    root.innerHTML = '';
    root.appendChild(backRow());

    const card = document.createElement('div');
    card.className = 'work-card';
    card.innerHTML = `
      <h2>🧮 Filtration Fraction (FF)</h2>
      <div class="field">
        <label for="qb">QB — Blood flow (mL/min)</label>
        <input id="qb" type="number" inputmode="decimal" value="${saved.qb ?? 150}">
      </div>
      <div class="field">
        <label for="qpre">Qpre — PBP / Pre-replacement (mL/hr)</label>
        <input id="qpre" type="number" inputmode="decimal" value="${saved.qpre ?? ''}" placeholder="例:1000">
      </div>
      <div class="field">
        <label for="qpost">Qpost — Post-replacement (mL/hr)</label>
        <input id="qpost" type="number" inputmode="decimal" value="${saved.qpost ?? ''}" placeholder="例:1000">
      </div>
      <div class="field">
        <label for="quf">Net UF (mL/hr)</label>
        <input id="quf" type="number" inputmode="decimal" value="${saved.quf ?? 0}">
      </div>
      <div class="field">
        <label for="hct">Hct(0–1)</label>
        <input id="hct" type="number" inputmode="decimal" step="0.01" min="0" max="1" value="${saved.hct ?? 0.3}">
      </div>
      <button id="calc-ff" class="btn-primary">Calculate FF</button>
      <div id="ff-out"></div>
      <div class="formula-hint">
        FF = (Qpre + Qpost + Net UF) ÷ (QB × 60 × (1 − Hct) + Qpre)<br>
        QB 以 mL/min 輸入,計算時自動 ×60 換算為 mL/hr。
      </div>`;
    root.appendChild(card);

    card.querySelector('#calc-ff').addEventListener('click', () => {
      const v = (id) => parseFloat(card.querySelector('#' + id).value);
      const qb = v('qb'), qpre = v('qpre'), qpost = v('qpost'), quf = v('quf'), hct = v('hct');
      const out = card.querySelector('#ff-out');

      if ([qb, qpre, qpost, quf, hct].some((n) => Number.isNaN(n))) {
        out.innerHTML = '<div class="ff-result warn"><div class="ff-note">請填寫所有欄位</div></div>';
        return;
      }
      if (hct <= 0 || hct >= 1) {
        out.innerHTML = '<div class="ff-result warn"><div class="ff-note">Hct 需介於 0 與 1 之間(例:0.3)</div></div>';
        return;
      }

      ls.set('crrtInputs', { qb, qpre, qpost, quf, hct });

      const plasmaFlow = qb * 60 * (1 - hct);
      const ff = ((qpre + qpost + quf) / (plasmaFlow + qpre)) * 100;
      const high = ff > 25;

      out.innerHTML = `
        <div class="ff-result ${high ? 'warn' : ''}">
          <div class="ff-value">FF = ${ff.toFixed(1)}%</div>
          <div class="ff-note">
            Plasma flow = ${qb} × 60 × (1 − ${hct}) = ${Math.round(plasmaFlow)} mL/hr<br>
            ${high ? '⚠️ FF > 25%,濾器凝血風險較高,建議調整處方' : '✓ FF ≤ 25%,在一般建議範圍內'}
          </div>
        </div>`;
    });
  }

  return {
    init(el) { root = el; },
    show(subview) {
      ensureData(() => {
        if (subview === 'schedule') renderSchedule();
        else if (subview === 'crrt') renderCRRT();
        else if (subview === 'directory') renderDirectory();
        else renderMenu();
      });
    }
  };
})();
