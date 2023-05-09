
# Code Snippets

- [Scrolling Background](./scrolling.md)
- Click en Exit Screen Events
- Tekstveld
- Scenes
- JSON laden
- Sprites wisselen binnen een actor
- Custom Events
- Flip sprite

<br><br><br>

## Click en Exit Screen Events

On Exit Screen
```javascript
fish.on("exitviewport", (event) => {
    fish.pos = new Vector(500,100)
})
```
On Click
```javascript
mario.enableCapturePointer = true
mario.pointer.useGraphicsBounds = true
mario.on("pointerup", (event) => {
    mario.pos = new Vector(200,200)    // verplaatsen
    mario.kill()                       // verwijderen
})
```
<br><br><br>

## Tekstveld

```javascript
import { Actor, Engine, Vector, Label, FontUnit, Font} from "excalibur";

let label = new Label({
  text: 'Score',
  pos: new Vector(100, 100),
  font: new Font({
    family: 'impact',
    size: 24,
    unit: FontUnit.Px
  })
})

this.add(label)
```

<br><br><br>

## Scenes

GAME has SCENES
```javascript
import { Level1 } from './scenes/level1'
import { Help } from './scenes/help'

class Game extends Engine {

    everythingLoaded() {
        this.add('level1', new Level1())
        this.add('help', new Help())

        this.goToScene('help')
    }
}
```
SCENE has ACTORS.
Gebruik de `engine` variabele om van scene te wisselen.
```javascript
import { Scene } from "excalibur"

export class Help extends Scene {

    onInitialize(engine) {
        const mario = new Mario() // actor
        this.add(mario)
        mario.enableCapturePointer = true
        mario.on('pointerup', (ev) => engine.goToScene('level1'))
    }
}
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


## Sprites wisselen binnen een actor

Je kan meerdere sprites in een graphic zetten en ze tonen en verbergen met `show` en `hide`

```javascript
export class Mario extends Actor {

    onInitialize(engine) {
        this.graphics.add('walk', Resources.Walk.toSprite())
        this.graphics.add('jump', Resources.Jump.toSprite())
    }

    walk() {
        this.graphics.show('walk') 
        this.graphics.hide('jump') 
    }

    jump() {
        this.graphics.show('jump') 
        this.graphics.hide('walk') 
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

## Flip sprite

MARIO.JS
```javascript
import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Sprite extends Actor {

    onInitialize(engine) {
        // optie 1: flip de sprite bitmap
        this.sprite = Resources.Mario.toSprite()
        this.graphics.use(this.sprite)
        this.sprite.flipHorizontal = true

        // optie 2: flip de hele actor
        // het kan dan nodig zijn om de anchor te verplaatsen
        this.scale = new Vector(-1, 1);
        this.anchor = new Vector(1, 0);
    }
}
```



<br><br><br>
