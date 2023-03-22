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

    const createSprite = async (path, width, height) => {
        return new Promise((resolve, reject) => {
            fetch(path)
                .then((response) => response.blob())
                .then((blob) => createBitmapImage(blob, width, height))
                .then((bitmapImage) => {
                    const canvas = document.createElement('canvas')
                    const ctx = canvas.getContext('bitmaprenderer')

                    canvas.width = bitmapImage.width
                    canvas.height = bitmapImage.height

                    ctx.transferFromImageBitmap(bitmapImage)
                    canvas.toBlob(resolve)
                })
                .catch(reject)
        })
    }

    const createBitmapImage = async (blob, width, height) => {
        return await createImageBitmap(blob, {
            resizeWidth: width,
            resizeHeight: height,
            resizeQuality: 'pixelated'
        })
    }

    return { randomFlip, uuid, isSameObject, getRandomPosition, createBitmapImage, createSprite }
}
