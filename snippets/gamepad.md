# Gamepad besturing

Je kan de [Excalibur Gamepad](https://excaliburjs.com/docs/gamepad) gebruiken om gebruikersinput te lezen. Dit werkt zowel voor PS4 / XBox controllers als voor de arcade kast / joysticks.

- Events: deze vuren af op het moment dat een event gebeurt. Dit werkt goed voor shooting/jumping met controller buttons.
- Polling in onUpdate : hiermee kijk je elk frame wat de positie van de sticks is. Dit werkt goed voor movement.

<br><br><br>

GAME.JS - test of gamepad werkt:

```javascript
export class Game extends Engine {

    constructor() {
        super()
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame(){
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log('Gamepad connected', connectevent)

            // test: reageren op button en axis events
            connectevent.gamepad.on('button', (buttonevent) => {
                if (buttonevent.button === Buttons.Face1) {
                    console.log("jump")
                }
            })
            connectevent.gamepad.on('axis', (axisevent) => {
                console.log(axisevent.axis, axisevent.value)
                if (axisevent.value > 0.5) {
                    console.log("move right")
                }
            })
        })
    }
}
```

<br><br><br>

### Bewegen met gamepad

In de player is een property voor de gamepad. Als de property gevuld is, dan kan je in de `onPreUpdate` elk frame kijken wat de positie van de sticks is.

PLAYER.JS

```javascript
export class Player extends Actor {

    gamepad = null

    onInitialize(engine) {
        engine.input.gamepads.on('connect', (connectevent) => {
            console.log('Gamepad connected', connectevent)
            this.gamepad = connectevent.gamepad
            this.gamepad.on('button', (buttonevent) => this.buttonPressed(buttonevent))
        })
    }

    buttonPressed(buttonevent) {
        if (buttonevent.button === Buttons.Face1) {
            console.log("shoot!")
        }
    }

    onPreUpdate(engine) {
        if (this.gamepad === null) {
            return
        }
        const speed = 40
        const xValue = this.gamepad.getAxes(Axes.LeftStickX)
        const yValue = this.gamepad.getAxes(Axes.LeftStickY)
        this.vel = new Vector(xValue * speed, yValue * speed)
    }
}
```

<br>
<Br>
<br>

## Next steps

Je kan in `game.js` de player pas aanmaken zodra een gamepad is gedetecteerd.