# Spritesheet

Met een `SpriteSheet` kan je meerdere sprites knippen uit een enkel PNG bestand. Deze kan je vervolgens in een `Animation` gebruiken.

PNG FILE <br>
![sheet](./images/player.png)

RESULTAAT <br>
![anim](./images/running.gif)

<br>
<br>
<br>

## Animaties bouwen

De image source heb je geladen in `Resources`. Je hoeft hier nog geen `toSprite()` te doen, dat gebeurt automatisch.

```javascript
const runSheet = SpriteSheet.fromImageSource({
    image: Resources.Player,
    grid: { rows: 1, columns: 21, spriteWidth: 96, spriteHeight: 96 }
})

const idle = runSheet.sprites[0] // geen animatie
const runLeft = Animation.fromSpriteSheet(runSheet, range(1, 10), 80)
const runRight = Animation.fromSpriteSheet(runSheet, range(11, 20), 80)
```

Via `graphics.add` kan je meerdere graphics tegelijk toevoegen. In dit geval de idle sprite, en de running left,  right animaties. Met `graphics.use` kan je zeggen welke animatie op dit moment getoond moet worden.

```javascript
this.graphics.add("idle", idle)
this.graphics.add("runleft", runLeft)
this.graphics.add("runright", runRight)

this.graphics.use(idle)
```



<br><br><br>

## Compleet voorbeeld

In dit voorbeeld gebruiken we keyboard controls om de verschillende animaties te tonen.

RESOURCES.JS
```javascript
let Resources = {
    Player: new ImageSource(playerImage),
}
```
PLAYER.JS
```javascript
export class Player extends Actor {

    constructor() {
        super()
        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Player,
            grid: { rows: 1, columns: 21, spriteWidth: 96, spriteHeight: 96 }
        })
        const idle = runSheet.sprites[0] // geen animatie
        const runLeft = Animation.fromSpriteSheet(runSheet, range(1, 10), 80)
        const runRight = Animation.fromSpriteSheet(runSheet, range(11, 20), 80)

        this.graphics.add("idle", idle)
        this.graphics.add("runleft", runLeft)
        this.graphics.add("runright", runRight)

        this.graphics.use(idle)
    }
    onInitialize(engine) {
        this.pos = new Vector(400,200)
        this.vel = new Vector(0,0)
    }
    onPreUpdate(engine) {

        let xspeed = 0
        this.graphics.use('idle')
    
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            xspeed = -300
            this.graphics.use('runleft')
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
            xspeed = 300
            this.graphics.use('runright')
        }

        this.vel = new Vector(xspeed, 0)
    }

}
```

In het codesandbox vind je ook een voorbeeld van een kaartspel waarbij alle kaarten in een PNG file staan, en de card class toont een random kaart.

- [CodeSandbox Voorbeeld](https://codesandbox.io/p/sandbox/excalibur-spritesheet-ysssx4)