import { expect, it, describe } from '@jest/globals'
import { Game } from '../game'

describe('Game', () => {
    it('should initialize with default state', () => {
        const container = document.createElement('div')
        const game = Game(container)

        expect(game.fps).toEqual(75)
        expect(game.pets).toEqual([])
        expect(game.score).toEqual(0)
        expect(game.container).toBeInstanceOf(HTMLDivElement)
        expect(game.improvements).toEqual([])
        expect(game.sprites).toEqual({
            pets: {},
            catricio: {},
            improvements: {}
        })
        expect(game.canvasState).toEqual({
            width: 0,
            height: 0,
            ctx: null,
            canvas: null,
            container: null,
            backgroundColor: '#000000'
        })
    })
})
