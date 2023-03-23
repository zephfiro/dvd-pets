import Pet from './pet'

export default class Breadoggo extends Pet {
    static SPRITE_PATH = `${Pet.BASE_SPRITE_PATH}/breadoggo.png`
    static NAME = 'Breadoggo'
    static PRICE = 250
    static DEFAULT_SCORE_INCREMENT = 5
    static TYPE = 'breadoggo'

    constructor(gameInstace, params, utils) {
        const defaultParams = {
            ...params,
            name: 'DogPao',
            type: Breadoggo.TYPE,
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Breadoggo.SPRITE_PATH,
            scoreIncrement: Breadoggo.DEFAULT_SCORE_INCREMENT
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
        if (improviment.type === 'buttery_bone') return improviment.increment

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
        if (improviment?.type === 'butter') return improviment.increment

        return 1
    }
}
