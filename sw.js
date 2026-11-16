// Service worker da Casa Modelo: guarda a casa no aparelho para abrir sem internet.
// Troque VERSAO a cada atualização do 3D (o montar.js faz isso sozinho).
const VERSAO = 'casa-modelo-202611161446';
const ARQS = ['./', './index.html', './manifest.webmanifest', './icone-192.png', './icone-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Rede primeiro (pega a versão nova quando há internet); sem internet, usa a cópia guardada.
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r).then(resp => {
      if (resp.ok) { const cp = resp.clone(); caches.open(VERSAO).then(c => c.put(r, cp)); }
      return resp;
    }).catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('./index.html')))
  );
});
