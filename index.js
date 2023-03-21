import { Game } from './src/game/game'

const game = Game(document.getElementById('app'))

window.game = game

$('body').on('click', '#catricio', () => game.incrementScore(1, 'normal'))

$('body').on('mouseleave', () => {
    let timeout = setTimeout(() => game.changeToFullScreen(), 0)

    $('body').on('mouseenter', () => {
        clearTimeout(timeout)
        game.resetFullScreen()

        $('body').off('mouseenter')
    })
})

$('body').on('click', '#shop-button', () => {
    game.toggleShop()
})
