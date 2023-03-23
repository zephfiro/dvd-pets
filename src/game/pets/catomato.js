import Pet from './pet'

export default class Catomato extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/catomato.png`
    static NAME = 'Catomato'
    static PRICE = 25
    static TYPE = 'catomato'

    constructor(gameInstace, params, utils) {
        const defaultParams = {
            ...params,
            name: 'Catomato',
            description: 'um lindo gatinho em formato de tomate, muito poderoso',
            type: Catomato.TYPE,
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Catomato.SPRITE_PATH
        }

        super(gameInstace, defaultParams, utils)
    }

    getIncrementSpeed() {
        const improvements = this.gameInstance.improvements
        const { incrementX, incrementY } = super.getIncrementSpeed()
        const bonusIncrement = improvements.reduce((acc, i) => this.getBonusIncrement(i) * acc, 1)

        return { incrementX: incrementX * bonusIncrement, incrementY: incrementY * bonusIncrement }
    }

    getBonusIncrement(improvement) {
        if (improvement.type === 'tomato_ball') return improvement.increment

        return 1
    }

    getBonusScoreIncrement() {
        const improvements = this.gameInstance.improvements
        const bonusIncrement = improvements.reduce(
            (acc, i) => this.getBonusScore(i) * acc,
            super.getBonusScoreIncrement()
        )

        return bonusIncrement
    }

    getBonusScore(improvement) {
        if (improvement?.type === 'tomato_rice') return improvement.increment

        if (improvement?.type === 'tomato_toy') {
            const catomatos = this.gameInstance.pets.filter((p) => p.state.type === 'catomato')

            return improvement.increment * catomatos.length
        }

        return 1
    }
}
