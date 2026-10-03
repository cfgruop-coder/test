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
  rv:  { title: "Работы на высоте",                    icon: "🪜", color: "#0891b2", soft: "#e2f5fa" },
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
