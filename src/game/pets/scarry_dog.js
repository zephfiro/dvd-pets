import Pet from './pet'

export default class ScarryDog extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/scarry_dog.webp`
    static NAME = 'Cachorrinho'
    static PRICE = 666
    static TYPE = 'scarry_dog'

    constructor(gameInstace, params, utils) {
        const defaultParams = {
            ...params,
            name: 'Cachorrinho',
            description: '?????????????????????????????????????????????????????????????',
            type: ScarryDog.TYPE,
            spritePath: ScarryDog.SPRITE_PATH,
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION
        }

        super(gameInstace, defaultParams, utils)
    }
}
