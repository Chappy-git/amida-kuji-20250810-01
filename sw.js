const CACHE_NAME='amida-pages-v11';
const CORE=['./','./index.html','./manifest.json','./reset.html','./icons/icon-64.png','./icons/icon-128.png','./icons/icon-192.png','./icons/icon-256.png','./icons/icon-384.png','./icons/icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  const accept=req.headers.get('accept')||'';
  const isHTML = req.mode==='navigate' || accept.includes('text/html');

  if(isHTML){
    e.respondWith(fetch(req).then(res=>{
      const copy=res.clone(); caches.open(CACHE_NAME).then(c=>c.put(req,copy)).catch(()=>{});
      return res;
    }).catch(()=>caches.match(req).then(hit=>hit||caches.match('./index.html'))));
    return;
  }

  e.respondWith(caches.match(req).then(hit=> hit || fetch(req).then(res=>{
    const copy=res.clone(); caches.open(CACHE_NAME).then(c=>c.put(req,copy)).catch(()=>{});
    return res;
  })));
});