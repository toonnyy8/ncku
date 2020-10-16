import * as tf from "@tensorflow/tfjs"
import { loadImage } from "./loadimg"
// @ts-ignore
// import cv from "../../../../lib/opencv"
// @ts-ignore
import q1_1 from "../../Q1_Image/png/1.png"
// @ts-ignore
import q4_1 from "../../Q4_Image/Aerial1.jpg"

// console.log(cv)

const gaussianKernel = (sigma: number) => tf.tidy(() => {
    const d = tf.tensor2d([
        [2, 1, 2],
        [1, 0, 1],
        [2, 1, 2]
    ])

    const kernel = tf.exp(d.neg().div(2 * (sigma ** 2))).mul(1 / (2 * Math.PI * (sigma ** 2)))
    return kernel.div(kernel.sum())
})

const octaves = (img_tensor: tf.Tensor2D) => Math.floor(Math.log2(Math.min(...img_tensor.shape))) - 3

const sigma = 1.6
const s = 3
const k = 2 ** (1 / s)

const gaussianPyramidLayer = (s: number) => tf.tidy(() => {
    const sigma = 1.6
    const k = 2 ** (1 / s)
    const d = tf.tensor2d([
        [2, 1, 2],
        [1, 0, 1],
        [2, 1, 2]
    ])

    const kernel = tf.exp(d.neg().div(2 * (sigma ** 2))).mul(1 / (2 * Math.PI * (sigma ** 2)))
    return kernel.div(kernel.sum())
})

const gaussianPyramid = (s: number) => tf.tidy(() => {
    const sigma = 1.6
    const k = 2 ** (1 / s)
    const d = tf.tensor2d([
        [2, 1, 2],
        [1, 0, 1],
        [2, 1, 2]
    ])

    const kernel = tf.exp(d.neg().div(2 * (sigma ** 2))).mul(1 / (2 * Math.PI * (sigma ** 2)))
    return kernel.div(kernel.sum())
})

tf.setBackend("webgl")
    .then(() => loadImage(q4_1))
    .then((img) => {
        const canvas = document.createElement("canvas")
        document.body.append(canvas)

        let img_tensor: tf.Tensor2D = tf.browser.fromPixels(img).mean(-1).cast("int32")


        console.log(octaves(img_tensor))

        let l = 1
        img_tensor = tf.conv2d(<tf.Tensor3D>img_tensor.expandDims(-1), <tf.Tensor4D>gaussianKernel((k ** l) * sigma).reshape([3, 3, 1, 1]), 1, "same").cast("int32")
        tf.browser.toPixels(img_tensor, canvas)
        console.log(img_tensor)
    })
