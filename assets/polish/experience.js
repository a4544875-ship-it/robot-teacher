/* Shared presentation only. Original score, curriculum and purchase handlers remain authoritative. */
(function(global){
 'use strict';
 var C=null,recordTab='learning',recordKid='',mapMode='map',queued=false,watcher=null;
 function el(tag,cls,txt){var n=document.createElement(tag);if(cls)n.className=cls;if(txt!=null)n.textContent=txt;return n}
 function image(src,cls){var n=el('img',cls);n.src=src;n.alt='';n.decoding='async';return n}
 function tabsKeyboard(root){root.addEventListener('keydown',function(e){var b=e.target.closest('[role=tab]');if(!b||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;var list=Array.from(b.parentNode.querySelectorAll('[role=tab]')),i=list.indexOf(b);i=e.key==='Home'?0:e.key==='End'?list.length-1:(i+(e.key==='ArrowRight'?1:-1)+list.length)%list.length;e.preventDefault();list[i].click();list[i].focus()})}
 function selectRecord(root,key){recordTab=key;root.querySelectorAll('[data-record-tab]').forEach(function(b){b.setAttribute('aria-selected',b.dataset.recordTab===key?'true':'false')});root.querySelectorAll('[data-record-pane]').forEach(function(p){p.hidden=p.dataset.recordPane!==key})}
 function records(root,state){
  if(!state||root.querySelector('.polish-journal'))return;
  if(recordKid!==state.id){recordKid=state.id;recordTab='learning'}
  var heading=root.querySelector('h2.h'),dp=root.querySelector('.dpbox'),rewards=root.querySelector('#fmRw');
  var oldNodes=Array.from(root.children),gameNodes=[],questionNodes=[],destination=null;
  oldNodes.forEach(function(n){if(n===heading||n===dp||n===rewards)return;if(n.matches('h3'))destination=n.textContent.indexOf('問過')>=0?questionNodes:n.textContent.indexOf('玩過')>=0?gameNodes:null;if(destination)destination.push(n)});
  var journal=el('section','polish-journal'),hero=el('header','journal-hero');
  hero.append(image('assets/polish/learning-book.webp'));var intro=el('div');intro.append(el('small','','我的冒險日誌'),el('h2','',state.name+'，每一步都算數。'),el('p','','看看今天的新收穫，再挑一個小目標。'));hero.append(intro);journal.append(hero);
  var stats=el('div','journal-stats');[['今天獲得',state.today+' 分'],['近七天獲得',state.week+' 分'],['已學會單字',state.words+' 個']].forEach(function(a){var d=el('div');d.append(el('small','',a[0]),el('strong','',a[1]));stats.append(d)});journal.append(stats);
  var tabs=el('div','polish-tabs journal-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','日誌分類');
  [['learning','成長日誌'],['games','遊戲紀錄'],['questions','問過的問題'],['rewards','獎勵兌換']].forEach(function(a){var b=el('button','',a[1]);b.type='button';b.id='recordTab-'+a[0];b.dataset.recordTab=a[0];b.setAttribute('role','tab');b.setAttribute('aria-controls','recordPane-'+a[0]);b.onclick=function(){selectRecord(root,a[0])};tabs.append(b)});journal.append(tabs);tabsKeyboard(tabs);
  var panes={};['learning','games','questions','rewards'].forEach(function(k){var p=el('section','journal-pane');p.id='recordPane-'+k;p.dataset.recordPane=k;p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby','recordTab-'+k);panes[k]=p;journal.append(p)});
  var action=el('button','journal-collection');action.append(image('assets/polish/learning-book.webp'),el('span','','打開學習收藏冊'),el('i','','›'));action.onclick=function(){C.openBook()};panes.learning.append(action);
  if(dp){var title=dp.querySelector('h3 small');if(title)title.textContent='英文・數學・自然・社會';var daily=dp.querySelector('.dptoday');if(daily)daily.remove();var chart=el('div','journal-chart'),max=Math.max.apply(null,(state.history||[]).map(function(d){return d.value}).concat([1]));chart.setAttribute('aria-label','近七天獲得的分數');(state.history||[]).forEach(function(d){var col=el('div'),value=el('small','',d.recorded?String(d.value):'—'),track=el('span','journal-chart-track'),bar=el('i');bar.style.height=Math.max(3,d.value/max*100)+'%';track.append(bar);col.append(value,track,el('b','',d.label));col.setAttribute('aria-label',d.label+(d.recorded?'，'+d.value+' 分':'，尚無紀錄'));chart.append(col)});dp.insertBefore(chart,dp.querySelector('.dpnote'));var scroller=dp.querySelector('.dpscroll');if(scroller){var details=el('details','journal-history'),summary=el('summary','','查看近 14 天明細');details.append(summary,scroller);dp.append(details)}panes.learning.append(dp)}
  var growth=el('div','journal-growth');[['英文','en','assets/mobile-magic/island-en.webp'],['數學','math','assets/mobile-magic/island-math.webp'],['自然','sci','assets/mobile-magic/island-sci.webp'],['社會','soc','assets/mobile-magic/island-soc.webp']].forEach(function(a){var b=el('button');b.append(image(a[2]),el('b','',a[0]+'島'),el('small','',state.subjects[a[1]]+' 累計積分'),el('i','','›'));b.onclick=function(){C.goSubject(a[1])};growth.append(b)});panes.learning.append(growth);
  gameNodes.forEach(function(n){panes.games.append(n)});questionNodes.forEach(function(n){panes.questions.append(n)});if(rewards)panes.rewards.append(rewards);
  if(heading)heading.remove();root.prepend(journal);selectRecord(root,recordTab);
 }
 function mapGuide(map){
  if(map.dataset.polishGuide)return;var labels=Array.from(map.querySelectorAll('button.sxl,button.soc-lab'));
  if(!labels.length){labels=Array.from(map.querySelectorAll('button')).filter(function(b){return b.querySelector('b')})}if(!labels.length)return;
  map.dataset.polishGuide='true';var wrap=el('section','polish-map-layout'),mode=el('div','polish-map-switch'),rail=el('div','polish-map-rail');rail.setAttribute('aria-label','站點導覽');
  [['map','探索地圖'],['list','站點清單']].forEach(function(a){var b=el('button','',a[1]);b.setAttribute('aria-pressed',mapMode===a[0]?'true':'false');b.onclick=function(){mapMode=a[0];wrap.dataset.view=a[0];mode.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')})};mode.append(b)});
  rail.append(el('h3','','選擇探索站點'),el('p','','完整站名與進度，都在這裡。'));
  labels.forEach(function(b,i){var copy=b.cloneNode(true);copy.querySelectorAll('small,.tg').forEach(function(x){x.remove()});var name=(b.querySelector('b')||{}).textContent||b.getAttribute('aria-label')||copy.textContent.trim(),sm=b.querySelector('small'),status=sm?sm.textContent.trim():'',locked=b.classList.contains('pglock')||b.classList.contains('lock')||/還沒教到|建造中|🔒/.test(status),done=b.classList.contains('got');var row=el('button','map-guide-row'+(locked?' locked':'')+(done?' completed':''));row.append(el('span','map-guide-number',done?'✓':String(i+1)));var txt=el('span');txt.append(el('b','',name),el('small','',status||(locked?'尚未開放':'點一下開始探索')));row.append(txt,el('i','',locked?'鎖定':'›'));row.onclick=function(){b.click()};rail.append(row);b.tabIndex=-1;b.setAttribute('aria-hidden','true');});
  wrap.dataset.view=mapMode;map.parentNode.insertBefore(wrap,map);wrap.append(mode,map,rail);
  var pinButtons=Array.from(map.querySelectorAll('button.sxs,button.soc-hot'));pinButtons.forEach(function(b){b.classList.add('polish-map-pin')});
  var home=document.getElementById('gHome');if(home)home.classList.add('polish-map-home');
 }
 function chapters(nodes){
  if(nodes.dataset.polishChapters)return;var buttons=Array.from(nodes.querySelectorAll('button.obn[data-i]'));if(buttons.length!==20)return;nodes.dataset.polishChapters='true';
  var last=buttons.filter(function(b){return !b.disabled}).pop(),selected=Math.min(3,Math.floor(+(last?last.dataset.i:0)/5)),tabs=el('div','polish-tabs chapter-tabs'),panels=[];tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','冒險世界');
  var children=Array.from(nodes.children),names=['草原世界','沙漠世界','雪地世界','火山世界'];
  names.forEach(function(name,i){var panel=el('section','chapter-panel'),b=el('button','',name);panel.id='chapterPane-'+i;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby','chapterTab-'+i);b.id='chapterTab-'+i;b.setAttribute('role','tab');b.setAttribute('aria-controls',panel.id);b.onclick=function(){panels.forEach(function(p,j){p.hidden=j!==i});Array.from(tabs.children).forEach(function(t,j){t.setAttribute('aria-selected',j===i?'true':'false')})};tabs.append(b);panels.push(panel)});
  children.forEach(function(n){if(n.matches('h3')){var i=children.filter(function(x){return x.matches('h3')}).indexOf(n);panels[i].append(n)}else if(n.matches('[data-i]'))panels[Math.floor(+n.dataset.i/5)].append(n)});
  nodes.prepend(tabs);panels.forEach(function(p,i){p.hidden=i!==selected;nodes.append(p)});Array.from(tabs.children).forEach(function(t,i){t.setAttribute('aria-selected',i===selected?'true':'false')});tabsKeyboard(tabs);
 }
 function decorate(){
  var book=document.querySelector('.book');if(book&&!book.dataset.polishObserved&&watcher){book.dataset.polishObserved='true';watcher.observe(book,{childList:true,subtree:true})}
  document.querySelectorAll('#games .sxmap,#games .soc-map').forEach(mapGuide);
  document.querySelectorAll('#gBody .obnodes').forEach(chapters);
  document.querySelectorAll('.polish-map-layout').forEach(function(w){var m=Array.from(w.children).filter(function(n){return n.matches('.sxmap,.soc-map')})[0],hide=m&&(m.hidden||m.style.display==='none');if(w.hidden!==!!hide)w.hidden=!!hide});
  var home=document.getElementById('gHome');if(home&&!home.querySelector('.polish-map-layout'))home.classList.remove('polish-map-home');
  document.querySelectorAll('.gcard .ico').forEach(function(n){if(n.querySelector('img,picture')||n.dataset.polishArt)return;var card=n.closest('[data-game-id]'),id=card&&card.dataset.gameId,art={esk:'assets/polish/learning-book.webp',v2post:'assets/mobile-magic/island-en.webp'}[id];if(art){n.textContent='';n.append(image(art));n.dataset.polishArt='true'}});
  document.querySelectorAll('.book .bkw button>span').forEach(function(s){if(s.dataset.polishArt||s.querySelector('img'))return;var key=s.textContent.trim(),asset=C&&C.wordArt(key);if(asset){s.textContent='';s.append(image(asset));s.dataset.polishArt='true'}});
  document.querySelectorAll('.book .book-tabs:not([data-keys])').forEach(function(t){t.dataset.keys='true';tabsKeyboard(t)});
  document.querySelectorAll('.lb-rewardcard img[src$=".svg"]').forEach(function(i){var match=i.src.match(/reward-([^/]+)\.svg/);if(match&&C&&C.rewardArt(match[1]))i.src=C.rewardArt(match[1])});
 }
 function queue(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;decorate()})}
 function init(options){C=options;watcher=new MutationObserver(queue);['gamePanel','gate'].forEach(function(id){var n=document.getElementById(id);if(n)watcher.observe(n,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']})});watcher.observe(document.body,{childList:true});document.addEventListener('click',function(e){if(e.target.closest('#fmChip')){recordKid=C.id();recordTab='rewards'}else if(e.target.closest('#tab_rec')){recordTab='learning'}},true);decorate()}
 global.PolishUI={init:init,records:records};
})(window);
