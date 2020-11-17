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

const normSpectrogramImage = (spectrogram: tf.Tensor) => {
    return tf.tidy(() => {
        let norm_spectrogram = log10(spectrogram).clipByValue(-5, Infinity)
        let min = norm_spectrogram.min()
        let max = norm_spectrogram.max()
        norm_spectrogram = <tf.Tensor2D>(norm_spectrogram.sub(min).div(max.sub(min)).transpose([1, 0]).reverse(0))

        return <tf.Tensor3D>tf.stack([
            norm_spectrogram,
            tf.zerosLike(norm_spectrogram),
            tf.sub(1, norm_spectrogram)
        ], -1).pow(2)
    })
}

(<HTMLInputElement>document.getElementById("semitones"))
    .oninput = () => {
        document.getElementById("print-semitones").innerText = `Change in semitones: ${(<HTMLInputElement>document.getElementById("semitones")).value}`
    }

tf.setBackend("webgl")
    .then(() => {
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
                        .then(audioBuffer => tf.tidy(() => {
                            let shiftValue = Number((<HTMLInputElement>document.getElementById("semitones")).value)
                            let audioArr = audioBuffer.getChannelData(0)

                            let source_spectrogram = tf.signal.stft(tf.tensor(audioArr), 512, 128, 512, tf.signal.hannWindow).abs()
                            let source_spectrogram_img = normSpectrogramImage(source_spectrogram)
                            tf.browser.toPixels(
                                source_spectrogram_img,
                                source_canvas)

                            let rate = 2 ** (shiftValue / 12)
                            let analysis = 64
                            let synthesis = Math.round(analysis * rate)
                            let win_len = analysis * 8
                            let win = tf.signal.hannWindow(win_len)
                            let ana_count = Math.ceil(len(audioArr) / analysis)
                            let omega = tf.tensor(
                                new Array(win_len)
                                    .fill(0)
                                    .map((_, idx) =>
                                        2 * Math.PI * idx * analysis / win_len
                                    ))
                            let ang_pre: tf.Tensor1D = tf.zeros([win_len])
                            let ang: tf.Tensor1D = tf.zeros([win_len])
                            let y_ang: tf.Tensor1D = tf.zeros([win_len])
                            let out = []
                            for (let offset = 0; offset < ana_count; offset++) {
                                tf.tidy(() => {
                                    let frame = <tf.Tensor1D>tf.tensor(audioArr.slice(analysis * offset, analysis * offset + win_len))
                                    if (frame.shape[0] < win_len) {
                                        frame = tf.pad1d(frame, [0, win_len - frame.shape[0]])
                                    }
                                    frame = frame.mul(win)

                                    let frame_fft = <tf.Tensor1D>tf.fft(tf.complex(frame, tf.zerosLike(frame)))
                                    ang_pre.dispose()
                                    ang_pre = tf.keep(ang.clone())
                                    ang.dispose()
                                    ang = tf.keep(tf.atan2(tf.imag(frame_fft), tf.real(frame_fft)))
                                    let mag = frame_fft.abs()

                                    let delta = ang.sub(ang_pre.add(omega))
                                    let phase_unwrap = delta.sub(tf.round(delta.div(2 * Math.PI)).mul(2 * Math.PI))
                                    let phase_inc = (phase_unwrap.add(omega)).div(analysis)

                                    if (offset == 0) {
                                        y_ang.dispose()
                                        y_ang = ang.clone()
                                    }
                                    else {
                                        let dis = y_ang
                                        y_ang = y_ang.clone()
                                        dis.dispose()
                                        y_ang = y_ang.add(phase_inc.mul(synthesis))
                                    }
                                    y_ang = tf.keep(y_ang.sub(tf.round(y_ang.div(2 * Math.PI)).mul(2 * Math.PI)))

                                    let h = tf.complex(
                                        tf.cos(y_ang).mul(mag),
                                        tf.sin(y_ang).mul(mag),
                                    )
                                    let y_ifft = <number[]>tf.real(tf.ifft(h)).mul(win).flatten().arraySync()
                                    y_ifft.forEach((sample, idx) => {
                                        if (out[offset * synthesis + idx] === undefined) out[offset * synthesis + idx] = 0
                                        out[offset * synthesis + idx] += sample
                                    })

                                })
                            }
                            ang_pre.dispose()
                            ang.dispose()
                            y_ang.dispose()
                            console.log(tf.memory())

                            let pitch_shift_audioArr = out
                            pitch_shift_audioArr = <number[]>tf.image.resizeBilinear(
                                tf.tensor3d(pitch_shift_audioArr, [len(pitch_shift_audioArr), 1, 1]),
                                [ana_count * analysis + (win_len - analysis), 1]
                            ).flatten().arraySync()
                            pitch_shift_audioArr = pitch_shift_audioArr.slice(0, len(audioArr))


                            let pitch_shift_spectrogram = tf.signal.stft(tf.tensor(pitch_shift_audioArr), 512, 128, 512, tf.signal.hannWindow).abs()
                            let pitch_shift_spectrogram_img = normSpectrogramImage(pitch_shift_spectrogram)
                            tf.browser.toPixels(
                                pitch_shift_spectrogram_img,
                                pitch_shift_canvas)

                            {
                                const outContext = new AudioContext({ sampleRate: audioContext.sampleRate })
                                let source = outContext.createBufferSource();
                                let outBuffer = outContext.createBuffer(1, len(pitch_shift_audioArr), audioContext.sampleRate);
                                outBuffer
                                    .getChannelData(0)
                                    .set(pitch_shift_audioArr)

                                source.buffer = outBuffer

                                // connect the AudioBufferSourceNode to the
                                // destination so we can hear the sound
                                source.connect(outContext.destination);

                                // start the source playing
                                source.start();
                            }

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
                        }))
                })

                reader.readAsArrayBuffer(files[0])
            }
            load.click()
        }
    })