window.Pages.home = (function () {
  const ls = window.Store.ls;

  const DEFAULT_TILES = [
    { id: 'date', size: 'bar' },
    { id: 'todo', size: 'bar' },
    { id: 'schedule', size: 'square' },
    { id: 'crrt', size: 'square' }
  ];

  let root, nav, headerBtn;
  let editing = false;

  function tiles() { return ls.get('tiles', DEFAULT_TILES); }
  function saveTiles(t) { ls.set('tiles', t); }

  function esc(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  const RENDERERS = {
    date() {
      const now = new Date();
      const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
      return {
        title: '今天',
        body: `<div class="tile-big">${now.getMonth() + 1}/${now.getDate()}</div>
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
    schedule() {
      return {
        title: '📅 班表',
        body: `<div class="tile-icon" style="font-size:2.2rem">📅</div>
               <div class="tile-sub">查看/上傳本月班表</div>`,
        onTap: () => nav('work', 'schedule')
      };
    },
    crrt() {
      return {
        title: '🧮 CRRT',
        body: `<div class="tile-icon" style="font-size:2.2rem">🧮</div>
               <div class="tile-sub">Filtration Fraction 計算器</div>`,
        onTap: () => nav('work', 'crrt')
      };
    }
  };

  function render() {
    const t = tiles();
    root.innerHTML = `<div class="tile-grid ${editing ? 'editing' : ''}"></div>`;
    const grid = root.firstElementChild;

    t.forEach((cfg, idx) => {
      const r = RENDERERS[cfg.id];
      if (!r) return;
      const { title, body, onTap } = r();
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
  }

  function init(el, ctx) {
    root = el;
    nav = ctx.navigate;
    headerBtn = ctx.headerBtn;
  }

  function show() {
    editing = false;
    headerBtn.textContent = '編輯';
    headerBtn.classList.remove('hidden');
    headerBtn.onclick = () => {
      editing = !editing;
      headerBtn.textContent = editing ? '完成' : '編輯';
      render();
    };
    render();
  }

  return { init, show };
})();
