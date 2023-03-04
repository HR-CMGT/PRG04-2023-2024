import { Engine, CollisionType, Actor, Color, Vector } from 'excalibur'
import { Resources } from './resources'

export class Coin extends Actor {

    constructor() {
        super({ radius: Resources.Coin.width/2 }) // collision circle! 
        this.graphics.use(Resources.Coin.toSprite())
        // enable physics
        this.body.bounciness = 0.8
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
    }

    onInitialize(engine) {
        this.pos = new Vector(Math.random() * engine.screen.resolution.width, Math.random() * engine.screen.resolution.height - 200)
    }

    pickedUpByMario(){
        Resources.CoinSound.play()
        this.kill()
    }

    onPostUpdate(engine, delta) {
        if (this.pos.y > engine.screen.resolution.height) {
            this.kill()
        }
    }
}