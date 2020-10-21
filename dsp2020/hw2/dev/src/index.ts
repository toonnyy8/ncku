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
                                        .slice(99, 199)
                                        .reduce((prev, curr) => prev.concat(curr), [])
                                        .slice(0, -3)
                                        .map((val, idx) => ({ n: idx / L, value: val }))
                                    // ...data.map((val, idx) => ({ n: idx, value: val }))
                                ]
                            )
                            .line()
                            .position('n*value')
                        chart.render()
                    }

                    {
                        const chart = new g2.Chart({
                            container: document.body,
                            autoFit: false,
                            width: 1200,
                            height: 300,
                        });

                        chart
                            .data(
                                [
                                    ...data.map((val, idx) => ({ n: idx, value: val }))
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
    const f = ilpf(100)

    const chart = new g2.Chart({
        container: document.body,
        autoFit: false,
        width: 1200,
        height: 300,
    });

    chart
        .data(
            [
                ...new Array(2201).fill(0).map((_, idx) => ({ n: idx, value: f(idx - 20) }))
            ]
        )
        .line()
        .position('n*value')
    chart.render()
}
{
    const f = ilpf(3)

    const chart = new g2.Chart({
        container: document.body,
        autoFit: false,
        width: 600,
        height: 300,
    });

    chart
        .data(
            [
                ...new Array(221).fill(0).map((_, idx) => ({ n: idx, value: f(idx - 10) }))
            ]
        )
        .line()
        .position('n*value')
    chart.render()
}