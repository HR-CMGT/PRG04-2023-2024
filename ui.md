# UI

Het is handig om al je tekstvelden in een eigen Actor class te plaatsen, zodat 1 class verantwoordelijk is voor alle tekst updates.

## ScreenElement

Het Excalibur ScreenElement is een Actor die altijd bovenop je game wordt getekend en die niet meebeweegt met de camera. Je kan hier geen child actors in plaatsen maar wel graphics. In dit voorbeeld tonen we text elementen (`Text`) en sprites. De score kan worden aangepast via de `updateScore()` functie.

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

## Graphics in de UI

Als je naast tekstvelden meerdere graphics zoals een [healthbar](./snippets.md#health-bar) wil tonen in je UI, dan kan je die in een `GraphicsGroup` plaatsen.

```javascript
class UI extends ScreenElement{

    scoreField
    hiScoreField
    healthbar

    onInitialize() {
        this.healthbar = ...

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: this.healthbar,
                    pos: new Vector(80, 0),
                }
            ]
        })

        this.graphics.add(group)
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
