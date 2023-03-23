import { Utils } from '../utils'

export default class Pet {
    static DEFAULT_WIDTH = 150
    static DEFAULT_HEIGHT = 150
    static DEFAULT_SPEED_X = 4
    static DEFAULT_SPEED_Y = 3
    static DEFAULT_SCORE_INCREMENT = 1
    static SPRIT_LEFT_DIRECTION = -1
    static SPRIT_RIGHT_DIRECTION = 1
    static BONUS_MULTIPLIER = 100
    static BASE_SPRITE_PATH = '/src/sprites/pets'
    static INCREMENT_PET_BUY = 0.2

    constructor(gameInstance, stateParams, utils = Utils) {
        this.utils = utils()
        this.gameInstance = gameInstance
        this.gameCanvasInstance = gameInstance.canvasState
        this.setInitialState(stateParams)
        this.createSprite()
    }

    utils = null
    ctx = null
    filterColor = null
    canvas = null
    collisionCount = 0
    gameInstance = null
    gameCanvasInstance = null
    bitmapImage = null

    state = {
        id: null,
        name: '',
        type: '',
        spritePath: '',
        width: 0,
        height: 0,
        sprite: null,
        position: { x: 0, y: 0 },
        speed: { x: 0, y: 0 },
        score: 0,
        spriteDirection: null,
        improviments: []
    }

    setInitialState({
        name,
        type,
        width,
        height,
        position,
        scoreIncrement,
        speed,
        spriteDirection,
        sprite,
        spritePath
    }) {
        Object.assign(this.state, {
            name,
            type,
            id: this.createId(),
            scoreIncrement: scoreIncrement ?? Pet.DEFAULT_SCORE_INCREMENT,
            bonusMultiplier: Pet.BONUS_MULTIPLIER,
            speed: this.getSpeed(speed),
            direction: { x: this.utils.randomFlip(1, -1), y: this.utils.randomFlip(1, -1) },
            width: width ?? this.gameInstance.sprites.pets[type].width,
            height: height ?? this.gameInstance.sprites.pets[type].height,
            sprite: sprite ?? this.gameInstance.sprites.pets[type].blob,
            position: this.getPosition(position),
            spriteDirection: spriteDirection ?? null,
            spritePath
        })
    }

    createSprite() {
        this.utils
            .createBitmapImage(this.state.sprite, this.state.width, this.state.height)
            .then((bitmapImage) => {
                this.bitmapImage = bitmapImage
                this.createImageCanvas()
            })
    }

    getInfo() {
        return this.state
    }

    getSpeed({ x = Pet.DEFAULT_SPEED_X, y = Pet.DEFAULT_SPEED_Y } = {}) {
        return { x, y }
    }

    getPosition({ x = 500, y = 500 } = {}) {
        return { x, y }
    }

    createId() {
        const id = this.utils.uuid()

        if (this.gameInstance.pets.some((pet) => pet.state.id === id)) return this.createId()

        return id
    }

    move() {
        if (!this.canvas) return

        this.incrementPosition()
        this.checkCollision()
        this.dispachScore()
        this.render()

        this.collisionCount = 0
    }

    incrementPosition() {
        const { incrementX, incrementY } = this.getIncrementSpeed()

        this.state.position.x += incrementX
        this.state.position.y += incrementY
    }

    getIncrementSpeed() {
        const fpsMultiplier = 100 / this.gameInstance.fps
        const incrementX = this.state.speed.x * this.state.direction.x * fpsMultiplier
        const incrementY = this.state.speed.y * this.state.direction.y * fpsMultiplier

        return { incrementX, incrementY }
    }

