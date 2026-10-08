/* Оффлайн-копия сайта: складываем файлы в память устройства.
   При обновлении сайта меняем номер версии ниже — тогда у людей
   подтянется свежая копия. */
const CACHE = "sfgroup-v2";

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
    // каждый файл кладём отдельно: если один не найдётся, остальные сохранятся
    return Promise.all(FILES.map(function (f) {
      return c.add(f).catch(function () {});
    }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

/* Сначала сеть — сайт всегда свежий, когда есть интернет.
   Нет интернета — отдаём копию из памяти. Поиск идёт без учёта параметров
   адреса, поэтому test.html?prof=... и common.css?v=9 находят свои файлы. */
self.addEventListener("fetch", function (e) {
  const req = e.request;
  let url;
  try {
    url = new URL(req.url);
  } catch (err) {
    return;
  }
  if (req.method !== "GET" || url.origin !== location.origin) return;

  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        if (hit) return hit;
        return caches.match("index.html");
      });
    })
  );
});
