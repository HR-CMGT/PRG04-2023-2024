
# Code Snippets

## Essentials

- [Actors, flip en rotate](#actors)
- [Collision Events](#collision)
- [Click en Exit Screen Events](#click-en-exit-screen-events)
- [Keyboard besturing](#keyboard-besturing)
- [Gamepad besturing](./gamepad.md)
- [Camera volgt speler](#camera-volgt-speler)
- [Spritesheet](./spritesheet.md)
- [Scenes](#scenes)
- [Physics en hitbox](./physics.md)
- [Scherm instellingen (afmeting, pixel art, loading, fullscreen)](./scherm.md)
- [Spawner en Timer](#object-spawner-en-timer)
- [Tekst met score](./tekstveld.md)
- [UI met healthbar](./ui.md)

## Bonus technieken

- [Tiling en Scrolling Background](./scrolling.md)
- [Een auto besturen](./movedirection.md)
- [Actors zoeken in een Scene](#actors-zoeken)
- [Random tint](#random-tint)
- [JSON laden](#json-laden)
- [Afstanden en vectoren](./vector.md)
- [Enemy behaviour](./behaviour.md)

<br><br><br>




## Actors, flip en rotate

Een actor met een sprite ziet er als volgt uit. In de `constructor` geef je de ***hitbox*** van de actor door. In `onInitialize()` zet je de meeste basic settings.

```js
export class Goomba extends Actor {
    constructor() {
        super({ width: Resources.Goomba.width, height: Resources.Goomba.height })
    }
    onInitalize(engine){
        this.graphics.use(Resources.Goomba.toSprite())
        this.pos = new Vector(200,200)   // positie
        this.vel = new Vector(20,0)      // snelheid
    }
}
```

#### Rotate sprite


```js
export class Peach extends Actor {
    onInitalize(engine){
        this.rotation = 0.5
        this.angularVelocity = 0.2
    }
}
```
Standaard wordt een afbeelding gecentreerd op een Actor. Als je niet om het middelpunt wil roteren dan kan je een `anchor` gebruiken. *Dit moet je via de constructor doorgeven.*
```js
export class Toad extends Actor {
    constructor() {
        super({
            anchor: new Vector(0, 0),
            width: Resources.Toad.width, 
            height: Resources.Toad.height 
        })
    }
}
```

#### Flip sprite

```javascript
export class Bowser extends Actor {
    onInitialize(engine) {
        this.graphics.use(Resources.Bowser.toSprite())
        this.graphics.flipHorizontal = true
    }
    onPreUpdate(engine){
        this.graphics.flipHorizontal = (this.vel.x > 0)
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

        // hit circle
        // super({radius: Resources.Ship.width/2})
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
> *Een [Collision Group](https://excaliburjs.com/docs/collisiongroups/) zorgt dat actors in dezelfde group nooit met elkaar colliden.*

<br><bR><br>

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

In dit voorbeeld kijken we in elke `update` frame welke toetsen zijn ingedrukt. Doordat je in de `update` naar de toetsenbord status kijkt, weet je zeker dat alleen de huidige `scene` naar het toetsenbord luistert *(inactieve scenes worden niet geupdate).*

- Via `isHeld` kan je continu op een keypress reageren (movement). 
- Via `wasPressed` kan je eenmalig op een keypress reageren (shooting / jumping).

```javascript
class Shark extends Actor {

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
        
        // als er maar 1x iets gebeurt check je of die key was ingedrukt in dit frame
        if (kb.wasPressed(Keys.Space)) {
            this.shoot()
        }
    }
    
    shoot() {
        console.log("💥 Shoot!")
    }
}
```
#### Binnen beeld blijven

Pas de speed alleen aan als de actor nog voldoende van de rand van het level is verwijderd:

```js
class Player extends Actor {
    onPreUpdate(engine){
        let kb = engine.input.keyboard
        if (kb.isHeld(Keys.Up) && this.pos.y > 30) {
            yspeed = -300
        }
        if (kb.isHeld(Keys.Down) && this.pos.y < 470) {
            yspeed = 300
        }
        if (kb.isHeld(Keys.Left) && this.pos.x > 30) {
            xspeed = -300
        }
        if (kb.isHeld(Keys.Right) && this.pos.x < 770) {
            xspeed = 300
        }
    }
}
```

Voor actors zonder keyboard input kan je ook `clamp` gebruiken. 

```js
import { clamp } from "excalibur"

class Shark extends Actor {
    onPreUpdate(engine) {
        this.pos.x = clamp(this.pos.x, 0, 1280);   // afmeting van het level
        this.pos.y = clamp(this.pos.y, 0, 720);    // afmeting van het level
    }
}
```
> *Als je [physics](./physics.md) gebruikt kan je `edge colliders` aan de rand van je level plaatsen.*

<br><br><br>

### Keyboard events

Het is mogelijk om te subscriben aan keyboard events. **Event listeners blijven echter altijd actief, ook als je wisselt tussen scenes.** Je kan een listener uit zetten met `off()`.

```js
class Game extends Engine {
    startGame() {
        this.input.keyboard.on("press", (evt) => this.keyPressed(evt))
    }
    keyPressed(evt){
        if (evt.key === Keys.Space) {
            console.log("space was pressed")
        }
    }
    gameOver(){
        this.input.keyboard.off("press")
    }
}
```

<br><br><br>

## Camera volgt speler

Om een top-down RPG of een sidescroller te maken doe je de volgende stappen:

- Maak een `player` met besturing.
- Maak een level dat groter is dan de game *(In dit voorbeeld is de game `800x450` en het level is `2000x1200`)*.
- Laat de camera de speler volgen. 

GAME.JS
```js
export class Game extends Engine {
    constructor(){
        super({width:800, height:450})
    }
    startGame(){
        this.currentScene.camera.strategy.lockToActor(this.player)
        this.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 2000, 1200))
    }
}

```
Om je [UI](./ui.md) in beeld te laten staan terwijl de camera beweegt, heb je een [ScreenElement](https://excaliburjs.com/api/class/ScreenElement/) nodig.

- [Camera](https://excaliburjs.com/docs/cameras/)
- [Screenelement](https://excaliburjs.com/api/class/ScreenElement/)

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

    score

    onInitialize(engine) {
        console.log("this level is created only once.")
        this.score = 0
        let player = new Player()
        this.add(player)
    }

    onActivate(ctx) {
        console.log("the game has switched to this level. player already exists. reset score to 0")
        this.score = 0
    }

    gameOver() {
        this.engine.goToScene('gameover')
    }
}
```

#### Scene transitions

```js
class Game extends Engine {
    startGame() {
        let transitions = {
            in: new FadeInOut({ duration: 400, direction: 'in', color: Color.Black }),
            out: new FadeInOut({ duration: 400, direction: 'out', color: Color.Black })
        }
        this.add('intro', { scene: new Intro(), transitions })
        this.add('level', { scene: new Level(), transitions })
        this.goToScene('level')
    }
}
```
<br>

#### Waarden doorgeven aan een scene

```javascript
this.scene.engine.goToScene("game-over", { sceneActivationData: { score: 40 }})
```
Dit kan je als volgt uitlezen:
```javascript
export class GameOver extends Scene {
    onActivate(ctx) {
        console.log(`SCORE: ${ctx.data.score}`)
    }
}
```

<br><br><br>
    
## Object Spawner en Timer

Je kan geen `setInterval` of `setTimeout` gebruiken in Excalibur daarbij geen rekening met de gameloop wordt gehouden. In plaats van `setInterval` gebruik je `Timer`. In plaats van `setTimeout` gebruik je `engine.clock.schedule`.

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
Als je maar één keer een functie wil uitvoeren na een X aantal seconden gebruik je `clock`:

```js
export class Game extends Engine {
    startGame() {
        this.clock.schedule(() => this.spawn(), 1000)
    }
}
```
    
<br><br><br>



# Bonus techniques
 
## Actors zoeken

Je kan via `scene.actors` alle actors uit een scene opvragen. Je kan met `filter` naar een specifiek *type* actor zoeken.

```js
export class Game extends Engine {
    logEnemies() {
        let allEnemies = this.currentScene.actors.filter(actor => actor instanceof Enemy)
        console.log(allEnemies)
    }
}
```

<br><br><br>

## Random tint

```js
let sprite = Resources.Mario.toSprite()
sprite.tint = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255)
```

<br><br><Br>

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



