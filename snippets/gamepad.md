# Gamepad besturing

Je kan de [Excalibur Gamepad](https://excaliburjs.com/docs/gamepad) gebruiken om gebruikersinput te lezen. Dit werkt zowel voor PS4 / XBox controllers als voor de arcade kast / joysticks.

<br><br><br>

## Voorbeeld

Je moet `gamepads` aanzetten in je `game`.

```javascript
export class Game extends Engine {

    constructor() {
        super()
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame(){
        this.input.gamepads.enabled = true
    }
}
```
Je kan via `gamepads.at(0)` verschillende gamepads opvragen. Je moet wel opletten dat de gamepad `connected` is.

```javascript
export class Player extends Actor {

    onPreUpdate(engine) {
        // de eerste aangesloten gamepad
        let mygamepad = engine.input.gamepads.at(0) 

        // als de gamepad connected is, dan axes en buttons lezen
        if(mygamepad.connected){
            const x = mygamepad.getAxes(Axes.LeftStickX)
            const y = mygamepad.getAxes(Axes.LeftStickY)

            if (mygamepad.wasButtonReleased(Buttons.Face1)) {
                console.log('Controller A button 1 was just released')
            }

            if (mygamepad.isButtonPressed(Buttons.Face1)) {
                console.log('Controller A button 1 is currently being pressed')
            }
            
            this.vel = new Vector(x * 10, y * 10)
        }
    }
}
```

<br>
<Br>
<br>

### Optioneel : Gamepad opslaan

De gamepad vuurt een `connect` event af zodra je op een button drukt. Op dat moment kan je ook de gamepad opslaan. Dan hoef je niet telkens te checken of `gamepads.at(0)` connected is. 

```javascript
export class Game extends Engine {

    mygamepad

    constructor() {
        super()
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame(){
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected")
            this.mygamepad = connectevent.gamepad
        })
    }
}
```

```javascript
export class Player extends Actor {

    onPreUpdate(engine) {
        if (engine.mygamepad) { 
            const x = engine.mygamepad.getAxes(Axes.LeftStickX)
            const y = engine.mygamepad.getAxes(Axes.LeftStickY)

            if (engine.mygamepad.isButtonPressed(Buttons.Face1)) {
                console.log('Controller A button 1 is currently being pressed')
            }

            this.vel = new Vector(x * 10, y * 10)
        }
    }
}
```

<br>
<Br>
<br>


## Events

De gamepad kan ook events afvuren, let echter op dat events door ***alle scenes*** heen afgevuurd zullen worden: 

```javascript
export class Game extends Engine {

    mygamepad

    constructor() {
        super()
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame(){
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected")
            this.mygamepad = connectevent.gamepad

            this.mygamepad.on('button', (buttonevent) => {
                if (buttonevent.button === Buttons.Face1) {
                    console.log("button event is triggered")
                }
            })
            this.mygamepad.on('axis', (axisevent) => {
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

Je kan in `game.js` een player aanmaken voor elke gamepad die wordt gedetecteerd. Dit werkt goed voor multiplayer games en voor `drop in drop out` games.

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