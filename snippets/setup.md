# Werken met het startproject

- Startcode downloaden
- Project installeren en development server starten
- Wijzigingen naar github pushen
- Github pages gebruiken

<br>
<br>
<br>

## Startcode downloaden

- Ga naar het [Excalibur Startproject](https://github.com/HR-CMGT/prg4-startproject-2023) of het [Javascript Startproject](https://github.com/HR-CMGT/prg4-javascript-2023)
- Klik op ***USE THIS TEMPLATE***. Kies als owner jouw eigen github account. 
- Geef je repository een goede naam. Check dat het startproject in je eigen github terecht komt.
- CLONE de repository van jouw eigen github naar je lokale computer via de git url. Die vind je onder "code".
  - Voor VS Code. Klik het "Source Control" icoontje. Kies voor "clone repository" en plak de git url.
  - Voor PHPStorm. Klik op "Get from VCS". Plak de git link bij "URL"
- Kies een map die je ook via localhost kan openen, bijvoorbeeld `xampp/htdocs/mijnproject`.
- Jouw IDE haalt nu het startproject op en opent het automatisch.

[🔥 Bekijk dit instructie filmpje](https://youtu.be/UIVpe4L5_P4)

<br>
<br>
<br>

## Project installeren en development server starten

- Open een terminal in VS Code. Daar typ je:

```bash
npm install
npm run dev
```

Open de browser op de link die verschijnt. Je kan nu je game gaan ontwikkelen. Om te stoppen typ je `ctrl + c` in de terminal.

<br>
<br>
<br>

## Project lokaal openen

Als je klaar met met developen dan run je `npm run build` om het project te bouwen. Let op dat je code in een folder staat die je ook via localhost kan openen.

Open nu de `docs` folder in je browser via `localhost`, bijvoorbeeld: `http://localhost/henk/mijnproject/docs/`.

<br>
<br>
<br>

## Code opslaan op Github

Klik op Source Control in VS Code. Typ een commit message en klik op `commit`, en vervolgens `sync` (of `push`). Check of je code  nu op je eigen github staat.

Het bestand `.gitignore` zorgt dat de `node_modules` map niet op github gezet wordt.

<br>
<br>
<br>

## Publiceren op Github Pages

Je kan de `docs` map van je project live zetten via ***github pages settings***. Kies ***publish main > docs***. 

![pages](./images/page.png)

*🚨 Als jouw online afbeeldingen en css niet geladen kunnen worden, dan kan je jouw github repository toevoegen aan `package.json`*

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

