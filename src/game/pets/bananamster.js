import Pet from './pet'

export default class Bananamster extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/bananamster.png`
    static NAME = 'Banana LOCAAAAA'
    static PRICE = 100

    constructor(params) {
        super({
            ...params,
            name: 'Banana LOCAAAAA',
            type: 'bananamster',
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Bananamster.SPRITE_PATH
        })
    }
}
