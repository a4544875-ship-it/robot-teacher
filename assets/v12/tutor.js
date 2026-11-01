/* v12 小機老師（離線版）：不用 AI、不連網路，只用 App 裡的資料回答。
   會的事：① 算數學（直式步驟、先乘除後加減、分數、餘數）② 單位換算 ③ 英文單字中英查詢與拼字
   ④ 自然題庫（第一島＋第二島，約 1,200 題）找最相關的題目與說明 ⑤ 告訴孩子學校現在教到哪 ⑥ 出一題練習並批改。
   找不到就老實說「小機還不會」，不亂編答案。 */
(function(global){
'use strict';
function escH(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fx(n){return +(+n).toFixed(10)}
function fmt(n){n=fx(n);return String(n)}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t}return a||1}

/* ---------------- 文字整理 ---------------- */
function half(s){return String(s||'').replace(/[！-～]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-0xfee0)}).replace(/　/g,' ')}
var CN={'零':0,'〇':0,'一':1,'二':2,'兩':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10};
function cnNum(s){/* 只處理到「九十九」，夠孩子問「三乘四」 */return s.replace(/[零〇一二兩三四五六七八九十]+/g,function(m){if(m.length>3)return m;var v=0;if(m==='十')return '10';var i=m.indexOf('十');if(i<0)return m.length===1?String(CN[m]):m;var a=i===0?1:CN[m[0]],b=i===m.length-1?0:CN[m[m.length-1]];v=a*10+b;return String(v)})}

/* ---------------- ① 數學 ---------------- */
function mathNorm(t){var s=cnNum(half(t)).replace(/[，。？?！!]/g,' ').replace(/(等於多少|等於幾|是多少|是幾|怎麼算|算算看|答案是|答案|請問|幫我算|多少|=)/g,' ');
  s=s.replace(/除以/g,'÷').replace(/乘以|乘上|乘/g,'×').replace(/加上|加/g,'+').replace(/減去|減掉|減/g,'−').replace(/[xX*＊]/g,'×').replace(/-/g,'−');return s.trim()}
function tokens(s){var t=[],m,re=/(\d+(?:\.\d+)?)|([+−×÷/()])/g,rest=s.replace(re,'').replace(/\s+/g,'');if(rest.length)return null;while((m=re.exec(s)))t.push(m[1]!==undefined?{n:+m[1],s:m[1]}:{o:m[2]});return t.length?t:null}
function isExpr(t){var n=0,o=0;t.forEach(function(x){if('n' in x)n++;else if(x.o!=='('&&x.o!==')')o++});return n>=2&&o>=1}
/* 依序算：括號 → 乘除 → 加減，記下每一步 */
function evalSteps(tk){var steps=[];function str(a){return a.map(function(x){return 'n' in x?fmt(x.n):x.o==='/'?'÷':x.o}).join(' ')}
  function flat(a,quiet){var i;for(i=0;i<a.length;i++)if(a[i].o==='×'||a[i].o==='÷'||a[i].o==='/'){var l=a[i-1].n,r=a[i+1].n;if(a[i].o!=='×'&&r===0)throw 'zero';var v=a[i].o==='×'?l*r:l/r;a.splice(i-1,3,{n:fx(v)});if(!quiet)steps.push(str(a));return flat(a,quiet)}
    for(i=0;i<a.length;i++)if(a[i].o==='+'||a[i].o==='−'){var v2=a[i].o==='+'?a[i-1].n+a[i+1].n:a[i-1].n-a[i+1].n;a.splice(i-1,3,{n:fx(v2)});if(!quiet)steps.push(str(a));return flat(a,quiet)}return a}
  var a=tk.slice();while(true){var o=-1,c=-1;for(var i=0;i<a.length;i++){if(a[i].o==='(')o=i;if(a[i].o===')'){c=i;break}}if(o<0||c<0)break;var inner=flat(a.slice(o+1,c),true);if(inner.length!==1)throw 'bad';a.splice(o,c-o+1,inner[0]);steps.push(str(a))}
  a=flat(a);if(a.length!==1||!('n' in a[0]))throw 'bad';return {v:a[0].n,steps:steps}}
