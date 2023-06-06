# Tekstveld met score

- Label
- Score aanpassen vanuit andere class
- UI class

<br><Br>

## Label

Een `Label` is een `Actor` met een child `Text`. Hiermee kan je een stukje tekst op een positie plaatsen. Je kan de tekst achteraf nog aanpassen.

```javascript
import { Label, FontUnit, Font} from "excalibur";

let label = new Label({
  text: 'Score: 0',
  pos: new Vector(100, 100),
  font: new Font({
    family: 'impact',
    size: 24,
    unit: FontUnit.Px
  })
})

this.add(label)
label.text = 'Score: 100'
```

<br><br><br>




## Score aanpassen vanuit andere class

Vaak wil je de score van de game aanpassen als in een andere class iets gebeurt. Dit kan je doen met hulp van de `engine` variabele. 

- Stap 1: maak het label en de score een property van de game
- Stap 2: maak een functie in de game om de score aan te passen
- Stap 3: roep deze functie aan vanuit een andere class

<br>

GAME met LABEL en SCORE
```javascript
export class Game extends Engine {

    score
    mylabel

    startGame(){
        this.score = 0
        this.mylabel = new Label({
            text: `Score: ${this.score}`,
            pos: new Vector(100, 100),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color:Color.White
            })
        })
        this.add(this.mylabel)
    }

    updateScore(){
        this.score++
        this.mylabel.text = `Score: ${this.score}`
    }  
}
```
<Br>

ACTOR roept UPDATESCORE aan
```javascript
export class Fish extends Actor {

    engine

    constructor(){
        super()
    }

    onInitialize(engine){
        this.engine = engine
        this.on("exitviewport", ()=>this.resetPosition())
    }

    resetPosition(){
        this.engine.updateScore()
    }
}
```
<Br><br><br>

## Meerdere tekstvelden en graphics

Het is handig om een aparte UI class te maken zodra je meerdere tekstvelden / graphics gebruikt om de voortgang van de speler te tonen.

- [UI class](./ui.md)