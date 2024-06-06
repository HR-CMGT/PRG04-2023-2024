# UI

Het is handig om tekstvelden, healthbars en dergelijke in een eigen `Actor` class te plaatsen zodat je alles bij elkaar hebt. Het Excalibur [ScreenElement](https://excaliburjs.com/api/class/ScreenElement/) is een Actor class die niet meebeweegt met de camera. Gebruik `this.addChild` om elementen aan je UI toe te voegen.

### Tekstveld

Een `Label` is de makkelijkste manier om tekst te plaatsen, zie [tekstveld en fonts](./tekstveld.md)

```javascript
export class UI extends ScreenElement {

    scoreText

    onInitialize(engine) {
        this.scoreText = new Label({
            text: 'Score: 0',
            pos: new Vector(0, 0),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White
            })
        })
        this.addChild(this.scoreText)
    }

    updateScore() {
        this.scoreText.text = `Score: 200`
    }
}
```
- [Screenelement docs](https://excaliburjs.com/api/class/ScreenElement/)

<br><br><br>

### Healthbar

Omdat een `Actor` een achtergrondkleur heeft kan je makkelijk een healthbar tekenen.

```javascript
export class UI extends ScreenElement {

    healthbar

    onInitialize(engine) {
        let barbackground = new Actor({ x: 10, y: 40, color: Color.fromRGB(255, 255, 255, 0.4), width: 200, height: 20, anchor: Vector.Zero})
        this.addChild(barbackground)

        this.healthbar = new Actor({ x: 10, y: 40, color: Color.Green, width: 200, height: 20, anchor: Vector.Zero })
        this.addChild(this.healthbar)
    }

    reduceHealth() {
        this.healthbar.scale = new Vector(0.5, 1) // de health is nu 50%
    }
}
```

<br><br><br>

## Hartjes

Een simpele manier om meerdere hartjes te tekenen is om actors naast elkaar te zetten.

```js
export class UI extends ScreenElement {

    onInitialize(engine) {
        for (let i = 0; i < 6; i++) {
            const heart = new Actor()
            heart.graphics.use(Resources.HeartImage.toSprite())
            heart.pos = new Vector(30 + (i * 80), 90)
            this.addChild(heart)
        }
    }
}
```

<br><br><br>

## Graphics tekenen

Je kan graphics tekenen via `this.graphics.use()`

- [Line](https://excaliburjs.com/docs/lines)
- [Circle](https://excaliburjs.com/docs/graphics#circle)
- [Rectangle](https://excaliburjs.com/docs/graphics#rectangle)
- [Polygon](https://excaliburjs.com/docs/graphics#polygon)

```js
import { Line, Circle, Rectangle, Polygon, Color, Actor } from "excalibur"

export class UI extends ScreenElement {

    onInitialize(engine) {
    
        const actor = new Actor()
        const circledrawing = new Circle({
            radius: 50,
            color: Color.Red,
            lineWidth: 2,
            strokeColor: Color.Black,
            padding: 5
        });

        actor.graphics.use(circledrawing)
        this.addChild(actor)
    }
}
```

<br><br><br>

## Herhalende graphics tekenen

Als je `wrapping` aan zet kan je een plaatje eindeloos laten herhalen. De *breedte* van het plaatje bepaalt dan hoe vaak het plaatje herhaalt.

```js
const Resources = {
    Heart: new ImageSource('images/heart.png', { wrapping: ImageWrapping.Repeat}),
}
```
```js
class Hearts extends Actor {
  constructor() {
    super({ x: 50, y: 50, anchor: Vector.Zero });
    this.health = 5
    this.heartImage = new Sprite({
      image: Resources.Heart,
      sourceView: {
        x: 0,
        y: 0,
        width: 100 * this.health,   // basis afmeting van 1 hartje is 100x100
        height: 100                 // basis afmeting van 1 hartje is 100x100
      }
    });
    this.graphics.use(this.heartImage);
  }
  
  adjustHealth() {
    this.health--
    this.heartImage.sourceView.width = 100 * this.health
    this.heartImage.width = 100 * this.health
  }
}
```


<br><br><bR>

## De UI in de game plaatsen

```javascript
class Game extends Engine {
    ui
    startGame() {       
        this.ui = new UI()
        this.add(this.ui)
    }
    nextLevel(){
        this.ui.updateScore()
    }
}
```

<br><br><br>


## UI altijd boven de game tekenen

Als de UI niet boven je game verschijnt kan je de `z` waarde gebruiken.

```javascript
class Background extends Actor {
    constructor() {
        this.z = 10
    }
}
```
