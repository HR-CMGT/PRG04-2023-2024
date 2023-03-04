import { Engine, Font, Label, Text, Vector, FontUnit } from 'excalibur'

export class UI extends Label {

    private score = 0

    constructor() {
        super({
            text: `Score: 0`,
            pos: new Vector(60, 40),
            font: new Font({
                family: 'Helvetica',
                size: 34
            })
        })
    }

    onInitialize(engine) {

    }

    updateScore(){
        this.score++
        this.text = `Score: ${ this.score }`
    }
}