const CACHE_NAME = "inspecao-cache-v2"; // Atualize a versão ao mudar arquivos!
const urlsToCache = [
  "/", // Página inicial
  "/static/manifest.json", // Manifesto do PWA
  "/static/service-worker.js", // Service Worker
  "/static/icons/icon-192x192.png", // Ícone
  "/static/icons/icon-512x512.png", // Ícone
  "/static/leia-me.html", // Corrija o caminho se necessário
  "/static/catalogo-defeitos.pdf", // Certifique-se que está acessível
  "/static/catalogo.json", // Adicione o catálogo para funcionar offline
  "/static/index.html",
  "/static/xlsx.full.min.js", // Use o arquivo local
];

// Instala o Service Worker e armazena os arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepta as requisições e serve os arquivos do cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza o cache quando uma nova versão do Service Worker é ativada
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});