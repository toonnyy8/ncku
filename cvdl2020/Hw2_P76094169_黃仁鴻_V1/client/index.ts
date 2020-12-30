import * as tf from "@tensorflow/tfjs"
import * as tool from "./tool"
import * as q2 from "./q2"
import * as q3 from "./q3"
import * as q4 from "./q4"
import * as q5 from "./q5"

fetch("http://localhost:5000/q1-inf")
    .then((response) => {
        return response.json()
    })
    .then(({ fps }: { fps: number }) => {
        const bgSub = <HTMLVideoElement>document.getElementById("bgSub")
        const vc = tool.videoCapture(bgSub, fps)
        const getFrame1_50 = (
            frameIdx?: number,
            frames?: HTMLImageElement[]
        ): Promise<HTMLImageElement[]> => {
            frameIdx = frameIdx === undefined ? 0 : frameIdx
            frames = frames === undefined ? [] : frames
            if ((frameIdx = 49)) {
                return vc.getFrame(frameIdx).then((frame) => [...frames, frame])
            }
            return vc
                .getFrame(frameIdx)
                .then((frame) => getFrame1_50(frameIdx + 1, [...frames, frame]))
        }

        let canvas = document.createElement("canvas")
        canvas.style.width = "100%"
        document.body.appendChild(canvas)
        let button = document.createElement("button")
        button.innerText = "Q1"
        document.body.appendChild(button)

        return getFrame1_50()
            .then((frames) =>
                tf.tidy(() => {
                    let frame1_50 = tf
                        .stack(
                            frames.map((frame) => tf.browser.fromPixels(frame)),
                            0
                        )
                        .mean(3)
                    let mean = frame1_50.mean(0)
                    let std = tf.tidy(() => frame1_50.sub(mean).square().mean(0).sqrt().maximum(5))
                    return [mean, std]
                })
            )
            .then(([mean, std]) => {
                let play = false
                let frameIdx = 0
                let loop = () => {
                    if (play) {
                        if (frameIdx >= vc.getFrameNum()) {
                            frameIdx = 0
                        }
                        vc.getFrame(frameIdx).then((img) =>
                            tf.tidy(() => {
                                let fg = <tf.Tensor3D>(
                                    tf.browser
                                        .fromPixels(img)
                                        .mean(2)
                                        .sub(mean)
                                        .abs()
                                        .greater(std.mul(5))
                                        .cast("float32")
                                )
                                tf.browser.toPixels(fg, canvas)
                                frameIdx += 2
                                requestAnimationFrame(loop)
                            })
                        )
                    }
                }

                button.onclick = () => {
                    play = !play
                    loop()
                }
            })
    })
    .then(() => {
        return q2.runQ2_1()
    })
    .then(() => {
        return q2.runQ2_2()
    })
    .then(() => {
        return q3.runQ3()
    })
    .then(() => {
        return q4.runQ4()
    })
    .then(() => {
        return q5.runQ5()
    })
