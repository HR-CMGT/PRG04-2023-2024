# Les 7

## Physics

In de game kan je `Realistic Physics` of `Arcade Physics` physics aanzetten. 

- "Arcade" style physics which is good for basic collision detection for non-rotated rectangular areas. Example: platformers, tile based games, top down, etc
- "Realistic" style physics which is good for rigid body games where realistic collisions are desired. Example: block stacking, angry bird's style games, etc

Per object kan je het type physics collision aanpassen. 

- `CollisionType.Active` (volledige physics simulatie)
- `CollisionType.Passive` (wel events, geen physics)
- `CollisionType.Fixed` (collision events, kan niet bewegen)

In de main game zet je physics aan en bepaal je de world gravity. Voor een space game of top-down game zet je de gravity op 0. Je kan ook per object de `body.useGravity` op true of false zetten. 

⚠️ Let op dat al je objecten een [collision](./snippets.md#collision) box hebben! Je kan ook gebruik maken van *collision groups* om te bepalen welke objecten met elkaar kunnen colliden.

<br><br><br>

## Voorbeeld

GAME
```js
const options = { 
    width: 800, height: 600, 
    backgroundColor: Color.White,
    physics: {
        solver: SolverStrategy.Realistic,
        gravity: new Vector(0, 800),
    }
}

export class Game extends Engine {
    constructor() {
        super(options)
        this.start(ResourceLoader).then(() => this.startGame())
    }
}
```
PLAYER - BOX COLLIDER
```js
export class Player extends Actor {
    constructor(x, y) {
        super({ width: 50, height: 10 })
        this.body.collisionType = CollisionType.Active
    }
}
```
PLATFORM - STATIC BOX COLLIDER
```js
export class Platform extends Actor {
    constructor(x, y) {
        super({ width: 500, height: 100 })
        this.body.collisionType = CollisionType.Fixed
    }
}
```

<br><br><br>

## Physics properties

Je kan een physics body de volgende properties meegeven:

- `this.body.mass` 
- `this.body.inertia`
- `this.body.bounciness`  *(alleen bij useRealisticPhysics)*
- `this.body.friction`  *(alleen bij useRealisticPhysics)*
    
<br><br><br>

## Player controls
    
De physics engine regelt de `velocity` van je objecten zoals de speler. Effecten zoals stuiteren zal je niet zien als je handmatig de `velocity` van een object gaat aanpassen. 

Je kan `impulse` gebruiken om een *richting* aan de bestaande `velocity` te geven. Dit wordt beïnvloed door `mass`. Een zwaarder object zal moeizamer op snelheid komen. 

VOORBEELD
    
```js
onInitialize(engine) {
    this.body.mass = 7    
}
onPreUpdate(engine, delta) {
    if (engine.input.keyboard.isHeld(Keys.D)) {
        this.body.applyLinearImpulse(new Vector(15 * delta, 0))
    }

    if (engine.input.keyboard.isHeld(Keys.A)) {
        this.body.applyLinearImpulse(new Vector(-15 * delta, 0))
    }

    if (this.grounded) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.body.applyLinearImpulse(new Vector(0, -250 * delta))
            this.grounded = false           // grounded weer op true zetten na collision met ground
    
            // alternatief voor springen met velocity
            // this.vel = new Vector(this.vel.x, this.vel.y - 400)
        }
    }
}
```

<br><br><br>

## Bouncy ball

```js
export class Ball extends Actor {
    constructor(){
        super({ radius: 50 })
        this.graphics.use(Resources.Ball.toSprite())
        this.body.collisionType = CollisionType.Active
        this.body.mass = 6
        this.body.bounciness = 0.7
        this.pos = new Vector(350, -50)
    }
}
```

<Br><br><br>

## Polygon collider

In dit voorbeeld maken we een triangle collider in de `onInitialize()`.

```js
export class Triangle extends Actor {
    onInitialize(engine) {
        const triangle = new PolygonCollider({
            points: [new Vector(-50, 0), new Vector(0, -80), new Vector(50, 0)]
        });
        this.body.collisionType = CollisionType.Fixed
        this.collider.set(triangle)
        this.pos = new Vector(120, 480)
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


<Br><br><br>

## Collision group

Je kan meerdere collision shapes *(circles, edges en boxes)* samenvoegen tot 1 collider met een complexe vorm. Hieronder een voorbeeld van een capsule (twee circles en een box) en een coastline (onregelmatige lijnen).

*capsule*

```js
import { Shape, Actor, Vector, CollisionType, CompositeCollider } from "excalibur"

export class Player extends Actor {
    onInitialize(engine) {
        let capsule = new CompositeCollider([
            Shape.Circle(10, new Vector(0, -20)),
            Shape.Box(20, 40),
            Shape.Circle(10, new Vector(0, 20)),
        ])
        this.body.collisionType = CollisionType.Active
        this.collider.set(capsule)
        this.pos = new Vector(400, 100)
    }
}
```
*coastline*

```js
export class CoastLine extends Actor {
    onInitialize(engine) {
        let landscape = new CompositeCollider([
            Shape.Edge(new Vector(0, 0), new Vector(120, 30)),
            Shape.Edge(new Vector(120, 30), new Vector(240, 50)),
            Shape.Edge(new Vector(240, 50), new Vector(320, 10)),
            Shape.Edge(new Vector(320, 10), new Vector(430, 35))
        ])
        this.body.collisionType = CollisionType.Fixed
        this.collider.set(landscape)
        this.pos = new Vector(400, 350)
    }
}
```
