"""Generate an untracked, cloud-disconnected science QA fixture from current source."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
s=(root/'index.html').read_text(encoding='utf-8')
s=s[:s.index('<script>\n// 可安裝')]+s[s.index('<script>/* v14'):]
a=s.index('Store.connect();');b=s.index('renderCover();',a)+len('renderCover();')
fixture="""
renderGameHome();
if(window.GateV18)GateV18.init({KIDS:KIDS,Store:Store,kidOf:kidOf,growOf:growOf,subPts:subPts,scLevel:scLevel,esc:esc,sfx:sfx,confetti:confetti,hashPin:hashPin,enter:enter,renderPin:renderPin,Music:Music,PIC:PIC,gate:gate,setMode:function(m){gateMode=m},getMode:function(){return gateMode}});
var qaArgs=new URLSearchParams(location.search),qaGame=qaArgs.get('game')||'scirc';
Store.mut('de',function(k){k.gr=qaArgs.get('grade')||'三';k.pts=100;k.byGame={};k.sc={};if(qaArgs.has('unlock'))['mag','circ','water','plant','animal','moon','sound','wind','weather','insect'].forEach(function(st){[2,3,4].forEach(function(gr){k.sc[st+'@'+gr]=[3,3,3,1]})});});enter('de');
if(qaArgs.has('case')){var qaPlan=Science26Core.plan;Science26Core.plan=function(){var p=qaPlan.apply(this,arguments);return [p[+qaArgs.get('case')||0]];};}
if(qaArgs.has('open'))pgOpenK=function(){return true};
if(qaArgs.has('progress'))Store.mut('de',function(k){var st=STI[qaGame];if(st)k.sc[scKey(st.k)]=qaArgs.get('progress').split(',').map(Number).concat([0]).slice(0,4);});
if(qaArgs.has('safe')){var qaStyle=document.createElement('style');qaStyle.textContent='.s26-game .pdb{padding-left:44px!important;padding-right:20px!important;padding-bottom:20px!important}';document.head.appendChild(qaStyle);}
startGame(GAMES.filter(function(g){return g.id===qaGame})[0]);
"""
s=s[:a]+fixture+s[b:]
assert 'Store.connect();' not in s and 'firebase-app-compat.js' not in s
(root/'preview-v26.html').write_text(s,encoding='utf-8')
print('Generated isolated preview-v26.html; keep untracked.')
