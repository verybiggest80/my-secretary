window.Pages.work = (function () {
  const ls = window.Store.ls;
  const fileStore = window.Store.fileStore;

  let root;

  function renderMenu() {
    root.innerHTML = `
      <div class="tile-grid">
        <div class="tile square" id="w-schedule">
          <h3>📅 班表</h3>
          <div class="tile-icon" style="font-size:2.2rem">📅</div>
          <div class="tile-sub">每月上傳最新班表</div>
        </div>
        <div class="tile square" id="w-crrt">
          <h3>🧮 CRRT</h3>
          <div class="tile-icon" style="font-size:2.2rem">🧮</div>
          <div class="tile-sub">Filtration Fraction 計算</div>
        </div>
      </div>`;
    root.querySelector('#w-schedule').addEventListener('click', renderSchedule);
    root.querySelector('#w-crrt').addEventListener('click', renderCRRT);
  }

  function backRow(label = '← Work') {
    const div = document.createElement('div');
    div.className = 'back-row';
    div.innerHTML = `<button class="back-btn">${label}</button>`;
    div.querySelector('button').addEventListener('click', renderMenu);
    return div;
  }

  async function renderSchedule() {
    root.innerHTML = '';
    root.appendChild(backRow());

    const card = document.createElement('div');
    card.className = 'work-card';
    card.innerHTML = `<h2>📅 班表</h2><div id="sch-body">載入中…</div>
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
            <div class="fname">${latest.name}</div>
            <div class="fdate">上傳於 ${new Date(latest.date).toLocaleDateString('zh-TW')}</div>
          </div>
          <button class="h-open" data-id="${latest.id}" style="border:none;background:var(--accent);color:#fff;padding:8px 14px;border-radius:10px;font-weight:600">開啟</button>
        </div>
        ${files.length > 1 ? `
          <div class="section-label">歷史班表</div>
          <ul class="history-list">
            ${files.slice(1).map((f) => `
              <li>
                <span class="h-name">${f.name}<br><small style="color:var(--text-2)">${new Date(f.date).toLocaleDateString('zh-TW')}</small></span>
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
      if (subview === 'schedule') renderSchedule();
      else if (subview === 'crrt') renderCRRT();
      else renderMenu();
    }
  };
})();
