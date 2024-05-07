# Gamepad besturing

Je kan de [Excalibur Gamepad](https://excaliburjs.com/docs/gamepad) gebruiken om gebruikersinput te lezen. Dit werkt zowel voor PS4 / XBox controllers als voor de arcade kast / joysticks.

- Check de gamepad in de `update` functie. Dit werkt goed als je meerdere scenes hebt omdat je dan zeker weet dat alleen de update van de huidige scene wordt aangeroepen.

- Events: deze vuren af op het moment dat een event gebeurt. Dit werkt goed voor shooting/jumping met controller buttons. Het nadeel van events is dat ze door alle scenes heen afgevuurd kunnen worden. Je moet event listeners dus weer verwijderen als je naar een andere scene gaat.


<br><br><br>


## Voorbeeld Update

In de player is een property voor de gamepad. Als de property gevuld is, dan kan je in de `onPreUpdate` elk frame kijken wat de positie van de sticks is, en of de buttons zijn ingedrukt.

```javascript
export class Game extends Engine {

    gamepad

    constructor() {
        super()
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame(){
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected")
            this.gamepad = connectevent.gamepad
        })
    }
}
```

```javascript
export class Player extends Actor {

    onPreUpdate(engine) {
        if (engine.gamepad === null) {
            return
        }
        const xValue = engine.gamepad.getAxes(Axes.LeftStickX)
        const yValue = engine.gamepad.getAxes(Axes.LeftStickY)
        this.vel = new Vector(xValue * 10, yValue * 10)

        if (engine.input.gamepads.at(0).isButtonPressed(Buttons.Face1)) {
            console.log('Controller A button 1 was pressed')
        }
    }
}
```

<br>
<Br>
<br>


## Voorbeeld Events

```javascript
export class Game extends Engine {

    gamepad

    constructor() {
        super()
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame(){
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected")
            this.gamepad = connectevent.gamepad
        })

        this.gamepad.on('button', (buttonevent) => {
            if (buttonevent.button === Buttons.Face1) {
                console.log("jump")
            }
        })
        this.gamepad.on('axis', (axisevent) => {
            if (axisevent.value > 0.5) {
                console.log("move right")
            }
        })
    }
}
```

<br><br><br>

## 🎮 🎮 🎮 🎮 Local multiplayer

Je kan in `game.js` een player aanmaken voor elke gamepad die is gedetecteerd. Dit werkt goed voor multiplayer games. 

```javascript
export class Game extends Engine {

    startGame(){
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected, assign to new player")
            let player = new Player(connectevent.gamepad)
        })
    }
}
```