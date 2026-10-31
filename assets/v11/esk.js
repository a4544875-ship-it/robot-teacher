/* v11 英文聽說寫教室：🎧 聽力、✍️ 手寫（四線格＋自動判斷）、🗣️ 口說（瀏覽器語音辨識）
   題目跟著 v10 自動進度（目前單元的單字與句型），答對答錯會進錯題箱。 */
(function(global){
'use strict';

/* ---- 課本句型（康軒 Wonder World），依單元代號；pic 是提示圖，key 是口說時要聽到的關鍵字 ---- */
var NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
var SENT={
  e3a2:function(R){var n=6+Math.floor(R()*5);return {pic:'🎂 '+n,q:'How old are you?',a:"I'm "+NUMW[n]+'.',key:[NUMW[n]],wrong:["I'm "+NUMW[n===10?6:n+1]+'.',"It's red.","Yes, I am."]}},
  e3a3:function(R){var f=[['hungry','🤤'],['happy','😀'],['sad','😢'],['angry','😠'],['thirsty','🥤']],a=f[Math.floor(R()*f.length)],yes=R()<.55,b=yes?a:f.filter(function(x){return x!==a})[Math.floor(R()*4)];
    return {pic:a[1],q:'Are you '+b[0]+'?',a:yes?'Yes, I am.':"No, I'm not.",key:[yes?'yes':'no'],wrong:[yes?"No, I'm not.":'Yes, I am.',"It's a doll.","I'm nine."]}},
  e3a4:function(R){var o=[['ball','⚽'],['car','🚗'],['doll','🪆'],['kite','🪁'],['robot','🤖']],a=o[Math.floor(R()*o.length)],w=o.filter(function(x){return x!==a});
    return {pic:a[1],q:"What's this?",a:"It's a "+a[0]+'.',key:[a[0]],wrong:["It's a "+w[0][0]+'.',"It's a "+w[1][0]+'.',"I'm happy."]}},
  e3a5:function(R){var c=[['red','🔴'],['blue','🔵'],['green','🟢'],['yellow','🟡'],['pink','🩷'],['purple','🟣']],a=c[Math.floor(R()*c.length)],w=c.filter(function(x){return x!==a});
    return {pic:a[1],q:'What color is it?',a:"It's "+a[0]+'.',key:[a[0]],wrong:["It's "+w[0][0]+'.',"It's "+w[2][0]+'.',"It's a ball."]}},
  e3b2:function(R){var o=[['bird','🐦'],['cat','🐱'],['dog','🐶'],['frog','🐸'],['rabbit','🐰']],a=o[Math.floor(R()*o.length)],yes=R()<.5,b=yes?a:o.filter(function(x){return x!==a})[Math.floor(R()*4)];
    return {pic:a[1],q:'Is it a '+b[0]+'?',a:yes?'Yes, it is.':"No, it isn't.",key:[yes?'yes':'no'],wrong:[yes?"No, it isn't.":'Yes, it is.','Yes, I can.',"It's blue."]}},
  e3b3:function(R){var o=[['dance','💃'],['draw','🎨'],['sing','🎤'],['swim','🏊'],['fly a kite','🪁'],['ride a bike','🚴']],a=o[Math.floor(R()*o.length)],yes=R()<.6;
    return {pic:(yes?'':'🚫')+a[1],q:'Can you '+a[0]+'?',a:yes?'Yes, I can.':"No, I can't.",key:[yes?'yes':'no'],wrong:[yes?"No, I can't.":'Yes, I can.','Yes, it is.',"He's my dad."]}},
  e3b4:function(R){var o=[['grandpa','👴','He'],['grandma','👵','She'],['dad','👨','He'],['mom','👩','She'],['brother','👦','He'],['sister','👧','She']],a=o[Math.floor(R()*o.length)],w=o.filter(function(x){return x!==a&&x[2]===a[2]});
    return {pic:a[1],q:"Who's "+a[2].toLowerCase()+'?',a:a[2]+"'s my "+a[0]+'.',key:[a[0]],wrong:[a[2]+"'s my "+w[0][0]+'.',a[2]+"'s my "+w[1][0]+'.',"It's a cat."]}},
  e3b5:function(R){var o=[['cook','🧑‍🍳'],['doctor','🧑‍⚕️'],['nurse','👩‍⚕️'],['student','🧑‍🎓'],['teacher','🧑‍🏫']],a=o[Math.floor(R()*o.length)],yes=R()<.5,b=yes?a:o.filter(function(x){return x!==a})[Math.floor(R()*4)];
    return {pic:a[1],q:'Is '+(a[0]==='nurse'?'she':'he')+' a '+b[0]+'?',a:yes?(a[0]==='nurse'?'Yes, she is.':'Yes, he is.'):(a[0]==='nurse'?"No, she isn't.":"No, he isn't."),key:[yes?'yes':'no'],
      wrong:[yes?(a[0]==='nurse'?"No, she isn't.":"No, he isn't."):(a[0]==='nurse'?'Yes, she is.':'Yes, he is.'),'Yes, I can.',"It's sunny."]}},
  e4a2:function(R){var o=[['sunny','☀️'],['rainy','☔'],['cloudy','🌥️'],['windy','🌬️'],['cold','🥶'],['hot','🥵']],a=o[Math.floor(R()*o.length)],w=o.filter(function(x){return x!==a});
    return {pic:a[1],q:"How's the weather?",a:"It's "+a[0]+'.',key:[a[0]],wrong:["It's "+w[0][0]+'.',"It's "+w[3][0]+'.',"It's ten o'clock."]}},
  e4a3:function(R){var h=1+Math.floor(R()*12),m=['thirty','forty','fifty'][Math.floor(R()*3)],mm={thirty:30,forty:40,fifty:50}[m],h2=h===12?1:h+1;
    return {pic:'🕒 '+h+':'+mm,q:'What time is it?',a:"It's "+NUMW[h]+' '+m+'.',key:[NUMW[h],String(h)],wrong:["It's "+NUMW[h2]+' '+m+'.',"It's "+NUMW[h]+' '+(m==='thirty'?'fifty':'thirty')+'.',"It's rainy."]}},
  e4a4:function(R){var o=[['book','📖'],['eraser','🧽'],['marker','🖍️'],['pen','🖊️'],['pencil','✏️'],['ruler','📏']],a=o[Math.floor(R()*o.length)],yes=R()<.5,b=yes?a:o.filter(function(x){return x!==a})[Math.floor(R()*5)];
    return {pic:'🙋 '+a[1],q:'Is this your '+b[0]+'?',a:yes?'Yes, it is.':"No, it isn't.",key:[yes?'yes':'no'],wrong:[yes?"No, it isn't.":'Yes, it is.','Yes, I do.',"It's on the desk."]}},
  e4a5:function(R){var p=[['in','📦🧽'],['on','🧽\n📦'],['under','📦\n🧽']],a=p[Math.floor(R()*3)],w=p.filter(function(x){return x!==a});
    return {pic:a[1],q:"Where's the eraser?",a:"It's "+a[0]+' the box.',key:[a[0]],wrong:["It's "+w[0][0]+' the box.',"It's "+w[1][0]+' the box.','Yes, it is.']}},
  e4b2:function(R){var o=[['bathroom','🛁'],['bedroom','🛏️'],['kitchen','🥘'],['living room','🛋️'],['dining room','🍽️']],a=o[Math.floor(R()*o.length)],w=o.filter(function(x){return x!==a});
    return {pic:a[1],q:'Where are you?',a:"I'm in the "+a[0]+'.',key:[a[0].split(' ')[0]],wrong:["I'm in the "+w[0][0]+'.',"I'm in the "+w[2][0]+'.',"I'm reading."]}},
  e4b3:function(R){var o=[['cooking','🍲'],['eating','😋'],['sleeping','💤'],['writing','✍️'],['running','🏃'],['reading','👓']],a=o[Math.floor(R()*o.length)],w=o.filter(function(x){return x!==a});
    return {pic:a[1],q:'What are you doing?',a:"I'm "+a[0]+'.',key:[a[0]],wrong:["I'm "+w[0][0]+'.',"I'm "+w[3][0]+'.',"I'm in the kitchen."]}},
  e4b4:function(R){var o=[['a hamburger','🍔'],['a hot dog','🌭'],['some milk','🥛'],['some juice','🧃'],['some water','💧']],a=o[Math.floor(R()*o.length)],w=o.filter(function(x){return x!==a});
    return {pic:a[1],q:'What do you want for lunch?',a:'I want '+a[0]+'.',key:[a[0].split(' ').pop()],wrong:['I want '+w[0][0]+'.','I want '+w[2][0]+'.','Yes, I do.']}},
  e4b5:function(R){var o=[['bears','🐻'],['lions','🦁'],['monkeys','🐵'],['tigers','🐯'],['zebras','🦓']],a=o[Math.floor(R()*o.length)],yes=R()<.6;
    return {pic:(yes?'❤️':'🚫')+a[1],q:'Do you like '+a[0]+'?',a:yes?'Yes, I do.':"No, I don't.",key:[yes?'yes':'no'],wrong:[yes?"No, I don't.":'Yes, I do.','Yes, it is.',"I'm running."]}}
};

/* ---- 口說：寬鬆比對（數字、同音字、少一個字母都算對） ---- */
var ALIAS={one:['1','won'],two:['2','to','too'],three:['3','tree','free'],four:['4','for','fore'],five:['5'],six:['6'],seven:['7'],eight:['8','ate'],nine:['9'],ten:['10'],eleven:['11'],twelve:['12'],
  thirteen:['13'],fourteen:['14'],fifteen:['15'],sixteen:['16'],seventeen:['17'],eighteen:['18'],nineteen:['19'],twenty:['20'],thirty:['30'],forty:['40'],fifty:['50'],sixty:['60'],seventy:['70'],eighty:['80'],ninety:['90'],hundred:['100'],
  red:['read'],blue:['blew'],sun:['son'],bee:['b','be'],eye:['i','aye'],ear:['year','here'],hi:['high'],pear:['pair'],in:['inn'],hotdog:['hot dog'],yes:['yeah','yep','yup'],no:['nope','know'],
  cat:['kat','cap'],dog:['dug'],pig:['big'],hat:['hot'],cup:['cop'],bed:['bad'],pen:['pan'],ox:['box','ax','oxen'],ride:['right','write'],fly:['flight'],draw:['drawl'],sing:['sink'],swim:['swimming'],dad:['dead','dat'],mom:['mum','mam','mama']};
function norm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9' ]+/g,' ').replace(/\s+/g,' ').trim()}
function lev(a,b){var m=a.length,n=b.length,d=[];for(var i=0;i<=m;i++){d[i]=[i]}for(var j=1;j<=n;j++)d[0][j]=j;for(i=1;i<=m;i++)for(j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function heard(alts,keys){var ok=false;alts.forEach(function(t){var s=norm(t),tk=s.split(' '),joined=s.replace(/ /g,'');keys.forEach(function(k){k=norm(k);var al=[k].concat(ALIAS[k.replace(/ /g,'')]||[]);
  al.forEach(function(x){if(x.indexOf(' ')>=0?s.indexOf(x)>=0:(tk.indexOf(x)>=0||joined===x))ok=true});if(!ok&&k.length>=5&&k.indexOf(' ')<0)tk.forEach(function(w){if(lev(w,k)<=1)ok=true})})});return ok}

/* ---- 手寫判斷：孩子的筆跡跟 26 個字母各自比較（雙向覆蓋率＋3×3 分區＋超出範圍），目標字母要最像才算對。
   字母遮罩只算一次就快取起來，並在孩子寫字時利用空檔先算好，按「寫好了」幾乎不用等。 ---- */
var FONT='"Andika","Comic Sans MS","Chalkboard SE","Arial Rounded MT Bold",sans-serif';
var ABC='abcdefghijklmnopqrstuvwxyz';
function metrics(ctx,F){ctx.font=F+'px '+FONT;var x=ctx.measureText('x').actualBoundingBoxAscent||F*.5,l=ctx.measureText('l').actualBoundingBoxAscent||F*.72,g=ctx.measureText('g').actualBoundingBoxDescent||F*.24;return {x:x,a:Math.max(l,ctx.measureText('A').actualBoundingBoxAscent||0),d:g}}
var GC={key:'',g:{}},WCV=null;
function wctx(w,h){if(!WCV)WCV=document.createElement('canvas');if(WCV.width!==w||WCV.height!==h){WCV.width=w;WCV.height=h}var x=WCV.getContext('2d',{willReadFrequently:true});x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,w,h);x.textAlign='center';x.textBaseline='alphabetic';x.lineCap=x.lineJoin='round';return x}
function geo(W,H,F,base){var S=112/W;return {S:S,w:Math.round(W*S),h:Math.round(H*S),f:F*S,b:base*S,key:Math.round(W)+'x'+Math.round(H)+'|'+Math.round(F)+'|'+Math.round(base)}}
function glyph(L,G){if(GC.key!==G.key){GC.key=G.key;GC.g={}}if(GC.g[L])return GC.g[L];var w=G.w,h=G.h,x=wctx(w,h);x.font=G.f+'px '+FONT;x.fillStyle=x.strokeStyle='#000';x.fillText(L,w/2,G.b);
  var d0=x.getImageData(0,0,w,h).data;x.lineWidth=G.f*.13;x.strokeText(L,w/2,G.b);var dd=x.getImageData(0,0,w,h).data,pts=[],gd=new Uint8Array(w*h),x0=w,x1=0,y0=h,y1=0,k,px,py;
  for(k=0;k<w*h;k++){if(dd[k*4+3]>60)gd[k]=1;if(d0[k*4+3]>100){pts.push(k);px=k%w;py=(k/w)|0;if(px<x0)x0=px;if(px>x1)x1=px;if(py<y0)y0=py;if(py>y1)y1=py}}
  var cw=(x1-x0+1)/3,ch=(y1-y0+1)/3,cell=new Uint8Array(pts.length),cnt=[0,0,0,0,0,0,0,0,0];pts.forEach(function(q,j){var c=Math.min(2,((q%w-x0)/cw)|0)+3*Math.min(2,(((q/w)|0)-y0)/ch|0);cell[j]=c;cnt[c]++});
  return GC.g[L]={pts:pts,gd:gd,cell:cell,cnt:cnt,box:[x0,x1,y0,y1]}}
function warm(W,H,F,base,stopFn){var G=geo(W,H,F,base),i=0;(function step(){if(stopFn())return;var t=Date.now();while(i<26&&Date.now()-t<8){glyph(ABC[i],G);i++}if(i<26)setTimeout(step,16)})()}
function checkInk(letter,strokes,W,H,F,base){var G=geo(W,H,F,base),w=G.w,h=G.h,S=G.S;
  function ink(lw){var x=wctx(w,h);x.strokeStyle=x.fillStyle='#000';x.lineWidth=lw;strokes.forEach(function(s){x.beginPath();s.forEach(function(pt,i){if(i)x.lineTo(pt[0]*S,pt[1]*S);else x.moveTo(pt[0]*S,pt[1]*S)});if(s.length===1){x.arc(s[0][0]*S,s[0][1]*S,lw/2,0,7);x.fill()}else x.stroke()});var d=x.getImageData(0,0,w,h).data,o=new Uint8Array(w*h);for(var k=0;k<w*h;k++)if(d[k*4+3]>(lw>G.f*.1?60:100))o[k]=1;return o}
  var K=ink(G.f*.06),KD=ink(G.f*.17),kp=[];for(var k=0;k<w*h;k++)if(K[k])kp.push(k);
  function score(L){var g=glyph(L,G),gi=0,ch=[0,0,0,0,0,0,0,0,0],worst=1,b=g.box,m=G.f*.08,ki=0,out=0,j;
    for(j=0;j<g.pts.length;j++)if(KD[g.pts[j]]){gi++;ch[g.cell[j]]++}
    for(j=0;j<9;j++)if(g.cnt[j]>=g.pts.length*.05)worst=Math.min(worst,ch[j]/g.cnt[j]);
    for(j=0;j<kp.length;j++){var q=kp[j],px=q%w,py=(q/w)|0;if(g.gd[q])ki++;if(px<b[0]-m||px>b[1]+m||py<b[2]-m||py>b[3]+m)out++}
    var p=kp.length?ki/kp.length:0,r=g.pts.length?gi/g.pts.length:0,o=kp.length?out/kp.length:1,f1=p+r?2*p*r/(p+r):0;return {p:p,r:r,c:worst,o:o,s:f1*(.6+.4*worst)*(1-o)}}
  var me=score(letter),best=me.s,bl=letter;for(var i=0;i<26;i++){var L=ABC[i];if(L===letter)continue;var t=score(L);if(t.s>best){best=t.s;bl=L}}
  me.best=bl;me.gap=best-me.s;me.n=kp.length;return me}
var CONF=' bd db pq qp nh hn nu un mn nm co oc il li ij ji uv vu vw wv ft tf ce ec ao oa gq qg hb bh rn nr ea ae yv vy ';
function inkOK(r,L){return r.n>0&&r.s>=.5&&r.p>=.6&&(r.best===undefined||r.gap<=.02||(r.gap<=.09&&CONF.indexOf(' '+L+r.best+' ')<0))}
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}

/* ---------------- 樣式 ---------------- */
var EN_FONT='"Fredoka","Baloo 2",system-ui,sans-serif',EMO='var(--font-emoji,"Apple Color Emoji","Noto Color Emoji",sans-serif)';
var CSS=[
'.esk{--ink:#22304f;--soft:#6a7896;--card:#fff;--line:rgba(34,48,79,.08);--sh:0 10px 28px rgba(31,52,99,.12),0 2px 6px rgba(31,52,99,.06);--ac:#3a8dff;--ac2:#6cc3ff;--acs:#e8f3ff;display:flex;flex-direction:column;gap:14px;color:var(--ink);padding-bottom:8px}',
'.esk.m-listen{--ac:#2f86ff;--ac2:#5fc8ff;--acs:#e6f2ff}.esk.m-write{--ac:#ff8a1f;--ac2:#ffc35a;--acs:#fff3e3}.esk.m-speak{--ac:#ff5a7e;--ac2:#ff9b74;--acs:#ffecef}',
'.esk button{font-family:inherit;color:inherit;-webkit-tap-highlight-color:transparent}.esk .esk-spk,.esk .esk-mic,.esk .esk-btn.pri{color:#fff}.esk .esk-spk.alt{color:var(--ac)}',
/* 選單 */
'.esk-hero{position:relative;overflow:hidden;border-radius:28px;padding:20px 18px 18px;color:#fff;background:linear-gradient(135deg,#5b6cff 0%,#7a5cff 45%,#ff7eb3 100%);box-shadow:var(--sh)}',
'.esk-hero:after{content:"";position:absolute;right:-30px;top:-40px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.14)}',
'.esk-hero small{display:block;font-weight:700;letter-spacing:.12em;opacity:.85;font-size:12px}.esk-hero h2{margin:4px 0 8px;font-size:26px;line-height:1.2;color:#fff}.esk-hero>*{position:relative;z-index:1}.esk-hero .unit{max-width:calc(100% - 56px)}',
'.esk-hero .unit{display:inline-flex;gap:6px;align-items:center;max-width:100%;background:rgba(255,255,255,.22);border-radius:999px;padding:6px 12px;font-size:13px;font-weight:700;backdrop-filter:blur(4px)}',
'.esk-hero .esk-bot{position:absolute;right:14px;bottom:10px;font-size:46px;font-family:'+EMO+';animation:eskfl 3s ease-in-out infinite}',
'.esk-modes{display:grid;gap:12px}',
'.esk-mode{position:relative;display:grid;grid-template-columns:72px minmax(0,1fr) 20px;gap:14px;align-items:center;text-align:left;padding:14px 14px 14px 12px;border-radius:24px;background:var(--card);box-shadow:var(--sh);border:0;transition:transform .12s}',
'.esk-mode:active{transform:scale(.98)}.esk-mode .ic{width:72px;height:72px;border-radius:22px;display:grid;place-items:center;font-size:38px;font-family:'+EMO+';background:linear-gradient(145deg,var(--a1),var(--a2));box-shadow:inset 0 -4px 0 rgba(0,0,0,.08)}',
'.esk-mode b{display:block;font-size:20px}.esk-mode .ds{display:block;color:var(--soft);font-size:13px;line-height:1.45;margin-top:2px}.esk-mode .go{font-size:24px;color:#b5bfd3}',
'.esk-mode .tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}.esk-mode .tags i{font-style:normal;font-size:11px;font-weight:700;border-radius:999px;padding:3px 8px;background:var(--a3);color:var(--a4)}',
'.esk-mode .tags i.done{background:#e2f7e8;color:#1f8a4c}',
'.esk-mode.l{--a1:#d9ecff;--a2:#9fd1ff;--a3:#e6f2ff;--a4:#2f6fd0}.esk-mode.w{--a1:#ffe9cf;--a2:#ffc98a;--a3:#fff1de;--a4:#c46a12}.esk-mode.s{--a1:#ffe0e7;--a2:#ffb3c3;--a3:#ffecef;--a4:#d0405f}',
'.esk-tip{display:flex;gap:10px;align-items:flex-start;font-size:13px;line-height:1.5;color:var(--soft);background:rgba(255,255,255,.75);border-radius:18px;padding:10px 12px}',
/* 題目頁 */
'.esk-top{display:flex;align-items:center;gap:10px}.esk-top .tag{flex:none;display:inline-flex;align-items:center;gap:4px;font-weight:800;font-size:13px;color:#fff;background:linear-gradient(135deg,var(--ac),var(--ac2));border-radius:999px;padding:6px 11px}',
'.esk-bar{flex:1;display:flex;gap:4px;min-width:0}.esk-bar i{flex:1;height:9px;border-radius:999px;background:rgba(34,48,79,.1);transition:background .3s}.esk-bar i.ok{background:#35c26b}.esk-bar i.no{background:#ff7f6e}.esk-bar i.cur{background:var(--ac2);box-shadow:0 0 0 3px var(--acs)}',
'.esk-top .n{flex:none;font:700 13px '+EN_FONT+';color:var(--soft)}',
'.esk-qc{position:relative;background:var(--card);border-radius:28px;padding:18px 16px 16px;text-align:center;box-shadow:var(--sh);overflow:hidden}',
'.esk-qc:before{content:"";position:absolute;inset:0 0 auto 0;height:86px;background:linear-gradient(180deg,var(--acs),rgba(255,255,255,0))}',
'.esk-qc>*{position:relative}.esk-ask{font-size:19px;font-weight:800;margin:0 0 10px}.esk-sub{display:block;color:var(--soft);font-size:13px;margin-top:6px}',
'.esk-pic{display:grid;place-items:center;margin:2px auto 10px;width:128px;height:128px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--acs));box-shadow:inset 0 0 0 6px rgba(255,255,255,.9),0 6px 16px rgba(31,52,99,.1);font-size:66px;line-height:1.05;white-space:pre-line;font-family:'+EMO+';animation:eskpop .35s ease-out}',
'.esk-wq{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center;padding:12px!important;text-align:left}.esk-wq .wm{min-width:0}.esk-wq .esk-slots{justify-content:flex-start;margin:0}.esk-wq .esk-slots span{width:34px;height:40px;font-size:24px}.esk-wq .wb{display:flex;flex-direction:column;gap:6px}.esk-wq .esk-spk{padding:9px 13px;font-size:15px}.esk-pic.xs{width:58px;height:58px;font-size:32px;margin:0;box-shadow:inset 0 0 0 4px rgba(255,255,255,.9)}.esk-pic.sm{width:92px;height:92px;font-size:46px}.esk-pic.txt{font-size:44px}',
'.esk-word{font:700 34px '+EN_FONT+';letter-spacing:.02em;margin:2px 0}.esk-q2{font:600 24px '+EN_FONT+';margin:2px 0 4px}',
'.esk-ears{display:flex;gap:10px;justify-content:center;margin-top:12px}',
'.esk-spk{display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:11px 18px;font-size:17px;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--ac),var(--ac2));box-shadow:0 5px 0 rgba(0,0,0,.12);transition:transform .1s}',
'.esk-spk:active{transform:translateY(3px);box-shadow:0 2px 0 rgba(0,0,0,.12)}.esk-spk.alt{background:#fff;color:var(--ac);box-shadow:inset 0 0 0 2px var(--acs),0 4px 0 rgba(0,0,0,.06)}',
'.esk-spk .wv{display:inline-flex;gap:2px;align-items:center;height:16px}.esk-spk .wv i{width:3px;height:6px;border-radius:2px;background:currentColor;opacity:.9}',
'.esk-spk.on .wv i{animation:eskwv .8s ease-in-out infinite}.esk-spk.on .wv i:nth-child(2){animation-delay:.15s}.esk-spk.on .wv i:nth-child(3){animation-delay:.3s}',
'.esk-ops{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.esk-ops.one{grid-template-columns:1fr}',
'.esk-op{position:relative;min-height:84px;border:0;border-radius:22px;background:var(--card);box-shadow:0 6px 0 rgba(31,52,99,.08),0 8px 18px rgba(31,52,99,.08);font:700 24px '+EN_FONT+';padding:10px;transition:transform .1s,background .2s}',
'.esk-op:active{transform:translateY(3px)}.esk-op .k{position:absolute;left:10px;top:8px;font:700 11px '+EN_FONT+';color:#9aa6bf}',
'.esk-op.e{font-size:50px;font-family:'+EMO+'}.esk-ops.one .esk-op{min-height:62px;font-size:21px;text-align:left;padding-left:44px}.esk-ops.one .esk-op .k{top:50%;transform:translateY(-50%);left:14px;font-size:13px;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:var(--acs);color:var(--ac)}',
'.esk-op.ok{background:#e3f8ea;box-shadow:0 0 0 3px #35c26b inset,0 6px 0 rgba(31,52,99,.06)}.esk-op.ok:after{content:"✓";position:absolute;right:-6px;top:-6px;width:28px;height:28px;border-radius:50%;background:#35c26b;color:#fff;font:800 17px/28px sans-serif;animation:eskpop .3s}',
'.esk-op.no{background:#fff0ee;box-shadow:0 0 0 3px #ff7f6e inset;animation:eskshk .35s}.esk-op:disabled{cursor:default}',
'.esk-fb{min-height:44px;display:flex;justify-content:center}.esk-fb span{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:9px 16px;font-weight:800;font-size:15px;animation:eskpop .25s}',
'.esk-fb .ok{background:#e3f8ea;color:#1c7a43}.esk-fb .no{background:#fff0ee;color:#c4402f}.esk-fb .info{background:var(--acs);color:var(--ink)}',
/* 手寫 */
'.esk-slots{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:4px 0 2px}.esk-slots span{width:40px;height:46px;border-radius:12px;display:grid;place-items:center;font:700 28px '+FONT+';background:#f4f6fb;color:#b3bdd1}',
'.esk-slots span.done{background:#e3f8ea;color:#1f8a4c}.esk-slots span.cur{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;transform:translateY(-3px);box-shadow:0 6px 12px rgba(255,138,31,.3)}',
'.esk-paper{position:relative;align-self:center;max-width:100%;border-radius:22px;padding:10px;background:#fff;box-shadow:var(--sh)}',
'.esk-paper .pp{position:relative;border-radius:14px;overflow:hidden;background:#fffdf7;box-shadow:inset 0 0 0 1.5px #efe3c6}.esk-paper canvas{position:absolute;left:0;top:0;display:block;touch-action:none}.esk-paper canvas.bg{position:relative}',
'.esk-paper .hint{position:absolute;left:12px;top:10px;font-size:12px;font-weight:700;color:#c39a52;background:rgba(255,248,232,.9);border-radius:999px;padding:3px 9px;pointer-events:none}',
'.esk-tools{display:grid;grid-template-columns:1fr 1.6fr;gap:10px}.esk-btn{border:0;border-radius:18px;padding:14px 10px;font-size:17px;font-weight:800;background:#fff;box-shadow:0 5px 0 rgba(31,52,99,.08),0 6px 14px rgba(31,52,99,.08);transition:transform .1s}',
'.esk-btn:active{transform:translateY(3px)}.esk-btn.pri{color:#fff;background:linear-gradient(135deg,var(--ac),var(--ac2));box-shadow:0 5px 0 rgba(0,0,0,.14)}',
/* 口說 */
'.esk-micwrap{position:relative;display:grid;place-items:center;height:132px}.m-speak .esk-qc{padding-bottom:14px}.m-speak .esk-pic.txt{font-size:34px}',
'.esk-mic{position:relative;z-index:1;width:116px;height:116px;border-radius:50%;border:0;font-size:50px;font-family:'+EMO+';color:#fff;background:linear-gradient(145deg,var(--ac),var(--ac2));box-shadow:0 8px 0 rgba(0,0,0,.12),0 14px 30px rgba(255,90,126,.35);transition:transform .12s}',
'.esk-mic:active{transform:translateY(4px)}.esk-micwrap .rg{position:absolute;width:116px;height:116px;border-radius:50%;background:var(--ac2);opacity:0}',
'.esk-micwrap.on .rg{animation:eskrg 1.6s ease-out infinite}.esk-micwrap.on .rg.b{animation-delay:.8s}.esk-micwrap.on .esk-mic{background:linear-gradient(145deg,#ff3d64,#ff7a59)}',
'.esk-say{display:flex;gap:10px;align-items:flex-start;text-align:left}.esk-say .av{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-size:24px;background:var(--acs);font-family:'+EMO+'}',
'.esk-say .bb{position:relative;flex:1;min-width:0;background:#fff;border-radius:18px;border-top-left-radius:6px;padding:10px 14px;font-size:15px;line-height:1.45;box-shadow:0 4px 14px rgba(31,52,99,.08);min-height:44px}',
'.esk-say .bb b{font-family:'+EN_FONT+';font-size:18px}.esk-say .bb.ok{background:#e3f8ea}.esk-say .bb.no{background:#fff5f3}',
'.esk-skip{align-self:center;border:0;background:none;color:var(--soft);font-size:14px;font-weight:700;padding:6px 12px;text-decoration:underline;text-underline-offset:3px}',
/* 結果 */
'.summary.esk-sum .big{font-size:58px}.esk-stars{display:flex;justify-content:center;gap:6px;margin:4px 0 8px}.esk-stars i{font-style:normal;font-size:34px;color:#e3e7f0;animation:eskpop .4s both}.esk-stars i.on{color:#ffc531}',
'.esk-stars i:nth-child(2){animation-delay:.12s}.esk-stars i:nth-child(3){animation-delay:.24s}',
'@keyframes eskpop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.06);opacity:1}100%{transform:scale(1)}}@keyframes eskshk{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}',
'@keyframes eskwv{0%,100%{height:5px}50%{height:16px}}@keyframes eskrg{0%{transform:scale(1);opacity:.45}100%{transform:scale(1.9);opacity:0}}@keyframes eskfl{50%{transform:translateY(-6px)}}',
'@media (prefers-reduced-motion:reduce){.esk *{animation:none!important;transition:none!important}}',
'@media (max-width:360px){.esk-op{min-height:72px;font-size:21px}.esk-pic{width:108px;height:108px;font-size:56px}.esk-mode{grid-template-columns:60px minmax(0,1fr) 16px}.esk-mode .ic{width:60px;height:60px;font-size:32px}}'
].join('');

global.EskFactory=function(C){
  var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
  var G={id:'esk',cls:'v2new feat',ico:'🎧',tag:'新功能',zh:'聽說寫教室',en:'Listen · Speak · Write',d:'聽單字和句子、對小機說英文、在四線格上寫字母，題目跟著學校進度。'};
  C.GAMES.unshift(G);C.GAME_FN.esk=function(){menu()};
  var live=0,timers=[],rec=null,B=function(){return C.body()},esc=C.esc;
  function later(f,ms){var me=live;timers.push(setTimeout(function(){if(me===live)f()},ms))}
  function ssBusy(){try{var s=global.speechSynthesis;return !!s&&(s.speaking||s.pending)}catch(e){return false}}
  function stop(){live++;timers.forEach(clearTimeout);timers=[];if(rec){try{rec.abort()}catch(e){}rec=null}if(ssBusy())try{global.speechSynthesis.cancel()}catch(e){}audioOut()}
  C.addCleanup(stop);

  /* ---- 語音（iPad／iPhone 穩定版）：保留 utterance、沒開始就重念一次、只有在念的時候才 cancel ---- */
  var keep=[],spkBtn=null;
  function audioOut(){try{if(navigator.audioSession&&navigator.audioSession.type!=='playback')navigator.audioSession.type='playback'}catch(e){}try{C.resumeAudio&&C.resumeAudio()}catch(e){}}
  function tts(t,slow,cb){var ss=global.speechSynthesis;if(C.muted()||!ss){cb&&cb();return}audioOut();var tries=0,me=live,fired=false,btn=spkBtn;
    function fin(){if(fired)return;fired=true;if(btn)btn.classList.remove('on');if(me===live&&cb)cb()}
    function go(){if(me!==live)return fin();tries++;var u=new SpeechSynthesisUtterance(t),started=false;u.lang='en-US';u.rate=slow?.55:.82;u.volume=1;keep.push(u);if(keep.length>6)keep.shift();
      u.onstart=function(){started=true;if(btn)btn.classList.add('on')};u.onend=fin;u.onerror=function(e){var er=e&&e.error;if(!started&&tries<2&&er!=='interrupted'&&er!=='canceled')setTimeout(go,250);else fin()};
      try{if(ss.paused)ss.resume()}catch(e){}try{ss.speak(u)}catch(e){fin();return}
      setTimeout(function(){if(started||fired||ss.speaking)return;if(tries<2){try{ss.cancel()}catch(e){}setTimeout(go,220)}else fin()},1000+t.length*20)}
    if(ssBusy()){try{ss.cancel()}catch(e){}setTimeout(go,180)}else go()}
  function spkHTML(a,label,alt){return '<button class="esk-spk'+(alt?' alt':'')+'" data-a="'+a+'"><span class="wv"><i></i><i></i><i></i></span>'+label+'</button>'}

  function grade(){var P=C.PGX();var g=P&&C.isKid()?P.grade(C.who()):0;return g||(['二','三','四','五','六'].indexOf(C.egrade())+2)}
  function pool(){var p=C.poolW()||[];return p.filter(function(w){return w&&/^[a-z]+$/.test(w[0])})}
  function estate(){var P=C.PGX();return P&&C.isKid()?P.state(C.who(),'e'):null}
  function curWords(){var S=estate();return S?S.U[4]:[]}
  function sentUnits(){var S=estate();if(!S)return [];var o=[];S.units.slice(0,S.cur+1).forEach(function(u){if(SENT[u[0]])o.push(u[0])});
    if(S.prev)S.prev.forEach(function(u){if(SENT[u[0]])o.push(u[0])});var c=S.U[0];if(SENT[c])o=o.concat([c,c]);return o}
  function pickWords(n){var p=pool(),cw=curWords(),a=shuf(p.filter(function(w){return cw.indexOf(w[0])>=0})),b=shuf(p.filter(function(w){return cw.indexOf(w[0])<0}));return a.slice(0,Math.ceil(n*.6)).concat(b).concat(a.slice(Math.ceil(n*.6))).slice(0,n)}
  function top(mode,n,i,res){var nm={listen:'🎧 聽力',write:'✍️ 手寫',speak:'🗣️ 口說'}[mode];
    return '<div class="esk-top"><span class="tag">'+nm+'</span><div class="esk-bar">'+Array.apply(null,{length:n}).map(function(_,j){return '<i class="'+(res[j]===1?'ok':res[j]===0?'no':j===i?'cur':'')+'"></i>'}).join('')+'</div><span class="n">'+Math.min(i+1,n)+' / '+n+'</span></div>'}
  function head(t){C.shell(G.zh);try{document.getElementById('gTitle').textContent=G.zh+'・'+t}catch(e){}}
  /* 今天練過哪幾項（只存在這台裝置） */
  function dkey(){var d=new Date();return 'esk-'+(C.who()||'')+'-'+d.getFullYear()+(d.getMonth()+1)+d.getDate()}
  function doneToday(){try{return JSON.parse(localStorage.getItem(dkey())||'{}')}catch(e){return {}}}
  function markDone(m){try{var o=doneToday();o[m]=1;localStorage.setItem(dkey(),JSON.stringify(o))}catch(e){}}
  function result(mode,score,total,replay,say){markDone(mode);var r=score/total,stars=r>=.9?3:r>=.6?2:1,nm={listen:'聽力',write:'手寫',speak:'口說'}[mode];
    C.finish({icon:stars===3?'🏆':{listen:'🎧',write:'✍️',speak:'🗣️'}[mode],title:nm+'練習完成！',text:(mode==='write'?'一次就寫對的單字：':'第一次就答對：')+score+' / '+total,say:say,replay:replay,score:score,total:total});
    var sm=B().querySelector('.summary');if(sm){sm.classList.add('esk-sum');var big=sm.querySelector('.big');var s=document.createElement('div');s.className='esk-stars';s.innerHTML=[0,1,2].map(function(k){return '<i class="'+(k<stars?'on':'')+'">★</i>'}).join('');if(big)big.parentNode.insertBefore(s,big.nextSibling);
      var row=sm.querySelector('.row');if(row){var mb=document.createElement('button');mb.className='btn ghost';mb.textContent='換一項';mb.onclick=function(){C.sfx('tap');menu()};row.appendChild(mb)}}}

  /* ================= 選單 ================= */
  function menu(){stop();try{C.musicOff&&C.musicOff()}catch(e){}head('選一項');var S=estate(),g=grade(),dn=doneToday();
    function card(m,cls,ic,t,ds,tags){return '<button class="esk-mode '+cls+'" data-m="'+m+'"><span class="ic">'+ic+'</span><span><b>'+t+'</b><span class="ds">'+ds+'</span><span class="tags">'+tags.map(function(x){return '<i>'+x+'</i>'}).join('')+(dn[m]?'<i class="done">✓ 今天練過</i>':'')+'</span></span><span class="go">›</span></button>'}
    B().innerHTML='<div class="esk"><div class="esk-hero"><small>LISTEN · SPEAK · WRITE</small><h2>聽說寫教室</h2><span class="unit">📘 '+(S?esc(S.book)+'・'+esc(S.U[1].replace(/^Unit \d+ /,'')):esc(C.egrade())+'年級單字')+'</span><span class="esk-bot">🤖</span></div><div class="esk-modes">'+
      card('listen','l','🎧','聽力','聽小機說，選出圖、單字和開頭字母'+(g>=3?'，還要回答課本句型':''),['8 題','約 3 分鐘'])+
      card('write','w','✍️','手寫','在英文四線格上寫字母：先描紅，再聽寫',[(g<=2?'3':'4')+' 個單字','可用 Apple Pencil'])+
      card('speak','s','🗣️','口說','按麥克風對小機說英文，小機會說它聽到什麼',['6 題','要開麥克風'])+
      '</div><div class="esk-tip"><span>💡</span><span>iPhone 要把側邊的靜音鍵打開才聽得到。口說請用 Safari 打開，第一次會問麥克風，按「允許」。</span></div></div>';
    B().querySelectorAll('[data-m]').forEach(function(b){b.addEventListener('click',function(){C.sfx('tap');({listen:listen,write:write,speak:speak})[b.dataset.m]()})});
    C.say('今天想練聽、說，還是寫？','happy')}

  /* ================= 🎧 聽力 ================= */
  function listen(){stop();C.Learn.round0();head('聽力');var g=grade(),ws=pickWords(8),su=sentUnits(),types=g<=2?['pic','first','pic','first','pic','pic','first','pic']:['pic','word','first','sent','word','sent','pic','sent'];
    var items=types.map(function(t,i){var w=ws[i%ws.length];if(t==='sent'){if(!su.length)t='word';else return {t:'sent',s:SENT[su[Math.floor(Math.random()*su.length)]](Math.random),w:w}}return {t:t,w:w}}),i=-1,res=[],score=0;
    function next(){i++;if(i>=items.length)return result('listen',score,items.length,listen,score>=6?'耳朵好靈！':'多聽幾次就會越來越熟！');
      var it=items[i],w=it.w,ops,h='',first=true,K='ABCD';
      if(it.t==='pic'){ops=shuf([w].concat((C.others(w,6)||[]).filter(function(x){return x[1]!==w[1]}).slice(0,3)));h='<div class="esk-pic sm">👂</div><p class="esk-ask">聽一聽，是哪一個？</p>'}
      else if(it.t==='word'){ops=shuf([w].concat((C.others(w,6)||[]).filter(function(x){return x[0]!==w[0]}).slice(0,3)));h='<div class="esk-pic sm">👂</div><p class="esk-ask">聽一聽，是哪個單字？</p>'}
      else if(it.t==='first'){var L=w[0][0],o=[L];while(o.length<4){var c=ABC[Math.floor(Math.random()*26)];if(o.indexOf(c)<0)o.push(c)}ops=shuf(o);h='<p class="esk-ask">🔤 這個字的第一個字母是？</p><div class="esk-pic sm">'+w[1]+'</div>'}
      else{ops=shuf([it.s.a].concat(it.s.wrong.slice(0,2)));h='<div class="esk-pic'+(it.s.pic.length>3?' txt':'')+'">'+esc(it.s.pic)+'</div><p class="esk-ask">💬 小機問你，要怎麼回答？</p>'}
      var say=it.t==='sent'?it.s.q:w[0];
      B().innerHTML='<div class="esk m-listen">'+top('listen',items.length,i,res)+'<div class="esk-qc">'+h+'<div class="esk-ears">'+spkHTML('play','再聽一次')+spkHTML('slow','🐢 慢速',1)+'</div></div><div class="esk-ops'+(it.t==='sent'?' one':'')+'">'+
        ops.map(function(o,j){var k='<span class="k">'+K[j]+'</span>';return it.t==='pic'?'<button class="esk-op e" data-j="'+j+'">'+k+o[1]+'</button>':it.t==='word'?'<button class="esk-op" data-j="'+j+'">'+k+esc(o[0])+'</button>':it.t==='first'?'<button class="esk-op" data-j="'+j+'">'+k+o.toUpperCase()+' '+o+'</button>':'<button class="esk-op" data-j="'+j+'">'+k+esc(o)+'</button>'}).join('')+'</div><div class="esk-fb" id="eskFb"></div></div>';
      var q=B(),fb=q.querySelector('#eskFb');spkBtn=q.querySelector('[data-a="play"]');spkBtn.onclick=function(){spkBtn=this;tts(say)};q.querySelector('[data-a="slow"]').onclick=function(){spkBtn=this;tts(say,true)};spkBtn=q.querySelector('[data-a="play"]');later(function(){tts(say)},300);
      q.querySelector('.esk-ops').addEventListener('click',function(e){var b=e.target.closest('[data-j]');if(!b||b.disabled)return;var o=ops[+b.dataset.j],right=it.t==='pic'||it.t==='word'?o===w:it.t==='first'?o===w[0][0]:o===it.s.a;
        if(right){b.classList.add('ok');q.querySelectorAll('[data-j]').forEach(function(x){x.disabled=true});C.sfx('ok');if(first){score++;res[i]=1;C.award(1);if(it.t!=='sent')C.Learn.ok(w)}else if(res[i]===undefined)res[i]=0;
          fb.innerHTML='<span class="ok">✓ '+esc(it.t==='sent'?it.s.a:it.t==='first'?w[0]+' 是 '+w[0][0].toUpperCase()+' 開頭':w[0]+' = '+w[2])+'</span>';if(it.t==='sent')tts(it.s.a);
          C.say(first?'答對了！':'對了！','happy');later(next,it.t==='sent'?1900:1150)}
        else{b.classList.add('no');b.disabled=true;C.sfx('no');if(first){res[i]=0;if(it.t!=='sent')C.Learn.bad(w)}first=false;fb.innerHTML='<span class="no">再聽一次，慢慢聽 🐢</span>';spkBtn=q.querySelector('[data-a="slow"]');tts(say,true);C.say('再聽一次，慢慢聽！','oops')}})}
    C.say('戴好耳朵，聽小機說！','happy');next()}

  /* ================= ✍️ 手寫 ================= */
  var fontReady=null;function loadFont(){if(!fontReady)fontReady=(document.fonts&&document.fonts.load?Promise.race([document.fonts.load('80px "Andika"').catch(function(){}),new Promise(function(r){setTimeout(r,2500)})]):Promise.resolve());return fontReady}
  function write(){stop();C.Learn.round0();head('手寫');B().innerHTML='<div class="esk m-write"><div class="esk-qc"><div class="esk-pic">✏️</div><p class="esk-ask">準備紙和筆…</p></div></div>';
    var me=live;loadFont().then(function(){if(me===live)write2()})}
  function write2(){var g=grade(),ws=pickWords(12).filter(function(w){return w[0].length>=2&&w[0].length<=(g<=2?4:6)});if(ws.length<3)ws=pool().filter(function(w){return w[0].length<=5});ws=ws.slice(0,g<=2?3:4);
    var modes=ws.map(function(_,i){return g<=2||i<2?'trace':'dict'}),wi=-1,score=0,res=[];
    function nextWord(){wi++;if(wi>=ws.length)return result('write',score,ws.length,write,'字越寫越漂亮了！');var w=ws[wi],mode=modes[wi],li=0,wrongAny=false;
      function nextLetter(){if(li>=w[0].length){if(mode==='dict'){if(wrongAny)C.Learn.bad(w);else C.Learn.ok(w)}res[wi]=wrongAny?0:1;if(!wrongAny)score++;C.award(2);C.sfx('win');tts(w[0]);C.say('寫完了！'+w[0]+' = '+w[2],'happy');later(nextWord,1500);return}
        pad(w,mode,li,function(ok){if(!ok)wrongAny=true;li++;nextLetter()})}
      C.say(mode==='trace'?'照著淡淡的字描描看，從上往下寫！':'聽小機念，把單字一個字母一個字母寫出來！','happy');nextLetter()}
    function pad(w,mode,li,cb){var L=w[0][li],tries=0,box=B(),me=live;
      var Wd=Math.min(360,Math.max(240,(box.clientWidth||340)-28)),Ht=Math.round(Wd*.78),dpr=Math.min(2,global.devicePixelRatio||1);
      box.innerHTML='<div class="esk m-write">'+top('write',ws.length,wi,res)+'<div class="esk-qc esk-wq"><div class="esk-pic xs">'+w[1]+'</div><div class="wm"><div class="esk-slots">'+w[0].split('').map(function(c,j){return '<span class="'+(j<li?'done':j===li?'cur':'')+'">'+(j<li||mode==='trace'?c:j===li?'?':'')+'</span>'}).join('')+'</div>'+
        '<span class="esk-sub">'+esc(w[2])+'・'+(mode==='trace'?'描紅第 '+(li+1)+' 個字母':'聽寫第 '+(li+1)+' 個字母')+'</span></div><div class="wb">'+spkHTML('play','聽')+(mode==='dict'?spkHTML('spell','拼',1):'')+'</div></div>'+
        '<div class="esk-paper"><div class="pp" style="width:'+Wd+'px;height:'+Ht+'px"><canvas class="bg" width="'+Wd*dpr+'" height="'+Ht*dpr+'" style="width:'+Wd+'px;height:'+Ht+'px"></canvas><canvas class="ink" width="'+Wd*dpr+'" height="'+Ht*dpr+'" style="width:'+Wd+'px;height:'+Ht+'px"></canvas><span class="hint">'+(mode==='trace'?'照著描':'自己寫')+'</span></div></div>'+
        '<div class="esk-fb" id="eskFb"></div><div class="esk-tools"><button class="esk-btn" data-a="clr">🧽 重寫</button><button class="esk-btn pri" data-a="ok">✓ 寫好了</button></div></div>';
      var bg=box.querySelector('canvas.bg'),cv=box.querySelector('canvas.ink'),bx=bg.getContext('2d'),x=cv.getContext('2d');bx.scale(dpr,dpr);x.scale(dpr,dpr);
      var m0=metrics(bx,100),F=Ht*.8/((m0.a+m0.d)/100),M=metrics(bx,F),base=Math.round(Ht*.1+M.a),guide=mode==='trace',strokes=[],cur=null,LW=Math.max(5,F*.08),fb=box.querySelector('#eskFb');
      function drawBg(){bx.clearRect(0,0,Wd,Ht);bx.lineWidth=1.6;[[base-M.a,'#a9cdef',[]],[base-M.x,'#f2a7a7',[7,6]],[base,'#7fb1e3',[]],[base+M.d,'#a9cdef',[]]].forEach(function(l){bx.beginPath();bx.setLineDash(l[2]);bx.strokeStyle=l[1];bx.moveTo(10,l[0]);bx.lineTo(Wd-10,l[0]);bx.stroke()});bx.setLineDash([]);
        if(guide){bx.font=F+'px '+FONT;bx.textAlign='center';bx.fillStyle='rgba(255,154,61,.22)';bx.fillText(L,Wd/2,base)}}
      function inkStyle(){x.strokeStyle=x.fillStyle='#24324f';x.lineCap=x.lineJoin='round';x.lineWidth=LW}
      function clearInk(){x.clearRect(0,0,Wd,Ht)}
      drawBg();inkStyle();
      function pt(e){var r=cv.getBoundingClientRect();return [(e.clientX-r.left)*Wd/r.width,(e.clientY-r.top)*Ht/r.height]}
      function seg(a,b){x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()}
      cv.addEventListener('pointerdown',function(e){e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(_){}var p=pt(e);cur=[p];strokes.push(cur);x.beginPath();x.arc(p[0],p[1],LW/2,0,7);x.fill();fb.innerHTML=''});
      cv.addEventListener('pointermove',function(e){if(!cur)return;e.preventDefault();var evs=e.getCoalescedEvents?e.getCoalescedEvents():[e];if(!evs.length)evs=[e];
        for(var k=0;k<evs.length;k++){var p=pt(evs[k]),l=cur[cur.length-1];if(Math.abs(p[0]-l[0])+Math.abs(p[1]-l[1])<1.5)continue;seg(l,p);cur.push(p)}});
      ['pointerup','pointercancel'].forEach(function(ev){cv.addEventListener(ev,function(){cur=null})});
      cv.addEventListener('touchstart',function(e){e.preventDefault()},{passive:false});cv.addEventListener('touchmove',function(e){e.preventDefault()},{passive:false});
      warm(Wd,Ht,F,base,function(){return me!==live});
      var say=function(){spkBtn=box.querySelector('[data-a="play"]');tts(w[0])};box.querySelector('[data-a="play"]').onclick=say;var sp=box.querySelector('[data-a="spell"]');if(sp)sp.onclick=function(){spkBtn=sp;tts(w[0].split('').join(', '),true)};
      if(li===0)later(say,300);
      box.querySelector('[data-a="clr"]').onclick=function(){C.sfx('tap');strokes=[];clearInk();fb.innerHTML=''};
      var okBtn=box.querySelector('[data-a="ok"]');okBtn.onclick=function(){if(!strokes.length){fb.innerHTML='<span class="info">先在格子裡寫「'+(mode==='trace'?L:'?')+'」喔</span>';return}okBtn.disabled=true;
        setTimeout(function(){if(me!==live)return;var r=checkInk(L,strokes,Wd,Ht,F,base),ok=inkOK(r,L);okBtn.disabled=false;if(global.ESK_DEBUG)console.log('esk',L,r);
          if(ok){C.sfx('ok');fb.innerHTML='<span class="ok">✓ 寫得很好！</span>';later(function(){cb(tries===0)},550);return}
          tries++;C.sfx('no');strokes=[];clearInk();
          if(tries>=3){guide=true;drawBg();fb.innerHTML='<span class="info">小機寫給你看：「'+L+'」，記住它的樣子</span>';later(function(){cb(false)},1900);return}
          if(mode==='dict'&&tries>=2){guide=true;drawBg()}
          fb.innerHTML='<span class="no">'+(r.gap>.02&&r.s>=.45?'比較像「'+r.best+'」喔，再寫一次'+(mode==='trace'?'「'+L+'」':''):r.o>.15||r.p<.6?'筆畫跑出去了，注意紅虛線和底線':r.r<.65||r.c<.4?'還少一點筆畫，寫完整一點':'再試一次！')+'</span>';C.say('再寫一次，注意高度！','oops')},30)}}
    nextWord()}

  /* ================= 🗣️ 口說 ================= */
  function speak(){stop();C.Learn.round0();head('口說');var SR=global.SpeechRecognition||global.webkitSpeechRecognition,framed=false;try{framed=global.top!==global.self}catch(e){framed=true}
    if(!SR||framed){B().innerHTML='<div class="esk m-speak"><div class="esk-qc"><div class="esk-pic">🎙️</div><p class="esk-ask">這裡不能用麥克風</p><span class="esk-sub">口說練習要在 GitHub 版用 Safari 打開才能用。Claude 裡的版本不允許使用麥克風；聽力和手寫這裡都能玩。</span></div><div class="esk-tools" style="grid-template-columns:1fr"><button class="esk-btn pri" data-a="back">回選單</button></div></div>';
      B().querySelector('[data-a="back"]').onclick=menu;return}
    var g=grade(),ws=pickWords(6),su=g>=3?sentUnits():[],items=ws.slice(0,6).map(function(w,i){return {t:i<3?'echo':'pic',w:w}});
    if(su.length){var s1=SENT[su[Math.floor(Math.random()*su.length)]](Math.random),s2,tr=0;do{s2=SENT[su[Math.floor(Math.random()*su.length)]](Math.random)}while(tr++<12&&s2.q+s2.pic===s1.q+s1.pic);items[4]={t:'talk',s:s1};items[5]={t:'talk',s:s2}}
    var i=-1,res=[],score=0;
    function next(){i++;if(i>=items.length)return result('speak',score,items.length,speak,'你的英文說得越來越好了！');
      var it=items[i],w=it.w,tries=0,model=it.t==='talk'?it.s.q:w[0],keys=it.t==='talk'?it.s.key:[w[0]],me0=live,listening=null;
      B().innerHTML='<div class="esk m-speak">'+top('speak',items.length,i,res)+'<div class="esk-qc">'+
        (it.t==='echo'?'<div class="esk-pic sm">'+w[1]+'</div><div class="esk-word">'+esc(w[0])+'</div><span class="esk-sub">聽小機念，再跟著說一次</span>':
         it.t==='pic'?'<div class="esk-pic sm">'+w[1]+'</div><p class="esk-ask" style="margin:0">'+esc(w[2])+'</p><span class="esk-sub">用英文說出來！</span>':
         '<div class="esk-pic sm'+(it.s.pic.length>3?' txt':'')+'">'+esc(it.s.pic)+'</div><div class="esk-q2">'+esc(it.s.q)+'</div><span class="esk-sub" id="eskHint">看圖，用英文回答小機</span>')+
        '<div class="esk-ears">'+spkHTML('play',it.t==='talk'?'聽小機問':'聽小機念')+'</div></div>'+
        '<div class="esk-micwrap" id="eskMW"><span class="rg"></span><span class="rg b"></span><button class="esk-mic" data-a="mic" aria-label="按一下開始說">🎤</button></div>'+
        '<div class="esk-say"><span class="av">🤖</span><div class="bb" id="eskMsg">按一下 🎤 開始說，說完會自動停</div></div><button class="esk-skip" data-a="skip">跳過這題 ›</button></div>';
      var q=B(),msg=q.querySelector('#eskMsg'),mic=q.querySelector('[data-a="mic"]'),mw=q.querySelector('#eskMW');spkBtn=q.querySelector('[data-a="play"]');
      function bubble(h,cls){msg.className='bb'+(cls?' '+cls:'');msg.innerHTML=h}
      function reset(h,cls){mw.classList.remove('on');mic.textContent='🎤';if(h!=null)bubble(h,cls)}
      q.querySelector('[data-a="play"]').onclick=function(){if(listening)listening.finish('cancel');spkBtn=this;tts(model)};if(it.t!=='pic')later(function(){tts(model)},400);
      q.querySelector('[data-a="skip"]').onclick=function(){if(listening)listening.finish('skip');res[i]=0;C.say('沒關係，下一題！','idle');next()};
      function judge(alts,why){if(me0!==live)return;var ok=alts.length&&heard(alts,keys);
        if(ok){bubble('我聽到：<b>'+esc(alts[0])+'</b> ✅ 說得好！','ok');if(!tries){score++;res[i]=1}else res[i]=0;C.award(2);C.sfx('ok');if(w)C.Learn.ok(w);C.say(it.t==='talk'?'說得好！'+it.s.a:'說得好！'+w[0],'happy');later(next,1700);return}
        if(!alts.length){reset(why==='not-allowed'?'⚠️ 麥克風沒有開：請在跳出的視窗按「允許」，或到「設定 › Safari › 麥克風」改成允許。':
          why==='service-not-allowed'?'⚠️ 不能用語音辨識：請用 Safari 打開（不要用主畫面捷徑），並到「設定 › 一般 › 鍵盤」打開「聽寫」。':
          why==='network'?'⚠️ 語音辨識需要網路，檢查一下網路再試。':why==='audio-capture'?'⚠️ 找不到麥克風，關掉其他在用麥克風的 App 再試。':'我沒聽到聲音耶，再按一次 🎤，靠近一點說！',why==='timeout'||why==='no-speech'||why==='end'||why==='stop'?'':'no');return}
        tries++;C.sfx('no');reset('我聽到：<b>'+esc(alts[0])+'</b>　'+(tries>=3?'沒關係，聽我再念一次，下一題！':tries===1?'再說一次，大聲一點、慢一點！':'先聽我念，再跟著說！'),'no');
        if(tries>=3){res[i]=0;later(function(){spkBtn=null;tts(it.t==='talk'?it.s.a:w[0],true)},500);later(next,3300)}
        else{C.say(tries===1?'再說一次，大聲一點、慢一點！':'先聽小機念，再跟著說！','oops');var hn=document.getElementById('eskHint');if(hn&&it.t==='talk')hn.textContent='可以這樣說：'+it.s.a;if(tries===2)later(function(){spkBtn=null;tts(it.t==='talk'?it.s.a:w[0],true)},500)}}
      mic.onclick=function(){if(listening){listening.finish('stop');return}
        if(ssBusy())try{global.speechSynthesis.cancel()}catch(e){}try{if(navigator.audioSession)navigator.audioSession.type='play-and-record'}catch(e){}
        var r,alts=[],err='',done=false,wd=null,quiet=null;
        function finish(why){if(done)return;done=true;clearTimeout(wd);clearTimeout(quiet);listening=null;if(rec===r)rec=null;try{r.abort()}catch(e){}reset();setTimeout(audioOut,250);if(why==='skip'||why==='cancel'){bubble('按一下 🎤 開始說，說完會自動停');return}judge(alts,err||why)}
        try{r=new SR();r.lang='en-US';r.interimResults=true;r.maxAlternatives=3;r.continuous=false}catch(e){reset('⚠️ 這台裝置不能用語音辨識','no');return}
        listening={finish:finish};rec=r;mw.classList.add('on');mic.textContent='⏹';bubble('🔴 我在聽…說完會自動停，也可以再按一下');
        r.onresult=function(e){alts=[];for(var a=0;a<e.results.length;a++)for(var b=0;b<e.results[a].length;b++)if(e.results[a][b].transcript)alts.push(e.results[a][b].transcript);
          var all=[];for(a=0;a<e.results.length;a++)all.push(e.results[a][0].transcript);if(all.length>1)alts.unshift(all.join(' '));
          if(alts.length)bubble('🔴 我聽到：<b>'+esc(alts[0])+'</b>');
          if(heard(alts,keys))return finish('ok');clearTimeout(quiet);quiet=setTimeout(function(){finish('quiet')},1400);
          if(e.results[e.results.length-1].isFinal)finish('final')};
        r.onerror=function(e){err=e&&e.error||'';if(err==='aborted')return;finish(err)};
        r.onend=function(){finish('end')};
        try{r.start()}catch(e){err='start';finish('start');return}
        wd=setTimeout(function(){finish('timeout')},7000)}}
    C.say('準備好就按麥克風，對小機說英文！','happy');next()}

  return {version:'11.2.0',_heard:heard,_check:checkInk,_ok:inkOK,_SENT:SENT,menu:menu,listen:listen,write:write,speak:speak};
};
})(window);
