import { GameLayout } from './components/gameLayout'
import { PETS } from './pets/pets'
import { Utils as utility } from './utils'

export const Game = (container, Utils = utility) => {
    const utils = Utils()
    const state = {
        pets: [],
        score: 0,
        fps: 75,
        container: null,
        sprites: {},
        canvasState: {
            width: 0,
            height: 0,
            canvas: null,
            container: null,
            ctx: null,
            backgroundColor: '#000000'
        }
    }

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

    const getUniqueRandomPosition = () => {
        const { x, y } = utils.getRandomPosition(state.canvasState.width, state.canvasState.height)

        const hasPosition = state.pets.some(({ state }) => state.position.x === x && state.position.y === y)

        if (hasPosition) return getUniqueRandomPosition()

        return { x, y }
    }

    const updatePetsPosition = () => {
        state.pets.forEach((pet) => pet.setPosition(getUniqueRandomPosition()))
    }

    const buyPet = (type) => {
        const PetClass = PETS[type]

        // if (!PetClass || state.score < PetClass.PRICE) return

        incrementScore(-PetClass.PRICE, 'buy')
        insertPet(new PetClass(state, { position: getUniqueRandomPosition() }))
        $('#shop').after(state.render.renderShop(false)).remove()
    }

    const insertPet = (Pet) => {
        const hasInState = state.pets.some((pet) => pet.state.id === Pet.state.id)

        if (hasInState) return

        state.pets.push(Pet)
    }

    const incrementScore = (score, type, dispatcher) => {
        state.score += score
        dispatchScore({ type, dispatcher, incrementedScore: score })
    }

    const dispatchScore = ({ type, dispatcher, incrementedScore }) => {
        const scoreElement = document.getElementById('points')

        scoreElement.innerHTML = state.score
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
    }

    const setGameLayout = () => {
        state.render = GameLayout(state)

        state.container.innerHTML = state.render.renderLayout()
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

        shop.classList.toggle('hidden')
    }

    const createSprites = async () => {
        await Promise.all(Object.entries(PETS).map(([key, Pet]) => createSprite(key, Pet)))
    }

    const createSprite = async (key, Pet) => {
        const width = Pet.DEFAULT_WIDTH
        const height = Pet.DEFAULT_HEIGHT
        const path = Pet.SPRITE_PATH

        return await utils.createSprite(path, width, height).then((sprite) => (state.sprites[key] = sprite))
    }

    const init = () => {
        setState({ container })
        createSprites().then(() => {
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
