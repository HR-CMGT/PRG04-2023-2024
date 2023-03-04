import { Engine, ImageSource, Actor, Color, Vector } from 'excalibur'
import { Resources } from './resources'

export class Fish extends Actor {

    constructor() {
        super({ width: Resources.Fish.width, height: Resources.Fish.height}) // collision box! 
        this.graphics.use(Resources.Fish.toSprite())
    }

    onInitialize(engine){
        this.pos = new Vector(Math.random() * engine.screen.resolution.width + 100, Math.random() * engine.screen.resolution.height)
        this.vel = new Vector(Math.random() * -40 - 40, 0)
    }

    onPostUpdate(engine, delta) {
        if(this.pos.x < -100) {
            this.pos = new Vector(engine.screen.resolution.width + 100, Math.random() * engine.screen.resolution.height)
            this.vel = new Vector(Math.random() * -40 - 40, 0)
        }
        this.pos.y += Math.sin(this.pos.x / 50)
    }

    hitByShark(){
        Resources.PlopSound.play()
        this.kill()
    }
}