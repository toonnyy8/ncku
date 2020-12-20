import * as tf from "@tensorflow/tfjs"
import * as tool from "./tool"
import * as q2 from "./q2"
import "./q4"

// let canvas = document.createElement("canvas")
// canvas.style.width = "100%"
// document.body.appendChild(canvas)

// fetch("http://localhost:5000/q1-inf")
//     .then((response) => {
//         return response.json()
//     })
//     .then(({ fps }: { fps: number }) => {
//         const bgSub = <HTMLVideoElement>document.getElementById("bgSub")
//         const vc = tool.videoCapture(bgSub, fps)
//         const getFrame1_50 = (
//             frameIdx?: number,
//             frames?: HTMLImageElement[]
//         ): Promise<HTMLImageElement[]> => {
//             frameIdx = frameIdx === undefined ? 0 : frameIdx
//             frames = frames === undefined ? [] : frames
//             if ((frameIdx = 49)) {
//                 return vc.getFrame(frameIdx).then((frame) => [...frames, frame])
//             }
//             return vc
//                 .getFrame(frameIdx)
//                 .then((frame) => getFrame1_50(frameIdx + 1, [...frames, frame]))
//         }
//         getFrame1_50()
//             .then((frames) =>
//                 tf.tidy(() => {
//                     let frame1_50 = tf
//                         .stack(
//                             frames.map((frame) => tf.browser.fromPixels(frame)),
//                             0
//                         )
//                         .mean(3)
//                     let mean = frame1_50.mean(0)
//                     let std = tf.tidy(() => frame1_50.sub(mean).square().mean(0).sqrt().maximum(5))
//                     return [mean, std]
//                 })
//             )
//             .then(([mean, std]) => {
//                 let frameIdx = 0
//                 let loop = () => {
//                     if (frameIdx >= vc.getFrameNum()) {
//                         frameIdx = 0
//                     }
//                     vc.getFrame(frameIdx).then((img) =>
//                         tf.tidy(() => {
//                             let fg = <tf.Tensor3D>(
//                                 tf.browser
//                                     .fromPixels(img)
//                                     .mean(2)
//                                     .sub(mean)
//                                     .abs()
//                                     .greater(std.mul(5))
//                                     .cast("float32")
//                             )
//                             tf.browser.toPixels(fg, canvas)
//                             frameIdx += 2
//                             requestAnimationFrame(loop)
//                         })
//                     )
//                 }
//                 loop()
//             })
//     })
//     .then(() => {
//         q2.runQ2()
//     })
