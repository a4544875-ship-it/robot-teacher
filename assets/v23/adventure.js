/* Adventure refinement. Pure learning helpers; no account, score or network writes. */
(function (global) {
  'use strict';
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]}); };
  function stage(n) { return Math.min(2, Math.floor(Math.max(0,n)/3)); }
  function stageName(n) { return ['觀察熱身','應用挑戰','推理進階'][stage(n)]; }
  function wordDeck(initial,pool,shuffle,total){
    var result=initial.slice(0,total);if(!pool.length)return result;
    while(result.length<total){var extra=shuffle(pool);if(extra.length>1&&extra[0]===result[result.length-1]){var first=extra.shift();extra.push(first)}result=result.concat(extra).slice(0,total)}
    return result;
  }
  function complexity(q) {
    var s=q[2]; return (s.length>18?8:0)+(s.indexOf('□')>=0?5:0)+(s.match(/[×÷]/g)||[]).length*2+(s.match(/\d/g)||[]).length/5;
  }
  function inverse(q,R) {
    var m=q[2].match(/^(\d+) ([+−×÷]) (\d+)$/); if(!m)return q;
    var a=+m[1], b=+m[3], hideLeft=R()<.5, answer=hideLeft?a:b;
    var expression=(hideLeft?'□':a)+' '+m[2]+' '+(hideLeft?b:'□')+' = '+q[0];
    var v=[String(answer),'🔢',expression,0];v.m=1;v.pg=q.pg;v.blank=true;v.solution=q[2]+' = '+q[0];v.os=[v];
    [answer+1,answer-1,answer+2,answer+10,answer-10].forEach(function(n){if(n>=0&&v.os.length<4&&!v.os.some(function(w){return +w[0]===n}))v.os.push([String(n),'',expression,0])});return v;
  }
  function mathQuestion(C,X,o,n,seen) {
    var level=stage(n), candidates=[];
    for(var i=0;i<10;i++){var q=C.mq(X.R,'mix',X.b,o.tb,4);if(!seen[q[2]]&&!candidates.some(function(v){return v[2]===q[2]}))candidates.push(q)}
    if(!candidates.length)candidates.push(C.mq(X.R,'mix',X.b,o.tb,4));
    candidates.sort(function(a,b){return complexity(a)-complexity(b)});
    var ix=level===0?0:level===1?Math.floor((candidates.length-1)/2):candidates.length-1;
    var picked=candidates[ix];seen[picked[2]]=true;
    if(level===2&&n%2===0)picked=inverse(picked,X.R);
    return plausibleOptions(picked);
  }
  function plausibleOptions(q) {
    var n=Number(q[0]);if(!Number.isFinite(n))return q;
    var step=Number.isInteger(n)?1:.1,limit=Math.max(3,Math.abs(n)*.5),values=[];
    (q.os||[]).slice(1).forEach(function(w){var v=Number(w[0]);if(Number.isFinite(v)&&v>=0&&Math.abs(v-n)<=limit&&v!==n&&values.indexOf(v)<0)values.push(v)});
    [step,-step,2*step,-2*step,10*step,-10*step].forEach(function(d){var v=Math.round((n+d)*1000)/1000;if(v>=0&&v!==n&&values.indexOf(v)<0)values.push(v)});
    q.os=[q].concat(values.slice(0,3).map(function(v){return [String(v),'',q[2],0]}));return q;
  }
  function mathText(q) { return q.blank?'填入 □：'+q[2]:/[\u4e00-\u9fff]/.test(q[2])?q[2].replace(/[?？]$/,'')+'？':q[2]+' = ?'; }
  function solution(q) { return q.solution||q[2]+(/[\u4e00-\u9fff]/.test(q[2])?'：':' = ')+q[0]; }
  function diagram(q) {
    var s=q[2],m=s.match(/(\d+) 排、每排 (\d+) 個/); if(!m||s.indexOf('面積')<0)return '';
    var rows=+m[1],cols=+m[2];if(rows>12||cols>12)return '';
    return '<div class="a23-area" role="img" aria-label="'+rows+' 排，每排 '+cols+' 個單位方格"><div style="grid-template-columns:repeat('+cols+',1fr)">'+Array.from({length:rows*cols},function(){return '<i></i>'}).join('')+'</div><small>每小格 1 平方公分</small></div>';
  }
  function windScene(speed) {
    return '<div class="a23-wind" role="img" aria-label="風力 '+['無風','弱風','中風','強風'][speed]+' 的風車模型"><div class="a23-air" style="--wind:'+(speed?6/speed:0)+'s"'+(!speed?' hidden':'')+'><i></i><i></i><i></i></div><div class="a23-mill"><img class="a23-mill-body" src="assets/habitat/windmill-body.webp" alt=""><img class="a23-rotor" src="assets/v23/wind-rotor.webp" alt="" style="--turn:'+(speed?6/speed:6)+'s;animation-play-state:'+(speed?'running':'paused')+'"></div><span class="a23-model-note">同一座風車・固定距離</span></div>';
  }
  function magnet(distance,material,neutral) {
    distance=Math.max(1,Math.min(10,Number(distance)||3));
    var x=315+distance*15, pull=neutral?0:Math.max(0,(6-distance)*5);
    return '<svg class="a23-magnet" viewBox="0 0 640 270" role="img" aria-label="長條磁鐵與鐵製迴紋針示意'+(neutral?'':'，距離 '+distance+' 格')+'"><defs><linearGradient id="a23Red" x2="0" y2="1"><stop stop-color="#ff9691"/><stop offset="1" stop-color="#b83951"/></linearGradient><linearGradient id="a23Blue" x2="0" y2="1"><stop stop-color="#8bd5fa"/><stop offset="1" stop-color="#2766af"/></linearGradient><linearGradient id="a23Metal"><stop stop-color="#f2f8fc"/><stop offset=".5" stop-color="#6f8b9f"/><stop offset="1" stop-color="#c4d6e5"/></linearGradient></defs><ellipse cx="320" cy="216" rx="260" ry="25" fill="#284d7317"/><g transform="translate(0 8)"><rect x="70" y="98" width="110" height="68" rx="12" fill="url(#a23Red)"/><rect x="180" y="98" width="110" height="68" rx="12" fill="url(#a23Blue)"/><path d="M86 108h79m30 0h78" stroke="#ffffff88" stroke-width="5" stroke-linecap="round"/><text x="125" y="143" text-anchor="middle" fill="white" font-size="30" font-weight="800">N</text><text x="235" y="143" text-anchor="middle" fill="white" font-size="30" font-weight="800">S</text></g>'+(neutral?'':'<rect x="310" y="65" width="12" height="138" rx="4" fill="#c5e3ef" stroke="#7fa5b8"/><text x="316" y="246" text-anchor="middle" fill="#294a6b" font-size="18">'+esc(material||'紙張')+'</text>')+'<g class="a23-clip" style="--pull:'+(-pull)+'px" transform="translate('+x+' 95)"><path d="M15 20v58a15 15 0 0 0 30 0V13a10 10 0 0 0-20 0v58a5 5 0 0 0 10 0V24" fill="none" stroke="url(#a23Metal)" stroke-width="7" stroke-linecap="round"/></g><text x="470" y="48" text-anchor="middle" fill="#294a6b" font-size="18">'+(neutral?'觀察磁鐵與鐵製物品':'距離 '+distance+' 格')+'</text><path d="M65 211h515" stroke="#bc9c64" stroke-width="3"/>'+Array.from({length:20},function(_,i){return '<path d="M'+(75+i*25)+' 211v7" stroke="#bc9c64"/>'}).join('')+'</svg>';
  }
  function windQuestions(level,index,grade,draw,choose,random,plan) {
    var dirs=['北','東','南','西'],n=plan?plan.dirs[index%4]:Math.floor(random()*4),d=dirs[n];
    if(level===0&&index<3){var target=(plan?plan.force:[0,2,3])[index];return {kind:'wind',title:'讓風車呈現「'+['停止','慢慢轉','中速轉','快速轉'][target]+'」。',hint:'只調整風力，觀察葉片的轉速。',target:target,why:'固定風車、方向與距離，這個模型中風越強，轉速越快；沒有風時停止。真實轉速也受葉片與摩擦等影響。',key:'v23:wind:force:'+target}}
    if(level===0)return index===3?choose('同一風車由弱風改成強風，轉速通常怎樣變？','轉得更快',['轉得更慢','一定停止'],'固定其他條件後，模型的風力增加，轉速隨之增加。',draw(2),'v23:wind:compare'):choose('風車突然停了，要先檢查哪一項？','是否還有風吹向葉片',['花朵是不是藍色','今天是星期幾'],'先檢查直接影響風車的風力、方向與卡住等條件。',draw(0),'v23:wind:cause');
    if(level===1){var opposite=dirs[(n+2)%4],hard=index>=2;return choose(hard?'旗子向'+opposite+'方飄，風大致從哪方吹來？':'「'+d+'風」是從哪個方向吹來？',d+'方',dirs.filter(function(x){return x!==d}).map(function(x){return x+'方'}),'風向以來向命名；風從'+d+'方吹向'+opposite+'方。旗子飄去的方向與風的來向相反。','<div class="a23-compass" aria-label="方位示意：上北下南左西右東"><span>北</span><div>西 <b>✦</b> 東</div><span>南</span></div>','v23:wind:direction:'+index+':'+n)}
    var bank=[
      ['甲用大葉片和強風，乙用小葉片和弱風。能判斷葉片大小的影響嗎？','不能，同時改變了兩個條件',['能，大葉片一定比較快','能，先看哪個顏色漂亮'],'要研究葉片大小，只改葉片大小，風力、距離、方向等條件保持相同。'],
      ['相同風車在同一風力下，甲測到 12、13、12 圈，乙只測一次 18 圈。哪種紀錄較能檢查穩定性？','甲，重複觀察並留下紀錄',['乙，只要最高數字','兩者都能保證永遠不變'],'重複觀察能發現數據是否穩定；仍要檢查方法與其他條件，不能只挑最高值。'],
      ['想比較風力，已固定風車，還應固定什麼？','風扇距離、方向與觀察時間',['每次換距離和時間','只固定紀錄紙顏色'],'公平比較一次改變一個條件，圈數也要用相同時間計算。'],
      ['同一風車，弱風 6 圈、中風 10 圈、強風 14 圈（都是 10 秒）。最合理的結論？','這次實驗中風越強，圈數越多',['任何風車永遠都轉 14 圈','轉速只跟花朵數量有關'],'結論要根據這次控制條件下的資料，不能過度推論所有風車。'],
      ['同學的風車不轉，你要怎樣協助？','先關閉風扇，再檢查葉片有沒有卡住',['伸手抓住快速葉片','把電線拆開看看'],'先停止設備，再檢查可安全觀察的部位；電器問題請大人協助。'],
      ['同一風力測了三次卻差很多，下一步較適合？','檢查距離、方向是否固定，再重測',['只留下最好的一次','直接說任何實驗都沒用'],'先檢查測量與控制條件，再重複觀察，不刪除不喜歡的資料。'],
      ['甲測 5 秒、乙測 20 秒，乙圈數較多，能說乙轉得較快嗎？','不能，應在相同時間比較',['能，圈數多一定更快','能，時間完全無關'],'比較圈數來判斷轉速時，觀察時間要相同。'],
      ['要驗證「距離可能影響風力」，哪個安排合理？','同風扇同檔位，只改風車距離',['同時換風扇與葉片','只改紀錄者的姓名'],'研究距離時只改距離，其他條件盡量固定。']
    ];var row=bank[(index+(plan?plan.offset:grade>=4?3:0))%bank.length];return choose(row[0],row[1],row[2],row[3],draw(index===4?0:2),'v23:wind:fair:'+bank.indexOf(row));
  }
  global.Adventure23={stage:stage,stageName:stageName,wordDeck:wordDeck,mathQuestion:mathQuestion,mathText:mathText,solution:solution,inverse:inverse,plausibleOptions:plausibleOptions,diagram:diagram,windScene:windScene,magnet:magnet,windQuestions:windQuestions};
})(window);
