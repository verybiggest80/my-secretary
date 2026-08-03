import { JSDOM } from 'jsdom';
import fs from 'fs';
const html = fs.readFileSync('index.html','utf8').replace(/<script[^>]*><\/script>/g,'');
async function boot(y,m,d,real) {
  const dom = new JSDOM(html, { url:'http://localhost/', runScripts:'dangerously' });
  const { window } = dom;
  window.eval(`const RD=Date; const F=new RD(${y},${m},${d},10,0).getTime();
    Date=class extends RD{constructor(...a){a.length?super(...a):super(F);} static now(){return F;}};`);
  window.eval(`window.indexedDB={open(){const r={};setTimeout(()=>{r.result={objectStoreNames:{contains:()=>true},transaction:()=>({objectStore:()=>({getAll(){const q={};setTimeout(()=>{q.result=[];q.onsuccess&&q.onsuccess();},0);return q;}}),set oncomplete(f){},set onerror(f){}})};r.onsuccess&&r.onsuccess();},0);return r;}};`);
  window.eval(fs.readFileSync('js/store.js','utf8'));
  window.eval(`window.Store.ls.set('realName',${JSON.stringify(real)});window.Store.ls.set('userName','Dr');window.Store.ls.set('role','vs');`);
  window.eval('window.Pages={};');
  window.eval(fs.readFileSync('js/schedule-data.js','utf8'));
  for (const f of ['js/pages/home.js','js/pages/todo.js','js/pages/work.js','js/pages/vsduty.js'])
    window.eval(fs.readFileSync(f,'utf8'));
  window.eval(fs.readFileSync('js/app.js','utf8'));
  await new Promise(r=>setTimeout(r,250));
  window.document.querySelector('[data-page="vsduty"]').click();
  await new Promise(r=>setTimeout(r,250));
  return window;
}
const msg=(w)=>[...w.document.querySelectorAll('.vs-card')].map(c=>c.querySelector('h2').textContent.trim()+' → '+c.querySelector('.vs-msg').textContent.trim());
console.log('=== 規則1:跨區合併(王麒翔 8/3 C班) ===');
let w = await boot(2026,7,3,'王麒翔');
msg(w).forEach(m=>console.log('  '+m));
console.log('\n=== 規則2:F=Fellow代查(李文欽 8/3 A班為 F3) ===');
w = await boot(2026,7,3,'李文欽');
msg(w).forEach(m=>console.log('  '+m));
console.log('  日曆 8/3 標記:', [...w.document.querySelectorAll('.cal-cell:not(.cal-empty)')][2].textContent.trim());
console.log('\n=== 對照:李文欽 8/10(F10 亦為代查) vs 8/13(無F) ===');
for (const d of [10,13,20]) {
  const ww = await boot(2026,7,d,'李文欽');
  console.log(`  8/${d}:`, ww.document.querySelectorAll('.vs-card')[2].querySelector('.vs-msg').textContent.trim());
}
console.log('\n=== 李文欽 8月日曆(排除F後) ===');
w = await boot(2026,7,3,'李文欽');
[...w.document.querySelectorAll('.cal-cell:not(.cal-empty)')].forEach(c=>{
  const t=[...c.querySelectorAll('.cal-tags i')].map(i=>i.textContent).join('、');
  if(t) console.log(`  8/${c.querySelector('.cal-d').textContent}: ${t}`);
});
process.exit(0);
