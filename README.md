# rdc-leitbild

Interactive Leitbild highlight for rettungsdienst-cuxland.de: values as floating bubbles, click one → it moves to the center, text appears beside it.

```sh
npm install
npm run dev   # http://localhost:5173
```

## Embed (WordPress / WPBakery "Raw HTML")

Upload `src/rdc-leitbild.js` and the photos, then:

```html
<script type="module" src="/wp-content/uploads/rdc-leitbild.js"></script>
<rdc-leitbild>
  <article>
    <h3>Unsere Vision</h3>
    <p>…</p>
  </article>
  <article>
    <img src="…/regionalitaet.jpg" alt="…">
    <h3>Regio&shy;nalität</h3>
    <p><em>Untertitel</em></p>
    <p>Text …</p>
  </article>
  <!-- … -->
</rdc-leitbild>
```

- First `<article>` without `<img>` = center bubble on load.
- `<h3>` = bubble title. Long words: add `&shy;` where they may break.
- Focal point: `style="object-position: 40% 50%"` on the `<img>`.
- Without JS the articles render as plain text + images.
