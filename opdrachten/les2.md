# Les 2

Werken met classes en instances.

- Klassikaal voorbeeld: Pixel Aquarium
- Individuele opdracht: Whack a mole
- Code voorbeeld


<br><br><Br>

## Klassikaal voorbeeld: Pixel Aquarium

Gezamenlijk oefenen met het aanmaken van een individuele `Actor` class. Begin met onderstaande startcode

```js
import {Engine,Actor,Vector} from "excalibur";
import {Resources} from "./resources.js";

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        const fish = new Actor()
        this.add(fish)
        fish.graphics.use(Resources.Fish.toSprite())
        fish.pos = new Vector(20,20)
        fish.vel = new Vector(10,5)
    }
}
```

- Gebruik een `for` loop om 100 vissen te spawnen.
- Maak de snelheid en positie van elke vis random met `Math.random()`


<br><br><br>

## Individuele opdracht: Whack a Mole

*Code uit één file omzetten naar Object Oriented Code*

Gebruik de volgende code: [Whack a Mole](https://github.com/HR-CMGT/PRG04-whack-a-mole). 
De code van dit spelletje staat allemaal in `src/game.js`. 
Wanneer je deze repository cloned of gebruik maakt van het [startproject](https://github.com/HR-CMGT/prg4-startproject-2024), voer dan nog het volgende uit in de terminal
```bash
npm install
npm run dev
```

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

## Code voorbeeld

In het volgende voorbeeld maken we een `SuperMario` Actor class.

```js
import { Actor } from "excalibur"
import { Resources } from './resources'

export class SuperMario extends Actor {
    onInitialize(engine) {
        this.graphics.use(Resources.SuperMario.toSprite())
        this.pos = new Vector(400, 300)
        this.vel = new Vector(-10,0)
    }
}
```
Deze kan je in de game laden met
```js
import {Engine,Actor,Vector} from "excalibur";
import {Resources} from "./resources.js";
import {SuperMario} from "./supermario.js";

export class Game extends Engine {
    startGame() {
        const mario = new SuperMario()
        this.add(mario)
    }
}
```

<br><br><br>

## Links

- [Setup instructies](https://github.com/HR-CMGT/PRG04-2022-2023/blob/main/setup.md).
- [Excalibur](https://excaliburjs.com)
- [Codesandbox Excalibur playground](https://codesandbox.io/s/excalibur-vite-testproject-olk4bu)
- [Documentatie](https://excaliburjs.com/docs/text/).  
- [Git troubleshooting](../snippets/git.md)
