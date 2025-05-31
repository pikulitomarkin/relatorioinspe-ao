const CACHE_NAME = "inspecao-cache-v1";
const urlsToCache = [
  "/",
  "/static/style.css", // Adicione aqui os arquivos CSS
  "/static/script.js", // Adicione aqui os arquivos JS
  "/static/manifest.json",
  "/static/icons/icon-192x192.png",
  "/static/icons/icon-512x512.png"
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