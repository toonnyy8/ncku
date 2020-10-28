import * as tf from "@tensorflow/tfjs"
import { median7x7, bilateralFilter } from "./conv"


document.getElementById("q2-1b").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = <HTMLCanvasElement>document.getElementById("q2-1c")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = () => {
                canvas.height = img.height
                canvas.width = img.width

                const imgarrs = tf.browser.fromPixels(img, 3).div(255).unstack(-1).map(t => t.arraySync())

                tf.browser.toPixels(
                    <tf.Tensor3D>tf.concat([
                        tf.tensor3d(<number[][][]>imgarrs).transpose([1, 2, 0]),
                        <tf.Tensor3D>tf.tensor3d(imgarrs.map(imgarr => median7x7(<number[][]>imgarr)))
                            .transpose([1, 2, 0])
                    ], 1),
                    canvas
                )
            }
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}

document.getElementById("q2-2b").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = <HTMLCanvasElement>document.getElementById("q2-2c")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = () => {
                canvas.height = img.height
                canvas.width = img.width

                const imgt = tf.browser.fromPixels(img, 3).div(255)
                const kernel = tf.tensor2d(
                    [
                        [1, 2, 1],
                        [2, 4, 2],
                        [1, 2, 1],
                    ]
                ).div(16)
                tf.browser.toPixels(
                    <tf.Tensor3D>tf.concat([imgt,
                        tf.conv2d(
                            <tf.Tensor4D>(imgt.transpose([2, 0, 1]).expandDims(-1)),
                            <tf.Tensor4D>kernel.reshape([3, 3, 1, 1]),
                            1,
                            "same")
                            .squeeze([-1])
                            .transpose([1, 2, 0]),
                    ], 1),
                    canvas)
            }
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}

document.getElementById("q2-3b").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = <HTMLCanvasElement>document.getElementById("q2-3c")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = () => {
                canvas.height = img.height
                canvas.width = img.width

                const imgarrs = tf.browser
                    .fromPixels(img, 3)
                    .unstack(-1)
                    .map(t => t.arraySync())

                tf.browser.toPixels(
                    <tf.Tensor3D>tf.concat([
                        tf.tensor3d(<number[][][]>imgarrs).transpose([1, 2, 0]),
                        <tf.Tensor3D>tf.tensor3d(
                            imgarrs.map((imgarr: number[][]) =>
                                bilateralFilter(
                                    imgarr,
                                    Number((<HTMLInputElement>document.getElementById("sigmaSpace")).value),
                                    Number((<HTMLInputElement>document.getElementById("sigmaColor")).value),
                                    Number((<HTMLInputElement>document.getElementById("halfHeight")).value),
                                    Number((<HTMLInputElement>document.getElementById("halfWidth")).value),
                                )))
                            .transpose([1, 2, 0])
                    ], 1).div(255),
                    canvas
                )
            }
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}