function colAdd(a,b,minus){var A=String(a),Bs=String(b),L=Math.max(A.length,Bs.length)+1,pad=function(x){return Array(L-x.length+1).join(' ')+x},r=minus?a-b:a+b;
  var pre=pad(A)+'\n'+(minus?'−':'+')+pad(Bs).slice(1)+'\n'+Array(L+1).join('─')+'\n'+pad(String(r)),notes=[],carry=0,da=A.split('').reverse(),db=Bs.split('').reverse(),names=['個位','十位','百位','千位','萬位','十萬位'];
  for(var i=0;i<Math.max(da.length,db.length)&&i<6;i++){var x=+(da[i]||0),y=+(db[i]||0);
    if(!minus){var s=x+y+carry;notes.push(names[i]+'：'+x+' + '+y+(carry?' + 1（進位）':'')+' = '+s+(s>=10?'，寫 '+(s%10)+' 進 1':''));carry=s>=10?1:0}
    else{var xx=x-carry,pre2=carry?x+' 被右邊借走 1，'+(xx<0?'變成不夠用，':'剩 '+xx+'，'):'';if(xx<y){notes.push(names[i]+'：'+pre2+(xx<0?'':xx+' 不夠減 '+y+'，')+'跟'+names[i+1]+'借 1 → '+(xx+10)+' − '+y+' = '+(xx+10-y));carry=1}else{notes.push(names[i]+'：'+pre2+xx+' − '+y+' = '+(xx-y));carry=0}}}
  if(!minus&&carry)notes.push('最後的進位寫在最前面');return {pre:pre,notes:notes}}
