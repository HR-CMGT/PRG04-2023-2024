# Les 2

## Code uit één file omzetten naar Object Oriented Code

Gebruik de volgende code: [Whack a Mole](https://github.com/HR-CMGT/PRG04-whack-a-mole)

De code van dit spelletje staat allemaal in `src/game.js`. 
Samen met een medestudent 
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

## Object Oriented Programming

In de presentatie heb je geleerd wat Object Oriented Programming inhoudt:

- Maak een `class` file voor elk object dat onderdeel is van je game.
- Gebruik het `new` keyword om `instances` van een class aan te maken.
- Een class kan het keyword `this` gebruiken om naar zichzelf te verwijzen.

> Hieronder zie je een voorbeeld van een `Car` class.

```javascript
export class Car {
    speed
    sound
    constructor() {
        this.speed = 0
        this.sound = "honk"
    }
    makeNoise() {
        console.log(this.sound)
    }
}
```
Om deze class te gebruiken in je project kan je het importeren en vervolgens een Car aanmaken:

```js
import { Car } from "car.js"
let c = new Car()
c.makeNoise() // dit logt "honk" in de console
```

<Br>
<Br>
<Br>

## Object Oriented Programming in Excalibur

We gaan dit concept oefenen in Excalibur. In het startproject staat alle code in de main game class:

```js
export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        const fish = new Actor()
        fish.graphics.use(Resources.Fish.toSprite())
        fish.pos = new Vector(400, 300)
        fish.vel = new Vector(-10,0)
        this.add(fish)
    }
}
```
<br>

### Een Actor class

We beginnen met aparte bestanden aan te maken voor de Actors in onze game. 

- Maak een nieuwe js file met de naam `fish.js`, maak daarin een class met de naam `Fish`. 
- Omdat we met Excalibur werken moet je `extends Actor` achter de class naam typen.
- Omdat de class overal in de game gebruikt mag worden moet je `export` gebruiken.

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

<Br>

### De Game class

Omdat de Fish nu in een eigen class staat, kan je de main game als volgt aanpassen:

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

<br>

### Opdracht

Fish class:

- Maak de snelheid en positie random met `Math.random()`

Game class:

- Gebruik een `for` loop om 100 vissen te spawnen.

<br><br><br>

## Links

- [Setup instructies](https://github.com/HR-CMGT/PRG04-2022-2023/blob/main/setup.md).
- [Excalibur](https://excaliburjs.com)
- [Codesandbox Excalibur playground](https://codesandbox.io/s/excalibur-vite-testproject-olk4bu)
- [Documentatie](https://excaliburjs.com/docs/text/).  
- [Git troubleshooting](../snippets/git.md)
