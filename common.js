// ============================================================
//  common.js — общие функции для всех страниц сайта.
//  Подключён на index.html, block.html и test.html.
//  Правим только здесь, чтобы страницы не разъехались.
// ============================================================

// Названия блоков (ключ — как в questions.json)
const TOPIC_NAMES = {
  gor: "Газоопасные работы",
  zr:  "Земляные работы",
  or:  "Огневые работы",
  pb:  "Пожарная безопасность",
  rv:  "Работы на высоте",
  egs: "Электросварочные и газосварочные работы",
  prr: "Погрузо-разгрузочные работы"
};

// Делит вопросы блока на билеты по ~size вопросов.
// Билеты идут подряд, не пересекаются и вместе покрывают ВСЕ вопросы блока.
// Размеры билетов отличаются не больше чем на 1 вопрос.
// Если ровно поделить нельзя (например, 53 вопроса), разница уходит в последние билеты.
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

// Русские склонения: plural(3, "вопрос", "вопроса", "вопросов")
function plural(count, one, few, many) {
  const n10 = count % 10;
  const n100 = count % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
  return many;
}

// «18 вопросов», «1 вопрос», «2 вопроса»
function questionsWord(count) {
  return count + " " + plural(count, "вопрос", "вопроса", "вопросов");
}

// «6 билетов», «1 билет», «2 билета»
function ticketsWord(count) {
  return count + " " + plural(count, "билет", "билета", "билетов");
}
