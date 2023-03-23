import Pet from './pet'

export default class Dripturtle extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/dripturtle.png`
    static NAME = 'Dripturtle'
    static PRICE = 500
    static DEFAULT_WIDTH = 170
    static DEFAULT_HEIGHT = 150
    static DEFAULT_SCORE_INCREMENT = 10
    static TYPE = 'dripturtle'

    constructor(gameInstace, params, utils) {
        const defaultParams = {
            ...params,
            name: 'Dripturtle',
            description: 'uma tartaruga muito ameaçadora, que drip!',
            type: Dripturtle.TYPE,
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Dripturtle.SPRITE_PATH,
            scoreIncrement: Dripturtle.DEFAULT_SCORE_INCREMENT
        }

        super(gameInstace, defaultParams, utils)
    }
}
