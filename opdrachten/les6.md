# Les 6 

- Wisselen tussen schermen
- Timers en spawning
- Health bar
- UI class

## Wisselen tussen schermen

- In de `game` class kan je `scenes` toevoegen in plaats van `Actors`.
- Een `Scene` bevat `Actors` en je gameplay code.
- De game kan wisselen tussen scenes.
- Een Scene onthoudt de laatste state, dus als je heen en weer wisselt tussen twee scenes dan gaat de scene weer door op het vorige punt.

<br><br><br>

## Scenes

Als je een `Scene` aanmaakt dan voeg je de Actors op in de `onInitialize` functie. In de `onActivate` functie plaats je de code die uitgevoerd moet worden als er naar deze scene toe gesprongen wordt.

GAME.JS

```js
export class Game extends Engine {
    constructor(){
        super() 
        this.start(ResourceLoader).then(() => this.startGame())
    }
    startGame() {
        this.add('level', new Level())
        this.add('game-over', new GameOver())
        this.goToScene('level')
    }
}
```
LEVEL.JS

```js
export class Level extends Scene {
    onInitialize(engine) {
        this.add(new Enemy())
        this.add(new Ship())
    }
    onActivate(ctx) {
        console.log("reset het level")
    }
    gameOver(){
        this.engine.gotoScene('game-over')
    }
}
```

### Expert tip: scene transitions

Je kan scenes laten outfaden / infaden:

```js
let transitions = {
    in: new FadeInOut({ duration: 400, direction: 'in', color: Color.Black }),
    out: new FadeInOut({ duration: 400, direction: 'out', color: Color.Black })
}
this.add('intro', { scene: new Intro(), transitions })
this.add('level', { scene: new Level(), transitions })
```


<br><br><br>

## Spawning

Met spawning bedoelen we dat er tijdens de game nieuwe actors worden aangemaakt. Als je schiet dan spawned er een bullet. Meestal geef je de `x,y` waarden mee, dat is waar de bullet moet verschijnen:

```js
export class Level extends Scene {
    spawnBullet(x, y) {
        this.add(new Bullet(x, y))
    }
}
export class Bullet extends Actor {
    constructor(x, y) {
        super({ x, y, width: 10, height: 10 }) 
    }
}
```

<br><br><br>

## Timers

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

- [Zie Excalibur Timers](https://excaliburjs.com/docs/timers)


<br><br><br>

## Health bar

Een `Actor` kan een achtergrondkleur hebben. Dit is handig voor een healthbar:

```js
export class Level extends Scene {
    healthbar
    onInitialize(engine) {
        this.healthbar = new Actor({x: 10, y: 40, color: Color.Green, width: 200, height: 20})
        this.healthbar.graphics.anchor = Vector.Zero
        this.add(this.healthbar)
    }
    updateScore() {
        this.healthbar.scale = new Vector(0.5, 1) // halve health
    }
}
```

<br><br><br>

## UI Class

Je kan al je UI elementen zoals health bars en tekstvelden het beste in een eigen `Scene` zetten. Als je game een camera heeft, dan kan je beter een `ScreenElement` gebruiken. Deze blijft altijd in beeld staan, ook als de camera beweegt.

UI.JS 🧅

```js
export class UI extends ScreenElement {
    onInitialize(engine) {
        this.scoreText = new Label({...})
        this.addChild(this.scoreText)
    }
}
```
LEVEL.JS
```js
export class Level extends Scene {
    onInitialize(engine) {
        this.ui = new UI()
        this.add(this.ui)
    }
}
```