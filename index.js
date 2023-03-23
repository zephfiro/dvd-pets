import { Game } from './src/game/game'

const game = Game(document.getElementById('app'))

$('body').on('click', '#catricio', () => game.dispachClick(1, 'normal'))

$('body').on('click', '#shop-button', () => game.toggleShop())

$('body').on('click', '[data-pet-type]', ({ currentTarget }) => game.buyPet(currentTarget.dataset.petType))

$('body').on('mouseleave', () => {
    let timeout = setTimeout(() => game.changeToFullScreen(), 0)

    $('body').on('mouseenter', () => {
        clearTimeout(timeout)
        game.resetFullScreen()

        $('body').off('mouseenter')
    })
})

$('body').on('click', '[data-nav]', ({ currentTarget }) => {
    const { nav } = currentTarget.dataset

    $('[data-nav]').removeClass('active')
    $(`[data-nav=${nav}]`).addClass('active')
    $('[shop-nav-content]').addClass('d-none').removeClass('d-flex')
    $(`#${nav}`).removeClass('d-none').removeClass('d-flex')
})

$('body').on('mousedown', '#catricio', ({ currentTarget }) => {
    const img = currentTarget.querySelector('img')

    img.src = game.sprites.catricio.grab.url
})

$('body').on('mouseup', '#catricio', ({ currentTarget }) => {
    const img = currentTarget.querySelector('img')

    img.src = game.sprites.catricio.default.url
})

$('body').on('click', '[data-improviment-type]', ({ currentTarget }) => {
    game.buyImproviment(currentTarget.dataset.improvimentType)
})

$('body').on('keyup', () => console.log(game))
