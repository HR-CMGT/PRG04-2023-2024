
# Code Snippets

Een verzameling handige snippets voor Excalibur.

- Scenes
- Game.js en Resources.js
- Events

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
export class Help extends Scene {

    onInitialize(engine) {
        const btn = new Actor()
        btn.graphics.use(Resources.Button.toSprite())
        btn.pos = new Vector(200,200)
        btn.enableCapturePointer = true
        btn.on('pointerup', (ev) => engine.goToScene('level1'))
        this.add(btn)
    }
}
```
<br><br><br>

## Startcode game en resources

GAME.JS
```javascript
import '../css/style.css'
import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        const fish = new Actor()
        fish.graphics.use(Resources.Fish.toSprite())
        fish.pos = new Vector(400, 300)
        this.add(fish)
    }
}

new Game()
```
RESOURCES.JS
```javascript
import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'

const Resources = {
    Fish: new ImageSource(fishImage)
}
const ResourceLoader = new Loader([Resources.Fish])

export { Resources, ResourceLoader }
```


<br><br><br>

## Events

Een child actor kan een event afvuren met `emit`. De parent actor kan hier naar luisteren met `on`.

CHILD ACTOR emits BLUB event
```javascript
class Fish extends Actor {
    onCollision() {
        this.emit('blub', new GameEvent())
    }
}
```
PARENT ACTOR listens to BLUB event
```javascript
class Aquarium extends Actor {
    onInitialize() {
        let fish = new Fish()
        this.add(fish)
        
        fish.on("blub", (ev) => {
            console.log("fish says blub")
        })
    }
}
```