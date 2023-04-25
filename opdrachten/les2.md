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

- Zorg dat je een github account hebt, en dat je lokale git settings gekoppeld zijn
- Fork het [excalibur startproject](https://github.com/HR-CMGT/prg4-startproject-2023) (use this template)
- Clone het project naar je computer en open het in je editor.
- Zet ***github pages*** aan op github. Kies de `main/docs` map en druk op save.
- Maak een aanpassing en kijk of je `git commit` en `git push` kan doen.
- Staat je aangepaste html file nu op je github?
- Start de dev server met `npm run dev` om te zien of de dev server werkt.
- Stop de dev server met `ctrl + c`
- Bouw de docs folder met `npm run build`. Kijk wat er in de docs folder staat.
- Kijk of je de docs folder op ***github pages*** kan plaatsen met `git push`.

<Br>
<Br>
<Br>

### Troubleshooting github pages

Als github pages wel je HTML file laat zien, maar geen afbeeldingen of CSS, dan kan je de `base url` aanpassen in `package.json`

```json
"scripts": {
    "dev": "vite",
    "build": "vite build --outDir=docs --base=/naam-van-je-repository/",
},
```


<br><br><br>


## Links

- [Startproject Excalibur](https://github.com/HR-CMGT/prg4-startproject-2023)
- [Setup instructies voor github pages](./setup.md)
- [Oefenproject zonder excalibur](https://github.com/HR-CMGT/prg4-javascript-2023)