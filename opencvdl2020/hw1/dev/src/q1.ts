import * as tf from "@tensorflow/tfjs"


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