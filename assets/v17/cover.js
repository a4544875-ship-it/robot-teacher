/* 奇蹟知識島 v17 — 動態封面「魔法城堡」
   主圖拆成多層：背景（已去掉會動的物件與彩虹）＋彩虹、星星小巫師、飛船、浮島、皇冠、ABC 積木、按鈕、火箭。
   所有位置用原圖座標（941×1672）換算成百分比，舞台依螢幕縮放。 */
(function(){
var IW=941,IH=1672,B='assets/v17/cover/';
var L={star:[28,902,243,199],ship:[69,447,133,89],isle:[771,394,153,163],crown:[419,191,98,64],abc:[675,998,231,202],btn:[132,1244,669,202],rocket:[233,1300,92,82],rainbow:[0,116,941,255],title:[90,95,775,330]};
function P(r){return 'left:'+(r[0]/IW*100)+'%;top:'+(r[1]/IH*100)+'%;width:'+(r[2]/IW*100)+'%;height:'+(r[3]/IH*100)+'%'}
function pt(x,y){return 'left:'+(x/IW*100)+'%;top:'+(y/IH*100)+'%'}
var CSS=[
'#gate.cover{padding:0;overflow:hidden;background:#7fb8f2}',
'.cv3fill{position:absolute;inset:-30px;background:url('+B+'bg.webp) center/cover no-repeat;filter:blur(18px) saturate(1.1);opacity:.9}',
'.cv3{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);container-type:inline-size}',
'.cv3>*{position:absolute}',
'.cv3 .bg{inset:0;width:100%;height:100%;display:block}',
'.cv3 img{display:block;width:100%;height:100%;pointer-events:none;user-select:none;-webkit-user-drag:none;padding:0!important;margin:0!important;border:0!important;box-shadow:none!important;background:none!important;border-radius:0!important;max-width:none!important}',
/* 彩虹：從左畫到右，停一下，淡出，再畫一次 */
'.cv3 .rb{-webkit-mask-image:linear-gradient(90deg,#000 0 44%,transparent 56% 100%);mask-image:linear-gradient(90deg,#000 0 44%,transparent 56% 100%);-webkit-mask-size:240% 100%;mask-size:240% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;animation:cv3rb 11s ease-in-out .5s infinite both}',
'.cv3 .rb img{filter:saturate(1.35) brightness(1.06)}',
'@keyframes cv3rb{0%{-webkit-mask-position:100% 0;mask-position:100% 0;opacity:1}20%{-webkit-mask-position:0 0;mask-position:0 0;opacity:1}86%{-webkit-mask-position:0 0;mask-position:0 0;opacity:1}94%{-webkit-mask-position:0 0;mask-position:0 0;opacity:0}95%,100%{-webkit-mask-position:100% 0;mask-position:100% 0;opacity:0}}',
'.cv3 .rbg{-webkit-mask:url('+B+'rainbow.webp) center/100% 100% no-repeat;mask:url('+B+'rainbow.webp) center/100% 100% no-repeat;background:linear-gradient(100deg,transparent 0 40%,rgba(255,255,255,.95) 50%,transparent 60% 100%) no-repeat;background-size:300% 100%;mix-blend-mode:screen;animation:cv3glint 11s linear .5s infinite}',
'@keyframes cv3glint{0%,22%{background-position:120% 0;opacity:0}24%{opacity:1}44%{background-position:-20% 0;opacity:1}46%,100%{background-position:-20% 0;opacity:0}}',
/* 標題閃光、皇冠跳 */
'.cv3 .ttl{-webkit-mask:url('+B+'title-mask.webp) center/100% 100% no-repeat;mask:url('+B+'title-mask.webp) center/100% 100% no-repeat;background:linear-gradient(115deg,transparent 0 42%,rgba(255,255,255,.85) 50%,transparent 58% 100%) no-repeat;background-size:320% 100%;mix-blend-mode:soft-light;animation:cv3shine 4.5s ease-in-out 1.2s infinite}',
'@keyframes cv3shine{0%{background-position:120% 0}55%,100%{background-position:-20% 0}}',
'.cv3 .crown{transform-origin:50% 100%;animation:cv3crown 2.6s ease-in-out infinite}',
'@keyframes cv3crown{0%,100%{transform:translateY(0) rotate(0)}20%{transform:translateY(-14%) rotate(-6deg)}40%{transform:translateY(0) rotate(0)}55%{transform:translateY(-7%) rotate(5deg)}70%{transform:translateY(0)}}',
'.cv3 .crown img{filter:drop-shadow(0 0 6px rgba(255,230,120,.9))}',
/* 雲慢慢飄 */
'.cv3 .cl{width:34%;height:7%;border-radius:999px;background:radial-gradient(closest-side,rgba(255,255,255,.95),rgba(255,255,255,0));filter:blur(2px);opacity:.75;animation:cv3cloud linear infinite}',
'.cv3 .cl::before,.cv3 .cl::after{content:"";position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.95),rgba(255,255,255,0))}',
'.cv3 .cl::before{width:55%;height:150%;left:15%;top:-60%}.cv3 .cl::after{width:45%;height:120%;left:45%;top:-40%}',
'@keyframes cv3cloud{0%{transform:translateX(-160%)}100%{transform:translateX(420%)}}',
/* 飛船、浮島 */
'.cv3 .ship{animation:cv3ship 9s ease-in-out infinite}',
'@keyframes cv3ship{0%,100%{transform:translate(0,0) rotate(-2deg)}25%{transform:translate(12%,-10%) rotate(1deg)}50%{transform:translate(26%,0) rotate(3deg)}75%{transform:translate(12%,8%) rotate(0)}}',
'.cv3 .isle{animation:cv3bob 5.5s ease-in-out infinite}',
'@keyframes cv3bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6%)}}',
/* 星星小巫師：跳一跳、揮魔杖、杖尖冒星光 */
'.cv3 .wiz{transform-origin:45% 100%;animation:cv3wiz 3.6s ease-in-out infinite}',
'@keyframes cv3wiz{0%,100%{transform:translateY(0) rotate(0) scale(1,1)}10%{transform:translateY(1%) scale(1.04,.95)}22%{transform:translateY(-9%) rotate(-5deg) scale(.97,1.04)}34%{transform:translateY(0) rotate(0) scale(1.03,.97)}44%{transform:translateY(0) rotate(0) scale(1,1)}58%{transform:rotate(6deg)}70%{transform:rotate(-4deg)}82%{transform:rotate(3deg)}}',
'.cv3 .wiz .sp{position:absolute;width:12%;aspect-ratio:1;margin:-6% 0 0 -6%;opacity:0;animation:cv3pop 1.8s ease-out infinite}',
'@keyframes cv3pop{0%{opacity:0;transform:translate(0,0) scale(.2) rotate(0)}15%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(1) rotate(160deg)}}',
/* 積木跳、光暈 */
'.cv3 .abc{transform-origin:50% 100%;animation:cv3abc 3.2s ease-in-out .6s infinite}',
'@keyframes cv3abc{0%,60%,100%{transform:translateY(0) scale(1,1)}68%{transform:translateY(1%) scale(1.04,.96)}78%{transform:translateY(-8%) scale(.98,1.03)}88%{transform:translateY(0) scale(1.02,.98)}}',
'.cv3 .glow{border-radius:50%;background:radial-gradient(closest-side,rgba(var(--g),.85),rgba(var(--g),0));mix-blend-mode:screen;transform:translate(-50%,-50%);animation:cv3glow var(--t,2.4s) ease-in-out infinite}',
'@keyframes cv3glow{0%,100%{opacity:.25;transform:translate(-50%,-50%) scale(.85)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}}',
'.cv3 .beam{width:9%;height:16%;transform:translateX(-50%);background:linear-gradient(180deg,rgba(150,240,255,0),rgba(170,245,255,.85) 40%,rgba(150,240,255,0));mix-blend-mode:screen;filter:blur(3px);animation:cv3beam 2.2s ease-in-out infinite}',
'@keyframes cv3beam{0%,100%{opacity:.3}50%{opacity:1}}',
/* 一閃一閃的星光、往上飄的魔法粉 */
'.cv3 .tw{width:5%;aspect-ratio:1;margin:-2.5% 0 0 -2.5%;animation:cv3tw var(--t,2.2s) ease-in-out var(--d,0s) infinite}',
'@keyframes cv3tw{0%,100%{transform:scale(.2) rotate(0);opacity:0}50%{transform:scale(1) rotate(90deg);opacity:1}}',
'.cv3 .dust{width:1.2%;aspect-ratio:1;border-radius:50%;background:#fff;box-shadow:0 0 8px 3px rgba(255,240,170,.9);opacity:0;animation:cv3dust var(--t,6s) linear var(--d,0s) infinite}',
'@keyframes cv3dust{0%{opacity:0;transform:translate(0,0)}15%{opacity:1}100%{opacity:0;transform:translate(var(--dx,0),-700%)}}',
/* 按鈕：心跳＋閃光；火箭抖動 */
'.cv3 .go{padding:0;border:0;background:none;cursor:pointer;animation:cv3beat 1.4s ease-in-out infinite;-webkit-tap-highlight-color:transparent}',
'.cv3 .go:active{animation:none;transform:translateY(3%) scale(.98)}',
'@keyframes cv3beat{0%,100%{transform:scale(1)}14%{transform:scale(1.07)}28%{transform:scale(1)}42%{transform:scale(1.04)}60%{transform:scale(1)}}',
'.cv3 .go .sh{position:absolute;inset:0;-webkit-mask:url('+B+'btn.webp) center/100% 100% no-repeat;mask:url('+B+'btn.webp) center/100% 100% no-repeat;background:linear-gradient(110deg,transparent 0 40%,rgba(255,255,255,.75) 50%,transparent 60% 100%) no-repeat;background-size:300% 100%;animation:cv3shine 2.8s ease-in-out infinite}',
'.cv3 .go .rk{position:absolute;animation:cv3rk .9s ease-in-out infinite}',
'@keyframes cv3rk{0%,100%{transform:translate(0,0) rotate(0)}25%{transform:translate(4%,-6%) rotate(-6deg)}50%{transform:translate(0,-2%) rotate(3deg)}75%{transform:translate(3%,-8%) rotate(-3deg)}}',
'.cv3 .vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}',
'@media (prefers-reduced-motion:reduce){.cv3 *{animation:none!important}.cv3 .rb{-webkit-mask:none;mask:none}}'
].join('\n');
var TW='<svg viewBox="0 0 20 20"><path d="M10 0C11 7 13 9 20 10 13 11 11 13 10 20 9 13 7 11 0 10 7 9 9 7 10 0Z" fill="#fff"/><circle cx="10" cy="10" r="2.6" fill="#fff6c8"/></svg>';
var SP='<svg viewBox="0 0 20 20"><path d="M10 0 12.6 7 20 7.6 14.2 12.3 16.2 20 10 15.6 3.8 20 5.8 12.3 0 7.6 7.4 7Z" fill="#ffe36a" stroke="#fff" stroke-width="1"/></svg>';
function html(){var h='<div class="cv3fill" aria-hidden="true"></div><div class="cv3" id="cv3">';
  h+='<img class="bg" src="'+B+'bg.webp" alt="">';
  h+='<div class="rb" style="'+P(L.rainbow)+'"><img src="'+B+'rainbow.webp" alt=""></div><div class="rbg" style="'+P(L.rainbow)+'"></div>';
  h+='<i class="cl" style="'+pt(0,60)+';animation-duration:48s;animation-delay:-12s"></i><i class="cl" style="'+pt(0,560)+';animation-duration:62s;animation-delay:-40s;opacity:.55"></i><i class="cl" style="'+pt(0,1180)+';animation-duration:55s;animation-delay:-25s;opacity:.5"></i>';
  h+='<div class="ttl" style="'+P(L.title)+'"></div>';
  h+='<div class="ship" style="'+P(L.ship)+'"><img src="'+B+'ship.webp" alt=""></div>';
  h+='<div class="isle" style="'+P(L.isle)+'"><img src="'+B+'isle.webp" alt=""></div>';
  h+='<div class="crown" style="'+P(L.crown)+'"><img src="'+B+'crown.webp" alt=""></div>';
  h+='<i class="glow" style="'+pt(470,455)+';width:16%;aspect-ratio:1;--g:140,240,255;--t:2.6s"></i>';
  h+='<i class="beam" style="'+pt(480,860)+'"></i><i class="glow" style="'+pt(480,940)+';width:20%;aspect-ratio:1;--g:170,230,255;--t:2.2s"></i>';
  h+='<i class="glow" style="'+pt(60,1490)+';width:16%;aspect-ratio:1;--g:170,200,255;--t:3s"></i><i class="glow" style="'+pt(835,1500)+';width:20%;aspect-ratio:1;--g:255,230,150;--t:2.8s"></i><i class="glow" style="'+pt(865,960)+';width:14%;aspect-ratio:1;--g:160,220,255;--t:3.4s"></i>';
  h+='<div class="abc" style="'+P(L.abc)+'"><img src="'+B+'abc.webp" alt=""></div>';
  var sp='';[[-20,-60],[30,-55],[45,-10],[-35,-25],[10,-75]].forEach(function(v,i){sp+='<i class="sp" style="left:92.6%;top:28%;--dx:'+v[0]+'px;--dy:'+v[1]+'px;animation-delay:'+(i*.36)+'s">'+SP+'</i>'});
  h+='<div class="wiz" style="'+P(L.star)+'"><img src="'+B+'star.webp" alt="">'+sp+'</div>';
  [[180,80,2.4,0],[805,158,2.8,.7],[122,175,2,1.3],[860,212,2.6,.4],[52,358,2.2,1.8],[232,1508,2,.2],[706,1508,2.4,1.1],[560,30,3,.9],[330,620,2.6,1.6],[640,640,2.3,.5],[905,1290,2.5,1.2],[40,1290,2.7,.3],[600,1105,2.2,1.9]].forEach(function(t){h+='<i class="tw" style="'+pt(t[0],t[1])+';--t:'+t[2]+'s;--d:'+t[3]+'s">'+TW+'</i>'});
  for(var i=0;i<14;i++){var x=380+Math.round(Math.random()*200),y=980+Math.round(Math.random()*260);h+='<i class="dust" style="'+pt(x,y)+';--t:'+(4.5+Math.random()*3).toFixed(1)+'s;--d:'+(Math.random()*5).toFixed(1)+'s;--dx:'+Math.round(Math.random()*120-60)+'%"></i>'}
  h+='<button class="go" id="cvGo" style="'+P(L.btn)+'" aria-label="準備出發"><img src="'+B+'btn.webp" alt=""><span class="sh"></span><img class="rk" src="'+B+'rocket.webp" alt="" style="left:'+((L.rocket[0]-L.btn[0])/L.btn[2]*100)+'%;top:'+((L.rocket[1]-L.btn[1])/L.btn[3]*100)+'%;width:'+(L.rocket[2]/L.btn[2]*100)+'%;height:'+(L.rocket[3]/L.btn[3]*100)+'%"></button>';
  h+='<h1 class="vh">奇蹟知識島・魔法城堡</h1></div>';return h}
function fit(gate){var st=gate.querySelector('#cv3');if(!st)return;var W=gate.clientWidth,H=gate.clientHeight;if(!W||!H)return;
  /* 以填滿為主，但左右最多裁掉 12%；剩下的上下用模糊背景補 */
  var s=W/H>.8?H/IH:Math.max(W/IW,Math.min(H/IH,W/IW*1.14));
  st.style.width=Math.round(IW*s)+'px';st.style.height=Math.round(IH*s)+'px'}
var css=false,onR=null;
window.CoverV3={render:function(gate,onGo){if(!css){var e=document.createElement('style');e.textContent=CSS;document.head.appendChild(e);css=true}
  gate.innerHTML=html();fit(gate);if(onR)window.removeEventListener('resize',onR);onR=function(){fit(gate)};window.addEventListener('resize',onR);
  var b=gate.querySelector('#cvGo');b.addEventListener('click',function(){window.removeEventListener('resize',onR);onGo(b)})},
  fit:fit};
})();
