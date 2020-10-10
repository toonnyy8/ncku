import * as tf from "@tensorflow/tfjs"
import { loadImage } from "./loadimg"
// @ts-ignore
import q1_1 from "../../Q1_Image/png/1.png"

tf.setBackend("webgl")
    .then(() => loadImage(q1_1))
    .then((img) => {
        let img_tensor: tf.Tensor2D = tf.browser.fromPixels(img, 1).squeeze()

        tf.pad2d(img_tensor, [
            [1, 1],
            [1, 1],
        ])
        tf.pad2d(img_tensor, [
            [1, 1],
            [2, 0],
        ])
        tf.pad2d(img_tensor, [
            [1, 1],
            [0, 2],
        ])

        tf.pad2d(img_tensor, [
            [2, 0],
            [1, 1],
        ])
        tf.pad2d(img_tensor, [
            [2, 0],
            [2, 0],
        ])
        tf.pad2d(img_tensor, [
            [2, 0],
            [0, 2],
        ])

        tf.pad2d(img_tensor, [
            [0, 2],
            [1, 1],
        ])
        tf.pad2d(img_tensor, [
            [0, 2],
            [2, 0],
        ])
        tf.pad2d(img_tensor, [
            [0, 2],
            [0, 2],
        ])
    })
