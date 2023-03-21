import { PETS } from '../pets/pets'

export const GameLayout = () => {
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
                <img class="grabbable" src="/images/catricio.png" />
                <div id="name">
                    <span>Catricio</span>
                </div>
            </div>
        `
    }

    const shop = () => {
        return `
            <div id="shop-btn-container">
                <button id="shop-button">Shop</button>
            </div>
        `
    }

    const renderLayout = () => {
        return `
            <div class="d-flex align-itens-center justify-content-center h-100 w-100 postion-relative">
                ${renderShop()}
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

    const renderShop = () => {
        return `
            <div id="shop" class="hidden">
                <div id="shop-items" class="row p-2">
                    ${Object.entries(PETS)
                        .map(([key, pet]) => renderShopItem(key, pet))
                        .join('')}
                </div>
            </div>
        `
    }

    const renderShopItem = (key, pet) => {
        return `
            <div id="shop-item" class="col-4">
                <div id="shop-item-image w-100 h-100">
                    <img class="img-fluid" src="${pet.SPRITE_PATH}" />
                </div>
                <div id="shop-item-name">
                    <span>${pet.NAME}</span>
                </div>
                <div id="shop-item-price">
                    <span>${pet.PRICE}</span>
                </div>
                <div id="shop-item-buy">
                    <button>Buy</button>
                </div>
            </div>
        `
    }

    return { renderLayout }
}
