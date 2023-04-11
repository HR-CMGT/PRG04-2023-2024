# Week 1 Middag

## Modern Web development

- Werkomgeving met VS Code en git.
- Een repository van github clonen.
- Werken met commit en push in je editor.
- Op Github pages publiceren.
- Werken met modules en import / export in javascript.

<Br>
<Br>
<Br>

## Voorbereiding

- Installeer [Node.js](https://nodejs.org/en/download/)
- Installeer [Visual Studio Code](https://code.visualstudio.com/download)
- Maak een account op [Github](https://github.com)

<Br>
<Br>
<Br>

## Git

In VS Code open je een terminal (via terminal > new terminal in het menu). Typ `git version`. Als je geen git blijkt te hebben, kan je [git installeren](https://git-scm.com/downloads)

Om naar github te kunnen pushen moet je je naam en email instellen:
```bash
git config --global user.name "jouw naam"
git config --global user.email "jouw email"
```
Je kan nu naar github pushen, maar je moet dan elke keer je wachtwoord typen. Om dat te voorkomen kan je een key instellen.

[Bekijk dit youtube filmpje voor instructies](https://www.youtube.com/watch?v=HfTXHrWMGVY)



<Br>
<Br>
<Br>

## Oefenen met github en demo project

- Fork en clone het [Startproject Javascript](https://github.com/HR-CMGT/prg4-javascript-2023) 
- Volg de [install instructies](../setup.md)

Als het goed is gegaan kan je nu pushen naar github en publiceren op github pages!

- Open je project in VS Code
- Maak een wijziging in `index.html`
- Doe `git commit` en `git sync`

<Br>
<Br>
<Br>

## Oefenen met modules

- verschil tussen SRC en DOCS map
- script type module gebruiken
- import / export gebruiken in javascript files
- import gebruiken voor afbeeldingen
- een module van npm installeren met `npm install`
- een dev server starten met `npm run dev`
- een docs folder bouwen met `npm run build`
- de docs folder pushen naar github

<Br>
<Br>
<Br>

### Voorbeeld

```bash
npm install everyday-fun
```

```javascript
import all from "everyday-fun"

const r = all.getRandomRiddle();
console.log(r.riddle)
console.log(r.answer)
```