import { Game } from './src/game/game'

const game = Game(document.getElementById('app'))

window.game = game

$('body').on('click', '#catricio', () => game.incrementScore(1, 'normal'))
