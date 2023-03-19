import Pet from './pet'

export default class ScarryDog extends Pet {
    constructor(params) {
        super({
            ...params,
            name: 'Cachorrinho fia da puta',
            type: 'scarry_dog',
            spritePath: './sprites/scarry_dog.webp'
        })
    }
}
