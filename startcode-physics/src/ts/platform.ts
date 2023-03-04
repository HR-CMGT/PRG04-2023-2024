import { Physics, CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from './resources'

export class Platform extends Actor {

    constructor(x, y) {
        super({ width: Resources.Platform.width, height: Resources.Platform.height }) // collision box! 
        this.graphics.use(Resources.Platform.toSprite())
        this.pos = new Vector(x,y)
        this.body.collisionType = CollisionType.Fixed
    }

    onInitialize(engine) {
        
    }
}