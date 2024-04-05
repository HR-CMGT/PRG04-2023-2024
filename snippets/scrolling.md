# Scrolling Background

Binnen *één* actor plaats je twee keer dezelfde Sprite naast elkaar. Dat doen we door twee child actors aan te maken die naast elkaar staan. Gebruik `addChild` om een Actor aan de background toe te voegen.

Vervolgens scroll je de background actor langzaam naar links. Als de ***eerste*** afbeelding buiten beeld is plaats je de gehele background weer op de startpositie.

```javascript
export class Background extends Actor {

    offset

    onInitialize(engine){
        const spaceImage = Resources.Background.toSprite()
        this.offset = spaceImage.width
        
        const bgleft = new Actor({ z: -1 })
        bgleft.graphics.use(spaceImage)
        bgleft.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)

        const bgright = new Actor({ z: -1 })
        bgright.graphics.use(spaceImage)
        bgright.pos = new Vector(engine.screen.resolution.width / 2 + spaceImage.width, engine.screen.resolution.height / 2)

        this.addChild(bgleft)
        this.addChild(bgright)
    
        this.pos = new Vector(0, 0)
        this.vel = new Vector(-110, 0)
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x < -this.offset) {
            this.pos = new Vector(0, 0)
        }
    }
}
```
