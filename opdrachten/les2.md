# Les 2 - Week 1 Middag

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

## Opdracht

In deze oefening ga je kijken of je jouw werkomgeving helemaal op orde hebt. Dit gaat om het pushen naar github, en het werken met de `npm` commando's.

<br>

- Zorg dat je een github account hebt, en dat je lokale git settings gekoppeld zijn aan github (zie de presentatie).
- Fork en clone het [Startproject Javascript](https://github.com/HR-CMGT/prg4-javascript-2023) , volgens de [install instructies](../setup.md)
- Zet ***github pages*** aan op github > settings > pages. Kies de main/docs map en druk op save.
- Open de `index.html` in VS Code
- Voeg een `<p>` met wat tekst toe in de `index.html`
- Kijk of je `git commit` kan doen. Kijk daarna of je `git push / sync` kan doen.
- Staat je aangepaste html file nu op je github?
- Voeg een script toe aan de SRC map. Laad het als module in de index.html file `<script type="module" src="/src/js/game.js"></script>`
- Gebruik een `console.log("hello world")` in je javascript file.
- Start de dev server met `npm run dev` om te zien of het console bericht getoond wordt.
- In de javascript file gebruik je `import` om een afbeelding te laden. `import myImage from "./supermario.png"`
- Vervolgens plaats je de afbeelding in de DOM via `createElement("img")` en `appendChild()`.
- Kijk of je dev server de afbeelding toont.
- Stop de dev server met `ctrl + c`
- Bouw de docs folder met `npm run build`. Kijk wat er in de docs folder staat.
- `commit` en `push` je code naar github. Kijk of je code in je repostory staat. 
- Kijk of github pages werkt. 

<Br>
<Br>
<Br>

### Troubleshooting

Als github pages wel je HTML file laat zien, maar geen afbeeldingen of CSS, dan kan je de `base url` aanpassen in `package.json`

```json
"scripts": {
    "dev": "vite",
    "build": "vite build --outDir=docs --base='/'",
},
```
of
```json
"scripts": {
    "dev": "vite",
    "build": "vite build --outDir=docs --base=/naam-van-je-repository/",
},
```


<br><br><br>

## Oefenen met excalibur

Als je de basis met [javascript](https://github.com/HR-CMGT/prg4-javascript-2023) werkend hebt kan je ook oefenen met excalibur. Typ in de terminal:

```bash
npm install excalibur
```

Of clone het [excalibur startproject](https://github.com/HR-CMGT/prg4-startproject-2023)

<br><br><br>

## Links

- [Startproject Javascript (week 1)](https://github.com/HR-CMGT/prg4-javascript-2023)
- [Startproject Excalibur (week 2+)](https://github.com/HR-CMGT/prg4-startproject-2023)
- [Setup instructies voor github pages](./setup.md)