    createImageCanvas() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })

        this.ctx.imageSmoothingEnabled = false
        this.canvas.width = this.state.width
        this.canvas.height = this.state.height

        this.renderImage()
    }

    renderImage() {
        const { spriteDirection, direction } = this.state

        this.clearImage()

        if (spriteDirection && direction.x !== spriteDirection) this.invertImageDirection()
        else this.ctx.drawImage(this.bitmapImage, 0, 0)
    }

    clearImage() {
        this.ctx.clearRect(0, 0, this.state.width, this.state.height)
    }

    invertImageDirection() {
        this.ctx.save()
        this.ctx.scale(-1, 1)
        this.ctx.drawImage(this.bitmapImage, this.state.width * -1, 0)
        this.ctx.scale(1, 1)
        this.ctx.restore()
    }

    render() {
        if (this.collisionCount > 0 || this.state.improviments.some(({ type }) => type === 'bonus')) {
            this.renderImage()
            this.applyColorFilter(this.getRandomColor())
        }

        this.gameCanvasInstance.ctx.drawImage(this.canvas, this.state.position.x, this.state.position.y)
    }

    getRandomColor() {
        const randColor = {
            r: this.utils.randomFlip(0, 1),
            g: this.utils.randomFlip(0, 1),
            b: this.utils.randomFlip(0, 1)
        }
        const isBlack = Object.values(randColor).every((value) => value === 0)

        if (isBlack || this.utils.isSameObject(randColor, this.filterColor)) return this.getRandomColor()

        this.filterColor = randColor

        return randColor
    }

    applyColorFilter({ r, g, b }) {
        const clipPath = new Path2D()

        clipPath.rect(0, 0, this.state.width, this.state.height)
        this.ctx.clip(clipPath)

        const imageData = this.ctx.getImageData(0, 0, this.state.width, this.state.height)

        for (let i = 0; i < imageData.data.length; i += 4) {
            const alpha = imageData.data[i + 3]

            if (alpha > 0) {
                imageData.data[i] *= r
                imageData.data[i + 1] *= g
                imageData.data[i + 2] *= b
            }
        }

        this.ctx.putImageData(imageData, 0, 0)
    }

    setScoreIncrement(increment) {
        this.state.scoreIncrement = increment
    }

    setSpeed(speed) {
        Object.assign(this.state.speed, speed)
    }

    setPosition(position) {
        Object.assign(this.state.position, position)
    }

    remove() {
        this.gameInstance.pets = this.gameInstance.pets.filter((pet) => pet.state.id !== this.state.id)
    }

    dispachScore() {
        if (this.collisionCount === 1) {
            const score = this.utils.roundUp(this.state.scoreIncrement * this.getBonusScoreIncrement())

            this.gameInstance.incrementScore(score, 'pet', this.state)
            this.state.score += score
        }

        if (this.collisionCount === 2) {
            const bonus = this.getBonusScoreIncrement()
            const score = this.utils.roundUp(this.state.scoreIncrement * this.state.bonusMultiplier * bonus)

            this.gameInstance.incrementScore(score, 'pet', this.state)
            this.state.score += score
            this.setSpecialBonus()
        }
    }

    setSpecialBonus() {
        const improviment = { time: 10000, increment: 10, type: 'bonus' }

        this.state.improviments.push(improviment)

        setTimeout(() => this.state.improviments.shift(), improviment.time)
    }

    getBonusScoreIncrement() {
        return this.state.improviments.reduce((acc, improviment) => acc * improviment.increment, 1)
    }

    checkCollision() {
        const { x, y } = this.state.position
        const { width, height } = this.state
        const { width: canvasWidth, height: canvasHeight } = this.gameCanvasInstance

        // Verifica se a imagem atingiu a borda direita do canvas
        if (x + width >= canvasWidth) {
            this.state.direction.x *= -1 // Inverte a direção horizontal
            this.state.position.x = canvasWidth - width // Define a posição da imagem para dentro do canvas
            this.collisionCount++
        }

        // Verifica se a imagem atingiu a borda esquerda do canvas
        if (x <= 0) {
            this.state.direction.x *= -1 // Inverte a direção horizontal
            this.state.position.x = 0 // Define a posição da imagem para dentro do canvas
            this.collisionCount++
        }

        // Verifica se a imagem atingiu a borda inferior do canvas
        if (y + height >= canvasHeight) {
            this.state.direction.y *= -1 // Inverte a direção vertical
            this.state.position.y = canvasHeight - height // Define a posição da imagem para dentro do canvas
            this.collisionCount++
        }

        // Verifica se a imagem atingiu a borda superior do canvas
        if (y <= 0) {
            this.state.direction.y *= -1 // Inverte a direção vertical
            this.state.position.y = 0 // Define a posição da imagem para dentro do canvas
            this.collisionCount++
        }
    }
}
