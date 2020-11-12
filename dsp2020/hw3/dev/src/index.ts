import * as g2 from "@antv/g2"
import * as tf from "@tensorflow/tfjs"
import { WavAudioEncoder } from "../lib/WavAudioEncoder";

const canvas = <HTMLCanvasElement>document.getElementById("spectrogram")

const log10 = (x) => tf.tidy(() => {
    let numerator = tf.log(x)
    let denominator = tf.log(10)
    return tf.div(numerator, denominator)
})

tf.setBackend("webgl")
    .then(() => {
        const sinc = (x) => Math.sin(x) / x
        const ilp = (Ts, Tcutoff) => (t) => t == 0 ? 0 : -sinc(2 * Math.PI * t / (Ts / Tcutoff))
        let f = ilp(16000, 880)
        let f2 = ilp(16000, 110)
        let L = 14 * 2 + 1
        let data = new Array(L).fill(0).map((_, idx) => f(idx - Math.floor(L / 2)))
        let data2 = new Array(L).fill(0).map((_, idx) => f2(idx - Math.floor(L / 2)))
        console.log(data.reduce((prev, curr) => prev + curr))
        console.log(data2.reduce((prev, curr) => prev + curr))
        let sp = tf.signal.stft(tf.tensor(data), L, L, 512).flatten()
        sp = <tf.Tensor1D>log10(tf.real(sp).square().add(tf.imag(sp).square()).sqrt())
        sp = sp.sub(sp.max())
        sp.max().print()
        // sp = sp.sub(sp.min()).div(sp.max().sub(sp.min()))
        let data_sp = <number[]>sp.flatten().arraySync()


        let sp2 = tf.signal.stft(tf.tensor(data2), L, L, 512).flatten()
        sp2 = <tf.Tensor1D>log10(sp2.abs())
        sp2.max().print()
        sp2 = sp2.sub(sp2.min()).div(sp2.max().sub(sp2.min()))

        // Step 1: 创建 Chart 对象
        const chart = new g2.Chart({
            container: document.body, // 指定图表容器 ID
            width: 600, // 指定图表宽度
            height: 300, // 指定图表高度
        });

        // Step 2: 载入数据源
        // chart.data(data.map((val, idx) => ({ idx, val })));
        chart.data(data_sp.map((val, idx) => ({ idx, val })));

        // Step 3: 创建图形语法，绘制柱状图
        chart.interval().position('idx*val');

        // Step 4: 渲染图表
        chart.render();
        document.getElementById("my-downsample").onclick = () => {
            let load = document.createElement("input")
            load.type = "file"
            load.accept = "audio/mpeg,audio/wav"

            load.onchange = (event) => {
                const files = load.files
                let reader = new FileReader()
                reader.addEventListener("loadend", () => {
                    const audioContext = new AudioContext({ sampleRate: 16000 })
                    audioContext
                        .decodeAudioData(<ArrayBuffer>reader.result)
                        .then(audioBuffer => {

                            let s = tf.signal.stft(tf.tensor(audioBuffer.getChannelData(0)), 512, 128, 512, tf.signal.hannWindow)

                            let spectrogram =
                                log10(
                                    tf.add(
                                        tf.pow(tf.imag(s), 2),
                                        tf.pow(tf.real(s), 2))
                                        .sqrt()
                                )
                            let min = spectrogram.min()
                            let max = spectrogram.max()
                            spectrogram = <tf.Tensor2D>(spectrogram.sub(min).div(max.sub(min)).transpose([1, 0]).reverse(0))

                            tf.browser.toPixels(
                                <tf.Tensor3D>tf.stack([
                                    spectrogram,
                                    tf.zerosLike(spectrogram),
                                    tf.sub(1, spectrogram)
                                ], -1).pow(2), canvas)
                        })
                })

                reader.readAsArrayBuffer(files[0])
            }
            load.click()
        }
    })