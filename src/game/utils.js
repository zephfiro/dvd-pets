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

    return { randomFlip, uuid, isSameObject, getRandomPosition }
}
