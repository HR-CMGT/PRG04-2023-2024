
# Code Snippets

- [Scrolling Background](./scrolling.md)
- [Spritesheet](./spritesheet.md)
- [Click en Exit Screen Events](#click-en-exit-screen-events)
- [Collision Events](#collision)
- [Keyboard besturing](#keyboard-besturing)
- [Gamepad besturing](./gamepad.md)
- [Sturen en draaien](#sturen-en-draaien)
- [Scenes](#scenes)
- [Physics](./physics.md)
- [Flip sprite](#flip-sprite)
- [Spawner en Timer](#object-spawner-en-timer)
- [Tekstveld met score](./tekstveld.md)
- [UI class](./ui.md)
- [Random tint](#random-tint)
- [Pixel Art](#pixel-art)
- [Fullscreen](#fullscreen)
- [Loading Screen aanpassen](#loading-screen-aanpassen)
- [JSON laden](#json-laden)
- [Custom Events](#custom-events)
- [Afstand tussen twee punten](#afstand-tussen-punten)

<br><br><br>

## Click en Exit Screen Events

On Exit Screen Event
```javascript
class Fish extends Actor {
    onInitialize(engine) { 
        // capture mouse clicks
        this.enableCapturePointer = true
        this.pointer.useGraphicsBounds = true
        this.on("pointerup", (event) => this.resetPosition())
        // event als actor buiten beeld gaat
        this.on("exitviewport", (event) => this.resetPosition())
    }
    resetPosition(){
        this.pos = new Vector(1000,10)      // verplaatsen
        this.kill()                         // verwijderen
    }
}
```
Je kan ook handmatig checken of een Actor off screen is
```js
class Fish extends Actor {
    onPostUpdate(engine){
        if (this.isOffScreen) {
            this.kill()
        }
    }
}
```
<br><br><br>

## Keyboard besturing

In dit voorbeeld kijken we in de `update` loop welke toetsen zijn ingedrukt. Aan de hand daarvan veranderen we de `velocity` van de speler.

```javascript
class Shark extends Actor {

    shoot() {
        console.log("💥 Shoot!")
    }

    onPreUpdate(engine) {
        let xspeed = 0
        let yspeed = 0
        let kb = engine.input.keyboard

        if (kb.isHeld(Keys.W) || kb.isHeld(Keys.Up)) {
            yspeed = -300
        }
        if (kb.isHeld(Keys.S) || kb.isHeld(Keys.Down)) {
            yspeed = 300
        }
        if (kb.isHeld(Keys.A) || kb.isHeld(Keys.Left)) {
            xspeed = -300
            this.graphics.flipHorizontal = true       // flip de sprite
        }
        if (kb.isHeld(Keys.D) || kb.isHeld(Keys.Right)) {
            xspeed = 300
            this.graphics.flipHorizontal = false      // flip de sprite
        }
        this.vel = new Vector(xspeed, yspeed)
        
        // schieten of springen gebeurt maar 1 keer na een press
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.shoot()
        }

    }
}
```
### Binnen beeld blijven

Als je karakter niet uit beeld mag lopen kan je `clamp` gebruiken.

```js
import { clamp } from "excalibur"

class Shark extends Actor {
    onPreUpdate(engine) {
        //...keyboard code hier
        this.pos.x = clamp(this.pos.x, this.width/2, engine.drawWidth - this.width/2);
        this.pos.y = clamp(this.pos.y, this.height/2, engine.drawHeight - this.height/2);
    }
}
```
<br><br><br>

## Collision

Met de collision events kan je checken of je Actor ergens tegenaan botst. Let op dat je actor een `width`,`height`, OF een `radius` heeft. Je kan `instanceof` gebruiken om te zien waar je tegenaan botst.

```javascript
export class Ship extends Actor {

    constructor() {
        super({ width: Resources.Ship.width, height: Resources.Ship.height }) 
    }
    
    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event){
        if (event.other instanceof Enemey) {
            console.log('hit enemy')
        }
    }
}
```
### Collision group

Een [Collision Group](https://excaliburjs.com/docs/collisiongroups/) zorgt dat actors in dezelfde group nooit met elkaar colliden.

<br><br><Br>

## Sturen en draaien

![draaien](../images/carangle.png)

In plaats van in vier richtingen te bewegen met W A S D kan je ook in de richting bewegen waar je naartoe gedraaid staat. Je kan dan de `rotation` omrekenen naar de `velocity`.

```javascript
let speed = 100
this.vel = new Vector(
    Math.cos(this.rotation) * speed,
    Math.sin(this.rotation) * speed
)
```
- [Compleet voorbeeld](./movedirection.md)
- [Codesandbox voorbeeld](https://codesandbox.io/p/sandbox/excalibur-move-direction-yr22q8)

<br><br><br>


## Scenes

Je plaatst je `Actors` in `Scenes`, waardoor de `Game` kan wisselen tussen scenes. 
Een scene heeft een `onActivate` functie, deze wordt elke keer aangeroepen dat de scene actief wordt.

Een `Actor` weet altijd in welke scene de actor zit, via `this.scene`. Je kan via `this.scene.engine` de game aanroepen om van scene te kunnen wisselen. 

Let op dat als je *uit* een scene gaat, dat alle actors en variabelen "bevriezen". Zodra je terug naar de scene gaat, ga je verder waar je gebleven was.

```javascript
import { Level1 } from './scenes/level1'
import { GameOver } from './scenes/gameover'

class Game extends Engine {
    startGame() {
        this.add('level', new Level())
        this.add('gameover', new GameOver())
        this.goToScene('level')
    }
}
```
LEVEL

```javascript
export class Level extends Scene {

    onInitialize(engine) {
        console.log("this level is created only once.")
        let player = new Player()
        this.add(player)
    }

    onActivate(ctx) {
        console.log("the game has switched to this level.")
    }

    gameOver() {
        this.scene.engine.goToScene('gameover')
    }
}
```
<br>

### Waarden doorgeven aan een scene

Het is mogelijk om waarden zoals een score van de ene scene naar de andere door te geven via de `onActivate` functie.

```javascript
this.scene.engine.goToScene('gameover', { level: 4, score: 12 })
```
Dit kan je dan als volgt uitlezen:
```javascript
onActivate(ctx) {
    if(ctx.data) {
        console.log(`LEVEL: ${ctx.data.level}`)
        console.log(`SCORE: ${ctx.data.score}`)
    }
}
```


<br><br><br>


## Flip sprite

MARIO.JS
```javascript
import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Sprite extends Actor {

    onInitialize(engine) {
        this.graphics.use(Resources.Mario.toSprite())
        this.graphics.flipHorizontal = true
    }
}
```
Flip spritesheet

```javascript
let left = Animation.fromSpriteSheet(spriteSheetRun, range(1, 10), 50)
let right = left.clone()
right.flipHorizontal = true
```

<br><br><br>

    
## Object Spawner en Timer

Een `Timer` moet je toevoegen aan de `Game` (of `Scene`). Dat zorgt dat de Timer synchroon loopt met je gameloop framerate. Je kan geen `setInterval` of `setTimeout` gebruiken omdat daarbij geen rekening met de gameloop wordt gehouden.

> *🚨 Als je objecten spawned, moet je opletten dat die objecten aan de huidige game/scene worden toegevoegd!*

Om bij de huidige game te komen vanuit een `Actor` kan je `this.scene.engine` gebruiken. Om bij de huidige scene te komen vanuit een `Actor` kan je `this.scene` gebruiken.

```js
export class Game extends Engine {
    startGame() {
        this.timer = new Timer({
            fcn: () => this.spawn(),
            interval: 800,
            repeats: true
        })
        this.add(this.timer)
        this.timer.start()
    }

    spawn() {
        this.add(new Ball())
    }
}
```
    
<br><br><br>

## Random tint

```js
let sprite = Resources.Mario.toSprite()
sprite.tint = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255)
```
<br><br><br>
    
## Pixel art
   
```js   
export class Game extends Engine {
    constructor() {
        super({ width: 480, height: 320 ,antialiasing:false, resolution:Resolution.GameBoyAdvance})
    }
}
```
    
<Br><br><br>

## Fullscreen

Starten in fullscreen

```js
const Resources = {
    Bird: new ImageSource('images/bird.png'),
    Tree: new ImageSource('images/tree.png'),
}

const ResourceLoader = new Loader({fullscreenAfterLoad: true})
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
```

<br><br><br>

## Loading Screen aanpassen

Op de CMGT Arcade kast heb je geen starbutton nodig. 

GAME.JS

```js
export class Game extends Engine {
    constructor(){
        super({
            suppressPlayButton: true
        })
    }
}
```

https://excaliburjs.com/docs/loaders

<br><br><br>

## JSON laden

Als je `import` gebruikt wordt het JSON bestand onderdeel van je project tijdens de `build` stap. Je hoeft het niet toe te voegen aan de excalibur loader. Als de data van een externe server komt (of als het bestand heel groot is) is het beter om `fetch` te gebruiken.

VOORBEELD

```javascript
import jsonData from "../data/pokemon.json"

class Pokemon extends Actor {
    showPokemon(){
        for(let p of jsonData) {
            console.log(p)
        }
    }
}
```
<br><br><br>

## Custom Events

Een child kan een event afvuren met `emit`. De parent kan hier naar luisteren met `on`.

PARENT listens to BLUB event
```javascript
class Aquarium extends Actor {
    onInitialize() {
        let fish = new Fish()
        this.add(fish)
        
        fish.on("blub", (event) => {
            console.log("fish says blub")
        })
    }
}
```
CHILD emits BLUB event
```javascript
import { GameEvent } from "excalibur"

class Fish extends Actor {
    onCollision() {
        this.emit('blub', new GameEvent())
    }
}
```


<br><br><br>

## Afstand tussen punten

De `Vector` class heeft hulpfuncties om afstanden uit te rekenen.

```js
let ship = new Actor()
ship.pos = new Vector(200,100)

let enemy = new Actor()
enemy.pos = new Vector(500,340)

let distance = Vector.distance(ship.pos, enemy.pos)
```
