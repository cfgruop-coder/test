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

const WORKER_SVG = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="26" height="26"><path fill="#F2760F" d="M32.043 36L32 35c0-4-2.957-7-7.957-7h-12C7.043 28 4 31 4 35l.043 1h28z"/><path fill="#FFF75F" d="M9 28.298V36h3v-8c-1.103 0-2.102.103-3 .298zM24 28v8h3v-7.702c-.898-.195-1.897-.298-3-.298z"/><path fill="#292F33" d="M13 27h10v4H13z"/><path fill="#292F33" d="M14 27h8s-1.018 7-4 7-4-7-4-7"/><path fill="#FFDC5D" d="M13.64 30.038c1.745 1.268 2.849 1.963 4.36 1.963s2.615-.696 4.359-1.963v-5.749h-8.72v5.749z"/><path fill="#F9CA55" d="M13.632 25.973c1.216 1.374 2.724 1.746 4.364 1.746 1.639 0 3.146-.373 4.363-1.746v-3.491h-8.728v3.491z"/><path fill="#FFAC33" d="M21.513 4.15c-1.881-.608-6.306-.443-7.412.996-2.876.055-6.25 2.654-6.693 6.084-.438 3.394.538 4.97.885 7.523.393 2.892 2.019 3.817 3.319 4.204 1.87 2.47 3.858 2.365 7.195 2.365 6.518 0 9.622-4.361 9.896-11.768.167-4.481-2.462-7.874-7.19-9.404z"/><path fill="#FFDC5D" d="M25.24 13.87c-.631-.873-1.438-1.576-3.208-1.825.664.304 1.3 1.355 1.383 1.936.083.581.166 1.051-.359.47-2.105-2.327-4.397-1.411-6.669-2.832-1.587-.993-2.07-2.091-2.07-2.091s-.194 1.466-2.6 2.959c-.697.433-1.53 1.397-1.991 2.821-.332 1.023-.229 1.936-.229 3.496 0 4.553 3.752 8.38 8.38 8.38s8.38-3.861 8.38-8.38c-.001-2.833-.297-3.939-1.017-4.934z"/><path fill="#C1694F" d="M18.807 21.131h-1.862c-.257 0-.466-.208-.466-.466s.208-.466.466-.466h1.862c.257 0 .466.208.466.466s-.208.466-.466.466zM18 24.467c-2.754 0-3.6-.705-3.74-.848-.257-.256-.257-.671 0-.927.248-.248.644-.255.902-.023.051.037.721.487 2.838.487 2.201 0 2.836-.485 2.842-.49.256-.255.658-.243.914.015.256.256.242.683-.014.938-.142.143-.988.848-3.742.848"/><path fill="#662113" d="M14.152 17.872c-.514 0-.931-.417-.931-.931v-.931c0-.514.417-.931.931-.931s.931.417.931.931v.931c0 .514-.417.931-.931.931zm7.449 0c-.514 0-.931-.417-.931-.931v-.931c0-.514.417-.931.931-.931s.931.417.931.931v.931c0 .514-.417.931-.931.931z"/><path fill="#292F33" d="M19 34.938l-1 1.061-1-1v-3h2z"/><path fill="#55ACEE" d="M11 28c0 1 1 3 3 5 1.582 1.581 4 3 4 3 0-3.063-1-4-2-5s-3-2-3-4c0-1-2 1-2 1m14 0c0 1-1 3-3 5-1.58 1.581-4 3-4 3 0-3.063 1-4 2-5s3-2 3-4c0-1 2 1 2 1"/><path fill="__DOME__" d="M30 11c-3-2-1.008-4.169-3-7-1.873-2.663-5-4-9.002-4C13 0 10.874 1.337 9 4c-1.992 2.831 0 5-3 7-1.861 1.24 6 2.313 12 2.313S31.861 12.24 30 11"/><path fill="__RIBS__" d="M16 11.5V.088c-.35.032-.683.074-1 .124v10.281c-2.09-.05-5.124-.396-7.653-.853-.174.297-.41.59-.73.877 2.91.566 6.596.983 8.883.983h.5zm12.855-1.553c-2.853.304-5.839.517-7.855.549V.292c-.323-.066-.66-.112-1-.155V11.5h.5c2.018 0 5.796-.261 9.289-.657-.402-.295-.708-.593-.934-.896z"/></svg>';

// Цвета каски: купол и рёбра (рёбра темнее — как в оригинале)
const HELMET_COLORS = {
  orange: { dome: "#FF8A1F", ribs: "#D35400" },   // ярко-оранжевая
  white:  { dome: "#FFFFFF", ribs: "#C9D4E0" },   // белая
  blue:   { dome: "#3B82F6", ribs: "#1D4ED8" }    // синяя
};

// Какой цвет каски у какого теста (ключ — id теста из tests.json)
const PROFESSION_HELMETS = {
  svar: "orange",       // Электрогазосварщик
  master: "white",      // Мастер СМР
  excavator: "blue",    // Машинист экскаватора
  crane: "blue",        // Машинист Автокрана/АГП
  kmu: "blue"           // Машинист КМУ
};

function workerIcon(kind) {
  const c = HELMET_COLORS[kind] || HELMET_COLORS.blue;
  return WORKER_SVG.replace(/__DOME__/g, c.dome).replace(/__RIBS__/g, c.ribs);
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
