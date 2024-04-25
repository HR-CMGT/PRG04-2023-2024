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

### Healthbar en graphics

Omdat een `Actor` een achtergrondkleur heeft kan je makkelijk een healthbar tekenen.

Als je zelf lijnen, cirkels en rechthoeken wil tekenen maak je eerst een lege actor, en vervolgens kan je daarin tekenen via `graphics.use`.


```javascript
export class UI extends ScreenElement {

    healthbar

    onInitialize(engine) {
        this.healthbar = new Actor({x: 10, y: 40, color: Color.Green, width: 200, height: 20})
        this.healthbar.graphics.anchor = Vector.Zero
        this.addChild(this.healthbar)


        const whiteborder = new Rectangle({
            width: 300,
            height: 40,
            color: Color.fromRGB(255, 255, 255, 0.4)
        })
        this.border = new Actor()
        this.border.graphics.use(whiteborder)
        this.border.pos = new Vector(800, 200)
    }

    updateScore() {
        this.healthbar.scale = new Vector(0.5, 1)
    }
}
```

<br><br><br>

## Hartjes

Een voorbeeld van een UI met 6 hartjes naast elkaar:

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

Door de `.z` waarde van een Actor negatief te maken wordt die altijd onderin getekend.

```javascript
class Background extends Actor {
    constructor() {
        this.z = -1
    }
}
```
