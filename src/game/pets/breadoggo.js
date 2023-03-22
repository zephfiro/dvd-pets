import Pet from './pet'

export default class Breadoggo extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/breadoggo.png`
    static NAME = 'DogPao'
    static PRICE = 133
    static DEFAULT_SCORE_INCREMENT = 2

    constructor(gameInstace, params, utils) {
        const defaultParams = {
            ...params,
            name: 'DogPao',
            type: 'breadoggo',
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Breadoggo.SPRITE_PATH,
            scoreIncrement: Breadoggo.DEFAULT_SCORE_INCREMENT
        }

        super(gameInstace, defaultParams, utils)
    }
}
