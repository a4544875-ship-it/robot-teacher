/* 奇蹟研究所 v9.0 — 自然第二座島：10 站 × 3 關，題目依序不重複。
   資料存在 k.lab = {st:{站:[★,★,★,印章]}, seen:{站+關:[題號]}, badge:0|1}；分數記在 byGame.lab（算自然分）。 */
(function(){
  'use strict';
  var N=6, TIME3=45; /* 每輪 6 題；三星要全對並且平均每題 45 秒內 */

  function parse(text){
    var S=[],cur=null,lv=0;
    String(text||'').split('\n').forEach(function(l){
      l=l.trim();if(!l)return;
      if(l.charAt(0)==='@'){var p=l.slice(1).split('|');cur={k:p[0],ico:p[1],zh:p[2],tag:p[3],bg:p[4],d:p[5],lv:p[6].split('^').map(function(x){return x.split('~')}),q:[[],[],[]]};S.push(cur);return}
      if(l.charAt(0)==='#'){lv=(+l.charAt(1)||1)-1;return}
      if(!cur)return;
      var f=l.split('|');if(f.length<6)return;
      var q={id:f[0],t:f[1],e:f[5],v:f[6]||''};
      if(q.t==='t'){var qq=f[2].split('##'),aa=f[3].split('##'),ww=f[4].split('##');q.steps=[0,1].map(function(i){return {q:qq[i],a:aa[i],w:(ww[i]||'').split('^')}});q.q=qq[0]}
      else if(q.t==='o'){q.q=f[2];q.items=f[3].split('^')}
      else if(q.t==='s'){q.q=f[2];q.bins=f[3].split('^');q.items=f[4].split('^').map(function(x){var y=x.split(':');return [y[0],+y[1]]})}
      else {q.t='c';q.q=f[2];q.a=f[3];q.w=f[4].split('^')}
      cur.q[lv].push(q);
    });
    return S;
  }

  window.LabFactory=function(C){
    var ST=parse(window.LAB_BANK_TEXT),STK={};ST.forEach(function(s){STK[s.k]=s});
    if(!ST.length)return;
    var active=null,serial=0;
    var esc=C.esc,who=C.who,isKid=C.isKid;
    function body(){return C.body()}
    function $(sel){var b=body();return b?b.querySelector(sel):null}
    function on(el,ev,fn){if(el)el.addEventListener(ev,fn)}
    function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
    function kid(){return isKid()?C.Store.kid(who()):null}
    function data(k){k=k||kid();var d=k&&k.lab&&typeof k.lab==='object'?k.lab:{};return {st:d.st||{},seen:d.seen||{},badge:+d.badge||0}}
    function row(key){var r=data().st[key];return Array.isArray(r)?[+r[0]||0,+r[1]||0,+r[2]||0,+r[3]||0]:[0,0,0,0]}
    function mutLab(fn){if(!isKid())return;C.Store.mut(who(),function(k){if(!k.lab||typeof k.lab!=='object')k.lab={};if(!k.lab.st)k.lab.st={};if(!k.lab.seen)k.lab.seen={};fn(k.lab,k)})}
    function talk(t){if(C.muted()||!window.speechSynthesis)return;try{var u=new SpeechSynthesisUtterance(String(t).replace(/[①-⑳]/g,''));u.lang='zh-TW';u.rate=.9;window.speechSynthesis.cancel();window.speechSynthesis.speak(u)}catch(e){}}
    function give(n){if(!isKid()||!n)return 0;C.Store.award(who(),n,'lab');C.plusFx(n);return n}
    function firstStamps(){if(!isKid())return 10;var n=0;C.STN.forEach(function(s){var r=C.scRow(who(),s.k);if(r[0]&&r[1]&&r[2])n++});return n}
    function unlocked(){return !isKid()||!!window.LAB_TEST||firstStamps()>=10}
    function stopAll(){serial++;if(active){active.dead=true;clearInterval(active.tick)}active=null}
    C.addCleanup(stopAll);

    /* ===================== 圖：溫度計／長條圖／折線圖／月相／影子／電路 ===================== */
    var VIS={
      th:function(a){var v=+a[0],y=function(t){return 240-t*4.2},tk='';
        for(var t=0;t<=50;t++){var big=t%10===0,mid=t%5===0;tk+='<line x1="70" x2="'+(big?86:mid?81:77)+'" y1="'+y(t)+'" y2="'+y(t)+'" stroke="#35505e" stroke-width="'+(big?2:1)+'"/>';if(big)tk+='<text x="92" y="'+(y(t)+5)+'" font-size="14" font-weight="700" fill="#24404d">'+t+'</text>'}
        return '<svg class="lb-svg lb-th" viewBox="0 0 130 300" role="img" aria-label="溫度計"><rect x="50" y="18" width="20" height="245" rx="10" fill="#f4fbfd" stroke="#8fb3c0" stroke-width="2"/><rect x="56" y="'+y(v)+'" width="8" height="'+(262-y(v))+'" fill="#e5484d"/><circle cx="60" cy="268" r="17" fill="#e5484d" stroke="#8fb3c0" stroke-width="2"/>'+tk+'<text x="104" y="16" font-size="13" fill="#24404d">°C</text></svg>'},
      bar:function(a){var L=a[0].split(','),V=a[1].split(',').map(Number),u=a[2]||'',ti=a[3]||'',mx=Math.max.apply(null,V.concat([1])),W=340,H=210,x0=34,bw=Math.min(52,(W-x0-10)/L.length*.62),gap=(W-x0-10)/L.length,h='';
        V.forEach(function(v,i){var bh=v/mx*130,x=x0+gap*i+(gap-bw)/2,yy=170-bh;h+='<rect x="'+x+'" y="'+yy+'" width="'+bw+'" height="'+Math.max(bh,1.5)+'" rx="5" fill="'+['#2f9e8f','#f2a33a','#5b7fd6','#d9608a','#7a9a3a','#a26bd6','#3fa7c9'][i%7]+'"/><text x="'+(x+bw/2)+'" y="'+(yy-6)+'" text-anchor="middle" font-size="13" font-weight="700" fill="#24404d">'+v+'</text><text x="'+(x+bw/2)+'" y="190" text-anchor="middle" font-size="12.5" fill="#35505e">'+esc(L[i])+'</text>'});
        return '<svg class="lb-svg lb-chart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(ti)+'長條圖"><text x="8" y="16" font-size="13" font-weight="700" fill="#24404d">'+esc(ti)+'（'+esc(u)+'）</text><line x1="'+x0+'" x2="'+(W-6)+'" y1="170" y2="170" stroke="#8fb3c0" stroke-width="2"/>'+h+'</svg>'},
      line:function(a){var L=a[0].split(','),V=a[1].split(',').map(Number),u=a[2]||'',ti=a[3]||'',mn=Math.min.apply(null,V),mx=Math.max.apply(null,V),lo=Math.floor((mn-3)/5)*5,hi=Math.ceil((mx+2)/5)*5,W=340,H=215,x0=40,x1=W-20,y0=172,y1=42,step=hi-lo>30?10:5,X=function(i){return x0+18+(x1-x0-18)*(L.length<2?0:i/(L.length-1))},Y=function(v){return y0-(v-lo)/(hi-lo)*(y0-y1)},g='';
        if(step===10){lo=Math.floor(lo/10)*10;hi=Math.ceil(hi/10)*10}for(var t=lo;t<=hi;t+=step)g+='<line x1="'+x0+'" x2="'+x1+'" y1="'+Y(t)+'" y2="'+Y(t)+'" stroke="#dbe9ee"/><text x="'+(x0-6)+'" y="'+(Y(t)+4)+'" text-anchor="end" font-size="11" fill="#5a7480">'+t+'</text>';
        var pts=V.map(function(v,i){return X(i)+','+Y(v)}).join(' ');
        V.forEach(function(v,i){g+='<text x="'+X(i)+'" y="'+(Y(v)-9)+'" text-anchor="middle" font-size="12" font-weight="700" fill="#24404d">'+v+'</text><text x="'+X(i)+'" y="'+(y0+18)+'" text-anchor="middle" font-size="12" fill="#35505e">'+esc(L[i])+'</text>'});
        return '<svg class="lb-svg lb-chart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(ti)+'折線圖"><text x="8" y="16" font-size="13" font-weight="700" fill="#24404d">'+esc(ti)+'（'+esc(u)+'）</text>'+g+'<polyline points="'+pts+'" fill="none" stroke="#e0672f" stroke-width="3" stroke-linejoin="round"/>'+V.map(function(v,i){return '<circle cx="'+X(i)+'" cy="'+Y(v)+'" r="4.5" fill="#fff" stroke="#e0672f" stroke-width="2.5"/>'}).join('')+'</svg>'},
      moon:function(a){var n=((+a[0]%8)+8)%8,r=40,b='';
        if(n===4)b='<circle cx="50" cy="50" r="40" fill="#ffe8b0"/>';
        else if(n!==0){var wax=n<4,ang=(wax?n:8-n)*Math.PI/4,P=[],T=[];for(var j=0;j<=60;j++){var yy=-r+2*r*j/60,x=Math.sqrt(Math.max(0,r*r-yy*yy));P.push((50+(wax?x:-x)).toFixed(2)+','+(50+yy).toFixed(2));T.unshift((50+(wax?1:-1)*Math.cos(ang)*x).toFixed(2)+','+(50+yy).toFixed(2))}b='<path d="M'+P.concat(T).join('L')+'Z" fill="#ffe8b0"/>'}
        return '<svg class="lb-svg lb-moon" viewBox="0 0 100 100" role="img" aria-label="月相圖"><rect width="100" height="100" rx="14" fill="#14223f"/><circle cx="50" cy="50" r="40" fill="#2b3d66"/>'+b+'<circle cx="50" cy="50" r="40" fill="none" stroke="#7d93b5" stroke-width="1.5"/></svg>'},
      sh:function(a){var h=+a[0],m=a[1]||'both',cx=130,cy=120,az=(90+(h-6)*15)*Math.PI/180,P=function(r,ang){return [cx+r*Math.sin(ang),cy-r*Math.cos(ang)]},s=P(98,az),len=18+Math.abs(h-12)*15,e=P(len,az+Math.PI),o='';
        o+='<circle cx="'+cx+'" cy="'+cy+'" r="84" fill="#e9f3d8" stroke="#a9c58a" stroke-width="2"/>';
        [['北',0],['東',90],['南',180],['西',270]].forEach(function(d){var p=P(108,d[1]*Math.PI/180);if(d[1]===0)p=[cx,cy-96];if(d[1]===180)p=[cx,cy+104];o+='<text x="'+p[0]+'" y="'+(p[1]+5)+'" text-anchor="middle" font-size="15" font-weight="800" fill="'+(d[1]===0?'#c2362f':'#24404d')+'">'+d[0]+'</text>'});
        if(m!=='sun')o+='<line x1="'+cx+'" y1="'+cy+'" x2="'+e[0]+'" y2="'+e[1]+'" stroke="#3a4650" stroke-width="7" stroke-linecap="round" opacity=".72"/>';
        o+='<circle cx="'+cx+'" cy="'+cy+'" r="6" fill="#8a5a2b"/>';
        if(m!=='shd')o+='<circle cx="'+s[0]+'" cy="'+s[1]+'" r="15" fill="#ffc531" stroke="#f08a1c" stroke-width="3"/><text x="'+s[0]+'" y="'+(s[1]+30)+'" text-anchor="middle" font-size="12" font-weight="700" fill="#b25c00">太陽</text>';
        return '<svg class="lb-svg lb-sh" viewBox="0 0 260 240" role="img" aria-label="從上往下看的竹竿與'+(m==='sun'?'太陽':'影子')+'"><text x="6" y="16" font-size="12" fill="#5a7480">從上往下看・'+h+' 時</text>'+o+'</svg>'},
      ckt:function(a){var t=a[0];
        function bulb(x,y,lit,broken,lab){return '<g><circle cx="'+x+'" cy="'+y+'" r="15" fill="'+(lit?'#ffe066':'#e3e7ea')+'" stroke="#55616b" stroke-width="2.5"/>'+(lit?'<circle cx="'+x+'" cy="'+y+'" r="23" fill="#ffe066" opacity=".35"/>':'')+(broken?'<path d="M'+(x-11)+' '+(y-11)+'L'+(x+11)+' '+(y+11)+'M'+(x+11)+' '+(y-11)+'L'+(x-11)+' '+(y+11)+'" stroke="#d93a36" stroke-width="4" stroke-linecap="round"/>':'<path d="M'+(x-6)+' '+(y+3)+'q3 -9 6 0t6 0" fill="none" stroke="#a5781b" stroke-width="1.8"/>')+(lab?'<text x="'+x+'" y="'+(y-26)+'" text-anchor="middle" font-size="13" font-weight="800" fill="#24404d">'+lab+'</text>':'')+'</g>'}
        var W='stroke="#2c7a8c" stroke-width="4" fill="none" stroke-linejoin="round"',bat='<rect x="18" y="88" width="34" height="58" rx="6" fill="#33424d"/><rect x="28" y="82" width="14" height="7" rx="2" fill="#33424d"/><text x="35" y="110" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">＋</text><text x="35" y="138" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">－</text>',g='';
        if(t==='s'||t==='sx'){var l=t==='s';g='<path d="M35 82V40H300V190H35V146" '+W+'/>'+bulb(130,40,l,t==='sx','A')+bulb(220,40,l,false,'B')}
        else if(t==='p'||t==='px'){g='<path d="M35 82V40H300V190H35V146" '+W+'/><path d="M110 40V115H230V40" '+W+'/>'+bulb(205,40,t==='p',t==='px','A')+bulb(170,115,true,false,'B')}
        else if(t==='sp'){g='<path d="M35 82V40H300V190H35V146" '+W+'/><path d="M80 40V120H280V40" '+W+'/>'+bulb(140,40,true,false,'A')+bulb(220,40,true,false,'B')+bulb(180,120,true,false,'C')}
        else {g='<path d="M35 82V40H200V190H35V146" '+W+'/><text x="215" y="110" font-size="30">🔥</text><text x="200" y="150" font-size="13" font-weight="700" fill="#c2362f">電線發燙！</text>'}
        return '<svg class="lb-svg lb-ckt" viewBox="0 0 320 210" role="img" aria-label="電路圖">'+g+bat+'</svg>'},
      emo:function(a){return '<div class="lb-emo" aria-hidden="true">'+esc(a.join(':'))+'</div>'}
    };
    function visual(v){if(!v)return '';var p=v.split(':'),f=VIS[p[0]];return f?'<div class="lb-vis">'+f(p.slice(1))+'</div>':''}

    /* ===================== 畫面 ===================== */
    function frame(inner,cls){var b=body();if(!b)return;b.innerHTML='<section class="lb '+(cls||'')+'">'+inner+'</section>'}
    function stars(n){return '<span class="lb-stars" aria-label="'+n+' 顆星">'+'★'.repeat(n)+'<i>'+'☆'.repeat(3-n)+'</i></span>'}
    function seenCount(s){var d=data(),n=0;for(var i=0;i<3;i++)n+=Math.min((d.seen[s.k+i]||[]).length,s.q[i].length);return n}

    /* 研究所島地圖：10 站的位置（百分比，對應 1024×1536 直式地圖）。家長給的新地圖圖片換上後，只要調整這裡的座標。 */
    var POS={mag2:[21,15],ckt2:[51,11],moon2:[80,15],eco2:[80,36],wx2:[50,33],temp:[20,37],pond:[21,60],flow:[51,56],sun:[80,60],time:[50,81]};
    var MAP_IMG=window.LAB_MAP_IMG||'';
    var tab='a';try{tab=localStorage.getItem('rt-sci-isl')==='b'?'b':'a'}catch(e){}
    function setTab(t){tab=t;try{localStorage.setItem('rt-sci-isl',t)}catch(e){}}
    function mapSVG(){
      var path=ST.map(function(s){var p=POS[s.k];return (p[0]*10.24).toFixed(0)+','+(p[1]*15.36).toFixed(0)}).join(' L');
      var spots=ST.map(function(s,i){var p=POS[s.k],x=p[0]*10.24,y=p[1]*15.36;
        return '<g><ellipse cx="'+x+'" cy="'+(y+70)+'" rx="150" ry="46" fill="#3c8f5a" opacity=".55"/><ellipse cx="'+x+'" cy="'+(y+40)+'" rx="140" ry="78" fill="#f1dca4"/><ellipse cx="'+x+'" cy="'+(y+28)+'" rx="132" ry="68" fill="#7cc66a"/><ellipse cx="'+x+'" cy="'+(y+20)+'" rx="96" ry="44" fill="#9bdc7c"/><text x="'+x+'" y="'+(y+30)+'" text-anchor="middle" font-size="118">'+s.ico+'</text></g>'}).join('');
      return '<svg viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMid slice" class="lbm-svg" aria-hidden="true"><defs><linearGradient id="lbSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fe0ff"/><stop offset=".5" stop-color="#57bce6"/><stop offset="1" stop-color="#2a8fc4"/></linearGradient><radialGradient id="lbGlow" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>'+
        '<rect width="1024" height="1536" fill="url(#lbSea)"/><rect width="1024" height="1536" fill="url(#lbGlow)"/>'+
        '<path d="M120 170 C 60 420, 140 700, 90 980 C 60 1200, 260 1420, 520 1440 C 800 1460, 980 1260, 950 980 C 930 760, 990 480, 920 230 C 860 60, 640 40, 500 70 C 340 100, 200 60, 120 170 Z" fill="#e9d29a" opacity=".55"/>'+
        '<path d="M'+path+'" fill="none" stroke="#fff6dc" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 40" opacity=".95"/>'+
        spots+'<text x="512" y="1500" text-anchor="middle" font-size="40" font-weight="800" fill="#ffffff" opacity=".85">奇蹟研究所島</text></svg>';
    }
    function labMapHTML(){
      var ok=unlocked(),tot=0,stp=0;ST.forEach(function(s){var r=row(s.k);tot+=r[0]+r[1]+r[2];if(r[3])stp++});
      var h='<div class="lbm-stat"><span>🔬 研究所印章 <b>'+stp+'</b> / 10</span><span>★ <b>'+tot+'</b> / 90</span>'+(data().badge?'<span>🏅 小小科學家</span>':'')+'</div>';
      h+='<div class="sxmap lbm'+(ok?'':' locked')+'">'+(MAP_IMG?'<img src="'+MAP_IMG+'" alt="奇蹟研究所島地圖">':mapSVG());
      ST.forEach(function(s){var p=POS[s.k],r=row(s.k),st=r[0]+r[1]+r[2];
        h+='<button class="sxs" data-lab="'+s.k+'" style="left:'+p[0]+'%;top:'+p[1]+'%" aria-label="'+esc(s.zh)+'"><span class="ring"></span>'+(r[3]?'<span class="done">全破</span>':'')+'</button>'+
          '<button class="sxl'+(r[3]?' got':'')+'" data-lab="'+s.k+'" style="left:'+p[0]+'%;top:'+(p[1]+8.2)+'%"><b>'+esc(s.zh)+'</b><small>'+(ok?(r[3]?'✅ ':'<i>★</i> ')+st+' / 9':'🔒')+'</small></button>'});
      if(!ok)h+='<div class="lbm-lock"><b>🔒 第二座島還沒開放</b><span>第一座島 10 站都蓋到印章就能出航！目前 '+firstStamps()+' / 10</span></div>';
      return h+'</div>';
    }
    function open(){setTab('b');stopAll();C.goSci()}

    function station(key){
      stopAll();var s=STK[key],r=row(key),d=data();
      var h='<div class="lb-top"><button class="lb-back" data-act="map">← 回研究所島</button><span class="lb-chip">'+s.ico+' '+esc(s.tag)+'</span></div>'+
        '<header class="lb-st-head" style="background-image:linear-gradient(180deg,rgba(14,48,58,.15),rgba(14,48,58,.88)),url(assets/'+s.bg+'.webp)"><span class="lb-st-ico">'+s.ico+'</span><h2>'+esc(s.zh)+'</h2><p>'+esc(s.d)+'</p></header>'+
        '<div class="lb-levels">'+s.lv.map(function(l,i){var open=i===0||r[i-1]>0,seen=Math.min((d.seen[key+i]||[]).length,s.q[i].length);
          return '<button class="lb-level" data-lv="'+i+'"'+(open?'':' disabled')+'><span class="lb-lvn">'+(open?i+1:'🔒')+'</span><span class="lb-lvt"><b>'+esc(l[0])+'</b><small>'+esc(open?l[1]:'先在前一關拿到至少 1 顆星')+'</small><em>新題目還有 '+(s.q[i].length-seen)+' 題'+(seen>=s.q[i].length?'（題庫做完了，會重新洗牌）':'')+'</em></span>'+stars(r[i])+'</button>'}).join('')+'</div>'+
        '<p class="lb-note">'+(r[3]?'✅ 這一站的印章已經收集了，可以繼續挑戰三星和剩下的新題目。':'三關都過關就能蓋研究所印章，獲得 +100 分和 5 💧。')+'</p>';
      frame(h,'lb-station');
      on($('[data-act="map"]'),'click',function(){C.sfx('tap');open()});if(!unlocked()){open();return}
      body().querySelectorAll('[data-lv]').forEach(function(b){on(b,'click',function(){C.sfx('tap');play(key,+b.dataset.lv)})});
      C.say('「'+s.zh+'」有三關，題目越來越難，加油！','happy');
    }

    function pickQs(key,lv){
      var all=STK[key].q[lv],seen=data().seen[key+lv]||[],fresh=shuffle(all.filter(function(q){return seen.indexOf(q.id)<0}));
      if(fresh.length>=N)return {qs:fresh.slice(0,N),reset:false};
      var rest=shuffle(all.filter(function(q){return fresh.indexOf(q)<0}));
      return {qs:fresh.concat(rest.slice(0,N-fresh.length)),reset:true,keep:fresh.map(function(q){return q.id})};
    }

    function play(key,lv){
      stopAll();var s=STK[key],pk=pickQs(key,lv);
      if(pk.reset)mutLab(function(L){L.seen[key+lv]=[]});
      var g={key:key,lv:lv,s:s,queue:pk.qs.map(function(q){return {q:q,retry:false}}),i:0,first:0,pts:0,wrong:0,start:Date.now(),tok:++serial,kidId:who(),review:[],combo:0,best:0};
      active=g;
      g.tick=setInterval(function(){if(!alive(g))return;var t=$('#lbTime');if(t)t.textContent=fmt((Date.now()-g.start)/1000)},1000);
      next(g);
    }
    function alive(g){return !!g&&g===active&&!g.dead&&who()===g.kidId}
    function fmt(sec){sec=Math.round(sec);return Math.floor(sec/60)+':'+('0'+sec%60).slice(-2)}

    function next(g){
      if(!alive(g))return;
      if(g.i>=g.queue.length){result(g);return}
      var it=g.queue[g.i],q=it.q,firstCount=g.queue.filter(function(x){return !x.retry}).length,num=it.retry?'再挑戰':((g.i+1)+' / '+firstCount);
      var h='<div class="lb-top"><button class="lb-back" data-act="quit">← 離開</button><span class="lb-chip">'+g.s.ico+' '+esc(g.s.lv[g.lv][0])+'</span><span class="lb-chip lb-time">⏱ <b id="lbTime">'+fmt((Date.now()-g.start)/1000)+'</b></span></div>'+
        '<div class="lb-q"><div class="lb-qhead"><span>'+(it.retry?'🔁 ':'題目 ')+num+'</span><span>✦ 首次答對 '+g.first+'</span></div><div class="lb-prog"><i style="width:'+Math.min(100,g.i/g.queue.length*100)+'%"></i></div>'+
        '<h2 class="lb-qt"><span id="lbQText">'+esc(q.q)+'</span> <button class="lb-say" data-act="say" aria-label="唸題目">🔊</button></h2>'+visual(q.v)+'<div id="lbTask"></div><div id="lbFeed" role="status" aria-live="polite"></div></div>';
      frame(h,'lb-play');
      on($('[data-act="quit"]'),'click',function(){C.sfx('tap');station(g.key)});
      on($('[data-act="say"]'),'click',function(){talk($('#lbQText').textContent)});
      g.locked=false;
      if(q.t==='c')choice(g,it,q.a,q.w,function(ok){done(g,it,ok)});
      else if(q.t==='t')two(g,it);
      else if(q.t==='o')order(g,it);
      else if(q.t==='s')sorter(g,it);
    }

    function choice(g,it,a,w,cb){
      var opts=shuffle([{t:a,ok:1}].concat(w.map(function(x){return {t:x,ok:0}}))),box=$('#lbTask');
      box.innerHTML='<div class="lb-opts">'+opts.map(function(o,i){return '<button class="lb-opt" data-o="'+i+'"><span>'+'ABCD'.charAt(i)+'</span>'+esc(o.t)+'</button>'}).join('')+'</div>';
      box.querySelectorAll('[data-o]').forEach(function(b){on(b,'click',function(){if(g.locked||!alive(g))return;var o=opts[+b.dataset.o];g.locked=true;
        box.querySelectorAll('[data-o]').forEach(function(x){x.disabled=true;if(opts[+x.dataset.o].ok)x.classList.add('right')});if(!o.ok)b.classList.add('wrong');cb(!!o.ok)})});
    }
    function two(g,it){
      var q=it.q,box=$('#lbTask');
      function step(i){var st=q.steps[i],wrap=document.createElement('div');wrap.className='lb-step';wrap.innerHTML='<p class="lb-steph">'+(i===0?'①':'②')+' '+esc(i===0?'第一步':'第二步')+'</p>';
        if(i===1){var qt=document.createElement('p');qt.className='lb-step2q';qt.textContent=st.q.replace(/^第二步：/,'');wrap.appendChild(qt);talk(qt.textContent)}
        var inner=document.createElement('div');wrap.appendChild(inner);box.appendChild(wrap);
        var holder=inner;holder.id='lbStep'+i;
        var opts=shuffle([{t:st.a,ok:1}].concat(st.w.map(function(x){return {t:x,ok:0}})));
        holder.innerHTML='<div class="lb-opts">'+opts.map(function(o,j){return '<button class="lb-opt" data-o="'+j+'"><span>'+'ABCD'.charAt(j)+'</span>'+esc(o.t)+'</button>'}).join('')+'</div>';
        holder.querySelectorAll('[data-o]').forEach(function(b){on(b,'click',function(){if(g.locked||!alive(g))return;var o=opts[+b.dataset.o];
          holder.querySelectorAll('[data-o]').forEach(function(x){x.disabled=true;if(opts[+x.dataset.o].ok)x.classList.add('right')});
          if(!o.ok){b.classList.add('wrong');g.locked=true;done(g,it,false);return}
          C.sfx('ok');if(i===0){step(1);wrap.nextSibling&&wrap.nextSibling.scrollIntoView({block:'nearest',behavior:'smooth'})}else{g.locked=true;done(g,it,true)}})});
      }
      box.innerHTML='';step(0);
    }
    function order(g,it){
      var q=it.q,pool=shuffle(q.items),seq=[],box=$('#lbTask');
      function draw(){box.innerHTML='<p class="lb-hint">依序點選，排好後按「確定」。點上面排好的可以收回。</p><div class="lb-seq">'+(seq.length?seq.map(function(x,i){return '<button class="lb-seqi" data-back="'+i+'"><b>'+(i+1)+'</b>'+esc(x)+'</button>'}).join('<span class="lb-arr">→</span>'):'<span class="lb-empty">從下面選第 1 個</span>')+'</div><div class="lb-pool">'+pool.map(function(x,i){return '<button class="lb-chipbtn" data-p="'+i+'"'+(seq.indexOf(x)>=0?' disabled':'')+'>'+esc(x)+'</button>'}).join('')+'</div><button class="lb-go" data-act="ok"'+(seq.length===q.items.length?'':' disabled')+'>確定 ✓</button>';
        box.querySelectorAll('[data-p]').forEach(function(b){on(b,'click',function(){if(g.locked)return;C.sfx('tap');seq.push(pool[+b.dataset.p]);draw()})});
        box.querySelectorAll('[data-back]').forEach(function(b){on(b,'click',function(){if(g.locked)return;seq.splice(+b.dataset.back,1);draw()})});
        on(box.querySelector('[data-act="ok"]'),'click',function(){if(g.locked||!alive(g))return;g.locked=true;var ok=seq.join('|')===q.items.join('|');
          box.querySelectorAll('button').forEach(function(x){x.disabled=true});if(!ok){var c=document.createElement('p');c.className='lb-correct';c.textContent='正確順序：'+q.items.join(' → ');box.appendChild(c)}done(g,it,ok)})}
      draw();
    }
    function sorter(g,it){
      var q=it.q,items=shuffle(q.items),pick={},box=$('#lbTask');
      function draw(){var all=items.every(function(x){return pick[x[0]]!==undefined});
        box.innerHTML='<p class="lb-hint">每一個都幫它選一個分類，全部選好再按「確定」。</p><div class="lb-sort">'+items.map(function(x,i){return '<div class="lb-srow" data-r="'+i+'"><b>'+esc(x[0])+'</b><span>'+q.bins.map(function(bn,j){return '<button data-i="'+i+'" data-b="'+j+'" aria-pressed="'+(pick[x[0]]===j)+'">'+esc(bn)+'</button>'}).join('')+'</span></div>'}).join('')+'</div><button class="lb-go" data-act="ok"'+(all?'':' disabled')+'>確定 ✓</button>';
        box.querySelectorAll('[data-b]').forEach(function(b){on(b,'click',function(){if(g.locked)return;C.sfx('tap');pick[items[+b.dataset.i][0]]=+b.dataset.b;draw()})});
        on(box.querySelector('[data-act="ok"]'),'click',function(){if(g.locked||!alive(g))return;g.locked=true;var ok=true;
          items.forEach(function(x,i){var r=box.querySelector('[data-r="'+i+'"]'),good=pick[x[0]]===x[1];if(!good){ok=false;r.classList.add('bad');r.insertAdjacentHTML('beforeend','<small>→ '+esc(q.bins[x[1]])+'</small>')}else r.classList.add('good')});
          box.querySelectorAll('button').forEach(function(x){x.disabled=true});done(g,it,ok)})}
      draw();
    }

    function done(g,it,ok){
      if(!alive(g))return;var q=it.q,pts=0;
      if(!it.retry){mutLab(function(L){var a=L.seen[g.key+g.lv]||(L.seen[g.key+g.lv]=[]);if(a.indexOf(q.id)<0)a.push(q.id)})}
      if(ok){C.sfx('ok');g.combo++;g.best=Math.max(g.best,g.combo);if(!it.retry){g.first++;pts=15}else pts=5;g.pts+=give(pts);try{C.Learn.sciok()}catch(e){}}
      else{C.sfx('no');g.combo=0;g.wrong++;if(g.review.indexOf(q.e)<0)g.review.push(q.e);if(!it.retry)g.queue.push({q:q,retry:true})}
      var last=g.i+1>=g.queue.length,f=$('#lbFeed');
      f.innerHTML='<div class="lb-feed '+(ok?'ok':'bad')+'"><b>'+(ok?(it.retry?'✓ 這次答對了！+5':'✦ 答對了！+15'):(it.retry?'沒關係，看看解說記起來！':'差一點！這題最後會再出一次'))+'</b><p>💡 '+esc(q.e)+'</p><button class="lb-go" data-act="next">'+(last?'看看成果 🏆':'下一題 →')+'</button></div>';
      on(f.querySelector('[data-act="next"]'),'click',function(){if(!alive(g))return;C.sfx('tap');g.i++;next(g)});
      try{f.scrollIntoView({block:'nearest',behavior:'smooth'})}catch(e){}
      C.say(ok?'答對了！':'看一下解說，你可以的！',ok?'happy':'oops');
    }

    function result(g){
      if(!alive(g))return;clearInterval(g.tick);
      var sec=(Date.now()-g.start)/1000,firstTotal=g.queue.filter(function(x){return !x.retry}).length,
        st=g.first>=firstTotal?(sec<=firstTotal*TIME3?3:2):g.first>=firstTotal-1?2:g.first>=firstTotal-2?1:0,
        bonus=0,stamp=false,badge=false,dew=0,sciBefore=isKid()?C.scLevel(C.subPts(kid(),'sci')).i:0;
      if(st>0)bonus+=give(30);if(st===3)bonus+=give(20);
      if(isKid()){
        mutLab(function(L,k){var r=Array.isArray(L.st[g.key])?L.st[g.key].slice(0,4):[0,0,0,0];while(r.length<4)r.push(0);r[g.lv]=Math.max(+r[g.lv]||0,st);
          if(r[0]&&r[1]&&r[2]&&!r[3]){r[3]=1;stamp=true;k.water=(+k.water||0)+5;dew+=5}L.st[g.key]=r;
          var all=ST.every(function(s){var x=s.k===g.key?r:L.st[s.k];return Array.isArray(x)&&x[3]});if(all&&!L.badge){L.badge=1;badge=true;k.water=(+k.water||0)+30;dew+=30}});
        if(stamp)bonus+=give(100);if(badge)bonus+=give(300);
        try{if(st)C.Learn.star(st);C.Learn.play('lab')}catch(e){}
        var sciAfter=C.scLevel(C.subPts(kid(),'sci')).i;if(sciAfter>sciBefore)C.Store.mut(who(),function(k){var b=typeof k.scl==='number'?k.scl:sciBefore;if(sciAfter>b){k.water=(+k.water||0)+(sciAfter-b)*3;dew+=(sciAfter-b)*3}k.scl=Math.max(b,sciAfter)});
        var day=C.Store.finishGame(who(),'lab',{score:g.first,total:firstTotal,roundPts:g.pts+bonus,eg:C.egrade()})||0;bonus+=day;
      }
      var total=g.pts+bonus,nextOpen=g.lv<2&&st>0,passed=st>0;
      var h='<div class="lb-res"><div class="lb-res-ico">'+(badge?'🏅':stamp?'🎖️':passed?'🏆':'🌱')+'</div><h2>'+(badge?'十站全破！小小科學家誕生！':stamp?'新的研究所印章！':passed?'研究成功！':'還差一點點，再挑戰一次！')+'</h2>'+stars(st)+
        '<div class="lb-res-pts">'+(isKid()?'+'+total+' 分':'家長預覽不記分')+'</div><div class="lb-res-m"><span>首次答對 '+g.first+' / '+firstTotal+'</span><span>用時 '+fmt(sec)+'</span><span>最高連對 '+g.best+'</span></div>'+
        (st===2&&g.first>=firstTotal?'<p class="lb-hint">全對了！再快一點（'+Math.round(firstTotal*TIME3/60*10)/10+' 分鐘內）就能拿三星。</p>':'')+
        (dew?'<p class="lb-dew">獲得 '+dew+' 💧，可以去花園買裝飾！</p>':'')+
        (g.review.length?'<div class="lb-review"><b>📒 這次要記住的重點</b>'+g.review.slice(0,3).map(function(t){return '<p>'+esc(t)+'</p>'}).join('')+'</div>':'')+
        '<div class="lb-res-btn">'+(nextOpen?'<button class="lb-go" data-act="nextlv">下一關 →</button>':'')+'<button class="lb-go alt" data-act="again">再玩一次（換新題目）</button><button class="lb-go alt" data-act="st">回研究站</button></div></div>';
      frame(h,'lb-result');active=null;
      on($('[data-act="nextlv"]'),'click',function(){play(g.key,g.lv+1)});
      on($('[data-act="again"]'),'click',function(){play(g.key,g.lv)});
      on($('[data-act="st"]'),'click',function(){station(g.key)});
      if(passed){C.sfx('win');try{C.confetti(null,40)}catch(e){}}
      C.say(badge?'太厲害了！研究所十站全部完成！':passed?'研究成功！去挑戰下一關吧！':'沒關係，看看重點再試一次！',passed?'happy':'oops');
    }

    /* ===================== 接上自然島 ===================== */
    C.SCI_IDS.lab=1;
    C.GAMES.push({id:'lab',sub:'sci',cls:'v2new feat',ico:'🔬',tag:'第二座島',zh:'奇蹟研究所',en:'Miracle Lab',d:'自然第二座島：10 個研究站、360 道不重複的新挑戰。'});
    C.GAME_FN.lab=function(){open()};
    var home0=C.getHome();
    C.setHome(function(){home0.apply(this,arguments);try{
      if(C.gOpen()!=='sci')return;var gb=document.getElementById('games');if(!gb||gb.querySelector('.lbm-tabs'))return;
      /* 自然首頁只留島嶼：拿掉下方的站點清單、印章手冊與說明 */
      gb.querySelectorAll('.sxbook,.sxnote,.v2natureshelf').forEach(function(x){x.remove()});
      var map1=gb.querySelector('.sxmap');if(!map1)return;
      var tabs=document.createElement('div');tabs.className='lbm-tabs';
      tabs.innerHTML='<button data-isl="a" aria-pressed="'+(tab==='a')+'">🏝️ 第一島<small>自然探險島</small></button><button data-isl="b" aria-pressed="'+(tab==='b')+'">🔬 第二島<small>奇蹟研究所'+(unlocked()?'':' 🔒')+'</small></button>';
      map1.parentNode.insertBefore(tabs,map1);
      var wrap=document.createElement('div');wrap.className='lbm-wrap';map1.parentNode.insertBefore(wrap,map1.nextSibling);
      function show(){map1.hidden=tab!=='a';wrap.hidden=tab!=='b';if(tab==='b'){wrap.innerHTML=labMapHTML();wrap.querySelectorAll('[data-lab]').forEach(function(b){on(b,'click',function(){if(!unlocked()){C.sfx('no');C.say('先把第一座島 10 站都蓋到印章，研究所島就會開放！','oops');return}C.sfx('win');try{C.confetti(b,16)}catch(e){}C.cleanupGame();C.shell('奇蹟研究所');try{C.Music.play('garden')}catch(e){}station(b.dataset.lab)})})}
        tabs.querySelectorAll('[data-isl]').forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.isl===tab))})}
      tabs.querySelectorAll('[data-isl]').forEach(function(x){on(x,'click',function(){C.sfx('tap');setTab(x.dataset.isl);show();if(tab==='b')C.say(unlocked()?'歡迎來到奇蹟研究所島！點一個研究站開始挑戰！':'第二座島還沒開放，先完成第一座島喔！','happy')})});
      show();
    }catch(e){console.error('labhome',e)}});
    window.MiracleLab={version:'9.0.0',visual:visual,stations:ST.map(function(s){return s.k}),count:ST.reduce(function(n,s){return n+s.q[0].length+s.q[1].length+s.q[2].length},0),open:open};
  };
})();
