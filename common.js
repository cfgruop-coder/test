// ============================================================
//  common.js — общие данные и функции для всех страниц сайта.
//  Подключён на index.html, block.html и test.html.
//  Правим только здесь, чтобы страницы не разъехались.
// ============================================================

// ---------- блоки: название, иконка, цвет ----------
const BLOCKS = {
  gor: { title: "Газоопасные работы",                  icon: "💨", color: "#d97706", soft: "#fdf1e0" },
  or:  { title: "Огневые работы",                      icon: "🔥", color: "#ea580c", soft: "#feece3" },
  prr: { title: "Погрузо-разгрузочные работы",         icon: "📦", color: "#2563eb", soft: "#e8f0fe" },
  pb:  { title: "Пожарная безопасность",               icon: "🧯", color: "#dc2626", soft: "#fdeaea" },
  rv:  { title: "Работы на высоте",                    icon: "🧗", color: "#0891b2", soft: "#e2f5fa" },
  egs: { title: "Электросварочные и газосварочные работы", icon: "⚡", color: "#7c3aed", soft: "#f1eafe" },
  zr:  { title: "Земляные работы",                     icon: "🚜", color: "#65a30d", soft: "#eef7dd" }
};

// Названия тем по ключу (для таблиц результатов)
const TOPIC_NAMES = Object.keys(BLOCKS).reduce(function (acc, key) {
  acc[key] = BLOCKS[key].title;
  return acc;
}, {});

function blockInfo(topic) {
  return BLOCKS[topic] || { title: topic, icon: "📋", color: "#1f6feb", soft: "#eaf1fe" };
}

// ---------- иконки профессий: рабочий в каске ----------
// Взята открытая иконка эмодзи 👷 из набора Twemoji (github.com/twitter/twemoji,
// лицензия CC-BY 4.0). Изменены ТОЛЬКО цвета каски — купол и рёбра;
// лицо, жилет, полосы и руки оставлены как в оригинале.

// значки профессий: обычные эмодзи системы, авторство указывать не нужно
const PROFESSION_ICONS = {
  svar: "\u{1F6E0}\uFE0F",     // электрогазосварщик — инструмент
  master: "\u{1F4CB}",          // мастер СМР — план работ
  excavator: "\u{1F69C}",       // машинист тяжёлой техники
  crane: "\u{1F3D7}\uFE0F",    // машинист автокрана
  kmu: "\u{1F69B}"              // машинист КМУ
};

function workerIcon(kind) {
  return PROFESSION_ICONS[kind] || "\u{1F477}";
}

// ---------- иконки интерфейса ----------
// Свои фигуры вместо эмодзи: эмодзи рисует шрифт системы, и на телефоне
// и на компьютере они выглядят по-разному. Цвет берётся из текста (currentColor),
// поэтому в тёмной теме иконки автоматически становятся светлыми.
// Второй элемент каждой пары: true — «вырез» внутри фигуры.

