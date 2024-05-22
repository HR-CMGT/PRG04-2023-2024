
# Code Snippets

- [Tiling en Scrolling Background](./scrolling.md)
- [Spritesheet](./spritesheet.md)
- [Click en Exit Screen Events](#click-en-exit-screen-events)
- [Collision Events](#collision)
- [Keyboard besturing](#keyboard-besturing)
- [Gamepad besturing](./gamepad.md)
- [Camera volgt speler](#camera-volgt-speler)
- [Een auto besturen](#sturen-en-draaien)
- [Scenes](#scenes)
- [Physics en hitbox](./physics.md)
- [Sprite roteren en nulpunt](#rotate-sprite)
- [Flip sprite](#flip-sprite)
- [Actors zoeken in een Scene](#actors-zoeken)
- [Spawner en Timer](#object-spawner-en-timer)
- [Tekst met score](./tekstveld.md)
- [UI met healthbar](./ui.md)
- [Random tint](#random-tint)
- [Pixel Art](#pixel-art)
- [Schermafmeting en fullscreen](#fullscreen)
- [Loading Screen aanpassen](#loading-screen-aanpassen)
- [JSON laden](#json-laden)
- [Custom Events](#custom-events)
- [Afstand tussen twee punten](#afstand-tussen-punten)
- [Enemy behaviour](./behaviour.md)
- [Werken met vectoren](./vector.md)

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
<br>

### Keyboard events 

Het is mogelijk om te subscriben aan keyboard events. Hierbij moet je goed opletten of je de event listener toevoegt aan de `Game`, aan een `Scene`, of aan een `Actor`. De listeners blijven namelijk altijd actief, ook als je wisselt tussen scenes of als een actor doodgaat. In dit voorbeeld heeft de game drie listeners:

```js
class Game extends Engine {
    startGame() {
        this.input.keyboard.on("press", (evt) => this.keyPressed(evt))
        this.input.keyboard.on("release", (evt) => this.keyReleased(evt))
        this.input.keyboard.on("hold", (evt) => this.keyHeld(evt))
    }
    keyPressed(evt){
        if (evt.key === Keys.Space) {
            console.log("space was pressed")
        }
    }
    keyReleased(evt){
        console.log(evt.key)
    }
    keyHeld(evt){
        console.log(evt.key)
    }
}
```
🚨 Je kan event listeners uitzetten met `off`. Dit is nodig als een actor met listeners doodgaat, of als je een scene verlaat waar listeners in zaten. 

```js
class Level extends Scene {
    onDeactivate(engine){
        this.input.keyboard.off("press", (evt) => this.keyPressed(evt))
    }
}
```
<br><br><br>

### Camera volgt speler

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

### Binnen beeld blijven

Als je karakter niet uit beeld mag lopen kan je `clamp` gebruiken. 

```js
import { clamp } from "excalibur"

class Shark extends Actor {
    onPreUpdate(engine) {
        //...keyboard code hier
        this.pos.x = clamp(this.pos.x, 1280);   // afmeting van het level, bv. engine.drawWidth
        this.pos.y = clamp(this.pos.y, 720);    // afmeting van het level, bv. engine.drawHeight
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

        // alternatief
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
### Collision group

Een [Collision Group](https://excaliburjs.com/docs/collisiongroups/) zorgt dat actors in dezelfde group nooit met elkaar colliden.

<br><br><Br>

## Sturen en draaien

![draaien](../images/carangle.png)

Als je een auto bestuurt gebruik je `A`, `D` of ⬅️ ➡️ om de auto te draaien (`rotation`). Met de `W` of ⬆️ toets beweeg je in de richting waarin je gedraaid staat. Dit doe je door de `rotation` van de auto om te rekenen naar een `x,y` velocity.

```javascript
let speed = 0;
if (engine.input.keyboard.isHeld(Keys.Up)) {
    speed = 250;
}
if (engine.input.keyboard.isHeld(Keys.Right)) {
    this.rotation += 0.05;
}
if (engine.input.keyboard.isHeld(Keys.Left)) {
    this.rotation -= 0.05;
}
this.vel = Vector.fromAngle(this.rotation).scale(speed)
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

<br>

### Scene transitions

Je kan scenes laten outfaden / infaden:

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

### Waarden doorgeven aan een scene

Het is mogelijk om waarden zoals een score van de ene scene naar de andere door te geven via de `onActivate` functie.

```javascript
this.scene.engine.goToScene("game-over", { sceneActivationData: { score: 40 }})
```
Dit kan je dan als volgt uitlezen:
```javascript
export class GameOver extends Scene {
    onActivate(ctx) {
        console.log(`SCORE: ${ctx.data.score}`)
    }
}
```

<br><br><br>

## Rotate sprite

Standaard wordt een afbeelding gecentreerd op een Actor. Als je de actor roteert draait de afbeelding dus mooi om het middelpunt:

```js
export class Goomba extends Actor {
    constructor() {
        super({ width: Resources.Goomba.width, height: Resources.Goomba.height })
        this.pos = new Vector(100,100) 
        this.rotation = 0.5
        this.angularVelocity = 0.2
    }
}
```
Als je niet om het middelpunt wil roteren maar om een hoek, dan kan je een `anchor` gebruiken. Dit moet je via de constructor doorgeven.
```js
export class Goomba extends Actor {
    constructor() {
        super({
            anchor: new Vector(0, 0),
            width: Resources.Goomba.width, 
            height: Resources.Goomba.height 
        })
        this.pos = new Vector(0,0) 
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
        // start flipped
        this.graphics.flipHorizontal = true
    }
    // flip afhankelijk van richting
    onPreUpdate(engine){
        this.graphics.flipHorizontal = (this.vel.x > 0)
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

## Schermafmeting en fullscreen

#### Schermafmeting

In `game.js` geef je een schermafmeting aan in 16/9 verhouding. Als je game heel groot is moeten je afbeeldingen ook groter / scherper zijn. Een kleine game kan je op een groot scherm tonen met `displayMode: DisplayMode.FitScreen`. Een aantal geschikte afmetingen:

- 800 x 450
- 1280 x 720 
- 1600 x 900 
- 1920 x 1080

```js
export class Game extends Engine {
    constructor() {
        super({
            width: 1280,
            height: 720,
            displayMode: DisplayMode.FitScreen
        })
    }
}
```

#### Starten in fullscreen

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
> *Note: de arcadekast start al in fullscreen, dit hoef je niet toe te voegen*.

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

Je kan dit gebruiken voor [enemy behaviour](./behaviour.md)
