const cv2 = require("opencv4nodejs");
/**
 * 
 * @param {cv2.VideoCapture} capture
 * @param {number} colorCode
 */
const getFrames = (capture, colorCode) => {
    /**
     * @type {cv2.Mat[]}
     */
    let frames = []
    while (1) {
        let frame = capture.read()
        if (frame.empty) {
            break
        }
        if (colorCode !== undefined) frame = frame.cvtColor(colorCode)
        frames.push(frame)
    }
    return frames
}
/**
 * 
 * @param {cv2.VideoCapture} capture
 * @param {number} colorCode
 */
const getFramesBuffer = (capture, colorCode) => {
    let frame = capture.read().cvtColor(colorCode)
    /**
     * @type {Buffer}
     */
    let framesBuffer = frame.getData()
    while (1) {
        frame = capture.read()
        if (frame.empty) {
            break
        }
        if (colorCode !== undefined) frame = frame.cvtColor(colorCode)
        framesBuffer = Buffer.concat([framesBuffer, frame.getData()])
    }
    return framesBuffer
}

module.exports = { getFrames, getFramesBuffer }