function mathAnswer(text){var s=mathNorm(text);
  /* 分數加減：1/4 + 2/4、2/3 − 1/6 */
  var f=s.replace(/\s+/g,'').match(/^(\d+)\/(\d+)([+−])(\d+)\/(\d+)$/);
  if(f){var a=+f[1],b=+f[2],c=+f[4],d=+f[5],op=f[3];if(!b||!d)return null;var L=b*d/gcd(b,d),na=a*L/b,nc=c*L/d,n=op==='+'?na+nc:na-nc,g=gcd(n,L),h='<p><b>'+a+'/'+b+' '+op+' '+c+'/'+d+'</b></p>';
    if(b!==d)h+='<p>分母不一樣，先通分成 '+L+'：'+a+'/'+b+' = '+na+'/'+L+'，'+c+'/'+d+' = '+nc+'/'+L+'</p>';
    h+='<p>分母不變，分子'+(op==='+'?'相加':'相減')+'：'+na+' '+op+' '+nc+' = '+n+'，所以是 <b>'+n+'/'+L+'</b>'+(g>1&&n?'，約分後是 <b>'+(n/g)+'/'+(L/g)+'</b>':'')+(n>=L&&n%L===0?'（就是 '+(n/L)+'）':'')+'。</p>';return h}
  var tk=tokens(s);if(!tk||!isExpr(tk))return null;var r;try{r=evalSteps(tk)}catch(e){return e==='zero'?'<p>不能除以 0 喔！任何數都不能拿 0 來分。</p>':null}
  var nums=tk.filter(function(x){return 'n' in x}),ops=tk.filter(function(x){return !('n' in x)}).map(function(x){return x.o}),expr=tk.map(function(x){return 'n' in x?x.s:x.o==='/'?'÷':x.o}).join(' '),h='<p><b>'+escH(expr)+' = '+fmt(r.v)+'</b></p>';
  var ints=nums.every(function(x){return Number.isInteger(x.n)});
  if(nums.length===2&&ops.length===1&&ints){var A=nums[0].n,Bn=nums[1].n,o=ops[0];
    if((o==='+'||o==='−')&&(A>=10||Bn>=10)&&!(o==='−'&&A<Bn)){var c=colAdd(A,Bn,o==='−');h+='<p>用直式來算：</p><pre class="tut-col">'+c.pre+'</pre><ul>'+c.notes.map(function(n){return '<li>'+escH(n)+'</li>'}).join('')+'</ul>'}
    else if(o==='×'&&(A>=10||Bn>=10)){var big=Math.max(A,Bn),sm=Math.min(A,Bn);if(sm<10){var tens=big-big%10,one=big%10;h+='<p>拆開來算：'+big+' = '+tens+' + '+one+'</p><p>'+tens+' × '+sm+' = '+tens*sm+'，'+one+' × '+sm+' = '+one*sm+'，合起來 '+tens*sm+' + '+one*sm+' = <b>'+big*sm+'</b></p>'}
      else{var t2=sm-sm%10,o2=sm%10;h+='<p>把 '+sm+' 拆成 '+t2+' + '+o2+'：'+big+' × '+t2+' = '+big*t2+'，'+big+' × '+o2+' = '+big*o2+'，加起來 = <b>'+big*sm+'</b></p>'}}
    else if(o==='×')h+='<p>'+A+' × '+Bn+' 就是 '+Bn+' 個 '+A+' 加起來，也可以背九九乘法：'+Math.min(A,Bn)+' 的那一段。</p>';
    else if(o==='÷'||o==='/'){if(Bn===0)return '<p>不能除以 0 喔！</p>';var q=Math.floor(A/Bn),rm=A%Bn;
      h=rm?'<p><b>'+A+' ÷ '+Bn+' = '+q+' … 餘 '+rm+'</b></p><p>想想看：'+Bn+' × '+q+' = '+Bn*q+'，還剩 '+A+' − '+Bn*q+' = '+rm+'，餘數 '+rm+' 要比 '+Bn+' 小。</p><p>驗算：'+Bn+' × '+q+' + '+rm+' = '+A+' ✅</p>'+(A<=1000?'<p>如果要算成小數，答案大約是 '+fmt(+(A/Bn).toFixed(2))+'。</p>':'')
        :'<p><b>'+A+' ÷ '+Bn+' = '+q+'</b></p><p>想想看：'+Bn+' × 多少 = '+A+'？因為 '+Bn+' × '+q+' = '+A+'，所以答案是 '+q+'。</p><p>驗算：'+q+' × '+Bn+' = '+A+' ✅</p>'}
    else if(o==='−'&&A<Bn)h+='<p>'+A+' 比 '+Bn+' 小，減下去會變成負數（小於 0），國小通常會看是不是題目寫反了喔！</p>'}
  else if(r.steps.length>1){var mix=ops.some(function(x){return x==='×'||x==='÷'||x==='/'})&&ops.some(function(x){return x==='+'||x==='−'});
    h+='<p>'+(ops.indexOf('(')>=0?'先算括號裡面，':'')+(mix?'再先乘除、後加減：':'從左邊算到右邊：')+'</p><ul>'+r.steps.map(function(x){return '<li>= '+escH(x)+'</li>'}).join('')+'</ul>'}
  return h}

/* ---------------- ② 單位換算 ---------------- */
var UNIT=[['公里',1e6,'len'],['公尺',1000,'len'],['米',1000,'len'],['公分',10,'len'],['釐米',10,'len'],['毫米',1,'len'],['公釐',1,'len'],
  ['公斤',1000,'w'],['公克',1,'w'],['克',1,'w'],['公升',1000,'v'],['毫升',1,'v'],['西西',1,'v'],
  ['星期',604800,'t'],['小時',3600,'t'],['分鐘',60,'t'],['天',86400,'t'],['時',3600,'t'],['分',60,'t'],['秒',1,'t'],['週',604800,'t'],['日',86400,'t']];
