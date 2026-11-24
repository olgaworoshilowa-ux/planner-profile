const screens = ["settings", "billing", "usage", "profile", "integrations", "community", "school"];
let rangeIndex = 0;
let monthOffset = 0;
const ranges = ["Oct 30 – Nov 5", "Nov 6 – Nov 12", "Nov 13 – Nov 19"];

const notifyRows = [
  ["Your work is ready", "Renders, panoramas, walkthroughs, and Copilot tasks", true],
  ["Mentions and replies", "When someone @mentions you or replies to you", true],
  ["Shared projects", "When someone shares, joins, or edits a project with you", true],
  ["News from Planner 5D", "New features, offers, and events, in the app and by email", true],
];

const visibilityRows = [
  ["projects", "Projects", "", true],
  ["battle", "Design battle entries", "", false],
  ["work", "Open to work badge", "Shows clients you take new projects", true, true],
  ["certs", "Certificates", "Completed courses from the design school", false],
];

function toggleButton(on, label, bind) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "toggle";
  btn.setAttribute("aria-pressed", on ? "true" : "false");
  btn.setAttribute("aria-label", label);
  if (bind) btn.dataset.bind = bind;
  const img = document.createElement("img");
  img.alt = "";
  img.src = on ? "assets/toggle-on.svg" : "assets/toggle-off.svg";
  btn.appendChild(img);
  return btn;
}

function fillRows(host, rows) {
  rows.forEach(([key, title, text, on, pro]) => {
    const row = document.createElement("div");
    row.className = "row" + (text ? " row-top" : "");
    const stack = document.createElement("div");
    stack.className = "stack";
    const h = document.createElement("h3");
    h.textContent = title;
    if (pro) {
      const badge = document.createElement("span");
      badge.className = "pro";
      badge.textContent = "Pro";
      h.appendChild(badge);
    }
    stack.appendChild(h);
    if (text) {
      const p = document.createElement("p");
      p.className = "fine";
      p.textContent = text;
      stack.appendChild(p);
    }
    row.appendChild(stack);
    row.appendChild(toggleButton(on, title, key));
    host.appendChild(row);
  });
}

fillRows(document.getElementById("notify-card"), notifyRows.map((r) => [null, r[0], r[1], r[2]]));
fillRows(document.getElementById("visibility"), visibilityRows);

const prefCopy = {
  en: {
    "page-settings": "Settings",
    "nav-general": "General",
    "nav-settings": "Settings",
    "nav-billing": "Billing",
    "nav-usage": "Usage",
    "nav-integrations": "Integrations",
    "nav-social": "Social",
    "nav-profile": "Public profile",
    "nav-community": "Community",
    "nav-learn": "Learn",
    "nav-school": "Design school",
    prefs: "Preferences",
    lang: "Language",
    "lang-hint": "The language used in Planner 5D",
    look: "Appearance",
    "look-hint": "Light or dark",
    light: "Light",
    dark: "Dark",
    security: "Security and sign-in",
    email: "Email",
    sessions: "Active sessions",
    "sessions-hint": "You are signed in on 2 devices",
    signout: "Sign out on other devices"
  },
  ru: {
    "page-settings": "Настройки",
    "nav-general": "Общее",
    "nav-settings": "Настройки",
    "nav-billing": "Оплата",
    "nav-usage": "Расход",
    "nav-integrations": "Интеграции",
    "nav-social": "Социальное",
    "nav-profile": "Публичный профиль",
    "nav-community": "Сообщество",
    "nav-learn": "Обучение",
    "nav-school": "Design school",
    prefs: "Предпочтения",
    lang: "Язык",
    "lang-hint": "Язык в Planner 5D",
    look: "Оформление",
    "look-hint": "Светлая или тёмная тема",
    light: "Светлая",
    dark: "Тёмная",
    security: "Безопасность и вход",
    email: "Почта",
    sessions: "Активные сессии",
    "sessions-hint": "Вы вошли на 2 устройствах",
    signout: "Выйти на других устройствах"
  },
  es: {
    "page-settings": "Ajustes",
    "nav-general": "General",
    "nav-settings": "Ajustes",
    "nav-billing": "Facturación",
    "nav-usage": "Uso",
    "nav-integrations": "Integraciones",
    "nav-social": "Social",
    "nav-profile": "Perfil público",
    "nav-community": "Comunidad",
    "nav-learn": "Aprender",
    "nav-school": "Design school",
    prefs: "Preferencias",
    lang: "Idioma",
    "lang-hint": "El idioma de Planner 5D",
    look: "Apariencia",
    "look-hint": "Claro u oscuro",
    light: "Claro",
    dark: "Oscuro",
    security: "Seguridad e inicio de sesión",
    email: "Correo",
    sessions: "Sesiones activas",
    "sessions-hint": "Has iniciado sesión en 2 dispositivos",
    signout: "Cerrar sesión en otros dispositivos"
  }
};

function applyLanguage(lang) {
  if (!prefCopy[lang]) lang = "en";
  const copy = prefCopy[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const text = copy[node.dataset.i18n];
    if (text) node.textContent = text;
  });
  const select = document.getElementById("pref-lang");
  if (select && select.value !== lang) select.value = lang;
  try { localStorage.setItem("planner-lang", lang); } catch (error) {}
}

function applyTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  document.querySelectorAll("#pref-theme button").forEach((button) => {
    const on = button.dataset.theme === next;
    button.classList.toggle("on", on);
    button.setAttribute("aria-checked", on ? "true" : "false");
  });
  try { localStorage.setItem("planner-theme", next); } catch (error) {}
}

let savedLang = "en";
let savedTheme = "light";
try {
  savedLang = localStorage.getItem("planner-lang") || "en";
  savedTheme = localStorage.getItem("planner-theme") || "light";
} catch (error) {}
applyLanguage(savedLang);
applyTheme(savedTheme);
document.getElementById("pref-lang").addEventListener("change", (event) => applyLanguage(event.target.value));
document.getElementById("pref-theme").addEventListener("click", (event) => {
  const button = event.target.closest("[data-theme]");
  if (button) applyTheme(button.dataset.theme);
});

const usageTools = [
  ["renders", "Renders", "#7c5dff"],
  ["scans", "Home scans", "#73eaad"],
  ["panos", "Panoramas", "#1493a8"],
  ["walks", "Walkthroughs", "#e07a3d"],
  ["chats", "Chats", "#0177de"],
  ["studio", "AI Studio", "#ffad82"],
  ["plans", "Home plans suite", "#da4092"],
];
const activityNames = {
  renders: "Render",
  scans: "Home scan",
  panos: "Panorama",
  walks: "Walkthrough",
  chats: "Chat",
  studio: "AI Studio",
  plans: "Home plans",
};
const activityIcons = {
  renders: "assets/act-render.svg",
  scans: "assets/act-scan.svg",
  panos: "assets/pub-pano.svg",
  walks: "assets/pub-walk.svg",
  chats: "assets/act-chat.svg?v=2",
  studio: "assets/act-studio.svg",
  plans: "assets/act-plan.svg",
};
const usageTasks = [
  { task: "Living room render", tool: "renders", date: "2026-11-05", time: "18:04", note: "4K", credits: 8, who: "Maria" },
  { task: "Kitchen materials", tool: "chats", date: "2026-11-04", time: "16:20", note: "8 messages", credits: 4, who: "Pete" },
  { task: "Lighting plan", tool: "plans", date: "2026-11-03", time: "20:31", note: "1 plan added", credits: 5, who: "Ann" },
  { task: "First home scan", tool: "scans", date: "2026-11-03", time: "09:12", note: "3 rooms", credits: 2, who: "Maria" },
  { task: "Style preview", tool: "renders", date: "2026-10-30", time: "11:40", note: "HD", credits: 3, who: "Pete" },
  { task: "Draft render", tool: "renders", date: "2026-11-02", time: "14:05", note: "HD", credits: 4, who: "Ann" },
  { task: "Bedroom colors", tool: "chats", date: "2026-11-12", time: "19:18", note: "6 messages", credits: 3, who: "Maria" },
  { task: "Hallway scan", tool: "scans", date: "2026-11-10", time: "08:44", note: "1 room", credits: 2, who: "Ann" },
  { task: "Living room panorama", tool: "panos", date: "2026-11-11", time: "14:20", note: "360 view", credits: 3, who: "Ann" },
  { task: "Sofa render", tool: "renders", date: "2026-11-08", time: "13:22", note: "4K", credits: 7, who: "Pete" },
  { task: "Kitchen walkthrough", tool: "walks", date: "2026-11-07", time: "11:05", note: "Full tour", credits: 4, who: "Pete" },
  { task: "Window ideas", tool: "chats", date: "2026-11-06", time: "10:03", note: "4 messages", credits: 2, who: "Maria" },
  { task: "Whole-home set", tool: "plans", date: "2026-11-09", time: "17:51", note: "4 plans added", credits: 4, who: "Pete" },
  { task: "Office layout", tool: "chats", date: "2026-11-18", time: "15:27", note: "5 messages", credits: 3, who: "Ann" },
  { task: "Kitchen scan", tool: "scans", date: "2026-11-16", time: "12:11", note: "2 rooms", credits: 2, who: "Maria", status: "failed" },
  { task: "Mood board", tool: "renders", date: "2026-11-14", time: "09:36", note: "HD", credits: 5, who: "Pete" },
  { task: "Plant shelf", tool: "chats", date: "2026-11-13", time: "18:02", note: "3 messages", credits: 2, who: "Ann" },
  { task: "Facade render", tool: "renders", date: "2026-11-17", time: "11:48", note: "4K", credits: 6, who: "Maria", status: "failed" },
  { task: "Material notes", tool: "studio", date: "2026-11-15", time: "16:14", note: "AI edit", credits: 2, who: "Ann" },
];
const rangeBounds = [
  ["2026-10-30", "2026-11-05"],
  ["2026-11-06", "2026-11-12"],
  ["2026-11-13", "2026-11-19"],
];
let usageSort = { key: "date", dir: "desc" };
let usagePage = 1;
let chartDay = "";
const usagePageSize = 10;
const usagePeople = {
  Maria: "#71b513",
  Pete: "#f47425",
  Ann: "#016ae1",
};

function formatUsageDate(iso) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parts = iso.split("-");
  return months[Number(parts[1]) - 1] + " " + Number(parts[2]);
}

function shareLabel(used, total) {
  if (!total || !used) return "0%";
  const pct = (used / total) * 100;
  if (pct < 0.1) return "<0.1%";
  if (pct >= 10) return Math.round(pct) + "%";
  return pct.toFixed(1) + "%";
}

function usageSpan() {
  const days = document.querySelector("#range button.on").dataset.range;
  if (days === "30") {
    const end = shiftIso("2026-11-19", monthOffset * 30);
    return [shiftIso(end, -29), end];
  }
  return rangeBounds[rangeIndex];
}

function paintRangeChrome() {
  const [from, to] = usageSpan();
  const days = daysBetween(from, to);
  const marks = [days[0], days[Math.floor((days.length - 1) / 2)], days[days.length - 1]];
  document.getElementById("range-label").textContent = formatUsageDate(from) + " – " + formatUsageDate(to);
  document.querySelectorAll(".chart-card .axis span").forEach((node, index) => {
    node.textContent = formatUsageDate(marks[index]);
  });
  document.getElementById("range-prev").disabled = false;
  const month = document.querySelector("#range button.on").dataset.range === "30";
  document.getElementById("range-next").disabled = month && monthOffset >= 0;
}

