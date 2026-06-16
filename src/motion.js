// Spring motion for stack flip — Motion One.
import { animate } from "motion";

const SPRING_STIFF = { type: "spring", stiffness: 320, damping: 28, mass: 0.9 };
const SPRING_SOFT  = { type: "spring", stiffness: 220, damping: 26, mass: 0.95 };
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Resting transform for each card given the current top index. */
export function restingTransform(cardIdx, topIdx, total) {
  const rel = ((cardIdx - topIdx) + total) % total;
  if (rel === 0) {
    return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 100 };
  }
  const sign = rel % 2 === 0 ? -1 : 1;
  const depth = rel;
  return {
    x: sign * (8 + depth * 4),
    y: 14 + depth * 10,
    rotate: sign * (2.5 + depth * 0.6),
    scale: 1 - depth * 0.04,
    opacity: Math.max(0.55, 1 - depth * 0.18),
    zIndex: 100 - depth,
  };
}

export function settle(el, t, opts = {}) {
  const { delay = 0, spring = SPRING_STIFF } = opts;
  if (t.zIndex !== undefined) {
    setTimeout(() => { el.style.zIndex = String(t.zIndex); }, delay * 1000 + 80);
  }
  const anim = REDUCED ? { duration: 0.001 } : { ...spring, delay };
  return animate(
    el,
    { x: t.x, y: t.y, rotate: t.rotate, scale: t.scale, opacity: t.opacity },
    anim,
  );
}

export function arrangeStack(cards, topIdx) {
  cards.forEach((el, i) => {
    const target = restingTransform(i, topIdx, cards.length);
    const rel = ((i - topIdx) + cards.length) % cards.length;
    settle(el, target, {
      delay: rel * 0.03,
      spring: rel === 0 ? SPRING_STIFF : SPRING_SOFT,
    });
  });
}
