# PRG04-2022-2023

## 👾Object oriented game development 👾

In dit vak gaan we met Object Oriented Programming games bouwen. We gebruiken de [excalibur library](https://excaliburjs.com). Dit is een object-oriented library, waarmee je snel de basics van game development kan opzetten:

- Besturing
- Animatie
- Collisions
- Physics
- Scenes en Camera
- etc.

[TESTPROJECT MARIO PLATFORM GAME IN JAVASCRIPT](https://github.com/HR-CMGT/PRG04-2022-2023-finished/tree/main/javascript/javascript-mario)

<br>
<br>
<br>

## Planning en dagindeling (WORK IN PROGRESS)

- 6 weken, 3 uur ochtend, 1 uur pauze, 3 uur middag. 
- Zelfstudie en toetsvoorbereiding: 8 uur / week
- Totaal 84 uur / 3 studiepunten
- Ochtend: 
    - OOP theorie uitleg en hands-on 1 uur
    - Zelfstandig werken 1 uur
    - OOP theorie uitleg en oefening 1 uur
- Middag: 
    - OOP in Excalibur uitleg en hands-on 1 uur
    - Zelfstandig werken 1.5 uur
    - Afsluiting dag: 0.5 uur (links in teams, elkaars games spelen)

<br>
<br>
<br>

## TODO

- Studenten duidelijk doel geven waar ze naartoe werken
- Voorbeelden van games die studenten kunnen maken met deze lessen
- Concrete les oefeningen waar ze de tijd voor krijgen / nodig hebben
- Kennisclips PIXI opnieuw ?!?!? 😭
- Omschrijven game typen? Top down, side scroller, platformer, infinite runner, text-based, etc.

<br>
<br>
<br>

## Toetsing (WORK IN PROGRESS)

- Eindopdracht : game waar alle OOP onderwerpen in terug komen.
- Code live op github pages en in eigen repo.
- Feedbackfruits links en zelfevaluatie inleveren
- Evaluatie op leerdoelen:
    - Classes en instances
    - Composition en Encapsulation
    - Inheritance
    - Communicatie tussen classes
    - Object Oriented Design
    - Game development leerdoel 1
    - Game development leerdoel 2
    - Game development leerdoel 3

<br>
<br>
<br>

## Onderwerpen (WORK IN PROGRESS)

| Les | OOP Theorie ochtend | Game Theorie middag | 
|------|---------|----------|
| 1 | Classes en instances. Class diagram. | Werkomgeving met Excalibur en Github Pages. Werken met modules en `import`. Resources laden en startknop gebruiken. Basis animatie met Actor en Vector. onClick basic gameplay | 
| 2 | Composition en Encapsulation. Aparte bestanden voor classes | Actor class. Shark en array van Fishes. Collision. Keyboard input. Position, velocity, acceleration. | 
| 3 | Composition en Encapsulation | Spawning and removing bullets. Physics toevoegen. Camera follow player. Top down view. World and Screen coordinates. |
| 4 | Inheritance | Excalibur classes extenden, eigen classes extenden. Scenes. Tiling background. UI en Spritesheets. |
| 5 | Communicatie tussen classes | Level opzetten in JSON.  | 
| 6 | Object Oriented Design | [Game op Arcade Kast plaatsen](https://github.com/HR-CMGT/arcade-game) | 



<br>
<br>
<br>

## Github Pages

- Zet github pages aan in de settings van je repository: `github.com/yourgame/settings/pages`
- Publiceer de branch `main` en kies de map waar je `index.html` staat als root folder.

<br>
<br>
<br>

## OOP in Excalibur

Een OOP class schrijf je als volgt.

```javascript
class Fish {
    score = 10
    constructor() {
        console.log("I'm a fish")
    }
    showScore(){
        console.log(this.score)
    }
}
```

Door een excalibur class te extenden kan je je eigen functionaliteit toevoegen.

```javascript
class Fish extends Actor {
    score = 10
    constructor() {
        this.pos = new Vector(100,100)
        this.vel = new Vector(20,20)
    }
}
```

Zie ook de [Excalibur docs](https://excaliburjs.com) 

<br>
<br>
<br>

## Lesstof

- [Excalibur](https://excaliburjs.com)
- [Excalibur discussions](https://github.com/excaliburjs/Excalibur/discussions)
- [Excalibur API documentation](https://excaliburjs.com/docs/api/edge/index.html)
- [Voortgang opslaan met localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Links

- [MDN Game Development](https://developer.mozilla.org/en-US/docs/Games)
- [Online Multiplayer met Socket.IO](https://socket.io) of [Lance](https://lance-gg.github.io)
- [Create Game Sounds](https://sfxr.me)
- [Genereer je Class Diagram met markdown](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNp9ks1uwyAMgF8F-bStzQtEO037uewwqVcuTvBatPAjA1Kjru--pBSUZto4IPRhPhvDCXqnCFroBwzhWeOe0UgrrZjGGxoSD00jnlLXDbSCrzocSuTOs44kHr8rX9OiyDuXbFl1ymQeG5tMRyxC75gW-EMftfDTtGDJK4x0d79Ayll6d6i03Rd-vk2Yi6gZm5LPE6kCf5k3fnD-D-F81_91za1udT53qBpKA45rMFagKER2Y_XBFgyxQa2mR7yIJMQDGZLQTkuF_CVB2jkuV_KidHQM7ScOgbaAKbrdaHtoIycqQdePcI06_wCsKKak)
- Werken met [Typescript](https://www.typescriptlang.org) en  [Parcel](https://parceljs.org)
