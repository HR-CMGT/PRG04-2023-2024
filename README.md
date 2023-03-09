# PRG04-2022-2023

## 👾👾👾 Object oriented game development 👾👾👾

In dit vak gaan we games bouwen met [excalibur](https://excaliburjs.com) in een moderne web development omgeving.

We leren Object Oriented Programming (OOP) omdat je dit in je carriere als developer veel zal tegenkomen en omdat het erg goed werkt voor het bouwen van games.

<br>
<Br>

### Excalibur

[Excalibur](https://excaliburjs.com) is een object-oriented library is die gebruik maakt van typescript. Excalibur geeft je een makkelijke manier om te werken met:

- Besturing
- Animatie
- Collisions
- Physics
- Scenes en Camera
- etc.

### Professioneel web development

Je leert de setup van een modern web development project met behulp van [Parcel](https://parceljs.org) en [Typescript](https://www.typescriptlang.org). Dit is niet alleen van toepassing voor games maar eigenlijk voor elk front-end web development project.

<br>
<br>
<br>

## Onderwerpen

| Les | OOP Theorie ochtend | Game Theorie middag | 
|------|---------|----------|
| 1 | Typescript. Classes en instances. Class diagram. | Werkomgeving met Excalibur en Parcel. Werken met modules en `import`. Resources laden en startknop gebruiken. Basis animatie met Actor en Vector. | 
| 2 | Composition en Encapsulation. Aparte bestanden voor classes | Actor class. Shark en array van Fishes. Collision. Keyboard input. | 
| 3 | Composition en Encapsulation | Spawning and removing bullets. Physics toevoegen. Camera follow player. World and Screen coordinates. |
| 4 | Inheritance | Excalibur classes extenden, eigen classes extenden. Scenes. Tiling background. Level opzetten in JSON. |
| 6 | Communicatie tussen classes | UI en Spritesheets. | 
| 7 | Object Oriented Game Design | Excalibur advanced topics |
| 8 | Object Oriented Game Design | [Game op Arcade Kast plaatsen](https://github.com/HR-CMGT/arcade-game) | 



<br>
<br>
<br>

## Excalibur Basics

- [Excalibur](https://excaliburjs.com) en [API](https://excaliburjs.com/docs/api/edge/index.html)
- [Actors](https://excaliburjs.com/docs/actors)

## Startcode

- [Voorbeeld project 1: leeg startproject](./startcode/)
- [Voorbeeld project 2: Classes, animatie, sound en collisions](./startcode-classes/)
- [Voorbeeld project 3: Physics](./startcode-physics/)

## Startcode gebruiken

- Installeer [NodeJS](https://nodejs.org/en/download/)
- Clone deze repository, of download de zip. Plaats de bestanden uit het gewenste project in een nieuwe map.
- Open deze nieuwe map in Visual Studio Code. Open een terminal.
- Typ `npm install` om excalibur, typescript en parcel te installeren.
- Typ `npm start` om de live ontwikkelserver te starten.
- Codeer je spel in de `src` folder.
- Typ `ctrl-c` om de live ontwikkelserver te stoppen.
- Typ `npm build` als je spel klaar is en je wil het naar github pages gaan uploaden. Maak de `docs` map vantevoren even leeg.

Na `npm install` ziet je project er als volgt uit:

```
docs
src/
├── index.html
├── css/
│   └── style.css
└── ts/
    ├── game.ts
    ├── fish.ts
    └── shark.ts
package.json
package-lock.json
.gitignore
node_modules
README.md
```

## Github Pages

- Zet github pages aan in de settings van je repository: `github.com/yourgame/settings/pages`
- Publiceer de branch `main` en kies als folder `docs`



<br>
<br>
<br>

## OOP in Excalibur

Een typescript class schrijf je als volgt.

```typescript
class Fish {
    private score = 10
    constructor() {
        console.log("I'm a fish")
    }
    showScore(){
        console.log(this.score)
    }
}
```

Door een excalibur class te extenden kan je je eigen functionaliteit toevoegen.

```typescript
import { Actor, Vector } from 'excalibur'
class Fish extends Actor {
    private score = 10
    constructor() {
        this.pos = new Vector(100,100)
        this.vel = new Vector(20,20)
    }
}
```

<br>
<br>
<br>

## Lesstof

- [Excalibur](https://excaliburjs.com)
- [Excalibur discussions](https://github.com/excaliburjs/Excalibur/discussions)
- [Excalibur API documentation](https://excaliburjs.com/docs/api/edge/index.html)
- [Typescript](https://www.typescriptlang.org) en  [Parcel](https://parceljs.org)
- [Voortgang opslaan met localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)


## Links

- [MDN Game Development](https://developer.mozilla.org/en-US/docs/Games)
- [Online Multiplayer met Socket.IO](https://socket.io) of [Lance](https://lance-gg.github.io)
- [Create Game Sounds](https://sfxr.me)
- [Genereer je Class Diagram met markdown](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNp9ks1uwyAMgF8F-bStzQtEO037uewwqVcuTvBatPAjA1Kjru--pBSUZto4IPRhPhvDCXqnCFroBwzhWeOe0UgrrZjGGxoSD00jnlLXDbSCrzocSuTOs44kHr8rX9OiyDuXbFl1ymQeG5tMRyxC75gW-EMftfDTtGDJK4x0d79Ayll6d6i03Rd-vk2Yi6gZm5LPE6kCf5k3fnD-D-F81_91za1udT53qBpKA45rMFagKER2Y_XBFgyxQa2mR7yIJMQDGZLQTkuF_CVB2jkuV_KidHQM7ScOgbaAKbrdaHtoIycqQdePcI06_wCsKKak)