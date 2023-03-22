import { Game } from './src/game/game'

const game = Game(document.getElementById('app'))

$('body').on('click', '#catricio', () => game.incrementScore(1, 'normal'))

$('body').on('mouseleave', () => {
    let timeout = setTimeout(() => game.changeToFullScreen(), 0)

    $('body').on('mouseenter', () => {
        clearTimeout(timeout)
        game.resetFullScreen()

        $('body').off('mouseenter')
    })
})

$('body').on('click', '#shop-button', () => game.toggleShop())

$('body').on('click', '[data-pet-type]', ({ currentTarget }) => {
    const { petType } = currentTarget.dataset

    game.addPet(petType)
})

$('body').on('click', '[data-nav]', ({ currentTarget }) => {
    const { nav } = currentTarget.dataset

    $('[data-nav]').removeClass('active')
    $(`[data-nav=${nav}]`).addClass('active')
    $('[shop-nav-content]').addClass('d-none').removeClass('d-flex')
    $(`#${nav}`).removeClass('d-none').removeClass('d-flex')

    console.log($(`#${nav}`))
})
