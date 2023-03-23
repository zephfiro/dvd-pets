import { expect, it, describe, jest, beforeEach } from '@jest/globals'
import { Game } from '../game'

describe('Game', () => {
    beforeEach(() => {
        const mockGameLayout = jest.fn(() => {
            return {
                renderLayout: jest.fn(() => '<div style="width: 100px; height: 100px" id="canvas"></div>')
            }
        })

        jest.mock('../game', () => {
            return {
                GameLayout: mockGameLayout
            }
        })
    })

    it('should initialized state', () => {
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
