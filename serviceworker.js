
const CACHE_NAME = "V1_cache_PWA_IEVND";

urlsToCache = [
    './',
    './assets/favicon.ico',
    './assets/img/portfolio/yournal.png',
    './assets/img/portfolio/yournal-thumbnail.png',
    './assets/img/portfolio/cake.png',
    './assets/img/portfolio/smartPark.png',
    './assets/img/portfolio/smartPark-thumbnail.png',
    './assets/img/portfolio/safe.png',
    './assets/img/portfolio/submarine.png',
    './css/styles.css'
];

//Funcion de instalacion
//almacena el nombre y los archivos que van a ir guardados en cache

self.addEventListener('install', e =>{
    e.waitUntil( //le decimos que detenga el evento hasta que se ejecute lo siguiente
        caches.open(CACHE_NAME)
        .then(cache =>{
            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting)
        })

    )
})

self.addEventListener('activate', e =>{
    const listaBlancaCache = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(nombresCache => {
            return Promise.all(
                nombresCache.map(nombresCache =>{
                    if(listaBlancaCache.indexOf(nombresCache) === -1){
                        return caches.delete(nombresCache)
                    }
                })
            )
        })
        //activamos la cache actualizada
        .then(()=> self.clients.claim())
    )

})


self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res)
            {
                return res
            }
            return fetch(e.request)
        })
    )
})