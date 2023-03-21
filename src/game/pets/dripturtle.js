import Pet from './pet'

export default class Dripturtle extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/dripturtle.png`
    static NAME = 'Tartaruga Badass'
    static PRICE = 100

    constructor(params) {
        super({
            ...params,
            name: 'Tartaruga Badass',
            type: 'dripturtle',
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Dripturtle.SPRITE_PATH
        })
    }
}
