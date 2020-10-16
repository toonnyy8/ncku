import * as tf from "@tensorflow/tfjs"

export const gaussianFilter7x7 = (sigma): tf.Tensor2D => {
    let w = tf.tensor2d([3, 2, 1, 0, 1, 2, 3], [7, 1]).square().tile([1, 7])
    w.add(w.transpose([1, 0]))
    const d = tf.tensor2d([
        [2, 1, 2],
        [1, 0, 1],
        [2, 1, 2]
    ])

    const kernel = tf.exp(
        w.add(
            w.transpose([1, 0])
        ).neg()
            .div(2 * (sigma ** 2))
    ).mul(1 / (2 * Math.PI * (sigma ** 2)))
    return kernel.div(kernel.sum())
}