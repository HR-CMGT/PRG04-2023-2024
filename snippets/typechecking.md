# Type checking

Door type checking aan te zetten krijg je een meer stricte / strenge controle op je code. Je kan dan bijvoorbeeld geen functies aanroepen met de verkeerde waarden.

- Type checking in Javascript
- Type checking in Typescript

<br>
<br>
<br>

## Type checking in Javascript

Door **checkJS** op `true` te zetten in een `jsconfig.json` file, krijg je advanced type checking. 

JSCONFIG.JSON

```json
{
    "compilerOptions": {
        "strict": true,
        "module": "esnext",
        "target": "es6",
        "checkJs": true,
        "strictPropertyInitialization": false,
        "moduleResolution": "node"
    },
    "include": [
        "src/js/**/*"
    ]
}
```
Je kan nu [JSDoc](https://jsdoc.app) type notatie gebruiken om types aan te duiden. Hieronder zie je voorbeelden voor classes en functies.

```javascript
/**
 * @class Bubble
 * @extends {Actor}
 */
xport class Bubble extends Actor {
    /**
     * @type { UI }
     */
    ui
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        super({ x, y }) 
    }
    /**
     * @param { Engine } engine
     */
    onInitialize(engine) {
    }
    
}
```
Als je het type écht niet weet kan je `type:any` gebruiken, maar dit is eigenlijk hetzelfde als geen type checking gebruiken.


<br>
<br>
<br>

## Type checking in Typescript

Typescript is een superset van Javascript. Dit wil zeggen dat je alle javascript code kan gebruiken in typescript. Typescript voegt hier type checking aan toe.

Excalibur is geschreven in typescript dus dit werkt goed samen. Je hoeft nu geen `@param` notatie te gebruiken.

Je installeert typescript via
```bash
§ npm install typescript
```
Je bestanden geef je nu een `.ts` extensie. Door `npm run dev` of `npm run build` te doen, wordt dit omgezet naar javascript.

TSCONFIG.JSON
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "moduleResolution": "Node",
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Je kan nu types rechtstreeks aanduiden in je functies. Hieronder zie je een voorbeeld van een game met typescript.

GAME.TS
```typescript
import { Actor, Engine, Loader } from "excalibur"
import { Resources } from "./resources"

export class Game extends Engine {

    constructor() {
        super()
        const loader = new Loader([Resources.Fish])
        this.start(loader).then(() => this.startGame())
    }

    showMessage(str : string) : void {
        console.log(`Hello ${str}`)
    }

    addNumbers(a : number, b : number) : number {
        return a + b
    }

    onPreUpdate(engine : Engine) : void {
        
    }
}

new Game()
```