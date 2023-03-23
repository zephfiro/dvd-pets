import { expect, jest, test, describe } from '@jest/globals'
import { GameLayout } from '../components/gameLayout'
import { Game } from '../game'
import { IMPROVEMENTS } from '../improvements'
import { PETS } from '../pets/pets'
import { Utils as utility } from '../utils'

jest.mock('../components/gameLayout', () => {
    return {
        renderLayout: jest.fn(() => '<div id="canvas"></div>')
    }
})

describe('Game', () => {
    test('should have a canvas instance', () => {
        const div = document.createElement('div')

        div.style.width = '100px'
        div.style.height = '100px'

        const game = Game(div)

        expect(game.canvasState.canvas).toBeInstanceOf(HTMLCanvasElement)
        expect(game.canvasState.ctx).toBeInstanceOf(CanvasRenderingContext2D)
        expect(game.canvasState.container).toBeInstanceOf(HTMLDivElement)
        expect(game.canvasState.width).toBe(100)
        expect(game.canvasState.height).toBe(100)
    })
})
