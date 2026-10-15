/* 奇蹟知識島 v3.0 — versioned, atomic offline assets; Firebase stays uncached. */
const CACHE='robot-teacher-v33';
const CORE=['./','index.html','manifest.webmanifest','castle-192.png','assets/island-v2.css','assets/english-premium-v3.css',
  ...['adventure-island','adventure-diner','adventure-tower','adventure-shoot'].map(n=>'assets/'+n+'.webp'),
  ...['cat','dog','pig','fish','bird','cow','duck','bee','egg','cake','book','bag','hat','car','ball','cup'].map(n=>'assets/word-'+n+'.webp'),
  ...['sky','kitchen','clock','moon','meadow','sound','owl','fox','robot','frog'].map(n=>'assets/'+n+'.webp')];
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