function usageRows() {
  const tool = document.querySelector("#task-tool-menu button.on").dataset.tool;
  const team = document.querySelector(".app").classList.contains("team");
  const person = document.querySelector("#who button.on").textContent;
  const member = document.querySelector("#task-who-menu button.on").dataset.who;
  return usageTasks.filter((row) => {
    if (tool !== "all" && row.tool !== tool) return false;
    if (team && person !== "All" && row.who !== person) return false;
    if (team && member !== "all" && row.who !== member) return false;
    if (chartDay && row.date !== chartDay) return false;
    return true;
  });
}

function shiftIso(iso, days) {
  const parts = iso.split("-").map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  date.setDate(date.getDate() + days);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

function daysBetween(from, to) {
  const days = [];
  for (let iso = from; iso <= to; iso = shiftIso(iso, 1)) days.push(iso);
  return days;
}

function paintChart(rows) {
  const [from, to] = usageSpan();
  if (chartDay && (chartDay < from || chartDay > to)) chartDay = "";
  const days = daysBetween(from, to);
  const host = document.getElementById("bars");
  host.replaceChildren();
  host.classList.toggle("is-picked", Boolean(chartDay));
  const totals = days.map((day) => rows.filter((row) => row.date === day).reduce((sum, row) => sum + row.credits, 0));
  const max = Math.max(1, ...totals);
  days.forEach((day, index) => {
    const column = document.createElement("span");
    column.className = "daycol";
    const track = document.createElement("span");
    track.className = "daytrack";
    const bar = document.createElement("span");
    bar.className = "daybar";
    const spent = rows.filter((row) => row.date === day);
    if (!spent.length) {
      const empty = document.createElement("i");
      empty.className = "empty";
      bar.append(empty);
    } else {
      column.classList.add("has-spend");
      column.classList.toggle("is-on", chartDay === day);
      column.tabIndex = 0;
      column.setAttribute("role", "button");
      column.setAttribute("aria-pressed", chartDay === day ? "true" : "false");
      column.setAttribute("aria-label", formatUsageDate(day));
      bar.style.height = Math.max(10, Math.round((totals[index] / max) * 112)) + "px";
      usageTools.forEach(([key, , color]) => {
        const used = spent.filter((row) => row.tool === key).reduce((sum, row) => sum + row.credits, 0);
        if (!used) return;
        const piece = document.createElement("i");
        piece.style.flex = used + " 1 0";
        piece.style.background = color;
        bar.append(piece);
      });
      const pickDay = () => {
        chartDay = chartDay === day ? "" : day;
        usagePage = 1;
        hideChartTip();
        paintUsage();
      };
      column.addEventListener("click", pickDay);
      column.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          pickDay();
        }
      });
    }
    column.addEventListener("mouseenter", () => showChartTip(column, day, spent));
    column.addEventListener("mouseleave", hideChartTip);
    track.append(bar);
    column.append(track);
    host.append(column);
  });
}

function chartTip() {
  let tip = document.getElementById("chart-tip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "chart-tip";
    tip.className = "chart-tip";
    tip.hidden = true;
    document.querySelector(".chart-card").append(tip);
  }
  return tip;
}

function hideChartTip() {
  const tip = document.getElementById("chart-tip");
  if (tip) tip.hidden = true;
}

function showChartTip(column, day, spent) {
  const tip = chartTip();
  tip.replaceChildren();
  const title = document.createElement("strong");
  title.textContent = formatUsageDate(day);
  tip.append(title);
  if (!spent.length) {
    const empty = document.createElement("p");
    empty.textContent = "No credits";
    tip.append(empty);
  } else {
    let total = 0;
    usageTools.forEach(([key, name, color]) => {
      const used = spent.filter((row) => row.tool === key).reduce((sum, row) => sum + row.credits, 0);
      if (!used) return;
      total += used;
      const line = document.createElement("span");
      const dot = document.createElement("i");
      dot.style.background = color;
      const label = document.createElement("em");
      label.textContent = name;
      const num = document.createElement("b");
      num.textContent = String(used);
      line.append(dot, label, num);
      tip.append(line);
    });
    const sum = document.createElement("span");
    sum.className = "sum";
    const sumLabel = document.createElement("em");
    sumLabel.textContent = "Total";
    const sumNum = document.createElement("b");
    sumNum.textContent = String(total);
    sum.append(sumLabel, sumNum);
    tip.append(sum);
  }
  tip.hidden = false;
  const card = document.querySelector(".chart-card");
  const cardBox = card.getBoundingClientRect();
  const bar = column.querySelector(".daybar");
  const box = bar.getBoundingClientRect();
  const width = tip.offsetWidth;
  const height = tip.offsetHeight;
  let left = box.left - cardBox.left + box.width / 2;
  left = Math.max(width / 2 + 8, Math.min(left, cardBox.width - width / 2 - 8));
  tip.style.left = left + "px";
  tip.style.top = (box.top - cardBox.top - height - 8) + "px";
}

function paintStats(rows) {
  const host = document.querySelector("#screen-usage .stats");
  host.replaceChildren();
  const total = rows.reduce((sum, row) => sum + row.credits, 0);
  usageTools.forEach(([key, name, color]) => {
    const used = rows.filter((row) => row.tool === key).reduce((sum, row) => sum + row.credits, 0);
    const wrap = document.createElement("div");
    const bar = document.createElement("i");
    bar.style.background = color;
    const copy = document.createElement("div");
    const small = document.createElement("small");
    small.textContent = name;
    const strong = document.createElement("b");
    strong.textContent = shareLabel(used, total);
    copy.append(small, strong);
    wrap.append(bar, copy);
    host.append(wrap);
  });
}

function usageToolName(tool) {
  return activityNames[tool] || usageTools.find((item) => item[0] === tool)[1];
}

function historyStamp(row) {
  return row.date + "T" + (row.time || "00:00");
}

function formatHistoryDate(row) {
  return formatUsageDate(row.date) + ", " + (row.time || "00:00");
}

function syncUsageUserColumn(team) {
  const table = document.querySelector(".usage-table");
  const cols = table.querySelector("colgroup");
  const head = table.querySelector("thead tr");
  const whoCol = cols.querySelector("col.who");
  const whoHead = head.querySelector("th.who");
  if (!team) {
    if (whoCol) whoCol.remove();
    if (whoHead) whoHead.remove();
    return;
  }
  if (!whoCol) {
    const col = document.createElement("col");
    col.className = "who";
    cols.querySelector("col.activity").after(col);
  }
  if (!whoHead) {
    const th = document.createElement("th");
    th.className = "who";
    th.textContent = "User";
    head.querySelector("th").after(th);
  }
}

function paintUsage() {
  const team = document.querySelector(".app").classList.contains("team");
  syncUsageUserColumn(team);
  const rows = usageRows().slice().sort((a, b) => {
    let diff = 0;
    if (usageSort.key === "credits") diff = a.credits - b.credits;
    else if (usageSort.key === "date") diff = historyStamp(a) < historyStamp(b) ? -1 : historyStamp(a) > historyStamp(b) ? 1 : 0;
    else if (usageSort.key === "who") diff = a.who.localeCompare(b.who);
    else if (usageSort.key === "type") diff = usageToolName(a.tool).localeCompare(usageToolName(b.tool));
    else diff = a.task.localeCompare(b.task);
    if (!diff) diff = a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    return usageSort.dir === "asc" ? diff : -diff;
  });
  const pages = Math.max(1, Math.ceil(rows.length / usagePageSize));
  if (usagePage > pages) usagePage = pages;
  const start = (usagePage - 1) * usagePageSize;
  const pageRows = rows.slice(start, start + usagePageSize);
  const body = document.getElementById("usage-rows");
  body.replaceChildren();
  pageRows.forEach((row) => {
    const tr = document.createElement("tr");
    const toolName = usageToolName(row.tool);
    const date = document.createElement("td");
    date.className = "when";
    date.textContent = formatHistoryDate(row);
    const activity = document.createElement("td");
    activity.className = "history-activity";
    const kind = document.createElement("span");
    kind.className = "history-kind";
    const mark = document.createElement("span");
    mark.className = "act-ico " + row.tool;
    const icon = document.createElement("img");
    icon.src = activityIcons[row.tool];
    icon.alt = "";
    mark.append(icon);
    const label = document.createElement("span");
    label.textContent = toolName;
    kind.append(mark, label);
    activity.append(kind);
    const details = document.createElement("td");
    const title = document.createElement("span");
    title.className = "history-title";
    title.textContent = row.task;
    const note = document.createElement("span");
    note.className = "history-note";
    note.textContent = row.note;
    details.append(title, note);
    const status = document.createElement("td");
    status.className = "history-state";
    const pill = document.createElement("span");
    const failed = row.status === "failed";
    pill.className = "history-status " + (failed ? "is-failed" : "is-done");
    pill.textContent = failed ? "Failed" : "Done";
    status.append(pill);
    const credits = document.createElement("td");
    credits.className = "num";
    credits.textContent = String(row.credits);
    if (team) {
      const who = document.createElement("td");
      who.className = "who";
      const person = document.createElement("span");
      person.className = "history-user";
      const face = document.createElement("span");
      face.className = "face";
      face.style.background = usagePeople[row.who] || "#919191";
      face.textContent = row.who.slice(0, 1);
      const name = document.createElement("span");
      name.textContent = row.who;
      person.append(face, name);
      who.append(person);
      tr.append(activity, who, date, details, status, credits);
    } else {
      tr.append(activity, date, details, status, credits);
    }
    const whoName = team ? row.who + " · " : "";
    tr.addEventListener("click", () => showToast(row.task + " · " + whoName + toolName + " · " + pill.textContent + " · " + credits.textContent));
    body.append(tr);
  });

  const foot = document.querySelector(".history-foot");
  foot.hidden = rows.length === 0;
  const from = rows.length ? start + 1 : 0;
  const to = Math.min(rows.length, start + pageRows.length);
  document.getElementById("usage-count").textContent = from + "–" + to + " of " + rows.length;
  const pager = document.getElementById("usage-pages");
  pager.replaceChildren();
  const addPage = (label, content, disabled, go) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.disabled = disabled;
    if (String(content).includes(".svg")) {
      const icon = document.createElement("img");
      icon.src = content;
      icon.alt = "";
      button.append(icon);
    } else {
      button.textContent = content;
    }
    if (!disabled) button.addEventListener("click", go);
    pager.append(button);
    return button;
  };
  addPage("Previous page", "assets/chevron-left.svg", usagePage === 1, () => { usagePage -= 1; paintUsage(); });
  for (let page = 1; page <= pages; page += 1) {
    const button = addPage("Page " + page, String(page), false, () => { usagePage = page; paintUsage(); });
    button.classList.toggle("on", page === usagePage);
  }
  addPage("Next page", "assets/chevron-right.svg", usagePage === pages || rows.length === 0, () => { usagePage += 1; paintUsage(); });

  document.getElementById("usage-empty").hidden = rows.length > 0;
  document.querySelector(".usage-table").classList.toggle("is-empty", rows.length === 0);
  paintRangeChrome();

  const chartRows = usageTasks.filter((row) => {
    const [start, end] = usageSpan();
    const person = document.querySelector("#who button.on").textContent;
    if (row.date < start || row.date > end) return false;
    if (team && person !== "All" && row.who !== person) return false;
    return true;
  });
  paintStats(chartRows);
  paintChart(chartRows);
}

