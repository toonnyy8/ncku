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

                    let source = audioContext.createBufferSource();
                    // set the buffer in the AudioBufferSourceNode
                    let bf0 = audioBuffer.getChannelData(0)
                    bf0.reverse()
                    let bf1 = audioBuffer.getChannelData(1)
                    bf1.reverse()

                    source.buffer = audioBuffer

                    // connect the AudioBufferSourceNode to the
                    // destination so we can hear the sound
                    source.connect(audioContext.destination);

                    // start the source playing
                    source.start();

                    return audioBuffer.getChannelData(0)
                })
                .then(bufferData => {

                    // const _bufferData = bufferData.slice(0, Math.floor(bufferData.length / 2))
                    // const _data = Array.from(_bufferData)

                    // const filterSize = 25
                    // const L = 3
                    // const M = 4
                    // const kernel = tf.tensor3d(
                    //     new Array(filterSize * 2 * 3 + 1)
                    //         .fill(0)
                    //         .map((_, idx) => ilpf(M / L)(idx / L - filterSize)),
                    //     [filterSize * 2 * 3 + 1, 1, 1]
                    // )
                    // const data =
                    //     (() => {
                    //         let data = Array.from(_bufferData)
                    //         data = data
                    //             .slice(1, (filterSize + 1))
                    //             .reverse()
                    //             .concat(data)
                    //             .concat(data
                    //                 .slice(-(filterSize + 1), -1)
                    //                 .reverse())

                    //         let tensorData = tf.tensor2d(data, [data.length, 1])

                    //         return tf.tidy(() => tf.concat(
                    //             [
                    //                 tensorData,
                    //                 ...new Array(L - 1).fill(tf.zeros([data.length, 1]))
                    //             ],
                    //             -1)
                    //             .reshape([-1, 1])
                    //         )
                    //     })()
                    // let out: tf.Tensor = tf.tidy(() => tf.conv1d(data, kernel, 1, "valid").flatten())
                    // let shortage = out.shape[0] % M
                    // if (shortage != 0) {
                    //     console.log(out)
                    //     out = out.concat(tf.zeros([M - shortage]), 0)
                    // }

                    // out = out
                    //     .reshape([-1, M])
                    //     .slice([0, 0], [-1, 1])
                    //     .flatten()

                    // const audioContextOut = new AudioContext({ sampleRate: 12000 })
                    // let myArrayBuffer = audioContextOut.createBuffer(1, out.shape[0], audioContextOut.sampleRate * (L / M));
                    // let bf = myArrayBuffer.getChannelData(0)
                    // let obf = out.bufferSync()
                    // bf.forEach((_, idx) => bf[idx] = obf[idx])
                    // let source = audioContextOut.createBufferSource();
                    // // set the buffer in the AudioBufferSourceNode
                    // source.buffer = myArrayBuffer

                    // // connect the AudioBufferSourceNode to the
                    // // destination so we can hear the sound
                    // source.connect(audioContextOut.destination);

                    // // start the source playing
                    // source.start();

                })
        })

        reader.readAsArrayBuffer(files[0])
    }
    load.click()
}