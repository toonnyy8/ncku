import * as g2 from "@antv/g2"
import * as tf from "@tensorflow/tfjs"

const ilpf = (T: number) => {
    return (t: number) => Math.sin(Math.PI * t / T) / (Math.PI * t / T)
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
                .then(channelData => console.log(channelData))
        })

        reader.readAsArrayBuffer(files[0])
    }
    load.click()
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
                ...new Array(2201).fill(0).map((_, idx) => ({ n: idx, value: f(idx * 0.1 - 10) }))
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