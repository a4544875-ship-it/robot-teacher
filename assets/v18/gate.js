/* 奇蹟知識島 v18 — 城堡大廳：選帳號、輸入密碼、換頭像
   頭像素材在 assets/v18/av/<id>.webp（去背，畫布 480×468）。 */
(function(){
var B='assets/v18/av/';
var KIDS=[],Store=null,kidOf,growOf,subPts,scLevel,esc,sfx,confetti,hashPin,enter,renderPin,Music,PIC,gate,setMode,getMode;
function init(o){KIDS=o.KIDS;Store=o.Store;kidOf=o.kidOf;growOf=o.growOf;subPts=o.subPts;scLevel=o.scLevel;esc=o.esc;sfx=o.sfx;confetti=o.confetti;hashPin=o.hashPin;enter=o.enter;renderPin=o.renderPin;Music=o.Music;PIC=o.PIC;gate=o.gate;setMode=o.setMode;getMode=o.getMode;ready=true}
var ready=false;
var AV=[
 ['adv','冒險家',{e:[[252,285],[355,300]],t:55,hc:1,hk:2.27,ck:1.13}],
 ['blue','藍髮耳機',{e:[[157,315],[270,308]],t:82,hc:1,hk:2.68,ck:2.59}],
 ['star','星帽少年',{e:[[142,300],[277,297]],t:90,hc:0,hk:1.17,ck:2.8}],
 ['ninja','銀髮忍者',{e:[[150,300],[262,292]],t:68,hc:1,hk:.8,ck:2.03}],
 ['black','黑髮戰士',{e:[[142,307],[255,307]],t:63,hc:1,hk:2.73,ck:2.12}],
 ['knight','鋼鐵騎士',{e:[[172,290],[307,290]],t:82,hc:0,hk:1.17,ck:1.67}],
 ['wizard','魔法師',{e:[[165,305],[277,305]],t:82,hc:1,hk:1.36,ck:2.55}],
 ['archer','森林弓箭手',{e:[[142,290],[262,290]],t:63,hc:1,hk:3.49,ck:1.97}],
 ['pirate','小海盜',{e:[[150,305],[270,305]],t:56,hc:1,hk:1.95,ck:2.33}],
 ['tech','科技護目鏡',{e:[[172,252],[300,252]],t:75,hc:1,hk:2.83,ck:2.3}],
 ['red','紅髮勇者',{e:[[172,272],[307,272]],t:46,hc:1,hk:1.69,ck:1.97}],
 ['prince','金髮王子',{e:[[187,287],[300,287]],t:42,hc:1,hk:1.01,ck:2.09}],
 ['cat','獸耳少年',{e:[[157,294],[277,294]],t:58,hc:1,hk:.78,ck:1.67}],
 ['astro','太空探險家',{e:[[180,287],[285,287]],t:68,hc:0,hk:1.17,ck:2.22}],
 ['horn','魔角戰士',{e:[[172,279],[300,279]],t:80,hc:1,hk:2.34,ck:2.69}]];
var AVM={};AV.forEach(function(a){AVM[a[0]]=a});
/* ---------- 頭像組合 ---------- */
var DEFS='<defs><linearGradient id="g18gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff1a8"/><stop offset=".5" stop-color="#ffc83a"/><stop offset="1" stop-color="#d9900a"/></linearGradient><filter id="g18blur"><feGaussianBlur stdDeviation="5"/></filter></defs>';
function cfgOf(id){var d=Store&&Store.kid(id)||{},a=d.ava;if(a&&typeof a==='object'&&AVM[a.id])return {id:a.id};if(d.avd)return null;
  var used={},ks=KIDS||[];var dflt={de:'adv',ren:'blue'};if(dflt[id])return {id:dflt[id]};
  ks.forEach(function(k){var x=(Store.kid(k.id)||{}).ava;if(x&&x.id)used[x.id]=1});var i=ks.map(function(k){return k.id}).indexOf(id),pool=AV.filter(function(a){return !used[a[0]]&&a[0]!=='adv'&&a[0]!=='blue'});return {id:(pool[(i<0?0:i)%pool.length]||AV[2])[0]}}
/* 頭像畫布（不含外框） */
function canvas(c,anim){var a=AVM[c.id]||AV[0];return '<span class="g18cv'+(anim?' an':'')+'"><img src="'+B+a[0]+'.webp" alt="" draggable="false"></span>'}
/* 小頭像（圓形，給 App 各處用） */
function face(k,cls){if(!k||!ready)return '';var c=cfgOf(k.id);if(!c)return '';return '<span class="kav kava'+(cls?' '+cls:'')+'" aria-hidden="true"><span class="g18in">'+canvas(c,false)+'</span></span>'}
/* 大頭像：金色圓框、帽子可以超出框 */
function big(c,opt){opt=opt||{};return '<span class="g18big'+(opt.cls?' '+opt.cls:'')+'"><span class="g18glow"></span><span class="g18ring"></span><span class="g18pop">'+canvas(c,true)+'</span><span class="g18rim"></span>'+(opt.crown?'<span class="g18crown">'+crownSVG()+'</span>':'')+(opt.badge?'<span class="g18badge">'+opt.badge+'</span>':'')+'</span>'}
function crownSVG(){return '<svg viewBox="-60 -50 120 80">'+DEFS+'<path d="M-46 18 L-52 -26 L-24 -4 L0 -40 L24 -4 L52 -26 L46 18 Z" fill="url(#g18gold)" stroke="#a86b00" stroke-width="5" stroke-linejoin="round"/><rect x="-48" y="12" width="96" height="14" rx="6" fill="url(#g18gold)" stroke="#a86b00" stroke-width="5"/></svg>'}

/* ---------- 共用：背景、旗子、標題牌 ---------- */
function stage(inner,cls){var sp='';for(var i=0;i<16;i++)sp+='<i class="g18sp" style="left:'+(Math.random()*100).toFixed(1)+'%;top:'+(Math.random()*100).toFixed(1)+'%;--d:'+(Math.random()*4).toFixed(2)+'s;--t:'+(2.4+Math.random()*2.4).toFixed(2)+'s"></i>';
  return '<div class="g18bgl" aria-hidden="true"></div><div class="g18fx" aria-hidden="true">'+sp+'</div><span class="g18flag l" aria-hidden="true"></span><span class="g18flag r" aria-hidden="true"></span><div class="g18wrap '+(cls||'')+'">'+inner+'</div>'}
function plaque(t,small){return '<div class="g18plq'+(small?' s':'')+'"><span>'+t+'</span></div>'}
function bot(){return PIC&&PIC.bot3?'<img class="g18bot" src="'+PIC.bot3+'" alt="">':''}
var ICO={en:'<svg viewBox="0 0 24 24"><path d="M3 5.5C5.5 4 8.5 4 12 6c3.5-2 6.5-2 9-.5V19c-2.5-1.5-5.5-1.5-9 .5-3.5-2-6.5-2-9-.5Z" fill="currentColor" opacity=".18"/><path d="M3 5.5C5.5 4 8.5 4 12 6c3.5-2 6.5-2 9-.5V19c-2.5-1.5-5.5-1.5-9 .5-3.5-2-6.5-2-9-.5ZM12 6v13.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
 math:'<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="3" fill="currentColor" opacity=".18"/><rect x="4" y="3" width="16" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="7" y="6" width="10" height="4" rx="1" fill="currentColor"/><path d="M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 17h.01M12 17h.01M16 17h.01" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
 so:'<svg viewBox="0 0 24 24"><path d="M3 20h18M5 20V10l7-5 7 5v10" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><rect x="10" y="13" width="4" height="7" rx="1" fill="currentColor"/></svg>',
 sci:'<svg viewBox="0 0 24 24"><path d="M5 19C5 10 11 5 20 4c0 9-5 15-14 15Z" fill="currentColor" opacity=".25"/><path d="M5 19C5 10 11 5 20 4c0 9-5 15-14 15ZM5 19 14 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'};
function num(n){return (+n||0).toLocaleString('en-US')}
var seen=false,lastList='';
/* ---------- 1. 選帳號 ---------- */
/* 只產生帳號卡片（不含背景、標題、面板），雲端資料更新時用來比對、只換卡片 */
function listHTML(){var h='';
  var ks=KIDS.slice(),top=null,best=-1;ks.forEach(function(k){var p=+(Store.kid(k.id)||{}).pts||0;if(p>best){best=p;top=k.id}});
  ks.forEach(function(k,i){var d=Store.kid(k.id)||{},e=growOf(k.id,'en'),m=growOf(k.id,'math'),sp=subPts(d,'sci'),L=scLevel(sp),c=cfgOf(k.id);
    function socTile(id){var R=null;try{R=window.__soc&&__soc.report(id)}catch(e){}var pts=R?R.pts:0,pc=R&&R.total?R.badges/R.total*100:0;return tile('so','社會',pts,pc,0)}
    function tile(cls,label,pts,pc,x){return '<span class="g18t '+cls+'"><span class="i">'+ICO[cls]+'</span><b>'+label+'</b><small>'+num(pts)+' 分'+(x?' <em>×'+x+'</em>':'')+'</small><span class="bar"><i style="--w:'+Math.max(5,Math.min(100,pc)).toFixed(0)+'%"></i></span></span>'}
    h+='<button class="g18card" data-id="'+k.id+'" style="--i:'+i+'"><span class="g18shine"></span>'+(c?big(c,{crown:k.id===top&&best>0}):'<span class="g18big emo"><span class="g18ring"></span><span class="g18emo">'+esc(k.emo)+'</span></span>')+
      '<span class="g18info"><span class="g18nm"><b>'+esc(k.name)+'</b><span class="g18tot"><i>★</i>'+num(d.pts)+'</span></span><span class="g18tiles">'+
      tile('en','英文',e.cur,(e.cur-e.lv[0])/(e.nx[0]-e.lv[0])*100,e.n)+tile('math','數學',m.cur,(m.cur-m.lv[0])/(m.nx[0]-m.lv[0])*100,m.n)+tile('sci','自然',sp,L.to?(sp-L.from)/(L.to-L.from)*100:100,0)+socTile(k.id)+'</span></span></button>'});
  return h}
function bindCards(){gate.querySelectorAll('.g18card').forEach(function(b){b.addEventListener('click',function(){if(b.classList.contains('tap'))return;sfx('tap');b.classList.add('tap');setTimeout(function(){pinScreen(b.dataset.id)},180)})})}
/* 雲端資料（分數、名單）更新時呼叫：已經在選帳號畫面，就只把有變的卡片換掉，
   不重畫整個畫面——以前每來一筆雲端資料就整頁重畫、面板重新淡入，手機上看起來就是一直閃、一直跳。
   回傳 true 代表已處理；false 代表目前不在選帳號畫面，交給呼叫端決定要不要整頁重畫。 */
function refreshPick(){if(!ready||getMode()!=='pick'||!gate.classList.contains('g18'))return false;
  var wrap=gate.querySelector('.g18wrap.pick'),list=wrap&&wrap.querySelector('.g18list');if(!list)return false;
  var h=listHTML();if(h===lastList)return true;
  lastList=h;wrap.classList.add('again');list.innerHTML=h;bindCards();return true}
function pickScreen(){setMode('pick');gate.classList.remove('cover');gate.classList.add('g18');try{Music.play('cover')}catch(e){}
  lastList=listHTML();
  var h='<div class="g18head">'+bot()+plaque('你是誰呢？')+'<p class="g18sub">選自己的帳號，分數和學習紀錄都會記在這裡！</p></div><div class="g18panel"><div class="g18list">'+lastList;
  h+='</div></div><button class="g18parent" id="toParent"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.4" fill="currentColor"/><circle cx="16.5" cy="9" r="2.6" fill="currentColor" opacity=".75"/><path d="M2.5 19c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5Z" fill="currentColor"/><path d="M14.5 14.2c.7-.4 1.4-.6 2.2-.6 2.4 0 4.3 1.4 4.8 4.4h-5.3" fill="currentColor" opacity=".75"/></svg>家長區（看孩子的紀錄）</button>';
  gate.innerHTML=stage(h,'pick'+(seen?' again':''));seen=true;
  bindCards();
  gate.querySelector('#toParent').addEventListener('click',function(){sfx('tap');gate.classList.remove('g18');renderPin()})}

/* ---------- 2. 輸入密碼（自製數字鍵盤） ---------- */
var pend={};
function pinScreen(id,note){var k=kidOf(id);if(!k)return pickScreen();setMode('kpin');gate.classList.add('g18');
  var first=!Store.kid(id).pin,step=1,buf='',firstVal='',c=pend[id]||cfgOf(id);
  var h='<div class="g18pin"><div class="g18pav">'+(c?big(c,{cls:'xl'}):'<span class="g18big emo xl"><span class="g18ring"></span><span class="g18emo">'+esc(k.emo)+'</span></span>')+
    '<button class="g18edit" id="g18edit" aria-label="換頭像"><svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16Z" fill="#fff" stroke="#1d3b8c" stroke-width="2" stroke-linejoin="round"/><path d="M14 6l4 4" stroke="#1d3b8c" stroke-width="2"/></svg><span>換頭像</span></button></div>'+
    plaque(esc(k.name),true)+'<div class="g18panel pinp"><p class="g18q" id="g18q"></p><div class="g18boxes" id="g18boxes">'+[0,1,2,3].map(function(){return '<span><i></i></span>'}).join('')+'</div><p class="g18msg'+(note?' ok':'')+'" id="g18msg" role="alert">'+(note||'')+'</p>'+
    '<div class="g18pad" id="g18pad">'+[1,2,3,4,5,6,7,8,9,'del',0,'ok'].map(function(x){return '<button data-k="'+x+'"'+(x==='del'?' class="del" aria-label="刪除"':x==='ok'?' class="ok" aria-label="確定"':'')+'>'+(x==='del'?'<svg viewBox="0 0 24 24"><path d="M9 5h11v14H9l-6-7Z" fill="#5d6a8c"/><path d="m12 9 5 6m0-6-5 6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>':x==='ok'?'<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>':x)+'</button>'}).join('')+'</div>'+
    '<small class="g18hint" id="g18hint"></small></div><button class="g18back" id="pinBack"><svg viewBox="0 0 24 24"><path d="M19 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>回去選帳號</button></div>';
  gate.innerHTML=stage(h,'pinw');
  var q=gate.querySelector('#g18q'),bx=gate.querySelectorAll('#g18boxes span'),msg=gate.querySelector('#g18msg'),hint=gate.querySelector('#g18hint');
  function texts(){q.textContent=first?(step===1?'第一次進來，幫自己設定 4 位數密碼：':'再輸入一次，確認密碼：'):'請輸入你的 4 位數密碼：';
    hint.textContent=pend[id]?'✨ 輸入密碼後就會換上新頭像':first?'要記住喔！忘記的話請爸爸媽媽到家長區幫你重設。':'忘記密碼的話，請爸爸媽媽到家長區幫你重設。'}
  function draw(){bx.forEach(function(b,i){var on=i<buf.length;if(on&&!b.classList.contains('on')){b.classList.remove('on');void b.offsetWidth}b.classList.toggle('on',on);b.classList.toggle('cur',i===buf.length)})}
  function shake(t){sfx('no');msg.classList.remove('ok');msg.textContent=t;var p=gate.querySelector('#g18boxes');p.classList.remove('bad');void p.offsetWidth;p.classList.add('bad');buf='';setTimeout(draw,260)}
  function success(){var save=pend[id];if(save){Store.mut(id,function(d){d.ava=save});delete pend[id]}
    gate.querySelector('.g18pin').classList.add('win');msg.textContent='歡迎回來，'+k.short+'！';try{confetti(gate.querySelector('.g18pav'),46)}catch(e){}sfx('win');
    setTimeout(function(){gate.classList.remove('g18');document.removeEventListener('keydown',onKey);enter(id)},900)}
  function done(){var v=buf;if(v.length<4)return;
    if(first){if(step===1){firstVal=v;step=2;buf='';msg.textContent='';texts();draw();sfx('ok');return}
      if(v!==firstVal){step=1;firstVal='';texts();return shake('兩次不一樣，重新設定一次。')}
      Store.mut(id,function(d){d.pin=hashPin(v)});return success()}
    if(hashPin(v)===Store.kid(id).pin)success();else shake('密碼不對喔，再試一次！')}
  function key(x){if(gate.querySelector('.g18pin.win'))return;if(x==='del'){buf=buf.slice(0,-1);sfx('tap')}else if(x==='ok'){if(buf.length<4){shake('要輸入 4 個數字喔！');return}return done()}else if(buf.length<4){buf+=x;sfx('tap');msg.textContent=''}
    draw();if(buf.length===4)setTimeout(done,160)}
  gate.querySelector('#g18pad').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;b.classList.remove('hit');void b.offsetWidth;b.classList.add('hit');key(b.dataset.k)});
  function onKey(e){if(getMode()!=='kpin'){document.removeEventListener('keydown',onKey);return}if(/^\d$/.test(e.key))key(e.key);else if(e.key==='Backspace')key('del');else if(e.key==='Enter')key('ok')}
  document.addEventListener('keydown',onKey);
  gate.querySelector('#pinBack').addEventListener('click',function(){sfx('tap');document.removeEventListener('keydown',onKey);pickScreen()});
  gate.querySelector('#g18edit').addEventListener('click',function(){sfx('tap');document.removeEventListener('keydown',onKey);avScreen(id)});
  texts();draw()}

