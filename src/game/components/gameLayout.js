export const GameLayout = () => {
    return `
        <div class="d-flex align-itens-center justify-content-center h-100 w-100 postion-relative">
            <div id="game-score">
                ${score()}
                ${catricio()}
                ${shop()}
            </div>
            <div id="canvas"></div>
            <div id="pet-infos"></div>
        </div>
    `
}

const score = (score = 0, points = 0) => {
    return `
        <div id="score">
            <span id="points">${score}</span>
            <span id="loves-per-second">${points} loves per second</span>
        </div>
    `
}

const catricio = () => {
    return `
        <div id="catricio">
            <img src="/images/catricio.png" />
            <div id="name">
                <span>Catricio</span>
            </div>
        </div>
    `
}

const shop = () => {
    return `
        <div id="shop">
            <button id="shop-button">Shop</button>
        </div>
    `
}
