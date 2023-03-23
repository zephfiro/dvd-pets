import Pet from './pet'

export default class Bananamster extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/bananamster.png`
    static NAME = 'Bananhamster'
    static PRICE = 1250
    static DEFAULT_WIDTH = 130
    static DEFAULT_HEIGHT = 150
    static DEFAULT_SCORE_INCREMENT = 25
    static TYPE = 'bananamster'

    constructor(gameInstace, params, utils) {
        const defaultParams = {
            ...params,
            name: 'Bananhamster',
            description: 'igual a todas as bananas do mundo',
            type: Bananamster.TYPE,
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Bananamster.SPRITE_PATH,
            scoreIncrement: Bananamster.DEFAULT_SCORE_INCREMENT
        }

        super(gameInstace, defaultParams, utils)
    }
}
