# Enemy behaviour

De [Vector](./vector.md) class heeft allerlei hulpfuncties die je kan gebruiken om een enemy gedrag te geven. In deze voorbeelden heeft de game een player.

```js
class Game extends Engine {
    player
    onInitialize(engine){
        this.player = new Actor({x:200, y:100})
        this.add(this.player)
        this.add(new Enemy())
    }
}
```

<br><br><br>

## Loop naar de speler

```js
class Enemy extends Actor {
    onInitialize(engine){
        this.pos = new Vector(500, 40)
    }
    onPreUpdate(engine){
        let direction = this.sub(engine.player.pos).normalize()
        this.vel = direction.scale(200)
    }
}
```


<br><br><br>

## Sta stil, loop weg als de speler in de buurt komt

```js
class Enemy extends Actor {
    onInitialize(engine){
        this.pos = new Vector(500, 40)
        this.vel = new Vector(0,0)
    }
    onPreUpdate(engine){
        if(distance < 200) {
            let direction = this.sub(engine.player.pos).normalize()
            this.vel = direction.negate().scale(200)
        }
    }
}
```

