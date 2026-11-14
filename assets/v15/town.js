/* 家鄉小鎮：社會蓋建築、自然鋪路接電接水，一起蓋出自己的等角小鎮
   資料存在 k.tn = {o:['key,x,y,翻轉',...], r:[道路格], w:[河水格], seen:{已看過的解鎖}, g:1(送過見面禮)}
   家鄉幣跟 3D 冒險共用 k.sa.c */
(function(global){'use strict';
global.TownFactory=function(C){
/* 範例試玩：全部先打開，上線前改回 false */
var DEMO=true;
var SOC=C.SOC,N=12,TW=96,TH=48,PT=230,PB=90,SW=N*TW+40,SH=N*TH+PT+PB,OX=SW/2,OY=PT;
function img(k){return SOC.img('tn_'+k)}
var AR={"cloud_lock":0.645,"town_base":0.607,"home_1":0.965,"home_2":1.177,"home_3":1.197,"school_1":0.953,"school_2":0.762,"school_3":0.819,"shop_1":1.093,"shop_2":1.162,"shop_3":1.017,"library":1.036,"center":0.976,"radio":1.212,"paifang":0.825,"rd_dirt":0.75,"rd_gravel":0.781,"rd_stone":0.796,"rd_asphalt":0.772,"tile_water":0.745,"lamp_1":1.761,"lamp_2":2.909,"lamp_3":1.631,"tlight":2.22,"train_f":0.828,"train_b":0.911,"bridge":0.652,"wtower":1.422,"fountain":0.863,"wind_body":1.523,"wind_blade":1.039,"wstation":0.764,"tree_a":1.097,"tree_b":1.473,"flowerbed":0.794,"park":0.715,"ranch":0.768,"bfgarden":0.874,"clocktower":1.323,"observatory":1.0,"ic_coin":1.016,"ic_road":1.123,"ic_power":1.351,"ic_water":1.571,"ic_prosper":1.388,"ic_up":1.46,"ic_build":1.419,"ic_store":1.192,"pp_boy_f":1.925,"pp_boy_b":1.958,"pp_girl_f":1.389,"pp_girl_b":1.43,"pp_grandpa_f":1.763,"pp_grandpa_b":1.74,"pp_mom_f":1.661,"pp_mom_b":1.945,"car_f":0.861,"car_b":0.925,"bus_f":0.893,"bus_b":1.029,"scooter_f":1.575,"scooter_b":1.959,"bike_f":1.462,"bike_b":1.844,"stall":1.051,"bench":0.849,"mailbox":0.876,"recycle":0.744,"flags":0.725,"planter":0.967,"planter2":1.123,"l2_front":1.184,"l2_back":1.279,"l2_side":1.058,"l2_run":1.004,"plinth":0.64,"viewdeck":1.165,"sanheyuan":0.801,"temple_1":1.061,"oldstreet":0.807,"temple_2":0.966,"factory":0.86,"stage":0.713,"farm":0.716,"port":0.573,"tower":1.538,"st_bus":0.945,"st_train":0.777,"st_hsr":0.714,"museum":0.806,"lion_statue":1.015,"town_entry":0.733};
function esc(s){return C.esc(String(s))}
function cx(x,y){return OX+(x-y)*TW/2}function cy(x,y){return OY+(x+y)*TH/2}

/* ---------- 解鎖條件 ---------- */
var FAM={home:['3a1'],school:['3a3','3a4','3ax'],shop:['3b2','3b3'],library:['3a2'],center:['3b1'],radio:['3bx'],paifang:['3b4'],
  view:['4a1'],sanhe:['4a2'],temple:['4a3'],stage:['4a4'],ind:['4b1'],tower:['4b2'],trans:['4b3'],museum:['4b4']};
var UN={'3a1':'我的家庭','3a2':'學習與成長','3a3':'班級與我','3a4':'學校與我','3ax':'讓班級更美好','3b1':'我們居住的地方','3b2':'消費與生活','3b3':'消費與選擇','3b4':'家鄉的地名與故事','3bx':'家鄉特派員',
  '4a1':'家鄉的自然環境','4a2':'傳統住屋與器物','4a3':'傳統信仰與老街','4a4':'作息、節慶與節日','4b1':'家鄉的產業','4b2':'家鄉的人口','4b3':'家鄉的交通','4b4':'家鄉風情畫'};
var STN={mag:'磁鐵礦山',circ:'電力小屋',water:'冰與水的瀑布湖',wind:'風車草原',weather:'氣象觀測塔',plant:'植物溫室',animal:'動物牧場',insect:'昆蟲花叢',sound:'聲光音樂舞台',moon:'月亮觀星台'};
var SLV=['小小觀察員','實驗小助手','發現小達人','小小科學家','自然探險家','自然小博士'];
var ZT={'3a3':['sc_award','班級榮譽獎盃','班級廣場'],'3a1':['fam_three','全家福相框','溫馨家園'],'3a2':['l_lib','智慧之書','學習森林'],'3a4':['sc_tug','友誼拔河繩','校園大操場'],
  '3b1':['pf_post','郵差的信','社區街道'],'3b2':['i_piggy','金撲滿','熱鬧市場'],'3b3':['i_ecobag','環保購物袋','超市大樓'],'3b4':['nm_stone','古老地名碑','古地名山谷'],
  '4a1':['w_dam','水庫之鑰','山河平原'],'4a2':['a_lamp','古早煤油燈','三合院村'],'4a3':['t_jiao','神明筊杯','廟口老街'],'4a4':['i_zongzi','金粽子','節慶廣場'],
  '4b1':['n_rice','金稻穗','產業農場'],'4b2':['pf_center','社區之心','人口城鎮'],'4b3':['v_hsr','高鐵模型','交通車站'],'4b4':['hm_sun','太陽餅金盒','家鄉風景']};

/* ---------- 物件目錄 ----------
   c：soc 社會建築／sci 自然設施／deco 用家鄉幣買／mark 地標
   fp：佔幾格（1 或 2）；s：圖寬是格子寬的幾倍；oy：圖往下沉多少（格子寬的比例）；sm：小物件（路燈、樹） */
var IT={},ORD=[];
function D(k,o){o.k=k;o.im=o.im||k;o.fp=o.fp||1;o.s=o.s||1;o.oy=o.oy==null?.1:o.oy;o.mx=o.mx||1;IT[k]=o;ORD.push(k)}
D('home_1',{n:'小平房',c:'soc',f:'home',lv:1,mx:4,up:'home_2',d:'一家人住在一起，互相照顧。'});
D('home_2',{n:'透天厝',c:'soc',f:'home',lv:2,mx:4,up:'home_3',s:.96,d:'家裡人變多了，蓋成兩層樓。'});
D('home_3',{n:'公寓大樓',c:'soc',f:'home',lv:3,mx:3,s:1.02,d:'很多家庭住在同一棟大樓裡。'});
D('school_1',{n:'小校舍',c:'soc',f:'school',lv:1,up:'school_2',d:'在學校和同學一起學習。'});
D('school_2',{n:'校舍和球場',c:'soc',f:'school',lv:2,fp:2,up:'school_3',s:1.04,d:'學校變大了，還有球場可以運動。'});
D('school_3',{n:'大校園',c:'soc',f:'school',lv:3,fp:2,s:1.12,oy:.08,d:'有跑道、操場和升旗台的大校園。'});
D('shop_1',{n:'雜貨店',c:'soc',f:'shop',lv:1,mx:2,up:'shop_2',s:.9,d:'買東西前先想想：需要還是想要？'});
D('shop_2',{n:'便利商店',c:'soc',f:'shop',lv:2,mx:2,up:'shop_3',s:.88,d:'24 小時開著，生活更方便。'});
D('shop_3',{n:'百貨公司',c:'soc',f:'shop',lv:3,s:1.12,d:'東西很多，更要聰明消費。'});
D('library',{n:'圖書館',c:'soc',f:'library',lv:1,d:'多元學習的好地方。'});
D('center',{n:'社區活動中心',c:'soc',f:'center',lv:1,s:1.04,d:'居民一起辦活動、開會的地方。'});
D('radio',{n:'家鄉廣播站',c:'soc',f:'radio',lv:1,d:'家鄉特派員把家鄉的故事說給大家聽。'});
D('paifang',{n:'家鄉牌坊',c:'soc',f:'paifang',lv:1,fp:2,s:.95,oy:.06,d:'寫著家鄉地名的大門。'});
D('viewdeck',{n:'觀景台',c:'soc',f:'view',lv:1,s:1.15,d:'看看家鄉的山、河和平原。'});
D('sanheyuan',{n:'三合院',c:'soc',f:'sanhe',lv:1,fp:2,s:1.02,d:'以前的人住的傳統房子。'});
D('temple_1',{n:'土地公廟',c:'soc',f:'temple',lv:1,s:1.05,d:'保佑家鄉平安的小廟。'});
D('oldstreet',{n:'老街店屋',c:'soc',f:'temple',lv:2,fp:2,s:.98,d:'紅磚拱廊的老街，很有古早味。'});
D('temple_2',{n:'媽祖廟',c:'soc',f:'temple',lv:3,fp:2,s:1,d:'熱鬧的廟口是大家聚會的地方。'});
D('stage',{n:'節慶舞台',c:'soc',f:'stage',lv:1,fp:2,s:1,d:'過節的時候在這裡表演。'});
D('farm',{n:'稻田',c:'soc',f:'ind',lv:1,fp:2,s:1,d:'農業：種出我們吃的米。'});
D('factory',{n:'工廠',c:'soc',f:'ind',lv:2,fp:2,s:1,d:'工業：把材料做成產品。'});
D('port',{n:'漁港',c:'soc',f:'ind',lv:3,fp:2,s:1.2,d:'漁業：漁船出海捕魚。'});
D('tower',{n:'高樓大廈',c:'soc',f:'tower',lv:1,s:.92,d:'人口變多，房子越蓋越高。'});
D('st_bus',{n:'公車站',c:'soc',f:'trans',lv:1,s:1.05,d:'坐公車去上學、上班。'});
D('st_train',{n:'火車站',c:'soc',f:'trans',lv:2,fp:2,s:1,d:'火車把人和貨物送到遠方。'});
D('st_hsr',{n:'高鐵站',c:'soc',f:'trans',lv:3,fp:2,s:1.02,d:'高鐵讓城市和城市更近。'});
D('museum',{n:'美術館',c:'soc',f:'museum',lv:1,fp:2,s:1,d:'展示家鄉的美麗風景和特產。'});
/* 自然 */
D('lamp_1',{n:'油燈柱',c:'sci',st:'circ',mx:8,sm:1,s:.5,oy:.04,lamp:1,up:'lamp_2',d:'晚上點亮，旁邊的房子就有電。'});
D('lamp_2',{n:'燈泡路燈',c:'sci',st:'circ',sl:2,mx:8,sm:1,s:.34,oy:.04,lamp:1,up:'lamp_3',d:'電流通過燈泡就會發光。'});
D('lamp_3',{n:'太陽能路燈',c:'sci',st:'circ',sl:4,mx:8,sm:1,s:.55,oy:.04,lamp:1,d:'白天收集陽光，晚上自己亮。'});
D('tlight',{n:'紅綠燈',c:'sci',sl:4,mx:4,sm:1,s:.4,oy:.04,d:'紅燈停、綠燈行，交通更安全。'});
D('train',{n:'磁鐵小火車',c:'sci',st:'mag',im:'train_f',fp:2,s:.95,oy:.16,train:1,d:'磁鐵的力量讓小火車跑起來。'});
D('bridge',{n:'小橋',c:'sci',st:'water',mx:4,s:1.25,oy:.12,onw:1,d:'要蓋在河水上。'});
D('wtower',{n:'水塔',c:'sci',st:'water',mx:3,s:.8,oy:.04,water:1,d:'4 格內的房子都有水用。'});
D('fountain',{n:'噴水池',c:'sci',st:'water',mx:2,s:1.02,oy:.1,d:'水往高處噴，再落下來。'});
D('windmill',{n:'風車',c:'sci',st:'wind',im:'wind_body',mx:3,s:.72,oy:.04,mill:1,d:'風吹動葉片轉呀轉。'});
D('wstation',{n:'氣象站',c:'sci',st:'weather',s:1.15,oy:.1,d:'量風向、雨量和溫度。'});
D('tree_a',{n:'行道樹',c:'sci',st:'plant',mx:12,sm:1,s:.78,oy:.06,d:'樹可以遮陽、讓空氣變好。'});
D('tree_b',{n:'松樹',c:'sci',st:'plant',mx:12,sm:1,s:.62,oy:.06,d:'一年四季都綠綠的。'});
D('flowerbed',{n:'花圃',c:'sci',st:'plant',mx:6,s:.95,oy:.1,d:'花需要陽光、空氣和水。'});
D('park',{n:'小公園',c:'sci',st:'plant',sl:2,mx:2,fp:2,s:1,oy:.1,d:'有樹、有花、有長椅的公園。'});
D('ranch',{n:'小牧場',c:'sci',st:'animal',fp:2,s:1,oy:.1,d:'牛和羊住在這裡。'});
D('bfgarden',{n:'蝴蝶園',c:'sci',st:'insect',s:1.08,oy:.1,d:'蝴蝶從卵、幼蟲、蛹變成蝴蝶。'});
D('clocktower',{n:'鐘樓',c:'sci',st:'sound',s:.9,oy:.08,d:'鐘聲是物體振動發出來的。'});
D('observatory',{n:'天文台',c:'sci',st:'moon',s:1.05,oy:.08,d:'用望遠鏡看月亮的圓缺。'});
/* 家鄉幣買的居民和小物 */
D('pp_boy',{n:'小男孩',c:'deco',p:15,mx:2,walk:1,im:'pp_boy_f',d:'會在路上散步。'});
D('pp_girl',{n:'小女孩',c:'deco',p:15,mx:2,walk:1,im:'pp_girl_f',d:'會在路上散步。'});
D('pp_grandpa',{n:'阿公',c:'deco',p:15,mx:2,walk:1,im:'pp_grandpa_f',d:'會在路上散步。'});
D('pp_mom',{n:'媽媽',c:'deco',p:15,mx:2,walk:1,im:'pp_mom_f',d:'會在路上散步。'});
D('bike',{n:'腳踏車',c:'deco',p:20,mx:2,walk:2,im:'bike_f',d:'會在路上騎來騎去。'});
D('scooter',{n:'機車',c:'deco',p:25,mx:2,walk:2,im:'scooter_f',d:'會在路上騎來騎去。'});
D('car',{n:'汽車',c:'deco',p:30,mx:2,walk:3,im:'car_f',d:'會在路上開來開去。'});
D('bus',{n:'公車',c:'deco',p:40,mx:1,walk:3,im:'bus_f',d:'會在路上開來開去。'});
D('stall',{n:'攤販車',c:'deco',p:15,mx:2,sm:1,s:.7,oy:.06,d:'賣新鮮的水果。'});
D('bench',{n:'長椅',c:'deco',p:8,mx:4,sm:1,s:.62,oy:.08,d:'走累了坐一下。'});
D('mailbox',{n:'郵筒',c:'deco',p:10,mx:2,sm:1,s:.55,oy:.06,d:'紅色寄快信，綠色寄平信。'});
D('recycle',{n:'回收桶',c:'deco',p:10,mx:3,sm:1,s:.62,oy:.06,d:'垃圾分類，資源回收。'});
D('flags',{n:'彩旗',c:'deco',p:8,mx:4,sm:1,s:.6,oy:.06,d:'讓小鎮看起來很熱鬧。'});
D('planter',{n:'花箱',c:'deco',p:8,mx:6,sm:1,s:.55,oy:.06,d:'種滿小花的木箱。'});
D('planter2',{n:'大盆栽',c:'deco',p:8,mx:6,sm:1,s:.5,oy:.06,d:'圓圓的石頭花盆。'});
/* 地標 */
D('lion_statue',{n:'守護石獅像',c:'mark',fp:2,s:1.02,oy:.12,d:'守護家鄉的小石獅，小鎮的中心。'});
Object.keys(ZT).forEach(function(z){D('lm_'+z,{n:ZT[z][1],c:'mark',zone:z,im:'plinth',s:.92,oy:.08,d:'3D 冒險「'+ZT[z][2]+'」拿回來的寶物。'})});
var CATS=[['soc','社會建築'],['sci','自然設施'],['deco','居民小物'],['mark','地標']];

/* ---------- 讀取進度 ---------- */
function kid(){return C.Store.kid(C.who())||null}
function famLv(id,f){var us=FAM[f],st=us.map(function(u){return SOC.ustar(id,u)||0});if(us.length===1)return st[0];
  var cl=st.filter(function(v){return v>=1}).length;if(cl>=us.length&&st.every(function(v){return v>=3}))cl++;return Math.min(3,cl)}
function famNeed(f,lv){var us=FAM[f],nm=us.map(function(u){return '「'+UN[u]+'」'}).join('');
  if(us.length===1)return '社會島'+nm+'每一課都拿到 '+lv+' 顆星';
  if(lv<=us.length)return '社會島'+nm+'其中 '+lv+' 站，每一課都拿到 1 顆星';
  return '社會島'+nm+'每一課都拿到 3 顆星'}
function sciLv(id){try{return C.sciLv(id)|0}catch(e){return 0}}
function sciSt(id,k){try{return !!C.sciStamp(id,k)}catch(e){return false}}
function unl(id,it){if(DEMO){var r=unl0(id,it);return {ok:true,why:r.why,demo:!r.ok}}return unl0(id,it)}
function unl0(id,it){
  if(it.c==='soc'){var l=famLv(id,it.f);return {ok:l>=it.lv,why:famNeed(it.f,it.lv)}}
  if(it.c==='sci'){var ok=true,w=[];if(it.st){if(!sciSt(id,it.st))ok=false;w.push('自然島「'+STN[it.st]+'」3 關都過關')}if(it.sl){if(sciLv(id)<it.sl)ok=false;w.push('自然等級升到 Lv.'+(it.sl+1)+'「'+SLV[it.sl]+'」')}return {ok:ok,why:w.join('，而且')}}
  if(it.c==='mark'){if(!it.zone)return {ok:true,why:''};var t=((kid()||{}).sa||{}).t||{};return {ok:!!t[it.zone],why:'3D 冒險「'+ZT[it.zone][2]+'」守護成功'}}
  return {ok:true,why:''}}
function tn(){var k=kid()||{},t=k.tn&&typeof k.tn==='object'?k.tn:{};
  return {o:(Array.isArray(t.o)?t.o:[]).map(function(s){var a=String(s).split(',');return {k:a[0],x:+a[1]|0,y:+a[2]|0,f:+a[3]|0}}).filter(function(o){return IT[o.k]}),
    r:Array.isArray(t.r)?t.r.slice():[],w:Array.isArray(t.w)?t.w.slice():[],seen:t.seen&&typeof t.seen==='object'?t.seen:{},g:t.g|0}}
function save(T){if(!C.isKid())return;C.Store.mut(C.who(),function(k){k.tn={o:T.o.map(function(o){return o.k+','+o.x+','+o.y+','+(o.f?1:0)}),r:T.r,w:T.w,seen:T.seen,g:T.g}})}
function coins(){var k=kid()||{};return +((k.sa||{}).c)||0}
function addCoins(n){C.Store.mut(C.who(),function(k){var o=k.sa&&typeof k.sa==='object'?k.sa:(k.sa={});o.z=o.z||{};o.t=o.t||{};o.c=Math.max(0,(+o.c||0)+n)})}
function totPts(id){var a=0;try{a+=+SOC.pts(id)||0}catch(e){}try{a+=+C.sciPts(id)||0}catch(e){}return a}
var LAND=[[0,6],[300,8],[900,10],[1800,12]];
function landOf(id){var p=totPts(id),n=6,nx=null;if(DEMO)p=Math.max(p,900);LAND.forEach(function(l,i){if(p>=l[0])n=l[1];else if(!nx)nx=l});return {n:n,o:(N-n)/2,p:p,nx:nx}}
function roadMax(id){return DEMO?40:10+6*sciLv(id)}
function waterMax(id){return DEMO?14:sciSt(id,'water')?6+2*sciLv(id):0}
function roadIm(id){var l=sciLv(id);return l>=4?'rd_asphalt':l>=3?'rd_stone':l>=2?'rd_gravel':'rd_dirt'}
var PRL=[[0,'小小村落'],[15,'熱鬧小鎮'],[40,'繁榮城鎮'],[80,'家鄉大城'],[130,'夢想之都']];

/* ---------- 樣式 ---------- */
var CSS=[
'.tn{position:fixed;inset:0;z-index:60;background:linear-gradient(#bfe6ff,#e2f5ff 55%,#cfeccc);display:flex;flex-direction:column;font-family:inherit;color:#1d2b3a;-webkit-user-select:none;user-select:none;touch-action:none}',
'.tn.night{background:linear-gradient(#1b2450,#33407a 60%,#2a4a46)}',
'.tn-top{display:flex;align-items:center;gap:8px;padding:calc(env(safe-area-inset-top,0px) + 8px) 10px 6px;position:relative;z-index:5}',
'.tn-x{width:42px;height:42px;border-radius:50%;border:0;background:#fff;box-shadow:0 2px 0 rgba(0,0,0,.15);font-size:20px;font-weight:900;color:#2b3a4a;flex:none}',
'.tn-tt{flex:1;min-width:0;font-weight:900;font-size:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tn.night .tn-tt{color:#fff}',
'.tn-pill{display:flex;align-items:center;gap:4px;background:#fff;border-radius:99px;padding:3px 10px 3px 4px;font-weight:900;font-size:14px;box-shadow:0 2px 0 rgba(0,0,0,.12);flex:none}.tn-pill img{width:28px;height:28px;object-fit:contain}',
'.tn-pill small{font-size:11px;color:#6a7a88;font-weight:800}',
'.tn-view{flex:1;position:relative;overflow:hidden;touch-action:none}',
'.tn-stage{position:absolute;left:0;top:0;transform-origin:0 0;will-change:transform}',
'.tn-stage img{position:absolute;pointer-events:none;-webkit-user-drag:none;user-select:none}',
'.tn-base{filter:drop-shadow(0 18px 18px rgba(30,60,40,.25))}',
'.tn-o{position:absolute;pointer-events:none}.tn-o img{position:static;display:block;width:100%;height:auto}',
'.tn-o.flip img{transform:scaleX(-1)}.tn-o.sel{filter:drop-shadow(0 0 6px #ffd23f) drop-shadow(0 0 10px #ffb400)}',
'.tn-o.ghost{opacity:.75}.tn-o.ghost.bad{filter:drop-shadow(0 0 4px #e53935) grayscale(.6)}',
'.tn-grid{position:absolute;left:0;top:0;pointer-events:none}',
'.tn-cl{animation:tnCl 7s ease-in-out infinite alternate}@keyframes tnCl{to{transform:translateX(10px)}}',
'.tn-need{position:absolute;display:flex;gap:2px;transform:translate(-50%,-100%);pointer-events:none;animation:tnBob 1.6s ease-in-out infinite}.tn-need img{position:static;width:30px;height:30px;object-fit:contain;filter:drop-shadow(0 2px 2px rgba(0,0,0,.3))}',
'@keyframes tnBob{50%{margin-top:-5px}}',
'.tn-blade{position:absolute;animation:tnSpin 3.2s linear infinite}@keyframes tnSpin{to{transform:rotate(360deg)}}',
'.tn-glow{position:absolute;border-radius:50%;background:radial-gradient(rgba(255,230,140,.85),rgba(255,210,90,.35) 40%,rgba(255,200,80,0) 70%);pointer-events:none;mix-blend-mode:screen;display:none}',
'.tn.night .tn-glow{display:block}',
'.tn.night .tn-stage>img,.tn.night .tn-o,.tn.night .tn-wk,.tn.night .tn-blade{filter:brightness(.58) saturate(.85) hue-rotate(-8deg)}.tn.night .tn-o.lit{filter:brightness(.95)}',
'.tn-trophy{position:absolute;left:50%;transform:translateX(-50%);filter:drop-shadow(0 3px 3px rgba(0,0,0,.3))}',
'.tn-train img{animation:tnTr 1.2s ease-in-out infinite}@keyframes tnTr{50%{transform:translateY(-2px)}}',
'.tn-wk{position:absolute;pointer-events:none;transform:translate(-50%,-100%)}.tn-wk img{position:static;display:block;width:100%;height:auto}.tn-wk.flip img{transform:scaleX(-1)}',
'.tn-zoom{position:absolute;right:10px;top:10px;display:flex;flex-direction:column;gap:8px;z-index:3}.tn-zoom button{width:42px;height:42px;border-radius:12px;border:0;background:#fff;font-size:22px;font-weight:900;box-shadow:0 2px 0 rgba(0,0,0,.15);color:#2b3a4a}',
'.tn-hint{position:absolute;left:50%;top:8px;transform:translateX(-50%);background:rgba(255,255,255,.95);border-radius:14px;padding:8px 12px;font-weight:800;font-size:14px;box-shadow:0 3px 10px rgba(0,0,0,.15);z-index:4;max-width:calc(100% - 80px);text-align:center;line-height:1.45}',
'.tn-hint button{margin:6px 4px 0;border:0;border-radius:10px;padding:6px 12px;font:inherit;font-weight:900;background:#2f8f5b;color:#fff}.tn-hint button.n{background:#e9eef2;color:#2b3a4a}',
'.tn-bar{display:flex;gap:8px;justify-content:center;padding:8px 10px calc(env(safe-area-inset-bottom,0px) + 10px);position:relative;z-index:5}',
'.tn-bar button{flex:1;max-width:110px;border:0;border-radius:16px;background:#fff;box-shadow:0 3px 0 rgba(0,0,0,.15);padding:6px 4px 7px;font:inherit;font-weight:900;font-size:13px;color:#2b3a4a;display:flex;flex-direction:column;align-items:center;gap:2px}',
'.tn-bar button img{width:34px;height:34px;object-fit:contain}.tn-bar button[aria-pressed="true"]{background:#ffe9a8;box-shadow:0 3px 0 #e2b94a}.tn-bar button:disabled{opacity:.45}',
'.tn-sheet{position:absolute;left:0;right:0;bottom:0;background:#fff;border-radius:22px 22px 0 0;box-shadow:0 -6px 24px rgba(0,0,0,.18);z-index:8;max-height:72%;display:flex;flex-direction:column;padding-bottom:env(safe-area-inset-bottom,0px)}',
'.tn-sh{flex:none;display:flex;align-items:center;gap:8px;padding:12px 14px 6px}.tn-sh b{flex:1;font-size:17px}.tn-sh button{border:0;background:#eef2f5;border-radius:50%;width:36px;height:36px;font-size:18px;font-weight:900}',
'.tn-tabs{flex:none;display:flex;gap:6px;padding:2px 12px 8px;overflow-x:auto}.tn-tabs button{flex:none;border:0;border-radius:99px;padding:7px 12px;font:inherit;font-weight:900;font-size:13px;background:#eef2f5;color:#2b3a4a}.tn-tabs button[aria-pressed="true"]{background:#2f8f5b;color:#fff}',
'.tn-cat{overflow-y:auto;padding:4px 12px 14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px}',
'.tn-it{position:relative;border:2px solid #e6ecf0;border-radius:14px;background:#fbfdff;padding:6px 4px 6px;font:inherit;text-align:center;display:flex;flex-direction:column;align-items:center;gap:2px;color:#1d2b3a}',
'.tn-it img{width:72px;height:66px;object-fit:contain}.tn-it b{font-size:13px}.tn-it small{font-size:11px;color:#6a7a88;font-weight:700;line-height:1.3}',
'.tn-it.lock img{filter:grayscale(1) brightness(1.15);opacity:.5}.tn-it.lock{background:#f3f5f7}.tn-it.new::after{content:"新";position:absolute;right:4px;top:4px;background:#e53935;color:#fff;font-size:11px;font-weight:900;border-radius:99px;padding:1px 6px}',
'.tn-it .pr{display:flex;align-items:center;gap:2px;font-weight:900;font-size:12px;color:#b07a00}.tn-it .pr img{width:16px;height:16px}',
'.tn-info{padding:4px 14px 14px;overflow-y:auto}.tn-info .hd{display:flex;gap:12px;align-items:center}.tn-info .hd img{width:84px;height:84px;object-fit:contain;flex:none}',
'.tn-info p{margin:4px 0;font-size:14px;line-height:1.5}.tn-info .src{font-size:12px;color:#2f8f5b;font-weight:800}',
'.tn-needs{display:grid;gap:6px;margin:8px 0}.tn-needs div{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;background:#f4f7f9;border-radius:10px;padding:6px 8px}.tn-needs img{width:26px;height:26px;object-fit:contain}.tn-needs .ok{background:#e6f6ea;color:#1f7a45}',
'.tn-acts{display:flex;gap:8px;flex-wrap:wrap}.tn-acts button{flex:1;min-width:90px;border:0;border-radius:12px;padding:10px 6px;font:inherit;font-weight:900;font-size:14px;background:#eef2f5;color:#2b3a4a}.tn-acts button.go{background:#2f8f5b;color:#fff}.tn-acts button:disabled{opacity:.45}',
'.tn-toast{position:absolute;left:50%;top:64px;transform:translateX(-50%);background:#fff;border-radius:16px;padding:10px 14px;box-shadow:0 6px 18px rgba(0,0,0,.2);z-index:9;font-weight:800;font-size:14px;max-width:calc(100% - 32px);text-align:center;line-height:1.5}',
'.tn-entry{display:flex;align-items:center;gap:12px;width:100%;border:0;border-radius:20px;background:linear-gradient(135deg,#fff6d6,#e3f6ea);padding:10px 14px 10px 10px;box-shadow:0 3px 0 rgba(0,0,0,.08);font:inherit;text-align:left;color:#1d2b3a;margin:0 0 12px}',
'.tn-entry img{width:96px;height:72px;object-fit:contain;flex:none}.tn-entry b{display:block;font-size:17px}.tn-entry small{display:block;font-size:13px;color:#4c5d6c;line-height:1.45;margin-top:2px}.tn-entry .go{margin-left:auto;flex:none;background:#2f8f5b;color:#fff;border-radius:99px;padding:6px 12px;font-weight:900;font-size:13px}'
].join('\n');
var cssOn=false;function css(){if(cssOn)return;cssOn=true;var s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s)}

/* ---------- 入口卡片 ---------- */
function entry(where){css();var id=C.who(),k=C.isKid()?kid():null,T=k?tn():null,nb=T?T.o.filter(function(o){return IT[o.k].c==='soc'}).length:0,nw=k?newUnl(id,T).length:0;
  var sub=where==='sci'?'自然破關可以鋪路、裝路燈、接水，讓小鎮亮起來！':'社會破關蓋房子、學校和商店，星星越多房子越大！';
  return '<button class="tn-entry" data-town="1"><img src="'+img('town_entry')+'" alt=""><span><b>我的家鄉小鎮'+(nw?'・'+nw+' 個新東西':'')+'</b><small>'+sub+(k?'<br>已經蓋了 '+nb+' 棟建築':'')+'</small></span><span class="go">進入</span></button>'}
function newUnl(id,T){return ORD.filter(function(k){var it=IT[k];return it.c!=='deco'&&!T.seen[k]&&unl(id,it).ok&&!(k==='lion_statue')})}

/* ---------- 小鎮畫面 ---------- */
var V=null;
function open(){if(SOC.ready&&!open.ok){return SOC.ready(function(){open.ok=1;open()})}css();if(V)close();var id=C.who(),edit=C.isKid()&&!!kid();
  var T=edit?tn():{o:[],r:[],w:[],seen:{},g:1};
  if(edit&&!T.o.some(function(o){return o.k==='lion_statue'})){T.o.push({k:'lion_statue',x:5,y:5,f:0});[[5,7],[6,7],[7,7],[7,6],[7,5],[4,5],[4,6]].forEach(function(c){T.r.push(c[1]*N+c[0])});save(T)}
  if(edit&&!T.g){T.g=1;save(T);addCoins(30);setTimeout(function(){toast('見面禮：送你 30 個家鄉幣！可以買居民和小物。')},900)}
  var el=document.createElement('div');el.className='tn';document.body.appendChild(el);
  V={el:el,id:id,edit:edit,T:T,mode:'',pick:null,sel:-1,ghost:null,cam:{s:1,x:0,y:0},wk:[],raf:0,night:isNight(),tm:[]};
  el.classList.toggle('night',V.night);
  el.innerHTML='<div class="tn-top"><button class="tn-x" data-x aria-label="離開小鎮">✕</button><div class="tn-tt">我的家鄉小鎮</div><span class="tn-pill" data-pp><img src="'+img('ic_prosper')+'" alt=""><span></span></span><span class="tn-pill" data-pc><img src="'+img('ic_coin')+'" alt=""><span></span></span></div>'+
    '<div class="tn-view"><div class="tn-stage" style="width:'+SW+'px;height:'+SH+'px"></div><div class="tn-zoom"><button data-z="1" aria-label="放大">+</button><button data-z="-1" aria-label="縮小">−</button></div></div>'+
    '<div class="tn-bar"><button data-m="build"><img src="'+img('ic_build')+'" alt="">建造</button><button data-m="road"><img src="'+img(roadIm(id))+'" alt="">鋪路</button><button data-m="water"'+(waterMax(id)?'':' disabled')+'><img src="'+img('tile_water')+'" alt="">挖河</button><button data-m="night"><img src="'+img('lamp_2')+'" alt="">'+(V.night?'看白天':'看夜景')+'</button></div>';
  el.querySelector('[data-x]').addEventListener('click',function(){C.sfx('tap');close()});
  el.querySelectorAll('[data-z]').forEach(function(b){b.addEventListener('click',function(){zoomBy(+b.dataset.z>0?1.25:.8)})});
  el.querySelectorAll('[data-m]').forEach(function(b){b.addEventListener('click',function(){C.sfx('tap');tool(b.dataset.m)})});
  bindPan();render();fit();V.raf=requestAnimationFrame(loop);
  V.onKey=function(e){if(e.key==='Escape'){if(V.mode||V.pick)cancel();else close()}};document.addEventListener('keydown',V.onKey);
  V.onRs=function(){fit()};global.addEventListener('resize',V.onRs);
  if(!edit)toast(C.isKid()?'':'家長模式只能看，小朋友登入後才能蓋小鎮喔！');
  else{var nw=newUnl(id,T);if(nw.length)setTimeout(function(){toast('新解鎖：'+nw.slice(0,4).map(function(k){return IT[k].n}).join('、')+(nw.length>4?' 等 '+nw.length+' 個':'')+'！到「建造」看看吧！')},T.g?300:3200);
    C.say('這是你的家鄉小鎮！社會和自然破關，就能蓋更多東西！','happy')}
}
function close(){if(!V)return;cancelAnimationFrame(V.raf);V.tm.forEach(clearTimeout);document.removeEventListener('keydown',V.onKey);global.removeEventListener('resize',V.onRs);V.el.remove();V=null;try{C.refresh&&C.refresh()}catch(e){}}
function isNight(){var h=new Date().getHours();return h>=18||h<6}

/* ---------- 計算 ---------- */
function occMap(){var m={},T=V.T;T.o.forEach(function(o,i){var it=IT[o.k];if(it.walk)return;for(var dx=0;dx<it.fp;dx++)for(var dy=0;dy<it.fp;dy++)m[(o.y+dy)*N+o.x+dx]=i});return m}
function inLand(x,y){var L=landOf(V.id);return x>=L.o&&y>=L.o&&x<L.o+L.n&&y<L.o+L.n}
function has(arr,i){return arr.indexOf(i)>=0}
function count(k){return V.T.o.filter(function(o){return o.k===k}).length}
function canPlace(it,x,y,skip){var occ=occMap(),T=V.T;
  if(it.walk){var i=y*N+x;return inLand(x,y)&&has(T.r,i)}
  for(var dx=0;dx<it.fp;dx++)for(var dy=0;dy<it.fp;dy++){var X=x+dx,Y=y+dy,i=Y*N+X;if(X>=N||Y>=N||!inLand(X,Y))return false;if(occ[i]!=null&&occ[i]!==skip)return false;
    if(has(T.r,i))return false;if(it.onw?!has(T.w,i):has(T.w,i))return false}
  return true}
function near(o,pred,d){var it=IT[o.k],T=V.T;return T.o.some(function(p){if(p===o||!pred(IT[p.k]))return false;var pi=IT[p.k];
  return p.x<=o.x+it.fp-1+d&&p.x+pi.fp-1>=o.x-d&&p.y<=o.y+it.fp-1+d&&p.y+pi.fp-1>=o.y-d})}
function needs(o){var it=IT[o.k],T=V.T,road=false;
  for(var dx=-1;dx<=it.fp;dx++)for(var dy=-1;dy<=it.fp;dy++){var edge=(dx===-1||dx===it.fp)!==(dy===-1||dy===it.fp);if(!edge)continue;var X=o.x+dx,Y=o.y+dy;if(X<0||Y<0||X>=N||Y>=N)continue;if(has(T.r,Y*N+X))road=true}
  return {road:road,power:near(o,function(p){return p.lamp},2),water:near(o,function(p){return p.water},4)}}
function prosper(){var s=0;V.T.o.forEach(function(o){var it=IT[o.k];if(it.c==='soc'){var n=needs(o);s+=2+(n.road?1:0)+(n.power?1:0)+(n.water?1:0)}else if(it.c==='mark')s+=3;else s+=1});return s}
function prName(s){var n=PRL[0][1];PRL.forEach(function(p){if(s>=p[0])n=p[1]});return n}

/* ---------- 畫出小鎮 ---------- */
function pos(o){var it=IT[o.k],w=it.fp*TW*it.s,bx=cx(o.x+it.fp/2,o.y+it.fp/2),by=cy(o.x+it.fp,o.y+it.fp);
  if(it.sm){by=cy(o.x+.5,o.y+.5)+TH*.32}return {l:bx-w/2,b:by+w*it.oy,w:w}}
function oHtml(o,i,cls){var it=IT[o.k],p=pos(o),z=100+(o.x+o.y+2*it.fp-2)*10+(it.sm?6:0),h='';
  var inner='<img src="'+img(it.im)+'" alt="">';
  if(it.zone){inner+='<img class="tn-trophy" src="'+SOC.img(ZT[it.zone][0])+'" alt="" style="position:absolute;width:52%;bottom:52%;border-radius:12px">'}
  h+='<div class="tn-o'+(o.f?' flip':'')+(it.train?' tn-train':'')+(it.lamp?' lit':'')+(cls||'')+'" data-i="'+i+'" style="left:'+p.l.toFixed(1)+'px;top:'+(p.b).toFixed(1)+'px;width:'+p.w.toFixed(1)+'px;transform:translateY(-100%);z-index:'+z+'">'+inner+'</div>';
  if(it.mill){var bw=p.w*1.12;h+='<img class="tn-blade" src="'+img('wind_blade')+'" alt="" style="left:'+(p.l+p.w*.5-bw/2).toFixed(1)+'px;top:'+(p.b-p.w*1.22-bw/2).toFixed(1)+'px;width:'+bw.toFixed(1)+'px;z-index:'+(z+1)+'">'}
  if(it.lamp){var gw=TW*1.6;h+='<div class="tn-glow" style="left:'+(p.l+p.w/2-gw/2).toFixed(1)+'px;top:'+(p.b-p.w*(o.k==='lamp_2'?2.4:1.6)-gw/2).toFixed(1)+'px;width:'+gw+'px;height:'+gw+'px;z-index:'+(z+1)+'"></div>'}
  return h}
function render(){var S=V.el.querySelector('.tn-stage'),T=V.T,id=V.id,L=landOf(id),h='',bw=N*TW*1.0;
  bw=L.n*TW;h+='<img class="tn-base" src="'+img('town_base')+'" alt="" style="left:'+(cx(L.o,L.o)-bw*226/445).toFixed(1)+'px;top:'+(cy(L.o,L.o)-2).toFixed(1)+'px;width:'+bw+'px">';
  var rim=img(roadIm(id)),tw=TW*1.0;
  function tile(i,src){var x=i%N,y=(i/N)|0;return '<img src="'+src+'" alt="" style="left:'+(cx(x,y)-tw/2).toFixed(1)+'px;top:'+(cy(x,y)-1).toFixed(1)+'px;width:'+tw+'px;z-index:'+(10+x+y)+'">'}
  T.w.forEach(function(i){h+=tile(i,img('tile_water'))});T.r.forEach(function(i){h+=tile(i,rim)});
  T.o.forEach(function(o,i){if(IT[o.k].walk)return;h+=oHtml(o,i,V.sel===i?' sel':'')});
  if(V.edit)T.o.forEach(function(o){var it=IT[o.k];if(it.c!=='soc')return;var n=needs(o),ic=[];if(!n.road)ic.push('ic_road');if(!n.power&&sciSt(id,'circ'))ic.push('ic_power');if(!n.water&&sciSt(id,'water'))ic.push('ic_water');
    if(ic.length){var p=pos(o);h+='<div class="tn-need" style="left:'+(p.l+p.w/2).toFixed(1)+'px;top:'+(p.b-p.w*(AR[it.im]||1)*.82).toFixed(1)+'px;z-index:900">'+ic.map(function(k){return '<img src="'+img(k)+'" alt="">'}).join('')+'</div>'}});
  /* 土地外圍一圈雲：代表還能擴建 */
  if(L.n<N){var a=L.o-1,b=L.o+L.n,cl=[];for(var j=a;j<=b;j+=2){cl.push([a,j],[b,j],[j,a],[j,b])}
    cl.forEach(function(c,q){var cw=TW*1.25;h+='<img class="tn-cl" src="'+img('cloud_lock')+'" alt="" style="left:'+(cx(c[0]+.5,c[1]+.5)-cw/2).toFixed(1)+'px;top:'+(cy(c[0]+.5,c[1]+.5)-cw*.45).toFixed(1)+'px;width:'+cw.toFixed(1)+'px;z-index:'+(108+(c[0]+c[1])*10)+';opacity:.92;animation-delay:-'+(q%7)+'s">'})}
  if(V.ghost){var g=V.ghost,it=IT[g.k];if(it.walk){var wp=wkPos(g.x+.5,g.y+.5);h+='<div class="tn-wk ghost'+(g.ok?'':' bad')+'" style="left:'+wp.x+'px;top:'+wp.y+'px;width:'+wkW(it)+'px;z-index:990"><img src="'+img(it.im)+'" alt=""></div>'}
    else h+=oHtml(g,-1,' ghost'+(g.ok?'':' bad')).replace(/z-index:\d+/,'z-index:990')}
  S.innerHTML=h;V.wk.forEach(function(w){w.el=null});wkSync();hud()}
function hud(){var e=V.el,s=prosper();e.querySelector('[data-pp] span').innerHTML=s+' <small>'+prName(s)+'</small>';e.querySelector('[data-pc] span').textContent=coins();
  e.querySelectorAll('[data-m]').forEach(function(b){b.setAttribute('aria-pressed',String(V.mode===b.dataset.m))})}

/* ---------- 走路的居民和車子 ---------- */
function wkW(it){return it.walk===3?TW*.62:it.walk===2?TW*.42:TW*.36}
function wkPos(fx,fy){return {x:cx(fx,fy),y:cy(fx,fy)+TH*.08}}
function wkSync(){var T=V.T,S=V.el.querySelector('.tn-stage'),list=[];
  T.o.forEach(function(o,i){if(!IT[o.k].walk)return;var w=V.wk.filter(function(q){return q.o===o})[0];if(!w)w={o:o,x:o.x,y:o.y,tx:o.x,ty:o.y,t:1,dir:[0,1]};list.push(w)});
  V.wk=list;list.forEach(function(w){var it=IT[w.o.k];w.el=document.createElement('div');w.el.className='tn-wk';w.el.style.width=wkW(it)+'px';w.el.innerHTML='<img src="'+img(it.im)+'" alt="">';S.appendChild(w.el);wkDraw(w)})}
function wkDraw(w){var it=IT[w.o.k],t=Math.min(1,w.t),fx=w.x+(w.tx-w.x)*t+.5,fy=w.y+(w.ty-w.y)*t+.5,p=wkPos(fx,fy),dx=w.dir[0],dy=w.dir[1],back=dx<0||dy<0,base=it.im.replace(/_f$/,'');
  var want=img(base+(back?'_b':'_f'));var im=w.el.firstChild;if(im.getAttribute('src')!==want)im.setAttribute('src',want);
  w.el.classList.toggle('flip',(dx>0)||(dy<0));w.el.style.left=p.x.toFixed(1)+'px';w.el.style.top=p.y.toFixed(1)+'px';w.el.style.zIndex=String(100+Math.round((fx+fy-1)*10)+7)}
function wkStep(w,dt){var it=IT[w.o.k],sp=it.walk===1?.7:it.walk===2?1.3:1.7;w.t+=dt*sp;if(w.t<1)return;
  w.x=w.tx;w.y=w.ty;var T=V.T,opts=[[1,0],[-1,0],[0,1],[0,-1]].filter(function(d){var X=w.x+d[0],Y=w.y+d[1];return X>=0&&Y>=0&&X<N&&Y<N&&has(T.r,Y*N+X)});
  if(!opts.length){w.t=0;w.tx=w.x;w.ty=w.y;w.wait=1;return}
  var fw=opts.filter(function(d){return !(d[0]===-w.dir[0]&&d[1]===-w.dir[1])}),pick=(fw.length?fw:opts)[Math.floor(Math.random()*(fw.length?fw:opts).length)];
  if(it.walk===1&&Math.random()<.15){w.t=-.8;w.tx=w.x;w.ty=w.y;return}
  w.dir=pick;w.tx=w.x+pick[0];w.ty=w.y+pick[1];w.t=0}
var last=0;function loop(ts){if(!V)return;var dt=last?Math.min(.1,(ts-last)/1000):0;last=ts;V.wk.forEach(function(w){if(w.el){wkStep(w,dt);wkDraw(w)}});V.raf=requestAnimationFrame(loop)}

/* ---------- 鏡頭：拖曳、雙指縮放 ---------- */
function apply(){var c=V.cam,S=V.el.querySelector('.tn-stage');S.style.transform='translate('+c.x.toFixed(1)+'px,'+c.y.toFixed(1)+'px) scale('+c.s.toFixed(3)+')'}
function fit(){if(!V)return;var vw=V.el.querySelector('.tn-view'),W=vw.clientWidth,H=vw.clientHeight,L=landOf(V.id),span=(L.n+2.6)*TW,s=Math.max(.35,Math.min(1.6,W/span,H/((L.n+4)*TH+PT*.5)));
  V.cam.s=s;var mx=cx(N/2,N/2),my=cy(N/2,N/2)-TH*.6;V.cam.x=W/2-mx*s;V.cam.y=H/2-my*s;apply()}
function zoomBy(f,px,py){var vw=V.el.querySelector('.tn-view'),c=V.cam;if(px==null){px=vw.clientWidth/2;py=vw.clientHeight/2}var ns=Math.max(.3,Math.min(2.6,c.s*f));c.x=px-(px-c.x)*ns/c.s;c.y=py-(py-c.y)*ns/c.s;c.s=ns;apply()}
function toCell(px,py){var c=V.cam,sx=(px-c.x)/c.s,sy=(py-c.y)/c.s,u=(sx-OX)/(TW/2),v=(sy-OY)/(TH/2);return {x:Math.floor((u+v)/2),y:Math.floor((v-u)/2)}}
function bindPan(){var vw=V.el.querySelector('.tn-view'),pts={},st=null;
  function rel(e){var r=vw.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}}
  vw.addEventListener('pointerdown',function(e){if(e.target.closest('.tn-zoom,.tn-hint'))return;try{vw.setPointerCapture(e.pointerId)}catch(x){}pts[e.pointerId]=rel(e);var ks=Object.keys(pts);
    if(ks.length===1)st={x:pts[ks[0]].x,y:pts[ks[0]].y,cx:V.cam.x,cy:V.cam.y,mv:false};
    else if(ks.length===2){var a=pts[ks[0]],b=pts[ks[1]];st={pinch:Math.hypot(a.x-b.x,a.y-b.y),s:V.cam.s,mx:(a.x+b.x)/2,my:(a.y+b.y)/2,cx:V.cam.x,cy:V.cam.y,mv:true}}});
  vw.addEventListener('pointermove',function(e){if(!pts[e.pointerId]||!st)return;pts[e.pointerId]=rel(e);var ks=Object.keys(pts);
    if(st.pinch&&ks.length>=2){var a=pts[ks[0]],b=pts[ks[1]],d=Math.hypot(a.x-b.x,a.y-b.y),ns=Math.max(.3,Math.min(2.6,st.s*d/st.pinch));V.cam.s=ns;V.cam.x=st.mx-(st.mx-st.cx)*ns/st.s;V.cam.y=st.my-(st.my-st.cy)*ns/st.s;apply();return}
    var p=pts[e.pointerId],dx=p.x-st.x,dy=p.y-st.y;if(!st.mv&&Math.hypot(dx,dy)>8)st.mv=true;if(st.mv&&!st.pinch){V.cam.x=st.cx+dx;V.cam.y=st.cy+dy;apply()}});
  function up(e){if(!pts[e.pointerId])return;var p=pts[e.pointerId];delete pts[e.pointerId];if(st&&!st.mv&&!Object.keys(pts).length){tap(p.x,p.y)}if(!Object.keys(pts).length)st=null}
  vw.addEventListener('pointerup',up);vw.addEventListener('pointercancel',function(e){delete pts[e.pointerId];st=null});
  vw.addEventListener('wheel',function(e){e.preventDefault();var p=rel(e);zoomBy(e.deltaY<0?1.12:.89,p.x,p.y)},{passive:false})}

/* ---------- 點地圖 ---------- */
function tap(px,py){var c=toCell(px,py);if(c.x<0||c.y<0||c.x>=N||c.y>=N){if(!V.mode&&!V.pick)deselect();return}
  if(!V.edit){var o0=objAt(c);if(o0>=0)info(o0);return}
  if(V.mode==='road'||V.mode==='water')return paint(c);
  if(V.pick)return ghostAt(c);
  if(!inLand(c.x,c.y)){var L=landOf(V.id);C.sfx('no');toast(L.nx?'這裡還被雲蓋住。社會分＋自然分再 '+(L.nx[0]-L.p)+' 分，土地就會變大！':'這裡還被雲蓋住。');return}
  var i=objAt(c);if(i>=0)return info(i);deselect()}
function objAt(c){var occ=occMap(),i=occ[c.y*N+c.x];if(i!=null)return i;
  for(var k=0;k<V.wk.length;k++){var w=V.wk[k];if(Math.round(w.x)===c.x&&Math.round(w.y)===c.y)return V.T.o.indexOf(w.o)}return -1}
function paint(c){var T=V.T,i=c.y*N+c.x,isR=V.mode==='road',arr=isR?T.r:T.w,mx=isR?roadMax(V.id):waterMax(V.id);
  if(!inLand(c.x,c.y)){C.sfx('no');toast('雲下面的土地還不能用。');return}
  var occ=occMap();if(occ[i]!=null){C.sfx('no');toast('這格已經有東西了。');return}
  var k=arr.indexOf(i);if(k>=0){if(isR&&V.T.o.some(function(o){return IT[o.k].walk&&o.x===c.x&&o.y===c.y})){C.sfx('no');toast('居民站在這裡，先把他收起來。');return}arr.splice(k,1);C.sfx('tap')}
  else{var other=isR?T.w:T.r;if(has(other,i)){C.sfx('no');toast(isR?'這格是河水，要先蓋小橋才能過。':'這格是道路。');return}
    if(arr.length>=mx){C.sfx('no');toast(isR?'道路用完了！自然等級升級可以鋪更多路。':'河水用完了！自然等級升級可以挖更多。');return}arr.push(i);C.sfx('pop')}
  save(T);render();hint()}

/* ---------- 工具列 ---------- */
function tool(m){if(!V.edit&&m!=='night'){toast('家長模式只能看喔！');return}
  if(m==='night'){V.night=!V.night;V.el.classList.toggle('night',V.night);V.el.querySelector('[data-m="night"]').lastChild.textContent=V.night?'看白天':'看夜景';return}
  if(m==='build'){cancel();catalog();return}
  if(m==='water'&&!waterMax(V.id)){toast('去自然島「冰與水的瀑布湖」3 關都過關，就能挖河！');return}
  V.pick=null;V.ghost=null;closeSheet();deselect(true);V.mode=V.mode===m?'':m;render();hint()}
function hint(){var e=V.el.querySelector('.tn-hint');if(e)e.remove();var t='',T=V.T;
  if(V.mode==='road')t='點空地鋪路，再點一次拆掉・道路 '+T.r.length+' / '+roadMax(V.id)+'<br><small>自然等級越高，路越多、越漂亮</small>';
  else if(V.mode==='water')t='點空地挖河，再點一次填平・河水 '+T.w.length+' / '+waterMax(V.id);
  else if(V.pick){var it=IT[V.pick.k];t=it.walk?'點一格道路，讓「'+it.n+'」站上去':it.onw?'點一格河水，把「小橋」蓋上去':'點空地放「'+it.n+'」'+(it.fp>1?'（要 2×2 格）':'');}
  if(!t)return;var d=document.createElement('div');d.className='tn-hint';d.innerHTML=t+(V.pick&&V.ghost?'<br><button data-ok'+(V.ghost.ok?'':' disabled')+'>放這裡</button><button class="n" data-no>取消</button>':'<br><button class="n" data-no>完成</button>');
  V.el.querySelector('.tn-view').appendChild(d);
  var ok=d.querySelector('[data-ok]');if(ok)ok.addEventListener('click',place);d.querySelector('[data-no]').addEventListener('click',function(){C.sfx('tap');cancel()})}
function cancel(){if(!V)return;V.mode='';V.pick=null;V.ghost=null;var e=V.el.querySelector('.tn-hint');if(e)e.remove();render()}

/* ---------- 建造目錄 ---------- */
var tab='soc';
function closeSheet(){var s=V&&V.el.querySelector('.tn-sheet');if(s)s.remove()}
function catalog(){closeSheet();var id=V.id,T=V.T,sh=document.createElement('div');sh.className='tn-sheet';
  function body(){var h='';ORD.forEach(function(k){var it=IT[k];if(it.c!==tab)return;var u=unl(id,it),n=count(k),full=n>=it.mx,isNew=u.ok&&!T.seen[k]&&it.c!=='deco';
      if(it.zone&&!u.ok&&!(kid()&&((kid().sa||{}).n)))return;
      var sub=!u.ok?'還沒解鎖':u.demo?'試玩先打開':it.p?'<span class="pr"><img src="'+img('ic_coin')+'" alt="">'+it.p+'</span>':'已放 '+n+' / '+it.mx;
      if(u.ok&&it.p)sub+='<small>已放 '+n+' / '+it.mx+'</small>';
      h+='<button class="tn-it'+(u.ok?'':' lock')+(isNew?' new':'')+'" data-k="'+k+'"'+(u.ok&&full?' aria-disabled="true"':'')+'><img src="'+img(it.im)+'" alt=""><b>'+esc(it.n)+'</b><small>'+sub+'</small></button>'});
    return h||'<p style="grid-column:1/-1;color:#6a7a88;font-size:14px">完成 3D 冒險的關卡，就能把拿回來的寶物放進小鎮當地標！</p>'}
  sh.innerHTML='<div class="tn-sh"><img src="'+img('ic_build')+'" alt="" style="width:30px;height:30px"><b>建造</b><button data-c aria-label="關閉">✕</button></div><div class="tn-tabs">'+CATS.map(function(c){return '<button data-t="'+c[0]+'" aria-pressed="'+(tab===c[0])+'">'+c[1]+'</button>'}).join('')+'</div><div class="tn-cat">'+body()+'</div>';
  V.el.appendChild(sh);
  sh.querySelector('[data-c]').addEventListener('click',function(){C.sfx('tap');closeSheet()});
  sh.querySelectorAll('[data-t]').forEach(function(b){b.addEventListener('click',function(){C.sfx('tap');tab=b.dataset.t;catalog()})});
  sh.querySelectorAll('[data-k]').forEach(function(b){b.addEventListener('click',function(){choose(b.dataset.k)})});
  /* 看過就不再標「新」 */
  var ch=false;ORD.forEach(function(k){var it=IT[k];if(it.c===tab&&it.c!=='deco'&&!T.seen[k]&&unl(id,it).ok){T.seen[k]=1;ch=true}});if(ch)save(T)}
function choose(k){var it=IT[k],u=unl(V.id,it);
  if(!u.ok){C.sfx('no');toast('「'+it.n+'」還沒解鎖：'+u.why+'。');return}
  if(count(k)>=it.mx){C.sfx('no');toast('「'+it.n+'」最多 '+it.mx+' 個，已經放滿了。點小鎮上的它可以移動或收起來。');return}
  if(it.p&&coins()<it.p){C.sfx('no');toast('家鄉幣不夠（要 '+it.p+' 個）。去 3D 冒險撿金幣吧！');return}
  if(it.walk&&!V.T.r.length){C.sfx('no');toast('先用「鋪路」鋪一條路，'+it.n+'才有地方走。');return}
  C.sfx('tap');closeSheet();V.mode='';V.pick={k:k};V.ghost=null;render();hint()}
function ghostAt(c){var it=IT[V.pick.k],x=c.x,y=c.y;if(it.fp>1){x=Math.min(x,N-it.fp);y=Math.min(y,N-it.fp)}
  V.ghost={k:V.pick.k,x:x,y:y,f:V.pick.f|0,ok:canPlace(it,x,y,V.pick.move!=null?V.pick.move:-1)};C.sfx('tap');render();hint()}
function place(){var g=V.ghost,it=IT[g.k];if(!g||!g.ok)return;var T=V.T;
  if(V.pick.move!=null){var o=T.o[V.pick.move];o.x=g.x;o.y=g.y}
  else{if(it.p){if(coins()<it.p){toast('家鄉幣不夠。');return}addCoins(-it.p)}T.o.push({k:g.k,x:g.x,y:g.y,f:g.f})}
  T.seen[g.k]=1;save(T);C.sfx('win');try{C.confetti(null,30)}catch(e){}
  var nm=it.n;V.pick=null;V.ghost=null;render();var e=V.el.querySelector('.tn-hint');if(e)e.remove();
  if(it.c==='soc'){var o2=T.o[T.o.length-1],n=needs(o2);toast('蓋好「'+nm+'」了！'+(!n.road?'記得在旁邊鋪一條路，才會有人住進來。':'旁邊有路，居民搬進來了！'))}
  else toast('放好「'+nm+'」了！')}

/* ---------- 點建築看資訊 ---------- */
function deselect(quiet){if(!V)return;var had=V.sel>=0;V.sel=-1;closeSheet();if(had&&!quiet)render()}
function info(i){var T=V.T,o=T.o[i],it=IT[o.k],id=V.id;V.sel=i;render();closeSheet();
  var sh=document.createElement('div');sh.className='tn-sheet';
  var src=it.c==='soc'?'社會島：'+FAM[it.f].map(function(u){return '「'+UN[u]+'」'}).join(''):it.c==='sci'?(it.st?'自然島：「'+STN[it.st]+'」':'自然等級 Lv.'+(it.sl+1)):it.c==='deco'?'用家鄉幣買的':it.zone?'3D 冒險：「'+ZT[it.zone][2]+'」':'小鎮的守護者';
  var h='<div class="tn-sh"><b>'+esc(it.n)+'</b><button data-c aria-label="關閉">✕</button></div><div class="tn-info"><div class="hd"><img src="'+img(it.im)+'" alt=""><div><div class="src">'+esc(src)+'</div><p>'+esc(it.d||'')+'</p></div></div>';
  if(it.c==='soc'){var n=needs(o);h+='<div class="tn-needs">'+
    '<div class="'+(n.road?'ok':'')+'"><img src="'+img('ic_road')+'" alt="">'+(n.road?'旁邊有道路，居民可以進出':'旁邊還沒有路：用「鋪路」在建築旁邊鋪一格')+'</div>'+
    '<div class="'+(n.power?'ok':'')+'"><img src="'+img('ic_power')+'" alt="">'+(n.power?'有路燈，晚上有電':sciSt(id,'circ')?'還沒有電：在 2 格內放一盞路燈':'還沒有電：去自然島「電力小屋」3 關都過關，就能蓋路燈')+'</div>'+
    '<div class="'+(n.water?'ok':'')+'"><img src="'+img('ic_water')+'" alt="">'+(n.water?'有水塔，可以用水':sciSt(id,'water')?'還沒有水：在 4 格內蓋一座水塔':'還沒有水：去自然島「冰與水的瀑布湖」3 關都過關，就能蓋水塔')+'</div></div>'}
  var up=it.up&&IT[it.up],upOk=up&&unl(id,up).ok;
  if(V.edit){h+='<div class="tn-acts">';
    if(up)h+='<button class="go" data-a="up"'+(upOk?'':' disabled')+'>'+(upOk?'升級成「'+esc(up.n)+'」':'升級：'+esc(unl(id,up).why))+'</button>';
    h+='<button data-a="mv">移動</button><button data-a="fl">轉方向</button>'+(it.k==='lion_statue'?'':'<button data-a="rm">收起來'+(it.p?'（退回 '+it.p+' 幣）':'')+'</button>')+'</div>'}
  h+='</div>';sh.innerHTML=h;V.el.appendChild(sh);
  sh.querySelector('[data-c]').addEventListener('click',function(){C.sfx('tap');deselect()});
  sh.querySelectorAll('[data-a]').forEach(function(b){b.addEventListener('click',function(){var a=b.dataset.a;C.sfx('tap');
    if(a==='fl'){o.f=o.f?0:1;save(T);render();return}
    if(a==='rm'){T.o.splice(i,1);if(it.p)addCoins(it.p);save(T);V.sel=-1;closeSheet();render();toast('「'+it.n+'」收起來了，隨時可以再蓋。');return}
    if(a==='mv'){closeSheet();V.sel=-1;V.pick={k:o.k,move:i,f:o.f};V.ghost=null;render();hint();return}
    if(a==='up'&&upOk){if(count(up.k)>=up.mx){toast('「'+up.n+'」已經蓋滿 '+up.mx+' 個了。');return}
      var x=Math.min(o.x,N-up.fp),y=Math.min(o.y,N-up.fp);if(!canPlace(up,x,y,i)){C.sfx('no');toast('「'+up.n+'」比較大，要 '+up.fp+'×'+up.fp+' 格。先把旁邊空出來，或移到空地再升級。');return}
      o.k=up.k;o.x=x;o.y=y;T.seen[up.k]=1;save(T);C.sfx('win');try{C.confetti(null,60)}catch(e){}C.say('升級成「'+up.n+'」了！','happy');info(i)}})})}
function toast(t){if(!V||!t)return;var o=V.el.querySelector('.tn-toast');if(o)o.remove();var d=document.createElement('div');d.className='tn-toast';d.textContent=t;V.el.appendChild(d);V.tm.push(setTimeout(function(){d.remove()},3200))}

return {entry:entry,open:open,close:close,css:css,_items:IT,_V:function(){return V},_C:function(){return C},version:'1.0.0'};
};
})(window);
