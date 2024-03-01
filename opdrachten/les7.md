# Les 7

- Communicatie tussen classes
- Waarden doorgeven via de constructor 
- Via onUpdate de engine aanroepen
- Vervolgens de UI aanroepen
- Referenties doorgeven

<Br>
<Br>
<Br>

## Communicatie tussen classes

- Laat je classes met elkaar communiceren via het `engine` argument in de `update` of `initialize` functies.
- Sla de verwijzing naar `engine` op als een property van je class, zodat je er altijd bij kan.
- Maak een koppeling tussen meerdere classes via de `engine`. Bijvoorbeeld:
    - fish roept `engine.fishDied()` aan
    - in de functie `fishDied()` van de game roep je weer een functie van een andere actor aan, bijvoorbeeld `ui.addScore()`
- Geef een referentie van een class door aan een andere class, bijvoorbeeld: `new Fish(this.ui)`. De Fish weet nu wat de UI is.