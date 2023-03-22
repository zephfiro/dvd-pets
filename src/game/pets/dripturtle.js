import Pet from './pet'

export default class Dripturtle extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/dripturtle.png`
    static NAME = 'Tartaruga Badass'
    static PRICE = 1000
    static DEFAULT_WIDTH = 170
    static DEFAULT_HEIGHT = 150
    static DEFAULT_SCORE_INCREMENT = 4

    constructor(gameInstace, params, utils) {
        const defaultParams = {
            ...params,
            name: 'Tartaruga Badass',
            type: 'dripturtle',
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Dripturtle.SPRITE_PATH,
            width: Dripturtle.DEFAULT_WIDTH,
            height: Dripturtle.DEFAULT_HEIGHT,
            scoreIncrement: Dripturtle.DEFAULT_SCORE_INCREMENT
        }

        super(gameInstace, defaultParams, utils)
    }
}
