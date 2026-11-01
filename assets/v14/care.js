/* v14 照顧模組
   ① 當機回報：把 index.html 最前面記到的錯誤／卡頓，在孩子登入時存進孩子資料 k.er（最多 20 筆），家長後台看得到。
   ② 每日學習紀錄：k.ds['YYYY-MM-DD'] = {e,m,s 三科分數, g 局數, r 答對, n 題數, t 活動分鐘, te/tm/ts/tq 各科分鐘}，保留 90 天。
      不再依賴雲端「最近 200 筆」遊戲紀錄，所以不會被其他孩子的紀錄擠掉。
   ③ 休息提醒：一直玩滿 30 分鐘（家長可改）就請孩子休息 10 分鐘；真的離開超過休息時間就重新計時。
      設定 k.tm = {off, p 玩幾分鐘, r 休息幾分鐘}；休息狀態 k.rs = {u 休息到幾點, a 這段已玩秒數, l 最後活動時間}。 */
(function(global){
'use strict';
function pad(n){return (n<10?'0':'')+n}
function dkey(t){var d=t?new Date(t):new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
var CSS=[
'.rt-rest{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px 16px;background:radial-gradient(120% 90% at 50% 0%,#cfe9ff 0%,#e8e0ff 55%,#ffe3ef 100%);color:#1f2a44;font-family:inherit;overflow:auto}',
'.rt-rest .box{width:min(420px,100%);text-align:center;display:flex;flex-direction:column;gap:14px;align-items:center}',
'.rt-rest .bot{width:120px;height:120px;animation:rtfl 3s ease-in-out infinite}.rt-rest .bot svg,.rt-rest .bot img{width:100%;height:100%}',
'.rt-rest h2{margin:0;font-size:28px}.rt-rest p{margin:0;font-size:16px;line-height:1.6;color:#4a5672}',
'.rt-rest .clock{font:800 64px/1 "Baloo 2","Fredoka",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:#3f51d9}',
'.rt-rest .ring{position:relative;width:220px;height:220px;display:grid;place-items:center}.rt-rest .ring svg{position:absolute;inset:0;transform:rotate(-90deg)}',
'.rt-rest .tips{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;width:100%}.rt-rest .tips span{background:rgba(255,255,255,.75);border-radius:16px;padding:10px 6px;font-size:13px;font-weight:700;line-height:1.4}.rt-rest .tips b{display:block;font-size:26px}',
'.rt-rest .row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.rt-rest button{border:0;border-radius:999px;padding:11px 18px;font-size:15px;font-weight:800;background:#fff;color:#1f2a44;box-shadow:0 4px 12px rgba(31,42,68,.12);font-family:inherit}',
'.rt-rest .pin{display:flex;flex-direction:column;gap:8px;align-items:center;background:rgba(255,255,255,.85);border-radius:18px;padding:12px;width:100%}.rt-rest .pin input{font-size:20px;text-align:center;width:150px;padding:8px;border-radius:12px;border:1.5px solid #c9d2e6}',
'.rt-rest .msg{min-height:1.2em;color:#c43c2a;font-weight:700;font-size:14px}',
'.rt-warn{position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 70px);transform:translateX(-50%);z-index:9998;background:#1f2a44;color:#fff;border-radius:999px;padding:10px 16px;font-weight:800;font-size:14px;box-shadow:0 8px 20px rgba(0,0,0,.2);animation:rtin .3s}',
'@keyframes rtfl{50%{transform:translateY(-8px)}}@keyframes rtin{from{opacity:0;transform:translate(-50%,-10px)}}',
'@media (prefers-reduced-motion:reduce){.rt-rest .bot,.rt-warn{animation:none}}'
].join('');

global.CareFactory=function(C){
  var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
  var S=C.Store;

  /* ---------- ① 當機回報 ---------- */
  global.__rtVer=C.version;
  global.__rtCtx=function(){try{return {w:C.who()||'',tab:C.tab()||'',g:C.game()||'',o:C.open()||''}}catch(e){return {}}};
  function flushErr(){var q=global.__rtErrQ;if(!q||!q.length)return;var id=C.who();if(!C.isKid())return;var items=q.splice(0,q.length).filter(function(o){return o.w===id||!o.w});if(!items.length)return;
    S.mut(id,function(k){var a=Array.isArray(k.er)?k.er:[];items.forEach(function(o){var x={t:o.t,k:o.k,m:o.m,s:o.s||'',d:o.d,v:o.v,tab:o.tab,g:o.g,o:o.o,c:o.c||1};if(o.st)x.st=o.st;a.unshift(x)});if(a.length>20)a.length=20;k.er=a})}

  /* ---------- ② 每日學習紀錄 ---------- */
  function subOf(gid){return C.MATH_IDS()[gid]?'m':C.SCI_IDS()[gid]||gid==='lab'?'s':'e'}
  function dayRec(k){var o=k.ds&&typeof k.ds==='object'?k.ds:(k.ds={}),d=dkey(),r=o[d]||(o[d]={});var ks=Object.keys(o).sort();while(ks.length>90)delete o[ks.shift()];return r}
  function inc(r,f,n){r[f]=(+r[f]||0)+(n||0)}
  var aw=S.award;S.award=function(id,pts,gid){var x=aw.apply(S,arguments);try{if(pts)S.mut(id,function(k){inc(dayRec(k),subOf(gid),+pts||0)})}catch(e){}return x};
  var fg=S.finishGame;S.finishGame=function(id,gid,info){var x=fg.apply(S,arguments);try{S.mut(id,function(k){var r=dayRec(k);inc(r,'g',1);if(info&&+info.total>0){inc(r,'r',Math.max(0,+info.score||0));inc(r,'n',+info.total)}if(x)inc(r,subOf(gid),+x||0)})}catch(e){};maybeRest();return x};

  /* ---------- ③ 休息提醒＋活動時間 ---------- */
  var lastInput=0,acc=0,curKid=null,tickT=null,warned=false,due=false,dueAt=0,ov=null,ovT=null;
  ['pointerdown','keydown','touchstart','wheel'].forEach(function(ev){document.addEventListener(ev,function(){lastInput=Date.now()},{capture:true,passive:true})});
  function cfg(id){var t=(S.kid(id)||{}).tm||{};return {off:!!t.off,p:Math.max(5,+t.p||30),r:Math.max(1,+t.r||10)}}
  function rs(id){var r=(S.kid(id)||{}).rs;return r&&typeof r==='object'?r:{}}
  function saveRs(id,o){S.mut(id,function(k){k.rs=o})}
  function inGame(){try{return C.inGame()}catch(e){return false}}
  function subNow(){var o=C.open(),t=C.tab();return t==='chat'?'tq':o==='math'?'tm':o==='sci'?'ts':'te'}
  function tick(){var id=C.who();if(!C.isKid()){curKid=null;return}
    if(curKid!==id){curKid=id;var r=rs(id);acc=+r.a||0;warned=false;due=false;if(r.l&&Date.now()-r.l>cfg(id).r*60000)acc=0;if(r.u&&Date.now()<r.u)return showRest()}
    if(ov)return;var now=Date.now(),active=document.visibilityState==='visible'&&now-lastInput<90000;
    if(!active){var r2=rs(id);if(r2.l&&now-r2.l>cfg(id).r*60000&&acc>0){acc=0;warned=false;saveRs(id,{a:0,l:r2.l})}return}
    var m0=Math.floor(acc/60);acc+=15;var c=cfg(id),min=Math.floor(acc/60);
    if(min>m0)S.mut(id,function(k){var r=dayRec(k);inc(r,'t',1);inc(r,subNow(),1);k.rs={a:acc,l:now,u:(k.rs&&k.rs.u)||0}});
    if(c.off)return;
    if(!warned&&acc>=(c.p-1)*60){warned=true;toast('⏰ 再 1 分鐘就要休息囉！')}
    if(acc>=c.p*60&&!due){due=true;dueAt=now;maybeRest()}
    if(due&&now-dueAt>3*60000)startRest()}
  function maybeRest(){if(!due)return;if(!inGame())startRest()}
  function startRest(){var id=C.who();if(!C.isKid())return;var c=cfg(id),u=Date.now()+c.r*60000;due=false;acc=0;warned=false;saveRs(id,{u:u,a:0,l:Date.now()});showRest()}
  function toast(t){var el=document.createElement('div');el.className='rt-warn';el.textContent=t;document.body.appendChild(el);setTimeout(function(){el.remove()},4500);try{C.say(t,'happy')}catch(e){}}
  function fmt(ms){var s=Math.max(0,Math.ceil(ms/1000));return pad(Math.floor(s/60))+':'+pad(s%60)}
  function showRest(){var id=C.who();if(!id||ov)return;try{C.stopGame()}catch(e){}var r=rs(id),c=cfg(id),total=c.r*60000;
    ov=document.createElement('div');ov.className='rt-rest';ov.setAttribute('role','dialog');ov.setAttribute('aria-label','休息時間');
    ov.innerHTML='<div class="box"><div class="bot">'+C.botSVG('')+'</div><h2>休息一下，眼睛放假囉！</h2><p>'+C.esc(C.name(id))+'，你已經認真玩了 '+c.p+' 分鐘，<br>休息 '+c.r+' 分鐘再回來吧！</p>'+
      '<div class="ring"><svg viewBox="0 0 220 220"><circle cx="110" cy="110" r="96" fill="none" stroke="rgba(63,81,217,.15)" stroke-width="14"/><circle id="rtArc" cx="110" cy="110" r="96" fill="none" stroke="#3f51d9" stroke-width="14" stroke-linecap="round" stroke-dasharray="603" stroke-dashoffset="0"/></svg><div class="clock" id="rtClock">--:--</div></div>'+
      '<div class="tips"><span><b>👀</b>看看遠方<br>20 秒</span><span><b>💧</b>喝一杯水</span><span><b>🙆</b>站起來<br>伸伸懶腰</span></div>'+
      '<div class="row"><button data-a="swap">換別人玩</button><button data-a="pin">家長解鎖</button></div><div class="pin" hidden><span>請家長輸入 4 位數密碼</span><input type="password" inputmode="numeric" maxlength="4" aria-label="家長密碼"><div class="msg"></div><div class="row"><button data-a="ok">解鎖</button><button data-a="x">取消</button></div></div></div>';
    document.body.appendChild(ov);
    function upd(){var left=(rs(id).u||0)-Date.now();if(left<=0){close(true);return}var cl=ov.querySelector('#rtClock'),arc=ov.querySelector('#rtArc');if(cl)cl.textContent=fmt(left);if(arc)arc.setAttribute('stroke-dashoffset',String(603*(1-left/total)))}
    upd();ovT=setInterval(upd,500);
    var pinBox=ov.querySelector('.pin'),inp=pinBox.querySelector('input'),msg=pinBox.querySelector('.msg');
    ov.querySelector('[data-a="swap"]').onclick=function(){close(false);C.toGate()};
    ov.querySelector('[data-a="pin"]').onclick=function(){pinBox.hidden=false;inp.value='';inp.focus()};
    ov.querySelector('[data-a="x"]').onclick=function(){pinBox.hidden=true};
    function tryPin(){var v=inp.value.trim();if(!/^\d{4}$/.test(v)){msg.textContent='請輸入 4 個數字。';return}if(C.checkParentPin(id,v)){saveRs(id,{u:0,a:0,l:Date.now()});close(true);toast('家長解鎖了，可以繼續玩！')}else{msg.textContent='密碼不對喔。';inp.value=''}}
    ov.querySelector('[data-a="ok"]').onclick=tryPin;inp.addEventListener('keydown',function(e){if(e.key==='Enter')tryPin()})}
  function close(done){if(ovT)clearInterval(ovT);ovT=null;if(ov)ov.remove();ov=null;if(done){acc=0;warned=false;try{C.say('休息好了！歡迎回來！','happy')}catch(e){}}}
  function start(){if(tickT)return;tickT=setInterval(function(){try{flushErr();tick()}catch(e){}},15000);setTimeout(function(){try{flushErr();tick()}catch(e){}},1500)}
  start();
  return {onEnter:function(){curKid=null;close(false);setTimeout(function(){try{tick()}catch(e){}},300)},dkey:dkey,subOf:subOf};
};
})(window);
