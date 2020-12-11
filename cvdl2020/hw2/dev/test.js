import * as tf from '@tensorflow/tfjs'
let canvas = document.createElement('canvas')
document.body.appendChild(canvas)

fetch("http://localhost:3000/q1-size")
    .then((response) => {
        return response.json()
    })
    .then((size) => {
        fetch("http://localhost:3000/q1-img")
            .then((response) => {
                return response.arrayBuffer();
            })
            .then((buf) => {
                let imgs = tf.tensor(new Uint8Array(buf), [size.frameNum, size.h, size.w, 1])
                let frame1_50 = imgs.slice([0, 0, 0, 0], [50, -1, -1, -1])
                let mean = frame1_50.mean(0, true)
                let std = tf.tidy(() => frame1_50.sub(mean).square().mean(0, true).sqrt().maximum(5))
                let fg = imgs.sub(mean).abs().greater(std.mul(5)).cast("float32")
                console.log(frame1_50)
                tf.browser.toPixels(fg.slice([70, 0, 0, 0], [1, -1, -1, -1]).squeeze(0), canvas)
            });
    })