const UI_ICONS = {
  helmet: [["M6.2 12 c0 -3.2 2.6 -5.8 5.8 -5.8 s5.8 2.6 5.8 5.8 z", false], ["M3.6 12 h16.8 v2.3 H3.6 z", false], ["M10.9 3.4 h2.2 v8.2 h-2.2 z", false]],
  clipboard: [["M5 4.4 h14 v17 H5 z", false], ["M9.4 2.4 h5.2 v3.4 H9.4 z", true], ["M7.9 9.2 h8.2 v1.8 H7.9 z", true], ["M7.9 12.8 h8.2 v1.8 H7.9 z", true], ["M7.9 16.4 h5.2 v1.8 H7.9 z", true]],
  bolt: [["M13.6 2 L4.8 13.6 h5.7 L8.3 22 L19.2 10.3 h-5.7 z", false]],
  home: [["M12 2.6 L22.4 12 h-3.2 v9.4 h-4.6 v-6.2 h-5.2 v6.2 H4.8 V12 H1.6 z", false]],
  printer: [["M3.6 9.4 h16.8 v7.8 H3.6 z", false], ["M6.6 2.8 h10.8 v6.6 H6.6 z", false], ["M7.6 16.6 h8.8 v4.6 H7.6 z", false], ["M8.6 11.4 h6.8 v1.7 H8.6 z", true], ["M17.4 12.2 h1.6 v1.6 h-1.6 z", true]],
  list: [["M3.4 4.6 h3.2 v3.2 H3.4 z", false], ["M8.6 4.6 h12 v3.2 h-12 z", false], ["M3.4 10.4 h3.2 v3.2 H3.4 z", false], ["M8.6 10.4 h12 v3.2 h-12 z", false], ["M3.4 16.2 h3.2 v3.2 H3.4 z", false], ["M8.6 16.2 h12 v3.2 h-12 z", false]],
  check: [["M9.6 17.6 L3.8 11.8 l2.2 -2.2 3.6 3.6 L18 4.4 l2.2 2.2 z", false]],
  cross: [["M18.4 7.2 L16.8 5.6 12 10.4 7.2 5.6 5.6 7.2 10.4 12 5.6 16.8 7.2 18.4 12 13.6 16.8 18.4 18.4 16.8 13.6 12 z", false]],
  plus: [["M10.9 4.6 h2.2 v6.3 h6.3 v2.2 h-6.3 v6.3 h-2.2 v-6.3 H4.6 v-2.2 h6.3 z", false]],
  dice: [["M4 4 h16 v16 H4 z", false], ["M7.2 7.2 h2.4 v2.4 H7.2 z", true], ["M14.4 7.2 h2.4 v2.4 h-2.4 z", true], ["M10.8 10.8 h2.4 v2.4 h-2.4 z", true], ["M7.2 14.4 h2.4 v2.4 H7.2 z", true], ["M14.4 14.4 h2.4 v2.4 h-2.4 z", true]],
  download: [["M10.8 3h2.4v6.4h3.6L12 15.2 7.2 9.4h3.6z", false], ["M4.6 17.6h14.8V20H4.6z", false]],
  sun: [["M16.60 12.00 C16.60 13.99 15.32 15.76 13.42 16.37 C11.53 16.99 9.45 16.32 8.28 14.70 C7.11 13.09 7.11 10.91 8.28 9.30 C9.45 7.68 11.53 7.01 13.42 7.63 C15.32 8.24 16.60 10.01 16.60 12.00 Z", false], ["M10.9 1.4 h2.2 v3.8 h-2.2 z", false], ["M10.9 18.8 h2.2 v3.8 h-2.2 z", false], ["M1.4 10.9 h3.8 v2.2 H1.4 z", false], ["M18.8 10.9 h3.8 v2.2 h-3.8 z", false], ["M3.8 5.5 l1.7 -1.7 2.7 2.7 -1.7 1.7 z", false], ["M15.8 17.5 l1.7 -1.7 2.7 2.7 -1.7 1.7 z", false], ["M18.5 3.8 l1.7 1.7 -2.7 2.7 -1.7 -1.7 z", false], ["M6.5 15.8 l1.7 1.7 -2.7 2.7 -1.7 -1.7 z", false]],
  moon: [["M20.60 12.00 C20.60 15.73 18.20 19.03 14.66 20.18 C11.11 21.33 7.23 20.07 5.04 17.05 C2.85 14.04 2.85 9.96 5.04 6.95 C7.23 3.93 11.11 2.67 14.66 3.82 C18.20 4.97 20.60 8.27 20.60 12.00 Z", false], ["M23.20 10.40 C23.20 13.78 21.02 16.77 17.81 17.82 C14.60 18.86 11.08 17.72 9.09 14.98 C7.10 12.25 7.10 8.55 9.09 5.82 C11.08 3.08 14.60 1.94 17.81 2.98 C21.02 4.03 23.20 7.02 23.20 10.40 Z", true]],
  // первая помощь: щит с крестом (выбор заказчика)
  aid: [["M12 2.6 L20.4 6 v7.2 c0 5 -4.6 8.6 -8.4 10.2 C8.2 21.8 3.6 18.2 3.6 13.2 V6 z", false], ["M10.7 7.6 h2.6 v3.8 h3.8 v2.6 h-3.8 v3.8 h-2.6 v-3.8 H6.9 v-2.6 h3.8 z", true]]
};

