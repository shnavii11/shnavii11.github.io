import "./styles.css";
import { buildStack } from "./stack.js";
import { arrangeStack } from "./motion.js";
import { buildThemeSwitcher } from "./theme.js";

const stackEl   = document.getElementById("stack");
const dotsEl    = document.getElementById("dots");
const prevEl    = document.getElementById("prev");
const nextEl    = document.getElementById("next");
const themesEl  = document.getElementById("themes");

const cards = buildStack(stackEl, dotsEl);
const dots  = Array.from(dotsEl.children);
let topIdx  = 0;

function syncDots() {
  dots.forEach((d, i) => d.classList.toggle("is-active", i === topIdx));
}
function syncTopClass() {
  cards.forEach((c, i) => c.classList.toggle("is-top", i === topIdx));
}
function setTop(i) {
  topIdx = ((i % cards.length) + cards.length) % cards.length;
  arrangeStack(cards, topIdx);
  syncDots();
  syncTopClass();
}

// --- Interactions: any card click -> bring to top ----------
cards.forEach((card, i) => {
  card.addEventListener("click", (e) => {
    // links inside the top card still work
    if (i === topIdx && e.target.closest("a")) return;
    if (i !== topIdx) setTop(i);
  });
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setTop(i);
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft")  setTop(topIdx - 1);
  if (e.key === "ArrowRight") setTop(topIdx + 1);
});

prevEl.addEventListener("click", () => setTop(topIdx - 1));
nextEl.addEventListener("click", () => setTop(topIdx + 1));
dots.forEach((d, i) => d.addEventListener("click", () => setTop(i)));

// Touch swipe
const stage = document.querySelector(".stage");
let touchStartX = 0;
let touchStartY = 0;
stage.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });
stage.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
  setTop(dx < 0 ? topIdx + 1 : topIdx - 1);
}, { passive: true });

// --- Theme --------------------------------------------------
buildThemeSwitcher(themesEl, () => {});

// --- Cursor-follow water (cheap: just smoothed translate) --
(function water() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const blobs = Array.from(document.querySelectorAll(".water-blob")).map((el, i) => ({
    el,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    k: i === 0 ? 0.16 : 0.085,
  }));
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  window.addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
  window.addEventListener("touchmove", (e) => {
    if (e.touches[0]) { mx = e.touches[0].clientX; my = e.touches[0].clientY; }
  }, { passive: true });
  function tick() {
    for (const b of blobs) {
      b.x += (mx - b.x) * b.k;
      b.y += (my - b.y) * b.k;
      b.el.style.transform = `translate3d(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

// --- Initial arrangement ------------------------------------
cards.forEach((el) => { el.style.transformOrigin = "50% 65%"; });
arrangeStack(cards, topIdx);
syncDots();
syncTopClass();
