const currentCache = "static-cache-v3.7";

const files = [
  "/public/",
  "/public/index.html",
  "/public/css/style.css",
  "/public/virus.html",
  "/public/images/v2.jpg",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
  "https://reqres.in/api/users"
  
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(currentCache).then((cache) => {
      return cache.addAll(files);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then((cahcesNames) =>
      Promise.all(
        cahcesNames
          .filter((cacheName) => {
            return cacheName !== currentCache;
          })
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request).then(function (response) {
        return response || caches.match("/offline.html");
      });
    })
  );
});

/*const cleanCache = (cacheName, maxSize) => {
  //recibes un máximo de caches
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((items) => {
      console.log(items.length);
      if (items.length >= maxSize) {
        //comparar si se supera el tamaño de caches
        cache
          .delete(items[0]) //eliminar el primer cache
          .then(() => {
            cleanCache(cacheName, maxSize);
          }); //revisar si no hay más caches para eliminar.
      }
    });
  });
}; */
