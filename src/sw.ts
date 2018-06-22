import { FetchEvent } from './interface'
import { execute } from './api'

var CACHE_KEY = 'my-app-cache-v1';
const EXCEPTS = ['/sw.js', '/server-sent-bit']
const CACHES = ['/', '/index.html', '/manifest.json', '/favicon.ico', '/bundle.js', '/css/bundle.css']

self.addEventListener('install', function (event: FetchEvent) {
    event.waitUntil(Promise.all([
        caches.open(CACHE_KEY).then(cache => cache.addAll(CACHES)),
        self['skipWaiting']()
    ]))
})
self.addEventListener('activate', function (event: FetchEvent) {
    event.waitUntil(Promise.all([
        self['clients'].claim(),
        caches.keys().then(names => Promise.all(names.map(n => {
            if (n !== CACHE_KEY) {
                return caches.delete(n)
            }
        })))
    ]))
})
self.addEventListener('fetch', function (event: FetchEvent) {
    const { url } = event.request
    // EXCEPTS
    for(let i = 0; i < EXCEPTS.length; i++) {
        if (url.indexOf(EXCEPTS[i]) !== -1) {
            return;
        }
    }

    event.respondWith(caches.match(event.request).then(res => res || execute(event).then(r => r || fetch(event.request.clone()).then(function (resp) {
        if (!resp || resp.status !== 200) {
            return resp
        }
        caches.open(CACHE_KEY).then(cache => cache.put(event.request, resp.clone()))
    }))))

})