function uiIcon(name, size) {
  const shapes = UI_ICONS[name];
  if (!shapes) return "";

  const side = size || 18;
  const solids = shapes.filter(function (s) { return !s[1]; }).map(function (s) { return s[0]; });
  const holes = shapes.filter(function (s) { return s[1]; }).map(function (s) { return s[0]; });

  let inner = "";
  if (holes.length && solids.length) {
    inner += '<path fill="currentColor" fill-rule="evenodd" d="' +
             holes.concat([solids[0]]).join(" ") + '"/>';
    solids.shift();
  }
  solids.forEach(function (d) {
    inner += '<path fill="currentColor" d="' + d + '"/>';
  });

  return '<svg viewBox="0 0 24 24" width="' + side + '" height="' + side +
         '" aria-hidden="true" focusable="false">' + inner + "</svg>";
}

// ---------- тема оформления ----------
// Светлая и тёмная. Выбор хранится в браузере; если человек ещё не выбирал,
// берём настройку системы.

const THEME_KEY = "theme.v1";

function currentTheme() {
  const saved = document.documentElement.getAttribute("data-theme");
  return saved === "dark" ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // приватный режим — просто не запоминаем
  }
  paintThemeButton();
}

function paintThemeButton() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const dark = currentTheme() === "dark";
  btn.innerHTML = uiIcon(dark ? "sun" : "moon", 18);
  btn.title = dark ? "Светлая тема" : "Тёмная тема";
  btn.setAttribute("aria-label", btn.title);
}

function initTheme() {
  const header = document.querySelector(".site-header__inner");
  if (!header || document.getElementById("themeToggle")) {
    paintThemeButton();
    return;
  }

  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "themeToggle";
  btn.className = "theme-toggle";
  btn.addEventListener("click", function () {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  });

  header.appendChild(btn);
  paintThemeButton();
}

// ---------- последний открытый билет (для кнопки «Продолжить») ----------

const LAST_KEY = "lastVisit.v1";

function saveLastVisit(href, title) {
  try {
    localStorage.setItem(LAST_KEY, JSON.stringify({ href: href, title: title, at: Date.now() }));
  } catch (e) {
    // игнорируем
  }
}

function loadLastVisit() {
  try {
    const raw = localStorage.getItem(LAST_KEY);
    const data = raw ? JSON.parse(raw) : null;
    return data && data.href && data.title ? data : null;
  } catch (e) {
    return null;
  }
}

function clearLastVisit() {
  try {
    localStorage.removeItem(LAST_KEY);
  } catch (e) {
    // игнорируем
  }
}

// ---------- утилиты ----------

// Загрузка JSON с проверкой свежести: браузер каждый раз спрашивает сервер,
// изменился ли файл. Не изменился — приходит «304» и копия из кеша (почти без
// трафика), изменился — новая версия. Так правки видны без Ctrl+Shift+R.
function fetchJson(url) {
  return fetch(url, { cache: "no-cache" }).then(function (response) {
    if (!response.ok) throw new Error("Не найден " + url);
    return response.json();
  });
}

// Экранирование текста перед вставкой в HTML
function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
  });
}

