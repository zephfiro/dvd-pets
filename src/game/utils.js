export const Utils = () => {
    const randomFlip = (a, b) => (Math.random() < 0.5 ? a : b)

    const uuid = () => Math.random().toString(36).substring(2, 9)

    const isSameObject = (a, b) => {
        if (!a || !b) return false

        return (
            Object.keys(a).every((key) => a[key] === b[key]) &&
            Object.keys(b).every((key) => a[key] === b[key])
        )
    }

    const getRandomPosition = (width, height) => ({ x: Math.random() * width, y: Math.random() * height })

    const createSprite = async (path) => {
        return new Promise((resolve, reject) => {
            const img = new Image()

            img.src = path
            img.onload = () => {
                const width = img.naturalWidth * 5
                const height = img.naturalHeight * 5

                createBitmapImage(img, width, height).then((bitmapImage) => {
                    const canvas = document.createElement('canvas')
                    const ctx = canvas.getContext('bitmaprenderer')

                    canvas.width = bitmapImage.width
                    canvas.height = bitmapImage.height

                    ctx.transferFromImageBitmap(bitmapImage)
                    canvas.toBlob((blob) => resolve({ blob, width, height, url: URL.createObjectURL(blob) }))
                })
            }
            img.onerror = reject
        })
    }

    const createBitmapImage = async (img, width, height) => {
        return await createImageBitmap(img, {
            resizeWidth: width,
            resizeHeight: height,
            resizeQuality: 'pixelated'
        })
    }

    const filterPetsByType = (pets, type) => pets.filter((pet) => pet.state.type === type)

    const roundUp = (number) => Math.ceil(Math.round(number * 100)) / 100

    const getPetPrice = (pets, pet) => {
        const multiplier = pet.INCREMENT_PET_BUY + 1
        const price = filterPetsByType(pets, pet.TYPE).reduce((acc) => multiplier * acc, pet.PRICE)

        return Math.floor(roundUp(price))
    }

    const sortByAsc = (a, b) => {
        if (a > b) return 1
        if (a < b) return -1

        return 0
    }

    return {
        randomFlip,
        uuid,
        isSameObject,
        getRandomPosition,
        createBitmapImage,
        createSprite,
        filterPetsByType,
        roundUp,
        getPetPrice,
        sortByAsc
    }
}
