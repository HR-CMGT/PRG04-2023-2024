import { Actor, Color, DisplayMode, Engine, Loader, Vector } from "excalibur"
import { Resources } from "./resources"
import { Fish } from "./fish"
import { Shark } from "./shark"
import { UI } from "./ui"

export class Game extends Engine {

    private shark
    private ui

    constructor() {
        super({ width: 900, height: 600 })
        const loader = new Loader([
            Resources.Water, 
            Resources.Fish, 
            Resources.Shark,
            Resources.PlopSound
        ])
        this.start(loader).then(() => this.startGame())
    }

    startGame(){
        const bg = new Actor()
        bg.graphics.use(Resources.Water.toSprite())
        bg.pos = new Vector(this.screen.resolution.width / 2, this.screen.resolution.height / 2)
        this.add(bg)

        this.shark = new Shark()
        this.add(this.shark)

        for (let i = 0; i < 26; i++) {
            this.add(new Fish())
        }

        this.ui = new UI()
        this.add(this.ui)
    }

    updateScore(){
        this.ui.updateScore()
    }
}

new Game()