var UR='('+UNIT.map(function(u){return u[0]}).join('|')+')';
function uOf(n){for(var i=0;i<UNIT.length;i++)if(UNIT[i][0]===n)return UNIT[i]}
function unitAnswer(text){var s=cnNum(half(text)).replace(/\s+/g,'');
  var re=new RegExp('(\\d+(?:\\.\\d+)?)'+UR+'(?:(\\d+(?:\\.\\d+)?)'+UR+')?(?:是|等於|=|有|換成|換算成|化成|合)?(?:幾|多少)?'+UR),m=s.match(re);if(!m)return null;
  var u1=uOf(m[2]),u2=m[4]?uOf(m[4]):null,ut=uOf(m[5]);if(!u1||!ut||u1[2]!==ut[2]||(u2&&u2[2]!==u1[2])||u1[0]===ut[0]&&!u2)return null;
  var base=+m[1]*u1[1]+(u2?+m[3]*u2[1]:0),v=fx(base/ut[1]),from=m[1]+' '+u1[0]+(u2?' '+m[3]+' '+u2[0]:'');
  var h='<p><b>'+from+' = '+fmt(v)+' '+ut[0]+'</b></p>';
  var rate=u1[1]/ut[1];if(!u2&&rate>=1&&Number.isInteger(rate))h+='<p>因為 1 '+u1[0]+' = '+rate+' '+ut[0]+'，所以 '+m[1]+' × '+rate+' = '+fmt(v)+'。</p>';
  else if(!u2&&rate<1){var inv=fx(ut[1]/u1[1]);h+='<p>因為 1 '+ut[0]+' = '+inv+' '+u1[0]+'，所以 '+m[1]+' ÷ '+inv+' = '+fmt(v)+(Number.isInteger(v)?'':'（也可以說 '+Math.floor(v)+' '+ut[0]+' 多一點）')+'。</p>'}
  else if(u2){h+='<p>先把 '+m[1]+' '+u1[0]+' 換成 '+fmt(+m[1]*u1[1]/ut[1])+' '+ut[0]+'，再加上 '+m[3]+' '+u2[0]+'（'+fmt(+m[3]*u2[1]/ut[1])+' '+ut[0]+'），一共 '+fmt(v)+' '+ut[0]+'。</p>'}
  return h}

/* ---------------- ④ 自然題庫檢索 ---------------- */
var STOP=['功用','作用','用處','功能','有什','一樣','怎樣','會怎','會有','有沒','麼來','是怎','什麼','為什','麼會','怎麼','哪個','哪些','是不','不是','可以','會不','一個','請問','為何','如何','的時','時候','我們','小朋','朋友','下列','哪一','一種','什麼會','因為','所以'];
var STOPC='的是會有什麼為怎嗎呢了在要一個哪些可以不和與到我你他它們這那把被就也都很對吧啊喔還能用時候種下列如何多少幾';
function bigr(s){s=String(s||'').replace(/[^一-鿿A-Za-z0-9]/g,'');var o={};for(var i=0;i<s.length-1;i++){var b=s.substr(i,2);if(STOP.indexOf(b)<0)o[b]=1}for(i=0;i<s.length;i++){var c=s[i];if(c>='一'&&STOPC.indexOf(c)<0)o['_'+c]=1}return o}
function parseLab(txt,tag){var o=[],sec='';if(!txt)return o;txt.split('\n').forEach(function(l){if(l[0]==='@'){sec=l.split('|')[2]||'';return}var p=l.split('|');if(p.length>=6&&p[1]==='c')o.push({q:p[2],a:p[3],x:p[5],src:sec+(tag?'・'+tag:'')})});return o}

