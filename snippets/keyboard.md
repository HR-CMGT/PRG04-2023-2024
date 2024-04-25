# Toetsenboard besturing

Compleet voorbeeld

```js
export class Car extends Actor {
  onInitialize(engine) {
    this.graphics.use(Resources.Car.toSprite());
    this.pos = new Vector(400, 400);
    this.vel = new Vector(0, 0);
  }

  onPreUpdate(engine) {
    let xspeed = 0;
    let yspeed = 0;

    if (
      engine.input.keyboard.isHeld(Keys.W) ||
      engine.input.keyboard.isHeld(Keys.Up)
    ) {
      yspeed = -1;
    }

    if (
      engine.input.keyboard.isHeld(Keys.S) ||
      engine.input.keyboard.isHeld(Keys.Down)
    ) {
      yspeed = 1;
    }

    if (
      engine.input.keyboard.isHeld(Keys.D) ||
      engine.input.keyboard.isHeld(Keys.Right)
    ) {
      xspeed = 1
    }

    if (
      engine.input.keyboard.isHeld(Keys.A) ||
      engine.input.keyboard.isHeld(Keys.Left)
    ) {
      xspeed = -1
    }
    this.vel = new Vector(xspeed, yspeed);


    if (engine.input.keyboard.wasPressed(Keys.Space)) {
        console.log("shoot!")
    }
  }
}
```

- [Bekijk ook het voorbeeld voor het besturen van een auto](./movedirection.md)