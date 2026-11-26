"""Generate an untracked, offline-only synthetic-account UI fixture."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
s=(root/'index.html').read_text(encoding='utf-8')
head=s[:s.index('<script>\n// 可安裝')]
s=head+s[s.index('<script>/* v14'):]
a=s.index('Store.connect();');b=s.index('renderCover();',a)+len('renderCover();')
fixture="""/* Isolated v25 synthetic account. No Firebase bootstrap or cloud connection. Never publish. */
renderGameHome();
if(window.GateV18)GateV18.init({KIDS:KIDS,Store:Store,kidOf:kidOf,growOf:growOf,subPts:subPts,scLevel:scLevel,esc:esc,sfx:sfx,confetti:confetti,hashPin:hashPin,enter:enter,renderPin:renderPin,Music:Music,PIC:PIC,gate:gate,setMode:function(m){gateMode=m},getMode:function(){return gateMode}});
var qaArgs=new URLSearchParams(location.search),qaGame=qaArgs.get('game')||'tower';Store.mut('de',function(k){k.gr=qaArgs.get('grade')||'三';k.pts=100;k.byGame={};});enter('de');
if(qaArgs.has('fixed'))PGX.pool=function(){return WORDS.filter(function(w){return ['cat','dog','pig','book','bag','hat','car','ball','cup'].indexOf(w[0])>=0})};
if(qaArgs.has('net')){Net.set=function(){};Net.off=function(){};Net.peers=function(){return {qa_peer:{tok:'qa-v25-race',k:'ren',n:'測試隊友',sc:0,pr:0}}};}
if(qaArgs.has('safe')){var qaStyle=document.createElement('style');qaStyle.textContent='.v25-game{--v25-left:44px!important;--v25-right:20px!important;--v25-bottom:20px!important}';document.head.appendChild(qaStyle);}
startGame(GAMES.filter(function(g){return g.id===qaGame})[0]);if(qaArgs.has('play'))setTimeout(function(){var b=document.querySelector('#mSolo');if(b)b.click()},250);
"""
s=s[:a]+fixture+s[b:]
s=s.replace('var sc=a.sc,my=0,op=0,',"var sc=a.sc,my=+(new URLSearchParams(location.search).get('floor')||0),op=0,")
s=s.replace('var sc=a.sc,hp=3,ri=-1,',"var sc=a.sc,hp=3,ri=(+(new URLSearchParams(location.search).get('round')||0))-1,")
s=s.replace("$('#mSolo').addEventListener('click',function(){sfx('tap');launch(g)});","$('#mSolo').addEventListener('click',function(){sfx('tap');launch(g,qaArgs.has('net')?{tok:'qa-v25-race'}:{})});")
assert 'Store.connect();' not in s and 'firebase-app-compat.js' not in s
(root/'preview-v25.html').write_text(s,encoding='utf-8')
print('Generated isolated preview-v25.html; keep it untracked.')
