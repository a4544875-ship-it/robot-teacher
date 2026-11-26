/* Word Island 24: deterministic chapter plans and recoverable mission state. */
(function(root){
 'use strict';
 const WORLDS=[
  {name:'翠綠森林',en:'The Emerald Forest',cover:'forest-station-cover.webp',goal:'讓森林重新連結，幫旅人找回回家的路。'},
  {name:'琥珀沙海',en:'The Amber Oasis',cover:'desert-cover.webp',goal:'沿著綠洲水道，點亮沙海中的航標。'},
  {name:'極光雪境',en:'The Aurora Valley',cover:'snow-cover.webp',goal:'解凍雪谷機關，為旅人點起溫暖的燈。'},
  {name:'星火群島',en:'The Starlight Isles',cover:'starlight-cover.webp',goal:'修復星光航線，完成最後的守護試煉。'}
 ];
 // Three genuinely different interactions per level; original indices 0–19 are retained.
 const LEVELS=[
  ['森林車站的約定','bridge','escort','deliver','station'],
  ['風車郵局','bridge','sequence','position','windmill'],
  ['果園整理日','pump','sort','deliver','orchard'],
  ['月光圖書館','circuit','sequence','spell','library'],
  ['古樹守護試煉','circuit','sequence','spell','guardian'],
  ['綠洲補給站','pump','escort','deliver','oasis'],
  ['沙海燈塔','circuit','sequence','position','lighthouse'],
  ['駱隊的行李','bridge','sort','position','caravan'],
  ['星盤工坊','circuit','memory','spell','observatory'],
  ['琥珀神殿','pump','memory','spell','temple'],
  ['雪谷暖暖站','thaw','escort','deliver','station'],
  ['極光信號塔','circuit','memory','position','lighthouse'],
  ['冰湖物資所','thaw','sort','position','workshop'],
  ['雪夜鐘樓','circuit','sequence','spell','clocktower'],
  ['極光守護試煉','thaw','memory','spell','guardian'],
  ['星火港口','bridge','escort','position','harbor'],
  ['流星修理所','circuit','sort','spell','workshop'],
  ['星際航標','circuit','memory','position','observatory'],
  ['失落的星圖','bridge','memory','spell','library'],
  ['星光守護者','circuit','memory','spell','guardian']
 ].map((a,id)=>({id,name:a[0],supply:a[1],middle:a[2],final:a[3],landmark:a[4],world:Math.floor(id/5),boss:id%5===4}));
 const BASE=[['blue','🔵','藍色',1],['red','🔴','紅色',1],['yellow','🟡','黃色',2],['green','🟢','綠色',2],['cat','🐱','貓',1],['dog','🐶','狗',1],['rabbit','🐰','兔子',2],['book','📖','書',1],['ball','⚽','球',1],['apple','🍎','蘋果',2],['cup','☕','杯子',1],['bag','🎒','書包',1],['pig','🐷','豬',1],['fish','🐟','魚',1],['bird','🐦','鳥',1],['egg','🥚','蛋',1],['cake','🍰','蛋糕',1],['hat','🧢','帽子',1],['car','🚗','汽車',1],['milk','🥛','牛奶',1]];
 const CATEGORIES={animals:['cat','dog','rabbit','pig','fish','bird','cow','duck','bee','tiger','frog','horse','sheep','lion','elephant','monkey','bear','panda','giraffe','zebra'],food:['apple','banana','grape','egg','cake','milk','bread','orange','rice','noodle','juice','water','pizza','burger','sandwich','fish','chicken'],school:['book','bag','pen','pencil','eraser','ruler','paper','notebook','desk','chair','school','teacher','student'],travel:['car','bike','boat','train','bus','plane','ship','taxi','bicycle','motorcycle']};
 const CAT_ZH={animals:'動物',food:'食物',school:'學習用品',travel:'交通工具'};
 function category(w){for(const k of Object.keys(CATEGORIES))if(CATEGORIES[k].includes(w))return k;return 'school';}
 function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
 function cleanWords(a){const seen=new Set();return (Array.isArray(a)?a:[]).filter(w=>Array.isArray(w)&&/^[a-z][a-z -]{0,28}$/i.test(w[0])&&typeof w[2]==='string'&&!seen.has(w[0])&&seen.add(w[0])).map(w=>[w[0].toLowerCase(),String(w[1]||'✦'),w[2],+w[3]||1]);}
 function createPlan(index,context={}){
  const level=LEVELS[Math.max(0,Math.min(19,Math.floor(index)||0))],R=rng((+context.seed||93419)+level.id*311),pool=cleanWords(context.pool),basics=cleanWords(context.basics),dictionary=new Map([...basics,...pool].map(w=>[w[0],w]));
  if(!dictionary.size)BASE.forEach(w=>dictionary.set(w[0],w));
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function pick(a,n){const q=shuffle(a);if(!q.length)return [];return Array.from({length:n},(_,i)=>q[i%q.length]);}
  const colors=['blue','yellow','red','green'].filter(w=>dictionary.has(w));
  if(!colors.length){for(const w of BASE.filter(w=>['blue','red'].includes(w[0])))dictionary.set(w[0],w);colors.push('blue','red');}
  const supplies=level.id===0?['blue','yellow','red'].map((w,i)=>dictionary.has(w)?w:colors[i%colors.length]):pick(colors,level.world>=2?4:3);
  const animals=['cat','dog','rabbit','pig','bird','cow','duck','bear','frog'].filter(w=>dictionary.has(w));
  if(level.middle==='escort'&&animals.length<2){BASE.filter(w=>['cat','dog'].includes(w[0])).forEach(w=>{dictionary.set(w[0],w);if(!animals.includes(w[0]))animals.push(w[0]);});}
  let current=pool.length?pool.map(w=>w[0]):[...dictionary.keys()].filter(w=>!colors.includes(w));
  if(!current.length)current=[...dictionary.keys()];
  let sortWords=[...dictionary.keys()].filter(w=>Object.values(CATEGORIES).some(a=>a.includes(w)));if(!sortWords.length){for(const w of BASE.filter(w=>['cat','book'].includes(w[0])))dictionary.set(w[0],w);sortWords=['cat','book'];}
  // 'fish' is placed with animals here; sorting never asks a word with two accepted groups.
  let unambiguous=sortWords.filter(w=>!['fish','chicken'].includes(w));if(!unambiguous.length){BASE.filter(w=>['cat','book'].includes(w[0])).forEach(w=>dictionary.set(w[0],w));unambiguous=['cat','book'];}const groups={};unambiguous.forEach(w=>(groups[category(w)]||(groups[category(w)]=[])).push(w));const groupKeys=shuffle(Object.keys(groups));const sortTargets=Array.from({length:3},(_,i)=>pick(groups[groupKeys[i%groupKeys.length]]||unambiguous,1)[0]);
  const middle=level.middle==='escort'?pick(animals,Math.min(animals.length,level.world>=2?3:2)):level.middle==='sort'?sortTargets:pick(current,level.world>=2?4:3);
  const spellable=current.filter(w=>/^[a-z]{2,12}$/.test(w));
  let final=pick(level.final==='spell'&&spellable.length?spellable:current,level.final==='spell'?2:3);
  if(level.final==='spell'&&!spellable.length)final=pick([...dictionary.keys()].filter(w=>/^[a-z]{2,12}$/.test(w)),2);
  if(!final.length){dictionary.set('book',BASE.find(w=>w[0]==='book'));final=['book','book'];}
  const roles=level.supply==='bridge'?{name:'plank',verb:'repair',section:'修復橋梁'}:level.supply==='pump'?{name:'water jar',verb:'fill',section:'接通水道'}:level.supply==='thaw'?{name:'crystal',verb:'warm',section:'解凍步道'}:{name:'crystal',verb:'power',section:'啟動能源橋'};
  const all=[...new Set([...current,...animals,...final,...colors])];
  const options1=[...new Set(middle)];shuffle((level.middle==='escort'?animals:all).filter(w=>!options1.includes(w))).slice(0,Math.max(0,4-options1.length)).forEach(w=>options1.push(w));
  const options2=[...new Set(final)];shuffle(current.filter(w=>!options2.includes(w))).slice(0,Math.max(0,5-options2.length)).forEach(w=>options2.push(w));
  const sides=Array.from({length:final.length},(_,i)=>(i+level.id)%2?'right':'left');
  return {level,world:WORLDS[level.world],supplies,middle,final,options1:shuffle(options1).slice(0,6),options2:shuffle(options2).slice(0,6),roles,sides,words:Object.fromEntries(dictionary),seed:+context.seed||93419};
 }
 function make(index,context={}){
  const plan=createPlan(index,context),KEY='rt_word_island_v24',COLORS=plan.supplies,ANIMALS=plan.middle,CARGO=plan.final,WORDS=Object.fromEntries(Object.entries(plan.words).map(([k,w])=>[k,[k,w[2]]])),obstacles=[];
  function fresh(){return {version:24,level:plan.level.id,phase:0,boards:0,animals:[],cargo:[],carry:null,crystals:[],hints:0,mistakes:0,runId:context.runId||'local-'+plan.seed,avatar:context.avatar||'adv',completed:false,spell:null,answers:{},elapsed:0};}
  function validate(raw){if(!raw||raw.version!==24||raw.level!==plan.level.id)return fresh();const s=fresh(),n=(v,max)=>Math.min(max,Math.max(0,Math.floor(+v||0)));
   if(typeof raw.runId==='string'&&/^[a-zA-Z0-9-]{1,80}$/.test(raw.runId))s.runId=raw.runId;s.boards=n(raw.boards,COLORS.length);function prefix(values,expected){let i=0;while(Array.isArray(values)&&i<expected.length&&values[i]===expected[i])i++;return expected.slice(0,i);}s.animals=prefix(raw.animals,ANIMALS);s.cargo=prefix(raw.cargo,CARGO);
   if(s.boards<COLORS.length){s.animals=[];s.cargo=[];}if(s.animals.length<ANIMALS.length)s.cargo=[];
   s.phase=s.boards<COLORS.length?0:s.animals.length<ANIMALS.length?1:raw.phase===1?1:2;if(s.phase===1)s.cargo=[];if(s.cargo.length===CARGO.length)s.phase=3;
   s.completed=s.phase===3&&raw.completed===true;s.crystals=[0,1,2].filter(x=>Array.isArray(raw.crystals)&&raw.crystals.includes(x));s.hints=n(raw.hints,10000);s.mistakes=n(raw.mistakes,10000);s.elapsed=Math.max(0,Math.min(86400000,+raw.elapsed||0));s.avatar=/^[a-z]+$/.test(raw.avatar||'')?raw.avatar:s.avatar;
   const wanted=target(s);if(raw.carry&&raw.carry.word===wanted&&((s.phase===0&&raw.carry.kind==='plank')||(s.phase===1&&plan.level.middle==='sort'&&raw.carry.kind==='sort')||(s.phase===2&&raw.carry.kind==='cargo')))s.carry={word:wanted,kind:raw.carry.kind};
   if(s.phase===2&&plan.level.final==='spell'&&raw.spell&&raw.spell.word===wanted){s.spell={word:wanted,index:n(raw.spell.index,wanted.length-1)};s.carry=null;}
   for(const [id,v]of Object.entries(raw.answers||{}).slice(0,100)){if(/^\d+:\d+$/.test(id)&&typeof v==='boolean')s.answers[id]=v;}return s;
  }
  function target(s){return s.phase===0?COLORS[s.boards]:s.phase===1?ANIMALS[s.animals.length]:s.phase===2?CARGO[s.cargo.length]:null;}
  function questionId(s){return s.phase+':'+(s.phase===0?s.boards:s.phase===1?s.animals.length:s.cargo.length);}
  function title(w){return WORDS[w]?WORDS[w][1]:w;}
  function mission(s){const w=target(s),zh=title(w),level=plan.level;
   if(s.completed)return {section:'本關已完成',title:'前往下一關，或留下來探索水晶。',en:level.id===19?'The final beacon is shining!':'Mission complete. A new journey awaits!',progress:1};
   if(s.phase===0)return {section:'01 · '+plan.roles.section,title:s.carry?'把'+zh+plan.roles.name+'帶到橋邊。':'找到'+zh+plan.roles.name+'。',en:s.carry?'Take the '+w+' '+plan.roles.name+' to the bridge.':'Find the '+w+' '+plan.roles.name+'.',progress:s.boards/COLORS.length};
   if(s.phase===1){const mode=level.middle;if(!w)return {section:'02 · 前往下一座島',title:mode==='escort'?'帶著乘客，前往前方的目的地。':'機關完成了，走過橋前往下一座島。',en:mode==='escort'?'Take your friends to the next island.':'Cross the bridge to the next island.',progress:1};
    if(mode==='escort')return {section:'02 · 接回小旅人',title:'找到'+zh+'，邀請牠一起走。',en:'Find the '+w+'.',progress:s.animals.length/ANIMALS.length};
    if(mode==='sort')return {section:'02 · 分類工作站',title:'把'+zh+'送到「'+CAT_ZH[category(w)]+'」分類台。',en:s.carry?'Sort “'+w+'” into “'+category(w)+'”.':'Pick up the '+w+'.',progress:s.animals.length/ANIMALS.length};
    return {section:'02 · '+(mode==='memory'?'記憶機關':'順序機關'),title:'依照順序觸碰機關：'+ANIMALS.map(title).join(' → '),en:(mode==='memory'?'Remember the order: ':'Touch in order: ')+ANIMALS.join(' → '),progress:s.animals.length/ANIMALS.length,memory:mode==='memory'};
   }
   if(s.phase===2){if(s.spell)return {section:'03 · 拼字封印',title:'拼出剛才裝上貨物的英文；需要時可按喇叭再聽一次。',en:'Spell the item you just delivered.',progress:s.cargo.length/CARGO.length,spell:s.spell};
    const place=level.final==='position'?plan.sides[s.cargo.length]+' platform':'delivery point';return {section:'03 · '+(level.final==='spell'?'裝貨與拼字':level.final==='position'?'方位送貨':'最後的補給'),title:s.carry?'把'+zh+'帶到'+(place==='left platform'?'左邊的平台':place==='right platform'?'右邊的平台':'交貨點')+'。':'找到'+zh+'。',en:s.carry?'Take the '+w+' to the '+place+'.':'Find the parcel marked “'+w+'”.',progress:s.cargo.length/CARGO.length};}
   return {section:'03 · 啟動終點機關',title:level.landmark==='station'?'按下發車鈴，完成這段旅程！':'啟動金色終點機關，恢復這座島的光！',en:level.landmark==='station'?'Ring the bell. Let’s go!':'Activate the beacon. Let it shine!',progress:1};
  }
  function act(raw,e){const s=validate(raw),w=target(s),id=questionId(s),attempt=(ok)=>{if(!(id in s.answers))s.answers[id]=ok;return {id,word:w,ok};};
   const yes=(message,effect,answer)=>({state:s,ok:true,message,effect,attempt:answer}),no=(message,knowledge=true)=>{if(knowledge)s.mistakes++;return {state:s,ok:false,message,attempt:knowledge&&w?attempt(false):null};};
   if(e.type==='crystal'){if(![0,1,2].includes(e.id)||s.crystals.includes(e.id))return no('這顆水晶已經收好了。',false);s.crystals.push(e.id);return yes(s.crystals.length===3?'水晶收藏完成！主線完成後可前往下一關。':'水晶是額外收藏，繼續完成上方任務！','crystal');}
   if(e.type==='hint'){s.hints++;return yes('跟著金色光點；提示不扣分。','hint');}
   if(s.completed)return no('本關已完成，可以前往下一關。',false);
   if(e.type==='pickup'){
    if(s.carry||s.spell)return no('先完成手上的任務。',false);
    const valid=s.phase===0&&e.kind==='plank'||s.phase===1&&plan.level.middle==='sort'&&e.kind==='sort'||s.phase===2&&e.kind==='cargo';
    if(!valid)return no('先完成目前的任務。',false);if(e.word!==w)return no('Try again. Find '+w+'.');s.carry={kind:e.kind,word:w};return yes('拿到了！送到金色標記處。','pickup',e.kind==='sort'||s.phase===2&&['spell','position'].includes(plan.level.final)?null:attempt(true));
   }
   if(e.type==='repair'&&s.phase===0&&s.carry){s.boards++;s.carry=null;if(s.boards===COLORS.length)s.phase=1;return yes(s.phase===1?'第一座橋已啟動！前往下一座島。':'機關完成一段，再找下一件材料。',s.phase===1?'bridge':'repair');}
   if(e.type==='invite'&&s.phase===1&&plan.level.middle!=='sort'&&w){if(e.word!==w)return no('Try again. Next: '+w+'.');const a=attempt(true);s.animals.push(w);return yes(s.animals.length===ANIMALS.length?'任務完成，第二座橋已啟動！':plan.level.middle==='escort'?w+' 跟上了！繼續找下一位旅人。':'順序正確！再啟動下一個機關。','invite',a);}
   if(e.type==='classify'&&s.phase===1&&plan.level.middle==='sort'&&s.carry){if(e.category!==category(w))return no('Try the '+category(w)+' basket.');const a=attempt(true);s.animals.push(w);s.carry=null;return yes(s.animals.length===ANIMALS.length?'分類完成，第二座橋已啟動！':'分類正確！再看看下一件物品。','invite',a);}
   if(e.type==='board'&&s.phase===1&&s.animals.length===ANIMALS.length){s.phase=2;return yes('抵達目的地！完成最後一段任務。','board');}
   if(e.type==='load'&&s.phase===2&&s.carry){if(plan.level.final==='position'&&e.side!==plan.sides[s.cargo.length])return no('Try the '+plan.sides[s.cargo.length]+' platform.');s.carry=null;if(plan.level.final==='spell'){s.spell={word:w,index:0};return yes('貨物送達！拼出剛才的單字，完成封印。','spell');}const a=plan.level.final==='position'?attempt(true):null;s.cargo.push(w);if(s.cargo.length===CARGO.length)s.phase=3;return yes(s.phase===3?'最後任務完成！啟動終點機關。':'貨物送達！繼續下一件。','load',a);}
   if(e.type==='letter'&&s.spell){if(e.letter!==s.spell.word[s.spell.index])return no('再聽一次，找出下一個字母。');s.spell.index++;if(s.spell.index===w.length){const a=attempt(true);s.cargo.push(w);s.spell=null;if(s.cargo.length===CARGO.length)s.phase=3;return yes('拼字完成！封印亮起來了。','load',a);}return yes('字母正確！','letter');}
   if(e.type==='depart'&&s.phase===3){s.completed=true;return yes(plan.level.id===19?'最終守護試煉完成！':'本關完成！下一段冒險已開放。','depart');}
   return no('依照上方英文任務，先把需要的物品準備好。',false);
  }
  function setObstacles(list){obstacles.splice(0,obstacles.length,...list.filter(o=>Number.isFinite(o.x)&&Number.isFinite(o.z)&&o.r>0));}
  function walkable(x,z,s){if(obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<o.r))return false;if([[0,10,6.6,6],[0,-7,7.3,7],[0,-25,7.8,7]].some(([cx,cz,rx,rz])=>((x-cx)/rx)**2+((z-cz)/rz)**2<.91))return true;if(Math.abs(x)<1.30&&z<=4.6&&z>=-.6&&s.boards===COLORS.length)return true;if(Math.abs(x)<1.30&&z<=-13.2&&z>=-18.7&&s.animals.length===ANIMALS.length)return true;return false;}
  function route(start,end,s){const q=.65,key=(x,z)=>x+','+z,snap=v=>Math.round(v/q),sx=snap(start.x),sz=snap(start.z),ex=snap(end.x),ez=snap(end.z);if(!walkable(ex*q,ez*q,s))return [];const open=[{x:sx,z:sz,g:0,h:Math.hypot(sx-ex,sz-ez)}],best=new Map([[key(sx,sz),0]]),prev=new Map();let goal=false,limit=0;while(open.length&&limit++<5000){open.sort((a,b)=>a.g+a.h-b.g-b.h);const n=open.shift(),k=key(n.x,n.z);if(n.x===ex&&n.z===ez){goal=true;break;}for(const [dx,dz]of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const x=n.x+dx,z=n.z+dz,nk=key(x,z),g=n.g+Math.hypot(dx,dz);const ax=n.x===sx&&n.z===sz?start.x:n.x*q,az=n.x===sx&&n.z===sz?start.z:n.z*q;if(![.2,.4,.6,.8,1].every(t=>walkable(ax+(x*q-ax)*t,az+(z*q-az)*t,s))||dx&&dz&&(!walkable((n.x+dx)*q,n.z*q,s)||!walkable(n.x*q,(n.z+dz)*q,s)))continue;if(g>=(best.get(nk)??Infinity))continue;best.set(nk,g);prev.set(nk,k);open.push({x,z,g,h:Math.hypot(x-ex,z-ez)});}}if(!goal)return [];let k=key(ex,ez),out=[];while(k!==key(sx,sz)){const [x,z]=k.split(',').map(Number);out.unshift({x:x*q,z:z*q});k=prev.get(k);if(!k)return [];}return out;}
  function letterChoices(s){if(!s.spell)return [];const correct=s.spell.word[s.spell.index],R=rng(plan.seed+s.spell.index*31+s.cargo.length*719+plan.level.id),choices=[correct];for(const ch of s.spell.word+'aeiourstlnbcdfghjkmpvwxyz')if(!choices.includes(ch)&&choices.length<4)choices.push(ch);for(let i=choices.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}return choices;}
  return {KEY,plan,COLORS,ANIMALS,CARGO,WORDS,fresh,validate,target,mission,act,walkable,route,setObstacles,letterChoices,category,CAT_ZH,questionId};
 }
 const api={WORLDS,LEVELS,BASE,make,createPlan};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.WordIsland24Core=api;
})(typeof window!=='undefined'?window:globalThis);