// Ключ вопроса для сравнения формулировок:
// без регистра, «ё», уточнений в скобках и знаков препинания
function questionKey(text) {
  return String(text == null ? "" : text)
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\(возможн[^)]*\)/g, " ")
    .replace(/[^0-9a-zа-я]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Перемешивание массива (исходный не меняется)
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Случайная выборка без повторов одной и той же формулировки.
// used — накопитель, общий на весь тест: в банке есть вопросы с одинаковым
// текстом (варианты одного вопроса из исходной таблицы), дублировать их нельзя.
function pickUnique(pool, count, used) {
  const picked = [];

  shuffle(pool).forEach(function (q) {
    if (picked.length >= count) return;
    const key = questionKey(q.question);
    if (used[key]) return;
    used[key] = true;
    picked.push(q);
  });

  return picked;
}

// Делит вопросы блока на билеты по ~size вопросов.
// Билеты идут подряд, не пересекаются и вместе покрывают ВСЕ вопросы блока.
// Размеры отличаются не больше чем на 1 вопрос.
function splitIntoTickets(total, size) {
  const tickets = [];
  const n = Number(total) || 0;
  if (n <= 0) return tickets;

  const step = Math.max(1, Number(size) || 20);
  const count = Math.ceil(n / step);
  const base = Math.floor(n / count);
  const rest = n % count;

  let offset = 0;
  for (let i = 0; i < count; i++) {
    const questions = base + (i < rest ? 1 : 0);
    tickets.push({ number: i + 1, offset: offset, count: questions });
    offset += questions;
  }
  return tickets;
}

// «18 вопросов», «1 вопрос», «2 вопроса»
function plural(count, one, few, many) {
  const n10 = count % 10;
  const n100 = count % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
  return many;
}

function questionsWord(count) {
  return count + " " + plural(count, "вопрос", "вопроса", "вопросов");
}

function ticketsWord(count) {
  return count + " " + plural(count, "билет", "билета", "билетов");
}

// ---------- результаты билетов (хранятся в браузере) ----------
// Ключ: "id блока:номер билета", хранится лучший результат.

const RESULTS_KEY = "testResults.v1";

function ticketResultKey(testId, ticketNumber) {
  return testId + ":" + ticketNumber;
}

function loadResults() {
  try {
    return JSON.parse(localStorage.getItem(RESULTS_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function getTicketResult(testId, ticketNumber) {
  return loadResults()[ticketResultKey(testId, ticketNumber)] || null;
}

// Сохраняем результат, если он лучше прежнего (по проценту, затем по числу верных)
function saveTicketResult(testId, ticketNumber, correct, total) {
  const percent = total ? Math.round(correct / total * 100) : 0;
  const results = loadResults();
  const key = ticketResultKey(testId, ticketNumber);
  const prev = results[key];

  const better = !prev || percent > prev.percent ||
    (percent === prev.percent && correct > prev.correct);

  if (!better) return;

  results[key] = { correct: correct, total: total, percent: percent, at: Date.now() };
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  } catch (e) {
    // приватный режим браузера — просто не запоминаем
  }
}

// ---------- сброс отметок (когда тесты проходят на общем компьютере) ----------

function hasAnyResults() {
  return Object.keys(loadResults()).length > 0;
}

function hasBlockResults(testId) {
  return Object.keys(loadResults()).some(function (key) {
    return key.indexOf(testId + ":") === 0;
  });
}

function clearAllResults() {
  try {
    localStorage.removeItem(RESULTS_KEY);
  } catch (e) {
    // ничего не поделать — просто не запоминаем
  }
}

function clearBlockResults(testId) {
  const results = loadResults();
  const prefix = testId + ":";
  let changed = false;

  Object.keys(results).forEach(function (key) {
    if (key.indexOf(prefix) === 0) {
      delete results[key];
      changed = true;
    }
  });

  if (!changed) return;
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  } catch (e) {
    // игнорируем
  }
}

// ---------- иконки прямо в разметке ----------
// элемент с data-icon="home" заполняется своей иконкой при загрузке страницы,
// поэтому в HTML не нужно держать эмодзи

function fillIcons(root) {
  (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
    el.innerHTML = uiIcon(el.dataset.icon, parseInt(el.dataset.size, 10) || 18);
  });
}

// при загрузке любой страницы: ставим кнопку темы и подставляем иконки
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    fillIcons();
  });
} else {
  initTheme();
  fillIcons();
}

// ---------- приложение на телефон: оффлайн-режим ----------

let installPrompt = null;

function initInstall() {
  // служебный файл сохраняет сайт в память устройства
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }

  const header = document.querySelector(".site-header__inner");
  if (!header || document.getElementById("installApp")) return;

  const standalone = window.matchMedia("(display-mode: standalone)").matches ||
                     window.navigator.standalone === true;
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "installApp";
  btn.className = "theme-toggle install-btn";
  btn.innerHTML = uiIcon("download", 18);
  btn.title = "Установить приложение";
  btn.setAttribute("aria-label", btn.title);
  btn.hidden = true;

  btn.addEventListener("click", function () {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(function () {
        installPrompt = null;
        btn.hidden = true;
      });
      return;
    }
    alert("На айфоне приложение ставится так:\n\n«Поделиться» → «На экран Домой»");
  });

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();          // окно само не показываем — только по кнопке
    installPrompt = e;
    if (!standalone) btn.hidden = false;
  });

  window.addEventListener("appinstalled", function () { btn.hidden = true; });

  // на айфоне системного окна нет — показываем кнопку с подсказкой
  if (isiOS && !standalone) btn.hidden = false;

  header.appendChild(btn);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initInstall);
} else {
  initInstall();
}
