import { Game } from './src/game/game'

const game = Game(document.getElementById('app'))

$('body').on('click', '#catricio', () => game.dispatchClick(1, 'normal'))

$('body').on('click', '#shop-button', () => game.toggleShop())

$('body').on('click', '[data-pet-type]', ({ currentTarget }) => game.buyPet(currentTarget.dataset.petType))

$('body').on('mousedown', '#catricio', ({ currentTarget }) => {
    const img = currentTarget.querySelector('img')

    img.src = game.sprites.catricio.grab.url
})

$('body').on('mouseup', () => {
    const img = document.querySelector('#catricio img')

    img.src = game.sprites.catricio.default.url
})

$('body').on('click', '[data-improvement-type]', ({ currentTarget }) =>
    game.buyImprovement(currentTarget.dataset.improvementType)
)

$('body').on('mouseleave', () => {
    let timeout = setTimeout(() => game.changeToFullScreen(), 1000 * 10)

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

$('body').on('click', '#pet-item', ({ currentTarget }) => {
    game.changePetPreview(currentTarget.dataset.id)
})
