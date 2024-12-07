const CACHE_NAME = 1;
const FILES_TO_CACHE = [
    "/",
	"/main.js",
	"/css/style.css",
	"/favicon/favicon_256x256.webp",
	"/favicon/favicon_128x128.webp",
	"/favicon/favicon_64x64.webp",
	"/icon/icon_512x512.webp",
	"/icon/icon_256x256.webp",
	"/icon/icon_128x128.webp",
	"/icon/icon_64x64.webp"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files');
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
    );
});
