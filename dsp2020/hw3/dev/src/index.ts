import * as g2 from "@antv/g2"
import * as tf from "@tensorflow/tfjs"
import { WavAudioEncoder } from "../lib/WavAudioEncoder";

const canvas = <HTMLCanvasElement>document.getElementById("spectrogram")

const len = <T>(arr: ArrayLike<T>) => arr.length

const log10 = (x) => tf.tidy(() => {
    let numerator = tf.log(x)
    let denominator = tf.log(10)
    return tf.div(numerator, denominator)
})

const sinc = (x) => Math.sin(x) / x
const ilp = (Ts, Tcutoff) => (t) => (t == 0 ? 1 : sinc(2 * Math.PI * t / (Ts / Tcutoff)))

const bandpass = (Ts: number, from: number, to: number, L: number) => {
    const tofil = ilp(Ts, to)
    const fromfil = ilp(Ts, from)

    let toK = new Array(L).fill(0).map((_, idx) => tofil(idx - Math.floor(L / 2)))
    const toK_acc = toK.reduce((prev, curr) => prev + curr, 0)
    toK = toK.map(val => val / toK_acc)

    let fromK = new Array(L).fill(0).map((_, idx) => fromfil(idx - Math.floor(L / 2)))
    const fromK_acc = fromK.reduce((prev, curr) => prev + curr, 0)
    fromK = fromK.map(val => val / fromK_acc)

    return new Array(L).fill(0).map((_, idx) => toK[idx] - fromK[idx])
}

0.5 * (1 - Math.cos(0))

const pitchShift = (semitones: number, source: ArrayLike<number>) => {
    const windowFn = (x) => (1 + Math.cos(2 * Math.PI * x)) / 2
    let outptr = 0
    let periodratio = 2 ** (-semitones / 12)

    let out = new Array(len(source)).fill(0)

    let x = 0
    let oldzerocross = 0

    for (let i = 0; i < len(source); i++) {
        let oldx = x
        x = source[i]

        if (oldx > 0 && x <= 0) {
            let periodlength = i - oldzerocross;
            oldzerocross = i;
            while (outptr < i) {
                let p = Math.round(periodlength * periodratio)
                outptr = outptr + p
                for (let n = -p; n < p; n++) {

                    if (n + outptr > 0 &&
                        n + outptr <= len(source) &&
                        n + i > 0 &&
                        n + i <= len(source)) {
                        out[n + outptr] = out[n + outptr] + source[n + i] *
                            windowFn(n / (periodlength * 2))
                        // ((1 + Math.cos(2 * Math.PI * (n / periodlength) / 2)) / 2);
                    }
                }
            }
        }
    }
    return out
}

tf.setBackend("webgl")
    .then(() => {
        let L = 256 * 2 + 1

        let bandpassK = bandpass(16000, 440, 550, L)
        // let bandpassK = bandpass(16000, 440, 880, L)
        // let bandpassK = bandpass(16000, 220, 440, L)
        // let bandpassK = bandpass(16000, 110, 440, L)

        let bandpassSP = <number[]>tf.spectral.rfft(
            tf.tensor(bandpassK),
            512
        ).abs().arraySync()

        {  // Step 1: 创建 Chart 对象
            const chart = new g2.Chart({
                container: document.body, // 指定图表容器 ID
                width: 600, // 指定图表宽度
                height: 300, // 指定图表高度
            });

            // Step 2: 载入数据源
            // chart.data(bandpassK.map((val, idx) => ({ idx, val })));
            chart.data(bandpassSP.map((val, idx) => ({ idx, val })));

            // Step 3: 创建图形语法，绘制柱状图
            chart.interval().position('idx*val');

            // Step 4: 渲染图表
            chart.render();
        }

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
                            let audioArr = audioBuffer.getChannelData(0)
                            audioArr = <Float32Array>tf.conv1d(
                                tf.tensor3d(audioArr, [1, len(audioArr), 1]),
                                tf.tensor3d(bandpassK, [L, 1, 1]),
                                1,
                                "same").flatten().dataSync()
                            audioArr = new Float32Array(pitchShift(6, audioArr))

                            let s = tf.signal.stft(tf.tensor(audioArr), 512, 128, 512, tf.signal.hannWindow).abs()

                            let spectrogram = log10(s)
                            let min = spectrogram.min()
                            let max = spectrogram.max()
                            spectrogram = <tf.Tensor2D>(spectrogram.sub(min).div(max.sub(min)).transpose([1, 0]).reverse(0))

                            tf.browser.toPixels(
                                <tf.Tensor3D>tf.stack([
                                    spectrogram,
                                    tf.zerosLike(spectrogram),
                                    tf.sub(1, spectrogram)
                                ], -1).pow(2), canvas)

                            {
                                let encoder = new WavAudioEncoder(audioContext.sampleRate, 1)
                                encoder.encode([audioArr])


                                let blob = encoder.finish("audio/wav")
                                let a = document.createElement("a")
                                let url = window.URL.createObjectURL(blob)
                                let filename = "downsampling.wav"
                                a.href = url
                                a.download = filename
                                a.click()
                                window.URL.revokeObjectURL(url)
                                encoder.cancel()
                            }
                        })
                })

                reader.readAsArrayBuffer(files[0])
            }
            load.click()
        }
    })