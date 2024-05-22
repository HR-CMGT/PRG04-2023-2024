# Moving in a direction

![draaien](../images/carangle.png)

Als je een auto bestuurt gebruik je `A`, `D` of ⬅️ ➡️ om de auto te draaien (`rotation`). Met de `W` of ⬆️ toets beweeg je in de richting waarin je gedraaid staat. Dit doe je door de `rotation` van de auto om te rekenen naar een `x,y` velocity.

![car](../images/car.png)


```javascript
import { Actor, Vector, Input } from "excalibur";
import { Resources } from "./resources.js";

export class Car extends Actor {
  constructor() {
    super();
  }
  onInitialize(engine) {
    this.graphics.use(Resources.Car.toSprite());
    this.pos = new Vector(400, 400);
  }

  onPreUpdate(engine) {
    let speed = 0;
    if (engine.input.keyboard.isHeld(Keys.Up)) {
        speed = 250;
    }
    if (engine.input.keyboard.isHeld(Keys.Right)) {
        this.rotation += 0.05;
    }
    if (engine.input.keyboard.isHeld(Keys.Left)) {
        this.rotation -= 0.05;
    }
    this.vel = Vector.fromAngle(this.rotation).scale(speed)
  }
}
```
<br><br><br>

## Vector Math

De `Vector` class biedt meer mogelijkheden om te rekenen met afstanden:

```js
// afstand tussen ship en enemy
let distance = Vector.distance(ship.pos, enemy.pos)
// verschil in vector tussen ship en enemy
let vectorDifference = enemy.pos.sub(player.pos) 
// direction van ship naar enemy
let direction = vectorDifference.normalize()
// het schip beweegt nu naar de vijand
ship.vel = direction
// of je kan handmatig elk frame de direction naar de enemy optellen bij ship
ship.pos = ship.pos.add(direction)
// een vector afleiden uit een rotation
ship.vel = Vector.fromAngle(0.5)
// een rotation afleiden uit een vector
ship.rotation = Vector.toAngle(new Vector(10,33))
```