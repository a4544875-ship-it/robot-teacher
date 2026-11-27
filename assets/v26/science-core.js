/* Science Expedition 26. Pure task plans and simplified teaching models. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.Science26Core=api;})(typeof window==='object'?window:this,function(){
 'use strict';
 var LEVELS={
  mag:[['磁力鑑定師','先預測，再用磁鐵檢驗材質'],['磁力研究員','調距離、隔材料，留下觀察證據'],['磁極小列車','翻轉磁極，用吸引與排斥完成任務']],
  circ:[['點亮研究室','點接點拉電線，完成封閉迴路'],['導體鑑定師','先預測，再測試材料能否導電'],['電路修復師','觀察線索，修復一到兩個故障']],
  water:[['水的變身術','加熱與冷卻，觀察狀態改變'],['曬衣研究員','一次只改一個條件，公平比較'],['水滴大旅行','串起蒸發、凝結、降水與回流']],
  plant:[['種子實驗室','替綠豆準備水、空氣與適合溫度'],['溫室照顧員','讀懂每天的狀況，陪小苗長大'],['植物小偵探','找出構造，理解每個部位的工作']],
  animal:[['棲地設計師','依動物需要安排有資源的家'],['牧場配餐員','觀察食性，搭配適合的食物'],['動物研究員','用身體特徵分類，不只看會不會飛']]
 };
 var MATERIALS=[
  ['clip','鐵製迴紋針',true,true,'鐵製迴紋針可以被磁鐵吸引，也能導電。'],
  ['nail','鐵釘',true,true,'這枚鐵釘可以被磁鐵吸引，也能導電。'],
  ['alcan','鋁罐',false,true,'鋁可以導電，但一般磁鐵不會吸住鋁罐。金屬不一定都能被磁鐵吸引。'],
  ['foil','鋁箔',false,true,'鋁箔能導電，卻不會被一般磁鐵吸住；導電與磁性是不同性質。'],
  ['wspoon','乾燥木湯匙',false,false,'乾燥木頭不會被磁鐵吸住，在這個低壓電路模型中也不讓燈泡亮。'],
  ['ruler','塑膠尺',false,false,'塑膠不會被磁鐵吸住，一般也是不易導電的材料。'],
  ['eraser','橡皮擦',false,false,'橡膠不會被磁鐵吸住，在本模型中也不容易導電。'],
  ['paper','乾燥紙片',false,false,'乾燥紙片不會被磁鐵吸住，在本模型中也不讓低壓小燈泡亮。']
 ];
 var ANIMALS=[
  {key:'rabbit',name:'兔子',habitat:0,foods:['grass','carrot'],group:'哺乳類',clue:'有毛，幼小時喝媽媽的奶。'},
  {key:'cow',name:'牛',habitat:0,foods:['grass'],group:'哺乳類',clue:'有毛，幼小時喝媽媽的奶。'},
  {key:'lion',name:'獅子',habitat:1,foods:['meat'],group:'哺乳類',clue:'有毛，幼小時喝媽媽的奶。'},
  {key:'duck',name:'鴨',habitat:2,foods:['grain','insects'],group:'鳥類',clue:'有羽毛、喙，會產卵。'},
  {key:'chicken',name:'雞',habitat:0,foods:['grain','insects'],group:'鳥類',clue:'有羽毛、喙，會產卵。'},
  {key:'fish',name:'金魚',habitat:3,foods:['fishf'],group:'魚類',clue:'在水中用鰓呼吸，有鰭。'},
  {key:'penguin',name:'皇帝企鵝',habitat:4,foods:['fish'],group:'鳥類',clue:'雖然不會飛，仍有羽毛、喙，會產卵。'},
  {key:'frog',name:'成蛙',habitat:2,foods:['insects'],group:'兩棲類',clue:'幼體生活在水中，成體也能在潮濕陸地活動。'}
 ];
 var HABITATS=['有草、飲水與遮蔽的草地','有獵物、飲水與遮蔽的草原','有昆蟲與水草的池塘及潮濕岸邊','水質適合、含氧充足的淡水池','可到海中覓食的南極海岸'];
 var FOOD={grass:'草葉',carrot:'胡蘿蔔',grain:'穀粒',insects:'小蟲',meat:'肉',fishf:'金魚飼料',fish:'魚'};
 function shuffle(a,R){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(R()*(i+1)),v=a[i];a[i]=a[j];a[j]=v;}return a;}
 function choice(id,title,a,wrong,why,scene){return {id:id,mode:'choice',title:title,answer:a,options:[a].concat(wrong),why:why,scene:scene||'station'};}
 function task(id,mode,title,why,extra){return Object.assign({id:id,mode:mode,title:title,why:why},extra||{});}
 function plan(k,lv,grade,R){R=R||Math.random;lv=Math.max(0,Math.min(2,lv|0));grade=+grade||3;var q=[],high=grade>=4;
  if(k==='mag'&&lv===0||k==='circ'&&lv===1){
   var magnetic=k==='mag',pool=shuffle(MATERIALS.filter(function(m){return m[magnetic?2:3]}),R).slice(0,2).concat(shuffle(MATERIALS.filter(function(m){return !m[magnetic?2:3]}),R).slice(0,4));
   if(!magnetic)pool=shuffle([MATERIALS[0],MATERIALS[1],MATERIALS[4],MATERIALS[5]],R).concat(shuffle([MATERIALS[2],MATERIALS[3]],R));
   else pool=shuffle([MATERIALS[0],MATERIALS[1],MATERIALS[4],MATERIALS[5]],R).concat(shuffle([MATERIALS[2],MATERIALS[3]],R));
   q=pool.map(function(m){return task(k+'-material-'+m[0],'material','預測：'+m[1]+(magnetic?'會被磁鐵吸住嗎？':'接入低壓電路，燈泡會亮嗎？'),m[4],{material:m,magnetic:magnetic,answer:m[magnetic?2:3]?'會':'不會',options:['會','不會']});});
  }
  if(k==='mag'&&lv===1){
   q=[task('mag-near-far','range','各量一次近與遠的位置。哪個位置吸引作用較明顯？','同一磁鐵與鐵製物品，其他條件相同時，距離較近通常吸引作用較明顯。',{answer:'近的位置',options:['近的位置','遠的位置','距離完全沒有影響'],barrier:'無隔板'}),
    task('mag-paper','range','隔著薄紙片，磁鐵還可能吸引迴紋針嗎？','磁力可以隔著薄紙片作用。仍要注意總距離，距離太遠時作用可能不明顯。',{answer:'靠近時仍可能吸引',options:['靠近時仍可能吸引','薄紙片一定完全擋住磁力','紙片會變成永久磁鐵'],barrier:'薄紙片'}),
    task('mag-plastic','range','隔著薄塑膠片，在近與遠各試一次。哪個結論合理？','薄塑膠片不會把磁力完全擋住。本模型只比較同一磁鐵、同一鐵物與固定薄片下的距離。',{answer:'可隔片作用，但仍受距離影響',options:['可隔片作用，但仍受距離影響','磁力只能直接碰到物品才有','距離越遠一定越強'],barrier:'薄塑膠片'}),
    choice('mag-fair','想研究距離的影響，哪組比較公平？','同一磁鐵與迴紋針，只改距離',['同時換磁鐵和距離','每次改成不同材質'],'公平比較要一次只改一個條件；磁鐵、物品與隔板保持相同。','mag'),
    choice('mag-metal','鋁箔不被吸住，鐵釘會被吸住。哪個結論合理？','不同金屬的磁性可能不同',['所有金屬都被吸住','所有金屬都不被吸住'],'這次觀察不能推出所有金屬都一樣；要依材料逐一檢驗。','mag'),
    choice('mag-evidence','一次沒有吸住迴紋針，下一步怎樣更有證據？','固定其他條件，縮短距離再觀察',['立刻宣布磁鐵壞了','只換紀錄紙顏色'],'一次結果不足以判斷原因；先檢查距離、材質與磁鐵，再重複觀察。','mag')];
  }
  if(k==='mag'&&lv===2){
   ['N','S'].forEach(function(p){['吸引','排斥'].forEach(function(goal){q.push(task('mag-pole-'+p+goal,'poles','讓小列車「'+goal+'」：選擇右側朝向左邊的磁極。','異極相吸，同極相斥。這裡比較兩個面對面的磁極，不是磁鐵顏色。',{left:p,goal:goal,answer:goal==='吸引'?(p==='N'?'S':'N'):p,options:['N','S']}));});});
   q.push(choice('mag-flip','兩端都是 N 極，先排斥。把右邊磁鐵翻轉後呢？','改為吸引',['仍一定排斥','磁力完全消失'],'翻轉後，面對的磁極變成 N 與 S，因此互相吸引。','mag'));
   q.push(choice('mag-both','把同一根磁鐵的 S 極靠近鐵釘，會怎樣？','仍能吸引鐵釘',['只有 N 極能吸鐵','一定把鐵釘推走'],'一般未被強烈磁化的鐵釘，可以被磁鐵的兩極吸引；不能把鐵釘當成固定的 N 極。','mag'));
  }
  if(k==='circ'&&lv===0){
   q=[0,1,2,3].map(function(n){return task('circ-wire-'+n,'wire',n<2?'點接點拉線，讓電池與燈泡形成一個圈。':'完成迴路，並檢查開關是否接通。','電池的兩端要分別經過燈泡兩個接點，形成封閉迴路；只接一端不會亮。',{preset:n===0?[['bp','la']]:[],switch:n>=2,closed:n===3,reversed:n%2===1});});
   q.push(choice('circ-two','燈泡只接到電池一端，為什麼沒有亮？','沒有形成回到電池另一端的迴路',['電線不夠漂亮','燈泡一定需要兩顆電池'],'完整迴路要讓電流經過燈泡並回到電池另一端。','circ'));
   q.push(choice('circ-safe','實驗的小燈泡還是不亮，應該怎麼做？','檢查電池、燈泡、接點與電線',['改接家裡的插座','把電池兩端直接短接'],'本活動使用低壓電池模型。不能接家用插座，也不要直接短接電池兩端。','circ'));
  }
  if(k==='circ'&&lv===2){
   var faults=[['wire'],['switch'],['battery'],['bulb'],['wire','battery'],['switch','bulb']];
   q=faults.map(function(f,n){return task('circ-fix-'+n,'repair','觀察線索，選出要修的 '+f.length+' 個部位，再測試。','檢查電源、線路、開關與燈泡，依線索修復。一次一項確認原因，比全部亂換更有依據。',{faults:f,answer:f.slice(),budget:f.length});});
  }
  if(k==='water'&&lv===0){
   q=[['ice','water','加熱','把冰變成液態的水。','冰吸收熱量可以熔化成水；不是冰消失了。'],['water','ice','冷卻','把液態水變成冰。','水在適合的低溫條件下會凝固成冰。'],['water','vapor','加熱','讓液態水變成水蒸氣。','水吸收熱量能變成水蒸氣。水蒸氣是看不見的氣體；不必等到沸騰才有蒸發。'],['vapor','water','冷卻','讓水蒸氣變回小水滴。','水蒸氣遇冷可以凝結成液態小水滴。看得見的白霧通常是小水滴，不是水蒸氣本身。']].map(function(x,n){return task('water-phase-'+n,'phase',x[3],x[4],{from:x[0],to:x[1],answer:x[2],options:['加熱','冷卻']});});
   q.push(choice('water-vapor','畫面中的白霧與雲，主要是什麼？','小水滴或冰晶',['可以直接看見的水蒸氣','只有煙灰'],'水蒸氣是不可見氣體；雲中有微小水滴或冰晶。圖上的氣體圓點只是概念示意。','water'));
   q.push(choice('water-evap','沒有煮沸的濕衣服也會乾，為什麼？','水也能在未沸騰時蒸發',['水只能到沸點才會蒸發','布會把水變成石頭'],'蒸發可以發生在液體表面，不需要整杯水沸騰。','water'));
  }
  if(k==='water'&&lv===1){
   var variables=['風','溫暖程度','攤開程度'];
   q=Array.from({length:6},function(_,n){var axis=n%3,base=n<3?[0,0,0]:[1,1,1],goal=base[axis]?0:1;return task('water-fair-'+n,'fair','只研究「'+variables[axis]+'」：讓 B 與 A 只在這一項不同。','同款布、起始含水量與觀察時間相同，每次只改一項。這裡的乾燥程度是簡化模型，實際情況也受濕度等因素影響。',{axis:axis,base:base,target:base.map(function(v,j){return j===axis?goal:v}),variables:variables});});
  }
  if(k==='water'&&lv===2){
   q=[['海面上的水','蒸發成水蒸氣','遇冷凝結成雲滴','降水回到地面'],['遇冷凝結成雲滴','降水回到地面','流入河川與海洋','再次蒸發'],['降水到山坡','部分水沿地表流動','溪流匯入河川','河水流回海洋']].map(function(a,n){return task('water-order-'+n,'order','從「'+a[0]+'」開始，排出這條水滴旅行路線。','水在環境中循環。這只是其中一條路線，還可能滲入地下、被植物吸收或暫時儲存在冰雪中。',{items:a});});
   q.push(choice('water-cloud','高空水蒸氣冷卻形成雲滴，這個變化叫什麼？','凝結',['熔化','燃燒'],'水蒸氣從氣態變成液態小水滴，稱為凝結。','water'));
   q.push(choice('water-path','雨落到地面後，水只會立刻流回大海嗎？','還可能滲入土壤或暫時儲存',['每滴水都立刻回海洋','一定全部變成冰'],'水循環有許多路線，包含逕流、入滲、地下水和各種儲存。','water'));
   q.push(choice('water-sun','水循環中的蒸發，主要能量來源之一是什麼？','太陽提供的能量',['雲的顏色','月亮上的路燈'],'太陽能量驅動大量蒸發，重力也會影響降水與水的流動。','water'));
  }
  if(k==='plant'&&lv===0){
   var setups=[[0,1,1],[2,1,1],[1,0,1],[1,1,0],[1,1,2],[0,0,1]];
   q=setups.map(function(a,n){return task('plant-seed-'+n,'germinate',['乾燥的綠豆需要調整什麼？','種子泡到缺氧了，改善它的環境。','讓種子有可以呼吸的環境。','這裡太冷，替綠豆準備適合條件。','不要過熱，調整到適合發芽的條件。','綜合任務：讓綠豆得到需要的發芽條件。'][n],'這裡觀察綠豆：適量水分、氧氣與適合溫度有利發芽。土壤和光照不是綠豆發芽的必要條件；不同種子對光的需求可能不同。',{setup:a});});
  }
  if(k==='plant'&&lv===1){
   var days=[['土表乾了，葉片有點垂。','water','適量補水，保持排水，避免一直浸泡。'],['盆底積水，土很濕。','drain','先改善排水與積水，不是再加更多水。'],['長時間放在太暗的角落。','light','綠色植物通常需要適合的光來製造養分；不要突然曝曬在極強日光下。'],['土壤微濕，光照適合，小苗挺立。','observe','狀態合適時先觀察和紀錄，不必一直加水或肥料。'],['下雨後盆底又積水了。','drain','先排除積水，讓根有較好的呼吸環境。'],['經過幾天生長，土又偏乾。','water','依土壤和植物狀態補充適量水分，不固定無限澆水。']];
   q=days.map(function(d,n){return task('plant-care-'+n,'care','第 '+(n+1)+' 天：'+d[0],d[2],{day:n+1,answer:d[1],stage:n});});
  }
  if(k==='plant'&&lv===2){
   q=[['root','吸收土中的水和礦物質，也幫助固定植物。','根'],['stem','支持植物，並運送水與養分。','莖'],['leaf','多數綠色植物主要在這裡利用光製造養分。','葉'],['flower','與植物繁殖有關，可能吸引傳粉者。','花'],['fruit','包住或幫助保護種子。','果實'],['root','大風吹來時，也幫助植物抓住土壤。','根']].map(function(d,n){return task('plant-part-'+n,'part','找出負責這項工作的部位：'+d[1],d[2]+'的功能是：'+d[1],{answer:d[0]});});
  }
  if(k==='animal'){
   var animals=lv===1?shuffle([ANIMALS[0],ANIMALS[1],ANIMALS[2],ANIMALS[5]],R).concat(shuffle([ANIMALS[3],ANIMALS[4]],R)):shuffle([ANIMALS[0],ANIMALS[1],ANIMALS[2],ANIMALS[5]],R).concat(shuffle([ANIMALS[6],ANIMALS[7]],R));
   q=animals.map(function(a,n){
    if(lv===0){var wrong=shuffle(HABITATS.filter(function(_,j){return j!==a.habitat&&!(a.habitat===0&&j===1)&&!(a.habitat===1&&j===0)&&!(a.habitat===2&&j===3)&&!(a.habitat===3&&j===2)}),R).slice(0,2);return task('animal-home-'+a.key,'habitat','依觀察卡，替'+a.name+'選擇資源最合適的家。','要同時考慮食物、水、呼吸、遮蔽與活動空間，不只看背景顏色。這裡是適合條件的示意，不表示野生動物只有一種家。',{animal:a,answer:HABITATS[a.habitat],options:[HABITATS[a.habitat]].concat(wrong)});}
    if(lv===1){var mixed=a.key==='duck'||a.key==='chicken',distractors=(a.key==='rabbit'||a.key==='cow')?['meat','insects','fish']:(a.key==='lion'?['grass','carrot','grain']:['grass','grain','carrot']);return task('animal-food-'+a.key,'feed',mixed?'替雜食性的'+a.name+'搭配一種植物性與一種動物性食物。':a.key==='fish'?'替金魚選擇本牧場的金魚專用配方飼料。':'替'+a.name+'準備 '+a.foods.length+' 種合適食物。','這裡比較常見食性。'+(mixed?'鴨和雞可以吃植物性與動物性食物，是雜食性；此題可用不同搭配完成。':'不同動物需要的食物不同；實際照顧需依物種與專業建議安排。'),{animal:a,foodRule:mixed?'mixed':'exact',answer:a.foods,options:mixed?['grain','carrot','insects','fish']:shuffle(distractors,R).slice(0,4-a.foods.length).concat(a.foods)});}
    return task('animal-class-'+a.key,'classify','根據身體線索，'+a.name+'屬於哪一類？',a.clue+'分類要依身體構造與生活史，不能只用會不會飛。',{animal:a,answer:a.group,options:['哺乳類','鳥類','魚類','兩棲類']});
   });
  }
  // The final two missions add less scaffolding; explanations stay available after a try.
  return q.map(function(t,n){t.station=k;t.level=lv;t.grade=grade;t.phase=n<2?'觀察與操作':n<4?'應用挑戰':'證據推理';t.advanced=high&&n>=4&&t.mode!=='choice';return t;});
 }
 function connected(links,closed){if(links.length!==2)return false;var has=function(a,b){return links.some(function(l){return l[0]===a&&l[1]===b||l[0]===b&&l[1]===a});};return !!closed&&(has('bp','la')&&has('bm','lb')||has('bp','lb')&&has('bm','la'))&&!has('bp','bm');}
 function sameSet(a,b){return a.length===b.length&&a.every(function(x){return b.indexOf(x)>=0})&&new Set(a).size===a.length;}
 function evaluate(q,s){
  if(q.mode==='wire')return connected(s.links||[],!q.switch||s.closed);
  if(q.mode==='feed'&&q.foodRule==='mixed'){var selected=s.selected||[];return selected.length===2&&selected.some(function(x){return x==='grain'||x==='carrot'})&&selected.some(function(x){return x==='insects'||x==='fish'});}
  if(q.mode==='repair'||q.mode==='feed')return sameSet(s.selected||[],q.mode==='repair'?q.faults:q.answer);
  if(q.mode==='germinate')return (s.values||[]).join() === '1,1,1';
  if(q.mode==='fair')return (s.values||[]).join()===q.target.join();
  if(q.mode==='order')return (s.selected||[]).join('|')===q.items.join('|');
  return s.answer===q.answer;
 }
 function stars(first,total){var ratio=first/Math.max(1,total);return ratio>=.9?3:ratio>=.7?2:ratio>=.6?1:0;}
 function magneticStrength(distance){return Math.max(0,4-(+distance||1));}
 function dryModel(values){return 25+values[0]*25+values[1]*20+values[2]*15;}
 return {LEVELS:LEVELS,MATERIALS:MATERIALS,ANIMALS:ANIMALS,HABITATS:HABITATS,FOOD:FOOD,plan:plan,evaluate:evaluate,connected:connected,stars:stars,magneticStrength:magneticStrength,dryModel:dryModel,shuffle:shuffle};
});
