let cacheName = 'restaurant_v1';
let urlsToCache = [
  './',
  './sw_registration.js',
  'index.html',
  'restaurant.html',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'css/styles.css',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

self.addEventListener('install', event => {
  console.log("[ServiceWorker] Installed")

  event.waitUntil (
    caches.open(cacheName)
    .then(cache => cache.addAll(urlsToCache))
    .then(self.skipWaiting())
  );
  console.log("[ServiceWorker] Caching cacheFiles");
});

self.addEventListener('activate', event => {
  event.waitUntil (
  caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache =>{
    if (cache!== cacheName){
      console.log("[ServiceWorker] Removing cached files from", cache);
      return caches.delete(cache);
    }
  })))
  )
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) {return response;}
			{return fetch(event.request);}
		})
	);
});
