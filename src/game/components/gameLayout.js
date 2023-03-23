import { IMPROVEMENTS } from '../improvements'
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
                <div id="card-pet-info">
                    ${renderCardInfo(pet)}
                </div>
            </div>
        `
    }

    const renderCardInfo = (pet) => {
        return `
            <div id="pet-photo">
                ${
                    pet
                        ? `<img draggable="false" src="${gameInstance.sprites.pets[pet.state.type]?.url}" />`
                        : '???'
                }
            </div>
            <div id="pet-attributes">
                <p id="pet-name">[${pet ? pet?.state?.name : 'seu pet aqui'}]</p>
                <p id="pet-personal-stats">${
                    pet?.state?.description
                        ? pet?.state?.description
                        : 'as informações do seu pet aparecerá aqui'
                }</p>
            </div>
        `
    }

    const renderOwnedPets = () => {
        return gameInstance.pets
            .reduce((acc, pet) => {
                const petIndex = acc.findIndex((p) => p.state.name === pet.state.name)
                petIndex !== -1 ? acc[petIndex].count++ : acc.push({ ...pet, count: 1 })

                return acc
            }, [])
            .map((pet) => {
                return `
                    <div id="pet-item" data-id=${pet.state.id}>
                        <img draggable="false" src="${gameInstance.sprites.pets[pet.state.type].url}" />
                    </div>
                `
            })
            .join('')
    }

    const addOwnedPet = (pet) => {
        return `
            <div id="pet-item" data-id=${pet?.state?.id ?? ''}>
                <img draggable="false" src="${gameInstance.sprites.pets[pet.state.type].url}" />
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
                        <div class="nav-link" data-nav="improvements">Melhorias</div>
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
                <div shop-nav-content id="improvements" class="d-none flex-column">
                    ${renderImprovements()}
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

    const updateImprovementItem = (improvement) => {
        $(`[data-improvement-type="${improvement.type}"]`)
            .closest('#shop-item')
            .replaceWith(renderImprovementsItem(improvement, true))
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

    const renderImprovements = () => {
        return IMPROVEMENTS.sort((a, b) => utils.sortByAsc(a.price, b.price))
            .map((improvement) => {
                const isDisabled = gameInstance.improvements.some(({ type }) => type === improvement.type)

                return renderImprovementsItem(improvement, isDisabled)
            })
            .join('')
    }

    const renderImprovementsItem = (improvement, disabled = false) => {
        const sprite =
            improvement.target === 'catricio'
                ? gameInstance.sprites.catricio.default
                : gameInstance.sprites.improvements[improvement.type]

        return `
            <div id="shop-item" class="${disabled ? 'disabled' : ''}">
                <div class="card" data-improvement-type="${improvement.type}" title="Comprar">
                    <div class="card-body d-flex px-2">
                        <div class="shop-pet-img">
                            <img draggable="false" class="img-fluid" src="${sprite.url}" />
                        </div>
                        <div class="item-info d-flex flex-column w-100">
                            <div class="d-flex justify-content-between w-100 aling-items-center">
                                <div id="shop-item-name">
                                    <h4 class="mb-0">${improvement.name}</h4>
                                </div>
                                <div id="shop-item-price" class="text-danger">
                                    <span>${improvement.price}❤️</span>
                                </div>
                            </div>
                            <small class="colision-info font-wight-bold mt-1">
                               ${improvement.description}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    return { renderLayout, renderShop, updateShopItem, updateImprovementItem, addOwnedPet, renderCardInfo }
}
