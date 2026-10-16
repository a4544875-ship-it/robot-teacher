/* 奇蹟知識島 v5.0 — versioned, atomic offline assets; Firebase stays uncached. */
const CACHE='robot-teacher-v42-test';
const CORE=["assets/v8/family.js?v=8.0.1", "assets/v8/family.css?v=8.0.1", "assets/v5/star-island.js?v=7.0.0", "assets/v5/star-island.css?v=7.0.0", "assets/v5/star-island-keyart.webp", "assets/velocity-v4.js?v=4.1.0", "assets/math-v4.js?v=4.1.0", "assets/expansion-v4.css?v=4.1.0", "assets/v4/boss-dragon.webp", "assets/v4/car-aero.webp", "assets/v4/car-nova.webp", "assets/v4/car-rally.webp", "assets/v4/cover-kart.webp", "assets/v4/cover-mbingo.webp", "assets/v4/cover-mbond.webp", "assets/v4/cover-mboss.webp", "assets/v4/cover-mcmp.webp", "assets/v4/cover-meteor.webp", "assets/v4/cover-msnake.webp", "assets/v4/cover-ttab.webp", "assets/v4/cover-v2clock.webp", "assets/v4/cover-v2fraction.webp"].concat(['./','index.html','manifest.webmanifest','castle-192.png','assets/island-v2.css','assets/english-premium-v3.css',
  ...['adventure-island','adventure-diner','adventure-tower','adventure-shoot'].map(n=>'assets/'+n+'.webp'),
  ...['cat','dog','pig','fish','bird','cow','duck','bee','egg','cake','book','bag','hat','car','ball','cup'].map(n=>'assets/word-'+n+'.webp'),
  ...['sky','kitchen','clock','moon','meadow','sound','owl','fox','robot','frog'].map(n=>'assets/'+n+'.webp')]);
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
  if(same){
    event.respondWith((async()=>{const cache=await caches.open(CACHE),hit=await cache.match(req);if(hit)return hit;const res=await fetch(req);if(res.ok)await cache.put(req,res.clone());return res})());return;
  }
  if(STATIC_HOSTS.includes(url.hostname)){
    const network=fetch(req).then(async res=>{if(res.ok||res.type==='opaque'){const cache=await caches.open(CACHE);await cache.put(req,res.clone())}return res});
    event.waitUntil(network.catch(()=>{}));
    event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(req))||network));
  }
});
