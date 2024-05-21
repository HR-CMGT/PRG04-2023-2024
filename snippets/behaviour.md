# Enemy behaviour

De `Vector` class heeft hulpfuncties om afstanden uit te rekenen.

```js
let player = new Actor()
player.pos = new Vector(200,100)

let enemy = new Actor()
enemy.pos = new Vector(500,340)

let distance = Vector.distance(player.pos, enemy.pos)
```

## Direction

Een Vector wordt gebruikt voor posities, maar ook voor richting, bv. `this.vel = new Vector(1,0)` zorgt dat je elk frame 1 pixel naar rechts beweegt. Met de `normalize` functie kan je de `direction` naar een bepaald punt berekenen. Je kan dit gebruiken om naar een punt toe te bewegen of er juist vandaan te bewegen

```js
let distance = Vector.distance(player.pos, enemy.pos)
let directionVector = enemy.pos.sub(player.pos) 
let direction = directionVector.normalize()
if (distance > 500) {
    // run towards player
    enemy.vel = direction
} else {
    // flee from player
    enemy.vel = Vector.negate(direction)
}
```
