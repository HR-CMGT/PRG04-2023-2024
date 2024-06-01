# Les 3 

- Lifecycle
- Besturing
- Collision
- Oefening
- Improving the game
- Fonts en geluid



<Br><Br><Br>

## Lifecycle

- Een Actor heeft ingebouwde *lifecycle* functies, bv: `kill()` verwijdert de actor uit de game.
- Een Actor heeft `lifecycle` methods. Dit zijn methods die automatisch worden aangeroepen als er een bepaald event gebeurt.
    - De `onInitialize` method wordt aangeroepen als de Actor in de Game is geplaatst.
    - De `onPostUpdate` en `onPreUpdate` methods vinden 60 keer per seconde plaats *(je framerate)*.
    - De `onPostKill` en `onPreKill` methods worden aangeroepen als een actor uit de game wordt verwijderd.
- Een Actor heeft `events`. Hier kan je listeners voor aanmaken via `this.on()`. Dit is vergelijkbaar met PRG3.
    - Het `exitviewport` event vindt plaats als de Actor buiten beeld beweegt.
    - Het `pointerup` event vindt plaats als je op de sprite klikt.

<br>

CODE VOORBEELD

```javascript
class Car extends Actor {

    constructor() {
        super({width: 100, height: 100 })
    }

    onInitialize(engine){
        this.enableCapturePointer = true
        this.pointer.useGraphicsBounds = true
        this.on("pointerup", () => this.kill())
        this.on("exitviewport", () => this.resetCar())
    }

    onPostKill() {
        console.log("car was removed")
    }

    resetCar(){
        this.pos = new Vector(500,100)
    }

    onPostUpdate(){
        if(this.pos.x < 100) {
             console.log("de auto is links")
        }
    }
}
```

- [Uitleg Actor](https://excaliburjs.com/docs/actors) en [Uitgebreide documentatie](https://excaliburjs.com/api/class/Actor)

<Br><Br><Br>

## Besturing

Om een karakter te kunnen besturen kan je luisteren naar toetsenbord input. Hieronder een voorbeeld van een Car die naar links en rechts kan bewegen. Als een `key` is ingedrukt pas je de `velocity` aan.

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
### Shooting, jumping

De `keyboard.isHeld` wordt 60 keer per seconde uitgevoerd, dit is dus niet handig voor schieten of springen. Dat moet maar 1 keer gebeuren op het moment dat een knop wordt ingedrukt:

```js
export class Car extends Actor {
  onPreUpdate(engine) {
     if (engine.input.keyboard.wasPressed(Keys.Space)) {
        console.log("shoot!")
    }
  }
}
```


- [Bekijk hier een volledig voorbeeld met x,y en WASD keys](../snippets/keyboard.md)

<Br><Br><Br>

## Collision

Om te weten of een actor een andere actor raakt kan je het `collisionstart` event gebruiken. 🚨 Om een "collision" event te kunnen afvuren moet een Actor altijd een `width` en `height` hebben.

```js
class ActionHenk extends Actor {

    constructor() {
        super({width: 100, height: 100 })

        // alternatief, een cirkel hitbox
        // super({radius: 50})
    }

    onInitialize(engine){
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        console.log(`we hit something! ${event.other}`)
    }
}
```
<br>

### Wat heb je geraakt?

Om te weten wat je hebt geraakt kan je `instanceof` gebruiken.

```js
import { Tree } from "./tree.js"

class Car extends Actor {

    hitSomething(event) {
        if(event.other instanceof Tree) {
             console.log("the car hits the tree")
             this.kill()           // remove the car
             event.other.kill()    // remove the tree
        }
    }
}
```

<Br><Br><Br>




# Oefening 

- Voeg 10 of meer instances van een Actor class toe aan je game met een `for` loop, bv. `new Fish()`.
- De actors krijgen een random positie. Laat de actors door het beeld bewegen. Als ze uit de viewport gaan, verschijnen ze weer aan de linkerkant.

```js
this.pos.x =  Math.random() * 800
this.pos.y =  Math.random() * 600
```

## Besturing toevoegen

- Maak een player character Actor aan die je met WASD/Cursorkeys kan laten bewegen door het scherm

## Collision toevoegen

- Voeg een collision handler aan de player character toe. Als er een collision is, verwijder je het object waar je tegenaan botst via `event.other.kill()`. 

## Pickups and enemies

Maak een nieuwe class voor een Actor waar je tegenaan kan botsen, bv. een coin. *Een coin geeft punten, maar een enemy kost health*. Zowel de pickup als enemy verwijder je uit de game na een collision. met `event.other.kill()` Als je health 0 is verwijder je de player met `this.kill()`.

```js
class Player extends Actor {
    onInitialize(){
        this.score = 0
        this.health = 100
    }

    hitSomething(event) {
        if(...) { ... }
    }
}
```

<br><br><br>

# Improvements

Als je tijd over hebt kan je naar eigen inzicht een of meer van de onderstaande verbeteringen toevoegen.

## Geluidjes

Een pickup of botsing met een vijand heeft meer impact als het geluid maakt. Zie hieronder voor het laden van geluid.

## Binnen beeld blijven

Om binnen beeld te blijven kan je in de `keyboard` code controleren dat de `pos` van de player niet buiten de afmeting van de game gaat.

```js
class Player extends Actor {
    onPreUpdate(engine){
        if (engine.input.keyboard.isHeld(Keys.Left) && this.pos.x > 30) {
            xspeed = -300
        }
        if (engine.input.keyboard.isHeld(Keys.Right) && this.pos.x < 770) {
            xspeed = 300
        }
    }
}
```

## Camera follow

Je kan de camera de speler laten volgen. Je level kan dan ineens veel groter zijn dan het scherm.

```js
export class Game extends Engine {
    constructor(){
        super({width:800, height:450})
    }
    startGame(){
        let player = new Player()
        this.add(player)
        this.currentScene.camera.strategy.lockToActor(player)
        this.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 2000, 1200))
    }
}
```

<br><br><br>

# Resources

Plaats *images, fonts en sounds* in de `public` folder. Je kan daarbinnen submappen aanmaken:

RESOURCES.JS

```javascript
import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'
const Resources = {
    Ship: new ImageSource('images/ship.png'),
    LevelStart: new Sound("sounds/LevelStart0.wav"),
    PixelFont: new FontSource('fonts/PressStart2P-Regular.ttf', 'PressStart')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}
```

Fonts en sounds gebruiken

```javascript
import {Label, FontUnit, Color, Vector} from "excalibur"
import {Resources} from "./resources.js"

class Game extends Engine {
    startGame() {
        // speel een geluidje
        Resources.LevelStart.play()
        // gebruik een pixel font
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
- [Download het *Press Start* Pixelfont hier](https://fonts.google.com/specimen/Press+Start+2P)

<Br><Br><Br>

## Links

- [Setup instructies](https://github.com/HR-CMGT/PRG04-2022-2023/blob/main/setup.md).
- [Excalibur](https://excaliburjs.com)
- [Documentatie](https://excaliburjs.com/docs/text/)
