/* todo.js — 待辦事項:新增(文字/語音)、打勾完成、篩選(未完成/全部) */
window.Pages.todo = (function () {
  const ls = window.Store.ls;
  const files = window.Store.fileStore;

  let root;
  let filter = ls.get('todoFilter', 'open'); // 'open' | 'all'

  /* 錄音/播放狀態 */
  const canRec = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  let recorder = null, chunks = [], recStart = 0, timerInt = null;
  let player = null, playingId = null;

  function todos() { return ls.get('todos', []); }
  function save(t) { ls.set('todos', t); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function fmt(sec) {
    sec = Math.max(0, Math.floor(sec));
    return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
  }

  /* ---------- 錄音 ---------- */
  async function startRec() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      chunks = [];
      recorder.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/mp4' });
        const dur = Math.round((Date.now() - recStart) / 1000);
        recorder = null;
        if (blob.size === 0 || dur < 1) { render(); return; } // 太短視為取消
        const input = root.querySelector('#todo-new');
        const text = input ? input.value.trim() : '';
        const audioId = await files.add({ category: 'todoAudio', name: 'voice-memo', type: blob.type, blob, date: Date.now() });
        const arr = todos();
        arr.unshift({ id: Date.now(), text: text || '語音提醒', done: false, audioId, audioDur: dur });
        save(arr);
        render();
      };
      recStart = Date.now();
      recorder.start();
      render();
      timerInt = setInterval(() => {
        const el = root.querySelector('#rec-time');
        if (el) el.textContent = fmt((Date.now() - recStart) / 1000);
      }, 500);
    } catch {
      recorder = null;
      alert('無法取得麥克風權限。請到 設定 > Safari(或此App) > 麥克風 允許存取後再試。');
      render();
    }
  }

  function stopRec() {
    clearInterval(timerInt);
    timerInt = null;
    if (recorder && recorder.state !== 'inactive') recorder.stop();
  }

  /* ---------- 播放 ---------- */
  function stopPlayback() {
    if (player) { player.pause(); player = null; }
    playingId = null;
    root.querySelectorAll('.todo-play.playing').forEach((b) => {
      b.textContent = '▶'; b.classList.remove('playing');
    });
  }

  async function togglePlay(item, btn) {
    if (playingId === item.id) { stopPlayback(); return; }
    stopPlayback();
    const rec = await files.get(item.audioId);
    if (!rec || !rec.blob) { btn.textContent = '✕'; return; }
    const url = URL.createObjectURL(rec.blob);
    player = new Audio(url);
    playingId = item.id;
    btn.textContent = '⏸';
    btn.classList.add('playing');
    player.onended = () => { stopPlayback(); URL.revokeObjectURL(url); };
    player.play().catch(() => stopPlayback());
  }

  /* ---------- 畫面 ---------- */
  function render() {
    const all = todos();
    const shown = filter === 'open' ? all.filter((t) => !t.done) : all;
    const recording = !!recorder;

    root.innerHTML = `
      <div class="todo-input-row">
        <input id="todo-new" type="text" placeholder="新增提醒事項…" enterkeyhint="done" ${recording ? 'disabled' : ''}>
        ${canRec ? `<button id="todo-mic" class="${recording ? 'recording' : ''}" aria-label="錄音">${recording ? '⏹' : '🎤'}</button>` : ''}
        <button id="todo-add" aria-label="新增" ${recording ? 'disabled' : ''}>＋</button>
      </div>
      ${recording ? `<div class="rec-banner">● 錄音中 <span id="rec-time">0:00</span>&nbsp;—&nbsp;按 ⏹ 結束並新增提醒</div>` : ''}
      <div class="segmented">
        <button data-f="open" class="${filter === 'open' ? 'active' : ''}">未完成</button>
        <button data-f="all" class="${filter === 'all' ? 'active' : ''}">全部</button>
      </div>
      <ul class="todo-list">
        ${shown.map((t) => `
          <li class="todo-item ${t.done ? 'done' : ''}" data-id="${t.id}">
            <button class="todo-check ${t.done ? 'done' : ''}" aria-label="完成">✓</button>
            <span class="todo-text">${esc(t.text)}${t.audioId ? ` <span class="audio-tag">🎤 ${fmt(t.audioDur || 0)}</span>` : ''}</span>
            ${t.audioId ? '<button class="todo-play" aria-label="播放語音">▶</button>' : ''}
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

    const mic = root.querySelector('#todo-mic');
    if (mic) mic.addEventListener('click', () => (recorder ? stopRec() : startRec()));

    root.querySelectorAll('.segmented button').forEach((b) =>
      b.addEventListener('click', () => {
        filter = b.dataset.f;
        ls.set('todoFilter', filter);
        render();
      }));

    root.querySelectorAll('.todo-item').forEach((li) => {
      const id = Number(li.dataset.id);
      const item = all.find((t) => t.id === id);
      li.querySelector('.todo-check').addEventListener('click', () => {
        const arr = todos();
        const it = arr.find((t) => t.id === id);
        if (it) it.done = !it.done;
        save(arr);
        render();
      });
      const play = li.querySelector('.todo-play');
      if (play) play.addEventListener('click', () => togglePlay(item, play));
      li.querySelector('.todo-del').addEventListener('click', () => {
        if (playingId === id) stopPlayback();
        if (item && item.audioId) files.remove(item.audioId).catch(() => {});
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
