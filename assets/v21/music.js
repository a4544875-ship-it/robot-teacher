/* 奇蹟知識島 v21 — 背景音樂（全部原創、用 Web Audio 即時合成，沒有音檔、離線也能播）
 *
 * 每首曲子有 A、B 兩段（各 4 小節），照「A → A' → B → A''」播完 16 小節才重複（約 30～45 秒）。
 * 重複段會自動加變化：第二次主旋律加高八度、第三次加鈴鐺；段落結尾有鼓的過門。
 *
 * 樂器：lead 主旋律、bell 鈴鐺、pluck 撥弦、brass 銅管、pad 和弦鋪底、arp 分解和弦、bass 低音、鼓組（kick/snare/hat/shaker）。
 * 想自己改曲子：改下面 TR 裡的數字就好。
 *   k   = 主音（MIDI 編號，60 = 中央 C）      bpm = 速度
 *   sc  = 音階：maj 大調、min 小調、dor 多利安
 *   A/B = 旋律：數字是音階第幾個音（0 = 主音、7 = 高八度主音、-1 = 低一個音），「.」是休止（前一個音自動延長）
 *         一小節 8 格（八分音符），用「|」分小節
 *   ca/cb = A 段、B 段每小節的和弦（音階第幾級：0 = I、3 = IV、4 = V、5 = vi …）
 *   lead/bass/drum/arp/pad/bell = 音色與伴奏風格
 */
