# Les 2

Werken met classes en instances.

- Opdracht 1: Whack a mole
- Object Oriented Programming in Excalibur
- Opdracht 2: Pixel Aquarium

<br><br><br>

## Opdracht 1: Whack a Mole

*Code uit één file omzetten naar Object Oriented Code*

Gebruik de volgende code: [Whack a Mole](https://github.com/HR-CMGT/PRG04-whack-a-mole). 
De code van dit spelletje staat allemaal in `src/game.js`. 

Samen met een medestudent:
- bekijk je deze code en gaan jullie regel-voor-regel na wat de code doet.
- Bedenk welke class(es) je nodig hebt om de code op te delen in losse stukken.
- Bepaal wat de verantwoordelijkheid van deze class wordt.
- Schrijf hiervoor eerst de basis van de class

```javascript
import {Actor} from "excalibur";
import {Resources} from "./resources.js";

export class NameOfTheClass extends Actor {
    constructor() {
        super();
    }

    onInitialize(engine) {
        
    }
}
```

- Gebruik commentaar om aan te geven welk gedrag en welke eigenschappen de class moet gaan krijgen.

```javascript
import {Actor} from "excalibur";
import {Resources} from "./resources.js";

export class NameOfTheClass extends Actor {

    // the class needs speed
    constructor() {
        super();
    }

    onInitialize(engine) {
        // the car needs to use a sprite
    }

    // the class needs to move
}
```
- Werk nu samen de class uit en maak het spelletje werkend. 

<br><br><br>

## Object Oriented Programming

- Maak een `Actor class` file voor elk object dat onderdeel is van je game.
- Gebruik het `new` keyword om `instances` van een Actor class aan te maken in je `Game`.
- Een class kan het keyword `this` gebruiken om naar zichzelf te verwijzen.

> *Hieronder zie je een voorbeeld van een `Car` class.*

```javascript
export class Car extends Actor {

    sound

    onInitialize(engine) {
        this.graphics.use(Resources.CarImage.toSprite())
        this.sound = "honk"
    }

    makeNoise() {
        console.log(this.sound)
    }
}
```

### Excalibur voorbeeld

In het volgende voorbeeld maken we een `Fish` class die wordt ingeladen in de `Game` class.

#### Fish Actor

```js
import { Actor } from "excalibur"
import { Resources } from './resources'

export class Fish extends Actor {
    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite())
        this.pos = new Vector(400, 300)
        this.vel = new Vector(-10,0)
    }
}
```
#### De Game class importeert de Actor

```js
import { Fish } from "fish.js"

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        const fish = new Fish()
        this.add(fish)
    }
}
```

<br><br><Br>

### Opdracht 2 : Pixel Aquarium

- Gebruik een `for` loop om 100 vissen te spawnen.
- Maak de snelheid en positie van elke vis random met `Math.random()`

<br><br><br>

## Links

- [Setup instructies](https://github.com/HR-CMGT/PRG04-2022-2023/blob/main/setup.md).
- [Excalibur](https://excaliburjs.com)
- [Codesandbox Excalibur playground](https://codesandbox.io/s/excalibur-vite-testproject-olk4bu)
- [Documentatie](https://excaliburjs.com/docs/text/).  
- [Git troubleshooting](../snippets/git.md)
