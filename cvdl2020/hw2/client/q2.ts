import * as tf from "@tensorflow/tfjs"
import * as tool from "./tool"

const drawMarker = (canvas: HTMLCanvasElement, marker: { x: number; y: number }) => {
    let ctx: CanvasRenderingContext2D
    try {
        ctx = canvas.getContext("2d")
    } catch {
        throw new Error("can't get context")
    }
    ctx.strokeStyle = `#ff5555`
    ctx.strokeRect(marker.x - 5, marker.y - 5, 11, 11)
    ctx.beginPath()
    ctx.moveTo(marker.x - 5, marker.y)
    ctx.lineTo(marker.x + 5, marker.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(marker.x, marker.y - 5)
    ctx.lineTo(marker.x, marker.y + 5)
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
        .then(({ fps, keyPoints }: { fps: number; keyPoints: { x: number; y: number }[][] }) => {
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
                    frameIdx += 1
                    requestAnimationFrame(loop)
                })
            }
            loop()
        })
}
