# Les 7

## Communicatie tussen classes

  - Waarden doorgeven
  - Communicatie tussen game en player
  - Communicatie tussen meerdere classes

<Br>
<Br>
<Br>

## Waarden doorgeven

Als je met `new` een instance van je `Player` aanmaakt (of een andere `Actor`), dan kan je waarden doorgeven, bijvoorbeeld: `let bullet = new Bullet(20,10)`. De waarden `20,10` komen vervolgens binnen in de `constructor` van jouw class.

BULLET.JS

```js
class Bullet extends Actor {
    constructor(x,y){
        super({x, y})
        console.log(`Ik sta nu op de positie ${x}, ${y}`)
    }
    onInitialize(engine) {       
        
    }
}
```
GAME.JS

```javascript
class Game extends Engine {
    
    startGame() {       
        let bullet = new Bullet(20,10)
        this.add(bullet)
    }
}
```


<Br>
<Br>
<Br>



## Communicatie tussen game en player

- Een `Actor` krijgt altijd een `engine` argument in de `update` of `initialize` functies.
- Het `engine` argument wijst altijd naar jouw `game` class. 
- Je kan deze verwijzing opslaan als een property van je `player` class, zodat je er altijd bij kan.

#### Voorbeeld: de engine houdt de score bij. Als de speler een muntje pakt, vertel je dat aan de engine.


```javascript
class Player extends Actor {
    
    mygame
    
    onInitialize(engine) {       
        this.mygame = engine
        this.graphics.use(Resources.Mario.toSprite())
    }
    hitSomething(event){
        if(event.other instanceof Coin) {
            this.mygame.findCoin()
        }
    }
}
```
GAME.JS

```javascript
class Game extends Engine {
    
    score
    player
    
    startGame() {       
        this.score = 0
        this.player = new Player()
    }
    findCoin(){
        this.score++
    }
}
```

<Br>
<Br>
<Br>

## Speler communiceert met UI

In dit voorbeeld maakt de game een `player` en een `ui`. Als de speler een muntje pakt kan je via het `game` argument rechtstreeks de `ui` aanroepen.

UI.JS
```javascript
class UI extends Actor {
    
    score
    
    onInitialize(engine) {       
        this.score = 0
    }
    updateScore(){
        this.score++
    }
}
```
PLAYER.JS
```javascript
class Player extends Actor {
    
    mygame
    
    onInitialize(engine) {       
        this.mygame = engine
        this.sprite = Resources.Mario.toSprite()
        this.graphics.use(this.sprite)
    }
    hitSomething(event){
        if(event.other instanceof Coin) {
            this.mygame.ui.updateScore()
        }
    }
}
```
GAME.JS

```javascript
class Game extends Engine {
    
    score
    ui
    player
    
    startGame() {       
        this.ui = new UI()
        this.player = new Player()
    }
}
```

