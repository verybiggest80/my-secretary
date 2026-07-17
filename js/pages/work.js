/* work.js — Work 分頁:當日會診/值班/內外ICU + 醫師通訊錄 + 班表檔案 + CRRT FF 計算器 */
window.Pages.work = (function () {
  const ls = window.Store.ls;
  const fileStore = window.Store.fileStore;

  let root;

  /* 腎臟圖示(Unicode 無腎臟 emoji,用內嵌 SVG 畫一顆) */
  const KIDNEY_SVG = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 120 120" style="vertical-align:-0.15em" aria-label="腎臟">
    <defs><linearGradient id="kgrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e26879"/><stop offset="1" stop-color="#b93a52"/>
    </linearGradient></defs>
    <path d="M55 6 C28 6 10 28 10 60 C10 92 28 114 55 114 C70 114 80 106 80 96 C80 88 74 83 67 82 C62 81 62 76 67 74 C74 72 78 66 78 60 C78 54 74 48 67 46 C62 45 62 40 67 38 C74 36 80 31 80 24 C80 14 70 6 55 6 Z" fill="url(#kgrad)"/>
    <path d="M40 30 C33 38 30 48 30 60" stroke="rgba(255,255,255,.45)" stroke-width="7" stroke-linecap="round" fill="none"/>
  </svg>`;

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
          <div class="tile square" id="w-helper">
            <h3>${KIDNEY_SVG(17)} 臨床幫手</h3>
            <div class="tile-icon">${KIDNEY_SVG(40)}</div>
            <div class="tile-sub">FF計算器・會診工具</div>
          </div>
          <div class="tile square" id="w-schedule">
            <h3>📅 班表</h3>
            <div class="tile-icon" style="font-size:2rem">📅</div>
            <div class="tile-sub">查看雲端/本機班表</div>
          </div>
        </div>
        <div class="formula-hint" style="margin-top:8px">資料來源:${SD ? SD.month + ' 班表(' + SD.updated + ' 更新)' : '—'}</div>`;

      root.querySelector('#w-dir').addEventListener('click', renderDirectory);
      root.querySelector('#w-helper').addEventListener('click', renderHelper);
      root.querySelector('#w-schedule').addEventListener('click', renderSchedule);
    });
  }

  function backRowTo(label, handler) {
    const div = document.createElement('div');
    div.className = 'back-row';
    div.innerHTML = `<button class="back-btn">${label}</button>`;
    div.querySelector('button').addEventListener('click', handler);
    return div;
  }
  function backRow() { return backRowTo('← Work', renderMenu); }

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

  /* ---------- 雲端班表閱覽器(App 內開啟,含返回鍵、自由縮放) ---------- */
  function renderCloudViewer(entry) {
    root.innerHTML = '';

    const back = document.createElement('div');
    back.className = 'back-row';
    back.innerHTML = `<button class="back-btn">← 班表</button>`;
    back.querySelector('button').addEventListener('click', renderSchedule);
    root.appendChild(back);

    /* 縮放工具列 */
    const bar = document.createElement('div');
    bar.className = 'zoom-bar';
    bar.innerHTML = `
      <button id="z-out" aria-label="縮小">−</button>
      <span id="z-val">100%</span>
      <button id="z-in" aria-label="放大">＋</button>
      <button id="z-reset">重設</button>`;
    root.appendChild(bar);

    const scroll = document.createElement('div');
    scroll.className = 'zoom-scroll';
    const inner = document.createElement('div');
    inner.className = 'zoom-inner';
    const pages = entry.pages || [];
    inner.innerHTML =
      pages.map((p, i) => `<img src="${esc(p)}" alt="${esc(entry.label)}第${i + 1}頁" loading="lazy">`).join('');
    scroll.appendChild(inner);
    root.appendChild(scroll);

    if (entry.file) {
      const dl = document.createElement('a');
      dl.className = 'btn-secondary';
      dl.style.cssText = 'display:block;text-align:center;text-decoration:none';
      dl.href = entry.file;
      dl.target = '_blank';
      dl.rel = 'noopener';
      dl.textContent = '下載原始檔案';
      root.appendChild(dl);
    }

    /* 縮放:＋/−按鈕 + 雙指開合手勢,放大後可左右拖曳 */
    let zoom = 1;
    const setZoom = (z) => {
      zoom = Math.min(6, Math.max(1, z));
      inner.style.width = (zoom * 100) + '%';
      bar.querySelector('#z-val').textContent = Math.round(zoom * 100) + '%';
    };
    bar.querySelector('#z-in').addEventListener('click', () => setZoom(zoom * 1.3));
    bar.querySelector('#z-out').addEventListener('click', () => setZoom(zoom / 1.3));
    bar.querySelector('#z-reset').addEventListener('click', () => setZoom(1));

    let pinchStart = 0, zoomStart = 1;
    const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    scroll.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) { pinchStart = dist(e.touches); zoomStart = zoom; }
    }, { passive: true });
    scroll.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && pinchStart > 0) {
        e.preventDefault();
        setZoom(zoomStart * dist(e.touches) / pinchStart);
      }
    }, { passive: false });
    scroll.addEventListener('touchend', () => { pinchStart = 0; });

    window.scrollTo(0, 0);
  }

  /* ---------- 臨床幫手(子選單) ---------- */
  function renderHelper() {
    root.innerHTML = '';
    root.appendChild(backRow());
    const grid = document.createElement('div');
    grid.className = 'tile-grid';
    grid.innerHTML = `
      <div class="tile square" id="h-ff">
        <h3>🧮 FF計算器</h3>
        <div class="tile-icon" style="font-size:2rem">🧮</div>
        <div class="tile-sub">CRRT Filtration Fraction</div>
      </div>
      <div class="tile square" id="h-consult">
        <h3>📋 會診工具</h3>
        <div class="tile-icon" style="font-size:2rem">📋</div>
        <div class="tile-sub">會診範本・建議回覆</div>
      </div>
      <div class="tile square" id="h-plasma">
        <h3>💉 Plasma計算器</h3>
        <div class="tile-icon" style="font-size:2rem">💉</div>
        <div class="tile-sub">PE・DFPP volume</div>
      </div>
      <div class="tile square dx-tile" id="dx-hypoNa">
        <h3>🧭 Hyponatremia</h3>
        <div class="tile-sub">Interactive work-up</div>
      </div>
      <div class="tile square dx-tile" id="dx-hyperNa">
        <h3>🧭 Hypernatremia</h3>
        <div class="tile-sub">Interactive work-up</div>
      </div>
      <div class="tile square dx-tile" id="dx-hyperCa">
        <h3>🧭 Hypercalcemia</h3>
        <div class="tile-sub">Interactive work-up</div>
      </div>
      <div class="tile square dx-tile" id="dx-hypoCa">
        <h3>🧭 Hypocalcemia</h3>
        <div class="tile-sub">Interactive work-up</div>
      </div>`;
    root.appendChild(grid);
    grid.querySelector('#h-ff').addEventListener('click', renderCRRT);
    grid.querySelector('#h-consult').addEventListener('click', renderConsultList);
    grid.querySelector('#h-plasma').addEventListener('click', renderPlasmaMenu);
    ['hypoNa', 'hyperNa', 'hyperCa', 'hypoCa'].forEach((k) =>
      grid.querySelector('#dx-' + k).addEventListener('click', () => renderDx(k)));
  }

  /* ---------- Plasma 計算器(子選單) ---------- */
  function renderPlasmaMenu() {
    root.innerHTML = '';
    root.appendChild(backRowTo('← 臨床幫手', renderHelper));
    const grid = document.createElement('div');
    grid.className = 'tile-grid';
    grid.innerHTML = `
      <div class="tile square" id="p-pe">
        <h3>💉 Plasma Exchange</h3>
        <div class="tile-sub">Volume + FFP (U)</div>
      </div>
      <div class="tile square" id="p-dfpp">
        <h3>💉 DFPP</h3>
        <div class="tile-sub">Volume (L)</div>
      </div>`;
    root.appendChild(grid);
    grid.querySelector('#p-pe').addEventListener('click', () => renderPlasma('PE'));
    grid.querySelector('#p-dfpp').addEventListener('click', () => renderPlasma('DFPP'));
  }

  /* PE 與 DFPP 共用:V = (M 0.07 / F 0.065) × BW × (1−Hct);序列 V,V,V×1.3,V×1.3,V×1.5 */
  function renderPlasma(mode) {
    const isPE = mode === 'PE';
    const saved = ls.get(isPE ? 'peInputs' : 'dfppInputs', {});
    root.innerHTML = '';
    root.appendChild(backRowTo('← Plasma計算器', renderPlasmaMenu));

    const card = document.createElement('div');
    card.className = 'work-card';
    const sex = saved.sex || 'M';
    card.innerHTML = `
      <h2>💉 ${isPE ? 'Plasma Exchange' : 'DFPP'}</h2>
      <div class="field">
        <label>Sex</label>
        <div class="segmented" id="pl-sex">
          <button data-s="M" class="${sex === 'M' ? 'active' : ''}">M(0.07)</button>
          <button data-s="F" class="${sex === 'F' ? 'active' : ''}">F(0.065)</button>
        </div>
      </div>
      <div class="field">
        <label for="pl-bw">Body Weight (kg)</label>
        <input id="pl-bw" type="number" inputmode="decimal" value="${saved.bw ?? ''}" placeholder="例:60">
      </div>
      <div class="field">
        <label for="pl-hct">Hct (0–1)</label>
        <input id="pl-hct" type="number" inputmode="decimal" step="0.01" min="0" max="1" value="${saved.hct ?? 0.4}">
      </div>
      <button id="pl-calc" class="btn-primary">Calculate Volume</button>
      <div id="pl-out"></div>
      <div class="formula-hint">
        V = ${'{M 0.07 / F 0.065}'} × BW × (1 − Hct)<br>
        Volume: V → V → V×1.3 → V×1.3 → V×1.5${isPE ? '<br>FFP (U) = Volume(L) × 8' : ''}
      </div>`;
    root.appendChild(card);

    let curSex = sex;
    card.querySelectorAll('#pl-sex button').forEach((b) =>
      b.addEventListener('click', () => {
        curSex = b.dataset.s;
        card.querySelectorAll('#pl-sex button').forEach((x) => x.classList.toggle('active', x === b));
      }));

    card.querySelector('#pl-calc').addEventListener('click', () => {
      const bw = parseFloat(card.querySelector('#pl-bw').value);
      const hct = parseFloat(card.querySelector('#pl-hct').value);
      const out = card.querySelector('#pl-out');
      if (Number.isNaN(bw) || Number.isNaN(hct)) {
        out.innerHTML = '<div class="ff-result warn"><div class="ff-note">請填寫 Body Weight 與 Hct</div></div>';
        return;
      }
      if (hct <= 0 || hct >= 1) {
        out.innerHTML = '<div class="ff-result warn"><div class="ff-note">Hct 需介於 0 與 1 之間(例:0.4)</div></div>';
        return;
      }
      ls.set(isPE ? 'peInputs' : 'dfppInputs', { sex: curSex, bw, hct });

      const coef = curSex === 'F' ? 0.065 : 0.07;
      const V = coef * bw * (1 - hct);
      const mult = [1, 1, 1.3, 1.3, 1.5];
      const vols = mult.map((m) => V * m);
      const fmt = (x) => x.toFixed(2);
      const volArrow = vols.map(fmt).join(' → ');

      let html = `<div class="ff-result" style="text-align:left">
        <div class="pl-line"><span class="pl-label">Volume (L)</span><span class="pl-val">${volArrow}</span></div>`;
      if (isPE) {
        const ffpArrow = vols.map((v) => Math.round(v * 8)).join(' → ');
        html += `<div class="pl-line"><span class="pl-label">FFP (U)</span><span class="pl-val">${ffpArrow}</span></div>`;
      }
      html += `<div class="ff-note" style="margin-top:8px">V = ${coef} × ${bw} × (1 − ${hct}) = ${fmt(V)} L${isPE ? ' ・ 1 U FFP ≈ 125 mL' : ''}</div></div>`;
      out.innerHTML = html;
    });
  }

  /* ---------- 電解質互動診斷流程 ---------- */
  function ensureDxData(cb) {
    if (window.DxData) return cb();
    const s = document.createElement('script');
    s.src = 'js/dx-data.js';
    s.onload = cb;
    s.onerror = cb;
    document.head.appendChild(s);
  }

  function renderDx(key) {
    ensureDxData(() => {
      const tree = window.DxData && window.DxData[key];
      if (!tree) return renderHelper();
      const stack = [tree.root]; // node history for in-flow back

      function draw() {
        const nodeId = stack[stack.length - 1];
        const node = tree.nodes[nodeId];
        root.innerHTML = '';
        root.appendChild(backRowTo('← 臨床幫手', renderHelper));

        const card = document.createElement('div');
        card.className = 'work-card dx-card';
        let html = `<h2>${esc(tree.title)}</h2><div class="dx-subtitle">${esc(tree.subtitle)}</div>`;

        if (node.q) {
          if (node.step) html += `<div class="dx-step">${esc(node.step)}</div>`;
          html += `<div class="dx-q">${esc(node.q)}</div>`;
          if (node.note) html += `<div class="dx-note">${esc(node.note)}</div>`;
          html += `<div class="dx-options">` +
            node.options.map((o, i) => `<button class="dx-opt" data-i="${i}">${esc(o.label)}</button>`).join('') +
            `</div>`;
        }
        if (node.dx) {
          html += `<div class="dx-result">
            <div class="dx-dx">🎯 ${esc(node.dx)}</div>
            ${node.detail ? `<div class="dx-detail">${esc(node.detail)}</div>` : ''}
            <ul class="dx-tests">${(node.tests || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          </div>`;
          if (node.options) {
            html += `<div class="dx-options">` +
              node.options.map((o, i) => `<button class="dx-opt" data-i="${i}">${esc(o.label)}</button>`).join('') +
              `</div>`;
          }
        }

        html += `<div class="dx-nav">
          ${stack.length > 1 ? `<button class="btn-secondary" id="dx-back">↩ 上一步</button>` : ''}
          <button class="btn-secondary" id="dx-restart">↺ 重新開始</button>
        </div>`;
        card.innerHTML = html;
        root.appendChild(card);

        card.querySelectorAll('.dx-opt').forEach((b) =>
          b.addEventListener('click', () => {
            const opt = node.options[Number(b.dataset.i)];
            if (opt && opt.next) { stack.push(opt.next); draw(); }
          }));
        const back = card.querySelector('#dx-back');
        if (back) back.addEventListener('click', () => { stack.pop(); draw(); });
        card.querySelector('#dx-restart').addEventListener('click', () => { stack.length = 1; draw(); });
        window.scrollTo(0, 0);
      }
      draw();
    });
  }

  /* ---------- 會診工具:資料延遲載入 ---------- */
  function ensureConsultData(cb) {
    if (window.ConsultData) return cb();
    const s = document.createElement('script');
    s.src = 'js/consult-data.js';
    s.onload = cb;
    s.onerror = cb;
    document.head.appendChild(s);
  }

  function renderConsultList() {
    ensureConsultData(() => {
      root.innerHTML = '';
      root.appendChild(backRowTo('← 臨床幫手', renderHelper));
      const list = window.ConsultData || [];
      const card = document.createElement('div');
      card.className = 'work-card';
      card.innerHTML = `<h2>📋 會診工具</h2>` + (list.length ? `
        <ul class="consult-list">
          ${list.map((it, i) => `<li data-i="${i}"><span>${esc(it.title)}</span><span class="chev">›</span></li>`).join('')}
        </ul>` : '<div class="empty-hint" style="padding:12px 0">無法載入會診範本</div>');
      root.appendChild(card);
      card.querySelectorAll('.consult-list li').forEach((li) =>
        li.addEventListener('click', () => renderConsultDetail(Number(li.dataset.i))));
      window.scrollTo(0, 0);
    });
  }

  function renderConsultDetail(i) {
    const it = (window.ConsultData || [])[i];
    if (!it) return renderConsultList();
    root.innerHTML = '';
    root.appendChild(backRowTo('← 會診工具', renderConsultList));

    const card = document.createElement('div');
    card.className = 'work-card';
    card.innerHTML = `
      <h2>${esc(it.title)}</h2>
      <button class="btn-primary" id="copy-consult">📋 複製全文</button>
      <pre class="consult-body" id="consult-body"></pre>`;
    card.querySelector('#consult-body').textContent = it.body; // textContent 保證與原檔逐字相同
    root.appendChild(card);

    card.querySelector('#copy-consult').addEventListener('click', async () => {
      const btn = card.querySelector('#copy-consult');
      try {
        await navigator.clipboard.writeText(it.body);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = it.body;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      btn.textContent = '✓ 已複製';
      setTimeout(() => { btn.textContent = '📋 複製全文'; }, 1500);
    });
    window.scrollTo(0, 0);
  }

  /* ---------- CRRT:FF 計算器 ---------- */
  function renderCRRT() {
    const saved = ls.get('crrtInputs', {});
    root.innerHTML = '';
    root.appendChild(backRowTo('← 臨床幫手', renderHelper));

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
