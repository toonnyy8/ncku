import * as tf from "@tensorflow/tfjs"
fetch("http://localhost:5000/q4-img")
    .then((response) => {
        return response.arrayBuffer()
    })
    .then((imgBuf) => {
        console.log(imgBuf)
        let canvas = document.createElement("canvas")
        canvas.style.height = "300px"
        document.body.appendChild(canvas)
        let imgs = tf.tensor(new Uint8Array(imgBuf), [34 * 2, 100, 100, 3]).unstack(0)

        tf.browser.toPixels(
            <tf.Tensor3D>(
                tf.concat(
                    [
                        tf.concat(imgs.slice(0, 17), 1),
                        tf.concat(imgs.slice(34, 34 + 17), 1),
                        tf.concat(imgs.slice(17, 34), 1),
                        tf.concat(imgs.slice(34 + 17, 34 + 34), 1),
                    ],
                    0
                )
            ),
            // .transpose([1, 0, 2, 3])
            // .reshape([-1, 100, 3])
            canvas
        )
    })
