import { Actor, Color, DisplayMode, Engine, Loader, Vector } from "excalibur"
import { Resources } from "./resources"

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        const loader = new Loader([Resources.Fish])
        this.start(loader).then(() => this.startGame())
    }

    startGame(){
        const fish = new Actor()
        fish.graphics.use(Resources.Fish.toSprite())
        // position
        fish.pos = new Vector(700,200)
        // velocity
        fish.vel = new Vector(-50, 0)
        this.add(fish)
    }
}

new Game()