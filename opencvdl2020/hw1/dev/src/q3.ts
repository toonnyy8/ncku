import * as tf from "@tensorflow/tfjs"
import { gray, gaussianKernel3x3, conv3x3, median7x7 } from "./conv"

let q3Result: { _1: number[][], _2: number[][], _3: number[][] } = { _1: null, _2: null, _3: null }

document.getElementById("q3-1b").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = <HTMLCanvasElement>document.getElementById("q3-1c")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = () => {
                canvas.height = img.height
                canvas.width = img.width

                const imgarr = tf.browser.fromPixels(img, 3).div(255).arraySync()

                const imggray = gray(<number[][][]>imgarr)

                q3Result._1 = conv3x3(imggray, gaussianKernel3x3(1))
                q3Result._2 = null
                q3Result._3 = null

                tf.browser.toPixels(
                    <tf.Tensor2D>tf.tensor(q3Result._1),
                    canvas
                )
            }
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}

document.getElementById("q3-2b").onclick = () => {
    if (q3Result._1 != null) {
        const canvas = <HTMLCanvasElement>document.getElementById("q3-2c")
        const ctx = canvas.getContext("2d")

        canvas.height = q3Result._1.length
        canvas.width = q3Result._1[0].length

        q3Result._2 = conv3x3(q3Result._1, [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]])
        q3Result._2 = q3Result._2.map(row => row.map(val => Math.abs(val)))
        let max = Math.max(...q3Result._2.reduce((prev, row) => [...prev, ...row], []))
        let min = Math.min(...q3Result._2.reduce((prev, row) => [...prev, ...row], []))
        console.log(min)
        q3Result._2 = q3Result._2.map(row => row.map(val => (val - min) / (max - min)))

        tf.browser.toPixels(
            <tf.Tensor2D>tf.tensor(q3Result._2),
            canvas
        )

    } else {
        alert("請先執行 Q3-1")
    }
}

document.getElementById("q3-3b").onclick = () => {
    if (q3Result._1 != null) {


        const canvas = <HTMLCanvasElement>document.getElementById("q3-3c")
        const ctx = canvas.getContext("2d")

        canvas.height = q3Result._1.length
        canvas.width = q3Result._1[0].length

        q3Result._3 = conv3x3(q3Result._1, [[1, 2, 1], [0, 0, 0], [-1, -2, -1]])
        q3Result._3 = q3Result._3.map(row => row.map(val => Math.abs(val)))
        let max = Math.max(...q3Result._3.reduce((prev, row) => [...prev, ...row], []))
        let min = Math.min(...q3Result._3.reduce((prev, row) => [...prev, ...row], []))
        console.log(min)
        q3Result._3 = q3Result._3.map(row => row.map(val => (val - min) / (max - min)))

        tf.browser.toPixels(
            <tf.Tensor2D>tf.tensor(q3Result._3),
            canvas
        )

    } else {
        alert("請先執行 Q3-1")
    }
}

document.getElementById("q3-4b").onclick = () => {
    if (q3Result._2 == null) {
        alert("請先執行 Q3-2")
        return
    }
    if (q3Result._3 == null) {
        alert("請先執行 Q3-3")
        return
    }

    const canvas = <HTMLCanvasElement>document.getElementById("q3-4c")
    const ctx = canvas.getContext("2d")

    canvas.height = q3Result._1.length
    canvas.width = q3Result._1[0].length

    let out = new Array(q3Result._1.length).fill(0).map(() => new Array(q3Result._1[0].length).fill(0))
    for (let i = 0; i < out.length; i++)
        for (let j = 0; j < out[0].length; j++) {
            out[i][j] = Math.sqrt(q3Result._2[i][j] ** 2 + q3Result._3[i][j] ** 2)
        }

    let max = Math.max(...out.reduce((prev, row) => [...prev, ...row], []))
    let min = Math.min(...out.reduce((prev, row) => [...prev, ...row], []))
    console.log(min)
    console.log(max)
    out = out.map(row => row.map(val => (val - min) / (max - min)))

    tf.browser.toPixels(
        <tf.Tensor2D>tf.tensor(out),
        canvas
    )
}