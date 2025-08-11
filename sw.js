const CACHE_NAME='amida-pages-v8';
const CORE=['./','./index.html','./manifest.json','./icons/icon-64.png','./icons/icon-128.png','./icons/icon-192.png','./icons/icon-256.png','./icons/icon-384.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)));self.skipWaiting());});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>res).catch(()=>{if(e.request.mode==='navigate'||(e.request.headers.get('accept')||'').includes('text/html')){return caches.match('./index.html');}})));});