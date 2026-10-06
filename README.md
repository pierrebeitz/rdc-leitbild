# rdc-leitbild

Interactive Leitbild highlight for rettungsdienst-cuxland.de: values as bubbles around the vision. Click one → it moves to the center, its text appears beside it.

```sh
python3 -m http.server 5199   # http://localhost:5199
```

No build step. `rdc-leitbild.js` is the whole component.

## Embed (WordPress)

Load `rdc-leitbild.js` as a module script on the page, then put the content in a WPBakery "Raw HTML" block:

```html
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

- First `<article>` starts in the center.
- `<h3>` = bubble title. Long words: add `&shy;` where they may break.
- Focal point: `style="object-position: 40% 50%"` on the `<img>`.
- Without JS the articles render as plain text + images.
