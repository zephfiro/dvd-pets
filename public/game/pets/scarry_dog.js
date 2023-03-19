import Pet from './pet'

export default class ScarryDog extends Pet {
    constructor(params) {
        super({
            ...params,
            name: 'Cachorrinho fia da puta',
            type: 'scarry_dog',
            spritePath: './public/sprites/scarry_dog.webp'
        })
    }
}
