import { Actor, Color, DisplayMode, Engine, Loader, Vector, Physics, Sound } from "excalibur"
import { Resources } from "./resources"
import { Mario } from "./mario"
import { UI } from "./ui"
import { Platform } from "./platform"
import { Crate } from "./crate"
import { Coin } from "./coin"
//@ts-ignore
import coinsound from "url:../sound/coin.mp3"

class Game extends Engine {

    private mario
    private ui

    constructor() {
        super({ width: 800, height: 600 })

        Physics.useRealisticPhysics()
        Physics.gravity = new Vector(0, 800)

        const loader = new Loader([
            Resources.Background, 
            Resources.Coin, 
            Resources.Crate,
            Resources.Ground,
            Resources.Mario,
            Resources.Platform,
            Resources.CoinSound
        ])
        this.start(loader).then(() => this.startGame())
    }

    startGame(){
        const bg = new Actor()
        bg.graphics.use(Resources.Background.toSprite())
        bg.pos = new Vector(this.screen.resolution.width / 2, this.screen.resolution.height / 2)
        this.add(bg)

        // build a level
        const ground = new Platform(400, 570)
        this.add(ground)
        const pl = new Platform(500, 400)
        this.add(pl)

        for (let i = 0; i < 8; i++) {
            const crate = new Crate()
            this.add(crate)
            const coin = new Coin()
            this.add(coin)
        }

        this.mario = new Mario()
        this.add(this.mario)

        this.ui = new UI()
        this.add(this.ui)

        this.currentScene.camera.strategy.lockToActor(this.mario)
    }

}

new Game()