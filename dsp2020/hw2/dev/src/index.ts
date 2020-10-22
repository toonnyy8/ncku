import * as g2 from "@antv/g2"
import * as tf from "@tensorflow/tfjs"

const ilpf = (T: number) => {
    return (t: number) => {
        const a = Math.sin(Math.PI * t / T)
        const b = Math.PI * t / T
        return a == 0 && b == 0 ? 1 : a / b
    }
}


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
                .then(audioBuffer => audioBuffer.getChannelData(0))
                .then(bufferData => {
                    // bufferData.reduce((prev,curr))

                    const data = Array.from(bufferData.slice(100, 200))
                    {
                        const _data = data
                            .slice(1)
                            .reverse()
                            .concat(data)
                            .concat(data.slice(0, -1).reverse())
                        const ilpfs = _data.map((val, idx) => {
                            const f = ilpf(1)
                            return (n: number) => f(n - idx) * val
                        })
                        const calc = (n: number) => ilpfs.reduce((prev, f) => prev + f(n), 0)

                        console.log(data.reduce((prev, curr) => prev + curr, 0))
                        console.log(calc(0))
                        const chart = new g2.Chart({
                            container: document.body,
                            autoFit: false,
                            width: 1200,
                            height: 300,
                        });
                        const L = 3
                        chart
                            .data(
                                [
                                    ..._data
                                        .map((_, idx) => new Array(L).fill(0)
                                            .map((_, _idx) => calc(idx + _idx / L))
                                        )
                                        .slice(data.length - 1, data.length * 2 - 1)
                                        .reduce((prev, curr) => prev.concat(curr), [])
                                        .slice(0, -L + 1)
                                        .map((val, idx) => ({ n: idx / L, value: val }))
                                    // ...data.map((val, idx) => ({ n: idx, value: val }))
                                ]
                            )
                            .line()
                            .position('n*value')
                        chart.render()
                    }

                    {
                        const _data = data
                            .slice(1)
                            .reverse()
                            .concat(data)
                            .concat(data.slice(0, -1).reverse())
                        const chart = new g2.Chart({
                            container: document.body,
                            autoFit: false,
                            width: 1200,
                            height: 300,
                        });
                        const f = ilpf(4 / 3)



                        const __data = tf.conv1d(
                            tf.tensor2d(_data, [_data.length, 1]),
                            tf.tensor3d(
                                new Array(101)
                                    .fill(0)
                                    .map((_, idx) => f(idx - 50)),
                                [101, 1, 1]),
                            1,
                            "same")
                            .flatten()
                            .arraySync()
                            .slice(data.length - 1, data.length * 2 - 1)

                        const ___data = __data
                            .slice(1)
                            .reverse()
                            .concat(data)
                            .concat(data.slice(0, -1).reverse())

                        const ilpfs = ___data.map((val, idx) => {
                            const f = ilpf(1)
                            return (n: number) => f(n - idx) * val
                        })
                        const calc = (n: number) => ilpfs.reduce((prev, f) => prev + f(n), 0)
                        const L = 3

                        console.log(
                            __data
                                .map((_, idx) => new Array(L).fill(0)
                                    .map((_, _idx) => calc(idx + _idx / L))
                                )
                        )

                        chart
                            .data(
                                [
                                    ...___data
                                        .map((_, idx) => new Array(L).fill(0)
                                            .map((_, _idx) => calc(idx + _idx / L))
                                        )
                                        .slice(data.length - 1, data.length * 2 - 1)
                                        .reduce((prev, curr) => prev.concat(curr), [])
                                        .slice(0, -L + 1)

                                        .map((val, idx) => ({ n: idx / L, value: val }))
                                    // ...data.map((val, idx) => ({ n: idx, value: val }))
                                ]
                            )
                            .line()
                            .position('n*value')
                        chart.render()
                    }

                })
        })

        reader.readAsArrayBuffer(files[0])
    }
    load.click()
}

{
    const f = ilpf(4 / 3)

    const chart = new g2.Chart({
        container: document.body,
        autoFit: false,
        width: 1200,
        height: 300,
    });

    chart
        .data(
            [
                ...new Array(2201).fill(0).map((_, idx) => ({ n: idx / 100, value: f((idx / 100)) }))
            ]
        )
        .line()
        .position('n*value')
    chart.render()
}

{
    const f = ilpf(1)

    const chart = new g2.Chart({
        container: document.body,
        autoFit: false,
        width: 1200,
        height: 300,
    });

    chart
        .data(
            [
                ...new Array(500)
                    .fill(0)
                    .map((_, idx) => f((idx / 10) - 25))
                    .map((val, idx) => ({ n: idx / 10, value: val }))
            ]
        )
        .line()
        .position('n*value')
    chart.render()
}



{
    const f = ilpf(4 / 3)
    console.log(new Array(101)
        .fill(0)
        .map((_, idx) => f(idx - 50)))

    const chart = new g2.Chart({
        container: document.body,
        autoFit: false,
        width: 1200,
        height: 300,
    });

    chart
        .data(
            [
                ...new Array(101)
                    .fill(0)
                    .map((_, idx) => f(idx - 50))
                    .map((val, idx) => ({ n: idx, value: val }))
            ]
        )
        .line()
        .position('n*value')
    chart.render()
}