function setUsageMenu(open) {
  document.getElementById("task-tool-menu").hidden = !open;
  const button = document.getElementById("task-tool-btn");
  button.setAttribute("aria-expanded", open ? "true" : "false");
  button.classList.toggle("is-open", open);
  if (open) setWhoMenu(false);
}

function setWhoMenu(open) {
  document.getElementById("task-who-menu").hidden = !open;
  const button = document.getElementById("task-who-btn");
  button.setAttribute("aria-expanded", open ? "true" : "false");
  button.classList.toggle("is-open", open);
  if (open) setUsageMenu(false);
}

document.getElementById("task-tool").addEventListener("click", (event) => {
  const option = event.target.closest("#task-tool-menu button");
  if (option) {
    document.querySelectorAll("#task-tool-menu button").forEach((node) => {
      const on = node === option;
      node.classList.toggle("on", on);
      node.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.getElementById("task-tool-value").textContent = option.querySelector("span").textContent;
    setUsageMenu(false);
    usagePage = 1;
    paintUsage();
    return;
  }
  if (event.target.closest("#task-tool-btn")) {
    setUsageMenu(document.getElementById("task-tool-menu").hidden);
  }
});

document.getElementById("task-who").addEventListener("click", (event) => {
  const option = event.target.closest("#task-who-menu button");
  if (option) {
    document.querySelectorAll("#task-who-menu button").forEach((node) => {
      const on = node === option;
      node.classList.toggle("on", on);
      node.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.getElementById("task-who-value").textContent = option.dataset.who === "all" ? "All users" : option.dataset.who;
    setWhoMenu(false);
    usagePage = 1;
    paintUsage();
    return;
  }
  if (event.target.closest("#task-who-btn")) {
    setWhoMenu(document.getElementById("task-who-menu").hidden);
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("#task-tool")) setUsageMenu(false);
  if (!event.target.closest("#task-who")) setWhoMenu(false);
});

document.getElementById("usage-csv").addEventListener("click", () => {
  const rows = usageRows().slice().sort((a, b) => historyStamp(a) < historyStamp(b) ? 1 : -1);
  const team = document.querySelector(".app").classList.contains("team");
  const lines = [team ? "Date,User,Activity,Details,Note,Status,Credits" : "Date,Activity,Details,Note,Status,Credits"];
  rows.forEach((row) => {
    const amount = String(row.credits);
    const cells = [formatHistoryDate(row), usageToolName(row.tool), row.task, row.note, row.status === "failed" ? "Failed" : "Done", amount];
    if (team) cells.splice(1, 0, row.who);
    lines.push(cells
      .map((value) => '"' + String(value).replaceAll('"', '""') + '"')
      .join(","));
  });
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "credits-by-task.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast("CSV downloaded");
});

paintUsage();

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3600);
}

function show(screen) {
  if (!screens.includes(screen)) screen = "profile";
  document.querySelectorAll(".screen").forEach((node) => {
    node.classList.toggle("active", node.dataset.screen === screen);
  });
  document.querySelectorAll(".nav-item").forEach((node) => {
    node.classList.toggle("active", node.dataset.screen === screen);
  });
  if (location.hash !== "#" + screen) history.replaceState(null, "", "#" + screen);
}

document.getElementById("sidebar").addEventListener("click", (event) => {
  const item = event.target.closest(".nav-item");
  if (!item) return;
  if (item.dataset.screen) show(item.dataset.screen);
  if (item.dataset.toast) showToast(item.dataset.toast);
  document.getElementById("sidebar").classList.remove("open");
});

document.body.addEventListener("click", (event) => {
  const toastBtn = event.target.closest("[data-toast]");
  if (toastBtn && !toastBtn.dataset.screen) showToast(toastBtn.dataset.toast);
  const go = event.target.closest("[data-screen]");
  if (go && go.dataset.screen && !go.classList.contains("nav-item")) show(go.dataset.screen);

  const confirmBtn = event.target.closest("[data-confirm]");
  if (confirmBtn && window.confirm(confirmBtn.dataset.confirm)) {
    showToast("Nothing was deleted. This is a prototype.");
  }

  const toggle = event.target.closest(".toggle");
  if (toggle) {
    if (toggle.id === "auto-topup") {
      if (toggle.getAttribute("aria-pressed") === "true") setAutoTopup(false);
      else setTopupOpen(true);
      return;
    }
    const on = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", on ? "true" : "false");
    toggle.querySelector("img").src = on ? "assets/toggle-on.svg" : "assets/toggle-off.svg";
    applyBind(toggle.dataset.bind, on);
  }
});

const topupModal = document.getElementById("topup-modal");
const autoTopup = document.getElementById("auto-topup");
const autoTopupNote = document.getElementById("auto-topup-note");
const autoTopupNoteDefault = autoTopupNote.textContent;

function setTopupOpen(open) {
  topupModal.hidden = !open;
}

function setAutoTopup(on) {
  autoTopup.setAttribute("aria-pressed", on ? "true" : "false");
  autoTopup.querySelector("img").src = on ? "assets/toggle-on.svg" : "assets/toggle-off.svg";
  if (!on) {
    autoTopupNote.textContent = autoTopupNoteDefault;
    return;
  }
  const low = document.getElementById("topup-low").value.trim() || "50";
  const amount = document.getElementById("topup-amount").value.trim() || "500";
  autoTopupNote.textContent = "When credits drop to " + low + ", top up to " + amount + " · Visa •••• 1223";
}

document.getElementById("topup-save").addEventListener("click", () => {
  setAutoTopup(true);
  setTopupOpen(false);
});
document.getElementById("topup-cancel").addEventListener("click", () => setTopupOpen(false));
document.getElementById("topup-close").addEventListener("click", () => setTopupOpen(false));
topupModal.addEventListener("click", (event) => {
  if (event.target === topupModal) setTopupOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !topupModal.hidden) setTopupOpen(false);
});

function applyBind(key, on) {
  if (key === "projects") document.getElementById("projects-block").hidden = !on;
  if (key === "work") document.getElementById("view-work").hidden = !on;
  if (key === "contact") document.getElementById("contact-btn").hidden = !on;
  if (key === "social") {
    document.querySelectorAll(".social-btn, #social-div").forEach((node) => {
      node.hidden = !on;
    });
  }
}

function syncProfile() {
  const name = document.getElementById("f-name").value.trim() || "Olya W.";
  const user = document.getElementById("f-user").value.trim() || "@ratata";
  const loc = document.getElementById("f-loc").value.trim();
  const bio = document.getElementById("f-desc").value.trim();
  document.getElementById("view-name").textContent = name;
  const letter = (name[0] || "O").toUpperCase();
  const big = document.getElementById("avatar-letter");
  const small = document.getElementById("account-avatar");
  if (!big.dataset.photo) big.firstChild.textContent = letter;
  if (small && !small.dataset.photo) small.textContent = letter;
  const accountUser = document.getElementById("account-user");
  if (accountUser) accountUser.textContent = user;
  document.getElementById("view-handle").textContent = loc ? user + " · " + loc : user;
  const contactUser = document.getElementById("pub-contact-user");
  const contactLetter = document.getElementById("pub-contact-letter");
  if (contactUser) contactUser.textContent = user;
  if (contactLetter) contactLetter.textContent = letter;
  document.getElementById("view-bio").textContent = bio;
  const slug = user.replace(/^@/, "").trim() || "ratata";
  document.getElementById("public-url").lastChild.textContent = " planner5d.com/" + slug;
}

["f-name", "f-user", "f-loc", "f-desc"].forEach((id) => {
  document.getElementById(id).addEventListener("input", syncProfile);
});

document.getElementById("edit-account").addEventListener("click", openAccountModal);

const accountModal = document.getElementById("account-modal");
const accountModalUser = document.getElementById("account-modal-user");
const accountModalAvatar = document.getElementById("account-modal-avatar");
let pendingPhotoUrl = "";

function paintModalAvatar() {
  const small = document.getElementById("account-avatar");
  if (pendingPhotoUrl) {
    accountModalAvatar.textContent = "";
    accountModalAvatar.style.backgroundImage = "url(\"" + pendingPhotoUrl + "\")";
    accountModalAvatar.style.color = "transparent";
    return;
  }
  accountModalAvatar.textContent = small.textContent;
  accountModalAvatar.style.backgroundImage = small.style.backgroundImage;
  accountModalAvatar.style.color = small.style.color;
}

function openAccountModal() {
  pendingPhotoUrl = "";
  accountModalUser.value = document.getElementById("account-user").textContent.trim();
  paintModalAvatar();
  accountModal.hidden = false;
  accountModalUser.focus();
}

function closeAccountModal() {
  if (pendingPhotoUrl) URL.revokeObjectURL(pendingPhotoUrl);
  pendingPhotoUrl = "";
  accountModal.hidden = true;
}

function applyAccountPhoto(url) {
  const small = document.getElementById("account-avatar");
  const big = document.getElementById("avatar-letter");
  small.dataset.photo = "1";
  big.dataset.photo = "1";
  small.textContent = "";
  small.style.backgroundImage = "url(\"" + url + "\")";
  big.style.backgroundImage = "url(\"" + url + "\")";
  big.style.backgroundSize = "cover";
  big.style.backgroundPosition = "center";
  big.style.color = "transparent";
}

document.getElementById("account-modal-photo").addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (pendingPhotoUrl) URL.revokeObjectURL(pendingPhotoUrl);
  pendingPhotoUrl = URL.createObjectURL(file);
  paintModalAvatar();
});

document.getElementById("account-modal-save").addEventListener("click", () => {
  let value = accountModalUser.value.trim();
  if (value && !value.startsWith("@")) value = "@" + value;
  document.getElementById("f-user").value = value || "@ratata";
  if (pendingPhotoUrl) applyAccountPhoto(pendingPhotoUrl);
  pendingPhotoUrl = "";
  syncProfile();
  accountModal.hidden = true;
});

document.getElementById("account-modal-cancel").addEventListener("click", closeAccountModal);
document.getElementById("account-modal-close").addEventListener("click", closeAccountModal);
accountModal.addEventListener("click", (event) => {
  if (event.target === accountModal) closeAccountModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !accountModal.hidden) closeAccountModal();
});

document.getElementById("follow-btn").addEventListener("click", (event) => {
  const btn = event.currentTarget;
  const following = btn.textContent === "Following";
  btn.textContent = following ? "Follow" : "Following";
});

document.getElementById("mode").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  document.querySelectorAll("#mode button").forEach((node) => node.classList.toggle("on", node === button));
  const preview = button.dataset.mode === "preview";
  document.getElementById("editor").hidden = preview;
  document.querySelector(".profile-card").style.maxWidth = preview ? "742px" : "";
});

