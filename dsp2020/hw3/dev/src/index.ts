import * as g2 from "@antv/g2"
import * as tf from "@tensorflow/tfjs"
import { WavAudioEncoder } from "../lib/WavAudioEncoder";

const source_canvas = <HTMLCanvasElement>document.getElementById("source-spectrogram")
const pitch_shift_canvas = <HTMLCanvasElement>document.getElementById("pitch-shift-spectrogram")

const len = <T>(arr: ArrayLike<T>) => arr.length

const log10 = (x) => tf.tidy(() => {
    let numerator = tf.log(x)
    let denominator = tf.log(10)
    return tf.div(numerator, denominator)
})

const sinc = (x) => Math.sin(x) / x
const ilp = (Ts, Tcutoff) => (t) => (t == 0 ? 1 : sinc(2 * Math.PI * t / (Ts / Tcutoff)))

const lowpass = (Ts: number, from: number, L: number) => {
    const fil = ilp(Ts, from,)

    let K = new Array(L).fill(0).map((_, idx) => fil(idx - Math.floor(L / 2)))
    const K_acc = K.reduce((prev, curr) => prev + curr, 0)
    K = K.map(val => val / K_acc)

    return K
}

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

const pitchShift = (semitones: number, source: ArrayLike<number>) => {
    const windowFn = (x) => (1 + Math.cos(2 * Math.PI * x)) / 2
    let outptr = 0
    let periodratio = 2 ** (-semitones / 12)
    console.log(periodratio)

    let out = new Array(len(source)).fill(0)

    let newSource = <Float32Array>tf.image.resizeBilinear(
        tf.tensor3d(<number[]>source, [len(source), 1, 1]),
        [Math.round(len(source) * periodratio), 1]
    ).flatten().dataSync()

    let x = 0
    let oldzerocross = -1

    for (let i = 0; i < len(source); i++) {
        let oldx = x
        x = source[i]

        if (oldx > 0 && x <= 0) {
            let periodlength = (i - oldzerocross);
            oldzerocross = i;
            while (outptr < i) {
                let p = Math.round(periodlength * periodratio)
                outptr = outptr + p//Math.round(periodlength * periodratio)
                for (let n = -p; n <= p; n++) {

                    if (outptr + n >= 0 &&
                        outptr + n < len(source) &&
                        i + n >= 0 &&
                        i + n < len(source)) {
                        out[outptr + n] +=
                            newSource[Math.round(i * periodratio) + n] *
                            // windowFn(n / (periodlength * 2))
                            windowFn(n / (p * 2))
                        // (n < -p / 2 || n > p / 2 ? 0 : windowFn(n / (p)))
                    }
                }
            }
        }
    }
    return out
}

const normSpectrogramImage = (spectrogram: tf.Tensor) => {
    let norm_spectrogram = log10(spectrogram)
    let min = norm_spectrogram.min()
    let max = norm_spectrogram.max()
    norm_spectrogram = <tf.Tensor2D>(norm_spectrogram.sub(min).div(max.sub(min)).transpose([1, 0]).reverse(0))

    return <tf.Tensor3D>tf.stack([
        norm_spectrogram,
        tf.zerosLike(norm_spectrogram),
        tf.sub(1, norm_spectrogram)
    ], -1).pow(2)
}

(<HTMLInputElement>document.getElementById("semitones"))
    .oninput = () => {
        document.getElementById("print-semitones").innerText = `Change in semitones: ${(<HTMLInputElement>document.getElementById("semitones")).value}`
    }

tf.setBackend("webgl")
    .then(() => {
        let L = 256 * 2 + 1

        let bandpassK1 = bandpass(16000, 110, 550, L)
        let bandpassK2 = bandpass(16000, 550, 1760, L)
        let bandpassK3 = bandpass(16000, 1760, 4000, L)
        let bandpassK = tf.addN([
            tf.tensor(bandpassK1),
            tf.tensor(bandpassK2).mul(0.1),
            tf.tensor(bandpassK3).mul(0.05),
        ]).dataSync()

        // let bandpassSP = <number[]>tf.spectral.rfft(
        //     tf.tensor(bandpassK),
        //     512
        // ).abs().arraySync()

        // {  // Step 1: 创建 Chart 对象
        //     const chart = new g2.Chart({
        //         container: document.body, // 指定图表容器 ID
        //         width: 600, // 指定图表宽度
        //         height: 300, // 指定图表高度
        //     });

        //     // Step 2: 载入数据源
        //     // chart.data(Array.from(bandpassK).map((val, idx) => ({ idx, val })));
        //     chart.data(bandpassSP.map((val, idx) => ({ idx, val })));

        //     // Step 3: 创建图形语法，绘制柱状图
        //     chart.interval().position('idx*val');

        //     // Step 4: 渲染图表
        //     chart.render();
        // }

        document.getElementById("upload").onclick = () => {
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
                            let shiftValue = Number((<HTMLInputElement>document.getElementById("semitones")).value)
                            let audioArr = audioBuffer.getChannelData(0)

                            let source_spectrogram = tf.signal.stft(tf.tensor(audioArr), 512, 128, 512, tf.signal.hannWindow).abs()
                            let source_spectrogram_img = normSpectrogramImage(source_spectrogram)
                            tf.browser.toPixels(
                                source_spectrogram_img,
                                source_canvas)

                            let pitch_shift_audioArr = <Float32Array>tf.conv1d(
                                tf.tensor3d(audioArr, [1, len(audioArr), 1]),
                                tf.tensor3d(bandpassK, [L, 1, 1]),
                                1,
                                "same").flatten().dataSync()
                            pitch_shift_audioArr = new Float32Array(pitchShift(shiftValue, pitch_shift_audioArr))



                            let pitch_shift_spectrogram = tf.signal.stft(tf.tensor(pitch_shift_audioArr), 512, 128, 512, tf.signal.hannWindow).abs()

                            let pitch_shift_spectrogram_img = normSpectrogramImage(pitch_shift_spectrogram)

                            tf.browser.toPixels(
                                pitch_shift_spectrogram_img,
                                pitch_shift_canvas)

                            {
                                let encoder = new WavAudioEncoder(audioContext.sampleRate, 1)
                                encoder.encode([pitch_shift_audioArr])


                                let blob = encoder.finish("audio/wav")
                                let a = document.createElement("a")
                                let url = window.URL.createObjectURL(blob)
                                let filename = "pitch_shift.wav"
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