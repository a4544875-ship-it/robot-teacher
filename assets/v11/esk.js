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

/* ---- 手寫：把字母用字型畫成「標準遮罩」，跟孩子的筆跡比對覆蓋率 ---- */
var FONT='"Andika","Comic Sans MS","Chalkboard SE","Arial Rounded MT Bold",sans-serif';
function metrics(ctx,F){ctx.font=F+'px '+FONT;var x=ctx.measureText('x').actualBoundingBoxAscent||F*.5,l=ctx.measureText('l').actualBoundingBoxAscent||F*.72,g=ctx.measureText('g').actualBoundingBoxDescent||F*.24;return {x:x,a:Math.max(l,ctx.measureText('A').actualBoundingBoxAscent||0),d:g}}
/* 判斷方式：先算孩子的筆跡跟 26 個字母各自有多像（雙向覆蓋率＋3×3 分區＋有沒有超出字母範圍），
   目標字母要是最像的（或幾乎一樣像），而且本身夠像，才算寫對。這樣 b/d、n/h、c/o 不會互相混過。 */
var ABC='abcdefghijklmnopqrstuvwxyz';
function checkInk(letter,strokes,W,H,F,base){var S=128/W,w=Math.round(W*S),h=Math.round(H*S),f=F*S,cache={};
  function cv(){var c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d');x.textAlign='center';x.textBaseline='alphabetic';x.lineCap=x.lineJoin='round';x.font=f+'px '+FONT;return x}
  function ink(lw){var x=cv();x.strokeStyle=x.fillStyle='#000';x.lineWidth=lw;strokes.forEach(function(s){x.beginPath();s.forEach(function(pt,i){if(i)x.lineTo(pt[0]*S,pt[1]*S);else x.moveTo(pt[0]*S,pt[1]*S)});if(s.length===1){x.arc(s[0][0]*S,s[0][1]*S,lw/2,0,7);x.fill()}else x.stroke()});return x.getImageData(0,0,w,h).data}
  var K=ink(f*.06),KD=ink(f*.17),kp=[];for(var i=3;i<K.length;i+=4)if(K[i]>100)kp.push((i-3)/4);
  function score(L){var x=cv();x.fillStyle=x.strokeStyle='#000';x.fillText(L,w/2,base*S);var G0=x.getImageData(0,0,w,h).data;x.lineWidth=f*.13;x.strokeText(L,w/2,base*S);var GD=x.getImageData(0,0,w,h).data;
    var ng=0,gi=0,x0=w,x1=0,y0=h,y1=0,k,px,py;for(k=3;k<G0.length;k+=4)if(G0[k]>100){ng++;if(KD[k]>60)gi++;px=((k-3)/4)%w;py=Math.floor((k-3)/4/w);if(px<x0)x0=px;if(px>x1)x1=px;if(py<y0)y0=py;if(py>y1)y1=py}
    var ki=0,out=0,m=f*.08;kp.forEach(function(q){if(GD[q*4+3]>60)ki++;px=q%w;py=Math.floor(q/w);if(px<x0-m||px>x1+m||py<y0-m||py>y1+m)out++});
    var cg=[0,0,0,0,0,0,0,0,0],ch=[0,0,0,0,0,0,0,0,0],cw=(x1-x0+1)/3,chh=(y1-y0+1)/3,worst=1;
    for(k=3;k<G0.length;k+=4)if(G0[k]>100){px=((k-3)/4)%w;py=Math.floor((k-3)/4/w);var c=Math.min(2,Math.floor((px-x0)/cw))+3*Math.min(2,Math.floor((py-y0)/chh));cg[c]++;if(KD[k]>60)ch[c]++}
    for(k=0;k<9;k++)if(cg[k]>=ng*.05)worst=Math.min(worst,ch[k]/cg[k]);
    var p=kp.length?ki/kp.length:0,r=ng?gi/ng:0,o=kp.length?out/kp.length:1,f1=p+r?2*p*r/(p+r):0;
    return {p:p,r:r,c:worst,o:o,s:f1*(.6+.4*worst)*(1-o)}}
  var me=score(letter),best=me.s,bl=letter;ABC.split('').forEach(function(L){if(L===letter)return;var t=score(L);if(t.s>best){best=t.s;bl=L}});
  me.best=bl;me.gap=best-me.s;me.n=kp.length;return me}
var CONF=' bd db pq qp nh hn nu un mn nm co oc il li ij ji uv vu vw wv ft tf ce ec ao oa gq qg hb bh rn nr ea ae yv vy ';
function inkOK(r,L){return r.n>0&&r.s>=.5&&r.p>=.6&&(r.best===undefined||r.gap<=.02||(r.gap<=.09&&CONF.indexOf(' '+L+r.best+' ')<0))}
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
var CSS='.esk{display:flex;flex-direction:column;gap:12px}.esk-menu{display:grid;gap:12px}.esk-card{display:flex;gap:14px;align-items:center;text-align:left;padding:16px;border-radius:22px;background:var(--surface,#fff);box-shadow:var(--shadow,0 3px 10px rgba(0,0,0,.1));color:inherit}'+
 '.esk-card .i{font-size:44px;font-family:var(--font-emoji,inherit)}.esk-card b{font-size:20px;display:block}.esk-card small{opacity:.8;line-height:1.4;display:block}.esk-note{font-size:13px;opacity:.8;line-height:1.5;margin:0}'+
 '.esk-q{background:var(--surface,#fff);border-radius:22px;padding:16px;text-align:center;box-shadow:var(--shadow,0 3px 10px rgba(0,0,0,.1))}.esk-pic{font-size:64px;line-height:1.15;white-space:pre-line;font-family:var(--font-emoji,inherit)}.esk-big{font-size:28px;font-weight:800}'+
 '.esk-ear{display:flex;gap:10px;justify-content:center;margin-top:10px}.esk-ear button{font-size:22px;padding:10px 18px;border-radius:999px;background:var(--sky,#bfe3ff);font-weight:800}'+
 '.esk-ops{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.esk-ops.one{grid-template-columns:1fr}.esk-ops button{min-height:68px;border-radius:18px;background:var(--surface,#fff);box-shadow:var(--shadow,0 3px 10px rgba(0,0,0,.1));font-size:22px;font-weight:800;padding:8px;color:inherit}'+
 '.esk-ops button.e{font-size:44px;font-family:var(--font-emoji,inherit)}.esk-ops button.ok{background:#bff0c9}.esk-ops button.no{background:#ffd0cc}.esk-ops button:disabled{opacity:.92}'+
 '.esk-pad{position:relative;align-self:center;touch-action:none;border-radius:18px;background:#fffdf6;box-shadow:inset 0 0 0 2px #e8dcc0;max-width:100%}.esk-pad canvas{display:block;touch-action:none;border-radius:18px}'+
 '.esk-slots{display:flex;gap:6px;justify-content:center;font:700 30px '+FONT+';letter-spacing:2px}.esk-slots span{min-width:30px;border-bottom:3px solid #c9b98f;text-align:center}.esk-slots span.cur{border-color:#ff9b3d;color:#ff9b3d}.esk-slots span.done{color:#1f9d55}'+
 '.esk-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}.esk-row .btn{min-width:120px}.esk-mic{width:110px;height:110px;border-radius:50%;font-size:52px;background:#ffb3a7;box-shadow:0 6px 0 #e07d6d;align-self:center}'+
 '.esk-ear button.on{background:#ffd36b}.esk-mic.on{background:#ff6f5c;animation:eskp 1s infinite}@keyframes eskp{50%{transform:scale(1.07)}}.esk-heard{min-height:24px;text-align:center;font-size:15px}.esk-dots{display:flex;gap:6px;justify-content:center}.esk-dots i{width:10px;height:10px;border-radius:50%;background:#ddd}.esk-dots i.ok{background:#3cc46a}.esk-dots i.no{background:#ff7a6b}.esk-dots i.cur{background:#ffb02e}';

global.EskFactory=function(C){
  var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
  var G={id:'esk',cls:'v2new feat',ico:'🎧',tag:'新功能',zh:'聽說寫教室',en:'Listen · Speak · Write',d:'聽單字和句子、對小機說英文、在四線格上寫字母，題目跟著學校進度。'};
  C.GAMES.unshift(G);C.GAME_FN.esk=function(){menu()};
  var live=0,timers=[],rec=null;
  function later(f,ms){var me=live;timers.push(setTimeout(function(){if(me===live)f()},ms))}
  function stop(){live++;timers.forEach(clearTimeout);timers=[];if(rec){try{rec.abort()}catch(e){}rec=null}try{global.speechSynthesis.cancel()}catch(e){}audioOut()}
  C.addCleanup(stop);
  var B=function(){return C.body()},esc=C.esc;
  /* iPhone／iPad 的語音：保留 utterance（避免被回收後沒聲音）、0.7 秒沒開始就重念一次、麥克風用完先把聲音切回喇叭 */
  var keep=[],spkBtn=null;
  function audioOut(){try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}try{C.resumeAudio&&C.resumeAudio()}catch(e){}}
  function tts(t,slow,cb){if(C.muted()){cb&&cb();return}var ss=global.speechSynthesis;if(!ss){cb&&cb();return}audioOut();var tries=0,me=live,fired=false;
    function fin(){if(fired)return;fired=true;if(spkBtn)spkBtn.classList.remove('on');if(me===live&&cb)cb()}
    function go(){tries++;var u=new SpeechSynthesisUtterance(t),started=false;u.lang='en-US';u.rate=slow?.55:.8;u.volume=1;keep.push(u);if(keep.length>6)keep.shift();
      u.onstart=function(){started=true;if(spkBtn)spkBtn.classList.add('on')};u.onend=fin;u.onerror=function(e){if(!started&&tries<2&&e&&e.error!=='interrupted'&&e.error!=='canceled')setTimeout(go,250);else fin()};
      try{if(ss.paused)ss.resume()}catch(e){}try{ss.speak(u)}catch(e){}
      setTimeout(function(){if(started||fired||ss.speaking)return;if(tries<2){try{ss.cancel()}catch(e){}setTimeout(go,200)}else fin()},900+t.length*20)}
    try{if(ss.speaking||ss.pending)ss.cancel()}catch(e){}setTimeout(go,ss.speaking?160:30)}
  function grade(){var P=C.PGX();var g=P&&C.isKid()?P.grade(C.who()):0;return g||(['二','三','四','五','六'].indexOf(C.egrade())+2)}
  function pool(){var p=C.poolW()||[];return p.filter(function(w){return w&&/^[a-z]+$/.test(w[0])})}
  function curWords(){var P=C.PGX(),S=P&&C.isKid()&&P.state(C.who(),'e');return S?S.U[4]:[]}
  function sentUnits(){var P=C.PGX(),S=P&&C.isKid()&&P.state(C.who(),'e');if(!S)return [];var o=[];S.units.slice(0,S.cur+1).forEach(function(u){if(SENT[u[0]])o.push(u[0])});
    if(S.prev)S.prev.forEach(function(u){if(SENT[u[0]])o.push(u[0])});var c=S.U[0];if(SENT[c])o=o.concat([c,c]);return o}
  function pickWords(n){var p=pool(),cw=curWords(),a=shuf(p.filter(function(w){return cw.indexOf(w[0])>=0})),b=shuf(p.filter(function(w){return cw.indexOf(w[0])<0}));return a.slice(0,Math.ceil(n*.6)).concat(b).concat(a.slice(Math.ceil(n*.6))).slice(0,n)}
  function dots(n,i,res){return '<div class="esk-dots">'+Array.apply(null,{length:n}).map(function(_,j){return '<i class="'+(res[j]===1?'ok':res[j]===0?'no':j===i?'cur':'')+'"></i>'}).join('')+'</div>'}
  function head(t){C.shell(G.zh);try{document.getElementById('gTitle').textContent=G.zh+'・'+t}catch(e){}}

  function menu(){stop();try{C.musicOff&&C.musicOff()}catch(e){}head('選一項');var P=C.PGX(),S=P&&C.isKid()&&P.state(C.who(),'e');
    B().innerHTML='<div class="esk"><p class="esk-note">'+(S?'📘 現在練：'+esc(S.book)+'「'+esc(S.U[1])+'」的單字和句型':'跟著年級的單字練習')+'</p><div class="esk-menu">'+
      '<button class="esk-card" data-m="listen"><span class="i">🎧</span><span><b>聽力</b><small>聽小機說，選出圖、單字、開頭字母'+(grade()>=3?'，還有回答課本句型':'')+'</small></span></button>'+
      '<button class="esk-card" data-m="write"><span class="i">✍️</span><span><b>手寫</b><small>在英文四線格上寫字母：先描紅，再聽寫'+(grade()>=3?'整個單字':'')+'</small></span></button>'+
      '<button class="esk-card" data-m="speak"><span class="i">🗣️</span><span><b>口說</b><small>按麥克風對小機說英文，小機會告訴你聽到什麼</small></span></button></div>'+
      '<p class="esk-note">小提醒：iPhone 要把側邊靜音鍵打開才聽得到聲音。口說要允許使用麥克風。</p></div>';
    B().querySelectorAll('[data-m]').forEach(function(b){b.addEventListener('click',function(){C.sfx('tap');({listen:listen,write:write,speak:speak})[b.dataset.m]()})});
    C.say('今天想練聽、說，還是寫？','happy')}

  /* ================= 🎧 聽力 ================= */
  function listen(){stop();C.Learn.round0();head('聽力');var g=grade(),ws=pickWords(8),su=sentUnits(),types=g<=2?['pic','first','pic','first','pic','pic','first','pic']:['pic','word','first','sent','word','sent','pic','sent'];
    var items=types.map(function(t,i){var w=ws[i%ws.length];if(t==='sent'){if(!su.length)t='word';else{var s=SENT[su[Math.floor(Math.random()*su.length)]](Math.random);return {t:'sent',s:s,w:w}}}return {t:t,w:w}}),i=-1,res=[],score=0;
    function next(){i++;if(i>=items.length)return done();var it=items[i],w=it.w,ops,h='',first=true;
      if(it.t==='pic'){ops=shuf([w].concat((C.others(w,6)||[]).filter(function(x){return x[1]!==w[1]}).slice(0,3)));h='<div class="esk-big">聽一聽，是哪一個？</div>'}
      else if(it.t==='word'){ops=shuf([w].concat((C.others(w,6)||[]).filter(function(x){return x[0]!==w[0]}).slice(0,3)));h='<div class="esk-big">聽一聽，是哪個單字？</div>'}
      else if(it.t==='first'){var L=w[0][0],abc='abcdefghijklmnopqrstuvwxyz',o=[L];while(o.length<4){var c=abc[Math.floor(Math.random()*26)];if(o.indexOf(c)<0)o.push(c)}ops=shuf(o);h='<div class="esk-big">第一個字母是什麼？</div><div class="esk-pic">'+w[1]+'</div>'}
      else{ops=shuf([it.s.a].concat(it.s.wrong.slice(0,2)));h='<div class="esk-pic">'+esc(it.s.pic)+'</div><div class="esk-big">小機問你，怎麼回答？</div>'}
      var say=it.t==='sent'?it.s.q:w[0];
      B().innerHTML='<div class="esk">'+dots(items.length,i,res)+'<div class="esk-q">'+h+'<div class="esk-ear"><button data-a="play">🔊 再聽</button><button data-a="slow">🐢 慢慢說</button></div></div><div class="esk-ops'+(it.t==='sent'?' one':'')+'">'+
        ops.map(function(o,j){return it.t==='pic'?'<button class="e" data-j="'+j+'">'+o[1]+'</button>':it.t==='word'?'<button class="en" data-j="'+j+'">'+esc(o[0])+'</button>':it.t==='first'?'<button class="en" data-j="'+j+'">'+o.toUpperCase()+' '+o+'</button>':'<button class="en" data-j="'+j+'">'+esc(o)+'</button>'}).join('')+'</div><div id="eskNx"></div></div>';
      var q=B();spkBtn=q.querySelector('[data-a="play"]');spkBtn.onclick=function(){tts(say)};q.querySelector('[data-a="slow"]').onclick=function(){tts(say,true)};later(function(){tts(say)},350);
      q.querySelectorAll('[data-j]').forEach(function(b){b.addEventListener('click',function(){var o=ops[+b.dataset.j],right=it.t==='pic'||it.t==='word'?o===w:it.t==='first'?o===w[0][0]:o===it.s.a;
        if(right){b.classList.add('ok');q.querySelectorAll('[data-j]').forEach(function(x){x.disabled=true});C.sfx('ok');if(first){score++;res[i]=1;C.award(1);if(it.t!=='sent')C.Learn.ok(w)}else if(res[i]===undefined)res[i]=0;
          if(it.t==='sent')tts(it.s.a);C.say(it.t==='sent'?'答對了！'+it.s.a:it.t==='first'?w[0]+' 是 '+w[0][0].toUpperCase()+' 開頭！':w[0]+' = '+w[2],'happy');later(next,it.t==='sent'?1800:1100)}
        else{b.classList.add('no');b.disabled=true;C.sfx('no');if(first){res[i]=0;if(it.t!=='sent')C.Learn.bad(w)}first=false;tts(say,true);C.say('再聽一次，慢慢聽！','oops')}})})}
    function done(){C.finish({icon:score>=items.length-1?'🏆':'🎧',title:'聽力練習完成！',text:'第一次就聽對 '+score+' / '+items.length+' 題。',say:score>=6?'耳朵好靈！':'多聽幾次就會越來越熟！',replay:listen,score:score,total:items.length})}
    C.say('戴好耳朵，聽小機說！','happy');next()}

  /* ================= ✍️ 手寫 ================= */
  var fontReady=null;function loadFont(){if(!fontReady)fontReady=(document.fonts&&document.fonts.load?document.fonts.load('80px "Andika"').catch(function(){}):Promise.resolve());return fontReady}
  function write(){stop();C.Learn.round0();head('手寫');B().innerHTML='<div class="esk"><div class="esk-q"><div class="esk-big">準備紙和筆…</div></div></div>';
    var me=live;loadFont().then(function(){if(me===live)write2()})}
  function write2(){var g=grade(),ws=pickWords(12).filter(function(w){return w[0].length>=2&&w[0].length<=(g<=2?4:6)});if(ws.length<3)ws=pool().filter(function(w){return w[0].length<=5});ws=ws.slice(0,g<=2?3:4);
    var modes=ws.map(function(_,i){return g<=2||i<2?'trace':'dict'}),wi=-1,score=0,res=[];
    function nextWord(){wi++;if(wi>=ws.length)return done();var w=ws[wi],mode=modes[wi],li=0,wrongAny=false;
      function nextLetter(){if(li>=w[0].length){if(mode==='dict'){if(wrongAny)C.Learn.bad(w);else C.Learn.ok(w)}res[wi]=wrongAny?0:1;if(!wrongAny)score++;C.award(2);C.sfx('win');tts(w[0]);C.say('寫完了！'+w[0]+' = '+w[2],'happy');later(nextWord,1500);return}
        pad(w,mode,li,function(ok){if(!ok)wrongAny=true;li++;nextLetter()})}
      C.say(mode==='trace'?'照著淡淡的字描描看，從上往下寫！':'聽小機念，把單字一個字母一個字母寫出來！','happy');nextLetter()}
    function pad(w,mode,li,cb){var L=w[0][li],tries=0,box=B();
      var Wd=Math.min(340,Math.max(240,(box.clientWidth||340)-8)),Ht=Math.round(Wd*.82),dpr=Math.min(2,global.devicePixelRatio||1);
      box.innerHTML='<div class="esk">'+dots(ws.length,wi,res)+'<div class="esk-q"><div class="esk-pic" style="font-size:44px">'+w[1]+'</div><div class="esk-slots">'+w[0].split('').map(function(c,j){return '<span class="'+(j<li?'done':j===li?'cur':'')+'">'+(j<li||mode==='trace'?c:j===li?'?':'_')+'</span>'}).join('')+'</div>'+
        '<small>'+esc(w[2])+(mode==='trace'?'・描紅：照著淡淡的字寫':'・聽寫：第 '+(li+1)+' 個字母')+'</small><div class="esk-ear"><button data-a="play">🔊 聽</button>'+(mode==='dict'?'<button data-a="spell">🔤 拼給我聽</button>':'')+'</div></div>'+
        '<div class="esk-pad" style="width:'+Wd+'px"><canvas width="'+Wd*dpr+'" height="'+Ht*dpr+'" style="width:'+Wd+'px;height:'+Ht+'px"></canvas></div><div class="esk-heard" id="eskMsg"></div><div class="esk-row"><button class="btn ghost" data-a="clr">🧽 重寫</button><button class="btn alt" data-a="ok">✅ 寫好了</button></div></div>';
      var cv=box.querySelector('canvas'),x=cv.getContext('2d');x.scale(dpr,dpr);var m0=metrics(x,100),F=Ht*.8/((m0.a+m0.d)/100),M=metrics(x,F),base=Math.round(Ht*.1+M.a),guide=mode==='trace',strokes=[],cur=null;
      function draw(){x.clearRect(0,0,Wd,Ht);x.lineWidth=1.5;[[base-M.a,'#9fc4e8',[]],[base-M.x,'#f0a3a3',[6,5]],[base,'#9fc4e8',[]],[base+M.d,'#9fc4e8',[]]].forEach(function(l){x.beginPath();x.setLineDash(l[2]);x.strokeStyle=l[1];x.moveTo(8,l[0]);x.lineTo(Wd-8,l[0]);x.stroke()});x.setLineDash([]);
        if(guide){x.font=F+'px '+FONT;x.textAlign='center';x.fillStyle='rgba(120,130,160,.22)';x.fillText(L,Wd/2,base)}
        x.strokeStyle='#2b3a67';x.fillStyle='#2b3a67';x.lineCap=x.lineJoin='round';x.lineWidth=Math.max(5,F*.08);strokes.forEach(function(s){x.beginPath();s.forEach(function(p,i){if(i)x.lineTo(p[0],p[1]);else x.moveTo(p[0],p[1])});if(s.length===1){x.arc(s[0][0],s[0][1],x.lineWidth/2,0,7);x.fill()}else x.stroke()})}
      draw();
      function pt(e){var r=cv.getBoundingClientRect();return [(e.clientX-r.left)*Wd/r.width,(e.clientY-r.top)*Ht/r.height]}
      cv.addEventListener('pointerdown',function(e){e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(_){}cur=[pt(e)];strokes.push(cur);draw()});
      cv.addEventListener('pointermove',function(e){if(!cur)return;e.preventDefault();cur.push(pt(e));draw()});
      ['pointerup','pointercancel','pointerleave'].forEach(function(ev){cv.addEventListener(ev,function(){cur=null})});
      cv.addEventListener('touchmove',function(e){e.preventDefault()},{passive:false});
      var msg=box.querySelector('#eskMsg'),say=function(){tts(w[0])};box.querySelector('[data-a="play"]').onclick=say;var sp=box.querySelector('[data-a="spell"]');if(sp)sp.onclick=function(){tts(w[0].split('').join(', '),true)};
      if(mode==='dict'&&li===0)later(say,300);if(mode==='trace'&&li===0)later(say,300);
      box.querySelector('[data-a="clr"]').onclick=function(){C.sfx('tap');strokes=[];draw()};
      box.querySelector('[data-a="ok"]').onclick=function(){if(!strokes.length){msg.textContent='先寫字母喔！';return}var r=checkInk(L,strokes,Wd,Ht,F,base),ok=inkOK(r,L);
        if(global.ESK_DEBUG)console.log('esk',L,r);
        if(ok){C.sfx('ok');msg.textContent='✅ 寫得很好！';later(function(){cb(tries===0)},500);return}
        tries++;C.sfx('no');strokes=[];
        if(tries>=3){guide=true;draw();msg.textContent='小機寫給你看：「'+L+'」，記住它的樣子！';later(function(){cb(false)},1800);return}
        if(mode==='dict'&&tries>=2)guide=true;draw();
        msg.textContent=r.gap>.02&&r.s>=.45?'看起來比較像「'+r.best+'」喔，再寫一次「'+L+'」！':r.o>.15||r.p<.6?'有些筆畫跑出去了，注意紅色虛線和底線的位置！':r.r<.65||r.c<.4?'還少了一點筆畫，再寫完整一點！':'再試一次！';C.say('再寫一次，注意高度！','oops')}}
    function done(){C.finish({icon:score>=ws.length?'🏆':'✍️',title:'手寫練習完成！',text:'一次就寫對的單字：'+score+' / '+ws.length+' 個。',say:'字越寫越漂亮了！',replay:write,score:score,total:ws.length})}
    nextWord()}

  /* ================= 🗣️ 口說 ================= */
  function speak(){stop();C.Learn.round0();head('口說');var SR=global.SpeechRecognition||global.webkitSpeechRecognition,framed=false;try{framed=global.top!==global.self}catch(e){framed=true}
    if(!SR||framed){B().innerHTML='<div class="esk"><div class="esk-q"><div class="esk-pic">🎙️</div><div class="esk-big">這裡不能用麥克風</div><p class="esk-note">口說練習要在 GitHub 版（用 Safari 或 Chrome 打開，或加到主畫面）才能用。Claude 裡的版本不允許使用麥克風。</p></div><div class="esk-row"><button class="btn" data-a="back">回選單</button></div></div>';
      B().querySelector('[data-a="back"]').onclick=menu;return}
    var g=grade(),ws=pickWords(6),su=g>=3?sentUnits():[],items=ws.slice(0,6).map(function(w,i){return {t:i<3?'echo':'pic',w:w}});
    if(su.length){var s1=SENT[su[Math.floor(Math.random()*su.length)]](Math.random),s2,tr=0;do{s2=SENT[su[Math.floor(Math.random()*su.length)]](Math.random)}while(tr++<12&&s2.q+s2.pic===s1.q+s1.pic);items[4]={t:'talk',s:s1};items[5]={t:'talk',s:s2}}
    var i=-1,res=[],score=0;
    function next(){i++;if(i>=items.length)return done();var it=items[i],w=it.w,tries=0,model=it.t==='talk'?it.s.q:w[0],keys=it.t==='talk'?it.s.key:[w[0]];
      B().innerHTML='<div class="esk">'+dots(items.length,i,res)+'<div class="esk-q">'+
        (it.t==='echo'?'<div class="esk-pic">'+w[1]+'</div><div class="esk-big en">'+esc(w[0])+'</div><small>聽小機念，再跟著說一次</small>':
         it.t==='pic'?'<div class="esk-pic">'+w[1]+'</div><div class="esk-big">'+esc(w[2])+'</div><small>用英文說出來！</small>':
         '<div class="esk-pic">'+esc(it.s.pic)+'</div><div class="esk-big en">'+esc(it.s.q)+'</div><small id="eskHint">看圖，用英文回答小機</small>')+
        '<div class="esk-ear"><button data-a="play">🔊 聽小機'+(it.t==='talk'?'問':'念')+'</button></div></div><button class="esk-mic" data-a="mic" aria-label="按一下開始說">🎤</button><div class="esk-heard" id="eskMsg">按一下 🎤，說完會自動停</div><div class="esk-row"><button class="btn ghost" data-a="skip">跳過這題</button></div></div>';
      var q=B(),msg=q.querySelector('#eskMsg'),mic=q.querySelector('[data-a="mic"]');
      q.querySelector('[data-a="play"]').onclick=function(){if(listening)listening.finish('cancel');tts(model)};if(it.t!=='pic')later(function(){tts(model)},450);
      q.querySelector('[data-a="skip"]').onclick=function(){if(listening)listening.finish('skip');res[i]=0;C.say('沒關係，下一題！','idle');next()};
      spkBtn=q.querySelector('[data-a="play"]');var listening=null;
      function reset(t){mic.classList.remove('on');mic.textContent='🎤';if(t!=null)msg.textContent=t}
      function judge(alts,why){if(me0!==live)return;var ok=alts.length&&heard(alts,keys);
        if(ok){msg.textContent='小機聽到：「'+alts[0]+'」 ✅';if(!tries){score++;res[i]=1}else res[i]=0;C.award(2);C.sfx('ok');if(w)C.Learn.ok(w);C.say(it.t==='talk'?'說得好！'+it.s.a:'說得好！'+w[0],'happy');later(next,1600);return}
        if(!alts.length){reset(why==='not-allowed'?'⚠️ 麥克風沒有開：請在跳出的視窗按「允許」，或到「設定 › Safari › 麥克風」改成允許。':
          why==='service-not-allowed'?'⚠️ 不能用語音辨識：請用 Safari 打開（不要用主畫面捷徑），並到「設定 › 一般 › 鍵盤」打開「聽寫」。':
          why==='network'?'⚠️ 語音辨識需要網路，檢查一下網路再試。':why==='audio-capture'?'⚠️ 找不到麥克風，關掉其他在用麥克風的 App 再試。':'沒聽到聲音，再按一次 🎤，靠近一點說！');return}
        tries++;C.sfx('no');reset('小機聽到：「'+alts[0]+'」');
        if(tries>=3){res[i]=0;msg.textContent+='　聽小機再念一次，下一題！';later(function(){tts(it.t==='talk'?it.s.a:w[0],true)},500);later(next,3200)}
        else{C.say(tries===1?'再說一次，大聲一點、慢一點！':'先聽小機念，再跟著說！','oops');var hn=document.getElementById('eskHint');if(hn&&it.t==='talk')hn.textContent='可以這樣說：'+it.s.a;if(tries===2)later(function(){tts(it.t==='talk'?it.s.a:w[0],true)},500)}}
      var me0=live;
      mic.onclick=function(){if(listening){listening.finish('stop');return}
        try{global.speechSynthesis.cancel()}catch(e){}try{if(navigator.audioSession)navigator.audioSession.type='play-and-record'}catch(e){}
        var r,alts=[],err='',done=false,wd=null,quiet=null;
        function finish(why){if(done)return;done=true;clearTimeout(wd);clearTimeout(quiet);listening=null;if(rec===r)rec=null;try{r.abort()}catch(e){}reset();setTimeout(audioOut,250);if(why==='skip'||why==='cancel'){msg.textContent='按一下 🎤，說完會自動停';return}judge(alts,err||why)}
        try{r=new SR();r.lang='en-US';r.interimResults=true;r.maxAlternatives=3;r.continuous=false}catch(e){reset('⚠️ 這台裝置不能用語音辨識');return}
        listening={finish:finish};rec=r;mic.classList.add('on');mic.textContent='⏹';msg.textContent='🔴 小機在聽…說完再按一下也可以';
        r.onresult=function(e){alts=[];for(var a=0;a<e.results.length;a++)for(var b=0;b<e.results[a].length;b++)if(e.results[a][b].transcript)alts.push(e.results[a][b].transcript);
          var all=[];for(a=0;a<e.results.length;a++)all.push(e.results[a][0].transcript);if(all.length>1)alts.unshift(all.join(' '));
          if(alts.length)msg.textContent='🔴 聽到：「'+alts[0]+'」';
          if(heard(alts,keys))return finish('ok');clearTimeout(quiet);quiet=setTimeout(function(){finish('quiet')},1400);
          if(e.results[e.results.length-1].isFinal)finish('final')};
        r.onerror=function(e){err=e&&e.error||'';if(err!=='no-speech'&&err!=='aborted')finish(err);else if(err==='no-speech')finish('no-speech')};
        r.onend=function(){finish('end')};
        try{r.start()}catch(e){err='start';finish('start');return}
        wd=setTimeout(function(){finish('timeout')},7000)}}
    function done(){C.finish({icon:score>=5?'🏆':'🗣️',title:'口說練習完成！',text:'一次就說對 '+score+' / '+items.length+' 題。',say:'你的英文說得越來越好了！',replay:speak,score:score,total:items.length})}
    C.say('準備好就按麥克風，對小機說英文！','happy');next()}

  return {version:'11.0.0',_heard:heard,_check:checkInk,_ok:inkOK,_SENT:SENT,menu:menu,listen:listen,write:write,speak:speak};
};
})(window);
