import { Physics, CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from './resources'

export class Crate extends Actor {

    constructor() {
        super({ width: Resources.Crate.width, height: Resources.Crate.height}) // collision box! 
        this.graphics.use(Resources.Crate.toSprite())
        // enable physics
        this.body.bounciness = 0.2 // not working?
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
    }

    onInitialize(engine){
        this.pos = new Vector(Math.random() * engine.screen.resolution.width, Math.random() * engine.screen.resolution.height - 200)
    }

    onPostUpdate(engine, delta) {
        if (this.pos.y > engine.screen.resolution.height) {
            this.kill()
        }
    }
}