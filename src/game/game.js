import { CATRICIO } from './catricio'
import { GameLayout } from './components/gameLayout'
import { IMPROVEMENTS } from './improvements'
import { PETS } from './pets/pets'
import { Utils as utility } from './utils'

export const Game = (container, Utils = utility) => {
    const state = {
        fps: 75,
        pets: [],
        score: 0,
        container: null,
        improvements: [],
        sprites: {
            pets: {},
            catricio: {},
            improvements: {}
        },
        canvasState: {
            width: 0,
            height: 0,
            ctx: null,
            canvas: null,
            container: null,
            backgroundColor: '#000000'
        }
    }
    const utils = Utils()
    const render = GameLayout(state)

    const setState = (newState) => {
        Object.assign(state, newState)
    }

    const setCanvasContainer = () => {
        const container = document.getElementById('canvas')

        setCanvasState({
            container,
            width: container.offsetWidth,
            height: container.offsetHeight
        })
    }

    const setCanvasState = (newState) => {
        Object.assign(state.canvasState, newState)
    }

    const createCanvas = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d', { willReadFrequently: true })

        state.canvasState.container.appendChild(canvas)

        setCanvasState({ canvas, ctx })
        updateCanvasSize()
    }

    const gameCycle = () => {
        let lastTimestamp = 0

        const cicle = () => {
            const timestamp = Date.now()

            if (timestamp - lastTimestamp > 1000 / state.fps) {
                renderGame()
                lastTimestamp = timestamp
            }

            requestAnimationFrame(cicle)
        }

        requestAnimationFrame(cicle)
    }

    const renderGame = () => {
        const { ctx, width, height, backgroundColor } = state.canvasState

        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, width, height)
        state.pets.forEach((pet) => pet.move())
    }

    const updateCanvasSize = () => {
        const { canvas, width, height } = state.canvasState

        canvas.width = width
        canvas.height = height
    }

    const addResize = () => {
        new ResizeObserver(() => {
            setCanvasContainer()
            updateCanvasSize()
            updatePetsPosition()
        }).observe(state.canvasState.container)
    }

    const getUniqueRandomPosition = (width, height) => {
        const { x, y } = utils.getRandomPosition(width, height)

        const hasPosition = state.pets.some(({ state }) => state.position.x === x && state.position.y === y)

        if (hasPosition) return getUniqueRandomPosition(width, height)

        return { x, y }
    }

    const updatePetsPosition = () => {
        state.pets.forEach((pet) => {
            const width = state.canvasState.width - state.sprites.pets[pet.state.type].width
            const height = state.canvasState.height - state.sprites.pets[pet.state.type].height

            pet.setPosition(getUniqueRandomPosition(width, height))
        })
    }

    const buyPet = (type) => {
        const PetClass = PETS[type]
        const price = utils.getPetPrice(state.pets, PetClass)
        const width = state.canvasState.width - state.sprites.pets[type].width
        const height = state.canvasState.height - state.sprites.pets[type].height

        if (!PetClass || state.score < price) return

        const alreadyHave = !!state.pets.find((pet) => pet.state.type === PetClass.TYPE)
        const Pet = new PetClass(state, { position: getUniqueRandomPosition(width, height) })

        incrementScore(-price, 'buy')
        insertPet(Pet)

        if (!alreadyHave) $('#owned-pets').append(render.addOwnedPet(Pet))

        render.updateShopItem(PetClass)
        setStorage()
    }

    const buyImprovement = (type) => {
        const improvement = IMPROVEMENTS.find((improvement) => improvement.type === type)

        if (canBuyImprovement(improvement)) return

        incrementScore(-improvement.price, 'buy')
        state.improvements.push({ ...improvement })
        render.updateImprovementItem(improvement)
        setStorage()
    }

    const canBuyImprovement = (improvement) => {
        return (
            !improvement ||
            state.score < improvement.price ||
            state.improvements.some(({ type }) => improvement.type === type)
        )
    }

    const insertPet = (Pet) => {
        const hasInState = state.pets.some((pet) => pet.state.id === Pet.state.id)

        if (hasInState) return

        state.pets.push(Pet)
    }

    const dispatchClick = () => {
        const improvements = state.improvements.filter(({ target }) => target === 'catricio')
        const score = improvements.reduce((score, i) => improvementsReduce(score, i), 1)

        incrementScore(score, 'click')
    }

    const changePetPreview = (id) => {
        const pet = state.pets.find((pet) => pet.state.id === id)

        if (!pet) return

        $('#card-pet-info').empty()

        $('#card-pet-info').append(render.renderCardInfo(pet))
    }

    const createPetFromStorage = (pet) => {
        const { name, type, improvements, score, width, height } = pet

        const PetClass = PETS[type]

        insertPet(
            new PetClass(state, {
                name,
                type,
                score,
                improvements,
                position: getUniqueRandomPosition(width, height)
            })
        )
    }

    const improvementsReduce = (points, improvement) => {
        if (improvement.type === 'catricio_fan') return points * improvement.increment

        if (improvement.type === 'pet_lover') return points + state.pets.length * improvement.increment

        return points
    }

    const incrementScore = (score, type, dispatcher) => {
        state.score += score
        updateScore({ type, dispatcher, incrementedScore: score })
        setStorage()
    }

    const updateScore = () => {
        const scoreElement = document.getElementById('points')

        scoreElement.innerHTML = Math.floor(state.score)
    }

    const setStorage = () => {
        const gameState = {
            improvements: state.improvements,
            pets: state.pets.map((pet) => getPetToStorage(pet)),
            score: state.score
        }

        localStorage.setItem('game-state', JSON.stringify(gameState))
    }

    const getStorageState = () => {
        const storageState = JSON.parse(localStorage.getItem('game-state'))

        if (!storageState) return

        state.score = storageState.score
        state.improvements = storageState.improvements
        storageState.pets.forEach((pet) => createPetFromStorage(pet))
    }

    const getPetToStorage = (pet) => {
        const { name, type, improvements, score, width, height } = pet.getInfo()

        return { name, type, improvements, score, width, height }
    }

    const getPets = () => state.pets
    const findPet = (id) => state.pets.find((pet) => pet.state.id === id)

    const setInstance = () => {
        state.incrementScore = incrementScore
        state.buyPet = buyPet
        state.getPets = getPets
        state.findPet = findPet
        state.insertPet = insertPet
        state.changeToFullScreen = changeToFullScreen
        state.resetFullScreen = resetFullScreen
        state.toggleShop = toggleShop
        state.shopIsOpen = shopIsOpen
        state.buyImprovement = buyImprovement
        state.dispachClick = dispatchClick
        state.changePetPreview = changePetPreview
        state.dispatchClick = dispatchClick
    }

    const setGameLayout = () => {
        state.container.innerHTML = render.renderLayout()
    }

    const changeToFullScreen = () => {
        if (shopIsOpen()) return

        const gameScore = document.getElementById('game-score')
        const petInfos = document.getElementById('pet-infos')

        gameScore.style.transform = `translateX(${-gameScore.offsetWidth}px)`
        petInfos.style.transform = `translateX(${petInfos.offsetWidth}px)`
        state.canvasState.container.style.width = '100%'
    }

    const resetFullScreen = () => {
        const gameScore = document.getElementById('game-score')
        const petInfos = document.getElementById('pet-infos')

        gameScore.style.transform = `translateX(0px)`
        petInfos.style.transform = `translateX(0px)`
        state.canvasState.container.style.width = '50%'
    }

    const shopIsOpen = () => !document.getElementById('shop').classList.contains('hidden')

    const toggleShop = () => {
        const shop = document.getElementById('shop')

        $('#pet-infos').toggle('hidden')
        shop.classList.toggle('hidden')
    }

    const createPetSprites = async () => {
        await Promise.all(Object.entries(PETS).map(([key, Pet]) => createSprite(key, Pet)))
    }

    const createImprovementSprites = async () => {
        await Promise.all(
            IMPROVEMENTS.filter((improvement) => improvement.spritPath).map((improvement) =>
                createImprovementSprite(improvement)
            )
        )
    }

    const createImprovementSprite = async (improvement) => {
        return await utils
            .createSprite(improvement.spritPath)
            .then((sprite) => (state.sprites.improvements[improvement.type] = sprite))
    }

    const createCatricioSprites = async () => {
        await Promise.all(Object.entries(CATRICIO).map(([key, path]) => createCatricioSprite(key, path)))
    }

    const createCatricioSprite = async (key, path) => {
        return await utils.createSprite(path).then((sprite) => (state.sprites.catricio[key] = sprite))
    }
    const createSprite = async (key, Pet) => {
        return await utils.createSprite(Pet.SPRITE_PATH).then((sprite) => (state.sprites.pets[key] = sprite))
    }

    const createSprites = async () => {
        await Promise.all([createPetSprites(), createCatricioSprites(), createImprovementSprites()])
    }

    const init = () => {
        setState({ container })
        createSprites().then(() => {
            getStorageState()
            setGameLayout()
            setCanvasContainer()
            createCanvas()
            setInstance()
            addResize()
            gameCycle()
        })
    }

    init()

    return state
}
