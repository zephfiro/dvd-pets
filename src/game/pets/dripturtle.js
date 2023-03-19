import Pet from './pet'

export default class Dripturtle extends Pet {
    constructor(params) {
        super({
            ...params,
            name: 'Tartaruga Badass',
            type: 'dripturtle',
            spritePath: `${Pet.BASE_SPRITE_PATH}/dripturtle.png`
        })
    }
}
