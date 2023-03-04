import { ImageSource, Sound } from "excalibur"

//@ts-ignore
import background from "../images/background.png"
//@ts-ignore
import coin from "../images/coin.png"
//@ts-ignore
import crate from "../images/crate.png"
//@ts-ignore
import ground from "../images/ground.png"
//@ts-ignore
import mario from "../images/mario.png"
//@ts-ignore
import platform from "../images/platform.png"
//@ts-ignore
// let op dat er url: voor het geluid moet staan
import coinsound from "url:../sound/coin.mp3"

let Resources = {
    Background: new ImageSource(background),
    Coin: new ImageSource(coin),
    Crate: new ImageSource(crate),
    Ground: new ImageSource(ground),
    Mario: new ImageSource(mario),
    Platform: new ImageSource(platform),
    CoinSound: new Sound(coinsound)
}

export { Resources }