(function(global){
'use strict';
var SC={maj:[0,2,4,5,7,9,11],min:[0,2,3,5,7,8,10],dor:[0,2,3,5,7,9,10]};
var TR={
 /* 封面、選帳號：魔法城堡（莊嚴、閃亮） */
 cover:{k:60,bpm:100,sc:'maj',lead:'bell',lv:.9,bass:'root',drum:'soft',arp:'up',pad:1,
   ca:[0,5,3,4],A:'4 . 2 . 4 . 7 . | 5 . . 7 . 5 2 . | 3 . 5 . 7 . 5 . | 6 . . 4 . . . .',
   cb:[3,0,5,4],B:'7 . 9 . 8 . 7 . | 4 . 7 . 4 . 2 . | 5 . 4 . 2 . 4 . | 6 . 5 . 4 . 1 .'},
 /* 大廳：開心流行 */
 lobby:{k:65,bpm:112,sc:'maj',lead:'triangle',lv:1,bass:'pulse',drum:'pop',arp:'alt',
   ca:[0,4,5,3],A:'0 . 2 4 . 2 4 . | 6 . 4 . 1 . 4 . | 5 . 4 2 . 0 2 . | 3 . 5 . 7 . 5 .',
   cb:[3,0,1,4],B:'7 . 7 5 . 3 5 . | 4 . 2 . 4 . 7 . | 8 . 7 5 . 3 1 . | 4 . . 6 . . 4 .'},
 /* 英文樂園：陽光、輕快 */
 en:{k:64,bpm:118,sc:'maj',lead:'square',lv:.6,bass:'pulse',drum:'pop',arp:'alt',bell:1,
   ca:[0,4,5,3],A:'0 . 4 . 7 . 4 . | 6 . 4 . 1 . 4 . | 5 . 2 . 5 . 7 . | 5 . 3 . 0 . . .',
   cb:[3,4,5,4],B:'3 . 5 7 . 5 3 . | 4 . 6 8 . 6 4 . | 5 . 7 9 . 7 5 . | 6 . 4 . 1 . . .'},
 /* 單字闖關島：彈跳 8-bit */
 obby:{k:67,bpm:132,sc:'maj',lead:'square',lv:.55,bass:'oct',drum:'chip',
   ca:[0,3,4,0],A:'0 2 4 2 7 . 4 . | 5 3 5 7 9 . 7 . | 6 4 6 8 4 . 6 . | 7 . 4 . 0 . . .',
   cb:[5,3,1,4],B:'5 . 7 . 9 7 5 . | 3 . 5 . 7 5 3 . | 1 3 5 3 1 3 5 . | 4 . 6 . 8 . 6 4'},
 /* 數學樂園：解謎、撥弦 */
 math:{k:67,bpm:120,sc:'maj',lead:'pluck',lv:1.1,bass:'pulse',drum:'pop',arp:'alt',
   ca:[0,3,4,0],A:'4 . 2 0 . 2 4 . | 7 . 5 3 . 5 7 . | 8 . 6 4 . 6 8 . | 7 . 4 . 2 . 0 .',
   cb:[5,3,1,4],B:'5 . 5 . 7 . 5 . | 3 . 3 . 5 . 3 . | 1 . 3 . 5 . 6 . | 4 . . . 1 . . .'},
 /* 自然樂園：好奇、木琴 */
 sci:{k:62,bpm:100,sc:'maj',lead:'pluck',lv:1.1,bass:'root',drum:'soft',arp:'up',bell:1,
   ca:[0,3,0,4],A:'0 . 2 . 4 . 2 . | 3 . 5 . 7 . 5 . | 4 . 2 . 4 . 7 . | 6 . 4 . 1 . . .',
   cb:[5,3,1,4],B:'5 . 4 . 2 . 4 . | 5 . 7 . 5 . 3 . | 1 . 3 . 5 . 3 . | 4 . 6 . 8 . . .'},
 /* 社會樂園：家鄉民謠（五聲音階、撥弦） */
 soc:{k:67,bpm:104,sc:'maj',lead:'pluck',lv:1.1,bass:'root',drum:'soft',pad:1,bell:1,
   ca:[0,5,3,0],A:'4 . 5 4 2 . 0 . | 5 . 4 2 4 . . . | 7 . 5 4 2 . 4 . | 2 . 1 . 0 . . .',
   cb:[3,0,5,4],B:'5 . 7 . 8 . 7 . | 4 . 5 . 7 . 4 . | 5 . 4 . 2 . 1 . | 1 . 2 . 4 . . .'},
 /* 家鄉小鎮：悠閒小鎮（輕搖擺、鈴鐺） */
 town:{k:65,bpm:108,sc:'maj',lead:'bell',lv:.9,bass:'walk',drum:'swing',sw:.12,arp:'alt',
   ca:[0,3,4,0],A:'2 . 4 . 7 . 4 . | 3 . 5 . 7 . 5 . | 4 . 6 . 8 . 7 . | 7 . 4 . 2 . . .',
   cb:[5,1,3,4],B:'5 . 7 . 9 . 7 . | 1 . 3 . 5 . 3 . | 3 . 5 . 7 . 8 . | 6 . 4 . 1 . . .'},
 /* 小石獅冒險：冒險進行曲 */
 adv:{k:60,bpm:128,sc:'maj',lead:'brass',lv:.8,bass:'oct',drum:'march',pad:1,
   ca:[0,0,3,4],A:'0 . 0 4 . 4 7 . | 7 . 6 4 . 2 4 . | 3 . 3 5 . 5 8 . | 7 . 6 . 4 . . .',
   cb:[5,3,0,4],B:'5 . 5 7 . 5 4 . | 3 . 3 5 . 3 2 . | 0 . 2 4 . 7 9 . | 8 . 7 . 6 . 4 .'},
 /* 小石獅魔王戰：英勇小調 */
 advboss:{k:57,bpm:152,sc:'min',lead:'brass',lv:.75,bass:'drive',drum:'rock',pad:1,
   ca:[0,0,5,4],A:'0 . 0 . 3 . 4 . | 0 . 0 . 6 . 4 . | 5 . 5 . 4 . 2 . | 4 . 6 . 7 . 4 .',
   cb:[3,4,5,4],B:'7 . 7 . 5 . 3 . | 4 . 4 . 6 . 8 . | 5 . 7 . 9 . 7 . | 6 . 4 . 2 . 1 .'},
 /* 花園：溫柔、慢 */
 garden:{k:60,bpm:84,sc:'maj',lead:'sine',lv:1,bass:'root',drum:'none',arp:'up',pad:1,bell:1,
   ca:[0,4,5,3],A:'4 . . 2 . . 0 . | 1 . . 4 . . . . | 5 . . 4 . . 2 . | 3 . . 1 . . . .',
   cb:[3,0,1,4],B:'5 . . 7 . . 5 . | 4 . . 2 . . 0 . | 3 . . 5 . . 3 . | 1 . . 4 . . . .'},
 /* 賽車：快速搖滾 */
 kart:{k:57,bpm:164,sc:'maj',lead:'square',lv:.5,bass:'drive',drum:'rock',
   ca:[0,3,4,0],A:'0 0 4 0 7 0 4 0 | 3 3 5 3 7 3 5 3 | 4 4 6 4 8 4 6 4 | 7 . 6 . 4 . 2 .',
   cb:[5,3,0,4],B:'5 . 7 . 9 . 7 5 | 3 . 5 . 7 . 5 3 | 0 2 4 7 9 7 4 2 | 4 . 4 . 6 . 8 .'},
 /* 星空、隕石：夢幻小調 */
 space:{k:62,bpm:108,sc:'dor',lead:'triangle',lv:1,bass:'root',drum:'soft',arp:'up',pad:1,bell:1,
   ca:[0,5,2,6],A:'0 . . 4 . . 2 . | 5 . . 4 . . 2 . | 2 . . 4 . . 7 . | 6 . 4 . 1 . . .',
   cb:[3,0,6,4],B:'7 . 5 . 3 . 5 . | 4 . 2 . 0 . . . | 6 . 4 . 6 . 8 . | 7 . . . 4 . . .'},
 /* 彈跳遊戲：俏皮 */
 bounce:{k:60,bpm:140,sc:'maj',lead:'pluck',lv:1.1,bass:'oct',drum:'pop',
   ca:[0,3,4,0],A:'0 . 4 . 2 . 4 . | 3 . 7 . 5 . 3 . | 4 . 8 . 6 . 4 . | 7 4 2 4 0 . . .',
   cb:[5,1,4,4],B:'5 7 9 7 5 . 2 . | 1 3 5 3 1 . 4 . | 4 6 8 6 4 . 1 . | 2 . 4 . 6 . 4 .'},
 /* 餐廳：爵士搖擺 */
 diner:{k:65,bpm:116,sc:'maj',lead:'triangle',lv:.9,bass:'walk',drum:'swing',sw:.18,arp:'alt',
   ca:[0,5,1,4],A:'0 . 2 3 4 . 7 . | 5 . 4 . 2 . 0 . | 1 . 3 4 5 . 8 . | 6 . 4 . 1 . . .',
   cb:[3,2,1,4],B:'3 . 5 . 7 . 8 . | 7 . 6 . 4 . 2 . | 3 . 4 . 5 . 3 . | 4 . 6 . 4 . . .'},
 /* 魔王（英文、數學）：緊張小調 */
 boss:{k:57,bpm:150,sc:'min',lead:'saw',lv:.45,bass:'drive',drum:'rock',pad:1,
   ca:[0,5,6,4],A:'0 0 . 0 2 . 0 . | 5 5 . 5 4 . 2 . | 6 6 . 6 4 . 6 . | 4 . 7 . 6 4 2 1',
   cb:[3,0,3,4],B:'3 . 5 . 7 . 5 3 | 0 . 2 . 4 . 7 . | 3 . 5 . 8 . 7 5 | 4 . 6 . 8 . 6 4'}
};
var FORM=['A','A2','B','A3'];
function parse(s){return s.replace(/\|/g,' ').trim().split(/\s+/).map(function(t){return t==='.'?null:+t})}
Object.keys(TR).forEach(function(k){var t=TR[k];t.mA=parse(t.A);t.mB=parse(t.B)});

global.RTMusic=function(opt){
  var want='',cur='',tr=null,master=null,comp=null,step=0,nextT=0,timer=null,unlocked=false,noise=null;
  function ac(){return opt.get()}
  function hz(m){return 440*Math.pow(2,(m-69)/12)}
  function deg(t,d){var sc=SC[t.sc]||SC.maj,o=Math.floor(d/7);return t.k+sc[((d%7)+7)%7]+12*o}
  function env(g,t0,a,peak,d){g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(Math.max(.0002,peak),t0+a);g.gain.exponentialRampToValueAtTime(.0001,t0+a+d)}
  function osc(type,f,t0,dur,vol,dest,detune){var a=ac(),o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=f;if(detune)o.detune.value=detune;env(g,t0,.012,vol,dur);o.connect(g);g.connect(dest||master);o.start(t0);o.stop(t0+dur+.05);return o}
  /* ---- 樂器 ---- */
  function lead(t,midi,t0,dur,vol){var a=ac(),f=hz(midi),ty=t.lead;
    if(ty==='bell'){osc('sine',f,t0,Math.max(dur,.5)*1.4,vol*1.1);osc('sine',f*2,t0,.35,vol*.35);osc('sine',f*3.01,t0,.18,vol*.15);return}
    if(ty==='pluck'){osc('triangle',f,t0,Math.min(dur,.32)+.12,vol*1.2);osc('sine',f*2,t0,.12,vol*.3);return}
    if(ty==='brass'){var o=a.createOscillator(),o2=a.createOscillator(),fl=a.createBiquadFilter(),g=a.createGain();o.type='sawtooth';o2.type='sawtooth';o.frequency.value=f;o2.frequency.value=f;o2.detune.value=8;
      fl.type='lowpass';fl.Q.value=1.2;fl.frequency.setValueAtTime(500,t0);fl.frequency.linearRampToValueAtTime(2400,t0+.06);fl.frequency.linearRampToValueAtTime(1300,t0+dur);
      g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(vol*.7,t0+.04);g.gain.setValueAtTime(vol*.6,t0+Math.max(.05,dur*.7));g.gain.exponentialRampToValueAtTime(.0001,t0+dur+.08);
      o.connect(fl);o2.connect(fl);fl.connect(g);g.connect(master);o.start(t0);o2.start(t0);o.stop(t0+dur+.12);o2.stop(t0+dur+.12);return}
    var o3=a.createOscillator(),g3=a.createGain();o3.type=ty==='saw'?'sawtooth':ty;o3.frequency.value=f;
    if(dur>.3&&(ty==='sine'||ty==='triangle')){var lfo=a.createOscillator(),lg=a.createGain();lfo.frequency.value=5.2;lg.gain.value=f*.006;lfo.connect(lg);lg.connect(o3.frequency);lfo.start(t0+.12);lfo.stop(t0+dur+.05)}
    env(g3,t0,.015,vol*(ty==='square'||ty==='saw'?.55:1),dur);o3.connect(g3);g3.connect(master);o3.start(t0);o3.stop(t0+dur+.05)}
  function bell(midi,t0,vol){var f=hz(midi);osc('sine',f,t0,.7,vol);osc('sine',f*2.76,t0,.2,vol*.25)}
  function bass(f,t0,dur,vol){var a=ac();osc('triangle',f,t0,dur,vol);osc('sine',f/2,t0,dur*.8,vol*.5)}
  function pad(t,root,t0,dur){var a=ac(),fl=a.createBiquadFilter(),g=a.createGain();fl.type='lowpass';fl.frequency.value=900;fl.Q.value=.5;g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(.022,t0+.35);g.gain.setValueAtTime(.022,t0+dur-.3);g.gain.linearRampToValueAtTime(.0001,t0+dur+.2);
    fl.connect(g);g.connect(master);[0,2,4].forEach(function(i){[-7,7].forEach(function(dt){var o=a.createOscillator();o.type='sawtooth';o.frequency.value=hz(deg(t,root+i));o.detune.value=dt;o.connect(fl);o.start(t0);o.stop(t0+dur+.3)})})}
  function nz(){if(noise)return noise;var a=ac(),b=a.createBuffer(1,a.sampleRate*.5,a.sampleRate),d=b.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=Math.random()*2-1;noise=b;return b}
  function hit(t0,type,vol){var a=ac();
    if(type==='kick'){var o=a.createOscillator(),g=a.createGain();o.frequency.setValueAtTime(150,t0);o.frequency.exponentialRampToValueAtTime(42,t0+.16);env(g,t0,.004,vol,.22);o.connect(g);g.connect(master);o.start(t0);o.stop(t0+.3);return}
    var s=a.createBufferSource(),f=a.createBiquadFilter(),g2=a.createGain();s.buffer=nz();
    if(type==='hat'){f.type='highpass';f.frequency.value=7000;env(g2,t0,.002,vol,.035)}
    else if(type==='shk'){f.type='bandpass';f.frequency.value=5200;f.Q.value=.8;env(g2,t0,.01,vol,.06)}
    else if(type==='brush'){f.type='bandpass';f.frequency.value=2500;f.Q.value=.6;env(g2,t0,.02,vol,.12)}
    else{f.type='bandpass';f.frequency.value=type==='clap'?1500:1900;f.Q.value=.9;env(g2,t0,.003,vol,type==='clap'?.11:.14);if(type==='snare')osc('triangle',190,t0,.08,vol*.5)}
    s.connect(f);f.connect(g2);g2.connect(master);s.start(t0);s.stop(t0+.2)}
  var DR={
    pop:function(i,t0,sd,fill){if(i===0||i===4||(i===5&&Math.random()<.35))hit(t0,'kick',.32);if(i===2||i===6)hit(t0,'clap',.12);hit(t0,'hat',i%2?.025:.04);if(fill&&i>=6){hit(t0+sd/2,'snare',.1)}},
    chip:function(i,t0,sd,fill){if(i===0||i===3||i===4)hit(t0,'kick',.28);if(i===2||i===6)hit(t0,'snare',.09);if(i%2)hit(t0,'hat',.03);if(fill&&i>=4)hit(t0+sd/2,'snare',.07)},
    rock:function(i,t0,sd,fill){if(i===0||i===3||i===4||i===7&&!fill)hit(t0,'kick',.34);if(i===2||i===6)hit(t0,'snare',.15);hit(t0,'hat',.04);if(fill&&i>=4){hit(t0,'snare',.12);hit(t0+sd/2,'snare',.1)}},
    march:function(i,t0,sd,fill){if(i===0||i===4)hit(t0,'kick',.3);if(i%2===0)hit(t0,'snare',i===0?.13:.08);if(i===7||fill&&i>=4){hit(t0,'snare',.06);hit(t0+sd/2,'snare',.07)}if(i%2)hit(t0,'hat',.025)},
    swing:function(i,t0,sd,fill){if(i===0||i===4)hit(t0,'kick',.2);if(i===2||i===6)hit(t0,'brush',.06);if(i!==1&&i!==5)hit(t0,'hat',.03);if(fill&&i>=6)hit(t0,'snare',.07)},
    soft:function(i,t0){if(i===0)hit(t0,'kick',.18);if(i===4)hit(t0,'kick',.12);if(i%2)hit(t0,'shk',.03)},
    none:function(i,t0){if(i===2||i===6)hit(t0,'shk',.018)}};
  /* ---- 排程 ---- */
  function kill(){if(master){var m=master,a=ac();try{m.gain.cancelScheduledValues(a.currentTime);m.gain.setTargetAtTime(.0001,a.currentTime,.06)}catch(e){}setTimeout(function(){try{m.disconnect()}catch(e){}},500);master=null}cur='';tr=null}
  function tick(){var a=ac();if(!unlocked||!a)return;var w=(opt.muted()||document.hidden)?'':want;
    if(w!==cur){kill();if(w&&TR[w]){cur=w;tr=TR[w];if(!comp){comp=a.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=4;comp.connect(a.destination)}
      master=a.createGain();master.gain.setValueAtTime(.0001,a.currentTime);master.gain.linearRampToValueAtTime(.6,a.currentTime+.4);master.connect(comp);step=0;nextT=a.currentTime+.1}}
    if(!tr)return;var t=tr,sd=60/t.bpm/2;
    while(nextT<a.currentTime+.35){var pos=step%128,sec=FORM[Math.floor(pos/32)],s=pos%32,bar=Math.floor(s/8),i=s%8,isB=sec==='B',mel=isB?t.mB:t.mA,ch=isB?t.cb:t.ca,r=ch[bar],
        t0=nextT+((t.sw&&i%2)?sd*t.sw:0),m=mel[s],fill=bar===3&&(sec==='A2'||sec==='B'||sec==='A3');
      if(m!==null&&m!==undefined){var L=1;while(s+L<32&&(s+L)%8!==0&&mel[s+L]===null&&L<4)L++;var dur=sd*(L>1?L*.9:.85),v=.06*(t.lv||1)*(.9+Math.random()*.2);
        lead(t,deg(t,m)+12,t0,dur,v);
        if(sec==='A2'&&t.lead!=='bell')lead(t,deg(t,m)+24,t0,dur*.8,v*.35);
        if((sec==='A3'||t.bell&&sec==='B')&&i%2===0)bell(deg(t,m)+24,t0,.018)}
      var bs=t.bass,rootM=deg(t,r)-12;
      if(bs==='root'){if(i===0)bass(hz(rootM),t0,sd*3,.07);if(i===4)bass(hz(deg(t,r+4)-12),t0,sd*3,.06)}
      else if(bs==='pulse'){if(i%2===0)bass(hz(i===4?deg(t,r+4)-12:rootM),t0,sd*1.6,.065)}
      else if(bs==='oct'){if(i%2===0)bass(hz(rootM+(i%4===2?12:0)),t0,sd*1.4,.06)}
      else if(bs==='walk'){if(i%2===0)bass(hz(deg(t,r+[0,2,4,5][i/2])-12),t0,sd*1.7,.07)}
      else if(bs==='drive'){bass(hz(i===6?deg(t,r+4)-12:rootM),t0,sd*.8,i%2?.04:.065)}
      if(t.arp==='up')osc('triangle',hz(deg(t,r+[0,2,4,7,4,2,4,7][i])),t0,sd*.9,.02);
      else if(t.arp==='alt'&&i%2)osc('triangle',hz(deg(t,r+(i===3||i===7?4:2))),t0,sd*.7,.022);
      if(t.pad&&i===0)pad(t,r,t0,sd*8);
      (DR[t.drum]||DR.none)(i,t0,sd,fill);
      step++;nextT+=sd}}
  function unlock(){if(unlocked)return;try{var a=ac()||opt.set(new (global.AudioContext||global.webkitAudioContext)());if(a.state==='suspended')a.resume();unlocked=true;timer=setInterval(tick,80);tick()}catch(e){}}
  ['pointerdown','keydown','touchend'].forEach(function(ev){document.addEventListener(ev,unlock,{capture:true,passive:true})});
  document.addEventListener('visibilitychange',function(){var a=ac();if(!document.hidden&&a&&a.state==='suspended')try{a.resume()}catch(e){}});
  return {play:function(k){want=k||''},stop:function(){want=''},want:function(){return want},cur:function(){return cur},tracks:function(){return Object.keys(TR)}};
};
})(window);
