import * as tf from "@tensorflow/tfjs"
let canvas = document.createElement("canvas")
canvas.style.width = "100%"
document.body.appendChild(canvas)

fetch("http://localhost:5000/q1-size")
    .then((response) => {
        return response.json()
    })
    .then((inf) =>
        fetch("http://localhost:5000/q1-img")
            .then((response) => {
                console.log(inf)
                return response.arrayBuffer()
            })
            .then((buf) =>
                tf.tidy(() => {
                    console.log(buf)
                    let imgs = tf.tensor(new Uint8Array(buf), [inf.frameNum, inf.h, inf.w, 1])
                    let frame1_50 = imgs.slice([0, 0, 0, 0], [50, -1, -1, -1])
                    let mean = frame1_50.mean(0, true)
                    let std = tf.tidy(() =>
                        frame1_50.sub(mean).square().mean(0, true).sqrt().maximum(5)
                    )
                    let fg = <tf.Tensor3D[]>(
                        imgs.sub(mean).abs().greater(std.mul(5)).cast("float32").unstack(0)
                    )
                    // console.log(frame1_50)
                    // tf.browser.toPixels(fg[70], canvas)
                    return fg
                })
            )
    )
    .then((fg) => {
        let frameIdx = 0
        let loop = () => {
            if (frameIdx >= fg.length) {
                frameIdx = 0
            }
            tf.browser.toPixels(fg[frameIdx], canvas)
            frameIdx += 1
            requestAnimationFrame(loop)
        }
        loop()
    })
