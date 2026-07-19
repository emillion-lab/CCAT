// CCAT v2 — логика: Тренировка / Изпит / Грешки (Leitner SR) / Статистика
const LS='ccat_v2';
let S={ans:{},exams:[]};
try{const s=localStorage.getItem(LS);if(s)S=JSON.parse(s)}catch(e){}
function save(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}
const TYPES={SIGNS:'🚦 Знаци',SPEED:'🏎️ Скорости',TIME:'🕐 Време',TACHO:'📟 Тахограф',DOCS:'📄 Документи',CARGO:'📦 Товар'};
let mode='handbook',trFilter='all',trIdx=0,trOrder=[],exam=null,mist=[],mistIdx=0;

function esc(s){return s.replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function byId(i){return QB.find(q=>q.id===i)}
function rec(id){return S.ans[id]||(S.ans[id]={ok:0,bad:0,box:0,due:0})}

function switchMode(m,btn){
  mode=m;
  document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  document.querySelectorAll('.content-section').forEach(s=>s.classList.remove('active'));
  document.getElementById(m+'-section').classList.add('active');
  if(m==='train'){buildOrder();renderTrain()}
  if(m==='exam')renderExamHome();
  if(m==='mist')renderMistHome();
  if(m==='stats')renderStats();
}

// ---------- ТРЕНИРОВКА ----------
function buildOrder(){
  trOrder=QB.filter(q=>trFilter==='all'||q.t===trFilter).map(q=>q.id);
  if(trIdx>=trOrder.length)trIdx=0;
}
function setFilter(f,btn){trFilter=f;trIdx=0;document.querySelectorAll('#train-filters .filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');buildOrder();renderTrain()}
function renderTrain(){
  const c=document.getElementById('train-box');
  if(!trOrder.length){c.innerHTML='<p>Няма въпроси.</p>';return}
  const q=byId(trOrder[trIdx]);
  c.innerHTML=qCard(q,'train');
  const done=trOrder.filter(id=>{const r=S.ans[id];return r&&(r.ok||r.bad)}).length;
  document.getElementById('train-prog').textContent=`${trIdx+1} / ${trOrder.length} · отговорени: ${done}`;
}
function qCard(q,ctx,locked){
  const r=S.ans[q.id];
  const answered=ctx==='train'&&r&&r.last!==undefined&&r.lastId===q.id;
  let a=q.a.map((t,i)=>{
    let cls='answer-btn';
    if(answered||locked){cls+=' disabled';if(i===q.c)cls+=' correct';else if(answered&&r.last===i)cls+=' wrong';if(locked&&locked.pick===i&&i!==q.c)cls+=' wrong'}
    return `<button class="${cls}" onclick="pick('${ctx}',${q.id},${i})" ${(answered||locked)?'disabled':''}>${String.fromCharCode(65+i)}. ${esc(t)}</button>`;
  }).join('');
  return `<div class="question-card"><div class="question-number">${TYPES[q.t]||''}</div>${q.img?`<div class="question-image">${q.img}</div>`:''}<div class="question-text">${esc(q.q)}</div><div class="answers">${a}</div><div class="explanation ${(answered||locked)?'show':''}">${esc(q.e)}</div></div>`;
}
function pick(ctx,id,i){
  const q=byId(id),ok=i===q.c;
  if(ctx==='train'){
    const r=rec(id);r.last=i;r.lastId=id;
    if(ok){r.ok++;r.box=Math.min(3,(r.box||0)+1);r.due=Date.now()+[0,864e5,3*864e5,7*864e5][r.box]}
    else{r.bad++;r.box=1;r.due=Date.now()}
    save();renderTrain();
  }else if(ctx==='exam'){examPick(id,i)}
  else if(ctx==='mist'){mistPick(id,i,ok)}
}
function trNav(d){trIdx=Math.max(0,Math.min(trOrder.length-1,trIdx+d));const q=byId(trOrder[trIdx]);const r=S.ans[q.id];if(r)delete r.last;renderTrain()}

// ---------- ИЗПИТ (реален формат ИААА кат. C: 30 въпроса, 30 мин, 66 т., праг 57 т.) ----------
const EXAM_N=30,EXAM_MIN=30,EXAM_MAXPTS=66,EXAM_PASSPTS=57;
function renderExamHome(){
  const h=S.exams.slice(-5).reverse().map(e=>`<tr><td>${new Date(e.d).toLocaleDateString('bg')}</td><td>${e.ok}/${e.n}</td><td>${e.pts!==undefined?e.pts+' т.':e.pct+'%'}</td><td>${(e.pts!==undefined?e.pts>=EXAM_PASSPTS:e.pct>=87)?'✅':'❌'}</td></tr>`).join('');
  document.getElementById('exam-box').innerHTML=`<div class="section"><h2>⏱️ Изпитен симулатор — реален формат</h2><p>Като на ИААА за категория C: <strong>30 въпроса · 30 минути · праг 57 от 66 точки</strong> (2 листа по 15). Без обяснения по време на изпита.</p><p style="color:#94a3b8;font-size:.9em;margin-top:8px">⚠️ На реалния изпит въпросите тежат 1/2/3 точки и някои имат по няколко верни отговора — тук всеки въпрос е с един верен отговор и точките се изчисляват пропорционално.</p><button class="restart-btn" onclick="startExam()">🚀 Започни изпит</button>${h?`<h2 style="margin-top:25px">Последни опити</h2><table class="table"><tr><th>Дата</th><th>Верни</th><th>Резултат</th><th></th></tr>${h}</table>`:''}</div>`;
}
function startExam(){
  const pool=[...QB].sort(()=>Math.random()-0.5).slice(0,EXAM_N);
  exam={qs:pool.map(q=>q.id),picks:{},i:0,end:Date.now()+EXAM_MIN*6e4};
  exam.timer=setInterval(examTick,1000);
  renderExamQ();
}
function examTick(){
  if(!exam)return;
  const left=exam.end-Date.now();
  if(left<=0){finishExam();return}
  const el=document.getElementById('exam-time');
  if(el){const m=Math.floor(left/6e4),s=Math.floor(left%6e4/1e3);el.textContent=`${m}:${s<10?'0':''}${s}`}
}
function renderExamQ(){
  const q=byId(exam.qs[exam.i]);
  const a=q.a.map((t,i)=>`<button class="answer-btn ${exam.picks[q.id]===i?'correct':''}" onclick="examPick(${q.id},${i})">${String.fromCharCode(65+i)}. ${esc(t)}</button>`).join('');
  document.getElementById('exam-box').innerHTML=`<div class="score-display">Въпрос ${exam.i+1}/${EXAM_N} · оставащо време: <strong id="exam-time">--:--</strong></div><div class="question-card">${q.img?`<div class="question-image">${q.img}</div>`:''}<div class="question-text">${esc(q.q)}</div><div class="answers">${a}</div></div><div class="nav-buttons"><button class="nav-btn btn-prev" onclick="examNav(-1)">⬅️</button><button class="nav-btn btn-next" onclick="${exam.i===EXAM_N-1?'finishExam()':'examNav(1)'}">${exam.i===EXAM_N-1?'✅ Предай':'➡️'}</button></div>`;
  examTick();
}
function examPick(id,i){exam.picks[id]=i;if(exam.i<EXAM_N-1){exam.i++;renderExamQ()}else renderExamQ()}
function examNav(d){exam.i=Math.max(0,Math.min(EXAM_N-1,exam.i+d));renderExamQ()}
function finishExam(){
  clearInterval(exam.timer);
  let ok=0,wrong=[];
  exam.qs.forEach(id=>{const q=byId(id),p=exam.picks[id];if(p===q.c)ok++;else{wrong.push({q,p});const r=rec(id);r.bad++;r.box=1;r.due=Date.now();}});
  const pts=Math.round(ok/EXAM_N*EXAM_MAXPTS),pct=Math.round(ok/EXAM_N*100),passed=pts>=EXAM_PASSPTS;
  S.exams.push({d:Date.now(),ok,n:EXAM_N,pct,pts});save();
  const rev=wrong.map(w=>qCard(w.q,'rev',{pick:w.p})).join('');
  document.getElementById('exam-box').innerHTML=`<div class="final-score show"><h2>${passed?'🎉 ВЗЕТ!':'❌ Не този път'}</h2><div class="percentage">${pts} / ${EXAM_MAXPTS} т.</div><p style="font-size:1.2em">Верни: ${ok} от ${EXAM_N} (${pct}%) · праг: ${EXAM_PASSPTS} точки ≈ 26 верни</p><button class="restart-btn" onclick="startExam()">🔄 Нов изпит</button> <button class="restart-btn" style="background:rgba(148,163,184,0.3)" onclick="renderExamHome()">↩️ Начало</button></div>${wrong.length?'<h2 style="margin:20px 0;color:#ef4444">Грешните ти отговори (влизат в режим Грешки):</h2>'+rev:''}`;
  exam=null;
}

// ---------- ГРЕШКИ (Leitner) ----------
function dueList(){const n=Date.now();return QB.filter(q=>{const r=S.ans[q.id];return r&&r.bad>0&&(r.box||0)<3&&(r.due||0)<=n}).map(q=>q.id)}
function renderMistHome(){
  mist=dueList();mistIdx=0;
  const box=document.getElementById('mist-box');
  if(!mist.length){box.innerHTML='<div class="section"><h2>🔁 Грешки</h2><p>Нищо за преговор в момента 🎯 Грешните въпроси от тренировка и изпит идват тук с интервално повторение (1 → 3 → 7 дни).</p></div>';return}
  box.innerHTML=`<div class="section"><h2>🔁 Грешки за преговор: ${mist.length}</h2><button class="restart-btn" onclick="renderMistQ()">Започни</button></div>`;
}
function renderMistQ(){
  if(mistIdx>=mist.length){renderMistHome();return}
  const q=byId(mist[mistIdx]);
  document.getElementById('mist-box').innerHTML=`<div class="score-display">Преговор ${mistIdx+1}/${mist.length}</div>`+qCard(q,'mist');
}
function mistPick(id,i,ok){
  const q=byId(id),r=rec(id);
  if(ok){r.ok++;r.box=Math.min(3,(r.box||0)+1);r.due=Date.now()+[0,864e5,3*864e5,7*864e5][r.box]}
  else{r.bad++;r.box=1;r.due=Date.now()+864e5}
  save();
  document.getElementById('mist-box').innerHTML=`<div class="score-display">Преговор ${mistIdx+1}/${mist.length}</div>`+qCard(q,'rev',{pick:i})+`<div class="nav-buttons"><button class="nav-btn btn-next" onclick="mistIdx++;renderMistQ()">Следващ ➡️</button></div>`;
}

// ---------- СТАТИСТИКА ----------
function renderStats(){
  const by={};
  QB.forEach(q=>{const k=q.t;by[k]=by[k]||{n:0,ok:0,bad:0};by[k].n++;const r=S.ans[q.id];if(r){by[k].ok+=r.ok?1:0;by[k].bad+=(!r.ok&&r.bad)?1:0}});
  let rows=Object.keys(by).map(k=>{const d=by[k],seen=d.ok+d.bad,acc=seen?Math.round(d.ok/seen*100):0;return `<tr><td>${TYPES[k]}</td><td>${d.n}</td><td>${d.ok}</td><td>${d.bad}</td><td>${seen?acc+'%':'—'}</td></tr>`}).join('');
  const total=QB.length,seen=Object.values(S.ans).filter(r=>r.ok||r.bad).length;
  document.getElementById('stats-box').innerHTML=`<div class="section"><h2>📈 Прогрес: ${seen}/${total} въпроса</h2><table class="table"><tr><th>Тема</th><th>Общо</th><th>Научени</th><th>Грешни</th><th>Точност</th></tr>${rows}</table><button class="restart-btn" style="margin-top:20px;background:rgba(239,68,68,0.3)" onclick="if(confirm('Нулиране на целия прогрес?')){localStorage.removeItem(LS);location.reload()}">🗑️ Нулирай прогреса</button></div>`;
}

// ---------- INIT ----------
window.addEventListener('load',()=>{
  document.getElementById('handbook').innerHTML=HANDBOOK;
  const f=document.getElementById('train-filters');
  f.innerHTML=`<button class="filter-btn active" onclick="setFilter('all',this)">Всички (${QB.length})</button>`+Object.keys(TYPES).map(k=>`<button class="filter-btn" onclick="setFilter('${k}',this)">${TYPES[k]}</button>`).join('');
  document.getElementById('qcount').textContent=QB.length;
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
});
