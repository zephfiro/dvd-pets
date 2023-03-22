import Pet from './pet'

export default class Bananamster extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/bananamster.png`
    static NAME = 'Banana LOCAAAAA'
    static PRICE = 1000
    static DEFAULT_WIDTH = 120
    static DEFAULT_HEIGHT = 150
    static DEFAULT_SCORE_INCREMENT = 4

    constructor(gameInstace, params, utils) {
        const defaultParams = {
            ...params,
            name: 'Banana LOCAAAAA',
            type: 'bananamster',
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Bananamster.SPRITE_PATH,
            width: Bananamster.DEFAULT_WIDTH,
            height: Bananamster.DEFAULT_HEIGHT,
            scoreIncrement: Bananamster.DEFAULT_SCORE_INCREMENT
        }

        super(gameInstace, defaultParams, utils)
    }
}
