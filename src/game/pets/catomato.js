import Pet from './pet'

export default class Catomato extends Pet {
    constructor(params) {
        super({
            ...params,
            name: 'Catomato',
            type: 'catomato',
            spritePath: `${Pet.BASE_SPRITE_PATH}/catomato.png`
        })
    }
}