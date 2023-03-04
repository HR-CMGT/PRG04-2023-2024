import { Engine, Actor, Input, Vector } from 'excalibur'
import { Fish } from "./fish"
import { Resources } from './resources'
import { Game } from "./game"

export class Shark extends Actor {

    private game : Game

    constructor() {
        super({ width: Resources.Shark.width, height: Resources.Shark.height }) // collision box!
        this.graphics.use(Resources.Shark.toSprite())
    }
    
    onInitialize(engine) {
        this.game = engine
        this.pos = new Vector(engine.screen.resolution.width/2, engine.screen.resolution.height/2)
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event){
        if(event.other instanceof Fish) {
            event.other.hitByShark()
            this.game.updateScore()
        }
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0
        let yspeed = 0
        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Up)) {
            yspeed = -300
        }
        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.Down)) {
            yspeed = 300
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            xspeed = -300
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
            xspeed = 300
        }
        this.vel = new Vector(xspeed, yspeed)
    }

}