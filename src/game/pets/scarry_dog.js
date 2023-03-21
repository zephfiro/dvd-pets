import Pet from './pet'

export default class ScarryDog extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/scarry_dog.webp`
    static NAME = 'Cachorrinho fia da puta'
    static PRICE = 100

    constructor(params) {
        super({
            ...params,
            name: 'Cachorrinho fia da puta',
            type: 'scarry_dog',
            spritePath: ScarryDog.SPRITE_PATH
        })
    }
}
