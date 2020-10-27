import { CircleAxis } from "@antv/g2/lib/dependents"
import * as tf from "@tensorflow/tfjs"
import { gray, gaussianKernel3x3, conv3x3, median7x7 } from "./conv"

document.getElementById("q1-1b").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = <HTMLCanvasElement>document.getElementById("q1-1c")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = function () {
                console.log(img.height, img.width)
                canvas.height = img.height
                canvas.width = img.width
                ctx.drawImage(img, 0, 0); // Or at whatever offset you like
                document.getElementById("w").innerText = `width: ${img.width}`
                document.getElementById("h").innerText = `height: ${img.height}`
            };
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}

document.getElementById("q1-2b").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = <HTMLCanvasElement>document.getElementById("q1-2c")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = () => tf.tidy(() => {
                canvas.height = img.height
                canvas.width = img.width
                const imgt = tf.browser.fromPixels(img, 3)
                const [r, g, b] = imgt.unstack(-1)
                const zeros = tf.zerosLike(r)
                tf.browser.toPixels(
                    <tf.Tensor3D>tf.concat(
                        [
                            imgt,
                            tf.stack(
                                [
                                    r,
                                    zeros,
                                    zeros,
                                ],
                                -1
                            ),
                            tf.stack(
                                [
                                    zeros,
                                    g,
                                    zeros,
                                ],
                                -1
                            ),
                            tf.stack(
                                [
                                    zeros,
                                    zeros,
                                    b,
                                ],
                                -1
                            ),
                        ],
                        1
                    ),
                    canvas,
                )
                // ctx.drawImage(img, 0, 0); // Or at whatever offset you like
            })
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}

document.getElementById("q1-3b").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = <HTMLCanvasElement>document.getElementById("q1-3c")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = () => tf.tidy(() => {
                canvas.height = img.height
                canvas.width = img.width
                const imgt = tf.browser.fromPixels(img, 3)
                tf.browser.toPixels(
                    <tf.Tensor3D>tf.concat(
                        [
                            imgt,
                            imgt.reverse(1),
                        ],
                        1
                    ),
                    canvas,
                )
                // ctx.drawImage(img, 0, 0); // Or at whatever offset you like
            })
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}

document.getElementById("q1-4b").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = <HTMLCanvasElement>document.getElementById("q1-4c")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = () => {
                canvas.height = img.height
                canvas.width = img.width

                const onchange = () => tf.tidy(() => {
                    const value = Number((<HTMLInputElement>document.getElementById("combine")).value)
                    const imgt = tf.browser.fromPixels(img, 3).div(255)
                    tf.browser.toPixels(
                        <tf.Tensor3D>tf.add(
                            tf.mul(imgt, (100 - value) / 100),
                            tf.mul(imgt.reverse(1), (value) / 100),
                        ),
                        canvas,
                    )
                })
                document.getElementById("combine").onchange = onchange
                onchange()
            }
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}


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
                    <tf.Tensor3D>tf.tensor3d(imgarrs.map(imgarr => median7x7(<number[][]>imgarr)))
                        .transpose([1, 2, 0]),
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

document.getElementById("q4-1b").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = <HTMLCanvasElement>document.getElementById("q4-1c")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height

                    ; (<HTMLInputElement>document.getElementById("Cx")).max = `${img.height}`
                    ; (<HTMLInputElement>document.getElementById("Cy")).max = `${img.width}`
                const Cx = () => Number((<HTMLInputElement>document.getElementById("Cx")).value)
                const Cy = () => Number((<HTMLInputElement>document.getElementById("Cy")).value)
                const r = () => Number((<HTMLInputElement>document.getElementById("rotation")).value)
                const s = () => Number((<HTMLInputElement>document.getElementById("scaling")).value)
                const Tx = () => Number((<HTMLInputElement>document.getElementById("Tx")).value)
                const Ty = () => Number((<HTMLInputElement>document.getElementById("Ty")).value)
                const clear = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.rect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = `#000`
                    ctx.fill()
                }
                const draw = () => {
                    ctx.save()
                    ctx.translate(Cx() + Tx(), Cy() + Ty());
                    ctx.scale(s(), s())
                    ctx.rotate((-r() / 180) * Math.PI);
                    ctx.drawImage(img, -Cx(), -Cy());
                    ctx.restore()
                }
                const update = () => {
                    clear()
                    draw()
                }
                document.getElementById("Cx").onchange = update
                document.getElementById("Cy").onchange = update
                document.getElementById("rotation").onchange = update
                document.getElementById("scaling").onchange = update
                document.getElementById("Tx").onchange = update
                document.getElementById("Ty").onchange = update


                document.getElementById("Cx").oninput = update
                document.getElementById("Cy").oninput = update
                document.getElementById("rotation").oninput = update
                document.getElementById("scaling").oninput = update
                document.getElementById("Tx").oninput = update
                document.getElementById("Ty").oninput = update

                update()
            }
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}