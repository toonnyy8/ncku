import * as tf from "@tensorflow/tfjs"
import { loadImage } from "./loadimg"
import { gaussianFilter7x7 } from "./gaussian"

// @ts-ignore
import cv from "../../../../lib/opencv"

console.log(cv)
// @ts-ignore
import q1_1 from "../../Q1_Image/png/5.png"

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
        let gw = 4
        let img_tensor: tf.Tensor2D = tf.tidy(() => tf.image.resizeBilinear(tf.browser.fromPixels(img), [size, size]).mean(-1).div(255))

        img_tensor.array().then((arr => {

        }))
        // console.log(img_tensor)
        // const gxk = tf.tensor2d([
        //     new Array(gw * 2 + 1).fill(gw).map((val, idx) => idx - val)
        // ])
        // const gyk = tf.tensor2d([
        //     ...new Array(gw * 2 + 1).fill(gw).map((val, idx) => [idx - val])
        // ])
        // let Ix = conv(img_tensor, gxk)
        // let Iy = conv(img_tensor, gyk)
        // let Ix2 = tf.tidy(() => conv(Ix.square(), gaussianFilter7x7(2)))
        // let Iy2 = tf.tidy(() => conv(Iy.square(), gaussianFilter7x7(2)))
        // console.log(Ix.mul(Iy))
        // let Ixy: tf.Tensor2D = tf.tidy(() => conv(Ix.mul(Iy), gaussianFilter7x7(2)))
        // Ix.dispose()
        // Iy.dispose()
        // let R = det2x2([[Ix2, Ixy], [Ixy, Iy2]]).sub(tf.mul(0.05, tf.add(Ix2, Iy2).square()))

        // R.max()
        //     .array()
        //     .then((Rmax: number) => {
        //         console.log(Rmax)
        //         return R.array()
        //             .then(arr => {
        //                 let result: number[][] = new Array(size).fill(0).map(() => (new Array(size).fill(0)))
        //                 let cnt = 0
        //                 for (let i = 1; i < size - 1; i++) {
        //                     for (let j = 1; j < size - 1; j++) {
        //                         if (arr[i][j] > 0.01 * Rmax) {
        //                             if (
        //                                 arr[i][j] > arr[i + 1][j - 1] &&
        //                                 arr[i][j] > arr[i + 1][j] &&
        //                                 arr[i][j] > arr[i + 1][j + 1] &&
        //                                 arr[i][j] > arr[i][j + 1] &&
        //                                 arr[i][j] > arr[i][j - 1] &&
        //                                 arr[i][j] > arr[i - 1][j + 1] &&
        //                                 arr[i][j] > arr[i - 1][j] &&
        //                                 arr[i][j] > arr[i - 1][j - 1]
        //                             ) {
        //                                 result[i][j] = 1
        //                                 cnt += 1
        //                             }
        //                         }
        //                     }
        //                 }
        //                 console.log(cnt)
        //                 return result
        //             })
        //     }).then((result: number[][]) => {
        //         tf.browser.toPixels(img_tensor, canvas_org)
        //         tf.browser.toPixels(tf.tensor2d(result), canvas)

        //     })


    })