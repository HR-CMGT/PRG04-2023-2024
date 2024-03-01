# Advanced setup

- build preview
- starting from scratch
- VS code settings
- Codesandbox playground

<br>
<br>
<br>

## Build preview

Om snel te testen of het publiceren naar de `docs` map werkt kan je een preview doen. Dit kan je toevoegen aan `package.json`:

```json
"scripts": {
    "preview": "vite preview --outDir=docs --base=./"
},
```

<br>
<br>
<br>

## Starting from scratch

Maak een [Vite](https://vitejs.dev) project met `npm create vite@latest`. In de Vite setup kies je voor `vanilla` en `javascript`. Vervolgens open je de projectmap en installeer je excalibur.

```bash
npm create vite@latest mijn-game-project # kies voor vanilla en javascript
cd mijn-game-project
npm install excalibur
npm run dev
```
Je krijgt nu een standaard Vite project. Voeg een `SRC` folder toe. Je kan de `PUBLIC` map en de voorbeeldcode van Vite verwijderen (`counter.js, main.js, `en de `.svg files`)

### Package.json aanpassen

Voeg het build en preview commando toe aan package.json. We voegen hier `docs` toe aan de `outDir` omdat github pages met een `docs` folder werkt. De `base` variabele bepaalt het startpunt van waaruit je project naar bestanden gaat zoeken. 

```json

```json
 "scripts": {
    "dev": "vite",
    "build": "vite build --outDir=docs --base=./",
    "preview": "vite preview --outDir=docs --base=./"
  },
```
<br>
<br>
<br>

## Startcode voor game en resources

Je kan onderstaande twee classes toevoegen aan de SRC map. Let op dat je `game.js` inlaadt in `index.html`. `index.html` staat in de root. Verder staan alle werkbestanden in de SRC map.

GAME.JS

```javascript
import { Actor, Engine, Vector, Label, Font, Color } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
        // als je geen plaatjes wil laden:
        // this.start().then(() => this.startGame())
    }

    startGame(){
        // voorbeeld tekstlabel
        let textField = new Label({
            font: new Font({
                family: "Arial",
                size: 32,
                color: Color.White
            })
        })
        textField.text = `Score: 0`
        textField.pos = new Vector(20, 30)
        this.add(textField)

        // voorbeeld actor
        const fish = new Actor()
        fish.graphics.use(Resources.Fish.toSprite())
        fish.pos = new Vector(400, 300)
        fish.vel = new Vector(-50, 0)
        this.add(fish)
    }
}

new Game()
```
RESOURCES.JS
```javascript
import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'

const Resources = {
    Fish: new ImageSource(fishImage)
}
const ResourceLoader = new Loader([Resources.Fish])

export { Resources, ResourceLoader }
```


<br>
<br>
<br>

## VS Code Tip

Tip: clickable npm commando's in VS Code

Het is super handig om de npm commando's aan te kunnen klikken:

```
Open "File > Preferences > Settings"
Search "npm script"
Toggle "Npm: Enable Script Explorer"
```

<br>
<br>
<br>


## Codesandbox playground

[Codesandbox Vite Excalibur playground](https://codesandbox.io/s/excalibur-vite-testproject-olk4bu?file=/game.js)