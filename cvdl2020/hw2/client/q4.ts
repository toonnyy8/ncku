import * as tf from "@tensorflow/tfjs"

export const runQ4 = () => {
    return fetch("http://localhost:5000/q4-img")
        .then((response) => {
            return response.arrayBuffer()
        })
        .then((imgBuf) => {
            console.log(imgBuf)
            let canvas = document.createElement("canvas")
            canvas.style.width = "100%"
            canvas.style.display = "none"
            document.body.appendChild(canvas)
            let button_1 = document.createElement("button")
            button_1.innerText = "Q4-1"
            button_1.onclick = () => {
                canvas.style.display = ""
                button_1.onclick = null
            }
            document.body.appendChild(button_1)

            let imgs = tf.tensor(new Uint8Array(imgBuf), [34 * 2, 100, 100, 3]).unstack(0)
            let orgImg = tf.stack(imgs.slice(0, 34))
            let pcaImg = tf.stack(imgs.slice(34))
            let re = tf.sub(orgImg, pcaImg).square().mean([1, 2, 3]).arraySync()
            let reTextArea = document.createElement("textarea")
            reTextArea.readOnly = true
            reTextArea.style.width = "100%"
            reTextArea.style.display = "none"
            reTextArea.value = JSON.stringify(re)
            document.body.appendChild(reTextArea)
            let button_2 = document.createElement("button")
            button_2.innerText = "Q4-2"
            button_2.onclick = () => {
                reTextArea.style.display = ""
                button_2.onclick = null
            }
            document.body.appendChild(button_2)

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
                canvas
            )
        })
}
