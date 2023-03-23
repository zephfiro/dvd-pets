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
            description: 'um lindo pao em formato de sabor cachorro, muito delicioso',
            type: Breadoggo.TYPE,
            spriteDirection: Pet.SPRIT_LEFT_DIRECTION,
            spritePath: Breadoggo.SPRITE_PATH,
            scoreIncrement: Breadoggo.DEFAULT_SCORE_INCREMENT
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
        if (improvement.type === 'buttery_bone') return improvement.increment

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
        if (improvement?.type === 'butter') return improvement.increment

        return 1
    }
}