document.getElementById("sort-btn").addEventListener("click", (event) => {
  const newest = event.currentTarget.textContent.includes("newest");
  event.currentTarget.innerHTML = newest ? "<span>Sort:</span> oldest first" : "<span>Sort:</span> newest first";
  const grid = document.getElementById("project-grid");
  const tiles = [...grid.querySelectorAll(".tile:not(.add)")];
  tiles.reverse().forEach((tile) => grid.appendChild(tile));
});

document.getElementById("add-social").addEventListener("click", () => {
  const name = window.prompt("Profile name", "Behance");
  if (!name) return;
  const handle = window.prompt("Handle", "@olya");
  if (!handle) return;
  const row = document.createElement("div");
  row.className = "social-row";
  row.innerHTML = '<span class="sky"><img src="assets/link.svg" width="20" height="20" alt="" /></span><div class="stack"><h3></h3><p></p></div>';
  row.querySelector("h3").textContent = name;
  row.querySelector("p").textContent = handle;
  document.getElementById("add-social").before(row);
});

document.getElementById("edit-billing").addEventListener("click", () => {
  const email = document.querySelector('[data-bill="email"]');
  const name = document.querySelector('[data-bill="name"]');
  const address = document.querySelector('[data-bill="address"]');
  const nextEmail = window.prompt("Billing email", email.textContent);
  if (nextEmail) email.textContent = nextEmail;
  const nextName = window.prompt("Name", name.textContent);
  if (nextName) name.textContent = nextName;
  const nextAddress = window.prompt("Billing address", address.textContent);
  if (nextAddress) address.textContent = nextAddress;
});

document.getElementById("card-menu-btn").addEventListener("click", (event) => {
  event.stopPropagation();
  document.getElementById("card-menu").classList.toggle("open");
});
document.addEventListener("click", (event) => {
  document.querySelectorAll(".menu.open").forEach((menu) => {
    if (!menu.contains(event.target)) menu.classList.remove("open");
  });
});

document.getElementById("project-grid").addEventListener("click", (event) => {
  const kebab = event.target.closest(".kebab");
  if (!kebab) return;
  event.stopPropagation();
  let menu = kebab.parentElement.querySelector(".menu");
  if (!menu) {
    menu = document.createElement("div");
    menu.className = "menu";
    menu.innerHTML = "<button type='button' data-action='pin'>Pin</button><button type='button' data-action='unpublish'>Unpublish</button>";
    kebab.parentElement.appendChild(menu);
    menu.addEventListener("click", (click) => {
      const button = click.target.closest("button");
      const tile = kebab.parentElement;
      if (!button) return;
      if (button.dataset.action === "pin") {
        const pinned = tile.classList.toggle("is-pinned");
        button.textContent = pinned ? "Unpin" : "Pin";
        let flag = tile.querySelector(".pin-flag");
        if (pinned && !flag) {
          flag = document.createElement("span");
          flag.className = "pin-flag";
          flag.textContent = "Pinned";
          tile.appendChild(flag);
          const add = tile.parentElement.querySelector(".tile.add");
          tile.parentElement.insertBefore(tile, add.nextSibling);
        }
        if (!pinned && flag) flag.remove();
        showToast(pinned ? "Pinned" : "Unpinned");
      }
      if (button.dataset.action === "unpublish") {
        tile.remove();
        showToast("Unpublished");
      }
      menu.classList.remove("open");
    });
  }
  document.querySelectorAll(".menu.open").forEach((node) => node.classList.remove("open"));
  menu.classList.add("open");
});

document.getElementById("range").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  document.querySelectorAll("#range button").forEach((node) => node.classList.toggle("on", node === button));
  chartDay = "";
  paintUsage();
});

function stepRange(dir) {
  const month = document.querySelector("#range button.on").dataset.range === "30";
  if (month) {
    if (dir > 0 && monthOffset >= 0) return;
    monthOffset += dir;
  } else rangeIndex = (rangeIndex + dir + ranges.length) % ranges.length;
  chartDay = "";
  paintUsage();
}
document.getElementById("range-prev").addEventListener("click", () => stepRange(-1));
document.getElementById("range-next").addEventListener("click", () => stepRange(1));

document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

const workspaceBtn = document.getElementById("workspace");
const profilePicker = document.getElementById("profile-picker");

function setPicker(open) {
  profilePicker.hidden = !open;
  workspaceBtn.setAttribute("aria-expanded", open ? "true" : "false");
}

workspaceBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  setPicker(profilePicker.hidden);
});

profilePicker.addEventListener("click", (event) => {
  const row = event.target.closest("[data-profile]");
  if (row) {
    profilePicker.querySelectorAll("[data-profile]").forEach((node) => {
      const on = node === row;
      node.classList.toggle("is-on", on);
      node.setAttribute("aria-selected", on ? "true" : "false");
    });
    applyWorkspace(row.dataset.profile);
  }
  setPicker(false);
});

document.getElementById("open-team").addEventListener("click", () => {
  const leavingTeam = document.querySelector(".app").classList.contains("team");
  const next = leavingTeam ? "Personal" : "Team R";
  document.querySelector(`[data-profile="${next}"]`).click();
  document.getElementById("sidebar").classList.remove("open");
  const screen = (location.hash || "#profile").replace("#", "");
  if (!["settings", "billing", "usage"].includes(screen)) show("settings");
  showToast(leavingTeam ? "Switched to Personal" : "Switched to Team R");
  const cluster = document.querySelector(".brand-cluster");
  cluster.classList.remove("is-switched");
  void cluster.offsetWidth;
  cluster.classList.add("is-switched");
});

function paintTeamSwitch(team) {
  document.getElementById("teams-label").textContent = team ? "Workspace" : "For teams";
  document.getElementById("team-switch-name").textContent = team ? "Personal" : "Team R";
  document.getElementById("team-switch-hint").textContent = team ? "Switch to personal" : "Switch to team";
  const mark = document.getElementById("team-switch-mark");
  mark.textContent = team ? "P" : "R";
  mark.classList.toggle("is-personal", team);
}

function applyWorkspace(name) {
  const team = name === "Team R";
  document.querySelector(".app").classList.toggle("team", team);
  document.getElementById("workspace-name").textContent = name;
  document.getElementById("credit-count").textContent = team ? "898" : "179";
  document.getElementById("credit-avatar").textContent = team ? "M" : "H";
  document.querySelector(".credits").setAttribute("aria-label", (team ? "898" : "179") + " credits");
  paintTeamSwitch(team);
  paintUsage();
}

document.getElementById("who").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  document.querySelectorAll("#who button").forEach((node) => node.classList.toggle("on", node === button));
  chartDay = "";
  usagePage = 1;
  paintUsage();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".workspace")) setPicker(false);
  if (!event.target.closest("#notify")) setNotify(false);
});

const notifyNotes = [
  { type: "render", group: "new", lead: "Kitchen render", rest: " for Monica’s flat", line: "is ready", time: "1h", unread: true, thumb: "assets/notify-render-thumb.png", action: "Open render" },
  { type: "mention", group: "new", lead: "Pete", mid: " mentioned you in ", tail: "Kitchen plan", quote: "Can we move the island, @ratata?", time: "1h", unread: true, letter: "P", tone: "orange", action: "Reply" },
  { type: "render", group: "new", lead: "Living room render", line: "is ready", time: "2h", unread: true, thumb: "assets/notify-render-thumb.png", action: "Open render" },
  { type: "access", group: "earlier", lead: "Heh shared project", rest: " with you", time: "2h", unread: false, letter: "H", tone: "pink", action: "Open project" },
  { type: "mention", group: "earlier", lead: "Ann", mid: " mentioned you in ", tail: "Project Name", quote: "Looks great! @ratata Let’s redo this also here and there", time: "3h", unread: false, letter: "A", tone: "orange", action: "Reply" },
  { type: "access", group: "earlier", lead: "Maria shared project", rest: " with you", time: "5h", unread: false, letter: "M", tone: "green", action: "Open project" },
  { type: "render", group: "earlier", lead: "Facade render", line: "is ready", time: "1d", unread: false, thumb: "assets/notify-render-thumb.png", action: "Open render" },
  { type: "mention", group: "earlier", lead: "Olya", mid: " mentioned you in ", tail: "Client board", quote: "@ratata the sofa color still feels off", time: "1d", unread: true, letter: "O", tone: "blue", action: "Reply" },
  { type: "access", group: "earlier", lead: "Sam shared project", rest: " with you", time: "2d", unread: false, letter: "S", tone: "pink", action: "Open project" },
  { type: "render", group: "earlier", lead: "Mood board", line: "is ready", time: "3d", unread: false, thumb: "assets/notify-render-thumb.png", action: "Open render" }
];
let notifyFilter = "all";
const notifyPanel = document.getElementById("notify-panel");
const notifyButton = document.getElementById("notify-btn");
const notifyFilterMenu = document.getElementById("notify-filter-menu");
const notifyFilterButton = document.getElementById("notify-filters");

function noteHtml(note) {
  const index = notifyNotes.indexOf(note);
  const mark = note.thumb
    ? `<span class="notify-ico thumb"><img src="${note.thumb}" alt="" /></span>`
    : `<span class="notify-ico face ${note.tone || ""}">${note.letter}</span>`;
  const title = note.tail
    ? `<strong><b>${note.lead}</b>${note.mid}<b>${note.tail.replace(" ", "<br>")}</b></strong>`
    : `<strong><b>${note.lead}</b>${note.rest || ""}</strong>${note.line ? `<span>${note.line}</span>` : ""}`;
  const quote = note.quote ? `<p class="notify-quote">${note.quote}</p>` : "";
  const reply = note.replying ? `<form class="notify-reply">
      <textarea rows="3" placeholder="Write a reply"></textarea>
      <button class="notify-send" type="button">Send</button>
    </form>` : "";
  const dot = note.unread ? `<img class="notify-dotline" src="assets/notify-unread.svg" width="5" height="5" alt="" />` : "";
  return `<div class="notify-item${note.unread ? " is-unread" : ""}" data-note="${index}">
    ${dot}
    ${mark}
    <span class="notify-copy">
      ${title}
      ${quote}
      ${reply}
      <button class="notify-action" type="button" data-action="${note.action}">${note.action}</button>
    </span>
    <small class="notify-when">${note.time}</small>
    <button class="notify-more" type="button" aria-label="Notification menu" aria-expanded="false">
      <img src="assets/more.svg" width="24" height="24" alt="" />
    </button>
    <div class="notify-moremenu" role="menu" hidden>
      <button type="button" data-archive>Archive</button>
    </div>
  </div>`;
}

function noteGroups(notes) {
  const groups = [
    ["New", notes.filter((note) => note.group === "new")],
    ["Earlier", notes.filter((note) => note.group === "earlier")]
  ];
  return groups
    .filter(([, items]) => items.length)
    .map(([label, items]) => `<p class="notify-group">${label}</p>${items.map(noteHtml).join("")}`)
    .join("");
}

