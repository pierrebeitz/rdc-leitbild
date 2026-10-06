// <rdc-leitbild>: each child <article> becomes a bubble + panel.
// First article without <img> is the start (center) bubble.
const css = `
:host {
  --teal: #004055;
  --yellow: #e2ec2b;
  --ease: cubic-bezier(.5, -.25, .25, 1.25);
  --title-font: "Roboto Condensed", "Arial Narrow", sans-serif;
  display: block;
  container-type: inline-size;
}
.wrap {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 5cqi, 4rem);
  align-items: center;
}
@container (max-width: 720px) {
  .wrap { grid-template-columns: 1fr; }
}

.stage {
  position: relative;
  container-type: inline-size;
  aspect-ratio: 1;
  width: 100%;
  max-width: 560px;
  margin-inline: auto;
}
.bubble {
  --r: 36.5cqi;
  --a: calc(var(--slot) * 60deg - 150deg);
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40%;
  aspect-ratio: 1;
  translate: calc(-50% + cos(var(--a)) * var(--r)) calc(-50% + sin(var(--a)) * var(--r));
  scale: .66;
  transition: translate .8s var(--ease), scale .8s var(--ease);
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  font: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.bubble:hover { scale: .71; }
.bubble[aria-selected="true"] { --r: 0cqi; scale: 1; z-index: 1; cursor: default; }
.bubble:focus-visible { outline: none; }
.bubble:focus-visible .float { box-shadow: 0 0 0 .5cqi #fff, 0 0 0 1.4cqi var(--teal); }

.float {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, #0d6680, var(--teal) 70%);
  box-shadow: 0 0 0 .9cqi #fff, 0 2cqi 5cqi rgb(0 64 85 / .3);
  transition: box-shadow .5s;
  animation: bob 7s ease-in-out calc(var(--i) * -1.7s) infinite alternate;
}
[aria-selected="true"] .float { box-shadow: 0 0 0 .9cqi var(--yellow), 0 3cqi 7cqi rgb(0 64 85 / .35); }
@keyframes bob {
  0% { transform: translate(-1.5%, -2.5%); }
  50% { transform: translate(2%, .5%); }
  100% { transform: translate(-.5%, 2.5%); }
}

img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: scale .8s var(--ease);
}
.bubble:hover img { scale: 1.08; }
img + .title::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgb(0 64 85 / .55);
  transition: opacity .6s;
}
.title {
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10%;
  color: #fff;
  font: 700 max(17px, 5.4cqi)/1.05 var(--title-font);
  text-align: center;
  text-shadow: 0 1px 6px rgb(0 0 0 / .3);
  transition: opacity .5s;
}
[aria-selected="true"] img + .title,
[aria-selected="true"] img + .title::before { opacity: 0; }

.panel { display: grid; }
.panel > section {
  grid-area: 1 / 1;
  visibility: hidden;
  opacity: 0;
  translate: 0 1rem;
  transition: opacity .3s, translate .3s, visibility 0s .3s;
}
.panel > section.on {
  visibility: visible;
  opacity: 1;
  translate: 0 0;
  transition: opacity .5s .25s, translate .5s .25s;
}
h3 {
  margin: 0 0 .4em;
  color: var(--teal);
  font: 700 clamp(1.8rem, 1.2rem + 3cqi, 2.8rem)/1.1 var(--title-font);
}
h3::after {
  content: "";
  display: block;
  width: 3rem;
  height: .3rem;
  margin-top: .35em;
  border-radius: 1rem;
  background: var(--yellow);
}
p { margin: 0 0 1em; line-height: 1.6; }
em { display: block; color: var(--teal); font-size: 1.2em; line-height: 1.35; }

@media (prefers-reduced-motion: reduce) {
  *, *::before { animation: none !important; transition-duration: 0s !important; transition-delay: 0s !important; }
}
`;

class RdcLeitbild extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const articles = [...this.querySelectorAll(":scope > article")];
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `<style>${css}</style><div class="wrap"><div class="stage" role="tablist" aria-label="Leitbild"></div><div class="panel"></div></div>`;
    const [stage, panel] = root.querySelector(".wrap").children;
    let slot = 1;

    this.tabs = articles.map((article, i) => {
      const img = article.querySelector("img");
      const title = article.querySelector("h3")?.textContent ?? "";
      const tab = document.createElement("button");
      tab.className = "bubble";
      tab.id = `tab-${i}`;
      tab.role = "tab";
      tab.lang = "de";
      tab.setAttribute("aria-controls", `panel-${i}`);
      tab.style.setProperty("--i", i);
      tab.style.setProperty("--slot", i === 0 ? 0 : slot++);
      tab.innerHTML = `<span class="float"></span>`;
      if (img) tab.firstChild.append(Object.assign(img.cloneNode(), { alt: "" }));
      tab.firstChild.insertAdjacentHTML("beforeend", `<span class="title"></span>`);
      tab.querySelector(".title").textContent = title;
      tab.onclick = () => this.select(i);
      stage.append(tab);

      const section = document.createElement("section");
      section.id = `panel-${i}`;
      section.role = "tabpanel";
      section.setAttribute("aria-labelledby", tab.id);
      section.append(...[...article.children].filter((el) => el.tagName !== "IMG").map((el) => el.cloneNode(true)));
      panel.append(section);
      return tab;
    });

    stage.onkeydown = (e) => {
      const n = this.tabs.length;
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      const to = step ? (this.current + step + n) % n : { Home: 0, End: n - 1 }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      this.select(to);
      this.tabs[to].focus();
    };
    this.select(0);
  }

  select(i) {
    const prev = this.tabs[this.current];
    const next = this.tabs[i];
    if (prev && prev !== next) prev.style.setProperty("--slot", next.style.getPropertyValue("--slot"));
    this.current = i;
    this.tabs.forEach((tab, j) => {
      tab.setAttribute("aria-selected", j === i);
      tab.tabIndex = j === i ? 0 : -1;
    });
    this.shadowRoot.querySelectorAll("section").forEach((s, j) => s.classList.toggle("on", j === i));
  }
}

customElements.define("rdc-leitbild", RdcLeitbild);
