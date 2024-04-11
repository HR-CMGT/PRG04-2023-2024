# Troubleshooting

| Probleem 😭 | Oplossing |
| -------- | -------- |
| `ex.` not found   |  `ex.` is alleen nodig als je werkt met een `<script>` tag om excalibur te laden. Je kan dit dus weglaten. |
| Startscherm blijft hangen   | Een van je ***resources*** wordt niet gevonden of is van een formaat dat niet geladen kan worden.   |
| `Actor` not found | Plaats `import { Actor } from "excalibur"` bovenin je class |
| `Vite` not found, `excalibur` not found | Je hebt nog geen `npm install` gedaan. |
| Game werkt wel in `dev` server maar niet in localhost/online | Je hebt geen `npm run build` gedaan. Check of er een `docs` folder is aangemaakt. In de `docs` folder staat je finished project. |
| Resources/CSS werken wel lokaal maar niet op github pages | Je kan het pad naar je github pages website toevoegen aan `package.json` |