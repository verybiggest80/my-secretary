/* vsduty.js — 主治醫師版:當日腎超 / 健診 / 復大查房 */
window.Pages.vsduty = (function () {
  const ls = window.Store.ls;
  let root, titleEl;
  let showTomorrow = false;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function ymOf(dt) { return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0'); }
  function monthData(dt) {
    const SD = window.ScheduleData;
    if (!SD || !SD.months) return null;
    return SD.months[ymOf(dt)] || null;
  }
  function ensureData(cb) {
    if (window.ScheduleData) return cb();
    const s = document.createElement('script');
    s.src = 'js/schedule-data.js';
    s.onload = cb; s.onerror = cb;
    document.head.appendChild(s);
  }
  /* 姓名比對:設定的真實姓名與班表名字互為包含即算命中 */
  const hit = (a, b) => !!a && !!b && (a.includes(b) || b.includes(a));

  /* 區域字串:原表格換行處會缺逗號(A1,A2,A8B1,B2,B3)→ 補成 A1,A2,A8,B1,B2,B3 */
  const fixRegion = (s) => String(s).replace(/(\d)([A-Za-z])/g, '$1,$2');

  /* 當日查房:排除 Fellow 代查(f),同班別的多個區域併為一筆 */
  function myRounds(name, V, d) {
    const list = ((V.rounds && V.rounds[d]) || []).filter((r) => !r.f && hit(name, r.doctor));
    const byShift = [];
    list.forEach((r) => {
      const g = byShift.find((x) => x.shift === r.shift);
      /* region 內若含「〉和〈」代表原表格為跨區合併儲存格 */
      const regs = String(r.region).split('〉和〈').map(fixRegion);
      if (g) regs.forEach((x) => { if (!g.regions.includes(x)) g.regions.push(x); });
      else byShift.push({ shift: r.shift, regions: regs });
    });
    return byShift;
  }

  /* 當月日曆:日期下方以「超/健/復」標示個人業務 */
  function calendar(name, target, V) {
    const y = target.getFullYear(), m = target.getMonth();
    const todayD = new Date();
    const isThisMonth = todayD.getFullYear() === y && todayD.getMonth() === m;
    const days = new Date(y, m + 1, 0).getDate();
    const lead = new Date(y, m, 1).getDay();          // 0=週日
    const WK = ['日', '一', '二', '三', '四', '五', '六'];

    let cells = WK.map((w, i) =>
      `<div class="cal-head${i === 0 || i === 6 ? ' cal-we' : ''}">${w}</div>`).join('');
    for (let i = 0; i < lead; i++) cells += '<div class="cal-cell cal-empty"></div>';

    for (let d = 1; d <= days; d++) {
      const tags = [];
      if (hit(name, V.echoAM && V.echoAM[d]) || hit(name, V.echoPM && V.echoPM[d])) tags.push('<i class="t-echo">超</i>');
      if (hit(name, V.health && V.health[d])) tags.push('<i class="t-health">健</i>');
      if (myRounds(name, V, d).length) tags.push('<i class="t-round">復</i>');
      const dow = new Date(y, m, d).getDay();
      const cls = [
        'cal-cell',
        (dow === 0 || dow === 6) ? 'cal-we' : '',
        (isThisMonth && d === todayD.getDate()) ? 'cal-today' : '',
        tags.length ? 'cal-has' : ''
      ].filter(Boolean).join(' ');
      cells += `<div class="${cls}"><span class="cal-d">${d}</span><span class="cal-tags">${tags.join('')}</span></div>`;
    }

    return `<div class="work-card">
      <h2>🗓 ${m + 1} 月班表一覽</h2>
      <div class="cal-legend"><i class="t-echo">超</i>腎超　<i class="t-health">健</i>健診　<i class="t-round">復</i>復大查房</div>
      <div class="cal-grid">${cells}</div>
    </div>`;
  }

  function card(icon, title, msg, ok) {
    return `<div class="work-card vs-card">
      <h2>${icon} ${title}</h2>
      <div class="vs-msg ${ok ? 'vs-on' : 'vs-off'}">${msg}</div>
    </div>`;
  }

  function render() {
    const name = (ls.get('realName', '') || ls.get('userName', '') || '').trim();
    const target = new Date();
    if (showTomorrow) target.setDate(target.getDate() + 1);
    const word = showTomorrow ? '明天' : '今天';
    const md = monthData(target);

    let html = `<div class="vs-datebar">
        <span>${target.getMonth() + 1}月${target.getDate()}日${showTomorrow ? '(明天)' : '(今天)'}</span>
        <button id="vs-toggle" class="cover-btn" style="margin:0">${showTomorrow ? '回到今天' : '看看明天'}</button>
      </div>`;

    if (!name) {
      html += `<div class="work-card"><div class="empty-hint">請先到首頁右上角齒輪設置<b>真實姓名</b>,才能查詢您的班別</div></div>`;
    } else if (!md || !md.vsDuty) {
      html += `<div class="work-card"><div class="empty-hint">${ymOf(target)} 班表尚未更新</div></div>`;
    } else {
      const V = md.vsDuty;
      const d = target.getDate();

      /* 腎超:AM / PM */
      const slots = [];
      if (hit(name, V.echoAM && V.echoAM[d])) slots.push('AM');
      if (hit(name, V.echoPM && V.echoPM[d])) slots.push('PM');
      html += slots.length
        ? card('🔬', '腎超', `您${word}<b>${slots.join(' 與 ')}</b>要做腎超喔! 辛苦了!`, true)
        : card('🔬', '腎超', `您${word}不用作腎超，去喝杯咖啡吧!`, false);

      /* 健診 */
      html += hit(name, V.health && V.health[d])
        ? card('🩺', '健診', `您${word}要做健診喔! 辛苦了!`, true)
        : card('🩺', '健診', `您${word}不用作健診，太棒了!`, false);

      /* 復大查房:F 開頭日期由 Fellow 代查,不列入 */
      const mine = myRounds(name, V, d);
      html += mine.length
        ? card('🏥', '復大查房',
            mine.map((r) => `您${word}要查<b>${esc(r.shift)}班</b>的〈${r.regions.map(esc).join('〉和〈')}〉喔! 辛苦了!`).join('<br>'), true)
        : card('🏥', '復大查房', `您${word}不用查復大，去休息吧!`, false);

      html += calendar(name, target, V);
    }

    root.innerHTML = html;
    const tg = root.querySelector('#vs-toggle');
    if (tg) tg.addEventListener('click', () => { showTomorrow = !showTomorrow; render(); });
    window.scrollTo(0, 0);
  }

  return {
    init(el, ctx) { root = el; titleEl = ctx.titleEl; },
    show() { showTomorrow = false; ensureData(render); }
  };
})();
