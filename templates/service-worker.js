const CACHE_NAME = "inspecao-cache-v1";
const urlsToCache = [
  "/",
  "/static/style.css", // Adicione aqui os arquivos CSS, JS e imagens necessários
  "/static/script.js",
  "/finalize",
  "/reset",
  "/submit",
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