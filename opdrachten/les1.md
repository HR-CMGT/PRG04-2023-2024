# Les 1 - Week 1 Ochtend

- Introductie vak, cursushandleiding, toetsing
- Introductie Excalibur library
- Experimenteren in [Codesandbox Excalibur playground](https://codesandbox.io/s/excalibur-vite-testproject-olk4bu)

<br>
<br>
<br>

## Opdracht

Gebruik de presentatie voor code voorbeelden!

- Clone / Fork de Codesandbox oefening
- Gebruik je eigen afbeeldingen voor de achtergrond en sprites (voeg toe aan resources.js)
- Maak een Actor voor de achtergrondafbeelding
- Plaats Actors op de voorgrond met een position en een velocity
- Verwijder of verplaats de actors als er op geklikt wordt
- Bedenk een game concept met deze setup
- Deel je codesandbox link in TEAMS en speel elkaars games

<br><br><br>

## Tip : gebruik random voor variatie

```javascript
const fish = new Actor()
const sprite = Resources.Fish.toSprite()
fish.graphics.use(sprite)

// tint
sprite.tint = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255)

// position and velocity
fish.pos = new Vector(Math.random()*800 + 400,Math.random()*600)
fish.vel = new Vector(Math.random() * 50, 0)

// scale
const sc = Math.random() * 2
fish.scale = new Vector(sc, sc)
```


<Br>
<Br>
<Br>

## Inleveropdracht

[Kies een van de templates voor je eindproject](https://github.com/HR-CMGT/PRG04-2022-2023/blob/main/opdrachten/inleveropdracht.md)


<br>
<br>
<br>

## Links

- [Game Art](https://opengameart.org) en [Kenney](https://www.kenney.nl/assets)
- [Excalibur](https://excaliburjs.com)
- [Codesandbox Excalibur playground](https://codesandbox.io/s/excalibur-vite-testproject-olk4bu)
