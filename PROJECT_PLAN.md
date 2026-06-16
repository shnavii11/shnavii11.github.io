# PROJECT_PLAN.md — Frosted Card-Stack Portfolio

> Single source of truth for the build. Open Claude Code in this folder and say:
> "Read PROJECT_PLAN.md and start Phase 1." Update the CONTENT and ASSETS
> sections as I gather real material.

---

## 1. Concept

A calm, single-screen portfolio inspired by the "Mini Archive" case video: a small
**stack of frosted-glass cards** floating centered on a soft off-white background.
Click a card and it smoothly expands to a large, readable panel; click again (or an
X) and it eases back into the stack. A small color/theme switcher sits below, like
the swatches in the reference.

This is built in **plain 2D HTML/CSS/JS** — no 3D, no model files. The "depth" comes
from layered cards, blur, soft shadows, and spring easing. Mobile-friendly by default.

## 2. The cards (in stack order)

1. **Cover** — an image I supply (the hero / first impression).
2. **About me** — short intro paragraph.
3. **Project(s)** — my work, with link(s).
4. **Contact** — email / socials / links.

Default state: cards fanned in a slight stack (top card fully visible, others
peeking behind by a few px + slight rotation). Click the top card to expand it; a
small control (dots or arrows) flips through the stack.

## 3. Tech stack (decided)

- Plain **HTML + CSS + vanilla JS** (no framework needed)
- **Vite** as dev server / build (fast reload, easy deploy)
- Animation: **Motion One** library (`motion`, ~5kb) for spring physics on
  expand/collapse/flip. (CSS transitions for simple hover/tint.)
- `backdrop-filter: blur()` for the frosted-glass look
- Deploy: Vercel or Netlify (static)
- Repo: GitHub. IMPORTANT: I am the ONLY collaborator. Do NOT add Claude as a
  collaborator and do NOT add any co-author trailer to commits.

## 4. The look (so it feels smooth + premium)

- **Background:** soft warm off-white (#f4f3f0-ish), faint vignette, lots of space.
- **Card:** rounded ~22px corners, frosted translucent fill
  (`background: rgba(255,255,255,0.55)` + `backdrop-filter: blur(20px)`),
  thin 1px light border, soft layered shadow (a tight dark one + a wide soft one)
  for the floating feel.
- **Label type:** one elegant serif or clean sans for the card title, small muted
  subtitle underneath (echoes "Mini Archive").
- **Stack:** cards behind offset by ~10px y / ~6px x, rotated ~ -3deg / +2deg,
  slightly scaled down and dimmed so the stack reads as depth.
- **Color switcher:** 3 small circular swatches below the stack; clicking one
  re-themes the card accent (tint + label color). Match the video's yellow /
  magenta / black trio, or pick my own palette.

## 5. The motion (the part that must feel right)

Use spring easing, not linear. Target feel: soft, slightly bouncy, quick to start,
gentle to settle (~450-600ms).

- **Hover (desktop):** top card lifts 4-6px, shadow deepens. Subtle.
- **Expand (click):** card scales up + moves to center, grows to a large readable
  panel (~70vw / 80vh, max ~560px wide); inner text fades+slides in ~120ms AFTER
  the shape settles. Rest of the stack fades back / dims.
- **Collapse:** reverse — text fades out first, then card springs back into the stack.
- **Flip through stack:** click a peeking card OR use dots/arrows; chosen card
  animates to top, others reshuffle with staggered spring (~40ms stagger).
- **Theme switch:** accent color cross-fades ~300ms, no layout jump.
- Respect `prefers-reduced-motion`: swap springs for short fades.

KEY PRINCIPLE: animate `transform` and `opacity` only (GPU-friendly) — never animate
width/height/top/left directly. Use scale + translate.

## 6. Build phases (do in order, test in browser after each)

**Phase 1 — Scaffold:** Vite vanilla + `motion`; centered off-white layout; one
static frosted card. Acceptance: one good-looking frosted card centered on localhost.

**Phase 2 — The stack:** render all 4 cards fanned with offsets/rotation/dim;
placeholder content. Acceptance: stack reads as depth, top card clearly on top.

**Phase 3 — Expand/collapse:** click top card -> spring-expand to centered readable
panel; X or click-out closes; stack dims; scroll locked while open. Acceptance:
open/close feels smooth + springy, text readable.

**Phase 4 — Flip through stack:** dots or arrows bring any card to top with staggered
reshuffle; touch swipe. Acceptance: reach all 4 cards on desktop + mobile.

**Phase 5 — Color/theme switcher:** 3 swatches re-tint accent with smooth cross-fade.
Acceptance: switches cleanly, no flash or layout shift.

**Phase 6 — Real content:** drop in image (card 1), about (2), projects+links (3),
contact (4). Acceptance: full portfolio reads, links work.

**Phase 7 — Polish + ship:** tune springs/shadows/type; mobile pass (scale down,
tap targets ≥44px, swipe); reduced-motion fallback; favicon + meta/OG; Lighthouse;
deploy to Vercel/Netlify.

## 7. File structure

```
index.html
/src
  main.js          <- mounts stack, wires interactions
  cards.js         <- card data array (title, subtitle, body, image, link)
  stack.js         <- builds the fanned stack DOM
  motion.js        <- expand/collapse/flip spring animations (Motion One)
  theme.js         <- color switcher
  styles.css       <- frosted-glass + layout + shadows
/public
  /images/cover.jpg   <- I supply this
```
Content lives in ONE place: `cards.js`. Editing the site = editing that array.

## 8. ASSETS — what I supply

- [ ] cover.jpg — image for card 1 (recommend ~1200x1500, portrait-ish)
- [ ] (optional) profile photo for the About card
- [ ] (optional) project thumbnail images
- [ ] color choices for the 3 swatches (or keep yellow/magenta/black)

## 9. CONTENT — paste real text here when ready

- Card 1 (Cover): image filename = ____ | optional overline text = ____
- Card 2 (About): title = ____ | 2-4 sentence intro = ____
- Card 3 (Projects):
  - project name / one-liner / link = ____
  - project name / one-liner / link = ____
- Card 4 (Contact): email = ____ | socials/links = ____
- Site title / browser tab name = ____

## 10. Honest notes

- Achievable and looks great in 2D — no asset bottleneck except your image.
- Make-or-break is the SPRING TIMING in Phase 3/5. Budget iteration time there.
- `backdrop-filter` blur is GPU-light but test on an older phone in Phase 7.
- The literal 3D glass case from the video is a separate, bigger project
  (Three.js + a modeled .glb). Keep this 2D version as the base.
