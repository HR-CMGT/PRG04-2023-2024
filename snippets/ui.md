# UI

Het Excalibur [ScreenElement](https://excaliburjs.com/api/class/ScreenElement/) is een Actor class die altijd bovenop je game wordt getekend en die niet meebeweegt met de camera. In dit voorbeeld tekenen we een tekstveld en een healthbar in een screenelement. Dit kan je ook in een `Scene` doen als je geen camera hebt. De tekst en healthbar kunnen achteraf nog worden aangepast via de `updateScore()` functie.

```javascript
export class UI extends ScreenElement {

    scoreText
    healthbar

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

        this.healthbar = new Actor({x: 10, y: 40, color: Color.Green, width: 200, height: 20})
        this.healthbar.graphics.anchor = Vector.Zero
        this.addChild(this.healthbar)
    }

    updateScore() {
        this.scoreText.text = `Score: 200`
        this.healthbar.scale = new Vector(0.5, 1)
    }
}
```
- [Screenelement docs](https://excaliburjs.com/api/class/ScreenElement/)

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
