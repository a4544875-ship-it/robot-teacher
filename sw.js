/* 奇蹟知識島 v4.0 — versioned, atomic offline assets; Firebase stays uncached. */
const CACHE='robot-teacher-v83';
const CORE=["assets/v8/family.js?v=8.3.1", "assets/v9/lab.js?v=9.3.0", "assets/v9/lab-bank.js?v=9.2.0", "assets/v9/lab-bank-g2.js?v=9.2.0", "assets/v9/lab-bank-g4.js?v=9.2.0", "assets/v9/lab-studio.js?v=9.1.0", "assets/v9/lab.css?v=9.1.0", "assets/v9/art/aquatic.webp","assets/v9/art/circuit.webp","assets/v9/art/ecology.webp","assets/v9/art/magnet.webp","assets/v9/art/moon.webp","assets/v9/art/research-island.webp","assets/v9/art/reward-ckt2.svg","assets/v9/art/reward-eco2.svg","assets/v9/art/reward-flow.svg","assets/v9/art/reward-mag2.svg","assets/v9/art/reward-moon2.svg","assets/v9/art/reward-pond.svg","assets/v9/art/reward-sun.svg","assets/v9/art/reward-temp.svg","assets/v9/art/reward-time.svg","assets/v9/art/reward-wx2.svg","assets/v9/art/sun.webp","assets/v9/art/temperature.webp","assets/v9/art/time.webp","assets/v9/art/water.webp","assets/v9/art/weather.webp", "assets/v8/family.css?v=8.3.1", "assets/velocity-v4.js?v=4.1.0", "assets/math-v4.js?v=4.2.0", "assets/v10/progress.js?v=16.1.0", "assets/v11/esk.js?v=11.2.0", "assets/v12/tutor.js?v=12.0.1", "assets/v13/parent.js?v=16.4.0", "assets/v14/care.js?v=14.1.0", "assets/v15/social.js?v=16.3.0", "assets/v15/adv.js?v=15.6.0", "assets/v15/town.js?v=15.6.0", "assets/v16/expert-sci.js?v=16.3.0", "assets/v16/expert-soc.js?v=16.3.0", "assets/v16/expert-en.js?v=16.3.0", "assets/v17/cover.js?v=17.0.0", "assets/v18/gate.js?v=18.0.0", "assets/v18/av/adv-c.webp", "assets/v18/av/adv-h.webp", "assets/v18/av/adv.webp", "assets/v18/av/archer-c.webp", "assets/v18/av/archer-h.webp", "assets/v18/av/archer.webp", "assets/v18/av/astro-c.webp", "assets/v18/av/astro-h.webp", "assets/v18/av/astro.webp", "assets/v18/av/black-c.webp", "assets/v18/av/black-h.webp", "assets/v18/av/black.webp", "assets/v18/av/blue-c.webp", "assets/v18/av/blue-h.webp", "assets/v18/av/blue.webp", "assets/v18/av/cat-c.webp", "assets/v18/av/cat-h.webp", "assets/v18/av/cat.webp", "assets/v18/av/horn-c.webp", "assets/v18/av/horn-h.webp", "assets/v18/av/horn.webp", "assets/v18/av/knight-c.webp", "assets/v18/av/knight-h.webp", "assets/v18/av/knight.webp", "assets/v18/av/ninja-c.webp", "assets/v18/av/ninja-h.webp", "assets/v18/av/ninja.webp", "assets/v18/av/pirate-c.webp", "assets/v18/av/pirate-h.webp", "assets/v18/av/pirate.webp", "assets/v18/av/prince-c.webp", "assets/v18/av/prince-h.webp", "assets/v18/av/prince.webp", "assets/v18/av/red-c.webp", "assets/v18/av/red-h.webp", "assets/v18/av/red.webp", "assets/v18/av/star-c.webp", "assets/v18/av/star-h.webp", "assets/v18/av/star.webp", "assets/v18/av/tech-c.webp", "assets/v18/av/tech-h.webp", "assets/v18/av/tech.webp", "assets/v18/av/wizard-c.webp", "assets/v18/av/wizard-h.webp", "assets/v18/av/wizard.webp", "assets/v17/cover/bg.webp", "assets/v17/cover/rainbow.webp", "assets/v17/cover/star.webp", "assets/v17/cover/ship.webp", "assets/v17/cover/isle.webp", "assets/v17/cover/crown.webp", "assets/v17/cover/abc.webp", "assets/v17/cover/btn.webp", "assets/v17/cover/rocket.webp", "assets/v17/cover/title-mask.webp", "assets/expansion-v4.css?v=4.1.0", "assets/v4/boss-dragon.webp", "assets/v4/car-aero.webp", "assets/v4/car-nova.webp", "assets/v4/car-rally.webp", "assets/v4/cover-kart.webp", "assets/v4/cover-mbingo.webp", "assets/v4/cover-mbond.webp", "assets/v4/cover-mboss.webp", "assets/v4/cover-mcmp.webp", "assets/v4/cover-meteor.webp", "assets/v4/cover-msnake.webp", "assets/v4/cover-ttab.webp", "assets/v4/cover-v2clock.webp", "assets/v4/cover-v2fraction.webp"].concat(['./','index.html','manifest.webmanifest','castle-192.png','assets/island-v2.css','assets/english-premium-v3.css',
  ...['adventure-island','adventure-diner','adventure-tower','adventure-shoot'].map(n=>'assets/'+n+'.webp'),
  ...['cat','dog','pig','fish','bird','cow','duck','bee','egg','cake','book','bag','hat','car','ball','cup'].map(n=>'assets/word-'+n+'.webp'),
  ...['sky','kitchen','clock','moon','meadow','sound','owl','fox','robot','frog'].map(n=>'assets/'+n+'.webp')]);
const IMG_CACHE='rt-img-1';
const STATIC_HOSTS=['cdnjs.cloudflare.com','www.gstatic.com','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('robot-teacher-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url),same=url.origin===self.location.origin;
  const page=same&&(req.mode==='navigate'||url.pathname.endsWith('/')||url.pathname.endsWith('index.html'));
  if(page){
    event.respondWith(fetch(req).then(async res=>{
      if(!res.ok)throw new Error('page unavailable');
      const cache=await caches.open(CACHE);await cache.put(req,res.clone());return res;
    }).catch(async()=>{const cache=await caches.open(CACHE);return await cache.match(req)||await cache.match('index.html')||Response.error()}));return;
  }
  if(same&&url.pathname.indexOf('/assets/img/')>=0){
    /* 圖片檔名含內容雜湊，內容不會變：放在獨立的長期快取，改版也不用重新下載 */
    event.respondWith((async()=>{const cache=await caches.open(IMG_CACHE),hit=await cache.match(req);if(hit)return hit;const res=await fetch(req);if(res.ok)await cache.put(req,res.clone());return res})());return;
  }
  if(same){
    event.respondWith((async()=>{const cache=await caches.open(CACHE),hit=await cache.match(req);if(hit)return hit;const res=await fetch(req);if(res.ok)await cache.put(req,res.clone());return res})());return;
  }
  if(STATIC_HOSTS.includes(url.hostname)){
    const network=fetch(req).then(async res=>{if(res.ok||res.type==='opaque'){const cache=await caches.open(CACHE);await cache.put(req,res.clone())}return res});
    event.waitUntil(network.catch(()=>{}));
    event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(req))||network));
  }
});
