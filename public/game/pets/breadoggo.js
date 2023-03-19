import Pet from './pet'

export default class Breadoggo extends Pet {
    constructor(params) {
        super({
            ...params,
            name: 'DogPao',
            type: 'breadoggo',
            spritePath: `${Pet.BASE_SPRITE_PATH}/breadoggo.png`
        })
    }
}
