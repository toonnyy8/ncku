import * as tf from "@tensorflow/tfjs"
import { loadImage } from "./loadimg"
import { gaussianFilter7x7 } from "./gaussian"

// @ts-ignore
import q1_1 from "../../Q1_Image/png/6.png"

const conv = (img_tensor: tf.Tensor2D, kernel: tf.Tensor2D): tf.Tensor2D => tf.tidy(() => {
    let [kh, kw] = kernel.shape
    const out: tf.Tensor2D = tf.conv2d(
        <tf.Tensor4D>img_tensor.expandDims(-1),
        <tf.Tensor4D>kernel.reshape([kh, kw, 1, 1]),
        1,
        "same",
    )
        .squeeze()
        .add(kernel.neg().relu().sum())
        .div(kernel.abs().sum())

    return out
})

const det2x2 = ([[a, b], [c, d]]: [[tf.Tensor, tf.Tensor], [tf.Tensor, tf.Tensor]]) => {
    return tf.mul(a, d).sub(tf.mul(b, c))
}

tf.setBackend("webgl")
    .then(() => loadImage(q1_1))
    .then((img) => {
        const canvas_org = document.createElement("canvas")
        const canvas = document.createElement("canvas")
        document.body.append(canvas_org)
        document.body.append(canvas)
        let size = 512
        let gw = 5
        let img_tensor: tf.Tensor2D = tf.tidy(() => tf.image.resizeBilinear(tf.browser.fromPixels(img), [size, size]).mean(-1).div(255))

        console.log(img_tensor)
        const k: tf.Tensor2D = <tf.Tensor2D>tf.tidy(() => {
            let k = tf.tensor2d([
                new Array(gw * 2).fill(gw).map((val, idx) => idx - val >= 0 ? 1 : -1)
            ]).tile([gw, 1])
            return tf.concat([k, k.reverse(1)])
        })

        let a = tf.tensor2d([
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        ])
        a = a.add(a.sub(1))
        a = tf.concat([a, a.reverse(1)])

        const kernelA: tf.Tensor2D = k
        const kernelB: tf.Tensor2D = k.neg()
        const pointsA = conv(img_tensor, kernelA)
        const pointsB = conv(img_tensor, kernelB)
        let thA = tf.add(pointsA.mean(), pointsA.max()).div(2)
        let thB = tf.add(pointsB.mean(), pointsB.max()).div(2)
        let pA = tf.greater(pointsA, thA).cast("float32")
        let pB = tf.greater(pointsB, thB).cast("float32")


        tf.browser.toPixels(img_tensor, canvas_org)
        tf.browser.toPixels(
            <tf.Tensor2D>conv(
                <tf.Tensor2D>tf.add(pA, pB).clipByValue(0, 1),
                tf.tensor2d([
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                ])).greater(0.1).cast("float32")
            // <tf.Tensor2D>tf.add(pA, pB).clipByValue(0, 1)
            , canvas)

    })