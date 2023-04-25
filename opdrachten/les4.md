# Les 4 - week 2 middag

## Opdracht

- Maak een lokaal excalibur project met de [startcode](https://github.com/HR-CMGT/prg4-startproject-2023)
- Maak je game uit les 1 van codesandbox na. 
- Maak nu een ***class bestand*** voor elke soort Actor. *Bijvoorbeeld: `class Duck` plaats je in de file `duck.js`.*
- Importeer je classes in game.js door `export` en `import` te gebruiken.


<Br>
<Br>
<Br>

## Opdracht

- Bekijk de code snippets hieronder en in de presentatie.
- Plaats de actors op een random positie.
- Laat de actors met een random snelheid bewegen
- Check of de actors uit beeld lopen en zet ze weer terug, middels het `exitviewport` event.
- Maak de actors clickable. Verwijder of verplaats de actor na een klik.
- Speel een geluidje on click
- Voeg 10 of meer instances toe aan de game met een `for` loop.
- Voeg een tekstveld toe aan de game met de titel van het spel.

<Br><Br><Br>

## Opdracht

- Maak een start met je eigen game door de tot nu toe geleerde stof toe te passen.
- Zorg voor consistente graphics en bijpassend geluid.

<Br><Br><Br>

## Click en Exit Screen Events in een class

In classes gebruik je het `this` keyword om op events te reageren. Het is overzichtelijk als je de event handler in een eigen functie zet.

```javascript
class Henk extends Actor {

    onInitialize(engine){
        this.enableCapturePointer = true
        this.pointer.useGraphicsBounds = true
        this.on("pointerup", (event) => this.resetPosition())
        this.on("exitviewport", (event) => this.resetPosition())
    }

    resetPosition(){
        this.pos = new Vector(500,100)
    }
}
```

<Br><Br><Br>

## Tekstveld

```javascript
import { Actor, Engine, Vector, Label, FontUnit, Font} from "excalibur";
class Game extends Engine {
    startGame() {
        const label = new Label({
            text: 'Action Henk',
            pos: new Vector(100, 100),
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px
            })
        });
        this.add(label)
    }
}
```

<Br><Br><Br>

## Geluid laden en spelen

RESOURCES.JS

```javascript
import levelStartSound from "../sound/LevelStart0.wav"

const Resources = {
    LevelStart: new Sound(levelStartSound),
}
```
GAME.JS (of een andere class)
```javascript
Resources.LevelStart.play()
```

<br><br><br>

## Links

-  [Setup instructies](https://github.com/HR-CMGT/PRG04-2022-2023/blob/main/setup.md).