/* ---------------- 主要工廠 ---------------- */
global.TutorFactory=function(C){
  var WORDS=C.WORDS,DOCS=null,DF={},pending=null;
  function docs(){if(DOCS)return DOCS;DOCS=[];var seen={};
    (C.sciMC()||[]).forEach(function(q){if(!q||!q.q)return;DOCS.push({q:q.q,a:q.tf?(q.a?'對（○）':'不對（✕）'):q.a,x:q.x||'',src:'自然探險島'})});
    DOCS=DOCS.concat(parseLab(global.LAB_BANK_TEXT,''),parseLab(global.LAB_BANK_TEXT_G2,'二年級'),parseLab(global.LAB_BANK_TEXT_G4,'四年級'));
    DOCS=DOCS.filter(function(d){var k=d.q;if(seen[k])return false;seen[k]=1;return true});
    DOCS.forEach(function(d){d.g=bigr(d.q+d.a+d.x);d.qg=bigr(d.q);d.n=Object.keys(d.g).length;for(var b in d.g)DF[b]=(DF[b]||0)+1});return DOCS}
  function expand(t){var m=t.match(/為什麼會有(.{1,4}?)[？?。]*$/)||t.match(/^(.{1,4}?)(是怎麼來的|怎麼來的|是怎麼產生|怎麼產生|怎麼形成|是怎麼形成)/);if(m)t+=' '+m[1]+'是怎麼來的 '+m[1]+'產生 '+m[1]+'形成 '+m[1]+'流動';return t}
  function sciSearch(text){text=expand(text);var D=docs(),qg=bigr(text.replace(/(為什麼|怎麼|是什麼|什麼是|請問|小機|老師|告訴我|嗎|呢|啊|吧)/g,'')),keys=Object.keys(qg);if(!keys.length)return [];var N=D.length;
    var res=D.map(function(d){var s=0,hit=0;keys.forEach(function(b){if(d.g[b]){var idf=Math.log(1+N/(DF[b]||1)),uw=b[0]==='_'?.45:1;s+=idf*uw*(d.qg[b]?1.6:1);hit+=b[0]==='_'?.4:1}});var nb=keys.filter(function(k){return k[0]!=='_'}).length;return {d:d,s:s/Math.sqrt(4+d.n)*Math.min(1,hit/Math.max(1,nb*.5+.8)),hit:hit}});
    return res.filter(function(r){return r.hit>=1.2}).sort(function(a,b){return b.s-a.s}).slice(0,3)}
  function sciAnswer(text,force){var r=sciSearch(text);if(!r.length||r[0].s<(force?0.9:1.35))return null;var t=r[0].d;
    var h='<p>📚 我在自然題庫找到最接近的：</p><div class="tut-card"><p><b>'+escH(t.q)+'</b></p><p>答案：<b>'+escH(t.a)+'</b></p>'+(t.x?'<p>'+escH(t.x)+'</p>':'')+'<small>來自：'+escH(t.src)+'</small></div>';
    if(r[1]&&r[1].s>r[0].s*.75&&r[1].d.q!==t.q)h+='<details class="tut-more"><summary>還有相關的題目</summary><p><b>'+escH(r[1].d.q)+'</b><br>答案：'+escH(r[1].d.a)+(r[1].d.x?'<br>'+escH(r[1].d.x):'')+'</p></details>';
    return h+'<p class="tut-note">如果這不是你想問的，換個說法再問一次，或去自然探險島玩相關的站！</p>'}

  /* ---- ③ 英文 ---- */
  function wordCard(w){return '<div class="tut-card tut-w"><span class="e">'+w[1]+'</span><span><b class="en">'+escH(w[0])+'</b><br>'+escH(w[2])+'<br><small>拼法：'+w[0].split('').join(' - ')+'</small></span><button class="tut-say" data-en="'+escH(w[0])+'">🔊</button></div>'}
  function enAnswer(text){var t=half(text).trim(),m=t.match(/^([A-Za-z][A-Za-z ]{0,20}?)\s*(是什麼意思|什麼意思|的意思|是什麼|中文是什麼|中文怎麼說|的中文|中文|怎麼唸|怎麼念|怎麼讀|怎麼拼|怎麼寫|嗎|呢)?\s*[?？]?$/);
    if(m){var en=m[1].trim().toLowerCase(),w=WORDS.filter(function(x){return x[0]===en||x[0]===en.replace(/ /g,'')})[0];
      if(w)return '<p>'+escH(w[0])+' 的意思是「'+escH(w[2])+'」。</p>'+wordCard(w);
      return '<p>「'+escH(en)+'」這個字還不在小機的單字本裡，問問老師或查字典喔！</p>'}
    var z=t.match(/^(.{1,8}?)的?英文(是什麼|怎麼說|怎麼講|怎麼拼|怎麼寫|是)?\s*[?？]?$/)||t.match(/^英文的?(.{1,8}?)(怎麼說|怎麼講|是什麼)\s*[?？]?$/);
    if(z){var zh=z[1].replace(/^(請問|那|小機|老師)/,'').trim();if(!zh)return null;var hits=WORDS.filter(function(x){return x[2]===zh}).concat(WORDS.filter(function(x){return x[2]!==zh&&(x[2].indexOf(zh)>=0||zh.indexOf(x[2])>=0)}));
      if(hits.length)return '<p>「'+escH(zh)+'」的英文是 <b class="en">'+escH(hits[0][0])+'</b>。</p>'+hits.slice(0,3).map(wordCard).join('');
      return '<p>「'+escH(zh)+'」的英文小機還沒學到，問問老師或查字典喔！</p>'}
    return null}

  /* ---- ⑤ 進度 ---- */
  function progAnswer(){var P=C.PGX(),id=C.who();if(!P||!C.isKid())return '<p>請先選小朋友的名字進來，小機才知道你學到哪裡。</p>';var h='<p>📘 學校現在大約教到：</p><ul>',m=P.state(id,'m'),e=P.state(id,'e'),s=P.state(id,'s');
    if(m)h+='<li>🔢 數學（'+escH(m.book)+'）：第 '+(m.cur+1)+' 單元「'+escH(m.U[1])+'」</li>';
    if(e)h+='<li>🔤 英文（'+escH(e.book)+'）：'+escH(e.U[1])+'，單字有 '+e.U[4].join('、')+'</li>';
    if(s)h+='<li>🔬 自然（'+escH(s.book)+'）：第 '+(s.cur+1)+' 單元「'+escH(s.U[1])+'」</li>';
    return h+'</ul><p>想練習就說「出一題數學」或「出一題英文」！</p>'}

  /* ---- ⑥ 出題與批改 ---- */
  function quiz(kind){var P=C.PGX(),id=C.who();
    if(kind==='en'){var pool=(C.poolW()||WORDS).filter(function(w){return /^[a-z]+$/.test(w[0])}),w=pool[Math.floor(Math.random()*pool.length)];pending={t:'en',w:w};
      return '<p>🔤 英文小考：<b>'+w[1]+' '+escH(w[2])+'</b> 的英文是什麼？</p><p class="tut-note">直接打英文回答我（打「不知道」我會告訴你）。</p>'}
    var g=P&&C.isKid()?P.gen(Math.random,'num'):null,ex,ans;if(g){ex=g[0];ans=g[1]}else{var a=10+Math.floor(Math.random()*80),b=10+Math.floor(Math.random()*80);ex=a+' + '+b;ans=a+b}
    pending={t:'m',ex:ex,ans:ans,w:g?[String(ans),'🔢',ex,0]:null,pg:g?g[3]:null};return '<p>🔢 數學小考：<b>'+escH(ex)+(/□|幾|多少/.test(ex)?'':' = ?')+'</b></p><p class="tut-note">把答案的數字打給我（打「不知道」我會告訴你）。</p>'}
  function check(text){var p=pending,t=half(text).trim().toLowerCase().replace(/[。.!！？?]/g,'');if(!p)return null;
    if(/不知道|不會|放棄|答案/.test(t)){pending=null;return p.t==='en'?'<p>答案是 <b class="en">'+escH(p.w[0])+'</b>！</p>'+wordCard(p.w)+'<p>再說「出一題英文」繼續挑戰。</p>':'<p>答案是 <b>'+escH(String(p.ans))+'</b>！再說「出一題數學」繼續挑戰。</p>'}
    if(p.t==='en'){if(!/^[a-z ]+$/.test(t))return null;var ok=t.replace(/ /g,'')===p.w[0];pending=ok?null:p;try{ok?C.Learn.ok(p.w):C.Learn.bad(p.w)}catch(e){}
      return ok?'<p>✅ 答對了！'+escH(p.w[0])+' = '+escH(p.w[2])+'</p><p>要再一題嗎？說「出一題英文」。</p>':'<p>❌ 不是喔，再想想看！提示：開頭是 <b class="en">'+p.w[0][0]+'</b>，一共 '+p.w[0].length+' 個字母。</p>'}
    var n=t.replace(/[^\d.]/g,'');if(!n||!/^\d+(\.\d+)?$/.test(n))return null;var ok2=+n===+p.ans;pending=ok2?null:p;
    if(p.w){p.w.m=1;p.w.pg=p.pg;try{ok2?C.Learn.ok(p.w):C.Learn.bad(p.w)}catch(e){}}
    return ok2?'<p>✅ 答對了！'+escH(p.ex)+'，答案是 '+escH(String(p.ans))+'。</p><p>要再一題嗎？說「出一題數學」。</p>':'<p>❌ 再算一次看看！（打「不知道」我會告訴你答案）</p>'}

  var HELP='<p>小機老師現在是<b>離線版</b>，不用網路、不會亂編答案。我會的有：</p><ul><li>🔢 算數學：打「347 + 256」「23 × 4」「17 ÷ 5」，我會教你直式和步驟</li><li>📏 單位換算：「3 公尺是幾公分」「2 公斤 300 公克是幾公克」</li><li>🔤 英文單字：「apple 是什麼意思」「老虎的英文」</li><li>🔬 自然問題：「為什麼會有風」「磁鐵會吸什麼」</li><li>📘 「現在學到哪裡」・✏️「出一題數學／英文」</li></ul>';
  function reply(text,o){o=o||{};var t=String(text||'').trim(),sub=o.subject||'';if(!t)return {html:'<p>照片題目小機還看不懂，請把題目打字給我喔！</p>'};
    var h=null;
    if(pending&&!/出一題|出題/.test(t))h=check(t);
    if(!h&&/出一?題|考我|練習/.test(t))h=quiz(/英文|單字/.test(t)||(sub==='英文'&&!/數學/.test(t))?'en':'m');
    if(!h&&/學到哪|教到哪|進度|現在學|在學什麼|要學什麼|這週學|今天學/.test(t))h=progAnswer();
    if(!h)h=unitAnswer(t);
    if(!h)h=mathAnswer(t);
    if(!h)h=enAnswer(t);
    if(!h&&/^(你好|嗨|哈囉|hi|hello|早安|午安|晚安)/i.test(t))h='<p>'+escH(C.nm())+'你好！有什麼問題都可以問我。</p>'+HELP;
    if(!h&&/謝謝|感謝|thank/i.test(t))h='<p>不客氣！繼續加油，有問題再來問我 😊</p>';
    if(!h&&/你會什麼|會做什麼|怎麼用|幫助|help/i.test(t))h=HELP;
    if(!h)h=sciAnswer(t,sub==='自然');
    if(!h&&/^\d+(\.\d+)?$/.test(half(t)))h='<p>這是一個數字喔！要算什麼呢？例如「'+t+' + 25」。</p>';
    if(!h)h='<p>這個問題小機還不會回答 🙏 我只用 App 裡的題庫回答，不會亂猜。</p>'+(sub==='國語'||sub==='社會'||sub==='生活'?'<p>'+sub+'的問題可以先問老師或爸爸媽媽。</p>':'')+HELP;
    return {html:h}}

  /* 英文發音按鈕 */
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.tut-say');if(!b)return;try{var u=new SpeechSynthesisUtterance(b.dataset.en);u.lang='en-US';u.rate=.8;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(x){}});
  var st=document.createElement('style');st.textContent='.tut-col{font:600 20px/1.35 "SFMono-Regular",Menlo,Consolas,monospace;background:#fffaf0;border-radius:12px;padding:10px 14px;display:inline-block;margin:4px 0;color:#24324f}'+
    '.tut-card{background:rgba(255,255,255,.7);border-radius:14px;padding:10px 12px;margin:6px 0;box-shadow:inset 0 0 0 1.5px rgba(80,110,170,.15)}.tut-card small{opacity:.7}.tut-w{display:flex;gap:12px;align-items:center}.tut-w .e{font-size:40px;font-family:var(--font-emoji,sans-serif)}.tut-w>span:nth-child(2){flex:1;min-width:0}.tut-w b.en{font-size:22px}'+
    '.tut-say{border:0;border-radius:50%;width:42px;height:42px;font-size:20px;background:#e6f2ff}.tut-note{font-size:13px;opacity:.75}.tut-more summary{cursor:pointer;font-weight:700;margin:4px 0}';
  document.head.appendChild(st);
  return {reply:reply,_sci:sciSearch,_docs:function(){return docs().length},_math:mathAnswer,_unit:unitAnswer,_en:enAnswer};
};
})(window);
