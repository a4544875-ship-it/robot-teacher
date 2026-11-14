/* v15.4 小石獅守護家鄉：3D 動作冒險（社會島）
   - 冒險區域跟著外面的站同步：站拿到徽章（每課 2 顆星）就解鎖那一區，題目只出已通過的單元
   - 自己操作：搖桿移動、跳（二段跳）、衝刺撞箱子、吼！打怪和吼開門
   - 答題用動作完成：跳上對的平台、吼開對的門、把東西送進對的房子、把東西搬進對的籃子、打倒搗蛋怪
   - 兩人連線：同一區一起玩，誰答對門就為兩個人打開，魔王血量一起扣
   - 冒險裡升級、拿寶物、收集家鄉幣；也會加社會分 */
(function(global){
'use strict';
var C=null,SOC=null,T=null,G=null,css=false;
var DEMO=true; /* 測試版：還沒通過的區也先開放試玩 */
var ZONES=[
 {k:'3a3',n:'班級廣場',g:3,boss:'m_purple',bn:'吵架怪',tr:['sc_award','班級榮譽獎盃'],sky:0x9fd8ff,top:0x7fd06f,side:0xb07a4a,path:0xf1d9a6,built:1},
 {k:'3a1',n:'溫馨家園',g:3,boss:'m_bucket',bn:'懶惰怪',tr:['fam_three','全家福相框']},
 {k:'3a2',n:'學習森林',g:3,boss:'m_cyclops',bn:'分心怪',tr:['l_lib','智慧之書']},
 {k:'3a4',n:'校園大操場',g:3,boss:'m_red',bn:'霸凌怪',tr:['sc_tug','友誼拔河繩']},
 {k:'3b1',n:'社區街道',g:3,boss:'m_slime',bn:'亂丟垃圾怪',tr:['pf_post','郵差的信']},
 {k:'3b2',n:'熱鬧市場',g:3,boss:'m_cat',bn:'亂花錢怪',tr:['i_piggy','金撲滿']},
 {k:'3b3',n:'超市大樓',g:3,boss:'m_fire',bn:'過期怪',tr:['i_ecobag','環保購物袋']},
 {k:'3b4',n:'古地名山谷',g:3,boss:'s_wizard',bn:'忘記怪',tr:['nm_stone','古老地名碑']},
 {k:'4a1',n:'山河平原',g:4,boss:'m_snow',bn:'浪費水怪',tr:['w_dam','水庫之鑰']},
 {k:'4a2',n:'三合院村',g:4,boss:'s_boar',bn:'拆房怪',tr:['a_lamp','古早煤油燈']},
 {k:'4a3',n:'廟口老街',g:4,boss:'s_ghost',bn:'塗鴉怪',tr:['t_jiao','神明筊杯']},
 {k:'4a4',n:'節慶廣場',g:4,boss:'m_bat',bn:'偷粽子怪',tr:['i_zongzi','金粽子']},
 {k:'4b1',n:'產業農場',g:4,boss:'s_slime',bn:'汙染怪',tr:['n_rice','金稻穗']},
 {k:'4b2',n:'人口城鎮',g:4,boss:'s_ice',bn:'冷漠怪',tr:['pf_center','社區之心']},
 {k:'4b3',n:'交通車站',g:4,boss:'s_flame',bn:'闖紅燈怪',tr:['v_hsr','高鐵模型']},
 {k:'4b4',n:'家鄉風景',g:4,boss:'m_yeti',bn:'破壞怪',tr:['hm_sun','太陽餅金盒']}];
var LV=[0,120,300,550,900,1350,1900,2600,3400,4300];
function lvOf(xp){var l=1;LV.forEach(function(v,i){if(xp>=v)l=i+1});return l}
function esc(s){return C.esc(String(s))}
function sa(id){var k=C.Store.kid(id)||{};return k.sa&&typeof k.sa==='object'?k.sa:{}}
function saMut(id,f){C.Store.mut(id,function(k){var o=k.sa&&typeof k.sa==='object'?k.sa:(k.sa={});o.z=o.z||{};o.t=o.t||{};f(o)})}
function zoneOpen(id,z){if(!z.built)return 'build';var u=SOC._units[z.k];if(!u)return 'build';if(!C.isKid())return 'open';if(SOC.badge(id,u))return 'open';return DEMO?'demo':'lock'}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function shufR(a,R){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(R()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function img(k){return SOC.img(k)}
function cap(k){return SOC._cap[k]||''}
function loadThree(){return new Promise(function(res,rej){if(global.THREE)return res(global.THREE);var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.onload=function(){global.THREE?res(global.THREE):rej()};s.onerror=rej;document.head.appendChild(s)})}

/* ================= 樣式 ================= */
function addCss(){if(css)return;css=true;var st=document.createElement('style');st.textContent=[
'.sav{position:fixed;inset:0;z-index:9000;background:#9fd8ff;color:#1d2b3a;font-family:inherit;overflow:hidden;touch-action:none;-webkit-user-select:none;user-select:none}',
'.sav canvas{display:block;width:100%;height:100%}',
'.sav-top{position:absolute;left:0;right:0;top:0;padding:calc(8px + env(safe-area-inset-top,0px)) calc(10px + env(safe-area-inset-right,0px)) 8px calc(10px + env(safe-area-inset-left,0px));display:flex;align-items:center;gap:8px;pointer-events:none}',
'.sav-top>*{pointer-events:auto}.sav-x{border:0;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.92);font-size:22px;font-weight:900;color:#334;box-shadow:0 3px 8px rgba(0,0,0,.2)}',
'.sav-hp i svg{display:block;fill:#e0574a}.sav-hp i.off svg{fill:#d5d5d5}.sav-hp.shake{animation:savshake .4s}@keyframes savshake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
'.sav-flash{position:absolute;inset:0;pointer-events:none;background:radial-gradient(transparent 45%,rgba(255,40,40,.55));opacity:0;transition:opacity .35s}.sav-flash.on{opacity:1;transition:none}',
'.sav-help{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.sav-help div{background:#f4f8fb;border-radius:14px;padding:8px;text-align:center;font-size:13.5px;line-height:1.4}.sav-help b{display:block;font-size:20px;margin-bottom:2px}',
'.sav-hp{display:flex;gap:2px;align-items:center;font-size:22px;background:rgba(255,255,255,.88);border-radius:999px;padding:4px 10px;box-shadow:0 3px 8px rgba(0,0,0,.15)}.sav-hp i{font-style:normal;color:#e0574a}.sav-hp i.off{color:#cfcfcf}',
'.sav-coin{display:flex;align-items:center;gap:4px;background:rgba(255,255,255,.88);border-radius:999px;padding:4px 12px;font-weight:900;font-size:17px;box-shadow:0 3px 8px rgba(0,0,0,.15)}.sav-coin b{color:#c98f12}',
'.sav-prog{flex:1;height:10px;background:rgba(255,255,255,.6);border-radius:6px;overflow:hidden;min-width:60px}.sav-prog i{display:block;height:100%;width:0;background:linear-gradient(90deg,#46b37a,#ffd75e);transition:width .3s}',
'.sav-q{position:absolute;left:50%;top:calc(64px + env(safe-area-inset-top,0px));transform:translateX(-50%);width:min(92vw,620px);background:rgba(255,255,255,.96);border-radius:18px;padding:10px 14px;box-shadow:0 6px 18px rgba(0,0,0,.2);font-size:clamp(16px,4.2vw,20px);font-weight:800;line-height:1.45;text-align:center;color:#1d2b3a;pointer-events:none}',
'.sav-q small{display:block;font-size:13px;color:#2f8f5b;font-weight:800;margin-bottom:2px}.sav-q.pic{display:flex;align-items:center;gap:10px;text-align:left;pointer-events:auto}.sav-q.pic img{width:84px;height:84px;object-fit:cover;border-radius:12px;flex:none;cursor:zoom-in}.sav-q.pic div{flex:1;min-width:0}',
'.sav-zoom{position:absolute;inset:0;background:rgba(10,20,40,.6);display:grid;place-items:center;z-index:6}.sav-zoom img{max-width:88vw;max-height:70vh;border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.4)}',
'.sav-tip{position:absolute;left:50%;bottom:calc(150px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:rgba(29,43,58,.86);color:#fff;border-radius:14px;padding:8px 14px;font-size:16px;font-weight:700;max-width:86vw;text-align:center;pointer-events:none;transition:opacity .25s}',
'.sav-stick{position:absolute;left:calc(18px + env(safe-area-inset-left,0px));bottom:calc(22px + env(safe-area-inset-bottom,0px));width:132px;height:132px;border-radius:50%;background:rgba(255,255,255,.28);border:3px solid rgba(255,255,255,.7);touch-action:none}',
'.sav-stick i{position:absolute;left:50%;top:50%;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;background:rgba(255,255,255,.92);box-shadow:0 3px 8px rgba(0,0,0,.25)}',
'.sav-btns{position:absolute;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(18px + env(safe-area-inset-bottom,0px));width:210px;height:170px}',
'.sav-b{position:absolute;border:0;border-radius:50%;font-weight:900;color:#5b3412;box-shadow:0 5px 0 rgba(0,0,0,.25),0 8px 16px rgba(0,0,0,.2);touch-action:none;display:grid;place-items:center;line-height:1.05}',
'.sav-b small{display:block;font-size:11px;font-weight:800}',
'.sav-b.j{right:0;bottom:0;width:96px;height:96px;background:radial-gradient(circle at 35% 30%,#fff6c9,#ffc531);font-size:22px}',
'.sav-b.r{right:104px;bottom:6px;width:78px;height:78px;background:radial-gradient(circle at 35% 30%,#ffd6c9,#ff7a4a);font-size:19px;color:#fff;text-shadow:0 1px 0 #a33}',
'.sav-b.d{right:16px;bottom:104px;width:66px;height:66px;background:radial-gradient(circle at 35% 30%,#d9f0ff,#5ab0f0);font-size:16px;color:#fff;text-shadow:0 1px 0 #246}',
'.sav-b:active,.sav-b.on{transform:translateY(4px);box-shadow:0 1px 0 rgba(0,0,0,.25)}.sav-b.cd{filter:grayscale(.7) brightness(.85)}',
'.sav-boss{position:absolute;left:50%;top:calc(64px + env(safe-area-inset-top,0px));transform:translateX(-50%);width:min(80vw,460px);display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.94);border-radius:16px;padding:6px 10px;box-shadow:0 4px 12px rgba(0,0,0,.2)}',
'.sav-boss img{width:40px;height:40px;object-fit:contain}.sav-boss b{font-size:14px;white-space:nowrap}.sav-boss .bar{flex:1;height:14px;background:#eee;border-radius:8px;overflow:hidden}.sav-boss .bar i{display:block;height:100%;background:linear-gradient(90deg,#e0574a,#ff9a4a);transition:width .25s}',
'.sav-mod{position:absolute;inset:0;background:rgba(10,20,40,.55);display:grid;place-items:center;padding:16px;z-index:5}',
'.sav-card{width:min(94vw,560px);max-height:90vh;overflow:auto;background:#fff;border-radius:24px;padding:16px;box-shadow:0 12px 30px rgba(0,0,0,.35);display:flex;flex-direction:column;gap:12px;color:#1d2b3a;animation:savin .2s}',
'@keyframes savin{from{transform:scale(.92);opacity:0}to{transform:none;opacity:1}}',
'.sav-card h3{margin:0;font-size:clamp(18px,4.6vw,22px);line-height:1.45}.sav-card .who{display:flex;align-items:center;gap:10px}.sav-card .who img{width:60px;height:60px;object-fit:contain}',
'.sav-card .pic{align-self:center;max-width:100%;max-height:30vh;border-radius:14px}',
'.sav-ops{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.sav-op{border:0;font:inherit;font-weight:800;font-size:clamp(15px,4vw,18px);background:#f4f1ea;border-radius:16px;padding:12px 8px;min-height:58px;box-shadow:0 4px 0 #d8c9ad;color:#1d2b3a;cursor:pointer}',
'.sav-op img{display:block;width:100%;aspect-ratio:1.3;object-fit:contain;border-radius:10px;background:#fff;margin-bottom:4px}',
'.sav-op.ok{background:#dff6e6;box-shadow:0 4px 0 #57b47a}.sav-op.no{background:#ffe3df;box-shadow:0 4px 0 #e0705f}',
'.sav-go{align-self:center;border:0;font:inherit;font-weight:900;font-size:19px;color:#fff;background:linear-gradient(#ffb547,#f08a24);border-radius:999px;padding:12px 36px;box-shadow:0 4px 0 #c0651a;cursor:pointer}',
'.sav-go.g{background:linear-gradient(#5cc98a,#2f8f5b);box-shadow:0 4px 0 #1f6b42}.sav-go.s{background:#eef2f7;color:#334;box-shadow:0 4px 0 #c9d2dc}',
/* 大廳 */
'.sav-lob{position:absolute;inset:0;overflow:auto;background:linear-gradient(#7cc4ff,#c9ecff 40%,#e8f7e4);padding:calc(14px + env(safe-area-inset-top,0px)) 14px calc(20px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:12px;touch-action:pan-y}',
'.sav-lh{display:flex;align-items:center;gap:10px}.sav-lh h2{margin:0;font-size:22px;flex:1;color:#123}',
'.sav-me{display:flex;align-items:center;gap:12px;background:#fff;border-radius:20px;padding:10px 14px;box-shadow:0 4px 12px rgba(0,0,0,.1)}.sav-me img{width:74px;height:74px;object-fit:contain}.sav-me .t{flex:1;min-width:0}.sav-me b{font-size:18px}',
'.sav-xp{height:10px;background:#eef2f7;border-radius:6px;overflow:hidden;margin:4px 0}.sav-xp i{display:block;height:100%;background:linear-gradient(90deg,#5ab0f0,#46b37a)}',
'.sav-me small{color:#4b5b6b;font-size:13px}',
'.sav-zs{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}',
'.sav-z{position:relative;border:0;font:inherit;text-align:left;background:#fff;border-radius:18px;padding:8px;box-shadow:0 4px 0 #cfdccf,0 6px 14px rgba(0,0,0,.08);display:flex;flex-direction:column;gap:4px;cursor:pointer;color:#1d2b3a}',
'.sav-z img.b{width:100%;aspect-ratio:1.3;object-fit:contain;background:linear-gradient(#f3faff,#e4f4e0);border-radius:12px}.sav-z b{font-size:15px}.sav-z small{font-size:12px;color:#5c6b7a}',
'.sav-z.lock,.sav-z.build{opacity:.6}.sav-z.lock img.b,.sav-z.build img.b{filter:grayscale(1)}.sav-z .st{color:#f2b632;letter-spacing:1px}.sav-z .tag{position:absolute;top:8px;left:8px;background:#2f8f5b;color:#fff;font-size:11px;font-weight:800;border-radius:999px;padding:1px 8px}',
'.sav-z .tag.d{background:#f08a24}',
'.sav-trs{display:grid;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:8px;background:#fff;border-radius:18px;padding:10px}.sav-trs span{display:flex;flex-direction:column;align-items:center;font-size:11.5px;font-weight:800;text-align:center;color:#8a5a2b}.sav-trs img{width:58px;height:58px;object-fit:cover;border-radius:12px}.sav-trs span.off{color:#aaa}.sav-trs span.off img{filter:grayscale(1) opacity(.35)}',
'.sav-note{color:#3d4f61;font-size:13.5px;line-height:1.6;margin:0}',
'.sav-pick{display:flex;flex-direction:column;gap:10px}.sav-pick .row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}',
'.sav-peers{display:flex;flex-direction:column;gap:6px}.sav-peers div{display:flex;align-items:center;gap:8px;background:#f4f8fb;border-radius:12px;padding:6px 10px;font-weight:700}.sav-peers em{margin-left:auto;font-style:normal;font-size:13px;color:#2f8f5b}',
'.sav-fail .fx{text-align:center}.sav-fail .fx img{width:80px;height:80px;object-fit:contain;filter:grayscale(.6);transform:rotate(-12deg);animation:savSad 1.6s ease-in-out infinite}@keyframes savSad{50%{transform:rotate(-12deg) translateY(4px)}}.sav-fail h3{color:#c0392b!important;font-size:26px}.sav-fail .why{text-align:center;font-weight:800;color:#5a4636;margin:4px 0 8px;line-height:1.6}.sav-hearts{display:flex;gap:6px;justify-content:center;margin:0 0 10px}.sav-hearts i{width:26px;height:24px;background:#cfcfcf;-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 22%27%3E%3Cpath d=%27M12 21s-9-5.6-9-12A5 5 0 0 1 12 6a5 5 0 0 1 9 3c0 6.4-9 12-9 12z%27/%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 22%27%3E%3Cpath d=%27M12 21s-9-5.6-9-12A5 5 0 0 1 12 6a5 5 0 0 1 9 3c0 6.4-9 12-9 12z%27/%3E%3C/svg%3E") center/contain no-repeat}'+
'.sav-end .sav-stars{font-size:44px;text-align:center;color:#ddd;letter-spacing:4px}.sav-end .sav-stars i{font-style:normal}.sav-end .sav-stars i.on{color:#f2b632}',
'.sav-end .rw{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.sav-end .rw span{background:#fff7e0;border-radius:12px;padding:6px 10px;font-weight:800}',
'.sav-end .tr{display:flex;align-items:center;gap:10px;justify-content:center;font-weight:900;color:#8a5a2b}.sav-end .tr img{width:70px;height:70px;object-fit:cover;border-radius:14px}',
'.soc-advtop{display:flex;align-items:center;gap:12px;width:100%;border:0;font:inherit;cursor:pointer;text-align:left;color:#fff;background:linear-gradient(135deg,#6a4fd8,#2f8fd8);border-radius:20px;padding:10px 14px;box-shadow:0 4px 0 #2a3a8a,0 8px 18px rgba(60,80,200,.3)}',
'.soc-advtop img{width:62px;height:62px;object-fit:contain;flex:none;filter:drop-shadow(0 3px 4px rgba(0,0,0,.3))}.soc-advtop b{display:block;font-size:19px}.soc-advtop small{opacity:.95;font-size:13px}.soc-advtop .lv{margin-left:auto;text-align:right;font-weight:900;font-size:13px;line-height:1.35;white-space:nowrap}'
].join('\n');document.head.appendChild(st)}

/* ================= 社會島首頁的入口 ================= */
function entry(){var id=C.who(),s=sa(id),lv=lvOf(+s.xp||0),nz=0;ZONES.forEach(function(z){if(zoneOpen(id,z)==='open')nz++});
  return '<button class="soc-advtop" data-advtop="1"><img src="'+img('l_run')+'" alt=""><span><b>小石獅守護家鄉</b><small>3D 冒險・可以兩人連線・通過的站會變成冒險區域</small></span><span class="lv">Lv.'+lv+'<br>寶物 '+Object.keys(s.t||{}).length+'</span></button>'}

/* ================= 大廳 ================= */
var ROOT=null;
function open(){addCss();close();ROOT=document.createElement('div');ROOT.className='sav';document.body.appendChild(ROOT);C.sfx('win');lobby()}
function close(){if(G)G.stop();G=null;if(ROOT){ROOT.remove();ROOT=null}try{C.Net.off()}catch(e){}C.refresh&&C.refresh()}
function lobby(){var id=C.who(),s=sa(id),xp=+s.xp||0,lv=lvOf(xp),nx=LV[lv]||LV[LV.length-1],pv=LV[lv-1]||0;
  var h='<div class="sav-lob"><div class="sav-lh"><button class="sav-x" data-x="1" aria-label="離開">✕</button><h2>小石獅守護家鄉</h2></div>';
  h+='<div class="sav-me"><img src="'+img('l_front')+'" alt=""><div class="t"><b>'+(C.isKid()?esc(C.kidName())+' 的小石獅':'小石獅')+'・Lv.'+lv+'</b><div class="sav-xp"><i style="width:'+Math.min(100,Math.round((xp-pv)/Math.max(1,nx-pv)*100))+'%"></i></div><small>經驗 '+xp+(lv<LV.length?' / '+nx:'')+'・家鄉幣 '+(+s.c||0)+'・愛心 '+(4+Math.min(3,Math.floor(lv/3)))+' 顆・吼聲範圍 '+(4.5+lv*.2).toFixed(1)+'</small></div></div>';
  h+='<p class="sav-note">搗蛋怪把家鄉的寶物偷走了！外面的站拿到家鄉徽章，冒險裡那一區就會開放。每一區要跑酷、用動作答題，最後打倒搗蛋怪拿回寶物。'+(DEMO?'<b>測試版：還沒通過的區也先開放試玩。</b>':'')+'</p>';
  h+='<div class="sav-zs">';ZONES.forEach(function(z,i){var st=zoneOpen(id,z),stars=+(s.z||{})[z.k]||0;
    h+='<button class="sav-z '+st+'" data-z="'+i+'">'+(st==='open'?'<span class="tag">已解鎖</span>':st==='demo'?'<span class="tag d">試玩</span>':'')+'<img class="b" src="'+img(z.boss)+'" alt=""><b>'+esc(z.n)+'</b><small>'+(st==='build'?'建造中':st==='lock'?'外面的站拿到徽章才開放':'魔王：'+esc(z.bn))+'</small><span class="st">'+[0,1,2].map(function(j){return j<stars?'★':'☆'}).join('')+'</span></button>'});
  h+='</div><h3 style="margin:4px 0 0">寶物館</h3><div class="sav-trs">'+ZONES.map(function(z){var on=(s.t||{})[z.k];return '<span class="'+(on?'':'off')+'"><img src="'+img(z.tr[0])+'" alt="">'+esc(on?z.tr[1]:'？？？')+'</span>'}).join('')+'</div></div>';
  ROOT.innerHTML=h;
  ROOT.querySelector('[data-x]').addEventListener('click',function(){C.sfx('tap');close()});
  ROOT.querySelectorAll('[data-z]').forEach(function(b){b.addEventListener('click',function(){var z=ZONES[+b.dataset.z],st=zoneOpen(id,z);
    if(st==='build'){C.sfx('no');C.say('「'+z.n+'」還在建造中！','oops');return}
    if(st==='lock'){C.sfx('no');C.say('先在外面的站拿到「'+(SOC._units[z.k]||{}).n+'」的家鄉徽章！','oops');return}
    C.sfx('tap');pickMode(z)})})}
function pickMode(z){var h='<div class="sav-mod"><div class="sav-card sav-pick"><div class="who"><img src="'+img(z.boss)+'" alt=""><h3>'+esc(z.n)+'<br><small style="font-size:15px;color:#b05a1d">魔王：'+esc(z.bn)+'</small></h3></div><p class="sav-note">約 5 分鐘：跑酷 → 跳對的平台 → 吼開對的門 → 送東西 → 搬東西分類 → 打倒魔王。</p><div class="row"><button class="sav-go" data-m="1">一個人玩</button><button class="sav-go g" data-m="2">兩人連線</button><button class="sav-go s" data-m="0">返回</button></div></div></div>';
  var d=document.createElement('div');d.innerHTML=h;var m=d.firstChild;ROOT.appendChild(m);
  m.querySelectorAll('[data-m]').forEach(function(b){b.addEventListener('click',function(){C.sfx('tap');m.remove();var v=b.dataset.m;if(v==='1')start(z,null);else if(v==='2')coopLobby(z)})})}
/* ---------- 兩人連線大廳 ---------- */
function coopLobby(z){var id=C.who(),rd=false,un=null,done=false,myGo=null;
  var m=document.createElement('div');m.className='sav-mod';m.innerHTML='<div class="sav-card"><h3>兩人連線：'+esc(z.n)+'</h3><p class="sav-note">請另一台 iPad 或手機也進到「'+esc(z.n)+'」選「兩人連線」。兩個人都按「準備好了」就會一起出發。</p><div class="sav-peers"></div><div class="row" style="display:flex;gap:10px;justify-content:center"><button class="sav-go g" data-r="1">準備好了</button><button class="sav-go s" data-c="1">取消</button></div></div>';ROOT.appendChild(m);
  var P=m.querySelector('.sav-peers'),RB=m.querySelector('[data-r]');
  function tick(){if(done)return;var ps=C.Net.peers(),ids=Object.keys(ps).filter(function(c){var q=ps[c];return q.gm==='socadv'&&q.zk===z.k&&q.ph==='lobby'});
    P.innerHTML='<div>'+esc(C.kidName()||'我')+'<em>'+(rd?'準備好了':'還沒準備')+'</em></div>'+(ids.length?ids.map(function(c){return '<div>'+esc(ps[c].n||'夥伴')+'<em>'+(ps[c].rd?'準備好了':'還沒準備')+'</em></div>'}).join(''):'<div style="color:#888">等夥伴加入中…</div>');
    var ready=ids.filter(function(c){return ps[c].rd});var go=null;ids.forEach(function(c){if(ps[c].go&&ps[c].go.zk===z.k)go=ps[c].go});
    if(!go&&!myGo&&rd&&ready.length&&ready.every(function(c){return C.Net.id<c})){myGo={t:Math.random().toString(36).slice(2,9),seed:Math.floor(Math.random()*1e9),zk:z.k};C.Net.set({go:myGo});setTimeout(tick,400);return}
    if(!go&&myGo)go=myGo;
    if(go&&rd){done=true;un&&un();m.remove();start(z,{tok:go.t,seed:go.seed})}}
  C.Net.init().then(function(ok){if(!ok){P.innerHTML='<div>這個環境沒有連線功能，請改用一個人玩。</div>';RB.disabled=true;return}
    C.Net.set({on:1,gm:'socadv',zk:z.k,k:id,n:C.kidName()||'夥伴',ph:'lobby',rd:0,go:null});un=C.Net.on(tick);tick()});
  RB.addEventListener('click',function(){rd=!rd;RB.textContent=rd?'取消準備':'準備好了';C.sfx('tap');C.Net.set({rd:rd?1:0});
    /* 自己先準備好又是主機的話也要能出發 */
    setTimeout(tick,50)});
  m.querySelector('[data-c]').addEventListener('click',function(){done=true;un&&un();C.Net.off();m.remove();C.sfx('tap')})}

/* ================= 題目 ================= */
function pool(z){var u=SOC._units[z.k],out=[];(u?u.ls:[]).forEach(function(l){(SOC._bank[l[0]]||[]).forEach(function(q){out.push(q)})});return out}
function pickQs(z,R){var P=pool(z),choice=P.filter(function(q){return (q.t==='mc'||q.t==='mi')&&q.o&&q.o.length>=2}),pic=choice.filter(function(q){return q.t==='mi'||q.p}),srt=P.filter(function(q){return q.t==='sort'}),tf=P.filter(function(q){return q.t==='tf'});
  var used=[];function take(arr){arr=shufR(arr,R);for(var i=0;i<arr.length;i++)if(used.indexOf(arr[i])<0){used.push(arr[i]);return arr[i]}return null}
  var q1=take(pic.length?pic:choice),q2=take(choice),q3=take(choice),qs=take(srt),b=[take(choice.concat(tf)),take(choice.concat(tf)),take(choice.concat(tf))].filter(Boolean);
  return {plat:q1,door:q2,send:q3,sort:qs,boss:b}}
function opts(q,R,n){var o=shufR([q.a].concat(shufR(q.o,R).slice(0,(n||3)-1)),R);return o}
function optLabel(q,v){return q.t==='mi'?cap(v):v}

/* ================= 3D 遊戲 ================= */
function start(z,net){if(!ROOT)return;ROOT.innerHTML='<div class="sav-mod"><div class="sav-card"><h3>載入 3D 冒險中…</h3></div></div>';
  loadThree().then(function(TH){T=TH;if(!ROOT)return;G=new Game(z,net);G.run()},function(){ROOT.innerHTML='<div class="sav-mod"><div class="sav-card"><h3>3D 載入失敗</h3><p>請確認網路後再試一次。</p><button class="sav-go" id="savBack">回大廳</button></div></div>';ROOT.querySelector('#savBack').onclick=lobby})}

function Game(z,net){this.z=z;this.net=net;this.seed=net?net.seed:Math.floor(Math.random()*1e9);this.R=rng(this.seed);this.Q=pickQs(z,this.R)}
Game.prototype.run=function(){var g=this,z=g.z,id=C.who(),s=sa(id),lv=lvOf(+s.xp||0);
  g.lv=lv;g.maxHp=4+Math.min(3,Math.floor(lv/3));g.hp=g.maxHp;g.coins=0;g.miss=0;g.hurt=0;g.solved={};g.dmg=0;g.alive=true;g.paused=false;g.tm=[];g.t0=Date.now();
  g.spd=6.4+lv*.18;g.roarR=4.5+lv*.2;
  ROOT.innerHTML='<div class="sav-top"><button class="sav-x" aria-label="離開">✕</button><div class="sav-hp"></div><div class="sav-coin">🪙 <b>0</b></div><div class="sav-prog"><i></i></div></div><div class="sav-flash"></div><div class="sav-q" hidden></div><div class="sav-tip" style="opacity:0"></div><div class="sav-boss" hidden><img src="'+img(z.boss)+'" alt=""><b>'+esc(z.bn)+'</b><div class="bar"><i style="width:100%"></i></div></div><div class="sav-stick"><i></i></div><div class="sav-btns"><button class="sav-b j">跳</button><button class="sav-b r">吼！</button><button class="sav-b d">衝</button></div>';
  var W=ROOT.clientWidth,H=ROOT.clientHeight;
  var ren=new T.WebGLRenderer({antialias:true});ren.setPixelRatio(Math.min(2,global.devicePixelRatio||1)*.85);ren.setSize(W,H);ROOT.insertBefore(ren.domElement,ROOT.firstChild);g.ren=ren;
  var sc=new T.Scene();sc.background=new T.Color(z.sky||0x9fd8ff);sc.fog=new T.Fog(z.sky||0x9fd8ff,40,95);g.sc=sc;
  var cam=new T.PerspectiveCamera(H>W?66:58,W/H,.1,220);g.cam=cam;
  sc.add(new T.HemisphereLight(0xffffff,0x88aa77,.85));var dl=new T.DirectionalLight(0xffffff,.65);dl.position.set(8,20,6);sc.add(dl);
  g.boxes=[];g.occ=[];g.faded=[];g.items=[];g.coinsL=[];g.foes=[];g.shots=[];g.cps=[];g.trig=[];g.tex={};
  g.build();
  /* 小石獅 */
  var P={x:0,y:0,z:0,vx:0,vy:0,vz:0,on:null,jumps:0,face:'back',flip:false,dash:0,dcd:0,rcd:0,inv:0,carry:null};g.P=P;g.cp={x:0,y:.1,z:-2};g.respawn();
  g.me=g.sprite(['l_back','l_front','l_side','l_run'],1.55);sc.add(g.me);
  g.ring=new T.Mesh(new T.TorusGeometry(1,.12,6,28),new T.MeshBasicMaterial({color:0xffe066,transparent:true,opacity:0}));g.ring.rotation.x=Math.PI/2;sc.add(g.ring);
  g.shadow=new T.Mesh(new T.CircleGeometry(.55,16),new T.MeshBasicMaterial({color:0,transparent:true,opacity:.22}));g.shadow.rotation.x=-Math.PI/2;sc.add(g.shadow);
  g.peers={};g.input();g.hud();
  g.paused=true;(function(){var m=document.createElement('div');m.className='sav-mod';m.innerHTML='<div class="sav-card"><div class="who"><img src="'+img('l_front')+'" alt=""><h3>守護「'+esc(z.n)+'」！<br><small style="font-size:14px;color:#b05a1d">打倒'+esc(z.bn)+'，拿回'+esc(z.tr[1])+'</small></h3></div><div class="sav-help"><div><b>🕹️</b>左手搖桿<br>移動</div><div><b>跳</b>按兩下<br>二段跳</div><div><b>衝</b>撞破木箱<br>撞倒小怪</div><div><b>吼！</b>打怪、<br>吼開對的門</div><div><b>🪙</b>沿路收集<br>家鄉幣</div><div><b>🚩</b>旗子是存檔點<br>掉下去從這裡</div></div><button class="sav-go">出發！</button></div>';ROOT.appendChild(m);m.querySelector('.sav-go').addEventListener('click',function(){m.remove();g.paused=false;C.sfx('win');g.tip('往前走！跳上平台！',2.5)})})();
  if(g.net){C.Net.set({on:1,gm:'socadv',zk:z.k,ph:'run',tok:g.net.tok,rd:0,go:null});g.unNet=C.Net.on(function(){g.netIn()})}
  g.onVis=function(){if(document.hidden&&!g.paused&&!g.ended){g.ask('暫停中',[['繼續玩',null]])}};document.addEventListener('visibilitychange',g.onVis);
  g.onResize=function(){var w=ROOT.clientWidth,h=ROOT.clientHeight;ren.setSize(w,h);cam.aspect=w/h;cam.fov=h>w?66:58;cam.updateProjectionMatrix()};global.addEventListener('resize',g.onResize);
  ROOT.querySelector('.sav-x').addEventListener('click',function(){g.ask('要離開冒險嗎？這一關的進度不會保存。',[['離開',function(){g.stop();lobby()}],['繼續玩',null]])});
  var last=performance.now();g.loop=function(t){if(!g.alive)return;var dt=Math.min(.05,(t-last)/1000);last=t;if(!g.paused)g.step(dt);g.draw(dt);ren.render(sc,cam);g.raf=requestAnimationFrame(g.loop)};g.raf=requestAnimationFrame(g.loop);
  C.say('出發！小石獅要守護「'+z.n+'」！','happy')};
Game.prototype.stop=function(){var g=this;g.alive=false;cancelAnimationFrame(g.raf);g.tm.forEach(clearTimeout);global.removeEventListener('resize',g.onResize);document.removeEventListener('visibilitychange',g.onVis);g.offIn&&g.offIn();g.unNet&&g.unNet();if(g.net){try{C.Net.off()}catch(e){}}
  try{g.sc.traverse(function(o){if(o.geometry)o.geometry.dispose();if(o.material){if(o.material.map)o.material.map.dispose();o.material.dispose()}});g.ren.dispose();g.ren.forceContextLoss&&g.ren.forceContextLoss()}catch(e){}};

/* ---------- 貼圖 ---------- */
Game.prototype.imgTex=function(k,cb){var g=this;if(g.tex[k]){cb&&cb(g.tex[k]);return g.tex[k]}var t=new T.Texture();var im=new Image();im.onload=function(){t.image=im;t.needsUpdate=true;t.ready=1;cb&&cb(t)};im.src=img(k);g.tex[k]=t;return t};
Game.prototype.card=function(text,k,w,h,col){var g=this,cv=document.createElement('canvas');cv.width=512;cv.height=k?420:260;var x=cv.getContext('2d'),t=new T.CanvasTexture(cv);
  function paint(im){x.clearRect(0,0,cv.width,cv.height);x.fillStyle=col||'#fffaf0';rr(x,6,6,cv.width-12,cv.height-12,34);x.fill();x.lineWidth=10;x.strokeStyle='#8a5a2b';x.stroke();
    var ty=cv.height/2;if(k){if(im){var s=Math.min(440/im.width,250/im.height),iw=im.width*s,ih=im.height*s;x.drawImage(im,(cv.width-iw)/2,24+(250-ih)/2,iw,ih)}ty=330}
    x.fillStyle='#1d2b3a';x.textAlign='center';x.textBaseline='middle';var fs=text.length>14?40:text.length>8?50:60;x.font='900 '+fs+'px "PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif';
    var lines=wrap(x,text,cv.width-56);if(!k&&lines.length>3){fs=36;x.font='900 '+fs+'px sans-serif';lines=wrap(x,text,cv.width-50)}var lh=fs*1.18,y0=ty-(lines.length-1)*lh/2;lines.slice(0,k?2:4).forEach(function(l,i){x.fillText(l,cv.width/2,y0+i*lh)});t.needsUpdate=true}
  paint(null);if(k){var im=new Image();im.onload=function(){paint(im)};im.src=img(k)}
  var m=new T.Mesh(new T.PlaneGeometry(w,w*cv.height/cv.width),new T.MeshBasicMaterial({map:t,transparent:true,side:T.DoubleSide}));m.userData.card=1;g.occ.push(m);return m};
function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function wrap(x,t,mw){var out=[],cur='';for(var i=0;i<t.length;i++){var c=t[i];if(x.measureText(cur+c).width>mw&&cur){out.push(cur);cur=c}else cur+=c}if(cur)out.push(cur);return out}
Game.prototype.sprite=function(keys,hgt){var g=this,mat=new T.SpriteMaterial({map:g.imgTex(keys[0]),transparent:true,alphaTest:.15}),sp=new T.Sprite(mat);sp.scale.set(hgt,hgt,1);sp.userData={keys:keys,h:hgt,cur:keys[0]};
  keys.forEach(function(k){g.imgTex(k,function(t){if(sp.userData.cur===k&&t.image){var a=t.image.width/t.image.height;sp.scale.set(hgt*a,hgt,1)}})});return sp};
Game.prototype.setSp=function(sp,k,flip){var g=this,t=g.imgTex(k);if(sp.userData.cur!==k||sp.userData.flip!==flip){sp.userData.cur=k;sp.userData.flip=flip;
  if(flip){var key=k+'_f';if(!g.tex[key]){var f=t.clone();f.repeat.x=-1;f.offset.x=1;f.needsUpdate=true;g.tex[key]=f;if(!t.ready)g.imgTex(k,function(tt){f.image=tt.image;f.needsUpdate=true})}sp.material.map=g.tex[key]}else sp.material.map=t;
  sp.material.needsUpdate=true;if(t.image&&t.image.width){var a=t.image.width/t.image.height;sp.scale.set(sp.userData.h*a,sp.userData.h,1)}}};

/* ---------- 材質（用程式畫的貼圖） ---------- */
Game.prototype.ptex=function(kind,rx,ry){var g=this;g.ptc=g.ptc||{};var base=g.ptc[kind];if(!base){var cv=document.createElement('canvas');cv.width=cv.height=256;var x=cv.getContext('2d'),i,r=Math.random;
  if(kind==='grass'){x.fillStyle='#86d46f';x.fillRect(0,0,256,256);for(i=0;i<900;i++){x.fillStyle=['#76c85f','#97de7c','#6dbd57','#a6e58a'][i%4];var px=r()*256,py=r()*256;x.fillRect(px,py,2,5+r()*4)}for(i=0;i<14;i++){x.fillStyle=['#fff','#ffe066','#ff9ec4'][i%3];x.beginPath();x.arc(r()*256,r()*256,2.2,0,7);x.fill()}}
  else if(kind==='path'){x.fillStyle='#ecd7a8';x.fillRect(0,0,256,256);for(i=0;i<26;i++){var sx=r()*256,sy=r()*256,sr=10+r()*16;x.fillStyle=['#e2c891','#f4e2bb','#dcc08a'][i%3];x.beginPath();x.ellipse(sx,sy,sr,sr*.75,r()*3,0,7);x.fill();x.strokeStyle='rgba(140,100,50,.35)';x.lineWidth=2;x.stroke()}}
  else if(kind==='dirt'){x.fillStyle='#a87448';x.fillRect(0,0,256,256);for(i=0;i<500;i++){x.fillStyle=['#9a6a40','#b9845a','#8d5f39'][i%3];x.fillRect(r()*256,r()*256,3+r()*5,3+r()*4)}x.fillStyle='rgba(60,40,20,.25)';x.fillRect(0,0,256,18)}
  else if(kind==='wood'){x.fillStyle='#c98b4a';x.fillRect(0,0,256,256);for(i=0;i<4;i++){x.fillStyle=i%2?'#bf8040':'#d39654';x.fillRect(0,i*64,256,62);x.fillStyle='#8a5a2b';x.fillRect(0,i*64+62,256,4)}for(i=0;i<40;i++){x.strokeStyle='rgba(120,70,30,.35)';x.beginPath();var yy=r()*256;x.moveTo(0,yy);x.bezierCurveTo(80,yy+6,160,yy-6,256,yy+3);x.stroke()}x.strokeStyle='#7a4a20';x.lineWidth=14;x.strokeRect(0,0,256,256);x.beginPath();x.moveTo(0,0);x.lineTo(256,256);x.stroke()}
  else if(kind==='brick'){x.fillStyle='#e8d2b0';x.fillRect(0,0,256,256);for(var row=0;row<8;row++)for(var col=0;col<5;col++){x.fillStyle=['#c9653f','#d4724b','#b85a37'][(row+col)%3];x.fillRect(col*56+(row%2?-28:0)+3,row*32+3,50,26)}}
  else if(kind==='plaster'){x.fillStyle='#fff';x.fillRect(0,0,256,256);for(i=0;i<300;i++){x.fillStyle='rgba(0,0,0,'+(r()*.05)+')';x.fillRect(r()*256,r()*256,4,4)}}
  else if(kind==='roof'){x.fillStyle='#c4483a';x.fillRect(0,0,256,256);for(var rr2=0;rr2<8;rr2++)for(var c2=0;c2<8;c2++){x.fillStyle=(rr2+c2)%2?'#b23f33':'#d0544a';x.beginPath();x.arc(c2*32+(rr2%2?16:0),rr2*32+32,17,Math.PI,0);x.fill()}}
  base=new T.CanvasTexture(cv);base.wrapS=base.wrapT=T.RepeatWrapping;g.ptc[kind]=base}
  var t=base.clone();t.needsUpdate=true;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rx||1,ry||1);return t};
/* ---------- 關卡 ---------- */
Game.prototype.box=function(x,y,z,w,h,d,col,o){var g=this,m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshLambertMaterial({color:col}));m.position.set(x,y-h/2,z);g.sc.add(m);
  var ed=new T.LineSegments(new T.EdgesGeometry(m.geometry),new T.LineBasicMaterial({color:0x3d2a18,transparent:true,opacity:.35}));m.add(ed);g.occ.push(m);
  var b={m:m,x:x,y:y,z:z,w:w/2,h:h,d:d/2,on:true,solid:true};if(o)for(var k in o)b[k]=o[k];g.boxes.push(b);return b};
Game.prototype.ground=function(x,y,z,w,d,top){var g=this,b=g.box(x,y,z,w,1.2,d,0xffffff);b.m.material.map=g.ptex('dirt',Math.max(1,w/3),.5);b.m.material.needsUpdate=true;var isPath=top&&top===g.z.path;var t=new T.Mesh(new T.BoxGeometry(w+.02,.18,d+.02),new T.MeshLambertMaterial({color:0xffffff,map:g.ptex(isPath?'path':'grass',Math.max(1,w/3),Math.max(1,d/3))}));t.position.set(0,.6,0);t.scale.y=.12;b.m.add(t);return b};
Game.prototype.coin=function(x,y,z){var g=this;if(!g.coinMat){g.coinMat=new T.MeshPhongMaterial({color:0xffc22e,emissive:0x8a5a00,specular:0xffffff,shininess:90});g.coinMat2=new T.MeshPhongMaterial({color:0xffe27a,emissive:0x8a6a10,specular:0xffffff,shininess:120})}var m=new T.Group(),c1=new T.Mesh(new T.CylinderGeometry(.36,.36,.1,24),g.coinMat);c1.rotation.x=Math.PI/2;m.add(c1);var c2=new T.Mesh(new T.CylinderGeometry(.24,.24,.13,24),g.coinMat2);c2.rotation.x=Math.PI/2;m.add(c2);var st=new T.Mesh(new T.TorusGeometry(.36,.035,6,24),g.coinMat2);m.add(st);m.position.set(x,y+.8,z);g.sc.add(m);g.coinsL.push({m:m,x:x,y:y+.8,z:z,on:true})};
Game.prototype.checkpoint=function(x,y,z){var g=this,p=new T.Mesh(new T.CylinderGeometry(.08,.08,2.4,6),new T.MeshLambertMaterial({color:0x8a5a2b}));p.position.set(x+2.6,y+1.2,z);g.sc.add(p);
  var f=new T.Mesh(new T.PlaneGeometry(1,.7),new T.MeshLambertMaterial({color:0xd9533f,side:T.DoubleSide}));f.position.set(x+3.1,y+2.1,z);g.sc.add(f);g.cps.push({x:x,y:y,z:z,f:f,on:false})};
Game.prototype.tree=function(x,y,z){var g=this,t=new T.Mesh(new T.CylinderGeometry(.16,.26,1.4,8),new T.MeshLambertMaterial({color:0x8a5a2b}));t.position.set(x,y+.7,z);g.sc.add(t);[[0,1.7,0,.95,0x3fae4f],[.45,1.45,.2,.65,0x4fbf5c],[-.4,1.5,-.15,.7,0x36a046],[0,2.35,0,.6,0x5ccb68]].forEach(function(s){var l=new T.Mesh(new T.SphereGeometry(s[3],12,10),new T.MeshLambertMaterial({color:s[4]}));l.position.set(x+s[0],y+s[1],z+s[2]);g.sc.add(l)})};
Game.prototype.house=function(x,z,col,w,h,d){var g=this,sc=g.sc,hb=g.box(x,h,z,w,h,d,col);hb.m.material.map=g.ptex('plaster',1,1);hb.m.material.needsUpdate=true;var fz=z+d/2+.02;
  var roof=new T.Mesh(new T.ConeGeometry(w*.86,1.7,4),new T.MeshLambertMaterial({color:0xffffff,map:g.ptex('roof',3,2)}));roof.rotation.y=Math.PI/4;roof.position.set(x,h+.85,z);sc.add(roof);
  var ch=new T.Mesh(new T.BoxGeometry(.45,1,.45),new T.MeshLambertMaterial({color:0x9a5a3a}));ch.position.set(x+w*.28,h+1.2,z-.4);sc.add(ch);
  var fr=new T.Mesh(new T.BoxGeometry(1.4,2.1,.12),new T.MeshLambertMaterial({color:0xfff4dc}));fr.position.set(x,1.05,fz);sc.add(fr);var dr=new T.Mesh(new T.BoxGeometry(1.15,1.9,.14),new T.MeshLambertMaterial({color:0x7a4a20,map:g.ptex('wood',1,1)}));dr.position.set(x,.95,fz+.02);sc.add(dr);var kn=new T.Mesh(new T.SphereGeometry(.07,8,6),new T.MeshPhongMaterial({color:0xffd75e,shininess:80}));kn.position.set(x+.38,.95,fz+.12);sc.add(kn);
  [-1,1].forEach(function(s){var wf=new T.Mesh(new T.BoxGeometry(.75,.75,.1),new T.MeshLambertMaterial({color:0xffffff}));wf.position.set(x+s*w*.32,1.55,fz);sc.add(wf);var gl=new T.Mesh(new T.PlaneGeometry(.6,.6),new T.MeshPhongMaterial({color:0x9fd8ff,specular:0xffffff,shininess:100}));gl.position.set(x+s*w*.32,1.55,fz+.06);sc.add(gl);var bar=new T.Mesh(new T.BoxGeometry(.06,.6,.02),new T.MeshLambertMaterial({color:0xffffff}));bar.position.set(x+s*w*.32,1.55,fz+.08);sc.add(bar)});
  var step=new T.Mesh(new T.BoxGeometry(1.6,.12,.5),new T.MeshLambertMaterial({color:0xcfc6b8}));step.position.set(x,.06,fz+.25);sc.add(step);return hb};
Game.prototype.bld=function(k,x,y,z,s){var g=this;var m=new T.Mesh(new T.PlaneGeometry(s,s),new T.MeshBasicMaterial({map:g.imgTex(k),transparent:true,alphaTest:.1,side:T.DoubleSide}));m.position.set(x,y+s/2,z);g.sc.add(m);return m};
Game.prototype.build=function(){var g=this,z=g.z,Q=g.Q,R=g.R,sc=g.sc;
  var sea=new T.Mesh(new T.PlaneGeometry(400,400),new T.MeshLambertMaterial({color:0x5fb8e8}));sea.rotation.x=-Math.PI/2;sea.position.y=-7;sc.add(sea);
  /* 0 起點廣場 */
  g.ground(0,0,-5.4,12,14.8);g.tree(-5,0,0);g.tree(5,0,-1);
  [-4,4].forEach(function(x){g.coin(x,0,-6)});g.coin(0,0,-9);
  ['sc_group','pf_school','sc_relay','sc_tug','sc_friends','sc_award'].forEach(function(k,i){var sd=i%2?1:-1;g.bld(k,sd*(10+(i%3)),-1,-14-i*30,5.5)});
  for(var cl=0;cl<10;cl++){var cm=new T.Mesh(new T.SphereGeometry(2+R()*1.5,8,6),new T.MeshLambertMaterial({color:0xffffff}));cm.scale.y=.45;cm.position.set((R()*2-1)*30,14+R()*6,-R()*200);sc.add(cm)}
  /* 1 跑酷 */
  [[0,0,-15],[-1.2,.6,-19.6],[1,1.2,-24.2],[0,.6,-28.6]].forEach(function(p){g.ground(p[0],p[1],p[2],4,4);g.coin(p[0],p[1]+.6,p[2])});
  var mv=g.ground(0,.6,-33,4.2,4.2);mv.mv={ax:'x',a:2.4,sp:1.3,ox:0,ph:0};g.coin(0,1.5,-33);
  g.ground(0,0,-46.5,8,21,z.path);for(var i=0;i<6;i++)g.coin(0,0,-39-i*2.4);g.tree(-4.4,0,-40);g.tree(4.4,0,-50);
  g.basket={z0:-56.5,z1:-36,t:1.2};g.checkpoint(0,0,-37);
  /* 2 跳對的平台 */
  g.ground(0,0,-58.5,9,3,z.path);g.checkpoint(0,0,-58);
  var q=Q.plat,ops=q?opts(q,R,3):[];g.plat=[];
  ops.forEach(function(v,i){var x=(i-(ops.length-1)/2)*4.6,b=g.ground(x,0,-63.8,3.8,3.8);b.ans=v;b.qid='plat';var c=g.card(optLabel(q,v),q.t==='mi'?v:null,2.6);c.position.set(x,1.8,-65.6);sc.add(c);b.cardM=c;g.plat.push(b)});
  g.trig.push({z:-57,q:q,kind:'plat',txt:'跳到正確的平台上！'});
  g.bridge=g.box(0,0,-68.2,2.4,.5,6,0xc98b4a,{on:false});g.bridge.m.visible=false;if(!q){g.bridge.on=true;g.bridge.m.visible=true}
  /* 3 箱子和小怪 */
  g.ground(0,0,-81,12,20);g.checkpoint(0,0,-72.5);
  for(var c2=0;c2<7;c2++){var bx=(R()*2-1)*4.5,bz=-75-R()*12;var cr=g.box(bx,1,bz,1,1,1,0xffffff,{crate:1,solid:false});cr.m.material.map=g.ptex('wood',1,1);cr.m.material.needsUpdate=true;g.coin(bx,0,bz)}
  ['s_slime','s_ghost','s_flame'].forEach(function(k,i){g.foe(k,(i-1)*3.5,0,-80-i*2.5,1.3,2)});
  for(var c3=0;c3<5;c3++)g.coin(-4+c3*2,0,-88);
  /* 4 吼開的門 */
  var qd=Q.door,dop=qd?opts(qd,R,3):[];g.doors=[];
  [[-6.6,1.2],[6.6,1.2],[-2.1,1.4],[2.1,1.4]].forEach(function(p){var wb=g.box(p[0],4.2,-91.5,p[1],4.2,1,0xffffff);wb.m.material.map=g.ptex('brick',p[1]/1.5,2.5);wb.m.material.needsUpdate=true});
  dop.forEach(function(v,i){var x=(i-1)*4.2,d=g.box(x,4.2,-91.5,2.8,4.2,.6,0xd9a06a,{door:1,ans:v});d.m.material.map=g.ptex('wood',1,1.4);d.m.material.needsUpdate=true;var c=g.card(optLabel(qd,v),qd.t==='mi'?v:null,2.6);c.position.set(x,2.4,-90.9);sc.add(c);d.cardM=c;g.doors.push(d)});
  g.trig.push({z:-86,q:qd,kind:'door',txt:'走到正確的門前面，按「吼！」把門吼開！'});
  /* 5 送東西 */
  g.ground(0,0,-103.5,16,25);g.checkpoint(0,0,-94.5);
  var qs=Q.send,sop=qs?opts(qs,R,3):[];g.houses=[];
  g.pick=g.card('要送的信','iv_letter',1.5,null,'#fff6c9');g.pick.position.set(0,1.2,-97.5);sc.add(g.pick);g.pickXZ={x:0,z:-97.5};
  sop.forEach(function(v,i){var x=(i-1)*5.4,hb=g.house(x,-110,[0xf7c9a0,0xbfe0f5,0xf7e3a0][i],3.8,3,3);
    var c=g.card(optLabel(qs,v),qs.t==='mi'?v:null,qs.t==='mi'?2.2:3);c.position.set(x,qs.t==='mi'?3.6:2.62,-108.3);sc.add(c);
    g.houses.push({x:x,z:-107.6,ans:v,box:hb})});
  g.fence=g.box(0,4.2,-114.6,16,4.2,.5,0xffffff,{});g.fence.lk=g.card('🔒 把信送對就會打開',null,4,null,'#fff6c9');g.fence.lk.position.set(0,2.4,-114.2);sc.add(g.fence.lk);g.fence.m.material.transparent=true;g.fence.m.material.opacity=.55;if(!qs){g.fence.on=false;g.fence.m.visible=false}
  g.trig.push({z:-96,q:qs,kind:'send',txt:'撿起地上的信，送進正確的房子！'});
  /* 6 消失的磚塊和升降台 */
  g.ground(0,0,-118,6,6);g.checkpoint(0,0,-117);
  [[-1,-122.6],[1,-126.2],[-1,-129.8],[1,-133.4]].forEach(function(p){var b=g.box(p[0],0,p[1],3.2,.6,3.2,0xf2c46b,{vanish:1,vt:0});g.coin(p[0],0,p[1])});
  var lift=g.ground(0,0,-137.6,4,4);lift.mv={ax:'y',a:1.6,sp:1.4,oy:1.6,ph:0};
  /* 7 分類 */
  var Y=3.2;g.ground(0,Y,-150,14,20);g.checkpoint(0,Y,-142);
  g.srt=null;var qq=Q.sort;if(qq){var items=shufR(qq.it,R).slice(0,4);g.srt={q:qq,items:items,i:0,miss:0,bins:[]};
    qq.b.forEach(function(lb,i){var x=i?5:-5,fr=new T.Mesh(new T.BoxGeometry(3,1,3),new T.MeshLambertMaterial({color:i?0xffc4a8:0xbfe0ff,map:g.ptex('wood',2,.7)}));fr.position.set(x,Y+.5,-154);sc.add(fr);var c=g.card(lb,null,3.4,null,i?'#ffe4d6':'#dceefc');c.position.set(x,Y+2.2,-155.6);sc.add(c);g.srt.bins.push({x:x,z:-154})});
    g.ped=new T.Mesh(new T.CylinderGeometry(.9,1,.6,12),new T.MeshLambertMaterial({color:0xd9b48a}));g.ped.position.set(0,Y+.3,-147);sc.add(g.ped);g.srtCard=null;g.srtNext();
    g.trig.push({z:-141,q:qq,kind:'sort',txt:'把東西撿起來，搬進正確的籃子！'})}
  g.gate2=g.box(0,Y+4.2,-159.6,14,4.2,.5,0xffffff,{});g.gate2.lk=g.card('🔒 東西都分對就會打開',null,4,null,'#fff6c9');g.gate2.lk.position.set(0,Y+2.4,-159.2);sc.add(g.gate2.lk);g.gate2.m.material.transparent=true;g.gate2.m.material.opacity=.55;if(!qq){g.gate2.on=false;g.gate2.m.visible=false}
  /* 8 魔王 */
  g.ground(0,Y,-163,4,4,z.path);[[0,2.1,-167],[0,1,-170.5]].forEach(function(p){g.ground(p[0],p[1],p[2],4,3,z.path)});
  var ar=new T.Mesh(new T.CylinderGeometry(13,13,1.2,32),new T.MeshLambertMaterial({color:z.side||0xb07a4a}));ar.position.set(0,-.6,-186);sc.add(ar);var at=new T.Mesh(new T.CylinderGeometry(13.02,13.02,.18,32),new T.MeshLambertMaterial({color:0xe8d3a3}));at.position.set(0,.01,-186);sc.add(at);
  g.arena={x:0,z:-186,r:13};g.checkpoint(0,0,-174.5);g.boxes.push({x:0,y:0,z:-186,w:12.4,h:1.2,d:12.4,on:true,solid:true,round:13});
  g.boss=null;g.bossCfg={k:z.boss,hp:9,x:0,z:-190};
  g.chest=null;g.endZ=-200};
Game.prototype.foe=function(k,x,y,z,h,r){var g=this,sp=g.sprite([k],h);sp.position.set(x,y+h/2,z);g.sc.add(sp);g.foes.push({sp:sp,x:x,y:y,z:z,ox:x,oz:z,r:r,h:h,t:Math.random()*6,alive:true})};
Game.prototype.srtNext=function(){var g=this,S=g.srt;if(g.srtCard){g.sc.remove(g.srtCard);g.srtCard=null}if(!S||S.i>=S.items.length)return;var it=S.items[S.i];g.srtCard=g.card(it[0],null,1.9,null,'#fffaf0');g.srtCard.position.set(0,3.2+1.6,-147);g.sc.add(g.srtCard);S.held=false};

/* ---------- 操作 ---------- */
Game.prototype.input=function(){var g=this,keys={},stick=ROOT.querySelector('.sav-stick'),knob=stick.querySelector('i');g.keys=keys;g.joy={x:0,y:0};
  var sid=null,cx=0,cy=0;
  function sm(e){for(var i=0;i<e.changedTouches.length;i++){var t=e.changedTouches[i];if(t.identifier===sid){var dx=t.clientX-cx,dy=t.clientY-cy,l=Math.hypot(dx,dy),m=48;if(l>m){dx=dx/l*m;dy=dy/l*m}knob.style.transform='translate('+dx+'px,'+dy+'px)';g.joy={x:dx/m,y:dy/m}}}}
  function se(e){for(var i=0;i<e.changedTouches.length;i++)if(e.changedTouches[i].identifier===sid){sid=null;knob.style.transform='';g.joy={x:0,y:0}}}
  stick.addEventListener('touchstart',function(e){e.preventDefault();var t=e.changedTouches[0];sid=t.identifier;var r=stick.getBoundingClientRect();cx=r.left+r.width/2;cy=r.top+r.height/2;sm(e)},{passive:false});
  stick.addEventListener('touchmove',function(e){e.preventDefault();sm(e)},{passive:false});stick.addEventListener('touchend',se);stick.addEventListener('touchcancel',se);
  /* 滑鼠也能拖搖桿 */
  var md=false;stick.addEventListener('mousedown',function(e){md=true;var r=stick.getBoundingClientRect();cx=r.left+r.width/2;cy=r.top+r.height/2});
  function mm(e){if(!md)return;var dx=e.clientX-cx,dy=e.clientY-cy,l=Math.hypot(dx,dy),m=48;if(l>m){dx=dx/l*m;dy=dy/l*m}knob.style.transform='translate('+dx+'px,'+dy+'px)';g.joy={x:dx/m,y:dy/m}}
  function mu(){if(md){md=false;knob.style.transform='';g.joy={x:0,y:0}}}
  global.addEventListener('mousemove',mm);global.addEventListener('mouseup',mu);
  function btn(sel,f){var b=ROOT.querySelector(sel);b.addEventListener('touchstart',function(e){e.preventDefault();b.classList.add('on');f()},{passive:false});b.addEventListener('touchend',function(){b.classList.remove('on')});b.addEventListener('mousedown',function(e){e.preventDefault();f()})}
  btn('.sav-b.j',function(){g.jump()});btn('.sav-b.r',function(){g.roar()});btn('.sav-b.d',function(){g.dash()});
  function kd(e){var k=e.key.toLowerCase();if([' ','arrowup','arrowdown','arrowleft','arrowright'].indexOf(k)>=0)e.preventDefault();if(keys[k])return;keys[k]=1;if(k===' ')g.jump();if(k==='k'||k==='e')g.roar();if(k==='j'||k==='shift')g.dash()}
  function ku(e){keys[e.key.toLowerCase()]=0}
  global.addEventListener('keydown',kd);global.addEventListener('keyup',ku);
  g.offIn=function(){global.removeEventListener('keydown',kd);global.removeEventListener('keyup',ku);global.removeEventListener('mousemove',mm);global.removeEventListener('mouseup',mu)}};
Game.prototype.jump=function(){var P=this.P;if(this.paused)return;if(P.on||P.coy>0){P.vy=10.6;P.on=null;P.jumps=1;P.coy=0;C.sfx('tap')}else if(P.jumps<2){P.vy=9.4;P.jumps=2;C.sfx('pop')}};
Game.prototype.dash=function(){var P=this.P;if(this.paused||P.dcd>0)return;P.dash=.26;P.dcd=.9;C.sfx('pop')};
Game.prototype.roar=function(){var g=this,P=g.P;if(g.paused||P.rcd>0)return;P.rcd=.7;g.ringT=.45;C.sfx('win');
  var R=g.roarR;
  g.foes.forEach(function(f){if(f.alive&&Math.hypot(f.x-P.x,f.z-P.z)<R&&Math.abs(f.y-P.y)<3){f.alive=false;g.sc.remove(f.sp);g.burst(f.x,f.y+.6,f.z,0xb07ad8);g.coins+=3;g.xpAdd(8);g.hud();g.tip('打倒小搗蛋！+3 家鄉幣',1.6);try{C.confetti(null,10)}catch(e){}}});
  g.boxes.forEach(function(b){if(b.crate&&b.on&&Math.hypot(b.x-P.x,b.z-P.z)<R*.6){b.on=false;g.sc.remove(b.m)}});
  if(g.doors&&!g.solved.door){var best=null;g.doors.forEach(function(d){if(!d.on||d.locked)return;var dd=Math.hypot(d.x-P.x,d.z-P.z);if(dd<4.2&&(!best||dd<best.dd))best={d:d,dd:dd}});
    if(best){var d=best.d,q=g.Q.door;if(d.ans===q.a){g.solve('door',true);}else{d.locked=true;d.m.material.color.set(0x9a3a2a);g.hit(1,'吼錯門了！');g.wrongQ(q)}}}
  if(g.boss&&g.boss.alive&&!g.boss.stun){var b=g.boss;if(Math.hypot(b.x-P.x,b.z-P.z)<R+1.2){g.bossHit(1)}}};
Game.prototype.xpAdd=function(n){this.xp=(this.xp||0)+n};

/* ---------- 每一格的更新 ---------- */
Game.prototype.solid=function(b,x,y,z){if(!b.on||b.solid===false)return false;if(b.round){return Math.hypot(x-b.x,z-b.z)<b.round&&y<b.y&&y>b.y-b.h}return Math.abs(x-b.x)<b.w+.32&&Math.abs(z-b.z)<b.d+.32&&y<b.y-.001&&y+1.4>b.y-b.h};
Game.prototype.step=function(dt){var g=this,P=g.P,k=g.keys,t=performance.now()/1000;
  /* 移動平台 */
  g.boxes.forEach(function(b){if(!b.mv)return;var m=b.mv;m.ph+=dt*m.sp;var v=Math.sin(m.ph)*m.a,px=b.x,py=b.y;if(m.ax==='x')b.x=m.ox+v;else b.y=m.oy+v;b.m.position.set(b.x,b.y-b.h/2,b.z);if(P.on===b){P.x+=b.x-px;P.y+=b.y-py}});
  /* 消失磚 */
  g.boxes.forEach(function(b){if(!b.vanish)return;if(b.vt>0){b.vt-=dt;if(b.vt<=0){if(b.on){b.on=false;b.m.visible=false;b.vt=2.6}else{b.on=true;b.m.visible=true;b.m.material.opacity=1}}else if(b.on){b.m.position.x=b.x+Math.sin(t*60)*.05}}});
  /* 輸入 */
  var ix=g.joy.x+((k.d||k.arrowright)?1:0)-((k.a||k.arrowleft)?1:0),iz=g.joy.y+((k.s||k.arrowdown)?1:0)-((k.w||k.arrowup)?1:0),il=Math.hypot(ix,iz);if(il>1){ix/=il;iz/=il;il=1}
  var sp=g.spd*(P.carry?.85:1);if(P.dash>0){P.dash-=dt;var dl=Math.hypot(P.lx||0,P.lz||-1)||1;P.vx=(P.lx||0)/dl*17;P.vz=(P.lz||-1)/dl*17}else{P.vx=ix*sp;P.vz=iz*sp}
  if(il>.15){P.lx=ix;P.lz=iz}
  P.dcd=Math.max(0,P.dcd-dt);P.rcd=Math.max(0,P.rcd-dt);P.inv=Math.max(0,P.inv-dt);P.coy=Math.max(0,(P.coy||0)-dt);
  P.vy-=27*dt;if(P.vy<-22)P.vy=-22;
  /* 水平移動與碰撞 */
  var nx=P.x+P.vx*dt;if(!g.blocked(nx,P.y,P.z))P.x=nx;else if(P.dash>0)g.smash(nx,P.y,P.z);
  var nz=P.z+P.vz*dt;if(!g.blocked(P.x,P.y,nz))P.z=nz;else if(P.dash>0)g.smash(P.x,P.y,nz);
  /* 垂直 */
  var wasOn=P.on;P.on=null;var ny=P.y+P.vy*dt;
  if(P.vy<=0){var top=null;g.boxes.forEach(function(b){if(!b.on||b.solid===false)return;var inside=b.round?Math.hypot(P.x-b.x,P.z-b.z)<b.round:(Math.abs(P.x-b.x)<b.w+.25&&Math.abs(P.z-b.z)<b.d+.25);if(inside&&P.y>=b.y-.05&&ny<=b.y&&(!top||b.y>top.y))top=b});
    if(top){ny=top.y;P.vy=0;P.on=top;P.jumps=0;if(top!==wasOn)g.land(top)}}
  else{g.boxes.forEach(function(b){if(!b.on||b.solid===false||b.round)return;if(Math.abs(P.x-b.x)<b.w+.25&&Math.abs(P.z-b.z)<b.d+.25&&P.y+1.4<=b.y-b.h+.05&&ny+1.4>b.y-b.h){ny=b.y-b.h-1.4;P.vy=0}})}
  if(wasOn&&!P.on&&P.vy<=0)P.coy=.1;
  P.y=ny;
  if(P.y<-8){g.hit(1,'掉下去了！');g.respawn();return}
  /* 金幣 */
  g.coinsL.forEach(function(c){if(!c.on)return;c.m.rotation.y+=dt*3.2;c.m.position.y=c.y+Math.sin(t*3+c.x)*.12;if(Math.abs(c.x-P.x)<.8&&Math.abs(c.z-P.z)<.8&&Math.abs(c.y-(P.y+.7))<1.1){c.on=false;g.sc.remove(c.m);g.coins++;g.xpAdd(2);C.sfx('pop');g.hud();g.burst(c.x,c.y,c.z,0xffd75e)}});
  /* 碰到木箱就撞破 */
  g.boxes.forEach(function(b){if(b.crate&&b.on&&Math.abs(P.x-b.x)<.95&&Math.abs(P.z-b.z)<.95&&P.y<b.y+.2){b.on=false;g.sc.remove(b.m);C.sfx('pop');g.coins++;g.hud();g.burst(b.x,b.y-.5,b.z,0xc98b4a)}});
  /* 檢查點 */
  g.cps.forEach(function(c){if(!c.on&&Math.abs(P.z-c.z)<1.5&&Math.abs(P.y-c.y)<2){c.on=true;c.f.material.color.set(0x46b37a);g.cp={x:c.x,y:c.y+.1,z:c.z};g.tip('存檔點！掉下去會從這裡重來',1.6)}});
  /* 題目觸發 */
  g.trig.forEach(function(tr){if(!tr.shown&&tr.q&&P.z<tr.z){tr.shown=true;g.curT=tr;g.showQ(tr)}});
  /* 竹籃滾過來 */
  var B=g.basket;if(B){B.t-=dt;if(B.t<=0&&P.z<-30&&P.z>-58){B.t=1.5+Math.random()*.8;var lane=[-2.2,0,2.2][Math.floor(Math.random()*3)];var m=new T.Mesh(new T.CylinderGeometry(.6,.6,1,12),new T.MeshLambertMaterial({color:0xd9a35a}));m.rotation.z=Math.PI/2;m.position.set(lane,.6,B.z0);g.sc.add(m);g.shots.push({m:m,x:lane,y:.6,z:B.z0,vx:0,vz:7,r:.75,life:5,roll:1})}}
  /* 小怪 */
  g.foes.forEach(function(f){if(!f.alive)return;f.t+=dt;f.x=f.ox+Math.sin(f.t*.9)*f.r;f.z=f.oz+Math.cos(f.t*.7)*1.2;f.sp.position.set(f.x,f.y+f.h/2+Math.abs(Math.sin(f.t*4))*.2,f.z);
    if(P.inv<=0&&Math.hypot(f.x-P.x,f.z-P.z)<.9&&Math.abs(f.y-P.y)<1.2){if(P.dash>0){f.alive=false;g.sc.remove(f.sp);g.coins+=3;g.tip('衝撞打倒小搗蛋！',1.4)}else g.hit(1,'被小搗蛋撞到了！用「吼！」打牠！',f)}});
  /* 子彈和竹籃 */
  g.shots=g.shots.filter(function(s){s.life-=dt;s.x+=s.vx*dt;s.z+=s.vz*dt;if(s.vy!==undefined){s.vy-=12*dt;s.y+=s.vy*dt;if(s.y<.4){s.y=.4;s.vy=0}}s.m.position.set(s.x,s.y,s.z);if(s.roll)s.m.rotation.x+=dt*8;
    if(P.inv<=0&&Math.hypot(s.x-P.x,s.z-P.z)<s.r+.3&&Math.abs(s.y-(P.y+.6))<s.r+.6){g.hit(1,s.roll?'被竹籃撞到了！跳過去！':'被魔王打到了！');s.life=0}
    if(s.life<=0){g.sc.remove(s.m);return false}return true});
  /* 平台題：掉落的平台 */
  g.boxes.forEach(function(b){if(b.fall){b.fv=(b.fv||0)-14*dt;b.y+=b.fv*dt;b.m.position.y=b.y-b.h/2;if(b.cardM)b.cardM.position.y+=b.fv*dt;if(b.y<-12){b.on=false;b.fall=false;b.m.visible=false;if(b.cardM)b.cardM.visible=false}}});
  /* 送東西 */
  if(g.Q.send&&!g.solved.send&&g.pick){if(!P.carry&&g.pickXZ&&Math.hypot(P.x-g.pickXZ.x,P.z-g.pickXZ.z)<1.1){P.carry='scroll';g.tip('拿到信了！送進正確的房子！',2)}
    if(P.carry==='scroll'){g.pick.position.set(P.x,P.y+2.3,P.z);g.houses.forEach(function(h){if(Math.abs(P.x-h.x)<1.1&&P.z<h.z+.6&&P.z>h.z-.8){if(h.ans===g.Q.send.a){P.carry=null;g.sc.remove(g.pick);g.pick=null;g.solve('send',true)}else if(!h.no){h.no=1;g.wrongQ(g.Q.send);g.miss++;C.sfx('no');g.tip('不是這一間！再想一想。',2);P.z+=1.6}}})}}
  /* 分類 */
  var S=g.srt;if(S&&S.i<S.items.length&&g.srtCard){var Y=3.2;if(!S.held&&Math.hypot(P.x,P.z+147)<1.4&&Math.abs(P.y-Y)<1){S.held=true;C.sfx('pop')}
    if(S.held){g.srtCard.position.set(P.x,P.y+2.6,P.z);S.bins.forEach(function(b,i){if(Math.abs(P.x-b.x)<1.6&&Math.abs(P.z-b.z)<1.6){var it=S.items[S.i];if(it[1]===i){C.sfx('ok');S.i++;g.coins+=2;g.tip('分對了！',1.2);g.srtNext();if(S.i>=S.items.length)g.solve('sort',S.miss===0)}else{S.miss++;g.miss++;C.sfx('no');g.tip('「'+it[0]+'」不是放這裡喔！',1.8);S.held=false;g.srtCard.position.set(0,Y+1.6,-147)}}})}}
  /* 魔王 */
  if(!g.boss&&P.z<-176&&P.y>-1){g.spawnBoss()}
  if(g.boss)g.bossStep(dt,P);
  if(g.chest&&Math.hypot(P.x-g.chest.x,P.z-g.chest.z)<1.6&&!g.ended){g.finish()}
  /* 面向：往前走看背面，往後走看正面，往左右看側面；衝刺或在空中用跑步圖 */
  var mvx=P.vx,mvz=P.vz,fk=P.face;if(Math.abs(mvx)>.5||Math.abs(mvz)>.5){if(Math.abs(mvx)>Math.abs(mvz)*1.2){fk='side';P.flip=mvx<0}else fk=mvz<0?'back':'front'}P.face=fk;
  if(g.net){g.nt=(g.nt||0)-dt;if(g.nt<=0){g.nt=.1;C.Net.set({x:+P.x.toFixed(2),y:+P.y.toFixed(2),z:+P.z.toFixed(2),f:fk,fl:P.flip?1:0,run:(P.dash>0||!P.on)?1:0,gs:Object.keys(g.solved).join(','),bd:g.dmg})}}
  g.prog();
};
Game.prototype.blocked=function(x,y,z){var g=this;for(var i=0;i<g.boxes.length;i++){var b=g.boxes[i];if(b.round)continue;if(g.solid(b,x,y,z))return true}return false};
Game.prototype.smash=function(x,y,z){var g=this;g.boxes.forEach(function(b){if(b.crate&&b.on&&Math.abs(x-b.x)<b.w+.5&&Math.abs(z-b.z)<b.d+.5){b.on=false;g.sc.remove(b.m);C.sfx('pop');g.coins+=1;g.hud()}})};
Game.prototype.land=function(b){var g=this;if(b.vanish&&b.vt<=0)b.vt=.7;
  if(b.qid==='plat'&&!g.solved.plat&&!b.tried){var q=g.Q.plat;if(b.ans===q.a){g.solve('plat',true)}else{b.tried=true;b.fall=true;b.fv=0;g.wrongQ(q);g.miss++;C.sfx('no');g.tip('不是這個！平台掉下去了……再試一次',2.2)}}};
Game.prototype.respawn=function(){var P=this.P,c=this.cp;P.x=c.x;P.y=c.y+.5;P.z=c.z;P.vx=P.vy=P.vz=0;P.inv=1.2;if(P.carry==='scroll'&&this.pick){P.carry=null;this.pick.position.set(0,1.2,-97.5)}if(this.srt)this.srt.held=false};
Game.prototype.hit=function(n,msg,src){var g=this,P=g.P;if(P.inv>0)return;g.hp-=n;g.hurt+=n;P.inv=1.3;C.sfx('no');g.tip(msg,1.8);var fl=ROOT.querySelector('.sav-flash'),hp=ROOT.querySelector('.sav-hp');fl.classList.add('on');hp.classList.remove('shake');void hp.offsetWidth;hp.classList.add('shake');setTimeout(function(){fl.classList.remove('on')},60);try{navigator.vibrate&&navigator.vibrate(80)}catch(e){}if(src){var dx=P.x-src.x,dz=P.z-src.z,l=Math.hypot(dx,dz)||1;P.x+=dx/l*1.2;P.z+=dz/l*1.2}P.vy=6;
  if(g.hp<=0){g.hp=0;g.hud();g.fail(msg);return}g.hud()};
/* ---------- 挑戰失敗 ---------- */
Game.prototype.fail=function(why){var g=this;if(g.ended)return;g.ended=true;g.paused=true;var z=g.z,ks=['plat','door','send','sort'],done=ks.filter(function(k){return g.solved[k]}).length+(g.dmg>=9?1:0),sec=Math.round((Date.now()-g.t0)/1000);
  try{C.sfx('no')}catch(e){}
  var m=document.createElement('div');m.className='sav-mod';m.innerHTML='<div class="sav-card sav-end sav-fail"><div class="fx"><img src="'+img('l_front')+'" alt=""></div><h3 style="text-align:center">挑戰失敗！</h3>'+
    '<p class="why">'+esc(why||'')+'<br>愛心全部用完了，小石獅需要休息一下。</p>'+
    '<div class="sav-hearts">'+Array(g.maxHp+1).join('<i></i>')+'</div>'+
    '<div class="rw"><span>完成任務 '+done+' / 5</span><span>受傷 '+g.hurt+' 次</span><span>答錯 '+g.miss+' 次</span><span>用時 '+sec+' 秒</span></div>'+
    '<p class="sav-note" style="text-align:center">小提醒：看到小搗蛋可以按「吼！」或衝撞打倒它；跳台前先看準再跳！<br>這次的寶物和經驗不會保存，再試一次一定可以！</p>'+
    '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="sav-go" data-a="1">重新再來一次</button><button class="sav-go s" data-a="0">回冒險大廳</button></div></div>';
  ROOT.appendChild(m);try{C.say('愛心用完了，挑戰失敗！別灰心，重新再來一次吧！','sad')}catch(e){}
  m.querySelectorAll('[data-a]').forEach(function(b){b.addEventListener('click',function(){C.sfx('tap');var again=b.dataset.a==='1',zz=g.z;g.stop();G=null;if(again)start(zz,null);else lobby()})})};
Game.prototype.wrongQ=function(q){if(C.isKid()&&q)try{SOC.markQ(C.who(),q,false)}catch(e){}};
Game.prototype.solve=function(kind,first,remote){var g=this;if(g.solved[kind])return;g.solved[kind]=1;var q=g.Q[kind];
  if(!remote){if(C.isKid()&&q&&first)try{SOC.markQ(C.who(),q,true)}catch(e){}C.award(first?2:1);g.xpAdd(20)}
  C.sfx('win');try{C.confetti(null,24)}catch(e){}g.tip(remote?'夥伴答對了！一起前進！':'答對了！路打開了！',2);ROOT.querySelector('.sav-q').hidden=true;
  if(kind==='plat'){g.bridge.on=true;g.bridge.m.visible=true;var cb=g.plat.filter(function(b){return b.ans===q.a})[0];if(cb){g.bridge.x=cb.x;g.bridge.m.position.x=cb.x;cb.m.material.color.set(0x46b37a)}g.plat.forEach(function(b){if(b.ans!==q.a&&!b.fall){b.fall=true;b.fv=0}})}
  if(kind==='door'){g.doors.forEach(function(d){if(d.ans===q.a){d.on=false;d.m.visible=false;if(d.cardM)d.cardM.visible=false}})}
  if(kind==='send'){g.fence.on=false;g.fence.m.visible=false;if(g.fence.lk)g.fence.lk.visible=false;if(g.pick){g.sc.remove(g.pick);g.pick=null;g.P.carry=null}}
  if(kind==='sort'){g.gate2.on=false;g.gate2.m.visible=false;if(g.gate2.lk)g.gate2.lk.visible=false;if(g.srtCard){g.sc.remove(g.srtCard);g.srtCard=null}if(g.srt)g.srt.i=g.srt.items.length}
  g.hud()};
Game.prototype.showQ=function(tr){var el=ROOT.querySelector('.sav-q'),q=tr.q;el.hidden=false;el.classList.toggle('pic',!!q.p);el.innerHTML=q.p?'<img src="'+img(q.p)+'" alt=""><div><small>'+esc(tr.txt)+'</small>'+esc(q.q)+'<small style="color:#8a99a8;margin-top:2px">點照片可以放大</small></div>':'<small>'+esc(tr.txt)+'</small>'+esc(q.q);var im=el.querySelector('img');if(im)im.addEventListener('click',function(){var g=G;var z2=document.createElement('div');z2.className='sav-zoom';z2.innerHTML='<img src="'+img(q.p)+'" alt="">';ROOT.appendChild(z2);if(g)g.paused=true;z2.addEventListener('click',function(){z2.remove();if(g)g.paused=false})});C.say(q.q,'happy')};
/* ---------- 魔王 ---------- */
Game.prototype.spawnBoss=function(){var g=this,c=g.bossCfg,sp=g.sprite([c.k],3.6);sp.position.set(c.x,1.8,c.z);g.sc.add(sp);g.boss={sw:sp.scale.x,sh:sp.scale.y,sp:sp,x:c.x,z:c.z,hp:c.hp,max:c.hp,alive:true,t:0,shoot:2,stun:0,hits:0,qi:0};
  ROOT.querySelector('.sav-boss').hidden=false;ROOT.querySelector('.sav-q').hidden=true;g.tip(g.z.bn+'出現了！躲開攻擊，靠近牠按「吼！」',3);C.say(g.z.bn+'出現了！','oops');g.cp={x:0,y:.1,z:-176}};
Game.prototype.bossStep=function(dt,P){var g=this,b=g.boss;if(!b.alive)return;b.t+=dt;
  var dx=P.x-b.x,dz=P.z-b.z,l=Math.hypot(dx,dz)||1;if(l>3.2&&!b.stun){b.x+=dx/l*dt*1.6;b.z+=dz/l*dt*1.6}var dr=Math.hypot(b.x-g.arena.x,b.z-g.arena.z);if(dr>10){b.x=g.arena.x+(b.x-g.arena.x)/dr*10;b.z=g.arena.z+(b.z-g.arena.z)/dr*10}
  b.sp.position.set(b.x,1.8+Math.abs(Math.sin(b.t*3))*.25,b.z);
  if(b.hurtT>0){b.hurtT-=dt;b.sp.material.color.setRGB(1,.5,.5)}else b.sp.material.color.setRGB(1,1,1);
  b.shoot-=dt;var sc0=b.shoot<.45&&!b.stun?1+(.45-b.shoot)*.5:1;b.sp.scale.set(b.sw*sc0,b.sh*sc0,1);if(b.shoot<=0&&!b.stun){b.shoot=Math.max(1.1,2.2-(b.max-b.hp)*.1);var n=b.hp<5?3:1;for(var i=0;i<n;i++){var a=Math.atan2(dz,dx)+(i-(n-1)/2)*.35,m=new T.Mesh(new T.SphereGeometry(.42,10,8),new T.MeshLambertMaterial({color:0x9b59d0,emissive:0x331144}));m.position.set(b.x,1.6,b.z);g.sc.add(m);g.shots.push({m:m,x:b.x,y:1.6,z:b.z,vx:Math.cos(a)*7,vz:Math.sin(a)*7,r:.42,life:3})}}
  if(P.inv<=0&&l<1.6&&Math.abs(P.y)<1.5)g.hit(1,'被'+g.z.bn+'撞到了！',b)};
Game.prototype.bossHit=function(n,remote){var g=this,b=g.boss;if(!b||!b.alive)return;b.hp-=n;if(!remote)g.dmg+=n;b.hurtT=.25;b.hits+=n;C.sfx('pop');var dx=b.x-g.P.x,dz=b.z-g.P.z,l=Math.hypot(dx,dz)||1;b.x+=dx/l*1.5;b.z+=dz/l*1.5;g.bossBar();
  if(b.hp<=0){g.bossDie();return}
  if(!remote&&b.hits>=3&&b.qi<g.Q.boss.length){b.hits=0;g.bossQ()}};
Game.prototype.bossBar=function(){var b=this.boss;ROOT.querySelector('.sav-boss .bar i').style.width=Math.max(0,b.hp/b.max*100)+'%'};
Game.prototype.bossQ=function(){var g=this,b=g.boss,q=g.Q.boss[b.qi++];if(!q)return;g.paused=true;
  var R=g.R,o=q.t==='tf'?[true,false]:opts(q,R,Math.min(4,1+q.o.length));
  var m=document.createElement('div');m.className='sav-mod';m.innerHTML='<div class="sav-card"><div class="who"><img src="'+img(g.z.boss)+'" alt=""><h3>'+esc(g.z.bn)+'暈倒了！答對就放大絕招！</h3></div><h3>'+esc(q.q)+'</h3>'+(q.p?'<img class="pic" src="'+img(q.p)+'" alt="">':'')+'<div class="sav-ops">'+o.map(function(v,i){return '<button class="sav-op" data-i="'+i+'">'+(q.t==='mi'?'<img src="'+img(v)+'" alt="">'+esc(cap(v)):q.t==='tf'?(v?'○ 對':'✕ 錯'):esc(v))+'</button>'}).join('')+'</div><div class="sav-fb"></div></div>';
  ROOT.appendChild(m);
  m.querySelectorAll('.sav-op').forEach(function(btn){btn.addEventListener('click',function(){var v=o[+btn.dataset.i],ok=v===q.a;m.querySelectorAll('.sav-op').forEach(function(x){x.disabled=true;if(o[+x.dataset.i]===q.a)x.classList.add('ok')});if(!ok)btn.classList.add('no');
    if(C.isKid())try{SOC.markQ(C.who(),q,ok)}catch(e){}if(ok){C.award(2);g.xpAdd(20)}else g.miss++;
    var ans=ok?'':'答案是「'+(q.t==='mi'?cap(q.a):q.t==='tf'?(q.a?'對':'錯'):q.a)+'」。';
    m.querySelector('.sav-fb').innerHTML='<p style="margin:0;font-size:16px;line-height:1.55"><b>'+(ok?'答對了！小石獅放出超級吼聲！':'可惜！魔王恢復了一點力氣。')+'</b><br>'+esc(ans+(q.e||''))+'</p><button class="sav-go" style="margin-top:10px">繼續戰鬥！</button>';C.sfx(ok?'ok':'no');
    m.querySelector('.sav-go').addEventListener('click',function(){m.remove();g.paused=false;C.sfx('tap');if(ok){g.ringT=.9;g.bossHit(3)}else{b.hp=Math.min(b.max,b.hp+1);g.bossBar()}})})})};
Game.prototype.bossDie=function(){var g=this,b=g.boss;b.alive=false;g.sc.remove(b.sp);g.shots.forEach(function(s){g.sc.remove(s.m)});g.shots=[];C.sfx('win');try{C.confetti(null,60)}catch(e){}g.tip('打倒'+g.z.bn+'了！去打開寶箱！',3);C.say('打倒'+g.z.bn+'了！','happy');ROOT.querySelector('.sav-boss').hidden=true;g.xpAdd(50);
  var cs=g.sprite(['chest'],1.8);cs.position.set(b.x,.9,b.z);g.sc.add(cs);g.chest={x:b.x,z:b.z,sp:cs}};
/* ---------- 連線 ---------- */
Game.prototype.netIn=function(){var g=this;if(!g.net)return;var ps=C.Net.peers();Object.keys(ps).forEach(function(c){var q=ps[c];if(q.tok!==g.net.tok)return;
  var o=g.peers[c];if(!o){var sp=g.sprite(['l_back','l_front','l_side','l_run'],1.55);sp.material.color.setRGB(.85,.95,1.15);g.sc.add(sp);var nm=g.card(String(q.n||'夥伴'),null,1.6,null,'#dff0ff');g.sc.add(nm);o=g.peers[c]={sp:sp,nm:nm,x:+q.x||0,y:+q.y||0,z:+q.z||0,bd:0}}
  o.tx=+q.x||0;o.ty=+q.y||0;o.tz=+q.z||0;o.f=q.f||'back';o.fl=!!q.fl;o.run=!!q.run;
  String(q.gs||'').split(',').filter(Boolean).forEach(function(k){if(!g.solved[k])g.solve(k,false,true)});
  var bd=+q.bd||0;if(bd>o.bd){var d=bd-o.bd;o.bd=bd;if(g.boss&&g.boss.alive)g.bossHit(d,true)}else o.bd=Math.max(o.bd,bd)})};
/* ---------- 畫面 ---------- */
Game.prototype.draw=function(dt){var g=this,P=g.P,cam=g.cam;
  var key=P.dash>0||(!P.on&&Math.abs(P.vy)>3)?'l_run':P.face==='side'?'l_side':P.face==='front'?'l_front':'l_back',fl=key==='l_run'?(P.vx<0):key==='l_side'?P.flip:false;
  if(key==='l_run'&&P.face==='back'&&Math.abs(P.vx)<1)fl=false;
  g.setSp(g.me,key,fl);g.me.position.set(P.x,P.y+.78+(P.on&&Math.hypot(P.vx,P.vz)>1?Math.abs(Math.sin(performance.now()/90))*.08:0),P.z);g.me.material.opacity=P.inv>0&&Math.floor(P.inv*10)%2?.45:1;
  var sy=-99;g.boxes.forEach(function(b){if(!b.on||b.solid===false)return;var inside=b.round?Math.hypot(P.x-b.x,P.z-b.z)<b.round:(Math.abs(P.x-b.x)<b.w&&Math.abs(P.z-b.z)<b.d);if(inside&&b.y<=P.y+.05&&b.y>sy)sy=b.y});g.shadow.visible=sy>-90;g.shadow.position.set(P.x,sy+.03,P.z);
  if(g.ringT>0){g.ringT-=dt;var s=(1-g.ringT/.45)*g.roarR;g.ring.scale.set(Math.max(.1,s),Math.max(.1,s),1);g.ring.position.set(P.x,P.y+.4,P.z);g.ring.material.opacity=Math.max(0,g.ringT*2)}else g.ring.material.opacity=0;
  /* 鏡頭 */
  var pt=(ROOT.clientHeight>ROOT.clientWidth),k2=pt?1.3:1;var tx=P.x*.5,ty=P.y+4.6*k2,tz=P.z+8.2*k2;cam.position.x+=(tx-cam.position.x)*Math.min(1,dt*5);cam.position.y+=(ty-cam.position.y)*Math.min(1,dt*4);cam.position.z+=(tz-cam.position.z)*Math.min(1,dt*6);cam.lookAt(P.x*.8,P.y+1.2,P.z-4);
  if(g.pick&&!P.carry)g.pick.rotation.y+=dt*2;if(g.srtCard&&!(g.srt&&g.srt.held))g.srtCard.rotation.y=Math.sin(performance.now()/500)*.3;
  for(var c in g.peers){var o=g.peers[c];o.x+=(o.tx-o.x)*Math.min(1,dt*10);o.y+=(o.ty-o.y)*Math.min(1,dt*10);o.z+=(o.tz-o.z)*Math.min(1,dt*10);g.setSp(o.sp,o.run?'l_run':o.f==='side'?'l_side':o.f==='front'?'l_front':'l_back',o.fl);o.sp.position.set(o.x,o.y+.78,o.z);o.nm.position.set(o.x,o.y+2.3,o.z);o.nm.quaternion.copy(cam.quaternion)}
  g.fc=(g.fc||0)+1;if(g.fc%2===0)g.fade();
  if(g.parts)g.parts=g.parts.filter(function(p){p.l-=dt;p.vy-=18*dt;p.m.position.x+=p.vx*dt;p.m.position.y+=p.vy*dt;p.m.position.z+=p.vz*dt;p.m.rotation.x+=dt*6;if(p.l<=0){g.sc.remove(p.m);return false}return true});
  ROOT.querySelector('.sav-b.d').classList.toggle('cd',P.dcd>0);ROOT.querySelector('.sav-b.r').classList.toggle('cd',P.rcd>0);
  if(g.tipT>0){g.tipT-=dt;if(g.tipT<=0)ROOT.querySelector('.sav-tip').style.opacity=0}};
Game.prototype.burst=function(x,y,z,col){var g=this;g.parts=g.parts||[];for(var i=0;i<7;i++){var m=new T.Mesh(new T.BoxGeometry(.22,.22,.22),new T.MeshLambertMaterial({color:col||0xffcf3f}));m.position.set(x,y,z);g.sc.add(m);var a=Math.random()*Math.PI*2;g.parts.push({m:m,vx:Math.cos(a)*3,vy:4+Math.random()*3,vz:Math.sin(a)*3,l:.7})}};
Game.prototype.fade=function(){var g=this;if(!g.ray)g.ray=new T.Raycaster();var P=g.P,cam=g.cam,tgt=new T.Vector3(P.x,P.y+.8,P.z),dir=tgt.clone().sub(cam.position),dist=dir.length();dir.normalize();g.ray.set(cam.position,dir);g.ray.far=Math.max(.1,dist-.5);
  var hit=g.ray.intersectObjects(g.occ,false).map(function(h){return h.object});
  g.occ.forEach(function(m){if(m.userData.card&&m.visible&&hit.indexOf(m)<0){var wz=m.position.z;if(m.parent&&m.parent!==g.sc)return;if(wz>P.z+.6&&wz<cam.position.z+.5)hit.push(m)}});
  g.faded.forEach(function(m){if(hit.indexOf(m)<0){m.material.opacity=m.userData.op!==undefined?m.userData.op:1;m.material.transparent=!!m.userData.tr;m.material.depthWrite=true;m.children.forEach(function(c){if(c.material&&c.type!=='LineSegments'){c.material.opacity=1;c.material.transparent=false}})}});
  hit.forEach(function(m){if(!m.visible)return;if(m.userData.tr===undefined){m.userData.tr=m.material.transparent;m.userData.op=m.material.opacity}m.material.transparent=true;m.material.opacity=.25;m.material.depthWrite=false;m.children.forEach(function(c){if(c.material&&c.type!=='LineSegments'){c.material.transparent=true;c.material.opacity=.25}})});g.faded=hit};
Game.prototype.tip=function(t,s){var el=ROOT&&ROOT.querySelector('.sav-tip');if(!el)return;el.textContent=t;el.style.opacity=1;this.tipT=s||2};
Game.prototype.hud=function(){var g=this;if(!ROOT)return;var h='';for(var i=0;i<g.maxHp;i++)h+='<i class="'+(i<g.hp?'':'off')+'"><svg viewBox=\"0 0 24 22\" width=\"24\" height=\"22\"><path d=\"M12 21s-8.5-5.4-10.6-10.3C-.3 6.4 2.6 1.5 7 1.5c2.3 0 3.9 1.3 5 3 1.1-1.7 2.7-3 5-3 4.4 0 7.3 4.9 5.6 9.2C20.5 15.6 12 21 12 21z\"/></svg></i>';ROOT.querySelector('.sav-hp').innerHTML=h;ROOT.querySelector('.sav-coin b').textContent=g.coins};
Game.prototype.prog=function(){var g=this,p=Math.max(0,Math.min(1,-g.P.z/190));if(Math.abs(p-(g.lp||0))>.01){g.lp=p;ROOT.querySelector('.sav-prog i').style.width=Math.round(p*100)+'%'}};
Game.prototype.ask=function(t,btns){var g=this;g.paused=true;var m=document.createElement('div');m.className='sav-mod';m.innerHTML='<div class="sav-card"><h3>'+esc(t)+'</h3><div style="display:flex;gap:10px;justify-content:center">'+btns.map(function(b,i){return '<button class="sav-go'+(i?' s':'')+'" data-i="'+i+'">'+esc(b[0])+'</button>'}).join('')+'</div></div>';ROOT.appendChild(m);
  m.querySelectorAll('[data-i]').forEach(function(b){b.addEventListener('click',function(){m.remove();g.paused=false;var f=btns[+b.dataset.i][1];if(f)f()})})};
/* ---------- 結算 ---------- */
Game.prototype.finish=function(){var g=this;if(g.ended)return;g.ended=true;g.paused=true;var id=C.who(),z=g.z,st=g.miss===0&&g.hurt<=2?3:g.miss<=2?2:1,xp=(g.xp||0)+st*30,coins=g.coins+st*10,first=false,lv0=lvOf(+sa(id).xp||0),bonus=0;
  if(C.isKid()){saMut(id,function(o){o.xp=(+o.xp||0)+xp;o.c=(+o.c||0)+coins;o.z[z.k]=Math.max(+o.z[z.k]||0,st);if(!o.t[z.k]){o.t[z.k]=1;first=true}o.n=(+o.n||0)+1});C.award(3);bonus=C.finishBonus(Math.max(0,8-g.miss),8)||0}
  var lv1=lvOf(+sa(id).xp||0);
  var m=document.createElement('div');m.className='sav-mod';m.innerHTML='<div class="sav-card sav-end"><h3 style="text-align:center">「'+esc(z.n)+'」守護成功！</h3><div class="sav-stars">'+[0,1,2].map(function(j){return '<i class="'+(j<st?'on':'')+'">★</i>'}).join('')+'</div>'+
    (first?'<div class="tr"><img src="'+img(z.tr[0])+'" alt="">拿回寶物：'+esc(z.tr[1])+'</div>':'')+
    '<div class="rw"><span>經驗 +'+xp+'</span><span>家鄉幣 +'+coins+'</span><span>社會分 +'+(30+bonus)+'</span>'+(lv1>lv0?'<span style="background:#e3f6ea">升級到 Lv.'+lv1+'！</span>':'')+'</div>'+
    '<p class="sav-note" style="text-align:center">答錯 '+g.miss+' 次・受傷 '+g.hurt+' 次・用時 '+Math.round((Date.now()-g.t0)/1000)+' 秒</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="sav-go" data-a="1">再玩一次</button><button class="sav-go s" data-a="0">回冒險大廳</button></div></div>';
  ROOT.appendChild(m);C.sfx('win');try{C.confetti(null,80)}catch(e){}C.say('守護成功！'+(first?'拿回了'+z.tr[1]+'！':''),'happy');
  m.querySelectorAll('[data-a]').forEach(function(b){b.addEventListener('click',function(){C.sfx('tap');var again=b.dataset.a==='1',zz=g.z;g.stop();G=null;if(again)start(zz,null);else lobby()})})};

global.AdvFactory=function(ctx){C=ctx;SOC=ctx.SOC;return {open:open,entry:entry,css:addCss,zones:ZONES,_game:function(){return G}}};
})(window);
