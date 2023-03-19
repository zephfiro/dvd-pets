import Pet from './pet'

export default class ScarryDog extends Pet {
    constructor(params) {
        super({
            ...params,
            name: 'Cachorrinho fia da puta',
            type: 'scarry_dog',
            spritePath: `${Pet.BASE_SPRITE_PATH}/scarry_dog.webp`
        })
    }
}
