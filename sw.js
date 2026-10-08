/* Оффлайн-копия сайта: складываем файлы в память устройства.
   При обновлении сайта меняем номер версии ниже — тогда у людей
   подтянется свежая копия. */
const CACHE = "sfgroup-v1";

const FILES = [
  "./", "index.html", "block.html", "test.html", "blitz.html",
  "memo.html", "memo-quiz.html", "professions.html", "works.html",
  "common.css", "common.js", "manifest.json",
  "logo.png", "logo-dark.png", "favicon.svg", "icon-512.png",
  "cover-memo.png", "cover-professions.png", "cover-works.png", "cover-blitz.png",
  "icon-memo.png", "icon-professions.png", "icon-works.png", "icon-blitz.png",
  "counts.json", "tests.json",
  "q-gor.json", "q-zr.json", "q-or.json", "q-pb.json",
  "q-rv.json", "q-egs.json", "q-prr.json"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(FILES);
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  e.respondWith(caches.match(req).then(function (hit) {
    if (hit) return hit;
    return fetch(req).then(function (res) {
      const copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () { return caches.match("index.html"); });
  }));
});
