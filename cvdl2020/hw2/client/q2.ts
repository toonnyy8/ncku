import * as tf from "@tensorflow/tfjs"
import * as tool from "./tool"

const drawMarker = (
    canvas: HTMLCanvasElement,
    marker: { prevX: number; prevY: number; nextX: number; nextY: number }
) => {
    let ctx: CanvasRenderingContext2D
    try {
        ctx = canvas.getContext("2d")
    } catch {
        throw new Error("can't get context")
    }
    ctx.strokeStyle = `#ff5555`
    ctx.strokeRect(marker.nextX - 5, marker.nextY - 5, 11, 11)
    ctx.beginPath()
    ctx.moveTo(marker.nextX - 5, marker.nextY)
    ctx.lineTo(marker.nextX + 5, marker.nextY)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(marker.nextX, marker.nextY - 5)
    ctx.lineTo(marker.nextX, marker.nextY + 5)
    ctx.stroke()
}

const drawWay = (
    canvas: HTMLCanvasElement,
    keyPoint: { prevX: number; prevY: number; nextX: number; nextY: number }
) => {
    let ctx: CanvasRenderingContext2D
    try {
        ctx = canvas.getContext("2d")
    } catch {
        throw new Error("can't get context")
    }
    ctx.strokeStyle = `#ff5555`
    ctx.beginPath()
    ctx.moveTo(keyPoint.prevX, keyPoint.prevY)
    ctx.lineTo(keyPoint.nextX, keyPoint.nextY)
    ctx.stroke()
}

export const runQ2 = () => {
    let canvas = document.createElement("canvas")
    canvas.style.width = "100%"
    document.body.appendChild(canvas)
    fetch("http://localhost:5000/q2-inf")
        .then((response) => {
            return response.json()
        })
        .then(
            ({
                fps,
                keyPoints,
            }: {
                fps: number
                keyPoints: { prevX: number; prevY: number; nextX: number; nextY: number }[][]
            }) => {
                let opticalFlow = <HTMLVideoElement>document.getElementById("opticalFlow")
                const vc = tool.videoCapture(opticalFlow, fps)
                let frameIdx = 0
                let loop = () => {
                    if (frameIdx >= keyPoints.length) {
                        frameIdx = 0
                    }
                    vc.getFrame(frameIdx).then((img) => {
                        canvas.height = img.height
                        canvas.width = img.width
                        const ctx = canvas.getContext("2d")
                        ctx.drawImage(img, 0, 0)
                        keyPoints[frameIdx].forEach((keyPoint) => drawMarker(canvas, keyPoint))
                        keyPoints.slice(0, frameIdx).forEach((_keyPoints) => {
                            _keyPoints.forEach((keyPoint) => {
                                drawWay(canvas, keyPoint)
                            })
                        })
                        frameIdx += 1
                        requestAnimationFrame(loop)
                    })
                }
                loop()
            }
        )
}
