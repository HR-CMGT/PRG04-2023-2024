# Gamepad besturing

Je kan de [Excalibur Gamepad](https://excaliburjs.com/docs/gamepad) gebruiken om gebruikersinput te lezen. Dit werkt zowel voor PS4 / XBox controllers als voor de arcade kast / joysticks.

<br><br><br>

## Voorbeeld Update

Check de gamepad in de `update` functie. Dit werkt goed als je meerdere scenes hebt omdat je dan zeker weet dat alleen de update van de huidige scene wordt aangeroepen.

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
        const x = engine.gamepad.getAxes(Axes.LeftStickX)
        const y = engine.gamepad.getAxes(Axes.LeftStickY)
        this.vel = new Vector(x * 10, y * 10)

        if (engine.input.gamepads.at(0).wasButtonReleased(Buttons.Face1)) {
            console.log('Controller A button 1 was just released')
        }

        if (_engine.input.gamepads.at(0).isButtonPressed(Buttons.Face1)) {
            console.log('Controller A button 1 is currently being pressed')
        }
    }
}
```

<br>
<Br>
<br>


## Voorbeeld Events

Events: deze vuren af op het moment dat een event gebeurt. Met `on` kan je een event listener toevoegen. Let op dat events door ***alle scenes*** heen afgevuurd zullen worden. Je kan met `off` een listener weer verwijderen als je die niet meer nodig hebt. 

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

            this.gamepad.on('button', (buttonevent) => {
                if (buttonevent.button === Buttons.Face1) {
                    console.log("button event is triggered")
                }
            })
            this.gamepad.on('axis', (axisevent) => {
                if (axisevent.value > 0.5) {
                    console.log("move right event is triggered")
                }
            })
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