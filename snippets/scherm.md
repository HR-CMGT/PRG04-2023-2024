## Scherm instellingen

- afmeting
- pixel art
- play button
- loading screen en fullscreen

<br>

#### Afmeting

In `game.js` geef je een schermafmeting aan in 16/9 verhouding. Als je game heel groot is moeten je afbeeldingen ook groter / scherper zijn. Een kleine game kan je op een groot scherm tonen met `displayMode: DisplayMode.FitScreen`. Een aantal geschikte afmetingen:

- 800 x 450
- 1280 x 720 
- 1600 x 900 
- 1920 x 1080

```js
export class Game extends Engine {
    constructor() {
        super({
            width: 1280,
            height: 720,
            displayMode: DisplayMode.FitScreen,
            backgroundColor: Color.Black
        })
    }
}
```
#### Pixel art

```js   
export class Game extends Engine {
    constructor() {
        super({ 
            width: 480, 
            height: 320, 
            pixelArt: true,
            suppressPlayButton: false
        })
    }
}
```
> *Note: op de arcadekast kan je de playbutton weglaten*.

#### Loading screen en fullscreen

```js
const Resources = {
    Bird: new ImageSource('images/bird.png'),
    Tree: new ImageSource('images/tree.png'),
}

const ResourceLoader = new Loader({
    fullscreenAfterLoad: true,
    playButtonText : 'Begin!',
    logo : './images/title.png',
    logoWidth : 511,
    logoHeight : 231,
    backgroundColor : 'black'
})

for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}
export { Resources, ResourceLoader }
```
> *Note: de arcadekast start al in fullscreen*.
    
https://excaliburjs.com/docs/loaders