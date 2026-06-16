// Three watercolor-inspired themes — mist (dragon), coral (lotus), ink (sumi).
// Each shifts: accent color, the page background (a pastel cream tint), and
// the water-flow blob colors that follow the cursor.
const THEMES = [
  {
    id: "mist",
    label: "mist",
    swatch: "#7fb8c9",
    vars: {
      "--accent":        "#7fb8c9",
      "--accent-deep":   "#4f8a9d",
      "--accent-soft":   "rgba(127, 184, 201, 0.22)",
      "--accent-wash":   "rgba(127, 184, 201, 0.10)",
      "--bg-paper":      "#eaf0f2",
      "--bg-paper-deep": "#d4dfe3",
      "--water-a":       "rgba(95, 158, 178, 0.85)",
      "--water-b":       "rgba(150, 198, 210, 0.80)",
    },
  },
  {
    id: "coral",
    label: "coral",
    swatch: "#d97b6a",
    vars: {
      "--accent":        "#d97b6a",
      "--accent-deep":   "#a94a3b",
      "--accent-soft":   "rgba(217, 123, 106, 0.22)",
      "--accent-wash":   "rgba(217, 123, 106, 0.10)",
      "--bg-paper":      "#f5e7e0",
      "--bg-paper-deep": "#e6c9bd",
      "--water-a":       "rgba(200, 95, 78, 0.80)",
      "--water-b":       "rgba(225, 160, 140, 0.78)",
    },
  },
  {
    id: "sumi",
    label: "sumi",
    swatch: "#5a5e63",
    vars: {
      "--accent":        "#5a5e63",
      "--accent-deep":   "#2f3236",
      "--accent-soft":   "rgba(90, 94, 99, 0.22)",
      "--accent-wash":   "rgba(90, 94, 99, 0.08)",
      "--bg-paper":      "#e8e7e3",
      "--bg-paper-deep": "#d0cec9",
      "--water-a":       "rgba(55, 60, 68, 0.70)",
      "--water-b":       "rgba(140, 138, 134, 0.65)",
    },
  },
];

export function buildThemeSwitcher(rootEl, onChange) {
  rootEl.innerHTML = "";
  let active = 0;
  THEMES.forEach((t, i) => {
    const b = document.createElement("button");
    b.className = "swatch";
    b.style.background = t.swatch;
    b.setAttribute("aria-label", `${t.label} theme`);
    if (i === 0) b.classList.add("is-active");
    b.addEventListener("click", () => {
      if (i === active) return;
      active = i;
      Array.from(rootEl.children).forEach((c, ci) => c.classList.toggle("is-active", ci === i));
      applyTheme(t);
      onChange?.(t);
    });
    rootEl.appendChild(b);
  });
  applyTheme(THEMES[0]);
}

function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
}
