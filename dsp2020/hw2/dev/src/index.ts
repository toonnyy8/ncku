import * as g2 from "@antv/g2"
import * as tf from "@tensorflow/tfjs"

const ilpf = (T: number) => {
    return (t: number) => {
        const a = Math.sin(Math.PI * t / T)
        const b = Math.PI * t / T
        return a == 0 && b == 0 ? 1 : a / b
    }
}
tf.tensor([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).reshape([-1, 5]).slice([0, 0], [-1, 1]).print()
tf.tensor([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [10]).stack([tf.zeros([10]), tf.zeros([10])], 0).transpose([1, 0]).reshape([-1]).print()

document.getElementById("upload").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "audio/mpeg,audio/wav"

    load.onchange = (event) => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {
            const audioContext = new AudioContext({ sampleRate: 16000 })
            audioContext
                .decodeAudioData(<ArrayBuffer>reader.result)
                .then(audioBuffer => {
                    {
                        const f = (t: tf.Tensor1D, L: number, flen) => {
                            const x: tf.Tensor2D = t.stack(new Array(L - 1).fill(tf.zeros(t.shape)), 0).transpose([1, 0]).reshape([-1, 1])
                            const lp = ilpf(L)
                            return tf.conv1d(
                                x,
                                tf.tensor3d(
                                    new Array(flen * L * 2 + 1)
                                        .fill(0)
                                        .map((_, idx) => lp(idx - flen * L)), [flen * L * 2 + 1, 1, 1]),
                                1,
                                "valid")
                                .flatten()
                        }

                        const L = 3
                        const M = 4
                        const len = 500
                        const flen = 50
                        flen * L * 2 + 1
                        const bfs = new Array(audioBuffer.numberOfChannels).fill(0).map((_, idx) => audioBuffer.getChannelData(idx))
                        console.log(bfs)
                        const downbfs = bfs.map(bf => {
                            let arr = Array.from(bf)
                            let pad = len - bf.length % len
                            arr = arr.concat(new Array(pad).fill(0))
                            let tensor = tf.tensor2d(arr, [arr.length / len, len])
                            let unskts = tensor.unstack(0)
                            let convOuts = tf.concat([
                                tf.stack([unskts[0].reverse(), ...unskts.slice(0, -1)]),
                                tensor,
                                tf.stack([...unskts.slice(1), unskts[unskts.length - 1].reverse()]),
                            ], -1)
                                .slice([0, len - (flen)], [-1, len + (flen * 2)])
                                .unstack(0)
                                .map((t: tf.Tensor1D, idx) => tf.tidy(() => {
                                    // console.log(t)
                                    return f(t, L, flen)
                                }))
                            let convOut = tf.concat(convOuts)
                            const padM = M - convOut.shape[0] % M
                            if (padM != 0) {
                                convOut = tf.concat([convOut, tf.zeros([padM])])
                            }
                            return convOut.reshape([-1, M]).slice([0, 0], [-1, 1]).flatten()
                        })

                        const outContext = new AudioContext({ sampleRate: audioContext.sampleRate * (L / M) })
                        let source = outContext.createBufferSource();
                        let outBuffer = outContext.createBuffer(audioBuffer.numberOfChannels, downbfs[0].shape[0], audioContext.sampleRate * (L / M));
                        new Array(outBuffer.numberOfChannels).fill(0)
                            .map((_, idx) => outBuffer
                                .getChannelData(idx)
                                .set(<number[]>downbfs[idx].arraySync()))


                        source.buffer = outBuffer

                        // connect the AudioBufferSourceNode to the
                        // destination so we can hear the sound
                        source.connect(outContext.destination);

                        // start the source playing
                        source.start();
                        console.log(downbfs)
                    }
                })
        })

        reader.readAsArrayBuffer(files[0])
    }
    load.click()
}