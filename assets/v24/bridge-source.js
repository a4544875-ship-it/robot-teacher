/* Runs inside the existing OB closure. Existing account/reward methods remain authoritative. */
var WI24={frame:null,listener:null,session:null};
function wi24Data(){var k=isKid()&&Store.kid(who),o=k&&k.obby;return o&&o.v24&&typeof o.v24==='object'?o.v24:{version:24,levels:{}}}
function wi24Record(i){return (wi24Data().levels||{})[i]||{}}
function wi24Token(){return Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)+'-'+Math.random().toString(36).slice(2)}
function wi24Context(i){
 var b=Math.max(1,EGRADES.indexOf(egrade)+1),pool=isKid()&&PGX?PGX.pool(who):null;if(!Array.isArray(pool)||!pool.length)pool=WORDS.filter(function(w){return w[3]<=b});
 var foundation='blue red yellow green cat dog rabbit pig bird cow duck bear frog book ball apple cup bag egg cake hat car milk banana bread pen pencil eraser ruler paper desk chair bike boat train bus orange rice water'.split(' ');
 var basics=WORDS.filter(function(w){return w[3]<=b&&foundation.indexOf(w[0])>=0}),cfg=window.GateV18&&window.GateV18.cfg(who),seed=7;
 String(who||'visitor').split('').forEach(function(c){seed=(Math.imul(seed,31)+c.charCodeAt(0))>>>0});
 return {seed:seed+i*977,runId:wi24Token(),pool:pool.slice(0,60).map(function(w){return [w[0],w[1],w[2],w[3]]}),basics:basics,avatar:cfg&&cfg.id||'adv',muted:muted};
}
function wi24Pictures(context){var out={};context.pool.concat(context.basics).forEach(function(w){var key=w[0],src=V3_WORDS[key]||SIMG[key];if(!src){var food=DN_IDS.filter(function(k){return DN_F[k][0]===key})[0];if(food)src=DNP[food]}if(src&&!/^data:/.test(src))out[key]=new URL(src,location.href).href;});return out}
function wi24Map(g){
 stop();shell(g.zh);$('#gTitle').textContent='單字闖關島・魔法冒險';
 var Core=window.WordIsland24Core;if(!Core){gBody.innerHTML='<p class="empty">冒險地圖還在準備，請重新整理後再試。</p>';return}
 var native=ob(who),open=Math.max(0,Math.min(20,+native.stage||0)),records=wi24Data().levels||{},finished=Core.LEVELS.filter(function(l){return records[l.id]&&records[l.id].completed}).length;
 var h='<section class="wi24-map"><header class="wi24-map-head"><span>WORD ISLAND · THE FOUR WORLDS</span><h2>每一座島，都等著你點亮</h2><p>修復機關、完成委託，走進下一段冒險。</p><div><b>主線完成 '+finished+' / 20</b><button id="wi24Race" type="button">⚔ 雙人經典競速</button></div></header>';
 Core.WORLDS.forEach(function(world,worldIndex){h+='<section class="wi24-world"><div class="wi24-world-art" style="background-image:linear-gradient(transparent,#153b4bcc),url(assets/v24/assets/'+world.cover+')"><span>WORLD '+(worldIndex+1)+'</span><h3>'+esc(world.name)+'</h3><p>'+esc(world.goal)+'</p></div><div class="wi24-levels">';Core.LEVELS.filter(function(l){return l.world===worldIndex}).forEach(function(l){var record=records[l.id]||{},done=!!record.completed,unlocked=l.id<=open,stars=done?+record.stars||1:0,oldStars=+(native.stars||{})[l.id]||0;h+='<button class="wi24-node'+(done?' complete':'')+(l.boss?' trial':'')+'" data-wi24-level="'+l.id+'"'+(unlocked?'':' disabled')+'><span class="wi24-number">'+(unlocked?String(l.id+1).padStart(2,'0'):'🔒')+'</span><span><b>'+esc(l.name)+'</b><small>'+(done?'新冒險已完成 · '+'★'.repeat(stars):!unlocked?'完成前一關後開放':record.state&&!record.state.completed?'繼續上次的任務':l.id<open?'已解鎖 · 探索新的任務':l.boss?'綜合守護試煉':'準備出發')+(oldStars&&!done?' · 舊版 '+oldStars+'★ 已保留':'')+'</small></span><i>'+(unlocked?'›':'')+'</i></button>';});h+='</div></section>';});
 h+='<p class="wi24-map-note">英文任務先行，中文提示隨時可看。水晶是額外收藏；完成主線就能開啟下一關。</p></section>';gBody.innerHTML=h;
 gBody.querySelectorAll('[data-wi24-level]').forEach(function(button){button.addEventListener('click',function(){wi24Start(g,+button.dataset.wi24Level)})});
 $('#wi24Race').addEventListener('click',function(){olobby(g)});say('選一座島，完成一段冒險！','happy');
}
function wi24Start(g,index){
 var Core=window.WordIsland24Core,unlocked=Math.max(0,Math.min(20,+ob(who).stage||0));if(!Core||index<0||index>19||index>unlocked)return;
 stop();curGame='obby';roundPts=0;Learn.round0();Music.play('obby');
 var record=wi24Record(index),resume=record.state&&!record.completed,context=resume&&record.context?JSON.parse(JSON.stringify(record.context)):wi24Context(index);
 context.avatar=(window.GateV18&&window.GateV18.cfg(who)||{}).id||context.avatar||'adv';context.muted=muted;context.pictures=wi24Pictures(context);
 if(resume)roundPts=+record.runPoints||0;
 var engine=Core.make(index,context),initial=resume?engine.validate(record.state):engine.fresh(),runId=initial.runId,finished=false,claimMap=resume?JSON.parse(JSON.stringify(record.claims||{})):{};
 var frame=document.createElement('iframe'),session=wi24Token(),owner=who;
 frame.className='wi24-frame';frame.title='單字闖關島：'+Core.LEVELS[index].name;frame.allow='autoplay';frame.src='assets/v24/index.html?v=24.0.0&stage='+index+'&embedded='+encodeURIComponent(session);WI24.frame=frame;WI24.session=session;
 function validOwner(){return WI24.frame===frame&&frame.isConnected&&who===owner&&curGame==='obby'}
 function post(type,data){if(validOwner())frame.contentWindow.postMessage(Object.assign({channel:'word-island-24',session:session,type:type},data||{}),location.origin)}
 function persist(state){if(!isKid())return;Store.mut(owner,function(k){var o=k.obby||(k.obby={});if(!o.v24||typeof o.v24!=='object')o.v24={version:24,levels:{}};if(!o.v24.levels)o.v24.levels={};var old=o.v24.levels[index]||{};var savedContext={seed:context.seed,runId:state.runId,pool:context.pool,basics:context.basics,avatar:context.avatar};o.v24.levels[index]=Object.assign({},old,{context:savedContext,state:state,claims:claimMap,runPoints:roundPts,updated:Date.now()});});}
 function acceptAttempt(a,state){if(!a||!/^\d+:\d+$/.test(a.id))return;var phase=+a.id.split(':')[0],step=+a.id.split(':')[1],expected=(phase===0?engine.COLORS:phase===1?engine.ANIMALS:engine.CARGO)[step];if(a.word!==expected||typeof a.ok!=='boolean'||!engine.plan.words[expected])return;
  var row=WORDS.filter(function(w){return w[0]===expected})[0];if(!row)return;var claim=claimMap[a.id]||(claimMap[a.id]={wrong:false,credit:false});if(a.ok){if(!claim.credit){claim.credit=true;Learn.ok(row);award(1);}}else if(!claim.wrong&&!claim.credit){claim.wrong=true;Learn.bad(row);}}
 WI24.listener=function(e){if(e.source!==frame.contentWindow||e.origin!==location.origin||e.data&&e.data.channel!=='word-island-24'||!e.data||e.data.session!==session||!validOwner())return;var d=e.data;
  if(d.type==='ready'){post('boot',{stage:index,context:context,state:initial,pendingComplete:!!(resume&&initial.completed&&!record.completed),allOthersComplete:Core.LEVELS.every(function(l){return l.id===index||wi24Record(l.id).completed})});return}
  if(d.type==='progress'){var state=engine.validate(d.state);if(state.runId!==runId){runId=state.runId;claimMap={};finished=false;roundPts=0;Learn.round0();}acceptAttempt(d.attempt,state);persist(state);return}
  if(d.type==='finish'){var state=engine.validate(d.state);if(finished||!state.completed||state.runId!==runId)return;finished=true;
   var answers=Object.values(state.answers),right=answers.filter(Boolean).length,accuracy=answers.length?right/answers.length:0,stars=accuracy>=.9?3:accuracy>=.7?2:1,ms=Math.max(1,Math.round(state.elapsed));
   award(Core.LEVELS[index].boss?5:3);Learn.play('obby');sfx('win');var fb=Learn.roundBonus();if(isKid()&&fb.bonus)award(fb.bonus/10);Learn.round0();
   if(isKid()){Store.mut(owner,function(k){var o=k.obby||(k.obby={});if(!o.legacyBeforeV24)o.legacyBeforeV24={stage:o.stage||0,stars:Object.assign({},o.stars||{}),best:Object.assign({},o.best||{}),tr:Object.assign({},o.tr||{})};});Store.obbyDone(owner,index,ms,stars);persist(state);Store.mut(owner,function(k){var rec=k.obby.v24.levels[index];rec.completed=true;rec.stars=Math.max(+rec.stars||0,stars);rec.best=!rec.best?ms:Math.min(rec.best,ms);});var bonus=Store.finishGame(owner,'obby',{score:stars,total:3,roundPts:roundPts,eg:egrade});post('saved',{message:'本關已記錄 · '+stars+'★ · +'+(roundPts+bonus)+' 分'});}else post('saved',{message:'體驗完成，登入孩子帳號後可保存正式紀錄。'});return}
  if(d.type==='next'){if(!finished&&!engine.validate(d.state||{}).completed&&!(wi24Record(index).completed))return;wi24Start(g,index+1);return}
  if(d.type==='map'){wi24Map(g);return}
 };
 window.addEventListener('message',WI24.listener);document.body.appendChild(frame);
}
var wi24StopBefore=stop;stop=function(keep){if(WI24.listener)window.removeEventListener('message',WI24.listener);WI24.listener=null;if(WI24.frame){WI24.frame.remove();WI24.frame=null;WI24.session=null;try{speechSynthesis.cancel()}catch(e){}Music.play('lobby');}wi24StopBefore(keep)};
map=wi24Map;
