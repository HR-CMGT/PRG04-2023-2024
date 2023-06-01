# Physics

In de game kan je `useRealisticPhysics` of `useArcadePhysics` physics aanzetten. Per object kan je het type physics collision aanpassen. 

- `CollisionType.Active` (volledige physics simulatie)
- `CollisionType.Passive` (wel events, geen physics)
- `CollisionType.Fixed` (collision events, kan niet bewegen)

Je kan per object de `body.useGravity` op true of false zetten. 

⚠️ Let op dat al je objecten een [collision](./snippets.md#collision) box hebben! Je kan ook gebruik maken van *collision groups* om te bepalen welke objecten met elkaar kunnen colliden.

<br><br><br>

## Voorbeeld

GAME

```js
export class Game extends Engine {
    constructor() {
        super()
        Physics.useRealisticPhysics()
        Physics.gravity = new Vector(0, 800)
    }
}
```
PLAYER
```js
export class Player extends Actor {
    constructor(x, y) {
        super({ width: 50, height: 10 })
        this.body.collisionType = CollisionType.Active
    }
}
```
PLATFORM
```js
export class Platform extends Actor {
    constructor(x, y) {
        super({ width: 500, height: 100 })
        this.body.collisionType = CollisionType.Fixed
    }
}
```

<br>

## Physics properties

Je kan een physics body de volgende properties meegeven:

- `this.body.mass` 
- `this.body.inertia`
- `this.body.bounciness`  *(alleen bij useRealisticPhysics)*
- `this.body.friction`  *(alleen bij useRealisticPhysics)*
    
<br>

## Physics movement
    
De physics engine regelt de `velocity` van je objecten zoals de speler. Effecten zoals stuiteren zal je niet zien als je handmatig de `velocity` van een object gaat aanpassen. 

Je kan `impulse` gebruiken om een *richting* aan de bestaande `velocity` te geven. Dit wordt beïnvloed door `mass`. Een zwaarder object zal moeizamer op snelheid komen. 

VOORBEELD
    
```js
onInitialize(engine) {
    this.body.mass = 7    
}
onPreUpdate(engine, delta) {
    if (engine.input.keyboard.isHeld(Input.Keys.D)) {
        this.body.applyLinearImpulse(new Vector(15 * delta, 0))
    }

    if (engine.input.keyboard.isHeld(Input.Keys.A)) {
        this.body.applyLinearImpulse(new Vector(-15 * delta, 0))
    }

    if (this.grounded) {
        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            this.body.applyLinearImpulse(new Vector(0, -250 * delta))
            this.grounded = false           // grounded weer op true zetten na collision met ground
    
            // alternatief voor springen met velocity
            // this.vel = new Vector(this.vel.x, this.vel.y - 400)
        }
    }
}
```