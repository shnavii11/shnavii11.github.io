// Builds the fanned card stack DOM.
import { cards } from "./cards.js";

function renderInner(card) {
  switch (card.kind) {
    case "cover":
      return `
        <div class="card-inner card-inner--cover">
          <figure class="stamp stamp--full" aria-label="Cover image">
            <img src="${card.image}" alt="Portfolio cover" draggable="false" />
          </figure>
        </div>`;
    case "about":
      return `
        <div class="card-inner">
          <div class="about-block">
            <div class="about-tags">${card.tags.join(" · ")}</div>
            <h2 class="card-title about-title">${card.title}</h2>
          </div>
        </div>`;
    case "projects":
      return `
        <div class="card-inner">
          <div class="card-overline">${card.overline}</div>
          <h2 class="card-title">${card.title}</h2>
          <div class="card-subtitle">${card.subtitle}</div>
          <ul class="project-list">
            ${card.projects.map(p => `
              <li>
                <a href="${p.link}" target="_blank" rel="noopener">${p.name}</a>
                <span class="one-liner">${p.one}</span>
              </li>`).join("")}
          </ul>
        </div>`;
    case "contact":
      return `
        <div class="card-inner">
          <div class="card-overline">${card.overline}</div>
          <h2 class="card-title">${card.title}</h2>
          <div class="card-subtitle">${card.subtitle}</div>
          <ul class="contact-list">
            ${card.contacts.map(c => `
              <li>
                <span class="lbl">${c.lbl}</span>
                <a href="${c.href}" target="_blank" rel="noopener">${c.text}</a>
              </li>`).join("")}
          </ul>
        </div>`;
  }
  return "";
}

export function buildStack(rootEl, dotsEl) {
  rootEl.innerHTML = "";
  dotsEl.innerHTML = "";

  cards.forEach((card, i) => {
    const el = document.createElement("article");
    el.className = `card card--${card.kind}`;
    el.dataset.id = card.id;
    el.dataset.index = String(i);
    el.setAttribute("role", "listitem");
    el.setAttribute("tabindex", "0");
    el.innerHTML = renderInner(card);
    rootEl.appendChild(el);

    const dot = document.createElement("button");
    dot.className = "dot";
    dot.dataset.index = String(i);
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Go to card ${i + 1}: ${card.title || card.id}`);
    dotsEl.appendChild(dot);
  });

  return Array.from(rootEl.children);
}
