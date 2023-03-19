import { Game } from './public/game/game'

window.game = Game(document.getElementById('app'), {
    dispatchScore: (score, dispatcher) => console.log({ score, dispatcher })
})
