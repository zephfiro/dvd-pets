import { PETS } from '../pets/pets'

export const GameLayout = (gameIntance) => {
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
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <div class="nav-link active" data-nav="pets">PETS</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" data-nav="improvements">Melhorias</div>
                    </li>
                </ul>

                <div id="shop-content">
                    <div shop-nav-content id="pets" class="d-flex flex-column">
                        ${renderShopItems()}
                    </div>
                    <div shop-nav-content id="improvements" class="d-flex flex-column">
                    </div>
                </div>
            </div>
        `
    }

    const renderShopItems = () =>
        Object.entries(PETS)
            .filter(([key]) => key !== 'scarry_dog')
            .map(([key, Pet]) => renderShopItem(key, Pet))
            .join('')

    const renderShopItem = (key, pet) => {
        return `
            <div id="shop-item">
                <div class="card" data-pet-type="${key}" title="Comprar">
                    <div class="card-body d-flex px-2">
                        <div class="shop-pet-img">
                            <img class="img-fluid" src="${URL.createObjectURL(gameIntance.sprites[key])}" />
                        </div>
                        <div class="item-info d-flex flex-column w-100">
                            <div class="d-flex justify-content-between w-100 aling-items-center">
                                <div id="shop-item-name">
                                    <h4 class="mb-0">${pet.NAME}</h4>
                                </div>
                                <div id="shop-item-price" class="text-danger">
                                    <span>${pet.PRICE}❤️</span>
                                </div>
                            </div>
                            <small class="colision-info font-wight-bold mt-3">
                                Gera
                                <span class="text-danger">${pet.DEFAULT_SCORE_INCREMENT}❤️</span>
                                por colisão
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    return { renderLayout }
}
