
# Code Snippets

- [Scrolling Background](./scrolling.md)
- [Spritesheet](./spritesheet.md)
- [Click en Exit Screen Events](#click-en-exit-screen-events)
- [Keyboard besturing](#keyboard-besturing)
- [Collision](#collision)
- [Sturen en draaien](#sturen-en-draaien)
- [Scenes](#scenes)
- [Physics](./physics.md)
- [Sprites wisselen in een actor](#sprites-wisselen-binnen-een-actor)
- [Meerdere sprites tegelijk](#meerdere-sprites-tegelijk)
- [Flip sprite](#flip-sprite)
- [Object spawner en timer](#object-spawner-en-timer)
- [Tekstveld met score](./tekstveld.md)
- [UI class](./ui.md)
- [Random tint](#random-tint)
- [Pixel Art](#pixel-art)
- [Health Bar](#health-bar)
- [Loading Screen aanpassen](#loading-screen-aanpassen)
- [JSON laden](#json-laden)
- [Fonts](#fonts)
- [Custom Events](#custom-events)
- [Afstand tussen twee punten](#afstand-tussen-punten)

<br><br><br>

## Click en Exit Screen Events

On Exit Screen
```javascript
class Fish extends Actor {
    onInitialize(engine) { 
        this.enableCapturePointer = true
        this.pointer.useGraphicsBounds = true
        this.on("exitviewport", (event) => this.resetPosition())
        this.on("pointerup", (event) => this.resetPosition())
    }
    resetPosition(){
        this.pos = new Vector(1000,10)      // verplaatsen
        this.kill()                         // verwijderen
    }
}
```
<br><br><br>

## Keyboard besturing

In dit voorbeeld kijken we in de `update` loop welke toetsen zijn ingedrukt. Aan de hand daarvan veranderen we de `velocity` van de speler.

```javascript
class Shark extends Actor {

    onPreUpdate(engine) {

        let xspeed = 0
        let yspeed = 0

        let kb = engine.input.keyboard

        if (kb.isHeld(Input.Keys.W) || kb.isHeld(Input.Keys.Up)) {
            yspeed = -300
        }
        if (kb.isHeld(Input.Keys.S) || kb.isHeld(Input.Keys.Down)) {
            yspeed = 300
        }
        if (kb.isHeld(Input.Keys.A) || kb.isHeld(Input.Keys.Left)) {
            xspeed = -300
            // optioneel, flip de sprite
            // this.sprite.flipHorizontal = true
        }
        if (kb.isHeld(Input.Keys.D) || kb.isHeld(Input.Keys.Right)) {
            xspeed = 300
            // optioneel, flip de sprite
            // this.sprite.flipHorizontal = false
        }
        
        // schieten en springen gebeurt maar 1 keer na een press
        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            console.log("jump!")
        }

        this.vel = new Vector(xspeed, yspeed)
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

        // blijf binnen beeld
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
        // collision box!
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

![draaien](./images/carangle.png)

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

GAME has SCENES
```javascript
import { Level1 } from './scenes/level1'
import { GameOver } from './scenes/gameover'

class Game extends Engine {

    everythingLoaded() {
        this.add('level1', new Level1())
        this.add('gameover', new GameOver())

        this.goToScene('level1')
    }
}
```
Je bouwt nu je levels in een SCENE in plaats van rechtstreeks in de game.

Een scene heeft een `onActivate` functie, deze wordt elke keer aangeroepen dat de scene actief wordt.

Gebruik de `engine` variabele om van scene te wisselen. Omdat je die variabele niet altijd beschikbaar hebt maak je er een property van.

```javascript
import { Scene } from "excalibur"

export class Help extends Scene {

    game

    onInitialize(engine) {
        this.game = engine
    }

    onActivate(ctx) {
        console.log("the scene has started!")
    }

    gameOver() {
        this.game.goToScene('gameover')
    }
}
```
<br>

### Waarden doorgeven aan een scene

Het is mogelijk om waarden zoals een score van de ene scene naar de andere door te geven via de `onActivate` functie.

```javascript
this.game.goToScene('gameover', { level: 4, score: 12 })
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





## Sprites wisselen binnen een actor

Je kan meerdere sprites in een graphic zetten met `add`. Je kan deze sprites tonen en verbergen met `show` en `hide`.
Of, je kan via `use` aangeven welke sprite op een bepaald moment getoond moet worden.

```javascript
export class Mario extends Actor {

    onInitialize(engine) {
        this.graphics.add('walk', Resources.Walk.toSprite())
        this.graphics.add('jump', Resources.Jump.toSprite())
    }

    walk() {
        this.graphics.show('walk') 
        this.graphics.hide('jump') 
        
        // of
        this.graphics.use('walk')
    }

    jump() {
        this.graphics.show('jump') 
        this.graphics.hide('walk') 
        
        // of
        this.graphics.use('jump')
    }
}
```



<br><br><br>

## Meerdere sprites tegelijk

Soms wil je meerdere plaatjes tegelijk tekenen binnen dezelfde actor. Dan heb je een graphics group nodig. In dit voorbeeld tonen we mario en luigi.

```js
onInitialize(engine) {

    const group = new GraphicsGroup({
        members: [
            {
                graphic: Resources.Mario.toSprite(),
                pos: new Vector(0, 0),
            },
            {
                graphic: Resources.Luigi.toSprite(),
                pos: new Vector(50, 50),
            }
        ],
    })
    this.graphics.use(group)
}
```
[Bekijk ook de UI](./ui.md) code voor een voorbeeld van een graphics group met tekstvelden.

<br><br><br>

## Flip sprite

MARIO.JS
```javascript
import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Sprite extends Actor {

    onInitialize(engine) {
        let sprite = Resources.Mario.toSprite()
        sprite.flipHorizontal = true
        this.graphics.use(sprite)
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

    
## Object Spawner en timer

De `Random` instance wordt één keer aangemaakt in de constructor. Deze wordt meerdere keren gebruikt bij spawn om een object een random plek te geven binnen de afmeting van 800 x 600. In onInitialize wordt een `Timer` aangemaakt die elke 1000 miliseconden this.spawn() uitvoert. 

```js
import {Actor, Random, Timer} from "excalibur";
import {Rock} from "./rock.js";

export class Spawner extends Actor{

    constructor() {
        super();

        this.random = new Random(1337)

    }

    onInitialize(engine) {
        this.timer = new Timer({
            fcn: () => this.spawn(engine),
            interval: 1000,
            repeats: true
        })
        engine.currentScene.add(this.timer)
        this.timer.start()
    }

    spawn(engine) {
        console.log("spawn")
        const rock = new Rock(
            this.random.integer(0, 800),
            this.random.integer(0, 600)
        )
        engine.currentScene.add(rock)
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

## Health Bar

Hieronder zie je een actor class die met behulp van `Rectangle` een health bar tekent. Je kan de health bar aanmaken met `new HealthBar()`

```javascript
import { Actor, Vector, Color, Sprite, Rectangle, clamp } from 'excalibur'

export class HealthBar extends Actor {

    healthrectangle

    constructor() {
        super({ width: 165, height: 30 })
        this.healthrectangle = new Rectangle({
            width: 165,
            height: 30,
            color: Color.Red,
        })
        this.anchor = new Vector(0, 0)
        this.graphics.use(this.healthrectangle)
    }

    resetHealth(){
        this.timerectangle.width = 165
    } 

    loseHealth(damage) {
        this.healthrectangle.width = this.healthrectangle.width - damage
        
        if (this.healthrectangle.width <= 0) {
            console.log("game over")
        }
    }
}
```
[zie ook het UI voorbeeld](./ui.md)

<br><br><br>


## Loading Screen aanpassen

RESOURCES.JS
```javascript
import titleImage from '../images/loadingscreen.png'

const ResourceLoader = new Loader([Resources.Fish, Resources.Mario])
ResourceLoader.logo = titleImage
ResourceLoader.logoWidth = 659
ResourceLoader.logoHeight = 203
ResourceLoader.backgroundColor = Color.White
ResourceLoader.loadingBarColor = Color.Black
```
### Starbutton aanpassen via CSS
```css
#excalibur-play {
    background: rgb(0, 0, 0) !important;
}
```
### Geheel eigen startbutton
```javascript
ResourceLoader.startButtonFactory = () => {
    let btn = document.createElement('button')
    btn.classList.add("my-own-cool-button")
    return btn
}
```
### Geen startbutton

De game gaat automatisch naar de eerste scene als de loading bar vol is. Dit kan gevolgen hebben voor het afspelen van audio in mobile devices.
```js
ResourceLoader.suppressPlayButton = true
```

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

## Fonts

Plaats het gewenste font in je assets map. Je kan het font laden in je `resources.js` file:
    
```js
import fontFile from "../css/PressStart2P-Regular.ttf"

const font = new FontFace("coolFont", `url(${fontFile})`)
document.fonts.add(font)
font.load()
```
Vervolgens kan je het overal in je game gebruiken :
    
```js
this.scoreText = new Text({
      text: 'Score: 0',
      font: new Font({
           family: 'coolFont',
           size: 20,
      }),
})
```
Het kan voorkomen dat je font nog niet is geladen voordat je game start, dit kan je checken via https://fontfaceobserver.com/

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
