# Physics

In de game kan je `useRealisticPhysics` of `useArcadePhysics` physics aanzetten. Per object kan je het type physics collision aanpassen. 

- `CollisionType.Active` (volledige physics simulatie)
- `CollisionType.Passive` (wel events, geen physics)
- `CollisionType.Fixed` (collision events, kan niet bewegen)

In de main game zet je physics aan en bepaal je de world gravity. Voor een space game of top-down game zet je de gravity op 0. Je kan ook per object de `body.useGravity` op true of false zetten. 

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

<Br><br><br>

## Edge collider

Soms wil je alleen een rand hebben waar de speler niet langs mag. Dit kan je doen met een *edge collider*.
In dit voorbeeld loopt de edge van `0,0` naar `200,200`. 

```js
export class Border extends Actor {
    constructor() {
        super()
        let edge = new EdgeCollider({
            begin: new Vector(0, 0),
            end: new Vector(600, 20),
        })
        this.pos = new Vector(100, 500)
        this.body.collisionType = CollisionType.Fixed
        this.collider.set(edge)
    }
}
```
Je kan ook via `super` alle waarden meteen meegeven.
```js
export class Border extends Actor {
    constructor(){
        super({
            pos:new Vector(100,100),
            collider: new EdgeCollider({
                begin: new Vector(0, 0),
                end: new Vector(200, 200),
            }),
            collisionType:CollisionType.Fixed
        })
    }
}
```


<Br><br><br>

## Complexe colliders

Je kan meerdere collision shapes *(circles, edges en boxes)* samenvoegen tot 1 collider met een complexe vorm. Hieronder een voorbeeld van een capsule (twee circles en een box) en een coastline (onregelmatige lijnen).

*capsule*

```js
import { Shape, Actor, Vector, CollisionType, CompositeCollider } from "excalibur"

export class ColliderGroup extends Actor {
    constructor() {
        super({
            pos: new Vector(400, 100),
            collider: new CompositeCollider([
                Shape.Circle(10, new Vector(0, -20)),
                Shape.Box(20, 40),
                Shape.Circle(10, new Vector(0, 20)),
            ]),
            collisionType: CollisionType.Fixed
        })
    }
}
```
*coastline*

```js
export class ColliderGroup extends Actor {
    constructor() {
        super({
            pos: new Vector(400, 350),
            collider: new CompositeCollider([
                Shape.Edge(new Vector(0, 0), new Vector(120, 30)),
                Shape.Edge(new Vector(120, 30), new Vector(240, 50)),
                Shape.Edge(new Vector(240, 50), new Vector(320, 10)),
                Shape.Edge(new Vector(320, 10), new Vector(430, 35))
            ]),
            collisionType: CollisionType.Fixed
        })
    }
}
```
