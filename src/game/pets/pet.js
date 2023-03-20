// constructor => { name, type, width, height, spritePath, positionX, positionY, gameInstance, speed, score }

export default class Pet {
    static DEFAULT_WIDTH = 200
    static DEFAULT_HEIGHT = 200
    static DEFAULT_SPEED_X = 4
    static DEFAULT_SPEED_Y = 3
    static DEFAULT_SCORE_INCREMENT = 1
    static BONUS_MULTIPLIER = 10
    static BASE_SPRITE_PATH = '/src/sprites'
    static randomSing = () => (Math.random() < 0.5 ? -1 : 1)
    static randomIntNumber = (min, max) => Math.floor(Math.random() * max) + min

    constructor({ gameInstance, ...stateParams }) {
        this.gameInstance = gameInstance
        this.gameCanvasInstance = gameInstance.canvasState
        this.setInitialState(stateParams)
    }

    ctx = null
    filterColor = null
    canvas = null
    collisionCount = 0
    gameInstance = null
    gameCanvasInstance = null
    maxChangeColor = Pet.randomIntNumber(1, 20)
    bitmapImg = null

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
        score: 0
    }

    setInitialState({ name, type, width, height, position, scoreIncrement, speed, spritePath }) {
        Object.assign(this.state, {
            name,
            type,
            id: this.createId(),
            scoreIncrement: scoreIncrement ?? Pet.DEFAULT_SCORE_INCREMENT,
            bonusMultiplier: Pet.BONUS_MULTIPLIER,
            speed: this.getSpeed(speed),
            direction: { x: Pet.randomSing(), y: Pet.randomSing() },
            width: width ?? Pet.DEFAULT_WIDTH,
            height: height ?? Pet.DEFAULT_HEIGHT,
            sprite: this.createSprite(spritePath),
            position: this.getPosition(position)
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
        const id = Math.random().toString(36).substring(2, 9)

        if (this.gameInstance.pets.some((pet) => pet.state.id === id)) return this.createId()

        return id
    }

    createSprite(spritePath) {
        const img = new Image()

        img.src = spritePath

        img.onload = () => {
            createImageBitmap(img, {
                resizeWidth: this.state.width,
                resizeHeight: this.state.height,
                resizeQuality: 'pixelated'
            }).then((bitmapImg) => {
                this.bitmapImg = bitmapImg
                this.render()
            })
        }

        return img
    }

    move() {
        if (!this.canvas) return

        this.incrementPosition()
        this.checkCollision()
        this.render()

        this.collisionCount = 0
    }

    incrementPosition() {
        this.state.position.x += this.state.speed.x * this.state.direction.x
        this.state.position.y += this.state.speed.y * this.state.direction.y
    }

    render() {
        if (!this.canvas) this.createImageCanvas()

        if (this.collisionCount > 0) this.applyColorFilter(this.getRandomColor())

        this.gameCanvasInstance.ctx.drawImage(this.canvas, this.state.position.x, this.state.position.y)
    }

    createImageCanvas() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })

        this.canvas.width = this.state.width
        this.canvas.height = this.state.height

        this.ctx.drawImage(this.bitmapImg, 0, 0)
    }

    getRandomColor() {
        const rand = () => (Math.random() > 0.5 ? 0 : 1)
        const randColor = { r: rand(), g: rand(), b: rand() }

        if (Object.values(randColor).every((color) => color === 0) || this.filterColor === randColor) {
            return this.getRandomColor()
        }

        this.filterColor = randColor

        return randColor
    }

    applyColorFilter({ r, g, b }) {
        this.ctx.drawImage(this.bitmapImg, 0, 0)

        if (!this.maxChangeColor) {
            this.maxChangeColor = Pet.randomIntNumber(1, 20)
            return
        } else this.maxChangeColor--

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

        if (this.collisionCount === 1) {
            this.gameInstance.incrementScore(this.state.scoreIncrement, 'normal', this.state)
            this.state.score += this.state.scoreIncrement
        }

        if (this.collisionCount === 2) {
            const score = this.state.scoreIncrement * this.state.bonusMultiplier

            this.gameInstance.incrementScore(score, 'bonus', this.state)
            this.state.score += score
        }
    }
}
