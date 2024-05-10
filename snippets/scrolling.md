# Tiling en scrolling Background

### Tiling background

Om een achtergrond eindeloos te kunnen herhalen moet je ***wrapping*** aanzetten in de image loader.

```js
const Resources = {
    Background: new ImageSource('images/background.png', { wrapping: ImageWrapping.Repeat}),
}
```
Je kan een kleine afbeelding laten herhalen door de afmeting groter te maken dan de afbeelding:

```js
export class Background extends Actor {

    onInitialize(engine) {
        let sprite = new Sprite({
            image: Resources.Grass,
            sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
        })
        this.anchor = Vector.Zero
        this.graphics.use(sprite)
    }
}
```
<br>

### Scrolling background

Door het nulpunt van de graphic te animeren krijg je een scrolling effect.

```javascript
export class Background extends Actor {

    sprite

    onInitialize(engine){
        this.sprite = new Sprite({
            image: Resources.Background,
            sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
        })
        this.anchor = Vector.Zero
        this.graphics.use(this.sprite)
    }

    onPostUpdate(engine, delta) {
        this.sprite.sourceView.x += .05 * delta;
    }
}
```
