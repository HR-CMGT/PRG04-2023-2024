# UI

Het is handig om al je tekstvelden in een eigen Actor class te plaatsen, zodat 1 class verantwoordelijk is voor alle tekst updates.

Het nadeel is dat je tekst soms onder andere elementen getekend wordt, en dat je UI uit beeld kan raken als je camera beweegt.

## ScreenElement

Het Excalibur ScreenElement is een Actor die altijd bovenop je game wordt getekend en die niet meebeweegt met de camera.

```javascript
export class UI extends ScreenElement {

    score = 0
    scoreText

    constructor() {
        super({ x: 10, y: 10 })
    }

    onInitialize(engine) {
        this.scoreText = new Label({
            text: 'Score: 0',
            font: new Font({
                unit: FontUnit.Px,
                family: 'Impact',
                size: 28,
                color: Color.Black,
            }),
            pos: new Vector(250, 50)
        })
        this.addChild(this.scoreText)
    }

    updateScore() {
        this.score++
        this.scoreText.text = `Score: ${this.score}`
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