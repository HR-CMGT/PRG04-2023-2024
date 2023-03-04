import { CollisionType, Actor, Input, Vector, DegreeOfFreedom } from 'excalibur'
import { Coin } from "./coin"
import { Resources } from './resources'

export class Mario extends Actor {

    private game

    constructor() {
        super({ width: Resources.Mario.width, height: Resources.Mario.height }) // collision box!
        this.graphics.use(Resources.Mario.toSprite())
        // enable physics
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation) // voorkom draaien om de z as
    }
    
    onInitialize(engine) {
        this.game = engine
        this.pos = new Vector(engine.screen.resolution.width/2, engine.screen.resolution.height/3)
        this.on('collisionstart', (event) => this.hitSomething(event))

        //this.body.inertia = Infinity
        //this.body.inverseInertia = Infinity
        // console.log(this.body.mass)
        // console.log(this.body.inertia)
        // console.log(this.body.bounciness)
        // console.log(this.body.friction)
    }

    hitSomething(event){
        // Resources.CoinSound.play()

        if(event.other instanceof Coin) {
            event.other.pickedUpByMario()
            this.game.ui.updateScore()
        }
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0
        if (engine.input.keyboard.wasPressed(Input.Keys.W) || engine.input.keyboard.wasPressed(Input.Keys.Up)) {
            this.body.applyLinearImpulse(new Vector(0,-4000))
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            xspeed = -300
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
            xspeed = 300
        }
        this.vel = new Vector(xspeed, this.vel.y)
    }

}