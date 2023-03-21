import Pet from './pet'

export default class Breadoggo extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/breadoggo.png`
    static NAME = 'DogPao'
    static PRICE = 100

    constructor(params) {
        super({
            ...params,
            name: 'DogPao',
            type: 'breadoggo',
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Breadoggo.SPRITE_PATH
        })
    }
}
