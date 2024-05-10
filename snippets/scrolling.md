# Tiling en scrolling Background

### Tiling background

Om een achtergrond eindeloos te kunnen herhalen moet je ***wrapping*** aanzetten in de image loader.

```js
const Resources = {
    Background: new ImageSource('images/background.png', { wrapping: ImageWrapping.Repeat}),
}
```
Je kan nu een kleine afbeelding laten herhalen door de afmeting groter te maken dan de afbeelding. Bv. een afbeelding van 100x100 pixels toon je in een scherm van 800x600 pixels.

```js
export class Background extends Actor {

    onInitialize(engine) {
        let sprite = new Sprite({
            image: Resources.Grass,
            sourceView: {
                x: 0,
                y: 0,
                width: engine.drawWidth,    // kan ook groter als de achtergrond groter dan het scherm moet zijn
                height: engine.drawHeight,
            },
        })
        this.anchor = Vector.Zero
        this.graphics.use(sprite)
    }
}
```
<br>

### Scrolling background

Zodra de graphic links buiten beeld valt wordt de graphic rechts herhaald, omdat je `wrapping` aan hebt staan. Als je nu het nulpunt van de graphic animeert krijg je een scrolling effect.

```javascript
export class Background extends Actor {

    sprite

    onInitialize(engine){
        this.sprite = new Sprite({
            image: Resources.Background,
            sourceView: {
                x: 0,
                y: 0,
                width: engine.drawWidth,
                height: engine.drawHeight,
            },
            destSize: {
                width: engine.drawWidth,
                height: engine.drawHeight,
            }
        })
        this.anchor = Vector.Zero
        this.graphics.use(this.sprite)
    }

    onPostUpdate(engine, delta) {
        this.sprite.sourceView.x += .05 * delta;
    }
}
```
