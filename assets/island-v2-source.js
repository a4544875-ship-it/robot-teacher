/* Additive expansion inside the original application closure. No Firebase migration. */
var V2=(function(){
  'use strict';
  var active=null, serial=0;
  var PATH='assets/';
  var META={
    v2post:{id:'v2post',zh:'天空快遞',en:'Sky Post',ico:'📮',bg:'sky',sub:'en',d:'聽懂包裹、拼出單字，讓飛船完成送貨！'},
    v2fraction:{id:'v2fraction',zh:'分數魔法廚房',en:'Fraction Kitchen',ico:'🥧',bg:'kitchen',sub:'math',d:'親手分派、組合切片，從幾分之一到異分母加減。'},
    v2clock:{id:'v2clock',zh:'時鐘修理師',en:'Clock Workshop',ico:'🕰️',bg:'clock',sub:'math',d:'修好時鐘、安排出發時間，練習讀鐘與時間計算。'},
    smoon:{id:'smoon',zh:'月相觀測站',en:'Moon Observatory',ico:'🌙',bg:'moon',sub:'sci',station:'moon',d:'月亮不會自己發光！觀察亮面、月相與變化。',levels:[['月亮觀察員','辨認月亮的亮面與月相'],['月相時間軸','排出月相變化的順序'],['月亮小偵探','理解月相與觀察方法']]},
    ssound:{id:'ssound',zh:'聲音魔法工坊',en:'Sound Studio',ico:'🎵',bg:'sound',sub:'sci',station:'sound',d:'操作振動實驗，分清音量與音高。',levels:[['看見振動','觀察物體振動與聲音'],['音量調音師','比較振動幅度與音量'],['音高實驗室','比較振動快慢與音高']]},
    swind:{id:'swind',zh:'風力工程師',en:'Wind Lab',ico:'🌬️',bg:'meadow',sub:'sci',station:'wind',d:'轉動風車、觀察空氣流動，公平比較風力。',levels:[['讓風車轉動','調整風力觀察轉速'],['風向偵探','學會辨認風從哪裡來'],['公平實驗','一次只改一個條件']]},
    sweather:{id:'sweather',zh:'天氣觀測家',en:'Weather Watch',ico:'🌦️',bg:'meadow',sub:'sci',station:'weather',d:'讀溫度、看雨量、整理觀測紀錄。',levels:[['今天的天氣','選擇觀測工具'],['觀測小日記','讀懂簡單天氣數據'],['氣象小偵探','用紀錄比較天氣']]},
    sinsect:{id:'sinsect',zh:'昆蟲探索隊',en:'Insect Quest',ico:'🦋',bg:'meadow',sub:'sci',station:'insect',d:'觀察身體構造、昆蟲分類與蝴蝶生命週期。',levels:[['誰是昆蟲','觀察成蟲身體與腳'],['蝴蝶的一生','排列完全變態的階段'],['生態守護員','探索昆蟲與自然的關係']]}
  };
  function pick(a){return a[rand(a.length)]}
  function mix(a){return shuffle(a.slice())}
  function bind(el,event,fn){if(el)el.addEventListener(event,fn)}
  function el(sel){return active&&active.root?active.root.querySelector(sel):null}
  function alive(s){return s===active&&!s.done&&who===s.kid}
  function give(n){if(!isKid())return;roundPts+=n*10;Store.award(who,n*10,curGame);plusFx(n*10)}
  function talk(t,lang){if(muted||!window.speechSynthesis)return;try{var u=new SpeechSynthesisUtterance(t);u.lang=lang||'zh-TW';u.rate=.82;window.speechSynthesis.cancel();window.speechSynthesis.speak(u)}catch(e){}}
  function stop(){serial++;if(active){active.done=true;active=null}try{window.speechSynthesis.cancel()}catch(e){}}
  function companion(m){return m.id==='v2post'?'owl':m.id==='v2fraction'?'fox':m.id==='v2clock'?'robot':'frog'}
  function world(s,body){
    s.root=gBody;gBody.innerHTML='<section class="v2world" style="background-image:url('+PATH+s.meta.bg+'.webp)"><div class="v2hud"><span>'+s.meta.ico+' '+esc(s.meta.zh)+' · '+egrade+'年級</span><button id="v2Leave" aria-label="離開新版遊戲">← '+(s.meta.station?'回小島':'回選單')+'</button></div><div class="v2glass">'+body+'</div></section>';
    bind(el('#v2Leave'),'click',function(){var m=s.meta;stop();if(m.station)station(m);else backGameHome()});
  }
  function start(m,level){
    cleanupGame();shell(m.zh);Music.play(m.sub==='sci'?'garden':m.sub==='math'?'math':'lobby');Learn.round0();
    var s={meta:m,level:level||0,kid:who,token:++serial,index:0,total:m.station?5:8,right:0,wrong:0,first:0,tries:0,streak:0,bestCombo:0,done:false,review:[],seen:[],grade:EGRADES.indexOf(egrade)+2,started:Date.now()};active=s;
    world(s,'<div class="v2intro"><img class="v2companion" src="'+PATH+companion(m)+'.webp" alt="探險夥伴"><span class="v2badge">'+(m.station?'第 '+(s.level+1)+' 關 · '+esc(m.levels[s.level][0]):'全新互動冒險')+'</span><h2>'+esc(m.zh)+'</h2><p>'+esc(m.d)+'</p><ul><li>每次挑戰 '+s.total+' 個任務，沒有倒數壓力。</li><li>答錯會有提示，可以再試；第一次答對比例決定星星。</li><li>做對任務 +10 分，完成後顯示學習摘要。</li></ul><button class="v2action" id="v2Begin">開始探險 ✦</button></div>');
    bind(el('#v2Begin'),'click',function(){if(alive(s)){sfx('tap');next(s)}});say('準備好了嗎？這次一起探索「'+m.zh+'」！','happy');
  }
  function station(m){
    cleanupGame();shell(m.zh);var r=isKid()?scRow(who,m.station):[0,0,0,0];
    gBody.innerHTML='<section class="v2station"><div class="v2station-head" style="background-image:linear-gradient(transparent,#152c47bb),url('+PATH+m.bg+'.webp)"><span>'+m.ico+' 自然探索</span><h2>'+esc(m.zh)+'</h2><p>'+esc(m.d)+'</p></div><span class="v2badge">'+(r[3]?'✅ 已收集印章':'三關完成，收集自然印章與 5 💧')+'</span>'+m.levels.map(function(l,i){var open=i===0||r[i-1]>0;return '<button class="v2level" data-v2-level="'+i+'"'+(open?'':' disabled')+'><b>'+(open?i+1:'🔒')+'</b><span><strong>'+esc(l[0])+'</strong><small>'+esc(open?l[1]:'先完成前一關')+'</small></span><i class="v2stars">'+'★'.repeat(r[i])+'☆'.repeat(3-r[i])+'</i></button>'}).join('')+'<p class="v2hint">二年級可當生活課程探索；高年級是基礎複習與延伸。這些活動不代表完整年級課綱。</p></section>';
    gBody.querySelectorAll('[data-v2-level]').forEach(function(b){bind(b,'click',function(){start(m,+b.dataset.v2Level)})});say('選一關，開始做小小研究員！','happy');
  }
  function frame(s,q){
    world(s,'<div class="v2eyebrow"><span>任務 '+(s.index+1)+' / '+s.total+'</span><span>✦ 連續答對 '+s.streak+'</span></div><div class="v2progress"><i style="width:'+(s.index/s.total*100)+'%"></i></div><h2 class="v2question">'+esc(q.title)+'</h2><p class="v2hint">'+esc(q.hint||'觀察一下，再試試看。')+'</p><div id="v2Task"></div><div id="v2Feed" role="status" aria-live="polite"></div>');
  }
  function mark(s,ok){
    if(s.meta.sub==='en'){if(ok)Learn.ok(s.q.word);else Learn.bad(s.q.word)}
    if(s.meta.sub==='sci')Learn.sci(s.q.key||('v2:'+s.meta.id+':'+s.level+':'+s.index),ok);
    if(s.meta.sub==='math'&&ok)Learn.mathok();
  }
  function answer(s,ok,why,button){
    if(!alive(s)||s.locked)return;
    s.tries++;mark(s,ok);s.locked=true;
    if(ok){s.right++;if(s.tries===1)s.first++;s.streak++;s.bestCombo=Math.max(s.bestCombo,s.streak);give(1);sfx('ok');if(button){button.classList.add('right');confetti(button,14)}var worldNode=el('.v2world');if(worldNode)worldNode.classList.add('v2success');}
    else{s.wrong++;s.streak=0;sfx('no');if(button)button.classList.add('wrong');if(s.review.indexOf(why)<0)s.review.push(why)}
    var feed=el('#v2Feed');feed.innerHTML='<div class="v2feedback'+(ok?'':' bad')+'"><b>'+(ok?'✦ 做到了！':'再觀察一次，你可以的！')+'</b><p>'+esc(why)+'</p><button class="v2action" id="v2Continue">'+(ok?s.index+1>=s.total?'看看這次的成果 🏆':'下一個任務 →':'照提示再試一次 ↻')+'</button></div>';
    bind(el('#v2Continue'),'click',function(){if(!alive(s))return;s.locked=false;if(ok){s.index++;s.tries=0;s.lastAnswer=null;next(s)}else render(s)});
    feed.scrollIntoView({block:'nearest',behavior:REDUCED?'auto':'smooth'});
  }
  function next(s){if(!alive(s))return;if(s.index>=s.total){result(s);return}s.q=make(s);s.locked=false;render(s)}
  function options(s,q,visual){
    var opts=mix(q.opts);el('#v2Task').innerHTML=(visual?'<div class="v2visual">'+visual+'</div>':'')+'<div class="v2options">'+opts.map(function(o,i){return '<button data-v2-option="'+i+'">'+(o.icon?'<span class="v2option-icon">'+o.icon+'</span>':'')+esc(o.label)+'</button>'}).join('')+'</div>';
    el('#v2Task').querySelectorAll('[data-v2-option]').forEach(function(b){bind(b,'click',function(){answer(s,!!opts[+b.dataset.v2Option].ok,q.why,b)})});
  }
  function choices(title,correct,wrong,why,visual,key){return {kind:'choice',title:title,opts:[{label:correct,ok:true}].concat(wrong.map(function(t){return {label:t,ok:false}})),why:why,visual:visual,key:key}}
  function moonSVG(phase,size){var n=((phase%8)+8)%8,r=40,body='';
    if(n===4)body='<circle cx="50" cy="50" r="40" fill="#ffe8b0"/>';
    else if(n!==0){var waxing=n<4,angle=(waxing?n:8-n)*Math.PI/4,points=[],term=[];
      for(var j=0;j<=80;j++){var y=-r+2*r*j/80,x=Math.sqrt(Math.max(0,r*r-y*y));points.push((50+(waxing?x:-x)).toFixed(3)+','+(50+y).toFixed(3));term.unshift((50+(waxing?1:-1)*Math.cos(angle)*x).toFixed(3)+','+(50+y).toFixed(3))}
      body='<path d="M'+points.concat(term).join('L')+'Z" fill="#ffe8b0"/>';
    }
    return '<svg class="v2moon" viewBox="0 0 100 100" role="img" aria-label="'+['新月','眉月','上弦月','盈凸月','滿月','虧凸月','下弦月','殘月'][n]+'"><circle cx="50" cy="50" r="40" fill="#283b63"/>'+body+'<circle cx="50" cy="50" r="40" fill="none" stroke="#748dac" stroke-width="2"/></svg>';
  }
  function clockSVG(h,m){var a=(h%12+m/60)*30,b=m*6;var nums='';for(var i=1;i<=12;i++){var rad=(i*30-90)*Math.PI/180;nums+='<text x="'+(140+98*Math.cos(rad))+'" y="'+(148+98*Math.sin(rad))+'" text-anchor="middle" fill="#253753" font-size="19" font-weight="700">'+i+'</text>'}
    return '<svg class="v2clock" viewBox="0 0 280 280" role="img" aria-label="時鐘顯示 '+h+' 點 '+m+' 分"><circle cx="140" cy="140" r="131" fill="#e6bd77"/><circle cx="140" cy="140" r="120" fill="#fffcf1" stroke="#aecfc8" stroke-width="4"/>'+nums+'<line x1="140" y1="140" x2="140" y2="79" stroke="#253753" stroke-width="10" stroke-linecap="round" transform="rotate('+a+' 140 140)"/><line x1="140" y1="140" x2="140" y2="47" stroke="#079e93" stroke-width="6" stroke-linecap="round" transform="rotate('+b+' 140 140)"/><circle cx="140" cy="140" r="10" fill="#ffbd54" stroke="#253753" stroke-width="3"/></svg>';
  }
  function windSVG(speed){return '<svg class="v2windmill" viewBox="0 0 150 170" role="img" aria-label="風車模型"><path d="M58 158l7-95h20l7 95" fill="#d7b580" stroke="#5e6f74" stroke-width="3"/><rect x="69" y="135" width="13" height="23" rx="6" fill="#538c8b"/><g class="v2blades" style="--speed:'+(speed?Math.max(.3,4/speed):1000)+'s;'+(!speed?'animation-play-state:paused;':'')+'">'+[0,90,180,270].map(function(a){return '<path d="M75 64L66 16Q72 2 89 10L81 64Z" fill="#e7f7f0" stroke="#498981" stroke-width="3" transform="rotate('+a+' 75 64)"/>'}).join('')+'</g><circle cx="75" cy="64" r="8" fill="#ffc762"/></svg>'}
  function soundVisual(amp,rate){return '<div class="v2soundwave" role="img" aria-label="振動示意，非實際聲波測量" style="--amp:'+amp+'px;--rate:'+rate+'s">'+Array.from({length:16},function(_,i){return '<i style="--i:'+i+'"></i>'}).join('')+'</div>'}
  function make(s){var m=s.meta,g=s.grade,i=s.index,lv=s.level;
    if(m.id==='v2post'){
      var list=Learn.boost(poolW(),false),remaining=list.filter(function(w){return s.seen.indexOf(w[0])<0}),w=Learn.pick(remaining.length?remaining:list);s.seen.push(w[0]);var stage=g>=3&&i%2===1?'spell':'delivery';
      if(stage==='spell')return {kind:'spell',title:'包裹標籤掉了！拼出「'+w[2]+'」。',hint:'點字母放到標籤上；點已放的字母可以收回。',word:w,why:w[0]+' 的意思是「'+w[2]+'」。'};
      return {kind:'delivery',title:'聽聽看，飛船要送哪個包裹？',hint:'按「聽單字」可重聽。需要時也能顯示單字。',word:w,opts:[{label:w[2],icon:w[1],ok:true}].concat(others(w,3).map(function(x){return {label:x[2],icon:x[1],ok:false}})),why:w[0]+' 的意思是「'+w[2]+'」。'};
    }
    if(m.id==='v2fraction'){
      var den=pick(g<=2?[2,3,4]:g===3?[3,4,6,8]:[4,6,8,10,12]),num=g===2?1:1+rand(den-1),title='把派分成 '+den+' 等份，送出 '+num+'/'+den+' 個派。',why='一個派平均分成 '+den+' 份，每份是 1/'+den+'；'+num+' 份就是 '+num+'/'+den+'。';
      if(g>=3&&i%3===1){var a=1+rand(den-2),b=1+rand(den-a);num=a+b;title='先送 '+a+'/'+den+'，再送 '+b+'/'+den+'，一共要幾片？';why='分母相同，每片大小相同，分子相加：'+a+'/'+den+' + '+b+'/'+den+' = '+num+'/'+den+'。'}
      if(g>=4&&i%3===2){var from=2+rand(den-1),take=1+rand(from-1);num=from-take;title='有 '+from+'/'+den+' 個派，吃掉 '+take+'/'+den+'，留下幾片？';why='分母不變，分子相減：'+from+'/'+den+' − '+take+'/'+den+' = '+num+'/'+den+'。'}
      if(g>=5&&i%2===1){var pair=pick([[2,3,6],[3,4,12],[2,5,10],[3,6,6],[4,6,12]]);den=pair[2];var left=den/pair[0],right=den/pair[1];num=left+right;title='客人要 1/'+pair[0]+' + 1/'+pair[1]+' 個派，請用 '+den+' 等份的派表示。';why='先通分：1/'+pair[0]+' = '+left+'/'+den+'，1/'+pair[1]+' = '+right+'/'+den+'，相加是 '+num+'/'+den+'。'}
      return {kind:'fraction',title:title,hint:'每一片都一樣大。點切片，選好後按「上菜」。',den:den,num:num,why:why};
    }
    if(m.id==='v2clock'){
      var h=1+rand(12),minute=g<=2?pick([0,5,10,15,20,25,30,35,40,45,50,55]):rand(60),end=h*60+minute,txt='把時鐘修成 '+h+' 點 '+minute+' 分。',why='長針指分鐘、短針指小時。分鐘每增加 5，長針走一個數字；短針也會慢慢往下一個小時移動。';
      if(g>=3&&i%2===1){var delta=pick(g===3?[10,15,20,30]:[25,35,45,75,90]);end=(h*60+minute+delta)%720;txt='現在 '+h+' 點 '+minute+' 分，再過 '+delta+' 分鐘，時鐘是幾點？';var eh=Math.floor(end/60)%12||12,em=end%60;why='先加分鐘，滿 60 分鐘進 1 小時。答案是 '+eh+' 點 '+em+' 分。這裡使用 12 小時鐘面。'}
      if(g>=5&&i%4===3){var times=2+rand(3),duration=pick([15,20,25,30]);end=(h*60+minute+times*duration)%720;txt='從 '+h+' 點 '+minute+' 分開始，完成 '+times+' 項任務，每項 '+duration+' 分鐘，結束時是幾點？';why='總共 '+times+' × '+duration+' = '+(times*duration)+' 分鐘，加到起始時間，再把每 60 分鐘換成 1 小時。結束是 '+(Math.floor(end/60)%12||12)+' 點 '+end%60+' 分。'}
      return {kind:'clock',title:txt,hint:'使用小時與分鐘選單調整時鐘，再按「完成修理」。',h:Math.floor(end/60)%12||12,m:end%60,why:why};
    }
    if(m.id==='smoon')return moonQuestion(lv,i,g);
    if(m.id==='ssound')return soundQuestion(lv,i,g);
    if(m.id==='swind')return windQuestion(lv,i,g);
    if(m.id==='sweather')return weatherQuestion(lv,i,g);
    if(m.id==='sinsect')return insectQuestion(lv,i,g);
  }
  function moonQuestion(lv,i,g){
    var names=['新月','眉月','上弦月','盈凸月','滿月','虧凸月','下弦月','殘月'];
    if(lv===0){var phase=pick(g===2?[0,2,4,6]:[0,1,2,3,4,5,6,7]);return choices('這個月亮看起來最像哪一種月相？',names[phase],mix(names.filter(function(x){return x!==names[phase]})).slice(0,g===2?2:3),'這是'+names[phase]+'。亮面來自太陽照射；圖中採臺灣常見的示意方向，真實角度會隨時間與位置改變。',moonSVG(phase),'v2:moon:phase:'+phase)}
    if(lv===1){var steps=g===2?['新月','上弦月','滿月','下弦月']:['新月','眉月','上弦月','盈凸月','滿月','虧凸月','下弦月','殘月'];var n=rand(steps.length);return choices('從「'+steps[n]+'」開始，月相依序會走向哪一個？',steps[(n+1)%steps.length],mix(steps.filter(function(x){return x!==steps[(n+1)%steps.length]})).slice(0,3),'這裡用'+(g===2?'四個主要階段':'八個常見階段')+'描述約一個月的月相循環；變化是逐漸發生的，不是一天就跳到下一個階段。','<div class="v2timeline"><span>'+steps[n]+'</span><span>→</span><span>？</span></div>','v2:moon:order:'+n)}
    var bank=[['月亮的亮光主要從哪裡來？','反射太陽光',['月亮自己發光','地球的路燈'],'月亮反射太陽光，我們看到的亮面會隨太陽、地球與月亮的相對位置改變。'],['想比較月相，怎樣記錄比較好？','記下日期、時間與月亮形狀',['只看一次就下結論','每次都忘記日期'],'連續記錄日期、觀察時間與形狀，才能比較月相的變化。'],['白天有可能看見月亮嗎？','有可能',['一定不可能','只有下雨才可能'],'白天也可能看見月亮，取決於月亮在天空的位置和天空亮度。'],['滿月之後，亮面通常如何變化？','逐漸變小',['立刻完全消失','永遠保持圓形'],'滿月後進入虧月階段，可見亮面逐漸變小。'],['觀察太陽與月亮，哪個行為安全？','不要直接盯著太陽',['用望遠鏡直接看太陽','盯著太陽找月亮'],'不能直接盯著太陽，也不能用一般望遠鏡看太陽。觀察月亮時仍要注意周遭安全。']];var b=bank[i%bank.length];return choices(b[0],b[1],b[2],b[3],moonSVG(pick([1,2,4,6])),'v2:moon:concept:'+i);
  }
  function soundQuestion(lv,i,g){
    if(lv===0){var bank=[['敲一下鼓，聲音主要怎麼產生？','鼓面振動',['鼓面變色','鼓面發光'],'物體振動可以產生聲音。用手輕觸正在響的鼓面，可感受振動。'],['輕輕按住正在響的音叉，聲音通常如何？','變小或停止',['變得更高','一定變大'],'按住音叉會讓振動減弱，聲音也會減弱或停止。'],['聲音能透過什麼傳到耳朵？','空氣等介質',['只有光線','只有顏色'],'聲音需要介質傳播，例如空氣、水與固體。'],['輕敲與重敲同一面鼓，通常哪個較大聲？','重敲',['輕敲','永遠一樣'],'在其他條件相同時，較大的振動幅度通常產生較大的音量。'],['想保護耳朵，應該怎麼做？','避免長時間聽過大音量',['把耳機一直開到最大','靠近非常大的聲音'],'避免過大音量，適度休息，也不要貼近發出巨大聲音的物體。']];var b=bank[i%5];return choices(b[0],b[1],b[2],b[3],soundVisual(55,.65),'v2:sound:basic:'+i)}
    var target=pick([1,2,3]);return {kind:'sound',title:lv===1?'把音量模型調成「'+['','小聲','中等','大聲'][target]+'」。':'把音高模型調成「'+['','低音','中音','高音'][target]+'」。',hint:lv===1?'操作「振動幅度」，觀察示意的振動大小。':'操作「振動快慢」，觀察示意變化。',axis:lv===1?'amplitude':'frequency',target:target,why:lv===1?'在其他條件相同時，振動幅度越大，音量通常越大。音量和音高是不同的概念。':'振動越快，頻率越高，音高越高；這不代表音量一定越大。',key:'v2:sound:'+lv+':'+target};
  }
  function windQuestion(lv,i,g){
    if(lv===0){var target=pick([0,1,2,3]);return {kind:'wind',title:'讓風車呈現「'+['停止','慢慢轉','中速轉','快速轉'][target]+'」。',hint:'改變風力模型，觀察同一座風車的轉動。',target:target,why:'在同一座風車、同樣方向與距離的簡化模型中，風越強，風車轉得越快；沒有風時停止。真實轉速還受葉片與摩擦等條件影響。',key:'v2:wind:force:'+target}}
    if(lv===1){var dirs=['北','東','南','西'],d=pick(dirs),other=dirs.filter(function(x){return x!==d});return choices('「'+d+'風」是從哪個方向吹來？',d+'方',other.map(function(x){return x+'方'}),'風向用「風從哪裡來」命名；'+d+'風就是從'+d+'方吹來。風向標箭頭通常指向風的來向。','<div class="v2weather">🧭</div>','v2:wind:direction:'+d)}
    var bank=[['比較葉片大小對轉速的影響，應改變什麼？','只改葉片大小',['同時改風力和葉片','每次換不同風扇'],'公平比較要一次只改一個條件，其餘條件盡量相同。'],['比較不同風力，哪個條件要固定？','同一座風車與相同距離',['每次都換葉片','每次換不同位置'],'比較風力時，風車、方向、距離等其他條件要盡量固定。'],['看不到空氣，可以怎樣知道它在流動？','觀察旗子或風車的變化',['看牆壁的顏色','聽自己的心跳'],'可以從旗子、風車等物體的反應觀察空氣流動。'],['想讓比較更可靠，應該怎麼做？','重複測量並記錄',['只挑喜歡的一次','測完不記錄'],'多次測量並記錄，有助於降低偶然因素的影響。'],['做風車實驗，哪個行為安全？','手指遠離轉動的葉片',['伸手碰高速葉片','拆開插電中的風扇'],'操作風扇或風車時，手指要遠離轉動部位；電器由大人協助。']];var b=bank[i%5];return choices(b[0],b[1],b[2],b[3],windSVG(2),'v2:wind:fair:'+i);
  }
  function weatherQuestion(lv,i,g){
    if(lv===0){var bank=[['要量氣溫，使用哪種工具？','溫度計',['雨量筒','指南針'],'溫度計測量溫度；雨量筒測量降雨量，指南針指示方向。','🌡️'],['要記錄下了多少雨，使用哪種工具？','雨量筒',['時鐘','放大鏡'],'雨量筒收集並測量降雨量；同樣的觀測方法才能公平比較。','🌧️'],['記錄天氣時，哪項資料有幫助？','日期、時間、氣溫與天氣',['只寫自己的名字','只寫喜歡的顏色'],'日期、時間與觀測項目是比較天氣的重要紀錄。','📔'],['雷雨時，哪個做法安全？','到安全室內避雨',['站在大樹下','留在空曠操場'],'雷雨時到安全室內，不躲在孤立大樹下，也避開空曠地。','⛈️'],['要量空氣溫度，哪種位置較合適？','通風且避免陽光直射',['貼在發熱電器旁','放在太陽直射處'],'避免陽光直射與熱源干擾，才能較接近要測量的空氣溫度。','🌡️']];var b=bank[i%5];return choices(b[0],b[1],b[2],b[3],'<div class="v2weather">'+b[4]+'</div>','v2:weather:tools:'+i)}
    if(lv===1){var temp=pick([16,20,24,28,32]);return choices('看溫度計，氣溫是多少？','攝氏 '+temp+' 度',['攝氏 '+(temp+4)+' 度','攝氏 '+(temp-4)+' 度'],'°C 是攝氏溫度符號。這次的讀數是攝氏 '+temp+' 度。','<svg viewBox="0 0 160 180" width="160" role="img" aria-label="攝氏 '+temp+' 度"><rect x="54" y="12" width="30" height="124" rx="15" fill="#fff" stroke="#597d8a" stroke-width="3"/><rect x="63" y="'+(120-temp*2)+'" width="12" height="'+(temp*2)+'" rx="6" fill="#f4846b"/><circle cx="69" cy="143" r="23" fill="#f4846b" stroke="#597d8a" stroke-width="3"/>'+[0,10,20,30,40,50].map(function(v){return '<path d="M88 '+(120-v*2)+'h8" stroke="#597d8a" stroke-width="2"/><text x="104" y="'+(125-v*2)+'" fill="#253753" font-size="14">'+v+'</text>'}).join('')+'<text x="102" y="155" fill="#253753" font-size="16">°C</text></svg>','v2:weather:temperature:'+temp)}
    var rain=mix([rand(4),4+rand(6),10+rand(10)]),max=Math.max.apply(null,rain),min=Math.min.apply(null,rain),labels=['星期一','星期二','星期三'],wantMin=i%2===1,win=rain.indexOf(wantMin?min:max),graph='<svg class="v2rainchart" viewBox="0 0 320 180" role="img" aria-label="三天雨量長條圖"><path d="M35 12V145H305" stroke="#647d89" stroke-width="2" fill="none"/>'+rain.map(function(n,j){var height=n*5,x=55+j*84;return '<rect x="'+x+'" y="'+(145-height)+'" width="46" height="'+height+'" rx="7" fill="#3caca3"/><text x="'+(x+23)+'" y="'+(136-height)+'" text-anchor="middle" fill="#253753" font-size="16">'+n+' mm</text><text x="'+(x+23)+'" y="168" text-anchor="middle" fill="#253753" font-size="14">'+labels[j]+'</text>'}).join('')+'</svg>';
    if(g>=3&&i===4)return choices('雨量最多的一天，比最少的一天多幾毫米？',String(max-min)+' 毫米',[String(max-min+2)+' 毫米',String(max-min+5)+' 毫米'],'最大值 '+max+' 減去最小值 '+min+'，差是 '+(max-min)+' 毫米。',graph,'v2:weather:difference');
    return choices('觀察三天的雨量，哪天'+(wantMin?'最少':'最多')+'？',labels[win],labels.filter(function(x){return x!==labels[win]}),'用相同方法測量，才能比較數值；'+labels[win]+'的紀錄 '+rain[win]+' 毫米'+(wantMin?'最小':'最大')+'。這是這三天的紀錄，不能推論以後每天都一樣。',graph,'v2:weather:compare');
  }
  function insectQuestion(lv,i,g){
    if(lv===0){var insects=[['蝴蝶','🦋'],['蜜蜂','🐝'],['螞蟻','🐜'],['瓢蟲','🐞']],non=[['蜘蛛','🕷️'],['蝸牛','🐌'],['蚯蚓','🪱'],['螃蟹','🦀']];var w=pick(insects);return {kind:'choice',title:'哪一個是昆蟲？',hint:'觀察成蟲：身體分頭、胸、腹，通常有三對腳。',opts:[{label:w[0],icon:w[1],ok:true}].concat(mix(non).slice(0,g===2?2:3).map(function(n){return {label:n[0],icon:n[1],ok:false}})),why:w[0]+'是昆蟲。昆蟲成蟲有三對腳；蜘蛛有四對腳，不是昆蟲。圖示是辨識提示，外形細節應搭配真實觀察。',key:'v2:insect:classify:'+w[0]}}
    if(lv===1){var species=g===2?'蝴蝶':['蝴蝶','蜜蜂','瓢蟲','蚊子','甲蟲'][i%5];return {kind:'sequence',title:'幫'+species+'排出生命週期。',hint:'按順序選：從卵開始，接著會變成什麼？',items:['卵',species==='蝴蝶'?'幼蟲（毛毛蟲）':'幼蟲','蛹','成蟲（'+species+'）'],why:species+'經過卵 → 幼蟲 → 蛹 → 成蟲，稱為完全變態。不是所有昆蟲都有蛹的階段。',key:'v2:insect:lifecycle:'+species}}
    var bank=[['蜜蜂拜訪花朵，可能幫助植物什麼？','傳粉',['把根拔起來','把花變成石頭'],'蜜蜂等昆蟲訪花時，可能把花粉帶到其他花朵，幫助傳粉。'],['所有昆蟲都一定有翅膀嗎？','不一定',['一定都有','一定都沒有'],'不是所有昆蟲都有翅膀；是否有翅膀不能單獨作為昆蟲判斷標準。'],['昆蟲成蟲的腳主要長在哪裡？','胸部',['頭部','腹部'],'昆蟲成蟲的三對腳長在胸部。'],['觀察昆蟲時，哪個做法較好？','保持距離，觀察後不破壞環境',['任意踩死牠們','把所有昆蟲都帶回家'],'尊重生物與棲地，保持適當距離，不碰不認識的昆蟲。'],['蜘蛛有八隻腳，屬於昆蟲嗎？','不屬於昆蟲',['屬於昆蟲','所有小動物都是昆蟲'],'蜘蛛是蛛形類；昆蟲成蟲是六隻腳，也就是三對腳。']];var b=bank[i%5];return choices(b[0],b[1],b[2],b[3],'<div class="v2bug">🐞</div>','v2:insect:concept:'+i);
  }
  function render(s){if(!alive(s))return;var q=s.q;frame(s,q);var t=el('#v2Task');
    var heading=el('.v2question');if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true})}
    if(q.kind==='choice'){options(s,q,q.visual);return}
    if(q.kind==='delivery'){
      options(s,q,'<div class="v2airship">🛩️</div>');t.insertAdjacentHTML('afterbegin','<div class="v2options"><button id="v2Listen">🔊 聽單字</button><button id="v2Reveal">💡 顯示單字</button></div><div class="v2word" id="v2Word" hidden>'+esc(q.word[0])+'</div>');
      bind(el('#v2Listen'),'click',function(){talk(q.word[0],'en-US')});bind(el('#v2Reveal'),'click',function(){el('#v2Word').hidden=false});return;
    }
    if(q.kind==='spell'){
      var chars=q.word[0].split(''),tiles=mix(chars.map(function(c,j){return {c:c,id:j}})),chosen=[];
      t.innerHTML='<div class="v2visual"><div class="v2parcel">'+q.word[1]+'</div></div><button class="v2action" id="v2Listen">🔊 聽單字</button><div class="v2slots" id="v2Slots"></div><div class="v2letters" id="v2Letters"></div><button class="v2action" id="v2Send">貼標籤，送出包裹</button>';
      function draw(){el('#v2Slots').innerHTML=chars.map(function(_,j){return '<button class="v2slot" data-slot="'+j+'" aria-label="'+(chosen[j]?'收回字母 '+chosen[j].c:'第 '+(j+1)+' 個字母')+'">'+(chosen[j]?chosen[j].c:'')+'</button>'}).join('');el('#v2Letters').innerHTML=tiles.map(function(v){return '<button class="v2letter" data-tile="'+v.id+'"'+(chosen.some(function(x){return x.id===v.id})?' disabled':'')+'>'+v.c+'</button>'}).join('');el('#v2Send').disabled=chosen.length!==chars.length;
        el('#v2Letters').querySelectorAll('[data-tile]').forEach(function(b){bind(b,'click',function(){if(s.locked)return;chosen.push(tiles.filter(function(v){return v.id===+b.dataset.tile})[0]);sfx('tap');draw()})});el('#v2Slots').querySelectorAll('[data-slot]').forEach(function(b){bind(b,'click',function(){if(s.locked)return;if(chosen[+b.dataset.slot]){chosen.splice(+b.dataset.slot,1);draw()}})})}
      bind(el('#v2Listen'),'click',function(){talk(q.word[0],'en-US')});bind(el('#v2Send'),'click',function(){answer(s,chosen.map(function(x){return x.c}).join('')===q.word[0],q.why)});draw();return;
    }
    if(q.kind==='fraction'){
      var on=[];t.innerHTML='<div class="v2visual"><div class="v2pie" id="v2Pie"></div></div><div class="v2slices">'+Array.from({length:q.den},function(_,j){return '<button class="v2slice" data-slice="'+j+'" aria-label="第 '+(j+1)+' 片" aria-pressed="false">'+(j+1)+'</button>'}).join('')+'</div><div class="v2fraction" id="v2FracCount"></div><button class="v2action" id="v2Serve">上菜 ✦</button>';
      function draw(){var grad=Array.from({length:q.den},function(_,j){return (on.indexOf(j)>=0?'#f59e61':'#f7e8a9')+' '+(j*360/q.den)+'deg '+((j+1)*360/q.den-.8)+'deg, #cc9c57 '+((j+1)*360/q.den-.8)+'deg '+((j+1)*360/q.den)+'deg'}).join(',');el('#v2Pie').style.background='conic-gradient('+grad+')';el('#v2FracCount').textContent=on.length+' / '+q.den+' 個派';t.querySelectorAll('[data-slice]').forEach(function(b){var yes=on.indexOf(+b.dataset.slice)>=0;b.classList.toggle('on',yes);b.setAttribute('aria-pressed',String(yes))})}
      t.querySelectorAll('[data-slice]').forEach(function(b){bind(b,'click',function(){if(s.locked)return;var n=+b.dataset.slice,j=on.indexOf(n);if(j<0)on.push(n);else on.splice(j,1);sfx('tap');draw()})});bind(el('#v2Serve'),'click',function(){answer(s,on.length===q.num,q.why)});draw();return;
    }
    if(q.kind==='clock'){
      t.innerHTML='<div class="v2visual" id="v2ClockFace"></div><div class="v2controls"><label>小時<select id="v2Hour" aria-label="小時">'+Array.from({length:12},function(_,j){return '<option value="'+(j+1)+'">'+(j+1)+' 點</option>'}).join('')+'</select></label><label>分鐘<select id="v2Minute" aria-label="分鐘">'+Array.from({length:60},function(_,j){return '<option value="'+j+'">'+j+' 分</option>'}).join('')+'</select></label></div><button class="v2action" id="v2Repair">完成修理 ✦</button>';
      function draw(){el('#v2ClockFace').innerHTML=clockSVG(+el('#v2Hour').value,+el('#v2Minute').value)}bind(el('#v2Hour'),'change',draw);bind(el('#v2Minute'),'change',draw);bind(el('#v2Repair'),'click',function(){answer(s,+el('#v2Hour').value===q.h&&+el('#v2Minute').value===q.m,q.why)});draw();return;
    }
    if(q.kind==='wind'||q.kind==='sound'){
      var val=1,min=q.kind==='wind'?0:1;
      t.innerHTML='<div class="v2visual" id="v2Lab"></div><label class="v2lablabel" for="v2Slider"><span>'+(q.kind==='wind'?'風力':q.axis==='amplitude'?'振動幅度':'振動快慢')+'</span><b id="v2SliderValue"></b></label><input class="v2range" id="v2Slider" type="range" min="'+min+'" max="3" step="1" value="1"><p class="v2hint">'+(q.kind==='wind'?'這是同一風車的簡化模型。':'動畫是概念示意；音量與音高在此分開控制。')+'</p>'+(q.kind==='sound'?'<button class="v2action" id="v2Hear">🔊 聽聽模型聲音</button>':'')+'<button class="v2action" id="v2Observe">記錄觀察結果 ✦</button>';
      function draw(){val=+el('#v2Slider').value;el('#v2SliderValue').textContent=q.kind==='wind'?['無風','弱風','中風','強風'][val]:q.axis==='amplitude'?['','小','中','大'][val]:['','慢','中','快'][val];el('#v2Lab').innerHTML=q.kind==='wind'?windSVG(val):soundVisual(q.axis==='amplitude'?val*25:50,q.axis==='frequency'?1.5/val:.65)}
      bind(el('#v2Slider'),'input',draw);bind(el('#v2Observe'),'click',function(){answer(s,val===q.target,q.why)});bind(el('#v2Hear'),'click',function(){tone(q.axis==='frequency'?[0,220,440,880][val]:440,0,.5,'sine',q.axis==='amplitude'?[0,.025,.05,.08][val]:.05)});draw();return;
    }
    if(q.kind==='sequence'){
      var seq=[],all=mix(q.items);t.innerHTML='<div class="v2visual"><div class="v2bug">🦋</div></div><div class="v2timeline" id="v2Order"></div><div class="v2options" id="v2OrderButtons"></div><button class="v2action" id="v2OrderReset">↻ 重新排列</button><button class="v2action" id="v2OrderSubmit">完成生命週期 ✦</button>';
      function draw(){el('#v2Order').innerHTML=seq.map(function(x,j){return '<span>'+(j+1)+'. '+esc(x)+'</span>'}).join('');el('#v2OrderButtons').innerHTML=all.map(function(x,j){return '<button data-order="'+j+'"'+(seq.indexOf(x)>=0?' disabled':'')+'>'+esc(x)+'</button>'}).join('');el('#v2OrderSubmit').disabled=seq.length!==q.items.length;el('#v2OrderButtons').querySelectorAll('[data-order]').forEach(function(b){bind(b,'click',function(){if(s.locked)return;seq.push(all[+b.dataset.order]);draw()})})}
      bind(el('#v2OrderReset'),'click',function(){if(s.locked)return;seq=[];draw()});bind(el('#v2OrderSubmit'),'click',function(){answer(s,seq.join('|')===q.items.join('|'),q.why)});draw();return;
    }
  }
  function result(s){
    if(!alive(s))return;var acc=s.first/s.total,stars=acc>=.9?3:acc>=.7?2:acc>=.6?1:0,passed=stars>0,stamp=false,dew=0;
    if(passed){give(3);if(stars===3)give(2)}
    if(s.meta.station&&isKid()){
      Store.mut(who,function(k){var sc=k.sc||(k.sc={}),r=Array.isArray(sc[s.meta.station])?sc[s.meta.station].slice(0,4):[0,0,0,0];while(r.length<4)r.push(0);r[s.level]=Math.max(+r[s.level]||0,stars);if(r[0]&&r[1]&&r[2]&&!r[3]){r[3]=1;stamp=true;k.water=(k.water||0)+5;dew=5}sc[s.meta.station]=r});
      if(stamp)give(10);if(stars)Learn.star(stars);
      var old=scLevel(subPts(Store.kid(who),'sci')-roundPts).i,current=scLevel(subPts(Store.kid(who),'sci')).i;
      Store.mut(who,function(k){var before=typeof k.scl==='number'?k.scl:old;if(current>before){k.water=(k.water||0)+(current-before)*3;dew+=(current-before)*3}k.scl=Math.max(before,current)});
    }
    if(isKid())Store.mut(who,function(k){var b=k.byGame[s.meta.id]||(k.byGame[s.meta.id]={pts:0,plays:0,best:0});b.v2={stars:Math.max(stars,b.v2?b.v2.stars||0:0),first:s.first,total:s.total,wrong:s.wrong,grade:egrade,seconds:Math.round((Date.now()-s.started)/1000),review:s.review.slice(0,3),updated:Date.now()}});
    Learn.play(s.meta.id);var pts=roundPts,bonus=isKid()?Store.finishGame(who,s.meta.id,{score:s.first,total:s.total,roundPts:pts,eg:egrade}):0;s.done=true;
    var review=s.review.length?s.review.slice(0,3):[s.q.why];
    world(s,'<div class="v2result"><span class="v2big" style="font-size:65px">'+(passed?'🏆':'🌱')+'</span><h2>'+(passed?'這次探險完成了！':'完成練習，再試一次會更熟！')+'</h2><div class="v2stars">'+'★'.repeat(stars)+'☆'.repeat(3-stars)+'</div><div class="v2score">+'+(pts+bonus)+' 分</div><div class="v2metrics"><span>首次答對 '+s.first+'/'+s.total+'</span><span>最高連對 '+s.bestCombo+'</span></div>'+(stamp?'<p class="v2badge">✅ 新印章！自然 +100 分，獲得 5 💧</p>':'')+(dew?'<p class="v2hint">本輪印章與升級共獲得 '+dew+' 💧，可以到花園使用。</p>':'')+'<div class="v2review"><b>帶走的小知識</b>'+review.map(function(x){return '<p>'+esc(x)+'</p>'}).join('')+'</div><p class="v2hint">首次答對達 60% 才取得過關星星；重試仍能學習並得分。</p><div class="v2buttons"><button class="v2action" id="v2Again">再玩一次 ↻</button><button class="v2action" id="v2ResultBack">'+(s.meta.station?'回小島':'回選單')+'</button></div>'+(s.meta.station&&passed&&s.level<2?'<button class="v2action" id="v2NextLevel">下一關 →</button>':'')+'</div>');
    bind(el('#v2Again'),'click',function(){start(s.meta,s.level)});bind(el('#v2ResultBack'),'click',function(){var m=s.meta;stop();if(m.station)station(m);else backGameHome()});bind(el('#v2NextLevel'),'click',function(){start(s.meta,s.level+1)});if(passed){sfx('win');confetti(null,38)}say(passed?'完成了！把今天的新知識帶回花園吧！':'你完成練習了！照著提示再挑戰一次。','happy');
  }
  function install(){
    Object.keys(META).forEach(function(id){var m=META[id];if(m.sub==='math')MATH_IDS[id]=1;if(m.sub==='sci')SCI_IDS[id]=1;
      GAMES.push({id:id,sub:m.sub==='en'?undefined:m.sub,cls:'v2new feat',ico:m.ico,tag:'新冒險',zh:m.zh,en:m.en,d:m.d});
      GAME_FN[id]=function(){if(m.station)station(m);else start(m,0)};
      if(m.station){var s=STK[m.station];s.on=1;s.gz=m.zh;s.lv=m.levels;s.rz='自然印章與 5 💧';s.v2=true}
    });
    var cleanup0=cleanupGame;cleanupGame=function(){stop();cleanup0()};
    var home0=renderGameHome;renderGameHome=function(){home0();var gates=$('#gatesBox');if(gates&&!gOpen&&!gates.querySelector('.v2welcome')){var banner=document.createElement('div');banner.className='v2welcome';banner.innerHTML='<small>ADVENTURE EDITION · 2.0</small><h2>'+esc(nm())+'，今天想發現什麼？</h2><p>聽單字、修時鐘、做實驗。每一次探索，都是讓知識島長大的魔法。</p>';gates.prepend(banner)}var upd=document.querySelector('.gupd');if(upd)upd.textContent='新版 2.0 · 新增八款互動冒險與自然五站';
      if(gOpen==='sci'){var gb=$('#games');if(!gb.querySelector('.v2natureshelf')){var shelf=document.createElement('div');shelf.className='v2natureshelf';shelf.innerHTML=STN.map(function(s){var m=META[s.id],r=scRow(who,s.k);return '<button data-nature="'+s.id+'"><span>'+(m?m.ico:({mag:'🧲',circ:'💡',water:'💧',plant:'🌱',animal:'🐾'}[s.k]))+'</span><strong>'+esc(s.zh)+'</strong><small>'+(r[3]?'✅ 已收集印章':r[0]+r[1]+r[2]+' / 9 星')+'</small></button>'}).join('');gb.appendChild(shelf);shelf.querySelectorAll('[data-nature]').forEach(function(b){bind(b,'click',function(){startGame(GAMES.filter(function(g){return g.id===b.dataset.nature})[0])})})}}
    };
    var oldGate=renderGate;renderGate=function(){oldGate();gate.querySelectorAll('.kidcard').forEach(function(b){b.style.minHeight='112px'})};
    var rec0=renderRec;renderRec=function(){rec0();if(!who)return;var box=document.createElement('section');box.className='v2records';var ids=isKid()?[who]:recFilter==='all'?KIDS.map(function(k){return k.id}):[recFilter],rows=[];
      ids.forEach(function(id){var k=Store.kid(id);Object.keys(META).forEach(function(gid){var b=k.byGame[gid];if(b&&b.v2)rows.push({id:id,m:META[gid],v:b.v2})})});rows.sort(function(a,b){return b.v.updated-a.v.updated});if(!rows.length)return;
      box.innerHTML='<h3>📔 新冒險學習摘要</h3>'+rows.slice(0,12).map(function(r){return '<div class="v2record"><strong>'+esc(kidOf(r.id).short)+' · '+r.m.ico+' '+esc(r.m.zh)+'</strong><p>'+esc(r.v.grade||'')+'年級 · 首次答對 '+r.v.first+'/'+r.v.total+' · 重試 '+(r.v.wrong||0)+' 次 · 最高 '+r.v.stars+' 星</p>'+(r.v.review||[]).map(function(t){return '<p>💡 '+esc(t)+'</p>'}).join('')+'<small>'+new Date(r.v.updated).toLocaleString('zh-TW')+'</small></div>'}).join('');PANELS.rec.prepend(box);
    };
    var book0=renderBook;renderBook=function(){book0();if(!bookEl||!bookId)return;var k=Store.kid(bookId),rows=[];Object.keys(META).forEach(function(id){var b=k.byGame[id];if(b&&b.v2&&b.v2.review&&b.v2.review.length)rows.push({m:META[id],review:b.v2.review})});if(!rows.length)return;var section=document.createElement('section');section.className='v2records';section.innerHTML='<h3>💡 新冒險複習提示</h3>'+rows.map(function(r){return '<div class="v2record"><strong>'+r.m.ico+' '+esc(r.m.zh)+'</strong>'+r.review.map(function(t){return '<p>'+esc(t)+'</p>'}).join('')+'</div>'}).join('');var target=bookEl.querySelector('.in');if(target)target.appendChild(section)};
    window.MiracleIslandV2={version:'2.0.0',games:Object.keys(META),stop:stop};
  }
  install();return {stop:stop};
})();
