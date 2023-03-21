import Pet from './pet'

export default class Bananamster extends Pet {
    constructor(params) {
        super({
            ...params,
            name: 'Banana LOCAAAAA',
            type: 'bananamster',
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: `${Pet.BASE_SPRITE_PATH}/bananamster.png`
        })
    }
}
