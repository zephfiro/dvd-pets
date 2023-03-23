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
            type: Catomato.TYPE,
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Catomato.SPRITE_PATH
        }

        super(gameInstace, defaultParams, utils)
    }

    getIncrementSpeed() {
        const improviments = this.gameInstance.improviments
        const { incrementX, incrementY } = super.getIncrementSpeed()
        const bonusIncrement = improviments.reduce((acc, i) => this.getBonusIncrement(i) * acc, 1)

        return { incrementX: incrementX * bonusIncrement, incrementY: incrementY * bonusIncrement }
    }

    getBonusIncrement(improviment) {
        if (improviment.type === 'tomato_ball') return improviment.increment

        return 1
    }

    getBonusScoreIncrement() {
        const improviments = this.gameInstance.improviments
        const bonusIncrement = improviments.reduce(
            (acc, i) => this.getBonusScore(i) * acc,
            super.getBonusScoreIncrement()
        )

        return bonusIncrement
    }

    getBonusScore(improviment) {
        if (improviment?.type === 'tomato_rice') return improviment.increment

        if (improviment?.type === 'tomato_toy') {
            const catomatos = this.gameInstance.pets.filter((p) => p.state.type === 'catomato')

            return improviment.increment * catomatos.length
        }

        return 1
    }
}
