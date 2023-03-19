import Bananamster from './pets/bananamster'
import Breadoggo from './pets/breadoggo'
import Catomato from './pets/catomato'
import Dripturtle from './pets/dripturtle'
import ScarryDog from './pets/scarry_dog'

const PETS = {
    scarry_dog: ScarryDog,
    catomato: Catomato,
    breadoggo: Breadoggo,
    dripturtle: Dripturtle,
    bananamster: Bananamster
}

export const Game = (container, { dispatchScore } = {}) => {
    const state = {
        pets: [],
        score: 0,
        width: 0,
        height: 0,
        backgroundColor: '#000000',
        canvas: null,
        container: null,
        ctx: null
    }

    const setState = (newState) => {
        Object.assign(state, newState)
    }

    const setContainer = () => {
        setState({ container, width: container.offsetWidth, height: container.offsetHeight })
    }

    const createCanvas = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        state.container.appendChild(canvas)

        setState({ canvas, ctx })
        updateCanvasSize()
    }

    const renderGame = () => {
        state.ctx.fillStyle = state.backgroundColor
        state.ctx.fillRect(0, 0, state.width, state.height)

        state.pets.forEach((pet) => pet.move())

        requestAnimationFrame(renderGame)
    }

    const updateCanvasSize = () => {
        state.canvas.width = state.width
        state.canvas.height = state.height
    }

    const addResize = () => {
        new ResizeObserver(() => {
            setContainer()
            updateCanvasSize()
            updatePetsPosition()
        }).observe(state.container)
    }

    const updatePetsPosition = () => {
        state.pets.forEach((pet) => pet.setPosition(getRandomPosition()))
    }

    const addPet = (type) => {
        const Pet = PETS[type]

        if (!Pet) return

        const pet = new Pet({ gameInstance: state, position: getRandomPosition() })

        state.pets.push(pet)
    }

    const getRandomPosition = () => {
        const x = Math.random() * state.width
        const y = Math.random() * state.height

        return { x, y }
    }

    const incrementScore = (score, dispatcher) => {
        state.score += score
        dispatchScore?.(state.score, dispatcher)
    }

    const getPets = () => state.pets
    const findPet = (id) => state.pets.find((pet) => pet.state.id === id)

    const setInstance = () => {
        state.incrementScore = incrementScore
        state.addPet = addPet
        state.getPets = getPets
        state.findPet = findPet
    }

    const init = () => {
        setContainer()
        createCanvas()
        addResize()
        setInstance()

        requestAnimationFrame(renderGame)
    }

    init()

    return state
}
