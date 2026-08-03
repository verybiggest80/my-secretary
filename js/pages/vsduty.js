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

      /* 復大查房 */
      const mine = ((V.rounds && V.rounds[d]) || []).filter((r) => hit(name, r.doctor));
      html += mine.length
        ? card('🏥', '復大查房',
            mine.map((r) => `您${word}要查<b>${esc(r.shift)}班</b>的〈${esc(r.region)}〉喔! 辛苦了!`).join('<br>'), true)
        : card('🏥', '復大查房', `您${word}不用查復大，去休息吧!`, false);
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