/* ---------- 3. 選頭像 ---------- */
function avScreen(id){var k=kidOf(id);if(!k)return pickScreen();setMode('kav');gate.classList.add('g18');
  var c={id:(pend[id]||cfgOf(id)||{id:'adv'}).id};
  var h='<div class="g18av"><div class="g18head s">'+bot()+plaque('選擇你的頭像')+'</div>'+
    '<div class="g18prev"><div class="g18orbit"><i></i><i></i><i></i><i></i><i></i><i></i></div><div id="g18pv"></div><b id="g18pvn"></b></div>'+
    '<div class="g18panel"><div class="g18grid" id="g18grid">'+AV.map(function(a,i){return '<button data-av="'+a[0]+'" style="--i:'+i+'" aria-label="'+a[1]+'"><span class="g18tilebg"></span>'+canvas({id:a[0]},false)+'<i class="ck"><svg viewBox="0 0 24 24"><path d="m6 12.5 4 4 8-9" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></i><small>'+a[1]+'</small></button>'}).join('')+'</div></div>'+
    '<div class="g18acts"><button class="g18ok" id="g18ok"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>確認使用</button></div>'+
    '<button class="g18back" id="g18cancel"><svg viewBox="0 0 24 24"><path d="M19 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>不換了，回去</button></div>';
  gate.innerHTML=stage(h,'avw');gate.scrollTop=0;
  var pv=gate.querySelector('#g18pv');
  function prev(pop){pv.innerHTML=big(c,{cls:'xl'});gate.querySelector('#g18pvn').textContent=(AVM[c.id]||AV[0])[1];if(pop)pv.firstChild.classList.add('pop')}
  function grid(){gate.querySelectorAll('#g18grid button').forEach(function(b){b.classList.toggle('sel',b.dataset.av===c.id)})}
  gate.querySelector('#g18grid').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;sfx('tap');c.id=b.dataset.av;grid();prev(true)});
  gate.querySelector('#g18ok').addEventListener('click',function(){sfx('win');pend[id]={id:c.id};try{confetti(pv,36)}catch(e){}setTimeout(function(){pinScreen(id,'✨ 新頭像選好了！輸入密碼就會換上')},420)});
  gate.querySelector('#g18cancel').addEventListener('click',function(){sfx('tap');pinScreen(id)});
  grid();prev(false)}

