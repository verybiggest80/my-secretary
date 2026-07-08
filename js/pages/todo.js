/* todo.js — 待辦事項:新增、打勾完成、篩選(未完成/全部) */
window.Pages.todo = (function () {
  const ls = window.Store.ls;

  let root;
  let filter = ls.get('todoFilter', 'open'); // 'open' | 'all'

  function todos() { return ls.get('todos', []); }
  function save(t) { ls.set('todos', t); }

  function esc(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function render() {
    const all = todos();
    const shown = filter === 'open' ? all.filter((t) => !t.done) : all;

    root.innerHTML = `
      <div class="todo-input-row">
        <input id="todo-new" type="text" placeholder="新增提醒事項…" enterkeyhint="done">
        <button id="todo-add" aria-label="新增">＋</button>
      </div>
      <div class="segmented">
        <button data-f="open" class="${filter === 'open' ? 'active' : ''}">未完成</button>
        <button data-f="all" class="${filter === 'all' ? 'active' : ''}">全部</button>
      </div>
      <ul class="todo-list">
        ${shown.map((t) => `
          <li class="todo-item ${t.done ? 'done' : ''}" data-id="${t.id}">
            <button class="todo-check ${t.done ? 'done' : ''}" aria-label="完成">✓</button>
            <span class="todo-text">${esc(t.text)}</span>
            <button class="todo-del" aria-label="刪除">✕</button>
          </li>`).join('')}
      </ul>
      ${shown.length === 0 ? `<div class="empty-hint">${filter === 'open' ? '沒有未完成的事項 🎉' : '還沒有任何事項,新增一筆吧'}</div>` : ''}
    `;

    const input = root.querySelector('#todo-new');
    const add = () => {
      const text = input.value.trim();
      if (!text) return;
      const arr = todos();
      arr.unshift({ id: Date.now(), text, done: false });
      save(arr);
      render();
      root.querySelector('#todo-new').focus();
    };
    root.querySelector('#todo-add').addEventListener('click', add);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') add(); });

    root.querySelectorAll('.segmented button').forEach((b) =>
      b.addEventListener('click', () => {
        filter = b.dataset.f;
        ls.set('todoFilter', filter);
        render();
      }));

    root.querySelectorAll('.todo-item').forEach((li) => {
      const id = Number(li.dataset.id);
      li.querySelector('.todo-check').addEventListener('click', () => {
        const arr = todos();
        const item = arr.find((t) => t.id === id);
        if (item) item.done = !item.done;
        save(arr);
        render();
      });
      li.querySelector('.todo-del').addEventListener('click', () => {
        save(todos().filter((t) => t.id !== id));
        render();
      });
    });
  }

  return {
    init(el) { root = el; },
    show() { render(); }
  };
})();
/* end */
