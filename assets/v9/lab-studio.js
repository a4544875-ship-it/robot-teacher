/* Nature Expedition II 1.0.0 — independent namespace, original Store integration. */
(function(global){'use strict';
const STATIONS=[
['magnet','磁力研究室','MAGNETIC LAB','🧲',['穿透與距離','鐵釘磁化','自製指北針'],'磁力浮空台','#d45d67'],
['circuit','電路工程師','CIRCUIT ENGINEER','💡',['串聯與並聯','開關設計','用電偵探'],'雙燈研究塔','#dcaa45'],
['moon','月相日曆','LUNAR CALENDAR','🌙',['七天後的月亮','升起與落下','觀測與方位'],'月相觀測儀','#8274be'],
['ecology','生態食物網','LIVING CONNECTIONS','🦊',['食物關係','少了一種生物','保育行動'],'森林保育屋','#49996f'],
['weather','氣象預報員','WEATHER STATION','⛅',['氣溫折線圖','雨量長條圖','生活預報'],'彩虹氣象塔','#5b9cb3'],
['temperature','溫度實驗室','THERMAL LAB','🌡️',['溫度計讀數','冷熱水混合','熱的旅行'],'暖光溫室','#d78352'],
['aquatic','水生家族池塘','AQUATIC GARDEN','🐟',['水生植物','魚的身體','水族箱設計'],'水族觀察池','#439f9b'],
['water','水的移動','WATER EXPLORER','💧',['毛細現象','虹吸任務','連通管'],'循環水景','#528dcc'],
['sun','太陽與影子','SOLAR COURTYARD','☀️',['影子的變化','找出方位','日晷觀察'],'日光觀測盤','#c59b36'],
['time','時間工坊','TIMEKEEPERS','⏳',['水鐘','沙漏','單擺'],'星砂鐘塔','#9c806b']
].map((s,i)=>({id:s[0],name:s[1],en:s[2],icon:s[3],levels:s[4],reward:s[5],color:s[6],advanced:i<5,art:'assets/nature2/'+s[0]+'.webp'}));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fresh(){return {version:1,seen:{},runs:{},stars:{},rewards:{},paid:{},badge:false}}
function normalize(raw){const p=fresh();if(!raw||typeof raw!=='object')return p;['seen','runs','stars','rewards','paid'].forEach(k=>{if(raw[k]&&typeof raw[k]==='object'&&!Array.isArray(raw[k]))p[k]=raw[k]});p.badge=!!raw.badge;return p}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function rating(correct,elapsed,limit){return correct===12&&elapsed<=limit?3:correct>=10?2:correct>=8?1:0}
const limits=[240,300,360];
function svg(inner,label,view='0 0 640 260'){return '<svg class="n2-diagram" viewBox="'+view+'" role="img" aria-label="'+esc(label)+'">'+inner+'</svg>'}
function text(x,y,s,size=18,color='#254a55'){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="'+size+'" fill="'+color+'">'+esc(s)+'</text>'}
function chart(v){let values=v.values.map(Number),max=Math.max(1,...values),min=Math.min(0,...values),range=max-min||1;const y=n=>210-(n-min)/range*160,x=i=>90+i*460/Math.max(1,values.length-1);let s='';for(let i=0;i<5;i++){let value=min+range*i/4,yy=y(value);s+='<path d="M60 '+yy+'H610" stroke="#d3e3e5"/>'+text(30,yy+5,Math.round(value*10)/10,13)}s+=text(43,25,v.unit||'',14);values.forEach((n,i)=>{const xx=v.type==='bar'?90+(i+.5)*490/values.length:x(i);if(v.type==='bar'){let zero=y(0),yn=y(n);s+='<rect x="'+(xx-18)+'" y="'+Math.min(zero,yn)+'" width="36" height="'+Math.max(2,Math.abs(zero-yn))+'" rx="5" fill="#479ca5"/>'}else{if(i)s+='<path d="M'+x(i-1)+' '+y(values[i-1])+'L'+xx+' '+y(n)+'" stroke="#dc9461" stroke-width="4"/>';s+='<circle cx="'+xx+'" cy="'+y(n)+'" r="6" fill="#b77240"/>'}s+=text(xx,y(n)-12,n,15)+text(xx,240,v.labels[i],13)});return svg(s,'圖表：'+v.labels.map((l,i)=>l+' '+values[i]+(v.unit||'')).join('，'))}
function moon(phase){phase=(phase%8+8)%8;let s='<rect width="640" height="260" rx="24" fill="#182e4b"/>';const names=['新月','眉月','上弦月','盈凸月','滿月','虧凸月','下弦月','殘月'];const r=76,cx=320,cy=125;for(let i=0;i<8;i++){let a=i*Math.PI/4;s+='<circle cx="'+(cx+Math.sin(a)*230)+'" cy="'+(cy+Math.cos(a)*90)+'" r="2" fill="#c5dcf4"/>'}s+='<circle cx="320" cy="125" r="76" fill="#283c57"/>';if(phase===4)s+='<circle cx="320" cy="125" r="76" fill="#f4e1b6"/>';else if(phase!==0){let waxing=phase<4,lit=phase===2||phase===6?.5:phase===1||phase===7?.146:.854;for(let yy=-75;yy<=75;yy+=2){let xr=Math.sqrt(r*r-yy*yy),boundary=(1-2*lit)*xr,start=waxing?boundary:-xr,end=waxing?xr:-boundary;s+='<path d="M'+(cx+start)+' '+(cy+yy)+'H'+(cx+end)+'" stroke="#f4e1b6" stroke-width="2.1"/>'}}s+=text(320,238,names[phase],22,'#f4e1b6');return svg(s,'示意月相：'+names[phase]+'；北半球標準示意，不代表天空實際旋轉角度')}
function thermometer(value){let lo=Math.min(-20,Math.floor(value/10)*10),hi=Math.max(100,Math.ceil(value/10)*10),Y=t=>210-(t-lo)/(hi-lo)*180,s='<rect x="275" y="20" width="38" height="202" rx="18" fill="#fff" stroke="#4e7a85" stroke-width="3"/><rect x="288" y="'+Y(value)+'" width="12" height="'+(218-Y(value))+'" fill="#d36f61"/><circle cx="294" cy="220" r="20" fill="#d36f61"/>';for(let t=lo;t<=hi;t+=10){s+='<path d="M317 '+Y(t)+'h'+(t%20===0?22:12)+'" stroke="#476b76"/>';if(t%20===0)s+=text(365,Y(t)+5,t,15)}return svg(s+text(440,120,'°C',24),'溫度計刻度示意，請讀紅色液柱頂端')}
function visual(v){if(!v)return '';if(v.type==='line'||v.type==='bar')return chart(v);if(v.type==='moon')return moon(v.phase);if(v.type==='thermometer')return thermometer(v.value);if(v.type==='pendulum')return pendulum(v.length||50);if(v.type==='shadow')return shadow(v.direction||'東',v.length||80);if(v.type==='water')return waterDiagram(v.left||65,v.right||35,false);return ''}
function pendulum(len){let h=60+Number(len)*1.2;return svg('<path d="M170 28h300" stroke="#52717d" stroke-width="10"/><g class="n2-pendulum" style="--period:'+ (1.1*Math.sqrt(Number(len)/25))+'s"><path d="M320 30V'+(30+h)+'" stroke="#b89a65" stroke-width="5"/><circle cx="320" cy="'+(30+h)+'" r="20" fill="#4e9fa5"/></g>'+text(530,130,'擺長 '+len+' cm',20),'小角度單擺模型，擺長 '+len+' 公分')}
function shadow(direction,length){const vec={'東':[1,0],'西':[-1,0],'南':[0,1],'北':[0,-1]}[direction]||[1,0];const sx=320+vec[0]*170,sy=130+vec[1]*85;return svg('<ellipse cx="320" cy="160" rx="220" ry="70" fill="#e6d9b4"/><path d="M320 145L'+(320-vec[0]*length)+' '+(145-vec[1]*length*.6)+'" stroke="#546476" stroke-width="15" stroke-linecap="round"/><path d="M320 145V85" stroke="#af824b" stroke-width="8"/><circle cx="'+sx+'" cy="'+sy+'" r="25" fill="#edbe58"/>'+text(320,25,'北',15)+text(320,248,'南',15)+text(55,140,'西',15)+text(585,140,'東',15),'俯視方位示意：太陽在'+direction+'側，影子指向相反方向')}
function waterDiagram(left,right,joined){return svg('<path d="M165 35V210H470V35" fill="none" stroke="#80b6c3" stroke-width="45"/><path d="M165 '+(210-left*1.5)+'V210H470V'+(210-right*1.5)+'" fill="none" stroke="#60b5d6" stroke-width="29"/>'+text(170,245,'左側',16)+text(470,245,'右側',16)+text(320,35,joined?'同液體・同氣壓・水面等高':'示意容器',16),'連通管水位示意')}
function laboratory(st){let id=st.id,controls='',info='操作模型觀察，再開始 12 題挑戰。';const range=(label,key,min,max,value,unit='')=>'<label>'+label+' <output data-out="'+key+'">'+value+unit+'</output><input data-lab="'+key+'" type="range" min="'+min+'" max="'+max+'" value="'+value+'"></label>';const select=(label,key,items)=>'<label>'+label+'<select data-lab="'+key+'">'+items.map((t,i)=>'<option value="'+i+'">'+t+'</option>').join('')+'</select></label>';
if(id==='magnet')controls=range('磁鐵距離','a',1,10,3,' 格')+select('隔層','b',['紙張','清水','塑膠板']);
if(id==='circuit')controls=select('接法','a',['兩顆相同燈泡串聯','兩顆相同燈泡並聯'])+select('開關','b',['全部閉合','打開一個開關']);
if(id==='moon')controls=range('月相進程','a',0,7,0)+'';
if(id==='ecology')controls=select('環境事件','a',['草地正常','草減少','兔的捕食者減少']);
if(id==='weather')controls=select('觀察資料','a',['一週氣溫','一週雨量']);
if(id==='temperature')controls=range('冷水','a',0,40,20,' °C')+range('熱水','b',40,80,60,' °C');
if(id==='aquatic')controls=select('觀察植物','a',['浮葉植物：睡蓮','沉水植物：水蘊草','挺水植物：香蒲']);
if(id==='water')controls=select('觀察裝置','a',['連通管平衡','虹吸高處流向低處','紙巾毛細吸水']);
if(id==='sun')controls=select('太陽所在方位','a',['東','西','南','北'])+range('太陽高度示意','b',10,80,30,' 度');
if(id==='time')controls=range('單擺長度','a',15,100,45,' cm');
return '<section class="n2-lab"><div><small>先動手觀察</small><h3>'+st.icon+' 研究工作台</h3><p>模型是概念示意，非精密實驗或真實天文預報。</p>'+controls+'</div><div><div id="n2LabVisual"></div><p id="n2LabInfo" role="status">'+info+'</p></div></section>'}
function updateLab(root,st){let get=k=>Number(root.querySelector('[data-lab="'+k+'"]')?.value||0),a=get('a'),b=get('b'),v='',info='';root.querySelectorAll('[data-lab]').forEach(e=>{let out=root.querySelector('[data-out="'+e.dataset.lab+'"]');if(out)out.textContent=e.value});switch(st.id){
case'magnet':v=svg('<rect x="90" y="85" width="90" height="60" rx="12" fill="#d76a69"/>'+text(135,123,'N',28,'white')+'<rect x="180" y="85" width="90" height="60" rx="12" fill="#629bbd"/>'+text(225,123,'S',28,'white')+'<rect x="295" y="40" width="18" height="160" fill="'+['#ebd9b6','#7cc5dd','#a1cbbc'][b]+'"/>'+text(300,230,['紙張','水','塑膠'][b],16)+'<path d="M'+(315+a*18)+' 110v55m-12-55h24" stroke="#6c7b86" stroke-width="7"/>'+text(440,50,'距離 '+a+' 格',20),'磁力距離示意');info='紙、水和塑膠不會直接讓磁力消失；距離增加通常會使吸引效果減弱。是否移動還受摩擦等影響。';break;
case'circuit':{let wire='fill="none" stroke="#638f99" stroke-width="5"',g='<path d="M100 150V55H500V220H100V195" '+wire+'/>';
if(a)g+='<path d="M100 125H500" '+wire+'/>';
let lamps=a?[[300,55,true],[300,125,b===0]]:[[240,55,b===0],[400,55,b===0]];
g+=lamps.map(([x,y,lit],i)=>'<circle cx="'+x+'" cy="'+y+'" r="25" fill="'+(lit?(a?'#ffd96a':'#c7ad64'):'#8e9da5')+'" stroke="#466674" stroke-width="3"/>'+text(x,y+7,String(i+1),20)).join('');
let sy=a?125:55;g+='<path d="M155 '+sy+'H195" stroke="#f5fafb" stroke-width="12"/><path d="M155 '+sy+'L195 '+(b?sy-22:sy)+'" '+wire+'/>';
g+='<rect x="78" y="150" width="44" height="45" rx="6" fill="#456478"/>'+text(100,168,'＋',14,'white')+text(100,188,'－',14,'white');
v=svg(g+text(320,245,a?'並聯：各燈有自己的支路':'串聯：電流只有一條路徑',18),'低電壓電路概念示意');info='假設同一理想電池、相同燈泡與良好導線。並聯各燈泡通常比兩燈串聯時亮；串聯任一處斷開，全路不通。';break}
case'moon':v=moon(a);info='每格約為八分之一週期；7 天約前進兩格。升落時間只能說大約，確切時間隨日期與地點改變。';break;
case'ecology':v=svg(text(120,110,'草',44)+text(320,110,'兔',44)+text(520,110,'狐',44)+'<path d="M170 95h90l-15-12m15 12-15 12M370 95h90l-15-12m15 12-15 12" fill="none" stroke="#699b80" stroke-width="5"/>'+text(320,195,['環境正常','草減少 → 兔的食物可能不足','捕食者減少 → 兔可能增加'][a],21),'簡化食物鏈，箭頭由食物指向攝食者');info='這是只考慮部分關係的模型。真實族群也受疾病、氣候和其他食物影響，不會只有一個固定結果。';break;
case'weather':v=chart({type:a?'bar':'line',labels:['一','二','三','四','五'],values:a?[0,10,25,5,15]:[22,25,23,28,24],unit:a?'mm':'°C'});info='先看標題、單位與橫軸，再比較。這組是練習資料，不是真實天氣預報。';break;
case'temperature':v=svg(text(140,80,a+' °C',32)+text(500,80,b+' °C',32)+'<path d="M170 105L290 160M470 105L350 160" stroke="#84b6be" stroke-width="8"/>'+text(320,210,((a+b)/2)+' °C',42),'等量冷熱水混合的理想模型');info='等量的水、無熱散失、不計容器吸熱且沒有相變時，混合溫度取兩者平均。實際實驗會有差異。';break;
case'aquatic':v=svg('<rect x="70" y="115" width="500" height="100" rx="15" fill="#9edce7"/><path d="M80 215H560" stroke="#b8a177" stroke-width="18"/><path d="M320 205V'+[112,150,40][a]+'" stroke="#599e69" stroke-width="8"/><ellipse cx="320" cy="'+[112,150,40][a]+'" rx="'+[55,25,14][a]+'" ry="'+[8,12,30][a]+'" fill="#5aab79"/>'+text(320,250,['葉片浮在水面','植株大部分沉在水下','莖葉挺出水面'][a],18),'水生植物生活型示意');info='睡蓮屬浮葉植物，根通常固定在底泥；不要與整株漂浮、根不固定的漂浮植物混為一談。';break;
case'water':v=a===0?waterDiagram(70,70,true):svg('<rect x="100" y="70" width="150" height="125" rx="10" fill="#a9dce9"/><rect x="400" y="160" width="150" height="70" rx="10" fill="#a9dce9"/>'+(a===1?'<path d="M170 170V35Q170 10 210 35L475 180" fill="none" stroke="#4f9db8" stroke-width="12"/>':'<path d="M190 170V30" stroke="#efdfb9" stroke-width="22"/><path d="M190 170V80" stroke="#5ca6bf" stroke-width="15"/>')+text(320,255,a===1?'管內先充水，出口低於來源水面':'紙巾的細小孔隙吸水',17),'水的移動概念示意');info=a===0?'同種液體靜止、兩端受相同氣壓，忽略毛細效應時，連通管水面等高。':a===1?'虹吸需要連續水柱及適當高低差；只能用安全注水方式預充，不用嘴吸管。':'毛細現象能讓水沿細小孔隙移動，不代表水能無限升高。';break;
case'sun':v=shadow(['東','西','南','北'][a],Math.min(155,35/Math.tan(b*Math.PI/180)));info='影子朝向光源的相反方向；同一根直立桿，太陽越高，影子通常越短。方位以題目給定為準。';break;
case'time':v=pendulum(a);info='相同環境、小角度擺動時，擺長越長，來回一次所需時間通常越長；模型動畫只表現相對快慢。';break}
root.querySelector('#n2LabVisual').innerHTML=v;root.querySelector('#n2LabInfo').textContent=info}

global.LabStudio={html:function(id){return laboratory(STATIONS.find(s=>s.id===id))},bind:function(root,id){var st=STATIONS.find(s=>s.id===id);root.querySelectorAll("[data-lab]").forEach(e=>e.oninput=()=>updateLab(root,st));updateLab(root,st)}};})(window);