/* ---------- 樣式 ---------- */
var CSS=`
#gate.g18{padding:0!important;background:#1b2f74!important;overflow-y:auto;overflow-x:hidden;display:block}
.g18bgl{position:fixed;inset:-24px;background:url(assets/v17/cover/bg.webp) center 35%/cover no-repeat;filter:blur(5px) saturate(1.1) brightness(.9);transform:scale(1.04);z-index:0}
/* 背景不再慢慢平移：整張模糊大圖一直動，手機每一格都要重新算模糊，很吃效能、手機會發燙變慢 */
.g18bgl::after{content:"";position:absolute;inset:0;background:radial-gradient(120% 70% at 50% 0%,rgba(255,255,255,.12),transparent 60%),linear-gradient(180deg,rgba(14,26,78,.25),rgba(14,26,78,.55) 70%,rgba(10,18,60,.8))}
@keyframes g18pan{from{transform:scale(1.04) translate(0,0)}to{transform:scale(1.1) translate(-1.5%,-1%)}}
.g18fx{position:fixed;inset:0;pointer-events:none;z-index:1}
.g18sp{position:absolute;width:10px;height:10px;opacity:0;background:radial-gradient(closest-side,#fff,rgba(255,255,255,0));animation:g18tw var(--t) ease-in-out var(--d) infinite}
.g18sp::before,.g18sp::after{content:"";position:absolute;left:50%;top:50%;width:2px;height:22px;margin:-11px 0 0 -1px;background:linear-gradient(transparent,#fff,transparent);border-radius:2px}
.g18sp::after{transform:rotate(90deg)}
@keyframes g18tw{0%,100%{opacity:0;transform:scale(.3) rotate(0)}50%{opacity:.95;transform:scale(1) rotate(45deg)}}
.g18flag{position:fixed;top:-6px;width:58px;height:132px;z-index:2;transform-origin:50% 0;animation:g18sway 4.6s ease-in-out infinite;filter:drop-shadow(0 6px 10px rgba(0,0,0,.35))}
.g18flag.l{left:max(8px,calc(50% - 300px))}.g18flag.r{right:max(8px,calc(50% - 300px));animation-delay:-2.3s}
.g18flag::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,#2c4bb8,#1c2f80);clip-path:polygon(0 0,100% 0,100% 100%,50% 82%,0 100%);box-shadow:inset 0 0 0 4px #f1c24b}
.g18flag::after{content:"";position:absolute;left:4px;right:4px;top:4px;bottom:10px;border:3px solid #f6d26b;clip-path:polygon(0 0,100% 0,100% 100%,50% 82%,0 100%);background:radial-gradient(circle at 50% 42%,#ffe38a 0 9px,transparent 10px)}
@keyframes g18sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
@media (max-width:420px){.g18flag{width:40px;height:92px}}
.g18wrap{position:relative;z-index:3;width:100%;max-width:560px;margin:0 auto;padding:max(18px,calc(env(safe-area-inset-top,0px) + 10px)) 16px max(24px,calc(env(safe-area-inset-bottom,0px) + 16px));display:flex;flex-direction:column;gap:14px;min-height:100%;color:#1a2250;font-family:var(--font-zh)}
.g18head{display:flex;flex-direction:column;align-items:center;gap:2px;position:relative}
.g18bot{width:86px;height:86px;object-fit:contain;margin-bottom:-24px;position:relative;z-index:2;filter:drop-shadow(0 6px 10px rgba(0,0,0,.35));animation:g18bob 2.8s ease-in-out infinite}
.g18head.s .g18bot{width:64px;height:64px;margin-bottom:-18px}
@keyframes g18bob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-7px) rotate(2deg)}}
.g18plq{position:relative;padding:12px 46px 13px;color:#fff;font-weight:900;font-size:clamp(26px,7.6vw,36px);letter-spacing:.06em;text-align:center;text-shadow:0 3px 0 #0d1a52,0 0 18px rgba(120,170,255,.6);
 background:linear-gradient(180deg,#fff2a8,#f0b52c 55%,#c98200);clip-path:polygon(16px 0,calc(100% - 16px) 0,100% 50%,calc(100% - 16px) 100%,16px 100%,0 50%);overflow:hidden;animation:g18in .6s cubic-bezier(.3,1.5,.5,1) both}
.g18plq::before{content:"";position:absolute;inset:5px;clip-path:polygon(13px 0,calc(100% - 13px) 0,100% 50%,calc(100% - 13px) 100%,13px 100%,0 50%);background:linear-gradient(180deg,#4a6fe0,#2a46b4 50%,#1b2d82)}
.g18plq::after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);animation:g18sh 4s ease-in-out 1s infinite}
.g18plq span{position:relative}.g18plq small{font-size:.5em;letter-spacing:0}
.g18plq.s{font-size:clamp(18px,5vw,22px);padding:8px 34px 9px}
@keyframes g18sh{0%{left:-60%}45%,100%{left:130%}}
@keyframes g18in{0%{opacity:0;transform:scale(.6) translateY(-12px)}100%{opacity:1;transform:none}}
.g18sub{margin:6px 0 0;color:#fff;font-weight:700;font-size:14.5px;text-align:center;text-shadow:0 2px 6px rgba(0,0,0,.45)}
.g18panel{position:relative;border-radius:26px;padding:14px;background:linear-gradient(180deg,#2a4296,#1b2b6e);box-shadow:0 0 0 3px #f0bf45,0 0 0 6px #22378a,0 0 0 8px rgba(240,191,69,.6),0 18px 40px rgba(5,10,40,.55);animation:g18in .55s ease-out .1s both}
.g18list{display:flex;flex-direction:column;gap:12px}
.g18card{position:relative;display:flex;align-items:center;gap:12px;width:100%;border:0;text-align:left;padding:12px 12px 12px 10px;border-radius:20px;cursor:pointer;color:#1a2250;
 background:linear-gradient(180deg,#ffffff,#e9eefc);box-shadow:inset 0 0 0 2px #fff,0 0 0 2px #c9d4f5,0 6px 0 #9fb0e6,0 10px 18px rgba(8,16,60,.35);overflow:visible;
 animation:g18card .6s cubic-bezier(.3,1.4,.5,1) calc(.15s + var(--i)*.12s) both;transition:transform .15s}
.again .g18card{animation:none}
.g18card:active,.g18card.tap{transform:translateY(4px) scale(.98);box-shadow:inset 0 0 0 2px #fff,0 0 0 2px #c9d4f5,0 2px 0 #9fb0e6,0 4px 8px rgba(8,16,60,.3)}
@keyframes g18card{0%{opacity:0;transform:translateY(30px) scale(.92)}100%{opacity:1;transform:none}}
.g18shine{position:absolute;inset:0;border-radius:20px;overflow:hidden;pointer-events:none}
.g18shine::after{content:"";position:absolute;top:0;bottom:0;width:35%;left:-50%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);animation:g18sh 5.5s ease-in-out calc(1.4s + var(--i)*.7s) infinite}
.g18big{position:relative;display:block;flex:none;width:clamp(78px,23vw,104px);aspect-ratio:1}
.g18big.xl{width:min(46vw,190px)}
.g18glow{position:absolute;inset:-12%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,226,120,.7),rgba(255,226,120,0));animation:g18glow 2.6s ease-in-out infinite}
.g18card .g18glow{display:none}
@keyframes g18glow{0%,100%{opacity:.35;transform:scale(.92)}50%{opacity:.9;transform:scale(1.05)}}
.g18ring{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 50% 38%,#8fd0ff,#2d7fe0 55%,#1b4fae);box-shadow:inset 0 0 0 4px #fff3b8,inset 0 0 0 8px #e7a52a,inset 0 -8px 16px rgba(0,0,40,.35),0 4px 10px rgba(10,20,70,.35)}
.g18pop{position:absolute;left:-14%;right:-14%;top:-30%;bottom:0;-webkit-mask:radial-gradient(circle at 50% 61.5%,#000 0 38.6%,transparent 39.2%),linear-gradient(#000 0 58%,transparent 58%);mask:radial-gradient(circle at 50% 61.5%,#000 0 38.6%,transparent 39.2%),linear-gradient(#000 0 58%,transparent 58%);animation:g18bob2 3.2s ease-in-out infinite;transform-origin:50% 90%}
.g18card .g18pop{animation-delay:calc(var(--i)*-.8s)}
@keyframes g18bob2{0%,100%{transform:translateY(0)}50%{transform:translateY(-3%)}}
.g18big.pop .g18pop{animation:g18pop .5s cubic-bezier(.3,1.6,.5,1),g18bob2 3.2s ease-in-out .5s infinite}
@keyframes g18pop{0%{transform:scale(.6) rotate(-8deg);opacity:.3}100%{transform:none;opacity:1}}
.g18cv{position:absolute;left:0;right:0;bottom:0;aspect-ratio:480/468;isolation:isolate;display:block}
.g18pop .g18cv{bottom:-3%}
.g18cv>img,.g18cv>svg{position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;user-select:none;-webkit-user-drag:none;padding:0!important;margin:0!important;border:0!important;border-radius:0!important;max-width:none!important;background:none!important;box-shadow:none!important}
.g18cv>svg{overflow:visible}
.g18rim{position:absolute;inset:0;border-radius:50%;box-shadow:inset 0 0 0 4px #fff3b8,inset 0 0 0 8px #e7a52a;-webkit-mask:linear-gradient(transparent 0 54%,#000 64%);mask:linear-gradient(transparent 0 54%,#000 64%);pointer-events:none}
.g18crown{position:absolute;right:-6%;top:-14%;width:42%;transform:rotate(18deg);filter:drop-shadow(0 3px 3px rgba(0,0,0,.3));animation:g18crn 2.4s ease-in-out infinite}
@keyframes g18crn{0%,100%{transform:rotate(18deg) translateY(0)}50%{transform:rotate(10deg) translateY(-12%)}}
.g18badge{position:absolute;right:-4%;bottom:2%;font-size:22px}
.g18big.emo .g18emo{position:absolute;inset:0;display:grid;place-items:center;font-size:52px;font-family:var(--font-emoji)}
.o-bob{animation:o-bob 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.g18cv svg g.o-bob{animation:none}
.an svg .o-float,.an svg .o-pulse,.an svg .o-tw,.an svg .o-spin,.an svg .o-wig,.an svg .o-glint{transform-box:fill-box;transform-origin:center}
.an svg .o-float{animation:o-fl 2.4s ease-in-out infinite}
.an svg .o-pulse{animation:o-pl 1.4s ease-in-out infinite}
.an svg .o-tw{animation:o-tw 1.8s ease-in-out infinite}.an svg .o-tw.d1{animation-delay:.6s}.an svg .o-tw.d2{animation-delay:1.1s}
.an svg .o-spin{animation:o-sp 4s linear infinite}
.an svg .o-wig{animation:o-wg 2s ease-in-out infinite}
.an svg .o-glint{animation:o-gl 2.4s ease-in-out infinite}
@keyframes o-fl{0%,100%{translate:0 0}50%{translate:0 -6px}}
@keyframes o-pl{0%,100%{scale:1}50%{scale:1.18}}
@keyframes o-tw{0%,100%{scale:.7;opacity:.6}50%{scale:1.15;opacity:1}}
@keyframes o-sp{to{rotate:360deg}}
@keyframes o-wg{0%,100%{rotate:-6deg}50%{rotate:6deg}}
@keyframes o-gl{0%,100%{opacity:.4}50%{opacity:1}}
.g18info{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px}
.g18nm{display:flex;align-items:center;gap:8px}
.g18nm b{font-size:clamp(20px,5.6vw,26px);font-weight:900;color:#1a2250;font-family:var(--font-en),var(--font-zh);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.g18tot{display:inline-flex;align-items:center;gap:4px;padding:3px 10px 3px 6px;border-radius:999px;background:linear-gradient(180deg,#fff5c2,#ffd85a);box-shadow:inset 0 0 0 1.5px #f2b52c,0 2px 0 #d9971a;font-weight:900;font-size:15px;color:#5a3a00;font-variant-numeric:tabular-nums}
.g18tot i{font-style:normal;color:#ff9d00;text-shadow:0 1px 0 #fff;font-size:17px}
.g18tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
.g18card{display:grid;grid-template-columns:auto minmax(0,1fr);grid-template-areas:"av nm" "av tl";column-gap:14px;row-gap:8px;align-items:center}
.g18card>.g18big{grid-area:av}.g18info{display:contents}.g18nm{grid-area:nm}.g18tiles{grid-area:tl}
@media (max-width:520px){.g18card{grid-template-areas:"av nm" "tl tl";padding:12px}.g18card>.g18big{width:80px;margin:6px 0 0 4px}.g18nm{align-self:end}.g18t{padding:5px 2px 6px}.g18t b{font-size:12.5px}.g18t small{font-size:11px}}
.g18t{--c:#3b82f6;--bg:#eef5ff;position:relative;display:flex;flex-direction:column;align-items:center;gap:0;padding:6px 4px 7px;border-radius:12px;background:var(--bg);box-shadow:inset 0 0 0 2px var(--c);min-width:0;text-align:center}
.g18t.math{--c:#f08a1c;--bg:#fff4e8}.g18t.sci{--c:#24b35a;--bg:#ecfaf1}.g18t.so{--c:#e0457b;--bg:#fff0f5}
.g18t .i{width:22px;height:22px;color:var(--c)}.g18t .i svg{width:100%;height:100%}
.g18t b{font-size:13px;color:#1a2250;line-height:1.2}
.g18t small{font-size:11.5px;font-weight:800;color:#2b355e;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.g18t small em{font-style:normal;color:var(--c)}
.g18t .bar{width:84%;height:6px;border-radius:999px;background:rgba(26,34,80,.12);overflow:hidden;margin-top:3px}
.g18t .bar i{display:block;height:100%;width:var(--w);border-radius:999px;background:linear-gradient(90deg,color-mix(in srgb,var(--c) 60%,#fff),var(--c));animation:g18bar 1.2s cubic-bezier(.2,.9,.3,1) calc(.5s + var(--i,0)*.1s) both}
.again .g18t .bar i{animation:none}
@keyframes g18bar{from{width:0}}
@media (max-width:370px){.g18t b{font-size:12px}.g18t small{font-size:10.5px}.g18big{width:70px}}
.g18parent{display:flex;align-items:center;justify-content:center;gap:10px;margin:4px auto 0;width:min(100%,420px);padding:15px 18px;border:0;border-radius:999px;cursor:pointer;color:#fff;font-weight:900;font-size:17px;
 background:linear-gradient(180deg,#4767d6,#2a3f9c);box-shadow:inset 0 0 0 2px rgba(255,255,255,.35),0 0 0 3px #e9b93f,0 6px 0 #18267a,0 12px 22px rgba(0,0,0,.35);animation:g18in .6s ease-out .5s both}
.g18parent svg{width:28px;height:28px}
.g18parent:active{transform:translateY(4px);box-shadow:inset 0 0 0 2px rgba(255,255,255,.35),0 0 0 3px #e9b93f,0 2px 0 #18267a}
/* 密碼 */
.g18pin{display:flex;flex-direction:column;align-items:center;gap:12px;padding-top:26px}
.g18pav{position:relative;animation:g18in .6s cubic-bezier(.3,1.5,.5,1) both}
.g18edit{position:absolute;left:calc(100% - 26px);top:46%;z-index:4;white-space:nowrap;display:flex;align-items:center;gap:4px;border:0;border-radius:999px;padding:6px 11px 6px 7px;font-weight:900;font-size:13px;color:#1d3b8c;cursor:pointer;background:linear-gradient(180deg,#fff,#dfe8ff);box-shadow:0 0 0 2.5px #e9b93f,0 4px 0 #8da2df,0 6px 12px rgba(0,0,0,.3);animation:g18wig 3s ease-in-out 1.2s infinite}
.g18edit svg{width:20px;height:20px}
@keyframes g18wig{0%,86%,100%{transform:rotate(0)}90%{transform:rotate(-8deg) scale(1.08)}95%{transform:rotate(6deg) scale(1.08)}}
.g18pin .g18plq{margin-top:-6px;z-index:2;min-width:200px}
.g18panel.pinp{width:100%;max-width:400px;background:linear-gradient(180deg,#f7f9ff,#e3eafb);box-shadow:0 0 0 3px #f0bf45,0 0 0 7px #2a4296,0 0 0 9px rgba(240,191,69,.7),0 18px 40px rgba(5,10,40,.55);padding:18px 18px 14px;display:flex;flex-direction:column;align-items:center;gap:10px}
.g18q{margin:0;font-weight:900;font-size:17px;color:#1a2250;text-align:center}
.g18boxes{display:flex;gap:12px}
.g18boxes span{width:54px;height:60px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 2.5px #b9c8ee,inset 0 3px 6px rgba(26,34,80,.08);display:grid;place-items:center;transition:box-shadow .2s}
.g18boxes span.cur{box-shadow:inset 0 0 0 3px #3b82f6,0 0 0 4px rgba(59,130,246,.2)}
.g18boxes span i{width:18px;height:18px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#7fb6ff,#2b5fd9);transform:scale(0)}
.g18boxes span.on i{animation:g18dot .35s cubic-bezier(.3,1.8,.5,1) forwards}
@keyframes g18dot{to{transform:scale(1)}}
.g18boxes.bad{animation:g18shake .45s}.g18boxes.bad span{box-shadow:inset 0 0 0 3px #f05252,0 0 0 4px rgba(240,82,82,.2)}
@keyframes g18shake{0%,100%{transform:none}20%{transform:translateX(-10px)}40%{transform:translateX(9px)}60%{transform:translateX(-6px)}80%{transform:translateX(4px)}}
.g18msg.ok{color:#1e8f4a}.g18msg{margin:0;min-height:1.4em;font-weight:800;font-size:14px;color:#d93b3b;text-align:center}
.g18pad{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%}
.g18pad button{height:58px;border:0;border-radius:16px;font-family:var(--font-en);font-size:26px;font-weight:800;color:#1a2250;cursor:pointer;background:linear-gradient(180deg,#fff,#eef2fc);box-shadow:inset 0 0 0 1.5px #d6dff5,0 4px 0 #b5c3e6,0 6px 10px rgba(26,34,80,.12);transition:transform .08s,box-shadow .08s}
.g18pad button svg{width:30px;height:30px}
.g18pad button:active{transform:translateY(4px);box-shadow:inset 0 0 0 1.5px #d6dff5,0 0 0 #b5c3e6}
.g18pad button.hit{animation:g18hit .3s}
@keyframes g18hit{0%{filter:brightness(1.15)}100%{filter:none}}
.g18pad button.ok{background:linear-gradient(180deg,#4aa3ff,#1f6fe0);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.4),0 4px 0 #1550a8,0 6px 12px rgba(31,111,224,.35)}
.g18pad button.del{background:linear-gradient(180deg,#f2f4fa,#dfe4f0)}
.g18hint{font-size:12.5px;color:#5a6494;text-align:center;font-weight:700}
.g18pin.win .g18pav{animation:g18jump .8s cubic-bezier(.3,1.5,.5,1)}
.g18pin.win .g18boxes span{box-shadow:inset 0 0 0 3px #24b35a,0 0 0 4px rgba(36,179,90,.25)}
.g18pin.win .g18msg{color:#1e8f4a}
@keyframes g18jump{0%{transform:none}35%{transform:translateY(-22px) scale(1.06)}70%{transform:translateY(2px) scale(.98)}100%{transform:none}}
.g18back{display:flex;align-items:center;justify-content:center;gap:8px;margin:2px auto 0;width:min(100%,360px);padding:13px 18px;border:0;border-radius:999px;cursor:pointer;font-weight:900;font-size:16px;color:#1d3b8c;background:linear-gradient(180deg,#fff,#dde6fb);box-shadow:0 0 0 3px #e9b93f,0 5px 0 #8da2df,0 10px 18px rgba(0,0,0,.3)}
.g18back svg{width:22px;height:22px}
.g18back:active{transform:translateY(4px);box-shadow:0 0 0 3px #e9b93f,0 1px 0 #8da2df}
/* 換頭像 */
.g18av{display:flex;flex-direction:column;gap:12px}
.g18prev{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:30px 0 4px}
.g18prev .g18big.xl{width:min(34vw,140px)}
.g18prev>b{color:#fff;font-size:17px;font-weight:900;text-shadow:0 2px 6px rgba(0,0,0,.5);padding:2px 14px;border-radius:999px;background:rgba(20,34,100,.55);box-shadow:0 0 0 2px #e9b93f}
.g18orbit{position:absolute;left:50%;top:calc(30px + min(17vw,70px));width:min(50vw,200px);aspect-ratio:1;translate:-50% -50%;animation:o-sp 14s linear infinite;pointer-events:none}
.g18orbit i{position:absolute;left:50%;top:0;width:14px;height:14px;margin-left:-7px;transform-origin:7px calc(min(25vw,100px));background:radial-gradient(closest-side,#fff,#ffe58a 45%,rgba(255,229,138,0));animation:g18tw 2s ease-in-out infinite}
.g18orbit i:nth-child(2){rotate:60deg;animation-delay:.3s}.g18orbit i:nth-child(3){rotate:120deg;animation-delay:.6s}.g18orbit i:nth-child(4){rotate:180deg;animation-delay:.9s}.g18orbit i:nth-child(5){rotate:240deg;animation-delay:1.2s}.g18orbit i:nth-child(6){rotate:300deg;animation-delay:1.5s}
.g18grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:24px 8px;padding:6px 2px 18px}
@media (max-width:360px){.g18grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
.g18grid button{position:relative;aspect-ratio:1/1.08;border:0;padding:0;border-radius:18px;cursor:pointer;background:none;animation:g18card .5s cubic-bezier(.3,1.4,.5,1) calc(.1s + var(--i)*.035s) both;transition:transform .15s}
.g18tilebg{position:absolute;left:0;right:0;bottom:0;top:12%;border-radius:18px;background:radial-gradient(circle at 50% 30%,#e6f3ff,#a9cdf5);box-shadow:inset 0 0 0 2px #fff,0 3px 0 #7e9fd6}
.g18grid .g18cv{left:-4%;right:-4%;bottom:12%;-webkit-mask:linear-gradient(#000 0 0);mask:linear-gradient(#000 0 0)}
.g18grid button small{position:absolute;left:-4px;right:-4px;top:100%;margin-top:4px;font-size:10.5px;line-height:1.2;font-weight:800;color:#fff;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 3px rgba(0,0,0,.6)}
.g18grid button .ck{position:absolute;right:-6px;top:4%;width:26px;height:26px;border-radius:50%;background:linear-gradient(180deg,#3fd47a,#16a34a);box-shadow:0 0 0 2.5px #fff,0 2px 6px rgba(0,0,0,.3);display:grid;place-items:center;transform:scale(0);transition:transform .3s cubic-bezier(.3,1.8,.5,1);z-index:2}
.g18grid button .ck svg{width:18px;height:18px}
.g18grid button.sel .ck{transform:scale(1)}
.g18grid button.sel .g18tilebg{box-shadow:inset 0 0 0 2px #fff,0 0 0 3.5px #f2b52c,0 0 14px 2px rgba(255,210,80,.8),0 3px 0 #c98a00}
.g18grid button.sel{transform:translateY(-3px)}
.g18grid button:active{transform:scale(.94)}
.g18acts{display:flex;gap:10px;justify-content:center}
.g18ok{flex:1;max-width:300px;display:flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:999px;padding:15px 18px;cursor:pointer;font-weight:900;font-size:19px;color:#5a3600;background:linear-gradient(180deg,#fff27a,#ffd23c 45%,#ffb300);box-shadow:inset 0 3px 0 rgba(255,255,255,.7),0 0 0 3px #fff,0 6px 0 #d98a00,0 12px 22px rgba(0,0,0,.35);position:relative;overflow:hidden;animation:g18beat 1.6s ease-in-out infinite}
.g18ok svg{width:24px;height:24px}
.g18ok::after{content:"";position:absolute;top:0;bottom:0;width:30%;left:-40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.7),transparent);animation:g18sh 2.6s ease-in-out infinite}
@keyframes g18beat{0%,100%{transform:scale(1)}15%{transform:scale(1.05)}30%{transform:scale(1)}}
.g18ok:active{transform:translateY(4px)}
@media (prefers-reduced-motion:reduce){#gate.g18 *,#gate.g18 *::before,#gate.g18 *::after{animation:none!important;transition:none!important}}
/* App 各處的小頭像 */
.kava{position:relative;display:inline-block;flex:none;border-radius:50%;overflow:hidden;vertical-align:middle;background:radial-gradient(circle at 50% 38%,#9dd6ff,#2d7fe0 60%,#1b4fae);box-shadow:inset 0 0 0 2px rgba(255,255,255,.85)}
.kava .g18in{position:absolute;left:-7%;right:-7%;top:-13%;bottom:-1%}
.kava .g18cv{bottom:0}
`;
var css=false;function addCSS(){if(css)return;css=true;var e=document.createElement('style');e.id='g18css';e.textContent=CSS;document.head.appendChild(e)}
addCSS();
window.GateV18={init:init,ready:function(){return ready},pick:pickScreen,refresh:refreshPick,pin:function(id){pinScreen(id)},av:avScreen,face:face,cfg:cfgOf,big:big,AV:AV};
})();
