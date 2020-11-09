const calcScale = (vec: { x: number, y: number }) => {
    return (vec.x ** 2 + vec.y ** 2) ** 0.5
}

const calcRadian = (vec1: { x: number, y: number }, vec2: { x: number, y: number }) => {
    const scale1 = calcScale(vec1)
    const scale2 = calcScale(vec2)
    let rad = Math.acos((vec1.x * vec2.x + vec1.y * vec2.y) / (scale1 * scale2))
    const anticlockwise = rotationVector(vec1, rad)
    const clockwise = rotationVector(vec1, -rad)
    const anticlockwiseErr = (anticlockwise.x - vec2.x) ** 2 + (anticlockwise.y - vec2.y) ** 2
    const clockwiseErr = (clockwise.x - vec2.x) ** 2 + (clockwise.y - vec2.y) ** 2
    if (anticlockwiseErr > clockwiseErr) {
        rad = -rad
    }
    return rad
}


const rotationVector = (vec: { x: number, y: number }, rad: number) => ({
    x: Math.cos(rad) * vec.x - Math.sin(rad) * vec.y,
    y: Math.sin(rad) * vec.x + Math.cos(rad) * vec.y
})

export const matchingVector = (
    matchingPoints1: { x: number, y: number }[],
    matchingPoints2: { x: number, y: number }[],
) => {
    const vec1 = {
        x: matchingPoints1[1].x - matchingPoints1[0].x,
        y: matchingPoints1[1].y - matchingPoints1[0].y
    }
    const scale1 = calcScale(vec1)
    const vec2 = {
        x: matchingPoints2[1].x - matchingPoints2[0].x,
        y: matchingPoints2[1].y - matchingPoints2[0].y
    }
    const scale2 = calcScale(vec2)
    const scale = scale2 / scale1

    const rad = calcRadian(vec1, vec2)

    // const newPoint = rotationVector(matchingPoints1[0], rad)
    const translate = {
        x: (matchingPoints2[0].x - matchingPoints1[0].x),
        y: (matchingPoints2[0].y - matchingPoints1[0].y),
    }

    return { scale, rad, translate }
}


export const transpose = (
    img: Int32Array,
    width: number,
    height: number,
    offset: { x: number, y: number },
    scale: number,
    rad: number,
    translate: { x: number, y: number },
    newWidth: number,
    newHeight: number,
) => {
    const result_img = new Array(newWidth * newHeight * 4).fill(0)

    for (let y = 0; y < newHeight; y++)
        for (let x = 0; x < newWidth; x++) {
            let rotXY = rotationVector({
                x: (x - translate.x - offset.x) / scale,
                y: (y - translate.y - offset.y) / scale,
            }, -rad)
            let _x = Math.round(rotXY.x + offset.x)
            let _y = Math.round(rotXY.y + offset.y)
            if (_x > width || _x < 0 || _y > height || _y < 0) {
                for (let c = 0; c < 4; c++)
                    result_img[(y * newWidth + x) * 4 + c] = 0
            }
            else {
                for (let c = 0; c < 4; c++)
                    result_img[(y * newWidth + x) * 4 + c] = img[(_y * width + _x) * 4 + c]
            }
        }
    return result_img
}