function paintNotes() {
  const list = document.getElementById("notify-list");
  const empty = document.getElementById("notify-empty");
  const drawerList = document.getElementById("note-drawer-list");
  const drawerEmpty = document.getElementById("note-drawer-empty");
  const alive = notifyNotes.filter((note) => !note.dismissed && !note.archived);
  const shown = alive.filter((note) => {
    if (notifyFilter === "unread") return note.unread;
    if (notifyFilter === "mention") return note.type === "mention";
    return true;
  });
  list.innerHTML = noteGroups(shown);
  drawerList.innerHTML = noteGroups(shown);
  empty.hidden = shown.length > 0;
  drawerEmpty.hidden = shown.length > 0;
  drawerEmpty.textContent = notifyFilter === "all" ? "No notifications." : "Nothing in this filter.";
  const unread = alive.filter((note) => note.unread).length;
  document.querySelectorAll(".notify-unread-count").forEach((node) => { node.textContent = unread; });
  document.getElementById("notify-badge").textContent = String(unread);
  document.querySelectorAll(".notify-mention-count").forEach((node) => {
    node.textContent = alive.filter((note) => note.type === "mention").length;
  });
  notifyButton.classList.toggle("is-clear", unread === 0);
  notifyButton.setAttribute("aria-label", unread ? "Notifications, " + unread + " unread" : "Notifications");
  const filtering = notifyFilter !== "all";
  notifyFilterButton.classList.toggle("is-on", filtering || !notifyFilterMenu.hidden);
  drawerFilterButton.classList.toggle("is-on", filtering || !drawerFilterMenu.hidden);
}

const drawerFilterMenu = document.getElementById("drawer-filter-menu");
const drawerFilterButton = document.getElementById("drawer-filters");

function setFilterMenu(open) {
  notifyFilterMenu.hidden = !open;
  notifyFilterButton.setAttribute("aria-expanded", open ? "true" : "false");
  notifyFilterButton.classList.toggle("is-on", open || notifyFilter !== "all");
  if (open) setDrawerFilterMenu(false);
}

function setDrawerFilterMenu(open) {
  drawerFilterMenu.hidden = !open;
  drawerFilterButton.setAttribute("aria-expanded", open ? "true" : "false");
  drawerFilterButton.classList.toggle("is-on", open || notifyFilter !== "all");
}

function applyNotifyFilter(filter) {
  notifyFilter = filter;
  document.querySelectorAll(".notify-filtermenu button").forEach((button) => {
    const on = button.dataset.filter === filter;
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-checked", on ? "true" : "false");
  });
  setFilterMenu(false);
  setDrawerFilterMenu(false);
  paintNotes();
}

function closeNoteMenus() {
  document.querySelectorAll(".notify-item.is-menu").forEach((item) => {
    item.classList.remove("is-menu");
    const menu = item.querySelector(".notify-moremenu");
    const button = item.querySelector(".notify-more");
    if (menu) menu.hidden = true;
    if (button) button.setAttribute("aria-expanded", "false");
  });
}

function setNotify(open) {
  notifyPanel.hidden = !open;
  notifyButton.setAttribute("aria-expanded", open ? "true" : "false");
  if (!open) {
    setFilterMenu(false);
    closeNoteMenus();
  }
}

const noteDrawer = document.getElementById("note-drawer");

function setNoteDrawer(open) {
  noteDrawer.hidden = !open;
  if (open) setNotify(false);
  if (!open) setDrawerFilterMenu(false);
}

notifyButton.addEventListener("click", (event) => {
  event.stopPropagation();
  setNotify(notifyPanel.hidden);
});
function runNoteAction(note) {
  note.unread = false;
  if (note.action === "Reply") {
    note.replying = true;
    setNoteDrawer(true);
    paintNotes();
    document.querySelector("#note-drawer-list .notify-reply textarea")?.focus();
    return;
  }
  paintNotes();
  setNoteDrawer(false);
  openEditor();
  if (note.type === "render") {
    requestAnimationFrame(() => document.getElementById("renders-card")?.scrollIntoView({ block: "start" }));
  }
  showToast(note.action);
}

function onNoteListClick(event) {
  event.stopPropagation();
  const item = event.target.closest("[data-note]");
  if (!item) return;
  const note = notifyNotes[Number(item.dataset.note)];
  if (event.target.closest(".notify-send")) {
    const text = item.querySelector("textarea")?.value.trim();
    if (!text) return;
    note.replying = false;
    paintNotes();
    showToast("Reply sent");
    return;
  }
  if (event.target.closest("textarea")) return;
  if (event.target.closest("[data-archive]")) {
    note.archived = true;
    note.unread = false;
    note.replying = false;
    paintNotes();
    showToast("Archived");
    return;
  }
  const more = event.target.closest(".notify-more");
  if (more) {
    const open = item.classList.contains("is-menu");
    closeNoteMenus();
    if (!open) {
      item.classList.add("is-menu");
      item.querySelector(".notify-moremenu").hidden = false;
      more.setAttribute("aria-expanded", "true");
    }
    return;
  }
  closeNoteMenus();
  if (event.target.closest("[data-dismiss]")) {
    note.dismissed = true;
    paintNotes();
    return;
  }
  if (event.target.closest("[data-action], .notify-item")) runNoteAction(note);
}
document.getElementById("notify-list").addEventListener("click", onNoteListClick);
document.getElementById("note-drawer-list").addEventListener("click", onNoteListClick);
notifyFilterButton.addEventListener("click", (event) => {
  event.stopPropagation();
  setFilterMenu(notifyFilterMenu.hidden);
});
notifyFilterMenu.addEventListener("click", (event) => {
  event.stopPropagation();
  const tab = event.target.closest("[data-filter]");
  if (!tab) return;
  applyNotifyFilter(tab.dataset.filter);
});
drawerFilterButton.addEventListener("click", (event) => {
  event.stopPropagation();
  setDrawerFilterMenu(drawerFilterMenu.hidden);
});
drawerFilterMenu.addEventListener("click", (event) => {
  event.stopPropagation();
  const tab = event.target.closest("[data-filter]");
  if (!tab) return;
  applyNotifyFilter(tab.dataset.filter);
});
noteDrawer.addEventListener("click", (event) => {
  if (!event.target.closest(".notify-filterwrap")) setDrawerFilterMenu(false);
  if (!event.target.closest(".notify-item")) closeNoteMenus();
});
notifyPanel.addEventListener("click", (event) => {
  if (!event.target.closest(".notify-filterwrap")) setFilterMenu(false);
  if (!event.target.closest(".notify-item")) closeNoteMenus();
});
document.getElementById("notify-all").addEventListener("click", (event) => {
  event.stopPropagation();
  setNoteDrawer(true);
});
document.getElementById("note-drawer-close").addEventListener("click", () => setNoteDrawer(false));
document.getElementById("note-drawer-back").addEventListener("click", () => setNoteDrawer(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !noteDrawer.hidden) setNoteDrawer(false);
});
document.querySelectorAll(".notify-promo-x").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelectorAll(".notify-promo").forEach((promo) => { promo.hidden = true; });
  });
});
paintNotes();

window.addEventListener("hashchange", () => show(location.hash.slice(1)));
show(location.hash.slice(1) || "profile");

const editor = document.getElementById("project-editor");

function openEditor() {
  editor.hidden = false;
  editor.classList.remove("is-preview");
  editor.querySelectorAll("[data-mode]").forEach((button) => {
    const on = button.dataset.mode === "editor";
    button.classList.toggle("on", on);
    button.setAttribute("aria-selected", on ? "true" : "false");
  });
  const panel = editor.querySelector(".pub-panel");
  if (panel) panel.scrollTop = 0;
  selectEdit("details", "panel");
}

function closeEditor() {
  editor.hidden = true;
  document.getElementById("publish-modal").hidden = true;
}

const publishModal = document.getElementById("publish-modal");
const publishButton = editor.querySelector(".pub-publish");
const gallerySwitch = document.getElementById("publish-gallery");

function publishBlockReason() {
  const title = document.getElementById("pub-title-input").value.trim();
  const cover = document.getElementById("cover-slot").classList.contains("has-image");
  if (!title && !cover) return "Add a title and a cover image";
  if (!title) return "Add a title";
  if (!cover) return "Add a cover image";
  return "";
}

function markPublishGaps() {
  const titleInput = document.getElementById("pub-title-input");
  const titleField = titleInput.closest(".pub-field");
  const missingTitle = !titleInput.value.trim();
  const missingCover = !document.getElementById("cover-slot").classList.contains("has-image");
  titleField.classList.toggle("is-missing", missingTitle);
  document.querySelector(".pub-covercard").classList.toggle("is-missing", missingCover);
  if (missingCover) document.querySelector(".pub-covercard").scrollIntoView({ block: "nearest" });
  else if (missingTitle) titleField.scrollIntoView({ block: "nearest" });
}

function showPublishBlock() {
  const reason = publishBlockReason();
  if (!reason) {
    markPublishGaps();
    return "";
  }
  markPublishGaps();
  showToast(reason);
  return reason;
}

function setPublishOpen(open) {
  publishModal.hidden = !open;
  publishButton.setAttribute("aria-expanded", open ? "true" : "false");
}

publishButton.addEventListener("click", () => {
  if (publishModal.hidden && showPublishBlock()) return;
  setPublishOpen(publishModal.hidden);
});
publishModal.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-publish]")) setPublishOpen(false);
});
document.addEventListener("click", (event) => {
  if (publishModal.hidden || event.target.closest(".pub-publishwrap")) return;
  setPublishOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !publishModal.hidden) setPublishOpen(false);
});
document.getElementById("publish-copy").addEventListener("click", () => {
  const link = document.getElementById("publish-link").textContent.trim();
  if (navigator.clipboard) navigator.clipboard.writeText(link).catch(() => {});
  showToast("Copied");
});
document.getElementById("publish-save").addEventListener("click", () => {
  if (showPublishBlock()) return;
  setPublishOpen(false);
  showToast("Published");
});
gallerySwitch.addEventListener("click", () => {
  const on = gallerySwitch.getAttribute("aria-pressed") !== "true";
  gallerySwitch.setAttribute("aria-pressed", on ? "true" : "false");
  gallerySwitch.querySelector("img").src = on ? "assets/pub-preview-toggle.svg" : "assets/pub-toggle.svg";
});

document.getElementById("add-project").addEventListener("click", openEditor);

document.getElementById("editor-back").addEventListener("click", (event) => {
  event.preventDefault();
  closeEditor();
  if (location.hash !== "#profile") location.hash = "profile";
});

function setEditorMode(mode) {
  editor.classList.toggle("is-preview", mode === "preview");
  editor.querySelectorAll("[data-mode]").forEach((button) => {
    const on = button.dataset.mode === mode;
    button.classList.toggle("on", on);
    button.setAttribute("aria-selected", on ? "true" : "false");
  });
}

editor.addEventListener("click", (event) => {
  const mode = event.target.closest("[data-mode]");
  if (!mode || !editor.contains(mode)) return;
  setEditorMode(mode.dataset.mode);
});

document.getElementById("pub-back-edit").addEventListener("click", () => setEditorMode("editor"));

function reveal(node) {
  const scroller = node.closest(".pub-panel, .pub-preview");
  if (!scroller) return;
  const nodeRect = node.getBoundingClientRect();
  const box = scroller.getBoundingClientRect();
  if (nodeRect.top < box.top) scroller.scrollTop -= box.top - nodeRect.top + 12;
  else if (nodeRect.bottom > box.bottom) scroller.scrollTop += nodeRect.bottom - box.bottom + 12;
}

