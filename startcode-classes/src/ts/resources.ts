import { ImageSource, Sound } from "excalibur"
//@ts-ignore
import fish from "../images/fish.png"
//@ts-ignore
import shark from "../images/shark.png"
//@ts-ignore
import water from "../images/water.jpg"
//@ts-ignore
// let op dat er url: voor het geluid moet staan
import plopsound from "url:../sound/plop.mp3"

let Resources = {
    Fish: new ImageSource(fish),
    Shark: new ImageSource(shark),
    Water: new ImageSource(water),
    PlopSound: new Sound(plopsound)
}

export { Resources }