/* v13 家長後台＋多家長帳號
   - 帳號：總管理員（原本的家長密碼）可以看所有孩子、管理角色與其他家長帳號；
     其他家長帳號只看得到被指派的孩子（kids 清單），看不到別人的孩子。
   - 帳號存在 settings/parent 的 acctJ（[{id,name,pin,kids:[],role}]），總管理員的密碼沿用原本的 pin。
   - 後台分頁：總覽／英文／數學／自然／問答／每日／設定。
   注意：沒有伺服器帳號系統，分開是「畫面上看不到」，不是資料加密。 */
(function(global){
'use strict';
var PS2={e:'en',m:'math',s:'sci'};var SUBC={en:['🔤','英文','#2f7bf6','#e7f0ff'],math:['🔢','數學','#f07d16','#fff1e2'],sci:['🔬','自然','#1f9e6a','#e3f7ee']};
var CSS=[
'.pd{--pd-ink:var(--ink,#1f2a44);--pd-soft:var(--ink-soft,#66728c);--pd-card:var(--surface,#fff);--pd-bg2:var(--surface-2,#f3f5fa);--pd-line:rgba(31,42,68,.09);display:flex;flex-direction:column;gap:14px;color:var(--pd-ink);padding-bottom:20px}',
'.pd *{box-sizing:border-box}.pd button{font-family:inherit;color:inherit;cursor:pointer}',
'.pd-head{display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:22px;color:#fff;background:linear-gradient(135deg,#3f51d9,#7b5cff 60%,#b05cff);box-shadow:0 10px 26px rgba(63,81,217,.25)}',
'.pd-head .av{flex:none;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font-size:22px;font-weight:800;background:rgba(255,255,255,.22)}',
'.pd-head .t{flex:1;min-width:0}.pd-head b{display:block;font-size:19px;line-height:1.2}.pd-head small{opacity:.88;font-size:12.5px}',
'.pd-head .role{display:inline-block;font-size:11px;font-weight:800;background:rgba(255,255,255,.25);border-radius:999px;padding:2px 8px;margin-left:6px;vertical-align:2px}',
'.pd-head .out{flex:none;border:0;border-radius:999px;padding:8px 12px;font-size:13px;font-weight:800;background:rgba(255,255,255,.2);color:#fff}',
'.pd-nav{position:sticky;top:0;z-index:5;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;padding:6px;border-radius:18px;background:var(--pd-card);box-shadow:0 4px 14px rgba(31,42,68,.08);scrollbar-width:none}.pd-nav::-webkit-scrollbar{display:none}',
'.pd-nav button{border:0;border-radius:13px;padding:8px 4px;font-size:13.5px;font-weight:800;background:transparent;color:var(--pd-soft);white-space:nowrap;min-width:0;overflow:hidden;text-overflow:ellipsis}',
'.pd-nav button[aria-pressed="true"]{background:var(--pd-ink);color:#fff}',
'.pd-kids{display:flex;gap:8px;flex-wrap:wrap}.pd-kids button{display:inline-flex;align-items:center;gap:6px;border:0;border-radius:999px;padding:5px 12px 5px 5px;font-weight:800;font-size:14px;background:var(--pd-card);box-shadow:inset 0 0 0 1.5px var(--pd-line)}',
'.pd-kids button .kav,.pd-kids button .kemo{width:28px;height:28px;font-size:20px;border-radius:50%}.pd-kids button[aria-pressed="true"]{box-shadow:inset 0 0 0 2.5px var(--pd-ink);background:var(--pd-bg2)}',
'.pd-sec{background:var(--pd-card);border-radius:22px;padding:16px;box-shadow:0 6px 18px rgba(31,42,68,.07)}',
'.pd-sec>h3{display:flex;align-items:center;gap:8px;margin:0 0 12px;font-size:17px}.pd-sec>h3 small{margin-left:auto;font-size:12px;font-weight:600;color:var(--pd-soft)}',
'.pd-note{font-size:12.5px;color:var(--pd-soft);line-height:1.55;margin:8px 0 0}',
'.pd-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px}',
'.pd-tile{border-radius:16px;padding:12px;background:var(--pd-bg2);min-width:0}.pd-tile small{display:block;font-size:12px;color:var(--pd-soft);font-weight:700}.pd-tile b{display:block;font-size:22px;font-variant-numeric:tabular-nums;line-height:1.25;margin-top:2px}.pd-tile i{font-style:normal;font-size:12px;color:var(--pd-soft)}',
'.pd-tile b.l{font-size:16px;line-height:1.35}.pd-tile.c{background:var(--sb,#eef)}.pd-tile.c b{color:var(--sc,#333)}',
'.pd-kc{border-radius:22px;padding:14px;background:var(--pd-card);box-shadow:0 6px 18px rgba(31,42,68,.07);display:flex;flex-direction:column;gap:12px}',
'.pd-kc .top{display:flex;align-items:center;gap:10px}.pd-kc .top .kav,.pd-kc .top .kemo{width:48px;height:48px;font-size:34px;border-radius:50%}',
'.pd-kc .top b{font-size:19px}.pd-kc .top small{display:block;color:var(--pd-soft);font-size:12.5px}.pd-kc .top .go{margin-left:auto;border:0;border-radius:999px;padding:7px 12px;font-weight:800;font-size:13px;background:var(--pd-bg2)}',
'.pd-subs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}',
'.pd-sub{border:0;text-align:left;border-radius:16px;padding:10px;background:var(--sb);min-width:0}.pd-sub small{display:block;font-weight:800;color:var(--sc);font-size:12.5px}.pd-sub b{display:block;font-size:20px;font-variant-numeric:tabular-nums}.pd-sub i{display:block;font-style:normal;font-size:11.5px;color:var(--pd-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.pd-alert{display:flex;gap:8px;align-items:flex-start;font-size:13px;border-radius:14px;padding:9px 11px;background:#fff6e5;color:#7a4b00;line-height:1.45}.pd-alert.ok{background:#e8f7ee;color:#17603a}',
'.pd-bar{height:8px;border-radius:999px;background:var(--pd-line);overflow:hidden}.pd-bar i{display:block;height:100%;border-radius:999px;background:var(--sc,#4a6cf7)}',
'.pd-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--pd-line)}.pd-row:first-child{border-top:0}.pd-row .n{flex:1;min-width:0}.pd-row .n b{display:block;font-size:14.5px}.pd-row .n small{display:block;font-size:12px;color:var(--pd-soft)}',
'.pd-row .v{flex:none;text-align:right;font-variant-numeric:tabular-nums;font-weight:800}.pd-row .v small{display:block;font-size:11.5px;color:var(--pd-soft);font-weight:600}',
'.pd-chips{display:flex;gap:6px;flex-wrap:wrap}.pd-chip{display:inline-flex;align-items:center;gap:4px;font-size:12.5px;font-weight:700;border-radius:999px;padding:4px 10px;background:var(--pd-bg2)}.pd-chip.bad{background:#ffebe8;color:#b2321f}.pd-chip.good{background:#e3f7ec;color:#17603a}',
'.pd-stars{color:#f5b301;letter-spacing:1px;font-size:13px}.pd-stars s{color:#d9dde7;text-decoration:none}',
'.pd-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}.pd-unit{border-radius:14px;padding:10px;background:var(--pd-bg2);min-width:0}.pd-unit b{display:block;font-size:13.5px}.pd-unit small{font-size:12px;color:var(--pd-soft)}.pd-unit.now{box-shadow:inset 0 0 0 2px var(--sc)}.pd-unit.lock{opacity:.5}',
'.pd-chart{display:flex;align-items:flex-end;gap:5px;height:140px;padding-top:18px}.pd-chart .c{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;height:100%;justify-content:flex-end}',
'.pd-chart .c i{display:block;width:100%;max-width:26px;border-radius:7px 7px 3px 3px;background:linear-gradient(180deg,#7b8cff,#4a5cf0);position:relative}.pd-chart .c i.z{background:var(--pd-line)}.pd-chart .c em{font-style:normal;font-size:10px;color:var(--pd-soft);white-space:nowrap}.pd-chart .c span{font-size:10px;font-weight:800;font-variant-numeric:tabular-nums}',
'.pd-chart .c.today i{background:linear-gradient(180deg,#ffb347,#ff7a2f)}',
'.pd-tbl{width:100%;border-collapse:collapse;font-size:13.5px;font-variant-numeric:tabular-nums}.pd-tbl th,.pd-tbl td{padding:8px 6px;border-top:1px solid var(--pd-line);text-align:right}.pd-tbl th:first-child,.pd-tbl td:first-child{text-align:left}.pd-tbl thead th{border-top:0;color:var(--pd-soft);font-size:12px}',
'.pd-scroll{overflow-x:auto}',
'.pd-q{border-top:1px solid var(--pd-line);padding:10px 0}.pd-q:first-child{border-top:0}.pd-q summary{cursor:pointer;list-style:none}.pd-q summary::-webkit-details-marker{display:none}.pd-q summary b{display:block;font-size:14.5px}.pd-q summary small{color:var(--pd-soft);font-size:12px}.pd-q .ans{margin-top:8px;padding:10px 12px;border-radius:12px;background:var(--pd-bg2);font-size:13.5px;line-height:1.55}',
'.pd-btn{border:0;border-radius:12px;padding:9px 13px;font-size:14px;font-weight:800;background:var(--pd-bg2)}.pd-btn.pri{background:var(--pd-ink);color:#fff}.pd-btn.dg{background:#ffe3df;color:#b2321f}.pd-btn.sm{padding:6px 10px;font-size:12.5px}',
'.pd-form{display:flex;flex-direction:column;gap:10px;padding:12px;border-radius:16px;background:var(--pd-bg2)}.pd-form input[type=text],.pd-form input[type=password]{width:100%;font-size:16px;padding:10px 12px;border-radius:12px;border:1.5px solid var(--pd-line);background:var(--pd-card);color:var(--pd-ink)}',
'.pd-form label{font-size:13px;font-weight:800}.pd-pick{display:flex;gap:6px;flex-wrap:wrap}.pd-pick button{display:inline-flex;align-items:center;gap:5px;border:0;border-radius:999px;padding:6px 11px;font-size:13.5px;font-weight:800;background:var(--pd-card);box-shadow:inset 0 0 0 1.5px var(--pd-line)}.pd-pick button[aria-pressed="true"]{background:#e7ecff;box-shadow:inset 0 0 0 2px #4a5cf0;color:#2b3bb8}',
'.pd-acct{display:flex;flex-direction:column;gap:8px;padding:12px 0;border-top:1px solid var(--pd-line)}.pd-acct:first-of-type{border-top:0}.pd-acct .h{display:flex;align-items:center;gap:10px}.pd-acct .h .av{flex:none;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-weight:800;background:#e7ecff;color:#2b3bb8}.pd-acct .h b{display:block}.pd-acct .h small{color:var(--pd-soft);font-size:12px}',
'.pd-acct .act{display:flex;gap:6px;flex-wrap:wrap}.pd-msg{min-height:1.2em;font-size:13px;font-weight:700;color:#c43c2a}',
'.pd .rost,.pd .mbp{margin:0;background:none;box-shadow:none;padding:0}',
'.pd-sec .fm-rw{margin:0;box-shadow:none}',
/* 登入 */
'.pa-list{display:flex;flex-direction:column;gap:10px;width:100%;max-width:360px;margin:6px auto 0}',
'.pa-list button{display:flex;align-items:center;gap:12px;text-align:left;border:0;border-radius:18px;padding:12px 14px;background:var(--surface,#fff);box-shadow:0 6px 16px rgba(31,42,68,.1);color:var(--ink,#1f2a44)}',
'.pa-list .av{flex:none;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:18px;background:#e7ecff;color:#2b3bb8}.pa-list .av.ad{background:linear-gradient(135deg,#3f51d9,#b05cff);color:#fff}',
'.pa-list b{display:block;font-size:16px}.pa-list small{display:block;font-size:12.5px;color:var(--ink-soft,#66728c)}',
'@media (max-width:380px){.pd-subs{grid-template-columns:1fr}.pd-sub{display:flex;align-items:center;gap:10px}.pd-sub b{margin-left:auto}}'
].join('');

global.ParentFactory=function(C){
  var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
  var S=C.Store,esc=C.esc,cur=null,tab='overview',kidSel=null,ui={},msgs={};
  /* ---------- 帳號 ---------- */
  function list(){var a=S.accts?S.accts():[];return Array.isArray(a)?a.filter(function(x){return x&&x.id}):[]}
  function adminName(){var a=list().filter(function(x){return x.id==='admin'})[0];return (a&&a.name)||'Carlos'}
  function parents(){return list().filter(function(x){return x.id!=='admin'})}
  function save(arr){S.setAccts(arr)}
  function upsert(o){var a=list().filter(function(x){return x.id!==o.id});a.push(o);save(a)}
  function acct(){if(!cur)return null;if(cur==='admin')return {id:'admin',name:adminName(),role:'admin'};return parents().filter(function(x){return x.id===cur})[0]||null}
  function isAdmin(){return cur==='admin'}
  function kids(){var all=C.KIDS();if(!cur||isAdmin())return all;var a=acct();if(!a)return [];return all.filter(function(k){return (a.kids||[]).indexOf(k.id)>=0})}
  function initial(n){n=String(n||'?').trim();return esc(n.slice(0,1).toUpperCase())}
  function kidNames(ids){return C.KIDS().filter(function(k){return ids.indexOf(k.id)>=0}).map(function(k){return k.short}).join('、')||'還沒指派孩子'}

  /* ---------- 登入畫面（取代原本的單一家長密碼） ---------- */
  function renderPin(){var gate=C.gate();C.setGateMode('pin');if(!S.pinLoaded()){gate.innerHTML='<div class="gate-in"><div class="gmas">'+C.botSVG('')+'</div><h1>家長區</h1><div class="pinbox"><p>連線中，請稍等……</p><button class="btn ghost" id="pinBack">← 回去選帳號</button></div></div>';gate.querySelector('#pinBack').onclick=function(){C.sfx('tap');C.renderGate()};return}
    var ps=parents(),h='<div class="gate-in"><div class="gmas">'+C.botSVG('')+'</div><h1>家長區</h1><p class="sub">選你的家長帳號，再輸入 4 位數密碼。</p><div class="pa-list">';
    h+='<button data-pa="admin"><span class="av ad">'+initial(adminName())+'</span><span><b>'+esc(adminName())+'</b><small>總管理員・可以看全部孩子</small></span></button>';
    ps.forEach(function(p){h+='<button data-pa="'+esc(p.id)+'"><span class="av">'+initial(p.name)+'</span><span><b>'+esc(p.name)+'</b><small>'+esc(kidNames(p.kids||[]))+'</small></span></button>'});
    h+='</div><button class="btn ghost" id="pinBack" style="margin-top:14px">← 回去選帳號</button></div>';gate.innerHTML=h;
    gate.querySelector('#pinBack').onclick=function(){C.sfx('tap');C.renderGate()};
    gate.querySelectorAll('[data-pa]').forEach(function(b){b.onclick=function(){C.sfx('tap');pinFor(b.dataset.pa)}});
    if(!ps.length)pinFor('admin',true)}
  function pinFor(id,only){var gate=C.gate(),a=id==='admin'?{id:'admin',name:adminName(),pin:S.getPin()}:parents().filter(function(x){return x.id===id})[0];if(!a)return renderPin();
    var first=!a.pin,h='<div class="gate-in"><div class="gmas">'+C.botSVG('')+'</div><h1>'+esc(a.name)+'</h1><div class="pinbox"><p>'+(first?'第一次登入，請設定 4 位數密碼：':'請輸入 4 位數密碼：')+'</p>'+
      '<input id="pinIn" type="password" inputmode="numeric" maxlength="4" autocomplete="off" aria-label="密碼">'+(first?'<input id="pinIn2" type="password" inputmode="numeric" maxlength="4" autocomplete="off" aria-label="再輸入一次">':'')+
      '<div id="pinMsg" role="alert"></div><button class="btn" id="pinOk">'+(first?'設定並進入':'進入')+'</button><small>'+(id==='admin'?'總管理員可以看所有孩子，也可以新增其他家長帳號。':'只會看到指派給這個帳號的孩子。')+'</small>'+
      '<button class="btn ghost" id="pinBack">'+(only?'← 回去選帳號':'← 換一個家長帳號')+'</button></div></div>';gate.innerHTML=h;
    function go(){var v=gate.querySelector('#pinIn').value.trim(),msg=gate.querySelector('#pinMsg');if(!/^\d{4}$/.test(v)){msg.textContent='請輸入 4 個數字。';return}
      if(first){if(v!==gate.querySelector('#pinIn2').value.trim()){msg.textContent='兩次輸入不一樣，再試一次。';return}
        if(id==='admin')S.setPin(C.hashPin(v));else{a.pin=C.hashPin(v);upsert(a)}login(id);return}
      if(C.hashPin(v)===a.pin)login(id);else{C.sfx('no');msg.textContent='密碼不對喔。';gate.querySelector('#pinIn').value='';gate.querySelector('#pinIn').focus()}}
    gate.querySelector('#pinOk').onclick=go;gate.querySelectorAll('input').forEach(function(i){i.addEventListener('keydown',function(e){if(e.key==='Enter')go()})});
    gate.querySelector('#pinBack').onclick=function(){C.sfx('tap');only?C.renderGate():renderPin()};gate.querySelector('#pinIn').focus()}
  function login(id){cur=id;tab='overview';kidSel=null;ui={};C.enter('parent')}
  function logout(){cur=null;C.logout()}

  /* ---------- 資料整理 ---------- */
  function subOf(gid){return C.MATH_IDS()[gid]?'math':C.SCI_IDS()[gid]||gid==='lab'?'sci':'en'}
  function dkey(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
  function days(n){var o=[],now=new Date();for(var i=0;i<n;i++){var d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-i);o.push({k:dkey(d),d:d})}return o}
  function dp(id){var o=(S.kid(id)||{}).dp;return o&&typeof o==='object'?o:{}}
  function sumDays(id,n){var o=dp(id),t=0;days(n).forEach(function(x){t+=+o[x.k]||0});return t}
  function actsOf(id){return S.activity().filter(function(a){return a.kid===id})}
  function lastSeen(id){var a=actsOf(id)[0];return a?a.ts:0}
  function ago(ts){if(!ts)return '還沒有紀錄';var d=Math.floor((Date.now()-ts)/864e5);if(d<=0){var h=Math.floor((Date.now()-ts)/36e5);return h<1?'剛剛':h+' 小時前'}return d===1?'昨天':d+' 天前'}
  function num(n){return (+n||0).toLocaleString()}
  function stars(n){n=Math.max(0,Math.min(3,n|0));return '<span class="pd-stars">'+'★'.repeat(n)+'<s>'+'★'.repeat(3-n)+'</s></span>'}
  function rvInfo(id,sub){var k=S.kid(id)||{},D=k.pg&&k.pg[sub],rv=D&&D.rv||{},t=C.dayN(),n=0,due=0,hard=[];for(var key in rv){var it=rv[key];if(!Array.isArray(it))continue;n++;if(+it[1]<=t)due++;if(+it[2]>=2)hard.push([key,+it[2],it[3]])}hard.sort(function(a,b){return b[1]-a[1]});return {n:n,due:due,hard:hard}}
  function progLine(id,sub){var P=C.PGX(),Sx=P&&P.state(id,sub);if(!Sx)return null;var stt=Sx.D&&Sx.D.st?Sx.D.st[Sx.uid]:null;return {S:Sx,ans:stt?+stt[0]:0,acc:stt&&+stt[0]?Math.round(100*(+stt[1]||0)/(+stt[0])):null,lead:Sx.cur-Sx.cal}}
  function gamesOf(id,sub){var g=(S.kid(id)||{}).byGame||{},o=[];for(var gid in g){if(subOf(gid)!==sub)continue;var x=g[gid];o.push({gid:gid,name:C.gInfo(gid),pts:+x.pts||0,plays:+x.plays||0,best:+x.best||0,v2:x.v2})}return o.sort(function(a,b){return b.pts-a.pts})}
  function weakWords(id){var k=S.kid(id)||{},m=k.m||{},o=[];C.WORDS.forEach(function(w){var e=m[w[0]];if(e&&C.Learn.st(k,w[0])===1)o.push(w)});return o}

  /* ---------- 共用元件 ---------- */
  function kidBtns(sel){var ks=kids();return '<div class="pd-kids">'+ks.map(function(k){return '<button data-kid="'+k.id+'" aria-pressed="'+(k.id===sel)+'">'+C.kface(k)+esc(k.short)+'</button>'}).join('')+'</div>'}
  function subTile(sub,label,val,sub2){var c=SUBC[sub]||SUBC[PS2[sub]];return '<div class="pd-tile c" style="--sb:'+c[3]+';--sc:'+c[2]+'"><small>'+c[0]+' '+label+'</small><b'+(String(val).replace(/<[^>]+>/g,'').length>7?' class="l"':'')+'>'+val+'</b>'+(sub2?'<i>'+sub2+'</i>':'')+'</div>'}
  function tile(label,val,sub2){return '<div class="pd-tile"><small>'+label+'</small><b>'+val+'</b>'+(sub2?'<i>'+sub2+'</i>':'')+'</div>'}
  function sec(title,body,right){return '<section class="pd-sec"><h3>'+title+(right?'<small>'+right+'</small>':'')+'</h3>'+body+'</section>'}
  function gameRows(id,sub){var gs=gamesOf(id,sub);if(!gs.length)return '<p class="pd-note">還沒有玩過這一科的遊戲。</p>';
    return gs.slice(0,12).map(function(g){return '<div class="pd-row"><div class="n"><b>'+g.name+'</b><small>玩了 '+g.plays+' 次・最高 '+num(g.best)+' 分'+(g.v2&&g.v2.stars?'・'+stars(g.v2.stars):'')+'</small></div><div class="v">'+num(g.pts)+'<small>累積分數</small></div></div>'}).join('')}
  function recentRows(id,sub,n){var a=actsOf(id).filter(function(x){return x.type==='game'&&subOf(x.gid)===sub}).slice(0,n||10);if(!a.length)return '<p class="pd-note">最近沒有這一科的遊戲紀錄。</p>';
    return a.map(function(x){var acc=x.total?Math.round(100*x.score/x.total):null;return '<div class="pd-row"><div class="n"><b>'+C.gInfo(x.gid)+'</b><small>'+esc(C.fmtTime(x.ts))+(x.total?'・答對 '+x.score+'/'+x.total:'')+'</small></div><div class="v">+'+num(x.pts)+(acc!==null?'<small>'+acc+'%</small>':'')+'</div></div>'}).join('')}
  function rvBlock(id,sub){var r=rvInfo(id,sub);if(!r.n)return '<div class="pd-alert ok">✅ 錯題箱是空的，目前沒有需要複習的題目。</div>';
    return '<div class="pd-tiles" style="margin-bottom:10px">'+tile('錯題箱',r.n+' 題')+tile('今天該複習',r.due+' 題')+tile('錯 2 次以上',r.hard.length+' 題')+'</div>'+
      (r.hard.length?'<div class="pd-chips">'+r.hard.slice(0,12).map(function(x){return '<span class="pd-chip bad">'+esc(x[0])+(x[2]&&x[2]!==0&&x[2]!=='0'?' = '+esc(String(x[2])):'')+' ×'+x[1]+'</span>'}).join('')+'</div><p class="pd-note">紅色是常錯的題目，可以陪孩子一起看看。答對後會隔 1、3、7、14 天再出現，連續答對就從錯題箱畢業。</p>':'')}
  function unitsBlock(id,sub){var p=progLine(id,sub);if(!p)return '<p class="pd-note">這個年級還沒有進度表。</p>';var Sx=p.S,c=(SUBC[sub]||SUBC[PS2[sub]])[2];
    return '<div class="pd-grid2" style="--sc:'+c+'">'+Sx.units.map(function(u,i){var now=i===Sx.cur,done=i<Sx.cur,stt=Sx.D&&Sx.D.st&&Sx.D.st[u[0]];
      return '<div class="pd-unit'+(now?' now':'')+(i>Sx.cur?' lock':'')+'"><b>'+(done?'✅ ':now?'📍 ':'')+(i+1)+'. '+esc(u[1])+'</b><small>第 '+u[2]+'～'+u[3]+' 週'+(Array.isArray(stt)&&+stt[0]?'・答 '+stt[0]+' 題 '+Math.round(100*(+stt[1]||0)/(+stt[0]))+'%':'')+(i===Sx.cal&&!now?'・學校在這':'')+'</small></div>'}).join('')+'</div>'}
  function progHead(id,sub){var p=progLine(id,sub);if(!p)return '';var Sx=p.S;
    return '<div class="pd-tiles">'+subTile(sub,'正在練',esc(Sx.U[1].replace(/^Unit \d+ /,'')),esc(Sx.book)+'・第 '+(Sx.cur+1)+' 單元')+tile('學校進度','第 '+(Sx.cal+1)+' 單元',Sx.manual?'家長手動設定':'依行事曆・第 '+Sx.sem.wk+' 週')+
      tile('本單元答題',p.ans+' 題',p.acc!==null?'正確率 '+p.acc+'%':'還沒開始')+tile('超前',p.lead>0?'⚡ '+p.lead+' 單元':'跟學校同步',p.lead>0?'熟練後自動前進':'答對 90% 且滿 20 題會前進')+'</div>'}

  /* ---------- 分頁：總覽 ---------- */
  function overview(){var ks=kids();if(!ks.length)return sec('👋 歡迎','<p>這個帳號還沒有被指派孩子。請總管理員到「設定 › 家長帳號」幫你勾選孩子。</p>');
    var h='';var today=days(1)[0].k;
    ks.forEach(function(k){var d=S.kid(k.id)||{},e=C.growOf(k.id,'en'),m=C.growOf(k.id,'math'),sp=C.subPts(d,'sci'),L=C.scLevel(sp),info=C.Learn.info(k.id),ls=lastSeen(k.id),t0=+dp(k.id)[today]||0,w7=sumDays(k.id,7);
      var pe=progLine(k.id,'e'),pm=progLine(k.id,'m'),ps=progLine(k.id,'s'),alerts=[];
      var rvm=rvInfo(k.id,'m'),rve=rvInfo(k.id,'e');
      if(!ls||Date.now()-ls>3*864e5)alerts.push('⏰ '+(ls?'已經 '+ago(ls)+'沒來練習了':'還沒有開始玩'));
      if(rvm.hard.length+rve.hard.length>=5)alerts.push('📕 有 '+(rvm.hard.length+rve.hard.length)+' 題常錯的題目，可以到英文／數學分頁看看');
      if(pm&&pm.acc!==null&&pm.ans>=10&&pm.acc<60)alerts.push('🔢 數學「'+pm.S.U[1]+'」正確率只有 '+pm.acc+'%');
      if(pe&&pe.acc!==null&&pe.ans>=10&&pe.acc<60)alerts.push('🔤 英文「'+pe.S.U[1]+'」正確率只有 '+pe.acc+'%');
      h+='<div class="pd-kc"><div class="top">'+C.kface(k)+'<div><b>'+esc(k.name)+'</b><small>'+(C.PGX()&&C.PGX().gradeStr(k.id)?C.PGX().gradeStr(k.id)+'年級・':'')+'最近一次：'+ago(ls)+'・連續 '+info.streak+' 天 🔥</small></div><button class="go" data-goto="'+k.id+'">詳細 ›</button></div>'+
        '<div class="pd-tiles">'+tile('今天',num(t0)+' 分')+tile('近 7 天',num(w7)+' 分')+tile('總分',num(d.pts)+' 分')+tile('今日任務',info.p.filter(function(x,i){return x>=info.q[i].n}).length+' / 3',info.done?'全部完成 ✅':'')+'</div>'+
        '<div class="pd-subs">'+
          '<button class="pd-sub" data-jump="en:'+k.id+'" style="--sb:'+SUBC.en[3]+';--sc:'+SUBC.en[2]+'"><small>🔤 英文</small><b>'+num(C.subPts(d,'en'))+'</b><i>'+(pe?esc(pe.S.U[1].replace(/^Unit \d+ /,'')):esc(e.lv[1]))+'</i></button>'+
          '<button class="pd-sub" data-jump="math:'+k.id+'" style="--sb:'+SUBC.math[3]+';--sc:'+SUBC.math[2]+'"><small>🔢 數學</small><b>'+num(C.subPts(d,'math'))+'</b><i>'+(pm?esc(pm.S.U[1]):esc(m.lv[1]))+'</i></button>'+
          '<button class="pd-sub" data-jump="sci:'+k.id+'" style="--sb:'+SUBC.sci[3]+';--sc:'+SUBC.sci[2]+'"><small>🔬 自然</small><b>'+num(sp)+'</b><i>'+(ps?esc(ps.S.U[1]):esc(L.name))+'</i></button></div>'+
        (alerts.length?alerts.map(function(a){return '<div class="pd-alert">'+esc(a)+'</div>'}).join(''):'<div class="pd-alert ok">✅ 一切順利，繼續保持！</div>')+'</div>'});
    if(ks.length>1){var rk=ks.slice().sort(function(a,b){return sumDays(b.id,7)-sumDays(a.id,7)});h+=sec('🏆 近 7 天練習排行',rk.map(function(k,i){return '<div class="pd-row"><div class="n"><b>'+(['🥇','🥈','🥉'][i]||(i+1)+'.')+' '+esc(k.name)+'</b></div><div class="v">'+num(sumDays(k.id,7))+'<small>分</small></div></div>'}).join(''))}
    h+='<div id="pdFam"></div>';return h}

  /* ---------- 分頁：各科 ---------- */
  function subject(sub){var ks=kids();if(!ks.length)return overview();if(!kidSel||!ks.some(function(k){return k.id===kidSel}))kidSel=ks[0].id;var id=kidSel,d=S.kid(id)||{},c=SUBC[sub],ps=sub==='en'?'e':sub==='math'?'m':'s';
    var h=kidBtns(id),G=sub==='sci'?null:C.growOf(id,sub),pts=C.subPts(d,sub),acts=actsOf(id).filter(function(x){return x.type==='game'&&subOf(x.gid)===sub}),wk=acts.filter(function(x){return Date.now()-x.ts<7*864e5});
    h+=sec(c[0]+' '+c[1]+'概況','<div class="pd-tiles">'+subTile(sub,'累積分數',num(pts),G?'等級：'+esc(G.lv[1]):'等級：'+esc(C.scLevel(pts).name))+tile('近 7 天玩了',wk.length+' 局',wk.length?'平均正確率 '+Math.round(100*wk.reduce(function(a,x){return a+(x.total?x.score/x.total:0)},0)/Math.max(1,wk.filter(function(x){return x.total}).length))+'%':'')+
      (sub==='en'?tile('學會的單字',C.Learn.stats(id).w+' 個','要加強 '+C.Learn.stats(id).wl+' 個'):sub==='math'?tile('九九乘法學會',C.Learn.stats(id).t+' / 64','要加強 '+C.Learn.stats(id).tl+' 題'):tile('第一島印章',C.scStampsAny(id)+' / 10',''))+'</div>');
    if(C.PGX()&&C.PGX().state(id,ps))h+=sec('📘 學校進度',progHead(id,ps)+'<div style="margin-top:12px">'+unitsBlock(id,ps)+'</div>',esc(C.PGX().state(id,ps).book));
    if(sub!=='sci')h+=sec('📕 錯題箱',rvBlock(id,ps));
    if(sub==='en'){var ww=weakWords(id);h+=sec('🔁 要加強的單字',ww.length?'<div class="pd-chips">'+ww.slice(0,30).map(function(w){return '<span class="pd-chip bad">'+w[1]+' '+esc(w[0])+' '+esc(w[2])+'</span>'}).join('')+'</div>':'<div class="pd-alert ok">✅ 目前沒有要加強的單字。</div>')}
    if(sub==='math'){var mu=d.mu||{},P=C.PGX(),Sx=P&&P.state(id,'m');if(Sx){var rows=Sx.units.map(function(u){var r=Array.isArray(mu[u[0]])?mu[u[0]]:[0,0,0,0];return '<div class="pd-row"><div class="n"><b>'+esc(u[1])+'</b><small>第 1 關 '+stars(r[0])+'　第 2 關 '+stars(r[1])+'　第 3 關 '+stars(r[2])+'</small></div><div class="v">'+(r[3]?'🏅':'')+'</div></div>'}).join('');h+=sec('📘 課本闖關星星',rows,'🏅 = 拿到成就卡')}}
    if(sub==='sci'){var stn=C.STN().map(function(s2){var r=C.scRowG(id,s2.k,C.scOwnG(id));return '<div class="pd-row"><div class="n"><b>'+esc(s2.zh)+'</b><small>'+stars(r[0])+' '+stars(r[1])+' '+stars(r[2])+'</small></div><div class="v">'+(r[0]&&r[1]&&r[2]?'✅':'')+'</div></div>'}).join('');
      var L=(d.lab&&d.lab.st)||{},g=C.scOwnG(id),lab=Object.keys(C.LABN).map(function(k2){var r=L[k2+'@'+g];r=Array.isArray(r)?r:[0,0,0,0];return '<div class="pd-row"><div class="n"><b>'+esc(C.LABN[k2])+'</b><small>'+stars(r[0])+' '+stars(r[1])+' '+stars(r[2])+'</small></div><div class="v">'+(r[3]?'✅':'')+'</div></div>'}).join('');
      h+=sec('🏝️ 第一島：自然探險島',stn,g+' 年級題庫')+sec('🔬 第二島：奇蹟研究所',lab,g+' 年級題庫')}
    h+=sec('🎮 各遊戲累積',gameRows(id,sub))+sec('🕘 最近玩的',recentRows(id,sub,12));return h}

  /* ---------- 分頁：問答 ---------- */
  function qa(){var ks=kids();if(!ks.length)return overview();if(!kidSel||!ks.some(function(k){return k.id===kidSel}))kidSel=ks[0].id;var qs=actsOf(kidSel).filter(function(a){return a.type==='q'});
    var h=kidBtns(kidSel)+sec('💬 問小機老師的問題',qs.length?qs.slice(0,60).map(function(q){return '<details class="pd-q"><summary><b>'+esc(q.q)+'</b><small>'+esc(C.fmtTime(q.ts))+'・'+esc(q.subject||'全部')+'</small></summary><div class="ans">'+(q.a?esc(q.a).replace(/\n/g,'<br>'):'（沒有回答）')+'</div></details>'}).join(''):'<p class="pd-note">還沒有問過問題。</p>',qs.length+' 題');return h}

  /* ---------- 分頁：每日 ---------- */
  function daily(){var ks=kids();if(!ks.length)return overview();if(!kidSel||!ks.some(function(k){return k.id===kidSel}))kidSel=ks[0].id;var id=kidSel,o=dp(id),ds=days(14).reverse(),max=1,W=['日','一','二','三','四','五','六'];
    ds.forEach(function(x){max=Math.max(max,+o[x.k]||0)});var played=ds.filter(function(x){return +o[x.k]>0}).length;
    var chart='<div class="pd-chart">'+ds.map(function(x,i){var v=+o[x.k]||0;return '<div class="c'+(i===ds.length-1?' today':'')+'"><span>'+(v?num(v):'')+'</span><i class="'+(v?'':'z')+'" style="height:'+(v?Math.max(6,Math.round(100*v/max)):4)+'%"></i><em>'+(i===0||x.d.getDate()===1?(x.d.getMonth()+1)+'/':'')+x.d.getDate()+'</em></div>'}).join('')+'</div>';
    var h=kidBtns(id)+sec('📅 近 14 天每天的分數',chart+'<div class="pd-tiles" style="margin-top:10px">'+tile('今天',num(+o[days(1)[0].k]||0)+' 分')+tile('近 7 天',num(sumDays(id,7))+' 分')+tile('14 天裡有玩',played+' 天')+tile('每天平均',num(Math.round(sumDays(id,14)/14))+' 分')+'</div><p class="pd-note">只算玩遊戲得到的分數（英文＋數學＋自然），家長加減分不算在內。</p>');
    var acts=actsOf(id).filter(function(a){return a.type==='game'}),bySub={};days(7).forEach(function(x){bySub[x.k]={en:0,math:0,sci:0,n:0}});acts.forEach(function(a){var k=dkey(new Date(a.ts));if(bySub[k]){bySub[k][subOf(a.gid)]+=+a.pts||0;bySub[k].n++}});
    h+=sec('📊 近 7 天各科分數','<div class="pd-scroll"><table class="pd-tbl"><thead><tr><th>日期</th><th>🔤 英文</th><th>🔢 數學</th><th>🔬 自然</th><th>局數</th></tr></thead><tbody>'+days(7).map(function(x,i){var r=bySub[x.k];return '<tr><td>'+(i===0?'今天 ':'')+(x.d.getMonth()+1)+'/'+x.d.getDate()+'（'+W[x.d.getDay()]+'）</td><td>'+num(r.en)+'</td><td>'+num(r.math)+'</td><td>'+num(r.sci)+'</td><td>'+r.n+'</td></tr>'}).join('')+'</tbody></table></div><p class="pd-note">各科分數是從最近的遊戲紀錄加總（雲端最多保留最近 200 筆），可能比上面的每日總分少一點。</p>');
    return h}

  /* ---------- 分頁：設定 ---------- */
  function settings(){var ks=kids(),h='',a=acct();
    var P=C.PGX();if(P&&ks.length){h+=sec('📘 學校進度設定','<div id="pdProg">'+P.parentHtml(ks,C.kface,esc)+'</div>')}
    h+=sec('🔑 我的帳號','<div class="pd-acct"><div class="h"><span class="av">'+initial(a.name)+'</span><div><b>'+esc(a.name)+'</b><small>'+(isAdmin()?'總管理員・可以看全部孩子':'看得到：'+esc(kidNames(a.kids||[])))+'</small></div></div>'+
      (ui.me?'<div class="pd-form"><label>新名字（可不改）</label><input type="text" id="pdMeName" maxlength="12" value="'+esc(a.name)+'"><label>目前密碼</label><input type="password" id="pdMeOld" inputmode="numeric" maxlength="4"><label>新密碼（4 個數字，不改就留空）</label><input type="password" id="pdMeNew" inputmode="numeric" maxlength="4"><div class="pd-msg" id="pdMeMsg"></div><div class="act" style="display:flex;gap:8px"><button class="pd-btn pri" data-act="meSave">儲存</button><button class="pd-btn" data-act="meX">取消</button></div></div>':
      '<div class="act"><button class="pd-btn" data-act="me">✏️ 改名字或密碼</button></div>')+'</div>');
    if(!isAdmin()){h+=sec('🔒 孩子的登入密碼',ks.map(function(k){var has=!!(S.kid(k.id)||{}).pin;return '<div class="pd-row"><div class="n"><b>'+C.kface(k)+' '+esc(k.name)+'</b><small>'+(has?'已設定密碼':'還沒設密碼')+'</small></div>'+(has?'<button class="pd-btn sm" data-kpin="'+k.id+'">重設密碼</button>':'')+'</div>'}).join('')+'<p class="pd-note">重設後，孩子下次進來會重新設定自己的密碼。</p>');return h}
    /* 總管理員才有：家長帳號、角色管理、歸零 */
    var ps=parents(),body='';
    body+='<div class="pd-acct"><div class="h"><span class="av" style="background:linear-gradient(135deg,#3f51d9,#b05cff);color:#fff">'+initial(adminName())+'</span><div><b>'+esc(adminName())+'</b><small>總管理員・全部孩子：'+esc(C.KIDS().map(function(k){return k.short}).join('、'))+'</small></div></div></div>';
    ps.forEach(function(p){var ed=ui.edit===p.id;body+='<div class="pd-acct"><div class="h"><span class="av">'+initial(p.name)+'</span><div><b>'+esc(p.name)+'</b><small>看得到：'+esc(kidNames(p.kids||[]))+'・'+(p.pin?'已設定密碼':'第一次登入時設定密碼')+'</small></div></div>'+
      (ed?acctForm(p):'<div class="act"><button class="pd-btn sm" data-edit="'+p.id+'">✏️ 修改</button>'+(p.pin?'<button class="pd-btn sm" data-reset="'+p.id+'">🔑 重設密碼</button>':'')+'<button class="pd-btn sm dg" data-del="'+p.id+'">'+(ui.del===p.id?'⚠️ 再按一次確定刪除':'🗑 刪除')+'</button></div>')+'</div>'});
    body+=ui.edit==='new'?'<div class="pd-acct">'+acctForm(null)+'</div>':'<button class="pd-btn pri" data-act="new" style="margin-top:8px">＋ 新增家長帳號</button>';
    body+='<p class="pd-note">每個家長帳號只看得到勾選的孩子。同一個孩子可以給好幾個帳號（例如爸爸、媽媽）。密碼可以先留空，對方第一次登入時自己設定。</p>';
    h+=sec('👨‍👩‍👧 家長帳號',body,(ps.length+1)+' 個帳號');
    h+=sec('👥 孩子角色','<div id="pdRoster">'+C.rosterHtml()+'</div>');
    h+=sec('🗑 全部歸零',(ui.clr?'<button class="pd-btn dg" data-act="clr2">⚠️ 再按一次「確定全部歸零」</button> <button class="pd-btn" data-act="clrX">取消</button>':'<button class="pd-btn dg" data-act="clr">全部歸零（分數、等級、紀錄）</button>')+'<p class="pd-note">會把「所有孩子」的分數、等級、問過的問題和遊戲紀錄全部清空，沒辦法復原。</p>');
    return h}
  function acctForm(p){var sel=ui.kids||[];return '<div class="pd-form"><label>家長名字</label><input type="text" id="pdAName" maxlength="12" placeholder="例如：Leon 媽媽" value="'+esc(ui.name!=null?ui.name:(p?p.name:''))+'">'+
    '<label>看得到哪些孩子</label><div class="pd-pick">'+C.KIDS().map(function(k){return '<button data-pk="'+k.id+'" aria-pressed="'+(sel.indexOf(k.id)>=0)+'">'+C.kface(k)+esc(k.short)+'</button>'}).join('')+'</div>'+
    (p?'':'<label>密碼（4 個數字，可留空讓對方第一次登入時自己設）</label><input type="password" id="pdAPin" inputmode="numeric" maxlength="4">')+
    '<div class="pd-msg" id="pdAMsg"></div><div style="display:flex;gap:8px"><button class="pd-btn pri" data-act="aSave">'+(p?'儲存':'建立帳號')+'</button><button class="pd-btn" data-act="aX">取消</button></div></div>'}

  /* ---------- 主畫面 ---------- */
  var TABS=[['overview','🏠 總覽'],['en','🔤 英文'],['math','🔢 數學'],['sci','🔬 自然'],['qa','💬 問答'],['daily','📅 每日'],['settings','⚙️ 設定']];
  function render(force){var el=C.PANELS.rec;if(!el)return;var ae=document.activeElement;if(!force&&ae&&el.contains(ae)&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName))return;var a=acct();if(!a){cur='admin';a=acct()}
    var fam=null;if(tab==='overview'){try{C.renderPrev();fam=el.querySelector('.fm-parent');if(fam)fam.remove()}catch(e){}}
    var body=tab==='overview'?overview():tab==='en'||tab==='math'||tab==='sci'?subject(tab):tab==='qa'?qa():tab==='daily'?daily():settings();
    el.innerHTML='<div class="pd"><div class="pd-head"><span class="av">'+initial(a.name)+'</span><div class="t"><b>'+esc(a.name)+(isAdmin()?'<span class="role">總管理員</span>':'')+'</b><small>'+(isAdmin()?'可以看全部孩子・管理家長帳號':'看得到：'+esc(kidNames(a.kids||[])))+'</small></div><button class="out" data-act="out">登出</button></div>'+
      '<nav class="pd-nav" aria-label="家長後台分頁">'+TABS.map(function(t){return '<button data-tab2="'+t[0]+'" aria-pressed="'+(t[0]===tab)+'">'+t[1]+'</button>'}).join('')+'</nav>'+body+'</div>';
    if(fam){var slot=el.querySelector('#pdFam');if(slot){var s2=document.createElement('section');s2.className='pd-sec';s2.innerHTML='<h3>🎁 獎勵兌換</h3>';s2.appendChild(fam);slot.replaceWith(s2)}}
    wire(el)}
  function wire(el){
    el.querySelectorAll('[data-tab2]').forEach(function(b){b.onclick=function(){C.sfx('tap');tab=b.dataset.tab2;ui={};render(true);try{C.PANELS.rec.scrollTop=0}catch(e){}}});
    el.querySelectorAll('[data-kid]').forEach(function(b){b.onclick=function(){C.sfx('tap');kidSel=b.dataset.kid;render(true)}});
    el.querySelectorAll('[data-goto]').forEach(function(b){b.onclick=function(){C.sfx('tap');kidSel=b.dataset.goto;tab='en';render(true)}});
    el.querySelectorAll('[data-jump]').forEach(function(b){b.onclick=function(){C.sfx('tap');var p=b.dataset.jump.split(':');tab=p[0];kidSel=p[1];render(true);try{C.PANELS.rec.scrollTop=0}catch(e){}}});
    function on(sel,f){var x=el.querySelector(sel);if(x)x.onclick=f}
    on('[data-act="out"]',function(){C.sfx('tap');logout()});
    if(tab!=='settings')return;
    var pg=el.querySelector('#pdProg');if(pg&&C.PGX())C.PGX().parentWire(pg,kids());
    if(el.querySelector('#pdRoster'))C.rosterWire();
    on('[data-act="me"]',function(){ui.me=1;render(true)});on('[data-act="meX"]',function(){ui={};render(true)});
    on('[data-act="meSave"]',function(){var a=acct(),nm=el.querySelector('#pdMeName').value.trim().slice(0,12),o=el.querySelector('#pdMeOld').value.trim(),n=el.querySelector('#pdMeNew').value.trim(),m=el.querySelector('#pdMeMsg'),curPin=isAdmin()?S.getPin():a.pin;
      if(!nm){m.textContent='請輸入名字。';return}if(curPin&&C.hashPin(o)!==curPin){m.textContent='目前密碼不對喔。';return}if(n&&!/^\d{4}$/.test(n)){m.textContent='新密碼要 4 個數字。';return}
      if(isAdmin()){var arr=list().filter(function(x){return x.id!=='admin'});arr.push({id:'admin',name:nm,role:'admin'});save(arr);if(n)S.setPin(C.hashPin(n))}else{a.name=nm;if(n)a.pin=C.hashPin(n);upsert(a)}
      C.sfx('ok');C.say('帳號更新好了！','happy');ui={};render(true)});
    el.querySelectorAll('[data-kpin]').forEach(function(b){b.onclick=function(){S.mut(b.dataset.kpin,function(d){delete d.pin});C.sfx('ok');C.say('孩子的密碼重設了，下次進來會重新設定。','happy');render(true)}});
    if(!isAdmin())return;
    on('[data-act="new"]',function(){C.sfx('tap');ui={edit:'new',kids:[],name:''};render(true)});
    el.querySelectorAll('[data-edit]').forEach(function(b){b.onclick=function(){var p=parents().filter(function(x){return x.id===b.dataset.edit})[0];ui={edit:p.id,kids:(p.kids||[]).slice(),name:p.name};render(true)}});
    el.querySelectorAll('[data-pk]').forEach(function(b){b.onclick=function(){var n=el.querySelector('#pdAName');ui.name=n?n.value:ui.name;var k=b.dataset.pk,i=ui.kids.indexOf(k);if(i>=0)ui.kids.splice(i,1);else ui.kids.push(k);render(true)}});
    on('[data-act="aX"]',function(){ui={};render(true)});
    on('[data-act="aSave"]',function(){var nm=el.querySelector('#pdAName').value.trim().slice(0,12),m=el.querySelector('#pdAMsg'),pinEl=el.querySelector('#pdAPin'),pin=pinEl?pinEl.value.trim():'';
      if(!nm){m.textContent='請輸入家長名字。';return}if(nm===adminName()||parents().some(function(x){return x.name===nm&&x.id!==ui.edit})){m.textContent='已經有同樣名字的帳號了。';return}
      if(!ui.kids.length){m.textContent='至少勾選一個孩子。';return}if(pin&&!/^\d{4}$/.test(pin)){m.textContent='密碼要 4 個數字，或留空。';return}
      if(ui.edit==='new')upsert({id:'pa'+Date.now().toString(36),name:nm,kids:ui.kids.slice(),pin:pin?C.hashPin(pin):'',created:Date.now()});
      else{var p=parents().filter(function(x){return x.id===ui.edit})[0];if(p){p.name=nm;p.kids=ui.kids.slice();upsert(p)}}
      C.sfx('ok');C.say('家長帳號存好了！','happy');ui={};render(true)});
    el.querySelectorAll('[data-reset]').forEach(function(b){b.onclick=function(){var p=parents().filter(function(x){return x.id===b.dataset.reset})[0];if(!p)return;p.pin='';upsert(p);C.sfx('ok');C.say('密碼已重設，對方下次登入會重新設定。','happy');render(true)}});
    el.querySelectorAll('[data-del]').forEach(function(b){b.onclick=function(){if(ui.del!==b.dataset.del){ui.del=b.dataset.del;render(true);return}save(list().filter(function(x){return x.id!==b.dataset.del}));C.sfx('no');C.say('家長帳號刪除了。','idle');ui={};render(true)}});
    on('[data-act="clr"]',function(){ui.clr=1;render(true)});on('[data-act="clrX"]',function(){ui={};render(true)});
    on('[data-act="clr2"]',function(){S.clearRecords();C.sfx('no');C.say('已經全部歸零囉！','happy');ui={};render(true)})}

  return {renderPin:renderPin,render:render,kids:kids,isAdmin:isAdmin,active:function(){return !!cur},reset:function(){cur=null}};
};
})(window);
