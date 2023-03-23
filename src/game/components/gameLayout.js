import { IMPROVIMENTS } from '../improviments'
import { PETS } from '../pets/pets'
import { Utils } from '../utils'

export const GameLayout = (gameInstance) => {
    const utils = Utils()

    const score = () => {
        return `
            <div id="score">
                <span class="text-danger" id="points">${gameInstance.score}</span>
                <h5 class="text-dark font-wight-bold" id="loves">Loves❤️</h5>
            </div>
        `
    }

    const catricio = () => {
        return `
            <div id="catricio">
                <img class="grabbable" draggable="false" src="${gameInstance.sprites.catricio.default.url}" />
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

    const renderCard = (pet = gameInstance.pets[0]) => {
        return `
            <div id="pet-card">
                <div id="card">
                    <div id="pet-photo">
                        ${
                            pet
                                ? `<img draggable="false" src="${gameInstance.sprites.pets[pet.TYPE].url}" />`
                                : '???'
                        }
                    </div>
                    <div id="pet-attributes">
                        <p id="pet-name">[seu pet aqui]</p>
                        <p id="pet-personal-stats">as informações do seu pet aparecerá aqui</p>
                    </div>
                </div>
            </div>
        `
    }

    const renderOwnedPets = () => {
        return gameInstance.pets
            .map((pet) => {
                return `
                    <div class="pet-item">
                        <img draggable="false" src="${gameInstance.sprites.pets[pet.TYPE].url}" />
                    </div>
                `
            })
            .join('')
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
                <div id="pet-infos">
                    ${renderCard()}
                    <div id="owned-pets">
                        ${renderOwnedPets()}
                    </div>
                </div>
            </div>
        `
    }

    const renderShop = (hidden = true) => {
        return `
            <div id="shop" class="${hidden ? 'hidden' : ''}">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <div class="nav-link active" data-nav="pets">PETS</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" data-nav="improviments">Melhorias</div>
                    </li>
                </ul>

                ${renderShopContent()}
            </div>
        `
    }

    const renderShopContent = () => {
        return `
            <div id="shop-content">
                <div shop-nav-content id="pets" class="d-flex flex-column">
                    ${renderShopItems()}
                </div>
                <div shop-nav-content id="improviments" class="d-none flex-column">
                    ${renderimproviments()}
                </div>
            </div>
        `
    }

    const renderShopItems = () => {
        return Object.values(PETS)
            .filter((pet) => pet.TYPE !== 'scarry_dog')
            .sort((a, b) => utils.sortByAsc(a.PRICE, b.PRICE))
            .map((pet) => renderShopItem(pet))
            .join('')
    }

    const updateShopItem = (pet) => {
        $(`[data-pet-type="${pet.TYPE}"]`).closest('#shop-item').replaceWith(renderShopItem(pet))
    }

    const updateImprovimentItem = (improviment) => {
        $(`[data-improviment-type="${improviment.type}"]`)
            .closest('#shop-item')
            .replaceWith(renderimprovimentsItem(improviment, true))
    }

    const renderShopItem = (pet) => {
        return `
            <div id="shop-item">
                <div class="card" data-pet-type="${pet.TYPE}" title="Comprar">
                    <div class="card-body d-flex px-2">
                        <div class="shop-pet-img">
                            <img
                                draggable="false"
                                class="img-fluid"
                                src="${gameInstance.sprites.pets[pet.TYPE].url}" />
                        </div>
                        <div class="item-info d-flex flex-column w-100">
                            <div class="d-flex justify-content-between w-100 aling-items-center">
                                <div id="shop-item-name">
                                    <h4 class="mb-0">${pet.NAME}</h4>
                                </div>
                                <div id="shop-item-price" class="text-danger">
                                    <span>${utils.getPetPrice(gameInstance.pets, pet)}❤️</span>
                                </div>
                            </div>
                            <small class="colision-info font-wight-bold mt-1">
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

    const renderimproviments = () => {
        return IMPROVIMENTS.sort((a, b) => utils.sortByAsc(a.price, b.price))
            .map((improviment) => {
                const isDisabled = gameInstance.improviments.some(({ type }) => type === improviment.type)

                return renderimprovimentsItem(improviment, isDisabled)
            })
            .join('')
    }

    const renderimprovimentsItem = (improviment, disabled = false) => {
        const sprite =
            improviment.target === 'catricio'
                ? gameInstance.sprites.catricio.default
                : gameInstance.sprites.improviments[improviment.type]

        return `
            <div id="shop-item" class="${disabled ? 'disabled' : ''}">
                <div class="card" data-improviment-type="${improviment.type}" title="Comprar">
                    <div class="card-body d-flex px-2">
                        <div class="shop-pet-img">
                            <img draggable="false" class="img-fluid" src="${sprite.url}" />
                        </div>
                        <div class="item-info d-flex flex-column w-100">
                            <div class="d-flex justify-content-between w-100 aling-items-center">
                                <div id="shop-item-name">
                                    <h4 class="mb-0">${improviment.name}</h4>
                                </div>
                                <div id="shop-item-price" class="text-danger">
                                    <span>${improviment.price}❤️</span>
                                </div>
                            </div>
                            <small class="colision-info font-wight-bold mt-1">
                               ${improviment.description}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    return { renderLayout, renderShop, updateShopItem, updateImprovimentItem }
}
