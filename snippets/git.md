# Git troubleshooting



## Git

In VS Code open je een terminal (via terminal > new terminal in het menu). Typ `git version`. Als je geen git blijkt te hebben, kan je [git installeren](https://git-scm.com/downloads)

Om naar github te kunnen pushen moet je je naam en email instellen:
```bash
git config --global user.name "jouw naam"
git config --global user.email "jouw email"
```
Je kan nu naar github pushen, maar je moet dan elke keer je wachtwoord typen. Om dat te voorkomen kan je een key instellen. [Bekijk dit youtube filmpje voor instructies](https://www.youtube.com/watch?v=HfTXHrWMGVY)



<Br>
<Br>
<Br>

## Github pages

Je kan de `docs` map van je project live zetten via ***github pages settings***. Kies ***publish main > docs***. 

*🚨 Als jouw online afbeeldingen en css niet geladen kunnen worden, dan kan je jouw github repository toevoegen aan de `package.json` van je project*

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



<br><br><br>


## Links

- [Setup instructies voor github pages](./setup.md)