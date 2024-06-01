# Afstanden en Vectoren

De `Vector` class heeft allerlei handige functies, je kan bv. met `Vector.disance()` de afstand tussen twee punten opvragen.

Je kan een `Vector` gebruiken als positie, maar ook als richting. Een *direction vector* heeft getallen van 0 tot 1. Bv. `this.vel = new Vector(0, 1)` laat een schip naar rechts bewegen.

De `Vector` class biedt mogelijkheden om te rekenen met afstanden.

```js
// afstand tussen ship en enemy
let distance = Vector.distance(ship.pos, enemy.pos)


// richting van ship naar enemy, richting is een vector tussen 0 en 1
let direction = enemy.pos.sub(ship.pos).normalize()


// beweeg in de richting van de vijand
ship.vel = direction
// beweeg sneller
ship.vel = direction.scale(200)


// ship beweegt van een enemy af
ship.vel = direction.negate()


// beweeg in de richting waarin je gedraaid staat (bv voor een auto die draait met de cursor keys)
ship.vel = Vector.fromAngle(0.5)


// draaien in de richting van je velocity (bv voor een homing missile)
ship.rotation = Vector.toAngle(ship.vel)
```

> *[Bekijk hier voorbeelden voor enemy behaviour met vectoren](./behaviour.md)*