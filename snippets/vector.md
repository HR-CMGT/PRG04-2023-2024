# Werken met Vectoren

Je kan een `Vector` gebruiken als positie, maar ook als richting. Een *direction vector* heeft getallen van 0 tot 1. Bv. `this.vel = new Vector(0, 1)` laat een schip naar rechts bewegen.

De `Vector` class biedt mogelijkheden om te rekenen met afstanden.

```js
// afstand tussen ship en enemy
let distance = Vector.distance(ship.pos, enemy.pos)


// richting van ship naar enemy
let vectorDifference = enemy.pos.sub(ship.pos) 
let direction = vectorDifference.normalize()


// beweeg in de richting van de vijand
ship.vel = direction


// ship beweegt van een enemy af
ship.vel = direction.negate()


// een direction vermenigvuldigen met snelheid
let speed = 200
ship.vel = direction.scale(speed)


// een vector afleiden uit een rotation (bv voor een auto)
ship.vel = Vector.fromAngle(0.5)


// draaien in de richting van je velocity (bv voor een homing missile)
ship.rotation = Vector.toAngle(ship.vel)
```