function selectEdit(key, from) {
  editor.querySelectorAll("[data-edit]").forEach((node) => {
    node.classList.toggle("is-selected", node.dataset.edit === key);
  });
  const card = editor.querySelector(`.pub-card[data-edit="${key}"]`);
  const previewHit = editor.querySelector(`.pub-preview [data-edit="${key}"]`);
  if (from === "preview" && card && !card.classList.contains("is-open")) {
    card.classList.add("is-open");
    const head = card.querySelector(".pub-cardmain, .pub-cardhead");
    if (head) head.setAttribute("aria-expanded", "true");
  }
  if (from === "preview" && card) reveal(card);
  if (from === "panel" && previewHit) reveal(previewHit);
}

editor.querySelector(".pub-panel").addEventListener("focusin", (event) => {
  const card = event.target.closest(".pub-card[data-edit]");
  if (!card) return;
  selectEdit(card.dataset.edit, "panel");
});

editor.querySelector(".pub-preview").addEventListener("click", (event) => {
  const block = event.target.closest("[data-edit]");
  if (!block) return;
  selectEdit(block.dataset.edit, "preview");
});

editor.querySelector(".pub-preview").addEventListener("focusin", (event) => {
  const block = event.target.closest("[data-edit]");
  if (!block) return;
  selectEdit(block.dataset.edit, "preview");
});

let suppressCardClick = false;
editor.querySelector(".pub-panel").addEventListener("click", (event) => {
  if (suppressCardClick) {
    suppressCardClick = false;
    return;
  }
  if (event.target.closest(".pub-switch, .pub-addblock, .pub-rendmenu, .pub-carddrag")) return;
  const card = event.target.closest(".pub-card[data-edit]");
  if (card) selectEdit(card.dataset.edit, "panel");
  const head = event.target.closest(".pub-cardhead, .pub-cardmain");
  if (!head) return;
  const owner = head.closest(".pub-card");
  if (owner.querySelector(".pub-addblock") && !owner.classList.contains("is-added")) return;
  const open = owner.classList.toggle("is-open");
  head.setAttribute("aria-expanded", open ? "true" : "false");
});

function slideCard(card, place) {
  const first = card.getBoundingClientRect().top;
  place();
  const shift = first - card.getBoundingClientRect().top;
  if (!shift) return;
  card.style.transition = "none";
  card.style.transform = `translateY(${shift}px)`;
  requestAnimationFrame(() => {
    card.style.transition = "transform .35s ease";
    card.style.transform = "";
  });
}

function syncPreviewOrder() {
  const flow = document.querySelector(".pub-flow");
  const story = flow.querySelector(".pub-story");
  let anchor = story;
  document.querySelectorAll(".pub-panel .pub-card.is-added[data-preview]").forEach((card) => {
    const slot = flow.querySelector(`[data-slot="${card.dataset.preview}"]`);
    if (!slot) return;
    anchor.after(slot);
    anchor = slot;
  });
}

function wireSuggestBlock(cardId, name, offClass) {
  const card = document.getElementById(cardId);
  const button = card.querySelector(".pub-addblock");
  const menu = card.querySelector(".pub-rendmenu");
  const hideItem = menu.querySelector("[data-block-action='hide']");
  const label = document.querySelector(".pub-suggest");
  const preview = editor.querySelector(".pub-preview");

  function closeMenu() {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  }

  function setAdded(on) {
    card.classList.toggle("is-added", on);
    button.querySelector("img").src = on ? "assets/pub-more.svg" : "assets/pub-plus.svg";
    button.setAttribute("aria-label", on ? `${name} menu` : `Add ${name}`);
    hideItem.querySelector("span").textContent = "Hide block";
    closeMenu();
  }

  button.addEventListener("click", () => {
    document.querySelectorAll(".pub-rendmenu").forEach((other) => {
      if (other !== menu) other.hidden = true;
    });
    if (!card.classList.contains("is-added")) {
      slideCard(card, () => label.before(card));
      setAdded(true);
      card.classList.add("is-open");
      card.querySelector(".pub-cardhead").setAttribute("aria-expanded", "true");
      if (offClass) preview.classList.remove(offClass);
      syncPreviewOrder();
      return;
    }
    const open = menu.hidden;
    menu.hidden = !open;
    button.setAttribute("aria-expanded", open ? "true" : "false");
  });

  menu.addEventListener("click", (event) => {
    const action = event.target.closest("[data-block-action]");
    if (!action) return;
    if (action.dataset.blockAction === "remove") {
      slideCard(card, () => label.after(card));
      setAdded(false);
      card.classList.remove("is-open");
      card.querySelector(".pub-cardhead").setAttribute("aria-expanded", "false");
      if (offClass) preview.classList.add(offClass);
      syncPreviewOrder();
      return;
    }
    const hideLabel = hideItem.querySelector("span");
    const hidden = offClass
      ? preview.classList.toggle(offClass)
      : hideLabel.textContent !== "Show block";
    hideLabel.textContent = hidden ? "Show block" : "Hide block";
    closeMenu();
  });
}

wireSuggestBlock("renders-card", "renders", "is-renders-off");
wireSuggestBlock("plan-card", "floor plan", "is-plan-off");
wireSuggestBlock("pano-card", "panorama", "is-pano-off");
wireSuggestBlock("walk-card", "walkthrough", "is-walk-off");
wireSuggestBlock("contact-card", "contact me", "is-contact-off");

let customSeq = 0;
function addCustomBlock() {
  const id = "custom-" + (++customSeq);
  const label = document.querySelector(".pub-suggest");
  const card = document.createElement("section");
  card.className = "pub-card is-added is-open";
  card.dataset.preview = id;
  card.innerHTML = `
    <div class="pub-cardhead" aria-expanded="true">
      <span class="pub-drag pub-carddrag" title="Drag to reorder"><img src="assets/lucide-grip-vertical.svg" alt="" draggable="false"></span>
      <span class="pub-ico"><img src="assets/pub-image.svg" width="20" height="20" alt="" draggable="false"></span>
      <span data-custom-name>Custom block</span>
      <span class="pub-count" hidden>0</span>
      <div class="pub-addwrap">
        <button class="pub-addblock" type="button" aria-label="Custom block menu" aria-expanded="false" aria-haspopup="menu">
          <img src="assets/pub-more.svg" width="24" height="24" alt="" draggable="false">
        </button>
        <div class="pub-menu pub-rendmenu pub-blockmenu" role="menu" hidden>
          <button type="button" role="menuitem" data-block-action="hide">
            <img src="assets/pub-visible-off.svg" width="24" height="24" alt="" draggable="false">
            <span>Hide block</span>
          </button>
          <div class="pub-blockline"></div>
          <button type="button" role="menuitem" data-block-action="remove">
            <img src="assets/pub-trash.svg" width="24" height="24" alt="" draggable="false">
            <span>Remove block</span>
          </button>
        </div>
      </div>
    </div>
    <div class="pub-fields">
      <label class="pub-field"><span>Title</span><input type="text" placeholder="Block title"></label>
      <label class="pub-field"><span>Description</span><textarea placeholder="Tell visitors about this block"></textarea></label>
      <div class="pub-custompics">
        <div data-custom-rows></div>
        <button class="pub-addbar pub-customadd" data-custom-add type="button">
          <img src="assets/pub-upload-gray.svg" width="24" height="24" alt="" draggable="false">
          Add images
        </button>
      </div>
    </div>
    <input class="pub-customfile" type="file" accept="image/*" multiple>
  `;
  label.before(card);

  const slot = document.createElement("div");
  slot.className = "pub-customblock is-blank";
  slot.dataset.slot = id;
  slot.innerHTML = '<h2 class="is-empty"></h2><p class="pub-customabout is-empty"></p><div class="pub-customgrid"></div>';
  document.querySelector(".pub-flow").appendChild(slot);

  const images = [];
  const titleInput = card.querySelector("input[type='text']");
  const aboutInput = card.querySelector("textarea");
  const titleOut = slot.querySelector("h2");
  const aboutOut = slot.querySelector("p");
  const nameEl = card.querySelector("[data-custom-name]");
  const countEl = card.querySelector(".pub-count");
  const rows = card.querySelector("[data-custom-rows]");
  const grid = slot.querySelector(".pub-customgrid");
  const file = card.querySelector("input[type='file']");
  const button = card.querySelector(".pub-addblock");
  const menu = card.querySelector(".pub-rendmenu");

  function paint() {
    const title = titleInput.value.trim();
    const about = aboutInput.value.trim();
    titleOut.textContent = title;
    aboutOut.textContent = about;
    titleOut.classList.toggle("is-empty", !title);
    aboutOut.classList.toggle("is-empty", !about);
    nameEl.textContent = title || "Custom block";
    countEl.hidden = images.length === 0;
    countEl.textContent = String(images.length);
    rows.replaceChildren();
    grid.replaceChildren();
    images.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "pub-filerow";
      row.innerHTML = '<img class="pub-filethumb" alt="" draggable="false"><span class="pub-filemeta"><strong></strong></span><button type="button" class="pub-filemore" aria-label="Remove image"><img src="assets/pub-trash.svg" width="24" height="24" alt="" draggable="false"></button>';
      row.querySelector(".pub-filethumb").src = item.url;
      row.querySelector("strong").textContent = item.name;
      row.querySelector("button").addEventListener("click", () => {
        URL.revokeObjectURL(item.url);
        images.splice(index, 1);
        paint();
      });
      rows.appendChild(row);
      const image = document.createElement("img");
      image.src = item.url;
      image.alt = item.name;
      grid.appendChild(image);
    });
    slot.classList.toggle("is-blank", !title && !about && images.length === 0);
  }

  titleInput.addEventListener("input", paint);
  aboutInput.addEventListener("input", paint);
  card.querySelector("[data-custom-add]").addEventListener("click", () => file.click());
  file.addEventListener("change", () => {
    [...(file.files || [])].forEach((picked) => {
      const name = picked.name.replace(/\.[^.]+$/, "") || picked.name;
      images.push({ url: URL.createObjectURL(picked), name });
    });
    file.value = "";
    paint();
  });
  button.addEventListener("click", () => {
    document.querySelectorAll(".pub-rendmenu").forEach((other) => {
      if (other !== menu) other.hidden = true;
    });
    const open = menu.hidden;
    menu.hidden = !open;
    button.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.addEventListener("click", (event) => {
    const action = event.target.closest("[data-block-action]");
    if (!action) return;
    if (action.dataset.blockAction === "remove") {
      images.forEach((item) => URL.revokeObjectURL(item.url));
      card.remove();
      slot.remove();
      return;
    }
    const hidden = slot.classList.toggle("is-off");
    action.querySelector("span").textContent = hidden ? "Show block" : "Hide block";
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  });

  bindCardDrag(card);
  syncPreviewOrder();
}

document.getElementById("custom-add").addEventListener("click", addCustomBlock);

let blockDrag = null;

function placeDragPlaceholder(clientY) {
  const label = document.querySelector(".pub-suggest");
  const placeholder = blockDrag.placeholder;
  const others = [...document.querySelectorAll(".pub-panel .pub-card.is-added[data-preview]")];
  let before = null;
  for (const other of others) {
    const head = other.querySelector(".pub-cardhead").getBoundingClientRect();
    if (clientY < head.top + head.height / 2) {
      before = other;
      break;
    }
  }
  const anchor = before || label;
  if (anchor.previousElementSibling === placeholder) return;
  const first = new Map(others.map((card) => [card, card.getBoundingClientRect().top]));
  if (before) before.before(placeholder);
  else label.before(placeholder);
  others.forEach((card) => {
    const shift = first.get(card) - card.getBoundingClientRect().top;
    if (!shift) return;
    card.style.transition = "none";
    card.style.transform = `translateY(${shift}px)`;
    requestAnimationFrame(() => {
      card.style.transition = "transform .16s ease";
      card.style.transform = "";
    });
  });
}

function stepBlockDrag() {
  if (!blockDrag || !blockDrag.active) return;
  const panel = document.querySelector(".pub-panel");
  const box = panel.getBoundingClientRect();
  const y = blockDrag.y;
  if (y < box.top + 56) panel.scrollTop -= 12;
  else if (y > box.bottom - 56) panel.scrollTop += 12;
  blockDrag.card.style.top = (y - blockDrag.offsetY) + "px";
  placeDragPlaceholder(y);
  blockDrag.raf = requestAnimationFrame(stepBlockDrag);
}

function finishBlockDrag(commit) {
  if (!blockDrag) return;
  const drag = blockDrag;
  blockDrag = null;
  if (drag.raf) cancelAnimationFrame(drag.raf);
  if (drag.active && drag.placeholder && drag.placeholder.isConnected) {
    drag.placeholder.replaceWith(drag.card);
  }
  drag.card.classList.remove("is-dragging");
  drag.card.style.left = "";
  drag.card.style.top = "";
  drag.card.style.width = "";
  drag.card.style.transform = "";
  drag.card.style.transition = "";
  document.querySelectorAll(".pub-panel .pub-card.is-added").forEach((card) => {
    card.style.transform = "";
    card.style.transition = "";
  });
  try { editor.releasePointerCapture(drag.pointerId); } catch (error) {}
  document.body.classList.remove("is-blockdrag");
  if (drag.active && commit) {
    suppressCardClick = true;
    syncPreviewOrder();
    setTimeout(() => { suppressCardClick = false; }, 50);
  }
}

function bindCardDrag(card) {
  const head = card.querySelector(".pub-cardhead");
  head.addEventListener("dragstart", (event) => event.preventDefault());
  head.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || !card.classList.contains("is-added")) return;
    if (event.target.closest("button, a, input, textarea, .pub-menu, .pub-addwrap")) return;
    if (blockDrag) finishBlockDrag(true);
    event.preventDefault();
    blockDrag = {
      card,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      y: event.clientY,
      active: false,
      head
    };
  });
}

