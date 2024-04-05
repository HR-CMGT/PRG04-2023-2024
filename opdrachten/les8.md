# Les 8 

- Project builden
- Publiceren naar Github Pages
- [publiceren op de CMGT Arcade Kast](https://github.com/HR-CMGT/arcade-game)

<br><br><br>

## Project builden

Tot nu toe heb je steeds met `npm run dev` getest of je game werkt. Dit opent een development server, maar dat kan je niet uploaden naar een web server.

Als je klaar met met developen dan run je `npm run build` om het project te bouwen. Dit genereert een `docs` folder waarin al je finished,minified code geplaatst wordt. Dit eindproject is wat je naar een webserver of github pages server kan gaan uploaden.


Om te testen of `build` goed is gegaan open je de nieuw aangemaakte folder in je browser via `localhost`, bijvoorbeeld: `http://localhost/prg4/game/docs/`. Je kan `localhost` aanzetten via `XAMPP`, net zoals bij PRG2 en PRG3. Let op dat je project dan ook binnen de XAMPP folder (htdocs) staat.

<br>
<br>
<br>

## Code pushen naar Github

Klik op Source Control in VS Code. Typ een commit message en klik op `commit`, en vervolgens `sync` (of `push`). Check of je code  nu op je eigen github staat.

Het bestand `.gitignore` zorgt dat de `node_modules` map niet op github gezet wordt.

<br>
<br>
<br>

## Publiceren op Github Pages

Je kan de `docs` map van je project live zetten via ***github pages settings***. Kies ***publish main > docs***. 

![pages](../snippets/page.png)

Nu wordt je project live gezet en kan je het online spelen!

<br><br><br>

### Troubleshooting

Als je project een `dist` folder heeft gemaakt in plaats van een `docs` folder dan kan je die folder met de hand hernoemen. Je kan ook een `vite.config.js` file maken waarin je aangeeft dat je `docs` wil gebruiken.

```js
module.exports = {
  root: 'src',
  build: {
    outDir: '../docs'
  }
}
```
Als je afbeeldingen en css niet geladen kunnen worden in github pages, dan kan je je github repository toevoegen aan `package.json`

```json
"scripts": {
  "build": "vite build --outDir=docs --base=/naam-van-repository/",
},
```
of
```json
"scripts": {
  "build": "vite build --outDir=docs --base=''",
},
```
