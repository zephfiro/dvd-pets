// constructor => { name, type, width, height, spritePath, positionX, positionY, gameInstance, speed, score }

export default class Pet {
    static DEFAULT_WIDTH = 100
    static DEFAULT_HEIGHT = 100
    static DEFAULT_SPEED_X = 4
    static DEFAULT_SPEED_Y = -3
    static DEFAULT_SCORE_INCREMENT = 1
    static BONUS_MULTIPLIER = 10
    static randomSing = () => (Math.random() < 0.5 ? -1 : 1)

    gameInstance = null
    state = {
        id: null,
        name: '',
        type: '',
        width: 0,
        height: 0,
        sprite: null,
        position: { x: 0, y: 0 },
        speed: { x: 0, y: 0 },
        score: 0
    }
    collisionCount = 0

    constructor({ gameInstance, ...stateParams }) {
        this.gameInstance = gameInstance
        this.setInitialState(stateParams)
    }

    setInitialState({ name, type, width, height, position, score: scoreIncrement, speed, spritePath }) {
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

        return img
    }

    move() {
        this.state.position.x += this.state.speed.x * this.state.direction.x
        this.state.position.y += this.state.speed.y * this.state.direction.y

        this.checkCollision()
        this.render()
    }

    render() {
        this.gameInstance.ctx.drawImage(
            this.state.sprite,
            this.state.position.x,
            this.state.position.y,
            this.state.width,
            this.state.height
        )
    }

    setScoreIncrement(increment) {
        this.state.scoreIncrement = increment
    }

    setSpeed(speed) {
        Object.assign(this.state.speed, speed)
    }

    checkCollision() {
        const { x, y } = this.state.position
        const { width, height } = this.state
        const { width: canvasWidth, height: canvasHeight, incrementScore } = this.gameInstance

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
            incrementScore(this.state.scoreIncrement, this.state)
            this.state.score += this.state.scoreIncrement
        }

        if (this.collisionCount === 2) {
            incrementScore(this.state.scoreIncrement * this.state.bonusMultiplier, this.state)
            this.state.score += this.state.scoreIncrement
        }

        this.collisionCount = 0
    }
}