document.addEventListener("pointermove", (event) => {
  if (!blockDrag || event.pointerId !== blockDrag.pointerId) return;
  blockDrag.y = event.clientY;
  if (blockDrag.active) {
    blockDrag.card.style.top = (event.clientY - blockDrag.offsetY) + "px";
    return;
  }
  const dx = event.clientX - blockDrag.startX;
  const dy = event.clientY - blockDrag.startY;
  if (dx * dx + dy * dy < 36) return;
  const card = blockDrag.card;
  const rect = card.getBoundingClientRect();
  const placeholder = document.createElement("div");
  placeholder.className = "pub-dragplaceholder";
  card.before(placeholder);
  editor.appendChild(card);
  card.classList.add("is-dragging");
  card.style.left = rect.left + "px";
  card.style.width = rect.width + "px";
  card.style.top = rect.top + "px";
  blockDrag.offsetY = event.clientY - rect.top;
  blockDrag.placeholder = placeholder;
  blockDrag.active = true;
  try { editor.setPointerCapture(event.pointerId); } catch (error) {}
  document.body.classList.add("is-blockdrag");
  document.querySelectorAll(".pub-rendmenu").forEach((menu) => { menu.hidden = true; });
  blockDrag.raf = requestAnimationFrame(stepBlockDrag);
});

document.addEventListener("pointerup", (event) => {
  if (!blockDrag || event.pointerId !== blockDrag.pointerId) return;
  const drag = blockDrag;
  const wasClick = !drag.active;
  finishBlockDrag(true);
  if (!wasClick) return;
  suppressCardClick = true;
  const open = drag.card.classList.toggle("is-open");
  drag.head.setAttribute("aria-expanded", open ? "true" : "false");
  setTimeout(() => { suppressCardClick = false; }, 50);
});

document.addEventListener("pointercancel", (event) => {
  if (!blockDrag || (event.pointerId && event.pointerId !== blockDrag.pointerId)) return;
  finishBlockDrag(true);
});

document.querySelectorAll(".pub-card.is-added[data-preview], .pub-card[data-preview]").forEach((card) => {
  if (!card.dataset.boundDrag) {
    card.dataset.boundDrag = "1";
    bindCardDrag(card);
  }
});

const contactEmail = document.getElementById("pub-contact-email-input");
const contactPhone = document.getElementById("pub-contact-phone-input");
const contactMail = document.getElementById("pub-contact-mail");
const previewPhone = document.getElementById("pub-contact-phone");
function paintContactMail() {
  const value = contactEmail.value.trim();
  if (!value) {
    contactMail.removeAttribute("href");
    contactMail.setAttribute("aria-disabled", "true");
    return;
  }
  contactMail.href = "mailto:" + value;
  contactMail.removeAttribute("aria-disabled");
}
contactEmail.addEventListener("input", paintContactMail);
contactPhone.addEventListener("input", () => {
  const value = contactPhone.value.trim();
  const dial = value.replace(/[^\d+]/g, "");
  previewPhone.href = dial ? "tel:" + dial : "";
  previewPhone.hidden = !dial;
  previewPhone.setAttribute("aria-label", value ? "Call " + value : "Call");
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".pub-addwrap")) return;
  document.querySelectorAll(".pub-rendmenu").forEach((menu) => { menu.hidden = true; });
  document.querySelectorAll(".pub-addwrap > button").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
});

const planCard = document.getElementById("plan-card");
const planBlock = document.querySelector(".pub-planblock");
function setPlanFilled(on) {
  planCard.classList.toggle("has-plan", on);
  planBlock.classList.toggle("has-plan", on);
}
document.getElementById("pub-plan-select").addEventListener("click", () => setPlanFilled(true));
const planMore = document.getElementById("plan-more");
const planFileMenu = document.getElementById("plan-file-menu");
planMore.addEventListener("click", () => {
  const open = planFileMenu.hidden;
  document.querySelectorAll(".pub-rendmenu").forEach((menu) => { menu.hidden = true; });
  planFileMenu.hidden = !open;
  planMore.setAttribute("aria-expanded", open ? "true" : "false");
});
planFileMenu.addEventListener("click", (event) => {
  const action = event.target.closest("[data-plan-action]");
  if (!action) return;
  planFileMenu.hidden = true;
  planMore.setAttribute("aria-expanded", "false");
  setPlanFilled(false);
});

const panoCard = document.getElementById("pano-card");
const panoBlock = document.querySelector(".pub-panoblock");
function setPanoFilled(on) {
  panoCard.classList.toggle("has-pano", on);
  panoBlock.classList.toggle("has-pano", on);
}
document.getElementById("pub-pano-select").addEventListener("click", () => setPanoFilled(true));
const panoMore = document.getElementById("pano-more");
const panoFileMenu = document.getElementById("pano-file-menu");
panoMore.addEventListener("click", () => {
  const open = panoFileMenu.hidden;
  document.querySelectorAll(".pub-rendmenu").forEach((menu) => { menu.hidden = true; });
  panoFileMenu.hidden = !open;
  panoMore.setAttribute("aria-expanded", open ? "true" : "false");
});
panoFileMenu.addEventListener("click", (event) => {
  const action = event.target.closest("[data-pano-action]");
  if (!action) return;
  panoFileMenu.hidden = true;
  panoMore.setAttribute("aria-expanded", "false");
  setPanoFilled(false);
});

const walkCard = document.getElementById("walk-card");
const walkBlock = document.querySelector(".pub-walkblock");
function setWalkFilled(on) {
  walkCard.classList.toggle("has-walk", on);
  walkBlock.classList.toggle("has-walk", on);
}
document.getElementById("pub-walk-select").addEventListener("click", () => setWalkFilled(true));
const walkMore = document.getElementById("walk-more");
const walkFileMenu = document.getElementById("walk-file-menu");
walkMore.addEventListener("click", () => {
  const open = walkFileMenu.hidden;
  document.querySelectorAll(".pub-rendmenu").forEach((menu) => { menu.hidden = true; });
  walkFileMenu.hidden = !open;
  walkMore.setAttribute("aria-expanded", open ? "true" : "false");
});
walkFileMenu.addEventListener("click", (event) => {
  const action = event.target.closest("[data-walk-action]");
  if (!action) return;
  walkFileMenu.hidden = true;
  walkMore.setAttribute("aria-expanded", "false");
  setWalkFilled(false);
});

const moreWrap = document.querySelector(".pub-morewrap");
const moreButton = document.getElementById("pub-more");
const moreMenu = document.getElementById("pub-detail-menu");
const moreFields = document.getElementById("pub-extra");
const moreHint = document.getElementById("pub-more-hint");
const detailNames = { location: "Location", year: "Year", tags: "Tags", price: "Price" };

function setMenuOpen(open) {
  moreMenu.hidden = !open;
  moreButton.setAttribute("aria-expanded", open ? "true" : "false");
}

moreButton.addEventListener("click", () => {
  setMenuOpen(moreMenu.hidden);
});

moreMenu.addEventListener("click", (event) => {
  const choice = event.target.closest("[data-detail]");
  if (!choice) return;
  const key = choice.dataset.detail;
  moreFields.hidden = false;
  moreFields.querySelectorAll(`[data-detail="${key}"]`).forEach((node) => {
    node.hidden = false;
  });
  editor.querySelectorAll(`.pub-meta [data-detail="${key}"]`).forEach((node) => {
    node.hidden = false;
  });
  const preview = editor.querySelector(".pub-preview");
  preview.classList.toggle("is-details", Boolean(editor.querySelector('.pub-meta [data-detail]:not([hidden])')));
  choice.remove();
  const left = [...moreMenu.querySelectorAll("[data-detail]")].map((node) => detailNames[node.dataset.detail]);
  moreHint.textContent = left.join(", ");
  moreWrap.hidden = left.length === 0;
  setMenuOpen(false);
  const input = moreFields.querySelector(`[data-detail="${key}"] input`);
  if (input) input.focus();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".pub-morewrap")) setMenuOpen(false);
});

function mirror(inputId, targetId, emptyText) {
  const input = document.getElementById(inputId);
  const target = document.getElementById(targetId);
  input.addEventListener("input", () => {
    const value = input.value.trim();
    target.textContent = value || emptyText;
    target.classList.toggle("is-empty", !value);
    target.classList.toggle("is-set", Boolean(value));
    if (value) input.closest(".pub-field")?.classList.remove("is-missing");
  });
}

const coverInput = document.getElementById("pub-cover-input");
const coverSlot = document.getElementById("cover-slot");
const coverCard = document.querySelector(".pub-covercard");
const coverFile = coverCard.querySelector(".pub-coverfile");
let coverUrl = "";

