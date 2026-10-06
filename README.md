# rdc-leitbild

Interactive Leitbild highlight for rettungsdienst-cuxland.de: values as bubbles around the vision. Click one → it moves to the center, its text appears beside it.

```sh
python3 -m http.server 5199   # http://localhost:5199
```

No build step. `rdc-leitbild.js` is the whole component.

## Embed (WordPress)

1. Build the plugin zip: `cd .. && zip rdc-leitbild.zip rdc-leitbild/rdc-leitbild.php rdc-leitbild/rdc-leitbild.js`
2. WP admin → Plugins → Upload → activate "RDC Leitbild"
3. Upload the photos to the media library (square, ~480px)
4. Put the content in a WPBakery "Raw HTML" block:

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
- Non-square photo? Set the focal point: `style="object-position: 40% 50%"` on the `<img>`.
- Without JS the articles render as plain text (images hidden by the plugin).
