const staticCacheName = "site-static-v1"; //update versioning to apply changes on cached assets
const dynamicCacheName = "site-dinamic-v1"; //to store the navigated assets
const assets = [
  "/",
  "/index.html",
  "/fallback.html",
  "/js/animations.js",
  "/js/main.js",
  "/output.css",
  "https://use.fontawesome.com/releases/v5.3.1/css/all.css",
  "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/ScrollTrigger.min.js",
  "/img/bg-frameworks.jpeg",
  "/img/bg-other.jpeg",
  "/img/bg-programming.jpeg",
  "/img/Moviseries.png",
  "/img/hello.png",
  "https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white",
  "https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white",
  "https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
  "https://img.shields.io/badge/php-%23777BB4.svg?&style=for-the-badge&logo=php&logoColor=white",
  "https://img.shields.io/badge/mysql-%2300f.svg?&style=for-the-badge&logo=mysql&logoColor=white",
  "https://img.shields.io/badge/java-%23ED8B00.svg?&style=for-the-badge&logo=java&logoColor=white",
  "https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB",
  "https://img.shields.io/badge/redux%20-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white",
  "https://img.shields.io/badge/laravel%20-%23FF2D20.svg?&style=for-the-badge&logo=laravel&logoColor=white",
  "https://img.shields.io/badge/jquery%20-%230769AD.svg?&style=for-the-badge&logo=jquery&logoColor=white",
  "https://img.shields.io/badge/tailwindcss%20-%2338B2AC.svg?&style=for-the-badge&logo=tailwind-css&logoColor=white",
  "https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white",
  "https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white",
  "https://img.shields.io/badge/linux%20-%23FFCF1E.svg?&style=for-the-badge&logo=linux&logoColor=black",
  "https://img.shields.io/badge/npm%20-%23CC3534.svg?&style=for-the-badge&logo=npm&logoColor=white",
  "https://img.shields.io/badge/API-REST%20-%2338B2AC.svg?&style=for-the-badge&logo=database&logoColor=white",
  "https://img.shields.io/badge/SASS%20-hotpink.svg?&style=for-the-badge&logo=SASS&logoColor=white",
  "https://img.shields.io/badge/react-testinglibrary%20-%2361DAFB.svg?&style=for-the-badge&logo=react&logoColor=white",
];

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys.then((keys) => {
      if (keys.lenght > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

//install service worker
self.addEventListener("install", (evt) => {
  console.log("service worker has been installed");
  caches.open(staticCacheName).then((cache) => {
    console.log("caching assets");
    cache.addAll(assets);
  });
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
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        //console.log("cache", cacheRes);
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              limitCacheSize(dynamicCacheName, 50);
              return fetchRes;
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
});
