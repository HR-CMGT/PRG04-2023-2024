# UI

Het Excalibur `ScreenElement` is een Actor class die altijd bovenop je game wordt getekend en die niet meebeweegt met de camera. 

Je kan hier geen child actors in plaatsen maar wel graphics. In dit voorbeeld tonen we een `Text` element en twee sprites. 

De tekst kan achteraf nog worden aangepast via de `updateScore()` functie.

```javascript
export class UI extends ScreenElement {

    scoreText

    constructor() {
        super({ x: 10, y: 10 })
    }

    onInitialize(engine) {

        this.scoreText = new Text({
            text: 'Score: 0',
            font: new Font({
                unit: FontUnit.Px,
                family: 'PressStart',
                size: 20,
            }),
        })

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: Resources.Mario.toSprite(),
                    pos: new Vector(0, 0),
                },
                {
                    graphic: this.scoreText,
                    pos: new Vector(50, 0),
                },
                {
                    graphic: Resources.Luigi.toSprite(),
                    pos: new Vector(50, 50),
                }
            ],
        })
        this.graphics.use(group)
    }

    updateScore() {
        this.scoreText.text = `Score: 200`
    }
}
```
<br><br><br>

## De UI in de game plaatsen

```javascript
class Game extends Engine {
    ...
    startGame() {
        this.add(new Enemy())
        this.add(new Player())
        this.add(new UI())
    }
}
```

<br><br><br>

## Healthbar

Excalibur heeft `Rectangle` en `Circle` om vormen te tekenen, deze kan je ook aan de graphics group toevoegen.

```js
this.healthrectangle = new Rectangle({
    width: 165,
    height: 30,
    color: Color.Red,
})

const group = new GraphicsGroup({
    members: [
        {
            graphic: this.healthrectangle,
            pos: new Vector(0, 0),
        }
    ],
})
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
