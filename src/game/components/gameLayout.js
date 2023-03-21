export const GameLayout = () => {
    return `
        <div class="container-fluid p-0 h-100">
            <div class="d-flex flex-row h-100">
                <div id="game-score" class="col-md-3 p-0 h-100">
                    ${score()}
                    ${catricio()}
                    ${shop()}
                </div>
                <div id="canvas" class="col-md-6 p-0 h-100"></div>
                <div id="pet-infos" class="col-md-3 p-0 h-100"></div>
            </div>
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
