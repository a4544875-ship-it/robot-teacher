/* v10 自動進度（英文、數學）
   - 依學校行事曆（上學期 8/31 開學、下學期預設 2027/2/15）算出「學校現在教到第幾單元」，孩子不用自己選年級或單元。
   - 家長可以手動調整「學校教到哪」、下學期開學日、最多可以超前幾個單元。
   - 目前單元在一輪裡第一次作答正確率 ≥ 90%，而且這個單元累計答了 ≥ 20 題，就自動前進下一個單元（最多超前行事曆 cap 個單元）。
   - 答錯的題目進錯題箱（Leitner 間隔複習：下一輪／1／3／7／14 天），之後每輪最多 30% 是錯題複習。
   資料：kid.pg = {gy, s2, cap, mo:{k,o}, eo:{k,o}, m:{k,a,st,rv}, e:{k,a,st,rv}}
     k = 學期代號（例如 3a2026 = 三年級上學期、2026 學年），a = 已經靠熟練前進到的單元序號，
     st[單元] = [答題數, 答對數]（只算第一次作答），rv[題目] = [箱子, 到期日, 錯幾次, 答案, 選項, 單元, 題型]。 */
(function(global){
'use strict';

/* ---------------- 行事曆 ---------------- */
function ymd(s){var p=String(s).split('-');return new Date(+p[0],+p[1]-1,+p[2])}
function monOnAfter(d){d=new Date(d.getFullYear(),d.getMonth(),d.getDate());while(d.getDay()!==1)d.setDate(d.getDate()+1);return d}
function upStart(y){return y===2026?ymd('2026-08-31'):monOnAfter(new Date(y,7,29))}
function okDate(s){return typeof s==='string'&&/^\d{4}-\d\d-\d\d$/.test(s)}
function downStart(ay,ov){if(okDate(ov)&&+ov.slice(0,4)===ay+1)return ymd(ov);return ay===2026?ymd('2027-02-15'):monOnAfter(new Date(ay+1,1,10))}
function sem(now,ov){var t=now||new Date();t=new Date(t.getFullYear(),t.getMonth(),t.getDate());var y=t.getFullYear(),ay,s;
  if(t>=upStart(y)){ay=y;s='a'}else{ay=y-1;s=t>=downStart(ay,ov)?'b':'a'}
  var st=s==='a'?upStart(ay):downStart(ay,ov);return {ay:ay,s:s,start:st,wk:Math.max(1,Math.floor((t-st)/864e5/7)+1)}}
function dayN(){var d=new Date();return Math.floor((d.getTime()-d.getTimezoneOffset()*6e4)/864e5)}
var IV=[0,1,3,7,14];/* 箱子 0：下一輪就複習；1～4：隔 1／3／7／14 天；箱子 4 再答對就畢業 */

/* ---------------- 數學題型 ---------------- */
function ri(R,a,b){return a+Math.floor(R()*(b-a+1))}
function pk(R,a){return a[Math.floor(R()*a.length)]}
function fx(n,d){return +(+n).toFixed(d==null?2:d)}
function dds(ans,st,d){var o=[fx(ans+st,d),fx(ans-st,d),fx(ans+st*10,d),fx(ans*10,d),fx(ans+st*2,d),fx(ans/10,d)],r=[];o.forEach(function(x){if(x>0&&x!==ans&&r.indexOf(x)<0)r.push(x)});return r}
function seq(R){var a=ri(R,1,20),s=ri(R,2,9),dn=R()<.3,o=[];if(dn)a+=s*5;for(var i=0;i<5;i++)o.push(dn?a-s*i:a+s*i);return o}
var SK={
  a100:{x:1,f:function(R){var a,c;if(R()<.5){a=ri(R,10,79);c=ri(R,1,99-a);return [a+' + '+c,a+c]}a=ri(R,20,98);c=ri(R,1,a-1);return [a+' − '+c,a-c]}},
  pv200:{f:function(R){var h=ri(R,0,1),t=ri(R,0,9),o=ri(R,0,9);if(!h&&!t)t=ri(R,1,9);return [(h?h+' 個百 ':'')+t+' 個十 '+o+' 個一',h*100+t*10+o]}},
  nx200:{f:function(R){var a=ri(R,20,189),d=pk(R,[[1,'多 1'],[-1,'少 1'],[10,'多 10'],[-10,'少 10']]);return ['比 '+a+' '+d[1]+' 的數',a+d[0]]}},
  v2:{x:1,f:function(R){var o,d,t,h,a,c;if(R()<.5){o=ri(R,1,9);d=10-o+ri(R,0,o-1);t=ri(R,1,6);h=ri(R,1,Math.max(1,7-t));a=t*10+o;c=h*10+d;return [a+' + '+c,a+c]}t=ri(R,3,8);o=ri(R,0,8);h=ri(R,1,t-2);d=o+1+ri(R,0,8-o);a=t*10+o;c=h*10+d;return [a+' − '+c,a-c]}},
  len:{f:function(R){var a=ri(R,3,17),c=ri(R,2,11);return R()<.5?[a+' 公分 + '+c+' 公分',a+c]:[(a+c)+' 公分 − '+c+' 公分',a]}},
  lenr:{f:function(R){var a=ri(R,12,30),c=ri(R,3,a-2);return ['鉛筆長 '+a+' 公分，橡皮擦長 '+c+' 公分，鉛筆比橡皮擦長幾公分',a-c]}},
  inv2:{f:function(R){var a=ri(R,10,59),c=ri(R,10,49);return R()<.5?['□ + '+c+' = '+(a+c)+'，□',a]:[(a+c)+' − □ = '+a+'，□',c]}},
  inv2b:{f:function(R){var a=ri(R,12,48),c=ri(R,5,30);return R()<.5?['小明有一些貼紙，又拿到 '+c+' 張，現在有 '+(a+c)+' 張，原來有幾張',a]:['盒子裡有一些糖，吃掉 '+c+' 顆後剩 '+a+' 顆，原來有幾顆',a+c]}},
  ar0:{f:function(R){var a=ri(R,6,20),b=ri(R,6,20);if(a===b)b++;return ['A 圖形佔 '+a+' 格、B 圖形佔 '+b+' 格，兩個相差幾格',Math.abs(a-b)]}},
  ar0c:{f:function(R){var a=ri(R,10,24),d=ri(R,2,8);return ['長方形 A 有 '+a+' 格，比 B 多 '+d+' 格，B 有幾格',a-d]}},
  two:{x:1,f:function(R){var a=ri(R,20,69),c=ri(R,10,39),d=ri(R,5,Math.min(44,a+c-6));return [a+' + '+c+' − '+d,a+c-d]}},
  m2548:{x:1,f:function(R){var a=pk(R,[2,5,4,8]),c=ri(R,1,9);return R()<.5?[a+' × '+c,a*c]:[c+' × '+a,a*c]}},
  wm2548:{f:function(R){var a=pk(R,[2,5,4,8]),c=ri(R,2,9),t=pk(R,[['每盒有 ',' 顆巧克力，',' 盒共有幾顆'],['每輛車有 ',' 個輪子，',' 輛共有幾個'],['一包有 ',' 枝筆，',' 包共有幾枝']]);return [t[0]+a+t[1]+c+t[2],a*c]}},
  m3697:{x:1,f:function(R){var a=pk(R,[3,6,9,7]),c=ri(R,1,9);return R()<.5?[a+' × '+c,a*c]:[c+' × '+a,a*c]}},
  wm3697:{f:function(R){var a=pk(R,[3,6,9,7]),c=ri(R,2,9),t=pk(R,[['每盤有 ',' 個水餃，',' 盤共有幾個'],['一星期有 ',' 天，',' 星期是幾天'],['每串有 ',' 顆葡萄，',' 串共有幾顆']]);if(t[0]==='一星期有 ')a=7;return [t[0]+a+t[1]+c+t[2],a*c]}},
  tt:{x:1,f:function(R){var a=ri(R,2,9),c=ri(R,2,9);return [a+' × '+c,a*c]}},
  wtt:{f:function(R){var a=ri(R,2,9),c=ri(R,2,9);return ['一排坐 '+a+' 人，'+c+' 排共坐幾人',a*c]}},
  tm1:{f:function(R){var m=ri(R,1,11);return ['時鐘的長針指在 '+m+'，是幾分',m*5]}},
  tm2:{f:function(R){var h=ri(R,1,11),m=5*ri(R,0,8),d=5*ri(R,1,Math.min(4,11-m/5));return [h+' 時 '+m+' 分再過 '+d+' 分，是 '+h+' 時幾分',m+d]}},
  tm2b:{f:function(R){var x=pk(R,[['1 小時是幾分鐘',60],['半小時是幾分鐘',30],['長針走一圈是幾分鐘',60],['長針從 12 走到 3 是幾分鐘',15],['長針從 12 走到 6 是幾分鐘',30]]);return [x[0],x[1]]}},
  cap1:{f:function(R){var b=ri(R,6,14),s=ri(R,2,b-2);return ['大水壺可以倒滿 '+b+' 杯，小水壺可以倒滿 '+s+' 杯，大水壺多倒幾杯',b-s]}},
  wt1:{f:function(R){var a=ri(R,8,20),b=ri(R,2,a-2);return ['西瓜重 '+a+' 個積木，蘋果重 '+b+' 個積木，西瓜比蘋果重幾個積木',a-b]}},
  pv1000:{f:function(R){var h=ri(R,1,9),t=ri(R,0,9),o=ri(R,0,9);return [h+' 個百 '+t+' 個十 '+o+' 個一',h*100+t*10+o]}},
  nx1000:{f:function(R){var a=ri(R,110,889),d=pk(R,[[1,'多 1'],[10,'多 10'],[100,'多 100'],[-10,'少 10'],[-100,'少 100']]);return ['比 '+a+' '+d[1]+' 的數',a+d[0]]}},
  v3:{x:1,f:function(R){var a,c;if(R()<.5){a=ri(R,100,799);c=ri(R,10,989-a);return [a+' + '+c,a+c]}a=ri(R,200,998);c=ri(R,10,a-10);return [a+' − '+c,a-c]}},
  shp:{f:function(R){var s=pk(R,[['三角形',3],['四邊形',4],['五邊形',5],['六邊形',6],['正方形',4],['長方形',4]]),p=pk(R,['邊','角','頂點']);return [s[0]+'有幾個'+p,s[1]]}},
  shp2:{f:function(R){var s=pk(R,[['三角形',3],['正方形',4],['五邊形',5]]),n=ri(R,2,5);return [n+' 個'+s[0]+'一共有幾個邊',n*s[1]]}},
  ymd:{f:function(R){if(R()<.4){var w=ri(R,1,4),d=ri(R,1,6);return [w+' 星期又 '+d+' 天是幾天',w*7+d]}var x=pk(R,[['1 年有幾個月',12],['1 星期有幾天',7],['大月有幾天',31],['小月有幾天',30],['1 月有幾天',31],['4 月有幾天',30],['2 星期是幾天',14],['3 星期是幾天',21]]);return [x[0],x[1]]}},
  ymd2:{f:function(R){var a=ri(R,1,15),d=ri(R,2,12);return ['今天是 '+a+' 號，再過 '+d+' 天是幾號',a+d]}},
  two2:{x:1,f:function(R){var a=ri(R,2,9),b=ri(R,2,9),c=ri(R,1,20);return R()<.5?[a+' × '+b+' + '+c,a*b+c]:[a+' × '+b+' − '+Math.min(c,a*b-1),a*b-Math.min(c,a*b-1)]}},
  mcm:{f:function(R){var m=ri(R,1,3),c=R()<.25?0:ri(R,1,99);return c?[m+' 公尺 '+c+' 公分 = □ 公分，□',m*100+c]:[m+' 公尺 = □ 公分，□',m*100]}},
  mcm2:{f:function(R){var t=ri(R,110,399);if(t%100===0)t+=7;return [t+' 公分 = □ 公尺 '+(t%100)+' 公分，□',Math.floor(t/100)]}},
  mcm3:{f:function(R){var c=ri(R,10,90);return ['1 公尺 − '+c+' 公分 = □ 公分，□',100-c]}},
  sol:{f:function(R){if(R()<.3){var n=ri(R,2,4);return [n+' 個正方體一共有幾個面',6*n]}var x=pk(R,[['正方體有幾個面',6],['正方體有幾個頂點',8],['正方體有幾條邊',12],['長方體有幾個面',6],['長方體有幾個頂點',8],['長方體有幾條邊',12]]);return [x[0],x[1]]}},
  dv0:{f:function(R){var p=ri(R,2,6),n=ri(R,2,5);return R()<.5?[p*n+' 顆糖平分給 '+n+' 人，每人幾顆',p]:[p*n+' 顆糖，每 '+p+' 顆裝一袋，可以裝幾袋',n]}},
  fr0:{f:function(R){var n=ri(R,2,8),k=ri(R,1,n-1);return R()<.5?['一個披薩平分成 '+n+' 片，1 片是 □ 分之一，□',n]:['蛋糕平分成 '+n+' 塊，吃了 '+k+' 塊，是吃了 '+n+' 分之 □，□',k]}},
  pv1e4:{f:function(R){var h=ri(R,1,9),t=ri(R,0,9),o=ri(R,0,9),d=ri(R,0,9);return [h+' 個千 '+t+' 個百 '+o+' 個十 '+d+' 個一',h*1000+t*100+o*10+d]}},
  nx1e4:{f:function(R){var a=ri(R,1100,8800),d=pk(R,[[10,'多 10'],[100,'多 100'],[1000,'多 1000'],[-100,'少 100'],[-1000,'少 1000']]);return ['比 '+a+' '+d[1]+' 的數',a+d[0]]}},
  v4:{x:1,f:function(R){var a,c;if(R()<.5){a=ri(R,1000,6999);c=ri(R,100,2999);return [a+' + '+c,a+c]}a=ri(R,2000,9998);c=ri(R,100,a-1100);return [a+' − '+c,a-c]}},
  mm:{f:function(R){var a=ri(R,1,15),c=ri(R,0,9);return c?[a+' 公分 '+c+' 毫米 = □ 毫米，□',a*10+c]:[a+' 公分 = □ 毫米，□',a*10]}},
  mm2:{f:function(R){var v=ri(R,11,159);if(v%10===0)v+=3;return [v+' 毫米 = '+Math.floor(v/10)+' 公分 □ 毫米，□',v%10]}},
  mul1:{x:1,f:function(R){var a=ri(R,12,99),c=ri(R,2,9);return [a+' × '+c,a*c]}},
  mul3:{x:1,f:function(R){var a=ri(R,102,899),c=ri(R,2,9);return [a+' × '+c,a*c]}},
  wmul:{f:function(R){var a=ri(R,12,99),c=ri(R,2,9);return ['一箱有 '+a+' 瓶水，'+c+' 箱共有幾瓶',a*c]}},
  ang:{f:function(R){var x=pk(R,[['正方形有幾個直角',4],['長方形有幾個直角',4],['一個三角板有幾個直角',1],['兩個三角板共有幾個直角',2],['一個角有幾個頂點',1],['一個角有幾條邊',2],['三角形有幾個角',3]]);return [x[0],x[1]]}},
  ar1:{f:function(R){if(R()<.3){var s=ri(R,2,9);return ['正方形每邊排 '+s+' 個 1 平方公分，面積是幾平方公分',s*s]}var r=ri(R,2,6),c=ri(R,2,9);return ['長方形排了 '+r+' 排、每排 '+c+' 個 1 平方公分，面積是幾平方公分',r*c]}},
  div1:{x:1,f:function(R){var c=ri(R,2,9),d=ri(R,2,12);return [(c*d)+' ÷ '+c,d]}},
  divr:{f:function(R){var c=ri(R,2,9),q=ri(R,2,12),m=ri(R,1,c-1);return [(c*q+m)+' ÷ '+c+' = '+q+' 餘 □，□',m]}},
  wdiv:{f:function(R){var c=ri(R,2,9),q=ri(R,2,9);return [c*q+' 片餅乾平分給 '+c+' 人，每人幾片',q]}},
  ml:{f:function(R){var a=ri(R,1,9);return [a+' 公升 = □ 毫升，□',a*1000]}},
  ml2:{f:function(R){var a=ri(R,1,5),c=50*ri(R,1,19);return [a+' 公升 '+c+' 毫升 = □ 毫升，□',a*1000+c]}},
  ml3:{f:function(R){var a=ri(R,1,5),c=50*ri(R,1,19);return [(a*1000+c)+' 毫升 = '+a+' 公升 □ 毫升，□',c]}},
  fr1:{f:function(R){var d=ri(R,3,9),k=ri(R,2,d);return R()<.6?[k+' 個 1/'+d+' 是 □/'+d+'，□',k]:['1 = □/'+d+'，□',d]}},
  fr1b:{f:function(R){var a=ri(R,2,9),b=ri(R,2,9);if(a===b)b=a+1;return ['1/'+a+' 和 1/'+b+' 比較大的那個，分母是 □，□',Math.min(a,b)]}},
  fr2:{f:function(R){var d=ri(R,4,12),a=ri(R,1,d-2),b=ri(R,1,d-a-1),t=ri(R,0,2);
    if(t===0)return [a+'/'+d+' + '+b+'/'+d+' = □/'+d+'，□',a+b];if(t===1)return [(a+b)+'/'+d+' − '+b+'/'+d+' = □/'+d+'，□',a];return ['1 − '+a+'/'+d+' = □/'+d+'，□',d-a]}},
  div2:{x:1,f:function(R){var c=ri(R,2,9),q=ri(R,12,99);return [(c*q)+' ÷ '+c,q]}},
  pat:{f:function(R){var s=seq(R);return [s.slice(0,4).join('、')+'、□，□',s[4]]}},
  kg:{f:function(R){var a=ri(R,1,6),c=R()<.25?0:50*ri(R,1,19);return c?[a+' 公斤 '+c+' 公克 = □ 公克，□',a*1000+c]:[a+' 公斤 = □ 公克，□',a*1000]}},
  kg3:{f:function(R){var a=ri(R,1,5),c=50*ri(R,1,19);return [(a*1000+c)+' 公克 = '+a+' 公斤 □ 公克，□',c]}},
  dec1:{d:1,f:function(R){var a=ri(R,1,8),b=ri(R,1,9-a),t=ri(R,0,3),ans,ex;
    if(t===0){ex='0.'+a+' + 0.'+b;ans=fx((a+b)/10,1)}else if(t===1){ex='0.'+(a+b)+' − 0.'+b;ans=fx(a/10,1)}else if(t===2){var k=ri(R,2,9);ex=k+' 個 0.1 是多少';ans=fx(k/10,1)}else{ex='1 − 0.'+a;ans=fx(1-a/10,1)}return [ex,ans,dds(ans,.1,1)]}},
  circ:{f:function(R){var r=ri(R,2,15);return R()<.5?['半徑 '+r+' 公分的圓，直徑是幾公分',2*r]:['直徑 '+2*r+' 公分的圓，半徑是幾公分',r]}},
  md2:{x:1,f:function(R){var c=ri(R,2,9),q=ri(R,2,12),b=ri(R,2,9);return R()<.5?[(c*q)+' ÷ '+c+' × '+b,q*b]:[q+' × '+c+' ÷ '+c,q]}},
  tm3:{f:function(R){var h=ri(R,1,3),m=5*ri(R,1,11);return [h+' 時 '+m+' 分 = □ 分，□',h*60+m]}},
  tm3b:{f:function(R){var t=ri(R,70,230);if(t%60===0)t+=5;return [t+' 分 = '+Math.floor(t/60)+' 時 □ 分，□',t%60]}},
  tm3c:{f:function(R){var h=ri(R,1,10),m=5*ri(R,7,11),d=5*ri(R,Math.ceil((60-m)/5),Math.min(11,Math.floor((119-m)/5)));return ['下午 '+h+' 時 '+m+' 分再過 '+d+' 分，是 '+(h+1)+' 時幾分',m+d-60]}},
  stat:{f:function(R){var a=ri(R,5,20),b=ri(R,5,20),c=ri(R,5,20),t='統計表：蘋果 '+a+' 人、香蕉 '+b+' 人、葡萄 '+c+' 人，';return R()<.5?[t+'一共幾人',a+b+c]:(Math.max(a,b,c)===Math.min(a,b,c)?[t+'一共幾人',a+b+c]:[t+'最多的比最少的多幾人',Math.max(a,b,c)-Math.min(a,b,c)])}},
  big:{f:function(R){var a=ri(R,1,99),b=ri(R,0,9),c=ri(R,0,9);return [a+' 個萬 '+b+' 個千 '+c+' 個百',a*10000+b*1000+c*100]}},
  nxbig:{f:function(R){var v=ri(R,10000,89999),d=pk(R,[[1000,'多 1000'],[10000,'多 10000'],[-1000,'少 1000']]);return ['比 '+v+' '+d[1]+' 的數',v+d[0]]}},
  mul2:{x:1,f:function(R){var a=ri(R,101,499),c=ri(R,11,39);return [a+' × '+c,a*c]}},
  deg:{f:function(R){if(R()<.5){var a=ri(R,20,80),t=R()<.5;return t?['直角 − '+a+' 度 = □ 度，□',90-a]:['平角 − '+a+' 度 = □ 度，□',180-a]}var x=pk(R,[['直角是幾度',90],['平角是幾度',180],['一圈是幾度',360],['三角板的 30 度角和 60 度角合起來是幾度',90],['2 個 45 度合起來是幾度',90]]);return [x[0],x[1]]}},
  div3:{x:1,f:function(R){var c=ri(R,12,39),q=ri(R,3,25);return [(c*q)+' ÷ '+c,q]}},
  km:{f:function(R){var a=ri(R,1,9),c=ri(R,1,999),t=ri(R,0,2);if(t===0)return [a+' 公里 = □ 公尺，□',a*1000];if(t===1)return [a+' 公里 '+c+' 公尺 = □ 公尺，□',a*1000+c];return [(a*1000+c)+' 公尺 = '+a+' 公里 □ 公尺，□',c]}},
  tri:{f:function(R){var s=ri(R,3,15),l=ri(R,5,15),b=ri(R,3,9),t=ri(R,0,2);if(t===0)return ['正三角形每邊 '+s+' 公分，周長幾公分',3*s];if(t===1)return ['等腰三角形兩腰各 '+l+' 公分、底 '+b+' 公分，周長幾公分',2*l+b];return ['正三角形周長 '+3*s+' 公分，每邊幾公分',s]}},
  dec2:{d:1,f:function(R){var a=ri(R,101,899),b=ri(R,11,99),t=ri(R,0,2),ans,ex;
    if(t===0){ex=fx(a/100)+' + '+fx(b/100);ans=fx((a+b)/100)}else if(t===1){ex=fx(a/100)+' − '+fx(b/100);ans=fx((a-b)/100)}else{ex=fx(a/100)+' 是幾個 0.01';ans=a}return [ex,ans,t===2?[a+1,a*10,Math.floor(a/10),a-1]:dds(ans,.01,2).concat(dds(ans,.1,2))]}},
  ord:{x:1,f:function(R){var a=ri(R,10,60),b=ri(R,2,9),c=ri(R,2,9),t=ri(R,0,2);if(t===0)return [a+' + '+b+' × '+c,a+b*c];if(t===1)return ['('+a+' + '+b+') × '+c,(a+b)*c];var q=ri(R,2,9);return [a+' − '+(b*q)+' ÷ '+b,a-q]}},
  fr3:{f:function(R){var d=ri(R,3,9),w=ri(R,1,3),k=ri(R,1,d-1);return R()<.5?[(w*d+k)+'/'+d+' = '+w+' 又 □/'+d+'，□',k]:[w+' 又 '+k+'/'+d+' = □/'+d+'，□',w*d+k]}},
  stat2:{f:function(R){var v=[ri(R,5,30),ri(R,5,30),ri(R,5,30),ri(R,5,30)],t='長條圖：星期一 '+v[0]+'、二 '+v[1]+'、三 '+v[2]+'、四 '+v[3]+' 本，';return R()<.5?[t+'最多的一天是幾本',Math.max.apply(null,v)]:[t+'四天一共幾本',v[0]+v[1]+v[2]+v[3]]}},
  mul4:{x:1,f:function(R){var a=ri(R,2,9),b=ri(R,2,9);return R()<.5?[(a*100)+' × '+(b*10),a*b*1000]:[(a*b*100)+' ÷ '+(b*10),a*10]}},
  quad:{f:function(R){if(R()<.3){var s=ri(R,3,12);return ['菱形每邊 '+s+' 公分，周長幾公分',4*s]}var x=pk(R,[['平行四邊形有幾組平行的對邊',2],['梯形只有幾組平行的對邊',1],['長方形 4 個角加起來是幾度',360],['正方形有幾條對角線',2],['四邊形有幾個頂點',4]]);return [x[0],x[1]]}},
  rnd:{f:function(R){var v=ri(R,1001,99999),p=pk(R,[[10,'十'],[100,'百'],[1000,'千']]);if(v%p[0]===0)v+=3;var a=Math.round(v/p[0])*p[0],lo=Math.floor(v/p[0])*p[0],hi=lo+p[0];return [v+' 四捨五入到'+p[1]+'位',a,[a===lo?hi:lo,a+p[0]*10,Math.max(p[0],a-p[0]*10),a*10]]}},
  pat2:{f:function(R){var n=ri(R,4,9);return R()<.5?['1 個正方形用 4 根牙籤，2 個連在一起用 7 根，'+n+' 個連在一起用幾根',3*n+1]:['第 1 層 1 個、第 2 層 3 個、第 3 層 5 個，第 '+n+' 層有幾個',2*n-1]}},
  dm:{d:1,f:function(R){var a=fx(ri(R,1,29)/10,1),b=ri(R,2,9),ans=fx(a*b,1);return [a+' × '+b,ans,dds(ans,.1,1).concat(dds(ans,1,1))]}},
  pa:{f:function(R){var l=ri(R,4,15),w=ri(R,2,l-1),t=ri(R,0,2);if(t===0)return ['長 '+l+' 公分、寬 '+w+' 公分的長方形，面積是幾平方公分',l*w];if(t===1)return ['長 '+l+' 公分、寬 '+w+' 公分的長方形，周長是幾公分',2*(l+w)];return ['邊長 '+w+' 公分的正方形，面積是幾平方公分',w*w]}},
  eqf:{f:function(R){var b=ri(R,2,6),a=ri(R,1,b-1),k=ri(R,2,5);return R()<.5?[a+'/'+b+' = □/'+(b*k)+'，□',a*k]:[(a*k)+'/'+(b*k)+' = '+a+'/□，□',b]}},
  simp:{x:1,f:function(R){var n=ri(R,2,9),t=ri(R,0,2);if(t===0)return ['25 × '+n+' × 4',100*n];if(t===1)return ['99 × '+n,99*n];var a=ri(R,11,49),b=ri(R,1,9);return [a+' × '+b+' + '+a+' × '+(10-b),a*10]}},
  tm4:{f:function(R){if(R()<.3){var d=ri(R,1,3);return [d+' 天是幾小時',24*d]}var h1=ri(R,1,4),m1=5*ri(R,1,11),h2=ri(R,1,4),m2=5*ri(R,1,11),t=h1*60+m1+h2*60+m2;return [h1+' 時 '+m1+' 分 + '+h2+' 時 '+m2+' 分 = □ 時 '+(t%60)+' 分，□',Math.floor(t/60)]}},
  vol:{f:function(R){if(R()<.35){var s=ri(R,2,5);return ['邊長 '+s+' 公分的正方體，體積是幾立方公分',s*s*s]}var a=ri(R,2,6),b=ri(R,2,6),c=ri(R,2,6);return ['長 '+a+'、寬 '+b+'、高 '+c+' 公分的長方體，體積是幾立方公分',a*b*c]}}
};

/* ---------------- 課程：康軒數學（二～四年級，上 a／下 b）[代號, 名稱, 開始週, 結束週, 題型] ---------------- */
var MATH={
  2:{a:[['r1','200 以內的數',1,2,['pv200','nx200','a100']],['r2','二位數的直式加減',3,5,['v2']],['r3','量長度',6,7,['len','lenr']],['r4','加減關係與應用',8,9,['inv2','inv2b']],['r5','面積的大小比較',10,10,['ar0','ar0c']],
       ['r6','兩步驟的加減',11,12,['two']],['r7','2、5、4、8 的乘法',13,14,['m2548','wm2548']],['r8','幾時幾分',15,16,['tm1','tm2','tm2b']],['r9','3、6、9、7 的乘法',17,18,['m3697','wm3697']],['r10','容量與重量',19,21,['cap1','wt1']]],
     b:[['s1','1000 以內的數',1,2,['pv1000','nx1000']],['s2','三位數的加減',3,4,['v3']],['s3','平面圖形',5,6,['shp','shp2']],['s4','年月日',7,8,['ymd','ymd2']],['s5','乘法',9,10,['tt','wtt']],
       ['s6','兩步驟應用問題',11,12,['two2']],['s7','公尺和公分',13,14,['mcm','mcm2','mcm3']],['s8','分類與立體形體',15,16,['sol']],['s9','分分看',17,18,['dv0']],['s10','分數',19,21,['fr0']]]},
  3:{a:[['d1','10000 以內的數',1,2,['pv1e4','nx1e4']],['d2','四位數的加減',3,5,['v4']],['d3','毫米',6,7,['mm','mm2']],['d4','乘法',8,9,['mul1','mul3','wmul']],['d5','角',10,11,['ang']],
       ['d6','面積',12,13,['ar1']],['d7','除法',14,16,['div1','divr','wdiv']],['d8','公升和毫升',17,18,['ml','ml2','ml3']],['d9','分數',19,21,['fr1','fr1b']]],
     b:[['t1','分數的加減',1,2,['fr2']],['t2','除法',3,4,['div2','divr']],['t3','尋找規律',5,6,['pat']],['t4','公斤和公克',7,9,['kg','kg3']],['t5','小數',10,11,['dec1']],
       ['t6','圓',12,13,['circ']],['t7','乘法與除法',14,15,['md2']],['t8','時間',16,18,['tm3','tm3b','tm3c']],['t9','統計表',19,21,['stat']]]},
  4:{a:[['f1','一億以內的數',1,2,['big','nxbig']],['f2','整數的乘法',3,4,['mul2']],['f3','角度',5,6,['deg']],['f4','整數的除法',7,8,['div3']],['f5','公里',9,10,['km']],
       ['f6','三角形',11,12,['tri']],['f7','小數',13,14,['dec2']],['f8','整數四則計算',15,16,['ord']],['f9','分數',17,18,['fr3']],['f10','統計圖',19,21,['stat2']]],
     b:[['h1','多位數的乘與除',1,2,['mul4']],['h2','四邊形',3,4,['quad']],['h3','概數',5,6,['rnd']],['h4','數量規律',7,8,['pat2']],['h5','小數乘法',9,10,['dm']],
       ['h6','周長與面積',11,12,['pa']],['h7','等值分數',13,14,['eqf']],['h8','簡化計算',15,16,['simp']],['h9','時間的計算',17,18,['tm4']],['h10','立方公分',19,21,['vol']]]}};
var BOOK={2:{a:'二上（第 3 冊）',b:'二下（第 4 冊）'},3:{a:'三上（第 5 冊）',b:'三下（第 6 冊）'},4:{a:'四上（第 7 冊）',b:'四下（第 8 冊）'}};

/* ---------------- 課程：英文（三、四年級康軒 Wonder World；二年級暫用主題單元） ---------------- */
var EN={
  2:{a:[['e2a1','數字 1～5',1,3,['one','two','three','four','five']],['e2a2','動物',4,7,['cat','dog','pig','fish','bird','cow','duck','bee']],['e2a3','顏色',8,10,['red','blue','green','yellow','pink']],
       ['e2a4','我的東西',11,14,['book','bag','hat','pen','cup','box','key','ball']],['e2a5','好吃的食物',15,18,['egg','cake','milk','bread','apple','banana','burger','pizza']],['e2a6','交通與大自然',19,21,['car','bike','boat','train','sun','moon','tree','rain']]],
     b:[['e2b1','數字 6～10',1,3,['six','seven','eight','nine','ten']],['e2b2','我的身體',4,7,['hand','foot','nose','eye','ear','mouth','head']],['e2b3','我的家',8,11,['bed','door','clock','window','chair']],
       ['e2b4','更多動物',12,15,['rabbit','tiger','frog','horse','sheep','monkey']],['e2b5','水果和點心',16,18,['grape','orange','fries','carrot','donut','cheese','toast','juice']],['e2b6','天氣',19,21,['sun','rain','cloud','snow','star','rainbow']]]},
  3:{a:[['e3a1','Get Ready 數字 1～5',1,1,['one','two','three','four','five']],['e3a2','Unit 1 How old are you?',2,4,['six','seven','eight','nine','ten']],['e3a3','Unit 2 Are you hungry?',5,10,['angry','happy','sad','hungry','thirsty']],
       ['e3a4','Unit 3 What’s this?',11,14,['ball','car','doll','kite','robot']],['e3a5','Unit 4 What color is it?',15,21,['blue','green','pink','purple','red','yellow']]],
     b:[['e3b1','Get Ready 數字 11～15',1,1,['eleven','twelve','thirteen','fourteen','fifteen']],['e3b2','Unit 1 Is it a cat?',2,5,['bird','cat','dog','frog','rabbit','ox']],['e3b3','Unit 2 Can you dance?',6,10,['dance','draw','sing','swim','fly','ride']],
       ['e3b4','Unit 3 Who’s he?',11,15,['grandpa','grandma','dad','mom','brother','sister']],['e3b5','Unit 4 Is he a teacher?',16,21,['cook','doctor','nurse','student','teacher']]]},
  4:{a:[['e4a1','Get Ready 數字 16～20',1,1,['sixteen','seventeen','eighteen','nineteen','twenty']],['e4a2','Unit 1 How’s the weather?',2,4,['cloudy','rainy','sunny','windy','cold','hot']],['e4a3','Unit 2 What time is it?',5,10,['thirty','forty','fifty','time','clock']],
       ['e4a4','Unit 3 Is this your pencil?',11,14,['book','eraser','marker','pen','pencil','ruler']],['e4a5','Unit 4 Where’s the eraser?',15,21,['in','on','under','box','chair','desk']]],
     b:[['e4b1','Get Ready 數字 10～100',1,1,['sixty','seventy','eighty','ninety','hundred']],['e4b2','Unit 1 Where are you?',2,5,['bathroom','bedroom','kitchen']],['e4b3','Unit 2 What are you doing?',6,10,['cooking','eating','sleeping','writing','running','reading']],
       ['e4b4','Unit 3 What do you want for lunch?',11,14,['hamburger','hotdog','milk','juice','water','lunch']],['e4b5','Unit 4 Do you like bears?',15,21,['bear','lion','monkey','tiger','zebra']]]}};
var EBOOK={2:{a:'二年級上學期（暫用主題）',b:'二年級下學期（暫用主題）'},3:{a:'Wonder World 1',b:'Wonder World 2'},4:{a:'Wonder World 3',b:'Wonder World 4'}};

/* ---------------- 課程：自然（康軒三、四年級）[代號, 名稱, 開始週, 結束週, 對應的島嶼站點] ----------------
   第一島站點：plant mag wind water animal weather sound circ moon insect；第二島：mag2 ckt2 moon2 eco2 wx2 temp pond flow sun time。
   二年級是生活課程（康軒），不鎖進度。沒有對應站點的單元（廚房裡的科學、地表的靜與動、自然資源與利用）遊戲還沒做，先複習學過的站。 */
var SCIC={
  3:{a:[['n3a1','多采多姿的植物',1,5,['plant']],['n3a2','生活中的力（磁力）',6,10,['mag','mag2']],['n3a3','奇妙的空氣',11,14,['wind']],['n3a4','廚房裡的科學（溶解、酸鹼）',15,21,[]]],
     b:[['n3b1','田園樂（種蔬菜）',1,5,['plant']],['n3b2','溫度變化對物質的影響',6,10,['water','temp']],['n3b3','我是動物解說員',11,14,['animal','eco2']],['n3b4','天氣變變變',15,21,['weather','wx2']]]},
  4:{a:[['n4a1','地表的靜與動',1,4,[]],['n4a2','水生生物與環境',5,10,['pond']],['n4a3','有趣的聲光現象',11,14,['sound','sun']],['n4a4','好玩的電路',15,21,['circ','ckt2']]],
     b:[['n4b1','白天和夜晚的天空',1,5,['moon','moon2','sun','time']],['n4b2','水的移動',6,10,['flow']],['n4b3','昆蟲大解密',11,14,['insect']],['n4b4','自然資源與利用',15,21,[]]]}};
var SBOOK={3:{a:'康軒自然 三上',b:'康軒自然 三下'},4:{a:'康軒自然 四上',b:'康軒自然 四下'}};
var SGN={2:'二',3:'三',4:'四'};
var NEWW=[['one','1️⃣','一',1],['two','2️⃣','二',1],['three','3️⃣','三',1],['four','4️⃣','四',1],['five','5️⃣','五',1],['six','6️⃣','六',1],['seven','7️⃣','七',1],['eight','8️⃣','八',1],['nine','9️⃣','九',1],['ten','🔟','十',1],
  ['eleven','11','十一',2],['twelve','12','十二',2],['thirteen','13','十三',2],['fourteen','14','十四',2],['fifteen','15','十五',2],['sixteen','16','十六',3],['seventeen','17','十七',3],['eighteen','18','十八',3],['nineteen','19','十九',3],['twenty','20','二十',3],
  ['thirty','30','三十',3],['forty','40','四十',3],['fifty','50','五十',3],['sixty','60','六十',3],['seventy','70','七十',3],['eighty','80','八十',3],['ninety','90','九十',3],['hundred','100','一百',3],
  ['angry','😠','生氣的',2],['happy','😀','開心的',2],['sad','😢','難過的',2],['hungry','🤤','餓的',2],['thirsty','🥤','口渴的',2],['doll','🪆','洋娃娃',2],['pink','🩷','粉紅色',1],['ox','🐂','公牛',2],
  ['dance','💃','跳舞',2],['draw','🎨','畫畫',2],['sing','🎤','唱歌',2],['swim','🏊','游泳',2],['fly','🕊️','飛',2],['ride','🚴','騎',2],
  ['grandpa','👴','爺爺',2],['grandma','👵','奶奶',2],['dad','👨','爸爸',2],['mom','👩','媽媽',2],['brother','👦','哥哥／弟弟',2],['sister','👧','姊姊／妹妹',2],
  ['cook','🧑‍🍳','廚師',2],['doctor','🧑‍⚕️','醫生',2],['nurse','👩‍⚕️','護理師',2],['student','🧑‍🎓','學生',2],['teacher','🧑‍🏫','老師',2],
  ['cloudy','🌥️','多雲的',3],['rainy','☔','下雨的',3],['sunny','🌞','晴朗的',3],['windy','🌬️','颳風的',3],['cold','🥶','冷的',3],['hot','🥵','熱的',3],['time','⏰','時間',3],
  ['eraser','🧽','橡皮擦',3],['marker','🖍️','彩色筆',3],['ruler','📏','尺',3],['in','📥','在裡面',3],['on','🔝','在上面',3],['under','⬇️','在下面',3],['desk','🗃️','書桌',3],
  ['bathroom','🛁','浴室',3],['bedroom','😴','臥室',3],['kitchen','🥘','廚房',3],['cooking','🍲','正在煮飯',3],['eating','😋','正在吃',3],['sleeping','💤','正在睡覺',3],['writing','✍️','正在寫字',3],['running','🏃','正在跑步',3],['reading','👓','正在閱讀',3],
  ['hamburger','🍔','漢堡',3],['lunch','🍱','午餐',3],['bear','🐻','熊',3],['lion','🦁','獅子',3],['zebra','🦓','斑馬',3],['eye','👁️','眼睛',1],['ear','👂','耳朵',1],['mouth','👄','嘴巴',1],['head','🙂','頭',1]];

var GN=['一','二','三','四','五','六'];
function pkM(a){return a[Math.floor(Math.random()*a.length)]}
function shufM(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}

global.ProgressFactory=function(C){
  var Store=C.Store,WORDS=C.WORDS,WI={};
  NEWW.forEach(function(w){if(!WORDS.some(function(x){return x[0]===w[0]}))WORDS.push(w)});
  WORDS.forEach(function(w){WI[w[0]]=w});
  var RS;function r0(){RS={m:{n:0,c:0},e:{n:0,c:0},seen:{},used:{},done:0}}r0();

  function kidP(k){return k&&k.pg&&typeof k.pg==='object'?k.pg:{}}
  function grade(id){var k=Store.kid(id)||{},b=GN.indexOf(k.gr||C.MB_DEF[id]||'')+1;if(b<1)return 0;var P=kidP(k),gy=+P.gy||2026;return Math.min(6,b+Math.max(0,sem(new Date(),P.s2).ay-gy))}
  function gradeStr(id){var g=grade(id);return g>=2?GN[g-1]:null}
  function CUR(sub){return sub==='m'?MATH:sub==='s'?SCIC:EN}
  function state(id,sub){var k=Store.kid(id);if(!k)return null;var g=grade(id),CU=CUR(sub)[g];if(!CU)return null;
    var P=kidP(k),sm=sem(new Date(),P.s2),units=CU[sm.s],sk=g+sm.s+sm.ay,ov=P[{m:'mo',e:'eo',s:'so'}[sub]],off=0,manual=false;
    if(ov&&ov.k===sk&&typeof ov.o==='number'){off=ov.o;manual=true}
    else if(sub==='m'&&!ov&&k.mo&&typeof k.mo.o==='number'&&sm.s==='a'&&sm.ay===2026){off=k.mo.o;manual=true}
    var ew=sm.wk+off,cal=0;units.forEach(function(u,i){if(u[2]<=ew)cal=i});
    var D=P[sub]&&P[sub].k===sk?P[sub]:null,adv=D&&typeof D.a==='number'?D.a:-1,cap=P.cap==null?3:Math.max(0,+P.cap||0),cur=Math.min(units.length-1,Math.max(cal,Math.min(adv,cal+cap)));
    var prev=sm.s==='b'?CU.a:(CUR(sub)[g-1]||{}).b||null;
    return {g:g,sem:sm,sk:sk,units:units,cal:cal,cur:cur,manual:manual,ew:ew,cap:cap,uid:units[cur][0],U:units[cur],D:D,prev:prev,
      book:(sub==='m'?BOOK:sub==='s'?SBOOK:EBOOK)[g][sm.s]}}
  function subD(P,sub,sk){var D=P[sub];if(!D||typeof D!=='object')D=P[sub]={};if(D.k!==sk){D.k=sk;D.a=-1;D.st={}}if(!D.st||typeof D.st!=='object')D.st={};if(!D.rv||typeof D.rv!=='object')D.rv={};return D}
  function mutP(id,f){Store.mut(id,function(k){if(!k.pg||typeof k.pg!=='object')k.pg={};f(k.pg,k)})}
  function rvList(id,sub){var k=Store.kid(id),D=kidP(k)[sub];return D&&D.rv&&typeof D.rv==='object'?D.rv:{}}
  function dueKeys(id,sub,filt){var rv=rvList(id,sub),t=dayN(),o=[];for(var key in rv){var it=rv[key];if(Array.isArray(it)&&+it[1]<=t&&RS.seen[sub+key]===undefined&&!RS.used[sub+key]&&(!filt||filt(key,it)))o.push(key)}return o}

  /* ---- 數學 ---- */
  function learned(S){var o=[];S.units.slice(0,S.cur).forEach(function(u){u[4].forEach(function(s){if(o.indexOf(s)<0)o.push(s)})});return o}
  function prevSk(S){var o=[];(S.prev||[]).forEach(function(u){u[4].forEach(function(s){if(o.indexOf(s)<0)o.push(s)})});return o}
  function skillsAll(id){var S=state(id,'m');if(!S)return null;var o=S.U[4].slice();learned(S).concat(prevSk(S)).forEach(function(s){if(o.indexOf(s)<0)o.push(s)});return o}
  function okKind(s,kind){var d=SK[s];if(!d)return false;if(kind==='cmp')return !!d.x;if(kind==='num')return !d.d;return true}
  function isInt(a){return /^\d+$/.test(String(a))}
  function unitOf(S,s){if(S.U[4].indexOf(s)>=0)return S.uid;for(var i=S.cur-1;i>=0;i--)if(S.units[i][4].indexOf(s)>=0)return S.units[i][0];return 'old'}
  function gen(R,kind){if(!C.isKid())return null;var id=C.who(),S=state(id,'m');if(!S)return null;
    if(kind!=='cmp'){var due=dueKeys(id,'m',function(key,it){return kind!=='num'||isInt(it[3])});
      if(due.length&&R()<.3){var key=due[Math.floor(R()*due.length)];RS.used['m'+key]=1;var it=rvList(id,'m')[key],ans=isInt(it[3])?+it[3]:it[3];return [key,ans,Array.isArray(it[4])&&it[4].length?it[4].slice():null,{u:it[5]||'old',s:it[6]||'',rk:key,rv:1}]}}
    var cu=S.U[4].filter(function(s){return okKind(s,kind)}),le=learned(S).filter(function(s){return okKind(s,kind)}),pv=prevSk(S).filter(function(s){return okKind(s,kind)}),x=R(),pool;
    if(cu.length&&(x<.6||!le.length&&!pv.length))pool=cu;else if(le.length&&(x<.85||!pv.length))pool=le;else if(pv.length)pool=pv;else pool=cu;
    if(!pool.length)return null;var s=pool[Math.floor(R()*pool.length)],r=SK[s].f(R);return [r[0],r[1],r[2]||null,{u:pool===pv?'old':unitOf(S,s),s:s}]}

  /* ---- 英文 ---- */
  function eAll(S){var o=[];function add(us){(us||[]).forEach(function(u){u[4].forEach(function(w){if(WI[w]&&o.indexOf(w)<0)o.push(w)})})}
    for(var g=2;g<S.g;g++)if(EN[g]){add(EN[g].a);add(EN[g].b)}if(S.sem.s==='b')add(EN[S.g].a);return o}
  function pool(id){if(!C.isKid())return null;var S=state(id,'e');if(!S)return null;var cur=S.U[4].filter(function(w){return WI[w]}),out=cur.slice(),
      sem0=[];S.units.slice(0,S.cur).forEach(function(u){u[4].forEach(function(w){if(WI[w]&&out.indexOf(w)<0&&sem0.indexOf(w)<0)sem0.push(w)})});
    shufM(dueKeys(id,'e',function(key){return !!WI[key]})).slice(0,4).forEach(function(w){if(out.indexOf(w)<0)out.push(w)});
    shufM(sem0).forEach(function(w){if(out.length<12&&out.indexOf(w)<0)out.push(w)});
    shufM(eAll(S)).forEach(function(w){if(out.length<14&&out.indexOf(w)<0)out.push(w)});
    if(out.length<12)shufM(WORDS.filter(function(w){return w[3]<=Math.max(1,S.g-1)})).forEach(function(w){if(out.length<14&&out.indexOf(w[0])<0)out.push(w[0])});
    return out.map(function(w){return WI[w]})}
  function others(w,n){var id=C.who(),S=C.isKid()&&state(id,'e');if(!S)return null;var cand=[];S.units.slice(0,S.cur+1).forEach(function(u){cand=cand.concat(u[4])});cand=cand.concat(eAll(S));
    var o=[];shufM(cand).forEach(function(x){if(WI[x]&&x!==w[0]&&o.indexOf(WI[x])<0)o.push(WI[x])});
    if(o.length<n)shufM(WORDS.filter(function(x){return x[3]<=Math.max(2,S.g-1)&&x[0]!==w[0]&&o.indexOf(x)<0})).forEach(function(x){if(o.length<n)o.push(x)});return o.slice(0,n)}

  /* ---- 作答紀錄：只算這一輪第一次作答 ---- */
  function hook(w,ok){try{if(!C.isKid()||!w)return;var sub=w.m?'m':'e';if(w.m&&!w.pg)return;var id=C.who(),S=state(id,sub);if(!S)return;
    var key=w.m?(w.pg.rk||w[2]):w[0];if(RS.seen[sub+key]!==undefined)return;RS.seen[sub+key]=ok?1:0;
    var isCur=w.m?w.pg.u===S.uid:S.U[4].indexOf(w[0])>=0;if(!w.m&&!WI[w[0]])return;
    if(isCur){RS[sub].n++;if(ok)RS[sub].c++}
    var ds=w.m&&Array.isArray(w.os)?w.os.slice(1).map(function(x){return String(x[0])}).slice(0,3):0;
    mutP(id,function(P){var D=subD(P,sub,S.sk),t=dayN();if(isCur){var a=Array.isArray(D.st[S.uid])?D.st[S.uid]:[0,0];a[0]=(+a[0]||0)+1;if(ok)a[1]=(+a[1]||0)+1;D.st[S.uid]=a}
      var it=D.rv[key];
      if(!ok){if(Array.isArray(it)){it[0]=0;it[1]=t;it[2]=(+it[2]||0)+1}else{D.rv[key]=[0,t,1,w.m?String(w[0]):0,ds||0,w.m?w.pg.u:S.uid,w.m?w.pg.s:''];
        var ks=Object.keys(D.rv);if(ks.length>200){ks.sort(function(a,b){return (+D.rv[a][1])-(+D.rv[b][1])});ks.slice(0,ks.length-200).forEach(function(k2){delete D.rv[k2]})}}}
      else if(Array.isArray(it)&&+it[1]<=t){it[0]=(+it[0]||0)+1;if(it[0]>4)delete D.rv[key];else it[1]=t+IV[it[0]]}})}catch(e){console.error('pg hook',e)}}
  /* 課本闖關的關卡（C.ok／C.bad）：只算單元統計 */
  function mbHook(uk,ok){try{if(!C.isKid())return;var id=C.who(),S=state(id,'m');if(!S||uk!==S.uid)return;RS.m.n++;if(ok)RS.m.c++;
    mutP(id,function(P){var D=subD(P,'m',S.sk),a=Array.isArray(D.st[S.uid])?D.st[S.uid]:[0,0];a[0]=(+a[0]||0)+1;if(ok)a[1]=(+a[1]||0)+1;D.st[S.uid]=a})}catch(e){}}
  /* 一輪結束：正確率 ≥ 90%（至少 4 題目前單元）＋單元累計 ≥ 20 題 → 前進 */
  function finish(id){if(!C.isKid()||RS.done)return;RS.done=1;var msg=[];
    ['m','e'].forEach(function(sub){var r=RS[sub];if(r.n<4||r.c/r.n<.9)return;var S=state(id,sub);if(!S||S.cur>=S.units.length-1||S.cur+1>S.cal+S.cap)return;
      var st=S.D&&S.D.st&&S.D.st[S.uid];if(!Array.isArray(st)||+st[0]<20)return;var nx=S.units[S.cur+1];
      mutP(id,function(P){var D=subD(P,sub,S.sk);D.a=S.cur+1});msg.push((sub==='m'?'數學':'英文')+'「'+S.U[1]+'」已經很熟了！前進到「'+nx[1]+'」')});
    if(msg.length)setTimeout(function(){try{C.sfx('win');C.confetti(null,40);C.say('⚡ '+msg.join('；')+'！','happy')}catch(e){}},2600)}

  /* ---- 課本闖關：給還沒有專屬關卡的單元一組通用關卡 ---- */
  function unitById(uk){for(var g in MATH)for(var s in MATH[g])for(var i=0;i<MATH[g][s].length;i++)if(MATH[g][s][i][0]===uk)return MATH[g][s][i];return null}
  function mbLV(MB_LV){for(var g in MATH)for(var s in MATH[g])MATH[g][s].forEach(function(u){if(!MB_LV[u[0]])MB_LV[u[0]]=[['基本練習','先把「'+u[1]+'」的基本題練熟'],['進階挑戰','題目多一點、難一點'],['單元大考驗','8 題全對拿 3 顆星']]})}
  function mbGenLv(MB_G,mbQs,esc){for(var g in MATH)for(var s in MATH[g])MATH[g][s].forEach(function(u){if(MB_G[u[0]])return;MB_G[u[0]]=[0,1,2].map(function(lv){return function(Cx){var R=Cx.R,N=[5,6,8][lv],items=[],seen={},sks=u[4];
      for(var i=0;items.length<N&&i<N*6;i++){var s2=lv===0?sks[items.length%sks.length]:sks[Math.floor(R()*sks.length)],r=SK[s2].f(R);if(seen[r[0]])continue;seen[r[0]]=1;
        var num=typeof r[1]==='number'&&isInt(r[1])&&String(r[1]).length<=6&&!SK[s2].d,it={q:esc(SK[s2].x?r[0]+' = ?':r[0]),ans:r[1],sub:u[1]};
        if(!num){var ds=(r[2]||dds(r[1],1,2)).filter(function(x){return String(x)!==String(r[1])}),op=[r[1]];ds.forEach(function(x){if(op.length<4&&op.map(String).indexOf(String(x))<0)op.push(x)});it.opts=shufM(op)}
        items.push(it)}
      mbQs(Cx,items,u[1])}})})}
  function mbState(id){var S=state(id,'m');if(!S)return null;return {g:GN[S.g-1],B:{book:S.book,u:S.units.map(function(u){return [u[0],u[1],u[2],u[3],1]})},week:S.sem.wk,ew:S.ew,cur:S.cur,cal:S.cal,manual:S.manual}}


  /* ---- 自然：學過的單元的站才開放；目前單元的站全部過關（每站至少 7 顆星）就提前開下一單元 ---- */
  var starsFn=function(){return [0,0,0]},nameFn=function(k){return k};
  function sciLearned(S){var o=[];function add(us){(us||[]).forEach(function(u){u[4].forEach(function(x){if(o.indexOf(x)<0)o.push(x)})})}
    for(var g=3;g<S.g;g++)if(SCIC[g]){add(SCIC[g].a);add(SCIC[g].b)}if(S.sem.s==='b')add(SCIC[S.g].a);add(S.units.slice(0,S.cur+1));return o}
  function sciWhen(key){for(var g=3;g<=4;g++)for(var x in {a:1,b:1}){var us=SCIC[g][x];for(var i=0;i<us.length;i++)if(us[i][4].indexOf(key)>=0)return SGN[g]+'年級'+(x==='a'?'上':'下')+'學期「'+us[i][1]+'」'}return ''}
  function sciOpen(id,key){if(!C.isKid())return true;var S=state(id,'s');if(!S)return true;if(sciLearned(S).indexOf(key)>=0)return true;var r=starsFn(id,key);return (+r[0]||0)+(+r[1]||0)+(+r[2]||0)>0}
  function sciCur(id){var S=C.isKid()&&state(id,'s');return S?S.U[4]:[]}
  function sciCheck(id){if(!C.isKid())return '';var S=state(id,'s');if(!S||!S.U[4].length||S.cur>=S.units.length-1||S.cur+1>S.cal+S.cap)return '';
    var ok=S.U[4].every(function(key){var r=starsFn(id,key);return r[0]>0&&r[1]>0&&r[2]>0&&r[0]+r[1]+r[2]>=7});if(!ok)return '';var nx=S.units[S.cur+1];
    mutP(id,function(P){var D=subD(P,'s',S.sk);D.a=S.cur+1});var m='自然「'+S.U[1]+'」全部過關！提前打開下一單元「'+nx[1]+'」';
    setTimeout(function(){try{C.sfx('win');C.confetti(null,40);C.say('⚡ '+m+'！','happy')}catch(e){}},1200);return m}
  function sciBanner(id,esc,STNAME){var S=C.isKid()&&state(id,'s');if(!S)return '';var ks=S.U[4],lead=S.cur-S.cal;
    return '<div class="pgsci"><b>📍 '+(lead>0?'⚡ 已經超前！現在探索':'學校正在教')+'：'+esc(S.book)+' 第 '+(S.cur+1)+' 單元「'+esc(S.U[1])+'」</b><small>'+(ks.length?'到這些站練習：'+ks.map(function(k){return esc(STNAME(k)||k)}).join('、')+'。全部過關（每站至少 7 顆星）就提前打開下一單元。':'這個單元的遊戲還在準備中，先複習學過的站吧！')+'</small></div>'}
  function sciTopics(id,STN){var S=C.isKid()&&state(id,'s');if(!S)return null;return STN.filter(function(s){return sciOpen(id,s.k)}).map(function(s){return s.t})}
  /* ---- 家長區 ---- */
  function pct(a){return Array.isArray(a)&&+a[0]?Math.round(100*(+a[1]||0)/(+a[0]))+'%':'—'}
  function rvSum(id,sub){var rv=rvList(id,sub),n=0,hard=[],t=dayN(),due=0;for(var key in rv){var it=rv[key];if(!Array.isArray(it))continue;n++;if(+it[1]<=t)due++;if(+it[2]>=3)hard.push([key,+it[2]])}hard.sort(function(a,b){return b[1]-a[1]});return {n:n,due:due,hard:hard}}
  function sline(id,esc){var S=state(id,'s');if(!S)return '<div class="pgl"><b>🔬 自然</b><small>'+(grade(id)===2?'二年級是生活課程，自然島全部開放、不鎖進度。':'這個年級還沒有進度表，自然島全部開放。')+'</small></div>';var lead=S.cur-S.cal;
    return '<div class="pgl"><b>🔬 自然 <small>'+esc(S.book)+'・第 '+S.sem.wk+' 週</small></b><span class="pgnow">正在探索：第 '+(S.cur+1)+' 單元「'+esc(S.U[1])+'」'+(lead>0?' <em>⚡ 超前 '+lead+' 單元</em>':'')+'</span>'+
      '<small>學校進度'+(S.manual?'（家長設定）':'（依行事曆）')+'：第 '+(S.cal+1)+' 單元「'+esc(S.units[S.cal][1])+'」　對應站點：'+(S.U[4].length?S.U[4].map(function(k){var r=starsFn(id,k);return esc(nameFn(k))+' '+(r[0]+r[1]+r[2])+'★'}).join('、'):'（遊戲還沒有這個單元）')+'</small>'+
      '<small>已開放 '+sciLearned(S).length+' 站；還沒教到的站會鎖住（已經玩過的站保留）。錯題會收進「圖鑑與錯題本」，下次優先出現。</small>'+
      '<label>學校教到 <select data-pgu="s:'+id+'"><option value="auto"'+(S.manual?'':' selected')+'>自動（依行事曆）</option>'+S.units.map(function(u,i){return '<option value="'+i+'"'+(S.manual&&i===S.cal?' selected':'')+'>第 '+(i+1)+' 單元 '+esc(u[1])+'</option>'}).join('')+'</select></label></div>'}
  function line(id,sub,esc){if(sub==='s')return sline(id,esc);var S=state(id,sub);if(!S)return '<div class="pgl"><b>'+(sub==='m'?'🔢 數學':'🔤 英文')+'</b><small>這個年級還沒有進度表，照舊用年級難度出題。</small></div>';
    var st=S.D&&S.D.st?S.D.st[S.uid]:null,R=rvSum(id,sub),lead=S.cur-S.cal;
    var h='<div class="pgl"><b>'+(sub==='m'?'🔢 數學':'🔤 英文')+' <small>'+esc(S.book)+'・第 '+S.sem.wk+' 週</small></b>'+
      '<span class="pgnow">正在練：第 '+(S.cur+1)+' 單元「'+esc(S.U[1])+'」'+(lead>0?' <em>⚡ 超前 '+lead+' 單元</em>':'')+'</span>'+
      '<small>學校進度'+(S.manual?'（家長設定）':'（依行事曆）')+'：第 '+(S.cal+1)+' 單元「'+esc(S.units[S.cal][1])+'」　本單元：答 '+(st?+st[0]:0)+' 題、正確率 '+pct(st)+'（滿 20 題且一輪 ≥ 90% 就前進）</small>'+
      '<small>錯題箱 '+R.n+' 題（今天該複習 '+R.due+' 題）'+(R.hard.length?'　頑固錯題：'+R.hard.slice(0,5).map(function(x){return '<code>'+esc(x[0])+'</code>×'+x[1]}).join('、'):'')+'</small>'+
      '<label>學校教到 <select data-pgu="'+sub+':'+id+'"><option value="auto"'+(S.manual?'':' selected')+'>自動（依行事曆）</option>'+S.units.map(function(u,i){return '<option value="'+i+'"'+(S.manual&&i===S.cal?' selected':'')+'>第 '+(i+1)+' 單元 '+esc(u[1])+'</option>'}).join('')+'</select></label></div>';return h}
  function parentHtml(KIDS,kface,esc){var k0=Store.kid(KIDS[0].id)||{},P0=kidP(k0),sm=sem(new Date(),P0.s2),cap=P0.cap==null?3:+P0.cap;
    var h='<div class="rost mbp pgp"><h3 class="h">📘 學校進度（英文・數學・自然自動跟進）</h3><p class="mbtip">孩子不用選年級或單元：App 依學校行事曆自動換單元（現在是'+sm.ay+' 學年'+(sm.s==='a'?'上':'下')+'學期第 '+sm.wk+' 週）。一輪答對 90% 以上、單元累計滿 20 題就自動前進；答錯的題目會在之後的單元隔 1、3、7、14 天再出現。每年 8 月底自動升一個年級。</p>'+
      '<div class="pgset"><label>下學期開學日 <input type="date" id="pgS2" value="'+(okDate(P0.s2)?P0.s2:'')+'" placeholder="2027-02-15"></label><label>最多超前學校 <select id="pgCap">'+[0,1,2,3,4,5].map(function(n){return '<option value="'+n+'"'+(n===cap?' selected':'')+'>'+n+' 個單元</option>'}).join('')+'</select></label></div>';
    KIDS.forEach(function(k){var kk=Store.kid(k.id)||{},g=gradeStr(k.id);
      h+='<div class="mbpr pgr"><b>'+kface(k)+' '+esc(k.short)+'</b><label>現在年級 <select data-gr="'+k.id+'">'+['','二','三','四','五','六'].map(function(x){return '<option value="'+x+'"'+(x&&x===g&&kk.gr?' selected':'')+'>'+(x?x+'年級':'（預設 '+(g||C.MB_DEF[k.id]||'—')+'年級）')+'</option>'}).join('')+'</select></label>'+line(k.id,'m',esc)+line(k.id,'e',esc)+line(k.id,'s',esc)+'</div>'});
    return h+'</div>'}
  function parentWire(el,KIDS){var all=KIDS.map(function(k){return k.id});
    el.querySelectorAll('[data-gr]').forEach(function(s){s.addEventListener('change',function(){var v=s.value,id=s.dataset.gr;mutP(id,function(P,k){if(v){k.gr=v;P.gy=sem(new Date(),P.s2).ay}else{delete k.gr;delete P.gy}delete k.mo;delete P.mo;delete P.eo});C.sfx('ok');C.say('年級改好了！','happy')})});
    el.querySelectorAll('[data-pgu]').forEach(function(s){s.addEventListener('change',function(){var p=s.dataset.pgu.split(':'),sub=p[0],id=p[1],v=s.value,S=state(id,sub);if(!S)return;
      mutP(id,function(P,k){var f={m:'mo',e:'eo',s:'so'}[sub];if(v==='auto'){delete P[f];if(sub==='m')delete k.mo}else{P[f]={k:S.sk,o:S.units[+v][2]-S.sem.wk};if(sub==='m')delete k.mo;var D=subD(P,sub,S.sk);D.a=-1}});C.sfx('ok');C.say('學校進度改好了！','happy')})});
    var s2=el.querySelector('#pgS2');if(s2)s2.addEventListener('change',function(){var v=s2.value;all.forEach(function(id){mutP(id,function(P){if(okDate(v))P.s2=v;else delete P.s2})});C.sfx('ok');C.say('下學期開學日記好了！','happy')});
    var cp=el.querySelector('#pgCap');if(cp)cp.addEventListener('change',function(){var v=+cp.value;all.forEach(function(id){mutP(id,function(P){P.cap=v})});C.sfx('ok');C.say('超前上限改好了！','happy')})}
  /* 孩子畫面上的進度小卡（取代年級選擇） */
  function kidChip(id,esc,where){var g=gradeStr(id);if(!g)return '';var m=state(id,'m'),e=state(id,'e'),n=state(id,'s');
    if(where==='sci')return '<span class="lab">🎒 '+g+'年級・跟著學校進度</span>'+(n?'<span class="chip pgchip">🔬 '+esc(n.U[1])+'</span>':'<span class="chip pgchip">🔬 自然島全部開放</span>');
    return '<span class="lab">🎒 '+g+'年級・跟著學校進度</span>'+(m?'<span class="chip pgchip">🔢 '+esc(m.U[1])+'</span>':'')+(e?'<span class="chip pgchip">🔤 '+esc(e.U[1].replace(/^Unit \d+ /,''))+'</span>':'')}

  return {sciOpen:sciOpen,sciWhen:sciWhen,sciCur:sciCur,sciCheck:sciCheck,sciBanner:sciBanner,sciTopics:sciTopics,setStars:function(f){starsFn=f},setNames:function(f){nameFn=f},sem:sem,grade:grade,gradeStr:gradeStr,state:state,skills:skillsAll,gen:gen,pool:pool,others:others,hook:hook,mbHook:mbHook,round0:r0,finish:finish,
    mbLV:mbLV,mbGenLv:mbGenLv,mbState:mbState,unitById:unitById,parentHtml:parentHtml,parentWire:parentWire,kidChip:kidChip,
    _SK:SK,_MATH:MATH,_EN:EN,_dayN:dayN};
};
})(window);
