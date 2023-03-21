import { GameLayout } from './components/gameLayout'
import Bananamster from './pets/bananamster'
import Breadoggo from './pets/breadoggo'
import Catomato from './pets/catomato'
import Dripturtle from './pets/dripturtle'
import ScarryDog from './pets/scarry_dog'
import { Utils } from './utils'

const PETS = {
    scarry_dog: ScarryDog,
    catomato: Catomato,
    breadoggo: Breadoggo,
    dripturtle: Dripturtle,
    bananamster: Bananamster
}

const utils = Utils()

export const Game = (container) => {
    const state = {
        pets: [],
        score: 0,
        fps: 75,
        container: null,
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

    const gameCicle = () => {
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

    const addPet = (type) => {
        const PetClass = PETS[type]

        if (!PetClass) return

        insertPet(new PetClass({ gameInstance: state, position: getUniqueRandomPosition() }))
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
        state.addPet = addPet
        state.getPets = getPets
        state.findPet = findPet
        state.insertPet = insertPet
        state.changeToFullScreen = changeToFullScreen
        state.resetFullScreen = resetFullScreen
    }

    const setGameLayout = () => {
        state.container.innerHTML = GameLayout()
    }

    const changeToFullScreen = () => {
        $('#game-score, #pet-infos').addClass('collapsed')
        $('#canvas').addClass('fullscreen')
    }

    const resetFullScreen = () => {
        $('#game-score, #pet-infos').removeClass('collapsed')
        $('#canvas').removeClass('fullscreen')
    }

    const init = () => {
        setState({ container })
        setGameLayout()
        setCanvasContainer()
        createCanvas()
        setInstance()
        addResize()
        gameCicle()
    }

    init()

    return state
}
