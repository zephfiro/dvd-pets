import Pet from './pet'

export default class Catomato extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/catomato.png`
    static NAME = 'Catomato'
    static PRICE = 100

    constructor(params) {
        super({
            ...params,
            name: 'Catomato',
            type: 'catomato',
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Catomato.SPRITE_PATH
        })
    }
}
