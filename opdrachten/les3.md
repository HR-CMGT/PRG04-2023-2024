# Les 3 

- Game Loop en Actors
- Collision
- Besturing
- Tekst en geluid
- Vector



<Br><Br><Br>

## Game loop en Actors

- Een excalibur game heeft een ingebouwde gameloop. Dat houdt in dat je alleen maar een `velocity` hoeft aan te geven, waarna je actor automatisch gaat bewegen!
- Een Actor heeft ingebouwde functies, bv: `kill()` verwijdert de actor uit de game.
- Een Actor heeft `events`, net zoals een DOM Element, bijvoorbeeld:
    - Het `postupdate` event vindt 60 keer per seconde plaats.
    - Het `postkill` event vindt plaats nadat een actor uit de game is verwijderd.
    - Het `exitviewport` event vindt plaats als de Actor buiten beeld beweegt.
    - Het `pointerup` event vindt plaats als je op de sprite klikt. 
- Om een Actor clickable te maken moet je aangeven dat de actor interactief is.
- 🚨 Om een "pointer" event te kunnen afvuren moet een Actor altijd een `width` en `height` hebben.

<br>

CODE VOORBEELD

```javascript
class ActionHenk extends Actor {

    constructor() {
        super({width: 100, height: 100 })
    }

    onInitialize(engine){
        this.enableCapturePointer = true
        this.pointer.useGraphicsBounds = true
        this.on("pointerup", () => this.removeCar())
        this.on("exitviewport", () => this.resetPosition())
    }

    removeCar() {
        this.kill()
    }

    resetPosition(){
        this.pos = new Vector(500,100)
    }
}
```

- [Uitleg Actor](https://excaliburjs.com/docs/actors)
- [Uitgebreide documentatie Actor](https://excaliburjs.com/api/class/Actor)

<br><br><br>

## Collision

Om te weten of een actor een andere actor raakt kan je het `collisionstart` event gebruiken. - 🚨 Om een "collision" event te kunnen afvuren moet een Actor altijd een `width` en `height` hebben.

```js
class ActionHenk extends Actor {

    constructor() {
        super({width: 100, height: 100 })
    }

    onInitialize(engine){
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        console.log(`we hit something! ${event.other}`)
    }
}
```

<Br><Br><Br>



## Elk frame code uitvoeren

Met het "onPostUpdate" event kan je elk frame je eigen code uitvoeren. Hiermee kan je bv. checken waar een actor zich bevindt.

```javascript
class Henk extends Actor {

    onPostUpdate(){
        console.log(this.pos)
    }
}
```

<Br><Br><Br>

## Besturing

Om een karakter te kunnen besturen kan je luisteren naar toetsenbord input. Hieronder een voorbeeld van een Car die naar links en rechts kan bewegen.

```js
export class Car extends Actor {
  onInitialize(engine) {
    this.graphics.use(Resources.Car.toSprite());
    this.pos = new Vector(400, 400);
    this.vel = new Vector(0, 0);
  }

  onPreUpdate(engine) {
    let xspeed = 0;
    if (engine.input.keyboard.isHeld(Keys.Left)) {
      xspeed = -1;
    } 

    if (engine.input.keyboard.isHeld(Keys.Right)) {
      xspeed = 1;
    } 
    this.vel = new Vector(xspeed, 0);
  }
}
```

- [Bekijk hier een volledig voorbeeld met x,y en WASD keys](../snippets/keyboard.md)

<Br><Br><Br>

## Resources laden

Plaats je resources in de `public` folder. Je kan daarbinnen submappen aanmaken.

RESOURCES.JS

```javascript
import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'
const Resources = {
    Ship: new ImageSource('images/ship.png'),
    LevelStart: new Sound("sound/LevelStart0.wav"),
    PixelFont: new FontSource('PressStart2P-Regular.ttf', 'PressStart')
}
const ResourceLoader = new Loader([
    Resources.Ship,
    Resources.LevelStart,
    Resources.PixelFont,
]);
```

### Fonts en sounds gebruiken

```javascript
import { Actor, Engine, Vector, Label, FontUnit, Font} from "excalibur"
import { Resources } from "resources"

class Game extends Engine {
    startGame() {
        Resources.LevelStart.play()
        const label = new Label({
            text: 'Score: 0',
            pos: new Vector(0, 0),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White
            })
        })
        this.add(label)
    }
}
```

<Br><Br><Br>

## Vector

Een vector is een samenvoeging van het `x` en `y` coördinaat. Vectoren worden zowel gebruikt voor positie als voor snelheid. 

```js
this.pos = new Vector(10,10)
this.vel = new Vector(3,3)
```
In de game wordt automatisch de `vel` elk frame opgeteld bij de `pos`. Zo ontstaat beweging.
Je kan ook zelf rekenen met vectoren, in dit voorbeeld tellen we twee vectoren bij elkaar op:

```js
let pos1 = new Vector(4,4)
let pos2 = new Vector(6,6)
let newPos = pos1.add(pos2)
// resultaat: 10,10
```

<Br><Br><Br>

## Oefening

- Voeg 10 of meer instances van een Actor toe aan je game met een `for` loop.
- Laat de actors naar rechts bewegen. Als ze uit de viewport gaan, verschijnen ze weer aan de linkerkant.
- Maak de actors clickable. Speel een geluid na click en verwijder de Actor.

## Oefening

- Ga verder met bovenstaande oefening, maar verwijder de click handlers.
- Voeg een nieuwe actor toe die je met het toetsenbord kan besturen.
- Deze actor kan tegen andere actors aan botsen om ze te verwijderen.


<br><br><br>

## Links

- [Setup instructies](https://github.com/HR-CMGT/PRG04-2022-2023/blob/main/setup.md).
- [Excalibur](https://excaliburjs.com)
- [Codesandbox Excalibur playground](https://codesandbox.io/s/excalibur-vite-testproject-olk4bu)
- [Documentatie](https://excaliburjs.com/docs/text/)
