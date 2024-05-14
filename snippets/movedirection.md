# Moving in a direction

![draaien](../images/carangle.png)

Gebruik links,rechts om te sturen, en UP om de auto in die richting te bewegen.

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
    this.vel = new Vector(0, 0);
  }

  onPreUpdate(engine) {
    let speed = 0;

    // UP = forward
    if (engine.input.keyboard.isHeld(Keys.Up)) {
      speed = -150;
    }

    // cursor keys is direction
    if (engine.input.keyboard.isHeld(Keys.Right)) {
      this.rotation += 0.05;
    }
    if (engine.input.keyboard.isHeld(Keys.Left)) {
      this.rotation -= 0.05;
    }

    // direction is the cosine/sine of the angle!
    let direction = new Vector(
      Math.cos(this.rotation) * speed,
      Math.sin(this.rotation) * speed
    );

    this.vel = direction;
  }
}
```
In deze afbeelding zie je hoe de rotation (θ, in radians) omgezet wordt naar een X,Y vector.

<img src="../images/angle.png" width="330">

<br><br><br>

## Vector Math

De `Vector` class biedt mogelijkheden om te rekenen met afstanden:

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
```