/* work.js — 會診分頁:當日會診/值班/內外ICU + 醫師通訊錄 + 班表檔案 + CRRT FF 計算器 */
window.Pages.work = (function () {
  const ls = window.Store.ls;

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

  /* 依日期取得該月份資料(找不到回傳 null) */
  function ymOf(dt) { return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0'); }
  function monthData(dt) {
    const SD = window.ScheduleData;
    if (!SD || !SD.months) return null;
    return SD.months[ymOf(dt)] || null;
  }
  /* 通訊錄:優先用該月;查不到再翻其他月份 */
  function allDirectory() {
    const SD = window.ScheduleData;
    if (!SD || !SD.months) return [];
    const seen = new Set(), out = [];
    Object.keys(SD.months).sort().reverse().forEach((k) =>
      (SD.months[k].directory || []).forEach((d) => {
        if (!seen.has(d.code)) { seen.add(d.code); out.push(d); }
      }));
    return out;
  }
  /* 區域字串:原表格換行處會缺逗號(A1,A2,A8B1,B2,B3)→ 補成 A1,A2,A8,B1,B2,B3 */
  const fixRegion = (x) => String(x).replace(/(\d)([A-Za-z])/g, '$1,$2');

  const fileStore = window.Store.fileStore;

  let zoneTomorrow = false;   /* 復大分區卡片:false=今天, true=明天 */

  /* 區域代號依開頭字母(A/B/H)分色 */
  function zoneHtml(group) {
    return String(group).split(',').map((code) => {
      const c = code.trim();
      const k = (c.charAt(0) || '').toUpperCase();
      const cls = k === 'A' ? 'z-a' : k === 'B' ? 'z-b' : k === 'H' ? 'z-h' : '';
      return cls ? `<span class="${cls}">${esc(c)}</span>` : esc(c);
    }).join(',');
  }

  /* 復大查房:當日依班別彙整「誰負責哪一格」,同班別同醫師的多格合併 */
  function roundZones(md, day) {
    const list = (md && md.vsDuty && md.vsDuty.rounds && md.vsDuty.rounds[day]) || [];
    const shifts = [];
    list.forEach((r) => {
      let sh = shifts.find((x) => x.shift === r.shift);
      if (!sh) { sh = { shift: r.shift, docs: [] }; shifts.push(sh); }
      /* 同醫師但「代查/非代查」要分開列,否則標記會套到不該套的格子 */
      const fg = !!r.f;
      let dc = sh.docs.find((x) => x.name === r.doctor && x.f === fg);
      if (!dc) { dc = { name: r.doctor, regions: [], f: fg }; sh.docs.push(dc); }
      String(r.region).split('〉和〈').map(fixRegion).forEach((g) => {
        if (!dc.regions.includes(g)) dc.regions.push(g);
      });
    });
    shifts.sort((a, b) => a.shift.localeCompare(b.shift));
    return shifts;
  }

  function findDoc(name, md) {
    if (!name) return { name: '—', code: '—', phone: '—' };
    const list = (md && md.directory) || allDirectory();
    const look = (n) => list.find((x) => x.name === n) || allDirectory().find((x) => x.name === n);
    /* 「主責/備援*」兩位醫師:姓名原樣顯示,代號與電話以 / 併列 */
    const docs = String(name).split('/').map((x) => x.trim()).filter(Boolean)
      .map((x) => look(x.replace(/\*$/, '')));
    return {
      name: name,
      code: docs.map((d) => (d ? d.code : '—')).join(' / '),
      phone: docs.map((d) => (d && d.phone) || '—').join(' / ')
    };
  }

  /* 取得今日資訊;若當月無班表資料回傳 null */
  function todayInfo() {
    const now = new Date();
    const md = monthData(now);
    if (!md) return null;
    const d = now.getDate();
    let consultNote = '';
    let consultName = md.consult[d];
    if (!consultName) { consultName = md.oncallB[d]; consultNote = '假日改急會診,由值班醫師負責'; }
    const inRange = (arr) => { const r = (arr || []).find((r) => d >= r.from && d <= r.to); return r ? r.name : null; };

    /* 值班以每日 07:30 交接:07:30 前仍顯示前一日的值班醫師(可跨月) */
    const shifted = new Date(now.getTime() - (7 * 60 + 30) * 60000);
    const smd = monthData(shifted);
    let oncall, oncallNote = '';
    if (smd) {
      oncall = findDoc(smd.oncallB[shifted.getDate()], smd);
      if (shifted.getDate() !== d) oncallNote = `${shifted.getMonth() + 1}/${shifted.getDate()} 值班・07:30 交接`;
    } else {
      oncall = findDoc(null, md);
      oncallNote = '前一日班表資料不存在';
    }

    /* 兩種班表格式:有 consultICU 表示會診分為 一般病房 / ICU內外 / LICU */
    const splitICU = !!md.consultICU;
    let icuName = splitICU ? md.consultICU[d] : null;
    let icuNote = '';
    if (splitICU && !icuName) { icuName = md.oncallB[d]; icuNote = '假日改急會診,由值班醫師負責'; }

    return {
      day: d, splitICU,
      consult: findDoc(consultName, md), consultNote,
      oncall, oncallNote,
      icu: findDoc(icuName, md), icuNote,
      licu: findDoc(md.licu || null, md),
      icuMed: findDoc(inRange(md.icuMed), md),
      icuSurg: findDoc(inRange(md.icuSurg), md)
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
        tilesHtml = info.splitICU
          ? `
          ${docTile('w-consult', '🩺', '病房會診', info.consult, info.consultNote)}
          ${docTile('w-oncall', '🌙', '值班', info.oncall, info.oncallNote)}
          ${docTile('w-icu', '🫁', 'ICU', info.icu, info.icuNote)}
          ${docTile('w-licu', '🛏', 'LICU', info.licu)}`
          : `
          ${docTile('w-consult', '🩺', '會診', info.consult, info.consultNote)}
          ${docTile('w-oncall', '🌙', '值班', info.oncall, info.oncallNote)}
          ${docTile('w-icu-med', '🫁', '內ICU', info.icuMed)}
          ${docTile('w-icu-surg', '😷', '外ICU', info.icuSurg)}`;
      } else {
        const have = SD && SD.months ? Object.keys(SD.months).sort().join('、') : '無';
        tilesHtml = `
          <div class="tile bar">
            <h3>⚠️ 本月班表尚未更新</h3>
            <div class="tile-sub">現有資料:${have};請提供 ${ymOf(now)} 的班表給 Claude 更新。</div>
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
        <div class="formula-hint" style="margin-top:8px">資料來源:${ymOf(now)} 班表(${SD ? SD.updated : '—'} 更新)</div>`;

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
  function backRow() { return backRowTo('← 會診', renderMenu); }

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
    const all = allDirectory();

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
  function renderSchedule() {
    root.innerHTML = '';
    root.appendChild(backRow());

    /* 復大分區:血液透析室主治醫師查房分區(可切換今天/明天) */
    const target = new Date();
    if (zoneTomorrow) target.setDate(target.getDate() + 1);
    const zWord = zoneTomorrow ? '明天' : '今天';
    const md = monthData(target);
    const zones = roundZones(md, target.getDate());
    /* 點姓名查帳密只在住院醫師版提供 */
    const isResident = ls.get('role', 'resident') !== 'vs';
    const zc = document.createElement('div');
    zc.className = 'work-card';
    zc.innerHTML = `<h2>🏥 復大分區<span style="font-weight:400;color:var(--text-2);font-size:.85rem"> ${target.getMonth() + 1}/${target.getDate()}</span></h2>` +
      (zones.length
        ? zones.map((s2) => `
          <div class="section-label" style="margin:12px 0 6px">${esc(s2.shift)} 班</div>
          ${s2.docs.map((d2) => `
            <div class="rz-row">
              ${isResident
                ? `<button class="rz-name" data-doc="${esc(d2.name)}">${esc(d2.name)}</button>`
                : `<span class="rz-name rz-plain">${esc(d2.name)}</span>`}${d2.f ? '<span class="rz-f">代查</span>' : ''}
              <span class="rz-reg">〈${d2.regions.map(zoneHtml).join('〉和〈')}〉</span>
            </div>`).join('')}`).join('')
        : `<div class="empty-hint" style="padding:12px 0">${md ? zWord + '沒有復大查房' : ymOf(target) + ' 班表尚未更新'}</div>`);
    zc.insertAdjacentHTML('beforeend',
      `<div class="rz-btns">
         <button id="rz-toggle" class="cover-btn">${zoneTomorrow ? '回到今天' : '看看明天'}</button>
         <button id="rz-creds" class="cover-btn">看看帳密</button>
       </div>`);
    zc.querySelector('#rz-toggle').addEventListener('click', () => {
      zoneTomorrow = !zoneTomorrow;
      renderSchedule();
    });
    zc.querySelector('#rz-creds').addEventListener('click', renderCreds);
    /* 點醫師姓名 → 疊層顯示該醫師帳密(僅住院醫師版) */
    if (isResident) {
      zc.querySelectorAll('button.rz-name').forEach((b) =>
        b.addEventListener('click', () => credOverlay(b.dataset.doc)));
    }
    root.appendChild(zc);

    /* 雲端班表:隨網站部署,所有裝置皆可開啟(每個檔案一張卡片) */
    const SD = window.ScheduleData;
    /* 過月後自動隱藏舊月份:以每日 07:30 為界,1 號 07:30 前仍保留上個月 */
    const shifted = new Date(Date.now() - (7 * 60 + 30) * 60000);
    const cutoff = ymOf(shifted);
    const entries = ((SD && SD.cloud) || []).filter((e) => !e.month || e.month >= cutoff);
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

  }

  /* ---------- 帳密保險箱(只存在本機,AES 加密,不會上傳) ---------- */
  let credUrls = [];
  function releaseCredUrls() {
    credUrls.forEach((u) => { try { URL.revokeObjectURL(u); } catch (e) {} });
    credUrls = [];
  }

  const V = () => window.Vault;

  /* PIN 輸入畫面:mode = 'unlock' | 'create' */
  function pinForm(mode, onOk, hint) {
    const box = document.createElement('div');
    box.className = 'work-card';
    box.innerHTML = `
      <h2>🔒 ${mode === 'create' ? '建立帳密保險箱' : '請輸入 PIN'}</h2>
      <div class="tile-sub" style="color:var(--text-2);font-size:.8rem;line-height:1.6;margin-bottom:10px">
        ${mode === 'create'
          ? '設定一組 PIN,資料會用它加密後存在這台裝置。<br>⚠️ 忘記 PIN 就無法解開,請記牢。'
          : (hint || '解鎖後才能檢視或編輯帳密。')}
      </div>
      <div class="field"><input id="pin-a" type="password" inputmode="numeric" autocomplete="off" placeholder="PIN"></div>
      ${mode === 'create' ? '<div class="field"><input id="pin-b" type="password" inputmode="numeric" autocomplete="off" placeholder="再輸入一次"></div>' : ''}
      <div class="pin-err" id="pin-err"></div>
      <button id="pin-go" class="btn-primary">${mode === 'create' ? '建立' : '解鎖'}</button>
      ${mode === 'unlock' && window.Bio && window.Bio.enabled()
        ? '<button id="pin-bio" class="btn-secondary" style="margin-top:8px">🙂 用 Face ID 解鎖</button>' : ''}`;
    const err = (m) => { box.querySelector('#pin-err').textContent = m || ''; };
    const go = async () => {
      const a = box.querySelector('#pin-a').value.trim();
      if (a.length < 4) return err('PIN 至少 4 位');
      if (mode === 'create') {
        if (a !== box.querySelector('#pin-b').value.trim()) return err('兩次輸入不一致');
        await V().create(a);
      } else {
        try { await V().unlock(a); } catch (e) { return err('PIN 不正確'); }
      }
      err(''); onOk();
    };
    box.querySelector('#pin-go').addEventListener('click', go);
    const bioBtn = box.querySelector('#pin-bio');
    if (bioBtn) {
      bioBtn.addEventListener('click', async () => {
        try {
          const p = await window.Bio.unlock();
          await V().unlock(p);
          err(''); onOk();
        } catch (e) {
          err('Face ID 解鎖失敗,請改用 PIN');
        }
      });
    }
    box.querySelectorAll('input').forEach((i) =>
      i.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); }));
    return box;
  }

  function renderCreds() {
    releaseCredUrls();
    root.innerHTML = '';
    root.appendChild(backRowTo('← 班表', () => { releaseCredUrls(); renderSchedule(); }));

    if (!V().available()) {
      const w = document.createElement('div');
      w.className = 'work-card';
      w.innerHTML = '<h2>🔑 帳密</h2><div class="empty-hint" style="padding:16px 0">此瀏覽器不支援加密儲存,請用 https 開啟本站</div>';
      root.appendChild(w);
      return;
    }
    /* --- 圖片/PDF 附件(沿用原本的本機檔案儲存) --- */
    const fcard = document.createElement('div');
    fcard.className = 'work-card';
    fcard.innerHTML = `<h2>🖼 圖片備份</h2>
      <div id="cr-body">載入中…</div>
      <input id="cr-file" type="file" accept="image/*,application/pdf" class="hidden">
      <button id="cr-upload" class="btn-primary">上傳檔案</button>`;
    root.appendChild(fcard);

    const body = fcard.querySelector('#cr-body');
    const fileInput = fcard.querySelector('#cr-file');

    async function refresh() {
      const files = await fileStore.listMeta('creds');
      if (!files.length) {
        body.innerHTML = '<div class="empty-hint" style="padding:16px 0">尚未上傳檔案</div>';
        return;
      }
      releaseCredUrls();
      body.innerHTML = '<div class="cr-list"></div>';
      const listEl = body.querySelector('.cr-list');
      const rows = files.map((f) => {
        const url = URL.createObjectURL(f.blob);
        credUrls.push(url);
        return { f, url, isImg: /^image\//.test(f.type || '') };
      });
      const gallery = rows.filter((r) => r.isImg).map((r) => ({ src: r.url, name: r.f.name, url: r.url }));
      const openGallery = (i) => imageViewer({
        backLabel: '帳密', onBack: renderCreds,
        srcs: [gallery[i].src], label: gallery[i].name,
        gallery, index: i, onIndex: openGallery,
        fileUrl: gallery[i].url, fileName: gallery[i].name, fileLabel: '下載 / 用其他 App 開啟'
      });
      rows.forEach((r) => {
        const cell = document.createElement('div');
        cell.className = 'cr-cell';
        cell.innerHTML = `
          <div class="cr-big">${r.isImg
            ? `<img src="${r.url}" alt="${esc(r.f.name)}">`
            : '<span class="cr-pdf">📄<br>PDF</span>'}</div>
          <div class="cr-name">${esc(r.f.name)}</div>
          <button class="cr-del" data-id="${r.f.id}" aria-label="刪除">✕</button>`;
        cell.querySelector('.cr-big').addEventListener('click', () => {
          if (r.isImg) openGallery(gallery.findIndex((g) => g.url === r.url));
          else renderPdfViewer(r.f, r.url);
        });
        cell.querySelector('.cr-del').addEventListener('click', async (e) => {
          e.stopPropagation();
          await fileStore.remove(Number(r.f.id));
          refresh();
        });
        listEl.appendChild(cell);
      });
    }
    fcard.querySelector('#cr-upload').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async () => {
      const f = fileInput.files[0];
      if (!f) return;
      await fileStore.add({ category: 'creds', name: f.name, type: f.type, blob: f, date: Date.now() });
      fileInput.value = '';
      refresh();
    });
    refresh().catch(() => {
      body.innerHTML = '<div class="empty-hint" style="padding:16px 0">此瀏覽器無法使用本機儲存(可能是無痕模式)</div>';
    });
    /* --- 帳密卡片排在圖片備份下方;未解鎖時只顯示 PIN 表單 --- */
    if (!V().unlocked()) {
      root.appendChild(pinForm(V().exists() ? 'unlock' : 'create', renderCreds));
      window.scrollTo(0, 0);
      return;
    }

    /* --- 已解鎖:醫師帳密清單 --- */
    const card = document.createElement('div');
    card.className = 'work-card';
    const items = V().all();
    card.innerHTML = `
      <h2>🔑 帳密<button id="cr-lock" class="cover-btn" style="float:right;margin:0">鎖定</button></h2>
      <div class="tile-sub" style="color:var(--text-2);font-size:.78rem;line-height:1.6;margin-bottom:10px">
        以 PIN 加密後只存在這台裝置,不會上傳。換手機或清除瀏覽器資料就會消失。
      </div>
      <div id="cr-items">${items.length
        ? items.map((it) => `
          <div class="cv-row">
            <span class="cv-nm">${esc(it.name)}</span>
            <span class="cv-ac">${esc(it.account || '')}</span>
            <button class="cv-edit" data-n="${esc(it.name)}">編輯</button>
            <button class="cv-del" data-n="${esc(it.name)}">✕</button>
          </div>`).join('')
        : '<div class="empty-hint" style="padding:14px 0">尚未建立任何帳密</div>'}</div>
      <button id="cr-add" class="btn-primary">新增醫師帳密</button>
      <div class="rz-btns">
        <button id="cr-export" class="cover-btn">匯出加密備份</button>
        <button id="cr-pin" class="cover-btn">變更 PIN</button>
        <button id="cr-bio" class="cover-btn"></button>
      </div>
      <div class="pin-err" id="cr-bio-msg"></div>`;
    root.appendChild(card);

    card.querySelector('#cr-lock').addEventListener('click', () => { V().lock(); renderCreds(); });
    card.querySelector('#cr-add').addEventListener('click', () => credEditor(''));
    card.querySelectorAll('.cv-edit').forEach((b) =>
      b.addEventListener('click', () => credEditor(b.dataset.n)));
    card.querySelectorAll('.cv-del').forEach((b) =>
      b.addEventListener('click', async () => {
        if (!window.confirm(`刪除「${b.dataset.n}」的帳密?`)) return;
        await V().remove(b.dataset.n); renderCreds();
      }));
    card.querySelector('#cr-export').addEventListener('click', () => {
      const blob = V().exportBlob();
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'vault-backup.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 30000);
    });
    /* Face ID:啟用需要目前的 PIN,才能把它加密保存 */
    (async () => {
      const btn = card.querySelector('#cr-bio');
      const msg = card.querySelector('#cr-bio-msg');
      const ok = window.Bio && window.Bio.supported() && await window.Bio.platformAvailable();
      if (!ok) { btn.style.display = 'none'; msg.textContent = ''; return; }
      const draw = () => { btn.textContent = window.Bio.enabled() ? '停用 Face ID' : '啟用 Face ID'; };
      draw();
      btn.addEventListener('click', async () => {
        msg.textContent = '';
        if (window.Bio.enabled()) { window.Bio.disable(); draw(); return; }
        const p = window.prompt('請再輸入一次目前的 PIN 以啟用 Face ID');
        if (!p) return;
        try { await V().unlock(p.trim()); } catch (e) { msg.textContent = 'PIN 不正確'; return; }
        try { await window.Bio.enable(p.trim()); draw(); msg.textContent = '已啟用,下次可用 Face ID 解鎖'; }
        catch (e) { msg.textContent = e.message || '此裝置不支援'; }
      });
    })();

    card.querySelector('#cr-pin').addEventListener('click', () => {
      const np = window.prompt('輸入新的 PIN(至少 4 位)');
      if (np && np.trim().length >= 4) V().changePin(np.trim()).then(() => window.alert('已變更'));
    });

    window.scrollTo(0, 0);
  }

  /* 新增/編輯單筆帳密 */
  function credEditor(name) {
    const cur = name ? (V().all().find((x) => x.name === name) || {}) : {};
    root.innerHTML = '';
    root.appendChild(backRowTo('← 帳密', renderCreds));
    const card = document.createElement('div');
    card.className = 'work-card';
    card.innerHTML = `
      <h2>${name ? '編輯' : '新增'}帳密</h2>
      <div class="field"><label>醫師姓名</label><input id="e-name" value="${esc(cur.name || '')}" placeholder="例:賴弘強" autocomplete="off"></div>
      <div class="field"><label>帳號</label><input id="e-ac" value="${esc(cur.account || '')}" autocomplete="off"></div>
      <div class="field"><label>密碼</label><input id="e-pw" value="${esc(cur.password || '')}" autocomplete="off"></div>
      <div class="field"><label>備註</label><input id="e-note" value="${esc(cur.note || '')}" autocomplete="off"></div>
      <div class="pin-err" id="e-err"></div>
      <button id="e-save" class="btn-primary">儲存</button>`;
    root.appendChild(card);
    card.querySelector('#e-save').addEventListener('click', async () => {
      const nm = card.querySelector('#e-name').value.trim();
      if (!nm) { card.querySelector('#e-err').textContent = '請輸入醫師姓名'; return; }
      if (name && name !== nm) await V().remove(name);
      await V().put({
        name: nm,
        account: card.querySelector('#e-ac').value.trim(),
        password: card.querySelector('#e-pw').value,
        note: card.querySelector('#e-note').value.trim()
      });
      renderCreds();
    });
    window.scrollTo(0, 0);
  }

  /* 復大分區點擊姓名 → 疊層顯示該醫師帳密 */
  function credOverlay(name) {
    const back = document.createElement('div');
    back.className = 'cv-mask';
    const box = document.createElement('div');
    box.className = 'cv-box';
    back.appendChild(box);
    const close = () => back.remove();
    back.addEventListener('click', (e) => { if (e.target === back) close(); });

    function draw() {
      if (!V().available()) {
        box.innerHTML = `<h3>${esc(name)}</h3><div class="cv-hint">此瀏覽器不支援加密儲存</div>`;
        return;
      }
      if (!V().unlocked()) {
        box.innerHTML = `<h3>🔒 ${esc(name)}</h3>`;
        box.appendChild(pinForm(V().exists() ? 'unlock' : 'create', draw, '解鎖後可查看此醫師的帳密。'));
        box.querySelector('.work-card').classList.add('cv-inline');
        return;
      }
      const it = V().find(name);
      if (!it) {
        box.innerHTML = `<h3>${esc(name)}</h3>
          <div class="cv-hint">尚未建立這位醫師的帳密</div>
          <button class="btn-primary" id="cv-new">去新增</button>`;
        box.querySelector('#cv-new').addEventListener('click', () => { close(); credEditor(''); });
        return;
      }
      box.innerHTML = `
        <h3>${esc(it.name)}</h3>
        <div class="cv-line"><span class="cv-k">帳號</span><span class="cv-v" id="cv-ac">${esc(it.account || '—')}</span><button class="cv-cp" data-t="ac">複製</button></div>
        <div class="cv-line"><span class="cv-k">密碼</span><span class="cv-v" id="cv-pw">${esc(it.password || '—')}</span><button class="cv-eye">隱藏</button><button class="cv-cp" data-t="pw">複製</button></div>
        ${it.note ? `<div class="cv-note">${esc(it.note)}</div>` : ''}
        <div class="rz-btns"><button class="cover-btn" id="cv-edit">編輯</button><button class="cover-btn" id="cv-close">關閉</button></div>`;
      let shown = true;   /* 密碼預設直接顯示 */
      box.querySelector('.cv-eye').addEventListener('click', (e) => {
        shown = !shown;
        box.querySelector('#cv-pw').textContent = shown ? (it.password || '—') : '••••••••';
        e.target.textContent = shown ? '隱藏' : '顯示';
      });
      box.querySelectorAll('.cv-cp').forEach((b) =>
        b.addEventListener('click', () => {
          const v = b.dataset.t === 'ac' ? (it.account || '') : (it.password || '');
          if (navigator.clipboard) navigator.clipboard.writeText(v);
          b.textContent = '已複製';
          setTimeout(() => { b.textContent = '複製'; }, 1200);
        }));
      box.querySelector('#cv-edit').addEventListener('click', () => { close(); credEditor(it.name); });
      box.querySelector('#cv-close').addEventListener('click', close);
    }
    draw();
    document.body.appendChild(back);
  }

  /* PDF:App 內以 iframe 預覽,另提供以其他 App 開啟 */
  function renderPdfViewer(f, url) {
    root.innerHTML = '';
    root.appendChild(backRowTo('← 帳密', renderCreds));
    const card = document.createElement('div');
    card.className = 'work-card';
    card.innerHTML = `<h2>📄 ${esc(f.name)}</h2>
      <iframe class="cr-pdfview" src="${url}" title="${esc(f.name)}"></iframe>`;
    root.appendChild(card);
    const a = document.createElement('a');
    a.className = 'btn-secondary';
    a.style.cssText = 'display:block;text-align:center;text-decoration:none';
    a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.download = f.name;
    a.textContent = '下載 / 用其他 App 開啟';
    root.appendChild(a);
    window.scrollTo(0, 0);
  }

  /* 通用縮放檢視器:給一組圖片網址,支援 ＋/− 與雙指開合 */
  function imageViewer(opts) {
    root.innerHTML = '';
    const back = document.createElement('div');
    back.className = 'back-row';
    back.innerHTML = `<button class="back-btn">← ${esc(opts.backLabel || '返回')}</button>`;
    back.querySelector('button').addEventListener('click', opts.onBack);
    root.appendChild(back);

    const bar = document.createElement('div');
    bar.className = 'zoom-bar';
    bar.innerHTML = `
      <button id="z-out" aria-label="縮小">−</button>
      <span id="z-val">100%</span>
      <button id="z-in" aria-label="放大">＋</button>
      <button id="z-reset">重設</button>`;
    root.appendChild(bar);

    const gal = opts.gallery || null;
    const gi = opts.index || 0;
    if (gal) {
      const nav = document.createElement('div');
      nav.className = 'gal-nav';
      nav.innerHTML = `
        <button id="g-prev" ${gi === 0 ? 'disabled' : ''} aria-label="上一張">‹</button>
        <span class="gal-info">${gi + 1} / ${gal.length}　${esc(gal[gi].name)}</span>
        <button id="g-next" ${gi === gal.length - 1 ? 'disabled' : ''} aria-label="下一張">›</button>`;
      root.appendChild(nav);
      const go = (i) => { if (i >= 0 && i < gal.length) opts.onIndex(i); };
      nav.querySelector('#g-prev').addEventListener('click', () => go(gi - 1));
      nav.querySelector('#g-next').addEventListener('click', () => go(gi + 1));
      opts.go = go;
    }

    const scroll = document.createElement('div');
    scroll.className = 'zoom-scroll';
    const inner = document.createElement('div');
    inner.className = 'zoom-inner';
    inner.innerHTML = (opts.srcs || [])
      .map((src, i) => `<img src="${esc(src)}" alt="${esc(opts.label || '')}第${i + 1}頁" loading="lazy">`).join('');
    scroll.appendChild(inner);
    root.appendChild(scroll);

    if (opts.fileUrl) {
      const dl = document.createElement('a');
      dl.className = 'btn-secondary';
      dl.style.cssText = 'display:block;text-align:center;text-decoration:none';
      dl.href = opts.fileUrl;
      dl.target = '_blank';
      dl.rel = 'noopener';
      if (opts.fileName) dl.download = opts.fileName;
      dl.textContent = opts.fileLabel || '下載原始檔案';
      root.appendChild(dl);
    }

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

    /* 相簿模式:未放大時左右滑動切換圖片 */
    if (gal) {
      let sx = 0, sy = 0, single = false;
      scroll.addEventListener('touchstart', (e) => {
        single = e.touches.length === 1;
        if (single) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }
      }, { passive: true });
      scroll.addEventListener('touchend', (e) => {
        if (!single || zoom !== 1 || !e.changedTouches.length) return;
        const dx = e.changedTouches[0].clientX - sx;
        const dy = e.changedTouches[0].clientY - sy;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) opts.go(gi + (dx < 0 ? 1 : -1));
      }, { passive: true });
    }

    window.scrollTo(0, 0);
  }

  /* ---------- 雲端班表閱覽器 ---------- */
  function renderCloudViewer(entry) {
    imageViewer({
      backLabel: '班表', onBack: renderSchedule,
      srcs: entry.pages || [], label: entry.label,
      fileUrl: entry.file, fileLabel: '下載原始檔案'
    });
  }

  /* ---------- 臨床幫手(子選單) ---------- */
  function renderHelper() {
    root.innerHTML = '';
    root.appendChild(backRow());
    const grid = document.createElement('div');
    grid.className = 'tile-grid';
    grid.innerHTML = `
      <div class="tile square" id="h-ff">
        <h3>FF計算器</h3>
        <div class="tile-icon">🧮</div>
        <div class="tile-sub">CRRT Filtration Fraction</div>
      </div>
      <div class="tile square" id="h-consult">
        <h3>會診工具</h3>
        <div class="tile-icon">📋</div>
        <div class="tile-sub">會診範本・建議回覆</div>
      </div>
      <div class="tile square" id="h-plasma">
        <h3>Plasma計算器</h3>
        <div class="tile-icon">💉</div>
        <div class="tile-sub">PE・DFPP volume</div>
      </div>
      <div class="tile square" id="h-crcl">
        <h3>24hr CrCl</h3>
        <div class="tile-icon">🧪</div>
        <div class="tile-sub">Creatinine clearance</div>
      </div>
      <div class="tile square" id="h-ibw">
        <h3>IBW / AdjBW</h3>
        <div class="tile-icon">⚖️</div>
        <div class="tile-sub">Ideal・Adjusted BW</div>
      </div>
      <div class="tile square" id="h-mala">
        <h3>MALA</h3>
        <div class="tile-icon">💊</div>
        <div class="tile-sub">透析指徵・模式比較</div>
      </div>
      <div class="tile square" id="h-di">
        <h3>尿崩症 (DI)</h3>
        <div class="tile-icon">💧</div>
        <div class="tile-sub">治療・補水・用藥</div>
      </div>
      <div class="tile square" id="h-hypona">
        <h3>低血鈉治療</h3>
        <div class="tile-icon">🧂</div>
        <div class="tile-sub">依症狀分級處置</div>
      </div>
      <div class="tile square dx-tile" id="dx-hypoNa">
        <h3>Hyponatremia</h3>
        <div class="tile-icon">🧭</div>
        <div class="tile-sub">Interactive work-up</div>
      </div>
      <div class="tile square dx-tile" id="dx-hyperNa">
        <h3>Hypernatremia</h3>
        <div class="tile-icon">🧭</div>
        <div class="tile-sub">Interactive work-up</div>
      </div>
      <div class="tile square dx-tile" id="dx-hyperCa">
        <h3>Hypercalcemia</h3>
        <div class="tile-icon">🧭</div>
        <div class="tile-sub">Interactive work-up</div>
      </div>
      <div class="tile square dx-tile" id="dx-hypoCa">
        <h3>Hypocalcemia</h3>
        <div class="tile-icon">🧭</div>
        <div class="tile-sub">Interactive work-up</div>
      </div>
      <div class="tile square dx-tile" id="dx-polyuria">
        <h3>Polyuria</h3>
        <div class="tile-icon">🧭</div>
        <div class="tile-sub">Interactive work-up</div>
      </div>`;
    root.appendChild(grid);
    grid.querySelector('#h-ff').addEventListener('click', renderCRRT);
    grid.querySelector('#h-consult').addEventListener('click', renderConsultList);
    grid.querySelector('#h-plasma').addEventListener('click', renderPlasmaMenu);
    grid.querySelector('#h-crcl').addEventListener('click', renderCrCl);
    grid.querySelector('#h-ibw').addEventListener('click', renderIBW);
    grid.querySelector('#h-mala').addEventListener('click', renderMala);
    grid.querySelector('#h-di').addEventListener('click', renderDI);
    grid.querySelector('#h-hypona').addEventListener('click', renderHypoNaTx);
    ['hypoNa', 'hyperNa', 'hyperCa', 'hypoCa', 'polyuria'].forEach((k) =>
      grid.querySelector('#dx-' + k).addEventListener('click', () => renderDx(k)));
  }

  /* ---------- SIADH 治療 ---------- */
  function renderSiadh(backHandler) {
    const draw = () => {
      const S = window.SiadhData;
      root.innerHTML = '';
      root.appendChild(backRowTo('← Hyponatremia', backHandler || renderHelper));
      if (!S) {
        const e = document.createElement('div');
        e.className = 'work-card';
        e.innerHTML = '<div class="empty-hint">無法載入資料</div>';
        root.appendChild(e); return;
      }
      const add = (html) => {
        const d = document.createElement('div');
        d.className = 'work-card';
        d.innerHTML = html;
        root.appendChild(d);
      };

      add(`<h2>📘 ${S.title}</h2><div class="dx-subtitle">${S.subtitle}</div>
        <ul class="mala-list">${S.intro.map((s) => `<li>${s}</li>`).join('')}</ul>`);

      add(`<h2>📊 各療法單用的療效</h2>
        <div class="mala-table-wrap"><table class="mala-table sev-table">
          <thead><tr>${S.efficacy.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${S.efficacy.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>
        <div class="mala-note">${S.efficacy.note}</div>`);

      add(`<h2>💊 各療法細節</h2>
        <div class="mala-note" style="margin:-4px 0 10px">點標題展開內容</div>` +
        S.therapies.map((t) => `<details class="di-acc">
          <summary>${t.name}</summary>
          <ul class="mala-list">${t.items.map((s) => `<li>${s}</li>`).join('')}</ul>
        </details>`).join(''));

      add(`<h2>🕒 長期治療與停藥評估</h2>
        <ul class="mala-list">${S.longTerm.map((s) => `<li>${s}</li>`).join('')}</ul>`);

      add(`<h2>💡 臨床要點</h2>
        <ul class="mala-list">${S.pearls.map((s) => `<li>${s}</li>`).join('')}</ul>`);
      window.scrollTo(0, 0);
    };
    if (window.SiadhData) return draw();
    const s = document.createElement('script');
    s.src = 'js/siadh-data.js';
    s.onload = draw; s.onerror = draw;
    document.head.appendChild(s);
  }

  /* ---------- 低血鈉治療 ---------- */
  function renderHypoNaTx() {
    const draw = () => {
      const H = window.HypoNaTxData;
      root.innerHTML = '';
      root.appendChild(backRowTo('← 臨床幫手', renderHelper));
      if (!H) {
        const e = document.createElement('div');
        e.className = 'work-card';
        e.innerHTML = '<div class="empty-hint">無法載入資料</div>';
        root.appendChild(e); return;
      }
      const add = (html) => {
        const d = document.createElement('div');
        d.className = 'work-card';
        d.innerHTML = html;
        root.appendChild(d);
      };

      add(`<h2>🧂 ${H.title}</h2><div class="dx-subtitle">${H.subtitle}</div>
        <div class="mala-label">症狀嚴重度分級</div>
        <div class="mala-table-wrap"><table class="mala-table sev-table">
          <thead><tr>${H.severity.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${H.severity.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>
        <div class="mala-note">${H.severityNote}</div>`);

      add(`<h2>🚦 治療原則(依症狀)</h2>` +
        H.algorithm.map((a) => `<div class="tx-block tx-${a.tone}">
          <div class="tx-level">${a.level}</div>
          <div class="tx-sx">${a.sx}</div>
          <ul class="mala-list">${a.plan.map((p) => p.startsWith('> ')
            ? `<li class="sub">${p.slice(2)}</li>` : `<li>${p}</li>`).join('')}</ul>
        </div>`).join(''));

      add(`<h2>📏 矯正速率:目標與上限</h2>
        <ul class="mala-list strong">${H.correction.limits.map((s) => `<li>${s}</li>`).join('')}</ul>
        <div class="mala-label">ODS(滲透性脫髓鞘)高風險因子</div>
        <ul class="mala-list">${H.correction.odsRisk.map((s) => `<li>${s}</li>`).join('')}</ul>
        <div class="mala-label">血鈉監測頻率</div>
        <ul class="mala-list">${H.correction.monitor.map((s) => `<li>${s}</li>`).join('')}</ul>`);

      add(`<h2>💊 治療方式比較</h2>
        <div class="mala-table-wrap"><table class="mala-table di-table">
          <thead><tr>${H.table.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${H.table.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>
        <div class="mala-note">表格可左右滑動查看</div>`);

      add(`<h2>🚰 限水的執行與失敗預測</h2>
        <div class="mala-label">執行原則</div>
        <ul class="mala-list">${H.restriction.rules.map((s) => `<li>${s}</li>`).join('')}</ul>
        <div class="mala-label">預測限水會失敗的因子</div>
        <ul class="mala-list">${H.restriction.failure.map((s) => `<li>${s}</li>`).join('')}</ul>
        <div class="mala-note">住院的症狀性低血鈉病人若具備上述任一項,限水就不適合當作起始治療。</div>`);

      add(`<h2>💡 臨床要點</h2>
        <ul class="mala-list">${H.pearls.map((s) => `<li>${s}</li>`).join('')}</ul>`);
      window.scrollTo(0, 0);
    };
    if (window.HypoNaTxData) return draw();
    const s = document.createElement('script');
    s.src = 'js/hyponatx-data.js';
    s.onload = draw; s.onerror = draw;
    document.head.appendChild(s);
  }

  /* ---------- 尿崩症(DI)治療 ---------- */
  function renderDI() {
    const draw = () => {
      const D = window.DiData;
      root.innerHTML = '';
      root.appendChild(backRowTo('← 臨床幫手', renderHelper));
      if (!D) {
        const e = document.createElement('div');
        e.className = 'work-card';
        e.innerHTML = '<div class="empty-hint">無法載入 DI 資料</div>';
        root.appendChild(e);
        return;
      }

      const head = document.createElement('div');
      head.className = 'work-card';
      head.innerHTML = `
        <h2>💧 ${D.title}</h2>
        <div class="dx-subtitle">${D.subtitle}</div>
        <ul class="mala-list">${D.goals.map((s) => `<li>${s}</li>`).join('')}</ul>`;
      root.appendChild(head);

      /* 水分缺乏量 + 計算器 */
      const saved = ls.get('diInputs', {});
      const def = document.createElement('div');
      def.className = 'work-card';
      def.innerHTML = `
        <h2>💦 水分缺乏量與矯正速率</h2>
        <div class="di-formula">${D.deficit.formula}</div>
        <div class="mala-note">前提假設:${D.deficit.assumptions.join('、')}</div>
        <div class="field" style="margin-top:14px">
          <label for="di-bw">病前體重 (kg)</label>
          <input id="di-bw" type="number" inputmode="decimal" value="${saved.bw ?? ''}" placeholder="例:70">
        </div>
        <div class="field">
          <label for="di-na">目前血鈉 (mEq/L)</label>
          <input id="di-na" type="number" inputmode="decimal" value="${saved.na ?? ''}" placeholder="例:160">
        </div>
        <button id="di-calc" class="btn-primary">計算水分缺乏量</button>
        <div id="di-out"></div>
        <div class="mala-label">矯正原則</div>
        <ul class="mala-list">${D.deficit.rules.map((s) => `<li>${s}</li>`).join('')}</ul>
        <div class="mala-note">${D.deficit.example}</div>`;
      root.appendChild(def);

      def.querySelector('#di-calc').addEventListener('click', () => {
        const bw = parseFloat(def.querySelector('#di-bw').value);
        const na = parseFloat(def.querySelector('#di-na').value);
        const out = def.querySelector('#di-out');
        if (Number.isNaN(bw) || Number.isNaN(na) || bw <= 0 || na <= 0) {
          out.innerHTML = '<div class="ff-result warn"><div class="ff-note">請填寫病前體重與目前血鈉</div></div>';
          return;
        }
        if (na <= 140) {
          out.innerHTML = '<div class="ff-result warn"><div class="ff-note">血鈉 ≤ 140,無自由水缺乏(此公式不適用)</div></div>';
          return;
        }
        ls.set('diInputs', { bw, na });
        const deficit = 0.6 * bw * (1 - 140 / na);
        const rate = deficit * 1000 / 24;
        const posm = 2 * na;
        out.innerHTML = `<div class="ff-result" style="text-align:left">
          <div class="pl-line"><span class="pl-label">水分缺乏量</span><span class="pl-val">${deficit.toFixed(2)} L</span></div>
          <div class="pl-line"><span class="pl-label">24 小時補完既有缺乏所需速率</span><span class="pl-val">≈ ${Math.round(rate)} mL/h</span></div>
          <div class="ff-note" style="margin-top:8px">
            估計血漿滲透壓 ≈ ${posm} mOsm/kg(2 × 血鈉,無高血糖時)<br>
            首日目標:降至 320–330 mOsm/kg 或降幅約 50%;其餘於 24–72 小時緩降。<br>
            ⚠️ 以上<b>未含持續流失</b>,須另外補足並頻繁追蹤電解質。
          </div>
        </div>`;
      });

      /* 藥物比較表 */
      const tb = document.createElement('div');
      tb.className = 'work-card';
      tb.innerHTML = `
        <h2>💊 治療藥物比較</h2>
        <div class="mala-table-wrap">
          <table class="mala-table di-table">
            <thead><tr>${D.table.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${D.table.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
        <div class="mala-note">表格可左右滑動查看</div>`;
      root.appendChild(tb);

      /* Desmopressin 低血鈉警示 */
      const hn = document.createElement('div');
      hn.className = 'work-card';
      hn.innerHTML = `
        <h2>⚠️ 低血鈉 — desmopressin 主要併發症</h2>
        <div class="di-alert">${D.hypoNa.stats}</div>
        <ul class="mala-list">${D.hypoNa.items.map((s) => `<li>${s}</li>`).join('')}</ul>`;
      root.appendChild(hn);

      /* 依 DI 型態的處置(可展開) */
      const bt = document.createElement('div');
      bt.className = 'work-card';
      bt.innerHTML = `<h2>🧭 依 DI 型態的處置</h2>
        <div class="mala-note" style="margin:-4px 0 10px">點標題展開內容</div>` +
        D.types.map((g) => `<details class="di-acc">
          <summary>${g.name}</summary>
          <ul class="mala-list">${g.items.map((s) => `<li>${s}</li>`).join('')}</ul>
        </details>`).join('');
      root.appendChild(bt);

      const pe = document.createElement('div');
      pe.className = 'work-card';
      pe.innerHTML = `<h2>💡 臨床要點</h2>
        <ul class="mala-list">${D.pearls.map((s) => `<li>${s}</li>`).join('')}</ul>`;
      root.appendChild(pe);
      window.scrollTo(0, 0);
    };

    if (window.DiData) return draw();
    const s = document.createElement('script');
    s.src = 'js/di-data.js';
    s.onload = draw; s.onerror = draw;
    document.head.appendChild(s);
  }

  /* ---------- MALA 重點整理 ---------- */
  function renderMala() {
    const draw = () => {
      const M = window.MalaData;
      root.innerHTML = '';
      root.appendChild(backRowTo('← 臨床幫手', renderHelper));
      if (!M) {
        const e = document.createElement('div');
        e.className = 'work-card';
        e.innerHTML = '<div class="empty-hint">無法載入 MALA 資料</div>';
        root.appendChild(e);
        return;
      }

      const card = document.createElement('div');
      card.className = 'work-card';
      card.innerHTML = `
        <h2>💊 ${M.title}</h2>
        <div class="dx-subtitle">${M.subtitle}</div>
        <ul class="mala-list">${M.intro.map((s) => `<li>${s}</li>`).join('')}</ul>`;
      root.appendChild(card);

      const ind = document.createElement('div');
      ind.className = 'work-card';
      ind.innerHTML = `
        <h2>⚡ RRT 啟動指徵</h2>
        <div class="mala-label">絕對適應症 — 符合任一項即建議啟動</div>
        <ul class="mala-list strong">${M.indications.absolute.map((s) => `<li>${s}</li>`).join('')}</ul>
        <div class="mala-label">合併下列情況可放寬門檻、提早啟動</div>
        <ul class="mala-list">${M.indications.relative.map((s) => `<li>${s}</li>`).join('')}</ul>`;
      root.appendChild(ind);

      const stop = document.createElement('div');
      stop.className = 'work-card';
      stop.innerHTML = `
        <h2>🛑 脫離(終止)標準</h2>
        <ul class="mala-list strong">${M.stopping.map((s) => `<li>${s}</li>`).join('')}</ul>
        <div class="mala-note">${M.stoppingNote}</div>`;
      root.appendChild(stop);

      const tb = document.createElement('div');
      tb.className = 'work-card';
      tb.innerHTML = `
        <h2>📊 RRT 模式比較</h2>
        <div class="mala-table-wrap">
          <table class="mala-table">
            <thead><tr>${M.table.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${M.table.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
        <div class="mala-note">表格可左右滑動查看</div>`;
      root.appendChild(tb);

      const pearls = document.createElement('div');
      pearls.className = 'work-card';
      pearls.innerHTML = `
        <h2>💡 處方與臨床要點</h2>
        <ul class="mala-list">${M.pearls.map((s) => `<li>${s}</li>`).join('')}</ul>`;
      root.appendChild(pearls);
      window.scrollTo(0, 0);
    };

    if (window.MalaData) return draw();
    const s = document.createElement('script');
    s.src = 'js/mala-data.js';
    s.onload = draw;
    s.onerror = draw;
    document.head.appendChild(s);
  }

  /* ---------- 24hr Creatinine Clearance ---------- */
  function renderCrCl() {
    const saved = ls.get('crclInputs', {});
    root.innerHTML = '';
    root.appendChild(backRowTo('← 臨床幫手', renderHelper));

    const card = document.createElement('div');
    card.className = 'work-card';
    card.innerHTML = `
      <h2>🧪 24hr Creatinine Clearance</h2>
      <div class="field">
        <label for="cc-ucr">Urine creatinine (mg/dL)</label>
        <input id="cc-ucr" type="number" inputmode="decimal" value="${saved.ucr ?? ''}" placeholder="例:60">
      </div>
      <div class="field">
        <label for="cc-vol">24hr urine volume (mL)</label>
        <input id="cc-vol" type="number" inputmode="decimal" value="${saved.vol ?? ''}" placeholder="例:1500">
      </div>
      <div class="field">
        <label for="cc-scr">Serum creatinine (mg/dL)</label>
        <input id="cc-scr" type="number" inputmode="decimal" step="0.01" value="${saved.scr ?? ''}" placeholder="例:1.2">
      </div>
      <div class="section-label">BSA 校正(選填)</div>
      <div class="field">
        <label for="cc-ht">Height (cm)</label>
        <input id="cc-ht" type="number" inputmode="decimal" value="${saved.ht ?? ''}" placeholder="例:165">
      </div>
      <div class="field">
        <label for="cc-bw">Body weight (kg)</label>
        <input id="cc-bw" type="number" inputmode="decimal" value="${saved.bw ?? ''}" placeholder="例:60">
      </div>
      <button id="cc-calc" class="btn-primary">Calculate CrCl</button>
      <div id="cc-out"></div>
      <div class="formula-hint">
        CrCl (mL/min) = U<sub>Cr</sub> × V ÷ (S<sub>Cr</sub> × 1440)<br>
        BSA (DuBois) = 0.007184 × Ht<sup>0.725</sup> × Wt<sup>0.425</sup>;校正值 = CrCl × 1.73 ÷ BSA<br>
        24 小時尿量與尿肌酸酐須為同一次完整收集。
      </div>`;
    root.appendChild(card);

    card.querySelector('#cc-calc').addEventListener('click', () => {
      const v = (id) => parseFloat(card.querySelector('#' + id).value);
      const ucr = v('cc-ucr'), vol = v('cc-vol'), scr = v('cc-scr');
      const ht = v('cc-ht'), bw = v('cc-bw');
      const out = card.querySelector('#cc-out');

      if ([ucr, vol, scr].some((n) => Number.isNaN(n))) {
        out.innerHTML = '<div class="ff-result warn"><div class="ff-note">請填寫 Urine creatinine、24hr urine volume 與 Serum creatinine</div></div>';
        return;
      }
      if (scr <= 0 || ucr <= 0 || vol <= 0) {
        out.innerHTML = '<div class="ff-result warn"><div class="ff-note">數值需大於 0</div></div>';
        return;
      }
      ls.set('crclInputs', { ucr, vol, scr, ht: card.querySelector('#cc-ht').value, bw: card.querySelector('#cc-bw').value });

      const crcl = (ucr * vol) / (scr * 1440);
      let html = `<div class="ff-result" style="text-align:left">
        <div class="pl-line"><span class="pl-label">Creatinine clearance</span><span class="pl-val">${crcl.toFixed(1)} mL/min</span></div>`;

      if (!Number.isNaN(ht) && !Number.isNaN(bw) && ht > 0 && bw > 0) {
        const bsa = 0.007184 * Math.pow(ht, 0.725) * Math.pow(bw, 0.425);
        const norm = crcl * 1.73 / bsa;
        html += `<div class="pl-line"><span class="pl-label">BSA-corrected (/1.73 m²)</span><span class="pl-val">${norm.toFixed(1)} mL/min/1.73m²</span></div>
          <div class="ff-note" style="margin-top:8px">BSA = ${bsa.toFixed(2)} m²</div>`;
      }

      /* 收集完整性參考:24hr 尿肌酸酐排泄量 */
      const excr = ucr * vol / 100; // mg/day
      html += `<div class="ff-note" style="margin-top:8px">
        24hr urine creatinine excretion = ${Math.round(excr)} mg/day${(!Number.isNaN(bw) && bw > 0) ? ` (${(excr / bw).toFixed(1)} mg/kg/day)` : ''}<br>
        參考值:男 20–25、女 15–20 mg/kg/day;偏離過多提示收集不完整。
      </div></div>`;
      out.innerHTML = html;
    });
  }

  /* ---------- Ideal / Adjusted Body Weight ---------- */
  function renderIBW() {
    const saved = ls.get('ibwInputs', {});
    const sex = saved.sex || 'M';
    root.innerHTML = '';
    root.appendChild(backRowTo('← 臨床幫手', renderHelper));

    const card = document.createElement('div');
    card.className = 'work-card';
    card.innerHTML = `
      <h2>⚖️ Ideal / Adjusted Body Weight</h2>
      <div class="field">
        <label>Sex</label>
        <div class="segmented" id="ib-sex">
          <button data-s="M" class="${sex === 'M' ? 'active' : ''}">M</button>
          <button data-s="F" class="${sex === 'F' ? 'active' : ''}">F</button>
        </div>
      </div>
      <div class="field">
        <label for="ib-ht">Height (cm)</label>
        <input id="ib-ht" type="number" inputmode="decimal" value="${saved.ht ?? ''}" placeholder="例:165">
      </div>
      <div class="field">
        <label for="ib-bw">Actual body weight (kg)</label>
        <input id="ib-bw" type="number" inputmode="decimal" value="${saved.bw ?? ''}" placeholder="例:80">
      </div>
      <button id="ib-calc" class="btn-primary">Calculate</button>
      <div id="ib-out"></div>
      <div class="formula-hint">
        IBW (Devine):男 50 + 2.3 × (身高吋 − 60);女 45.5 + 2.3 × (身高吋 − 60)<br>
        AdjBW = IBW + 0.4 × (實際體重 − IBW)<br>
        一般在實際體重 > 120–130% IBW(肥胖)時,藥物劑量才改用 AdjBW。
      </div>`;
    root.appendChild(card);

    let curSex = sex;
    card.querySelectorAll('#ib-sex button').forEach((b) =>
      b.addEventListener('click', () => {
        curSex = b.dataset.s;
        card.querySelectorAll('#ib-sex button').forEach((x) => x.classList.toggle('active', x === b));
      }));

    card.querySelector('#ib-calc').addEventListener('click', () => {
      const ht = parseFloat(card.querySelector('#ib-ht').value);
      const bw = parseFloat(card.querySelector('#ib-bw').value);
      const out = card.querySelector('#ib-out');
      if (Number.isNaN(ht) || ht <= 0) {
        out.innerHTML = '<div class="ff-result warn"><div class="ff-note">請填寫 Height</div></div>';
        return;
      }
      ls.set('ibwInputs', { sex: curSex, ht, bw: card.querySelector('#ib-bw').value });

      const inches = ht / 2.54;
      const base = curSex === 'F' ? 45.5 : 50;
      const ibw = base + 2.3 * (inches - 60);
      let html = `<div class="ff-result" style="text-align:left">
        <div class="pl-line"><span class="pl-label">Ideal body weight (IBW)</span><span class="pl-val">${ibw.toFixed(1)} kg</span></div>`;

      if (!Number.isNaN(bw) && bw > 0) {
        const adj = ibw + 0.4 * (bw - ibw);
        const pct = bw / ibw * 100;
        const bmi = bw / Math.pow(ht / 100, 2);
        html += `<div class="pl-line"><span class="pl-label">Adjusted body weight (AdjBW)</span><span class="pl-val">${adj.toFixed(1)} kg</span></div>
          <div class="ff-note" style="margin-top:8px">
            實際體重為 IBW 的 ${pct.toFixed(0)}%・BMI ${bmi.toFixed(1)} kg/m²<br>
            ${pct > 120 ? '⚠️ > 120% IBW,藥物劑量多建議採用 AdjBW' : '✓ ≤ 120% IBW,一般可直接使用實際體重或 IBW'}
          </div>`;
      } else {
        html += `<div class="ff-note" style="margin-top:8px">填入實際體重可一併計算 AdjBW 與 BMI</div>`;
      }
      html += `<div class="ff-note" style="margin-top:6px">身高 ${ht} cm = ${inches.toFixed(1)} inches</div></div>`;
      out.innerHTML = html;
    });
  }

  /* ---------- Plasma 計算器(子選單) ---------- */
  function renderPlasmaMenu() {
    root.innerHTML = '';
    root.appendChild(backRowTo('← 臨床幫手', renderHelper));
    const grid = document.createElement('div');
    grid.className = 'tile-grid';
    grid.innerHTML = `
      <div class="tile square" id="p-pe">
        <h3>Plasma Exchange</h3>
        <div class="tile-icon">💉</div>
        <div class="tile-sub">Volume + FFP (U)</div>
      </div>
      <div class="tile square" id="p-dfpp">
        <h3>DFPP</h3>
        <div class="tile-icon">💉</div>
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
          if (node.link) {
            html += `<div class="dx-link-card" id="dx-link">
              <div class="dx-link-title">📘 ${esc(node.link.label)}</div>
              <div class="dx-link-sub">${esc(node.link.sub)}</div>
              <span class="dx-link-arrow">›</span>
            </div>`;
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
        const lk = card.querySelector('#dx-link');
        if (lk) lk.addEventListener('click', () => renderSiadh(() => { draw(); }));
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
        zoneTomorrow = false;
        if (subview === 'schedule') renderSchedule();
        else if (subview === 'crrt') renderCRRT();
        else if (subview === 'directory') renderDirectory();
        else renderMenu();
      });
    }
  };
})();
