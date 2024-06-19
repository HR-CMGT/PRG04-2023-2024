# Gamepad besturing

Je kan de [Excalibur Gamepad](https://excaliburjs.com/docs/gamepad) gebruiken om gebruikersinput te lezen. Dit werkt zowel voor PS4 / XBox controllers als voor de arcade kast / joysticks.

<br><br><br>

### Gamepad onthouden

De gamepad vuurt een `connect` event af zodra je op een button drukt. Op dat moment kan je de gamepad opslaan. 

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
Nu kan je in de player de sticks en buttons uitlezen:

```javascript
export class Player extends Actor {

    onPreUpdate(engine) {
        if (!engine.mygamepad) { 
            return
        }
        // beweging
        const x = engine.mygamepad.getAxes(Axes.LeftStickX)
        const y = engine.mygamepad.getAxes(Axes.LeftStickY)
        this.vel = new Vector(x * 10, y * 10)

        // schieten, springen
        if (engine.mygamepad.isButtonPressed(Buttons.Face1)) {
            console.log('Jump!')
        }
    }
}
```


<br><br><br>


## 🎮 🎮 🎮 🎮 Local multiplayer

Het `connect` event gebeurt maar één keer per controller. Je kan dus voor elk `connect` event een nieuwe player aanmaken. Je slaat de controller dan op in de player.

```javascript
export class Game extends Engine {
    startGame(){
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected, assign to new player")
            let player = new Player(connectevent.gamepad)
            this.add(player)
        })
    }
}
```
```javascript
export class Player extends Actor {

    mygamepad

    constructor(gamepad){
        this.mygamepad = gamepad
    }

    onPreUpdate(engine) {
        const x = this.mygamepad.getAxes(Axes.LeftStickX)
        const y = this.mygamepad.getAxes(Axes.LeftStickY)
        this.vel = new Vector(x * 10, y * 10)

        if (this.mygamepad.isButtonPressed(Buttons.Face1)) {
            console.log('Jump!')
        }
    }
}
```

<br><br><br>

### Gamepad handmatig uitlezen

Je kan via `gamepads.at(0)` verschillende gamepads opvragen. Je moet nu wel handmatig checken of de gamepad `connected` is.

```javascript
let mygamepad = engine.input.gamepads.at(0) 
if(mygamepad.connected){
    // check de input hier
}
```
<br>
<Br>
<br>

## Events

Een alternatieve aanpak is om te luisteren naar events. Let echter op dat events door ***alle scenes*** heen afgevuurd zullen worden. Dit moet je dan uitzetten via `this.mygamepad.off('button')`.

```javascript
this.mygamepad.on('button', (buttonevent) => {
    if (buttonevent.button === Buttons.Face1) {
        console.log("button event is triggered")
    }
})
this.mygamepad.on('axis', (axisevent) => {
    if (axisevent.axis === Axes.LeftStickX && axisevent.value > 0.5) {
        console.log("move right event is triggered")
    }
})
```

<br><br><br>
