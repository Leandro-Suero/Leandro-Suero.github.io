const staticCacheName = "site-static-v1"; //update versioning to apply changes on cached assets
const dynamicCacheName = "site-dinamic-v1"; //to store the navigated assets
const assets = [
  "/",
  "/index.html",
  "/fallback.html",
  "/js/animations.js",
  "/js/main.js",
  "/output.css",
  "/favicon.ico",
  "/manifest.json",
  "https://use.fontawesome.com/releases/v5.3.1/css/all.css",
  "https://use.fontawesome.com/releases/v5.3.1/webfonts/fa-brands-400.woff2",
  "https://use.fontawesome.com/releases/v5.3.1/webfonts/fa-solid-900.woff2",
  "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700",
  "https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2",
  "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlxdu3cOWxw.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/ScrollTrigger.min.js",
  "/img/bg-frameworks.jpeg",
  "/img/bg-other.jpeg",
  "/img/bg-programming.jpeg",
  "/img/Moviseries.png",
  "/img/hello.png",
  "/img/pwa192.png",
  "/img/pwa512.png",
];

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.lenght > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

//install service worker
self.addEventListener("install", (evt) => {
  console.log("service worker has been installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching assets");
      return cache.addAll(assets);
    })
  );
});

//activate service worker
self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated");
  evt.waitUntil(
    caches.keys().then((keys) => {
      // console.log("keys", keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key != dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

//fetch event
self.addEventListener("fetch", (evt) => {
  //console.log("fetch event", evt);
  //urls with the protocol/request scheme chrome-extension:// are not allowed in service worker
  if (evt.request.url.indexOf("http") === 0) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then((cacheRes) => {
          // console.log("cache", cacheRes);
          return (
            cacheRes ||
            fetch(evt.request).then((fetchRes) => {
              return caches
                .open(dynamicCacheName)
                .then((cache) => {
                  cache.put(evt.request.url, fetchRes.clone());
                  limitCacheSize(dynamicCacheName, 50);
                  return fetchRes;
                })
                .catch((error) => {
                  console.error(
                    "There has been a problem with your fetch operation:",
                    error
                  );
                });
            })
          );
        })
        .catch(() => {
          if (evt.request.url.indexOf(".html") > -1) {
            return caches.match("/fallback.html"); //default if no conection
          }
        })
    );
  }
});
