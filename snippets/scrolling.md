# Scrolling Background

Om een achtergrond eindeloos te kunnen herhalen moet je ***wrapping*** aanzetten in de image loader.

```js
const Resources = {
    Background: new ImageSource('images/background.png', { wrapping: ImageWrapping.Repeat}),
}
```

In een Actor kan je een deel van je graphic als sprite gebruiken *(dit kan ook zonder wrapping)*. Maar omdat *wrapping* nu aan staat kan je het *nulpunt* aanpassen in een animatie. Zodra de graphic buiten beeld valt wordt de graphic herhaald.

```javascript
export class Background extends Actor {

    sprite

    onInitialize(engine){
        this.sprite = new Sprite({
            image: Resources.Background,
            sourceView: {
                x: 0,
                y: 0,
                width: 500,
                height: 500
            },
            destSize: {
                width: 1000,
                height: 1000
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