function paintCover(url, name, date) {
  let image = coverSlot.querySelector(".pub-coverimg");
  if (!image) {
    image = document.createElement("img");
    image.className = "pub-coverimg";
    image.alt = "";
    coverSlot.appendChild(image);
  }
  image.src = url;
  coverSlot.classList.add("has-image");
  document.getElementById("pub-cover-thumb").src = url;
  document.getElementById("pub-cover-name").textContent = name;
  document.getElementById("pub-cover-date").textContent = date;
  coverCard.classList.add("has-file");
  coverCard.classList.remove("is-missing");
  coverFile.hidden = false;
}

function showCover(file) {
  if (coverUrl) URL.revokeObjectURL(coverUrl);
  coverUrl = URL.createObjectURL(file);
  paintCover(coverUrl, file.name, new Date(file.lastModified).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }));
}

document.getElementById("pub-cover-upload").addEventListener("click", () => {
  if (coverUrl) {
    URL.revokeObjectURL(coverUrl);
    coverUrl = "";
  }
  paintCover("assets/pub-cover-sample.png", "img.png", "12 Jan 2026");
});

coverInput.addEventListener("change", () => {
  const file = coverInput.files && coverInput.files[0];
  if (file) showCover(file);
});

coverSlot.addEventListener("click", () => {
  if (!coverSlot.classList.contains("has-image")) coverInput.click();
});
coverSlot.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!coverSlot.classList.contains("has-image")) coverInput.click();
  }
});
function clearCover() {
  if (coverUrl) {
    URL.revokeObjectURL(coverUrl);
    coverUrl = "";
  }
  coverCard.classList.remove("has-file");
  coverFile.hidden = true;
  coverSlot.classList.remove("has-image");
  const image = coverSlot.querySelector(".pub-coverimg");
  if (image) image.remove();
}

const coverMore = document.getElementById("pub-cover-more");
const coverMenu = document.getElementById("cover-menu");
coverMore.addEventListener("click", () => {
  const open = coverMenu.hidden;
  document.querySelectorAll(".pub-rendmenu").forEach((menu) => { menu.hidden = true; });
  coverMenu.hidden = !open;
  coverMore.setAttribute("aria-expanded", open ? "true" : "false");
});
coverMenu.addEventListener("click", (event) => {
  const action = event.target.closest("[data-cover-action]");
  if (!action) return;
  coverMenu.hidden = true;
  coverMore.setAttribute("aria-expanded", "false");
  if (action.dataset.coverAction === "change") coverInput.click();
  else clearCover();
});

const rendersInput = document.getElementById("pub-renders-input");
const rendGrid = document.getElementById("pub-rendgrid");
const rendersCard = document.getElementById("renders-card");
const rendersRows = document.getElementById("renders-rows");
const rendersCount = document.getElementById("renders-count");
const renders = [];
let dragRender = null;

function renderDate(file) {
  return new Date(file.lastModified).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function emptyDrop() {
  const slot = document.createElement("button");
  slot.type = "button";
  slot.className = "pub-drop";
  slot.setAttribute("aria-label", "Add render");
  slot.innerHTML = '<img src="assets/pub-image.svg" width="24" height="24" alt=""><span class="pub-slothover" aria-hidden="true"><img src="assets/pub-upload-blue.svg" width="24" height="24" alt=""></span>';
  return slot;
}

function paintRenderPreview() {
  const needed = Math.max(2, renders.length);
  while (rendGrid.children.length < needed) rendGrid.appendChild(emptyDrop());
  [...rendGrid.children].forEach((slot, index) => {
    const item = renders[index];
    if (!item) {
      if (index >= 2) {
        slot.remove();
        return;
      }
      slot.classList.remove("has-image");
      slot.setAttribute("aria-label", "Add render");
      const image = slot.querySelector(".pub-rendimg");
      if (image) image.remove();
      return;
    }
    let image = slot.querySelector(".pub-rendimg");
    if (!image) {
      image = document.createElement("img");
      image.className = "pub-rendimg";
      image.alt = "";
      slot.appendChild(image);
    }
    image.src = item.url;
    slot.classList.add("has-image");
    slot.setAttribute("aria-label", "Replace render");
  });
}

function paintRenders() {
  const filled = renders.length > 0;
  rendersCard.classList.toggle("has-files", filled);
  document.querySelector(".pub-rendersblock").classList.toggle("has-images", filled);
  rendersCount.hidden = !filled;
  rendersCount.textContent = String(renders.length);
  rendersRows.replaceChildren();
  renders.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "pub-filerow";
    row.draggable = true;
    row.innerHTML = '<span class="pub-drag" aria-hidden="true"></span><span class="pub-filenum"></span><img class="pub-filethumb" alt="" draggable="false"><span class="pub-filemeta"><strong></strong><small></small></span><button type="button" class="pub-filemore" aria-label="Remove render"><img src="assets/pub-more.svg" width="24" height="24" alt="" draggable="false"></button>';
    row.querySelector(".pub-filenum").textContent = "#" + (index + 1);
    row.querySelector(".pub-filethumb").src = item.url;
    row.querySelector("strong").textContent = item.name;
    row.querySelector("small").textContent = item.date;
    row.querySelector("button").addEventListener("click", () => {
      if (!item.sample) URL.revokeObjectURL(item.url);
      renders.splice(index, 1);
      paintRenders();
    });
    row.addEventListener("dragstart", (event) => {
      if (event.target.closest(".pub-filemore")) {
        event.preventDefault();
        return;
      }
      dragRender = index;
      row.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(index));
    });
    row.addEventListener("dragend", () => {
      dragRender = null;
      rendersRows.querySelectorAll(".pub-filerow").forEach((node) => node.classList.remove("is-dragging", "is-over"));
    });
    row.addEventListener("dragover", (event) => {
      if (dragRender === null || dragRender === index) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      rendersRows.querySelectorAll(".pub-filerow").forEach((node, place) => {
        node.classList.toggle("is-over", place === index);
      });
    });
    row.addEventListener("drop", (event) => {
      event.preventDefault();
      const from = dragRender;
      dragRender = null;
      if (from === null || from === index) return;
      const [moved] = renders.splice(from, 1);
      renders.splice(index, 0, moved);
      paintRenders();
    });
    rendersRows.appendChild(row);
  });
  paintRenderPreview();
}

document.getElementById("pub-add-renders").addEventListener("click", () => {
  if (renders.length) return;
  [
    ["assets/render-kitchen.png", "Kitchen"],
    ["assets/render-bedroom.png", "Bedroom"],
    ["assets/render-living.png", "Living room"]
  ].forEach(([url, name]) => {
    renders.push({ url, name, date: "12 Jan 2026", sample: true });
  });
  paintRenders();
});

function renderFile(file) {
  const name = file.name.replace(/\.[^.]+$/, "");
  return {
    url: URL.createObjectURL(file),
    name: name || file.name,
    date: renderDate(file)
  };
}

rendersInput.addEventListener("change", () => {
  [...(rendersInput.files || [])].forEach((file) => renders.push(renderFile(file)));
  rendersInput.value = "";
  paintRenders();
});

const renderReplace = document.getElementById("pub-render-replace");
let replaceIndex = null;
renderReplace.addEventListener("change", () => {
  const file = renderReplace.files && renderReplace.files[0];
  const index = replaceIndex;
  replaceIndex = null;
  renderReplace.value = "";
  if (!file || index === null || !renders[index]) return;
  if (!renders[index].sample) URL.revokeObjectURL(renders[index].url);
  renders[index] = renderFile(file);
  paintRenders();
});
rendGrid.addEventListener("click", (event) => {
  const slot = event.target.closest(".pub-drop");
  if (!slot) return;
  const index = [...rendGrid.children].indexOf(slot);
  if (slot.classList.contains("has-image")) {
    replaceIndex = index;
    renderReplace.click();
    return;
  }
  rendersInput.click();
});

mirror("pub-title-input", "pub-title", "Untitled project");
mirror("pub-about-input", "pub-about", "Tell visitors about the project in Project details");
mirror("pub-location-input", "pub-location", "Location");
mirror("pub-year-input", "pub-year", "Year");

const priceInput = document.getElementById("pub-price-input");
const priceOut = document.getElementById("pub-price");
priceInput.addEventListener("input", () => {
  const value = priceInput.value.trim();
  priceOut.hidden = !value;
  priceOut.textContent = value;
});

const tagInput = document.getElementById("pub-tag-input");
const tagList = document.getElementById("pub-tags");
const tagPreview = document.getElementById("pub-tags-preview");
let tags = [];

function paintTags() {
  tagList.replaceChildren();
  tagPreview.replaceChildren();
  tags.forEach((tag) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "pub-tag";
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      tags = tags.filter((item) => item !== tag);
      paintTags();
    });
    tagList.appendChild(chip);
    const shown = document.createElement("span");
    shown.className = "pub-tag";
    shown.textContent = tag;
    tagPreview.appendChild(shown);
  });
}

function addTag() {
  const value = tagInput.value.trim().replace(/,+$/, "");
  tagInput.value = "";
  if (!value || tags.includes(value)) return;
  tags.push(value);
  paintTags();
}

tagInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== ",") return;
  event.preventDefault();
  addTag();
});
tagInput.addEventListener("blur", addTag);

function paintIntegrations() {
  const group = document.querySelector(".int-filters button.on").dataset.int;
  const query = document.getElementById("int-query").value.trim().toLowerCase();
  let shown = 0;
  document.querySelectorAll(".int-group").forEach((section) => {
    let visible = 0;
    section.querySelectorAll(".int-card").forEach((card) => {
      const ok = section.dataset.intGroup === group && card.dataset.name.includes(query);
      card.hidden = !ok;
      if (ok) visible += 1;
    });
    section.hidden = visible === 0;
    shown += visible;
  });
  document.querySelector(".int-empty").hidden = shown > 0;
}

document.querySelector(".int-filters").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  document.querySelectorAll(".int-filters button").forEach((node) => {
    const on = node === button;
    node.classList.toggle("on", on);
    node.setAttribute("aria-checked", on ? "true" : "false");
  });
  paintIntegrations();
});
document.getElementById("int-query").addEventListener("input", paintIntegrations);

const copilot = document.getElementById("copilot");
const copilotInput = document.getElementById("copilot-input");
const copilotThread = document.getElementById("copilot-thread");
const copilotExpand = document.getElementById("copilot-expand");

function setCopilotFull(on) {
  copilot.classList.toggle("is-full", on);
  document.querySelector(".pub-preview").classList.toggle("is-chat-full", on);
  copilotExpand.setAttribute("aria-pressed", on ? "true" : "false");
  copilotExpand.setAttribute("aria-label", on ? "Exit full screen" : "Full screen");
}

copilotExpand.addEventListener("click", () => {
  setCopilotFull(!copilot.classList.contains("is-full"));
});
document.getElementById("copilot-close").addEventListener("click", () => setCopilotFull(false));
document.getElementById("copilot-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = copilotInput.value.trim();
  if (!text) return;
  const bubble = document.createElement("p");
  bubble.className = "copilot-bubble is-mine";
  bubble.textContent = text;
  copilotThread.append(bubble);
  copilotInput.value = "";
  copilotThread.scrollTop = copilotThread.scrollHeight;
});
