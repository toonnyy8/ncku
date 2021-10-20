import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Tmpl1, Tmpl2 } from "./template"

import { css } from "./css"
import { Chart } from "@antv/g2"

import test from "../history/test.json"
import byolFew from "../history/BYOL-few.json"
import byolRound from "../history/BYOL-round.json"
import byolRound100Step from "../history/BYOL-round-100-Step.json"
import byol from "../history/BYOL.json"
import normalFew from "../history/Normal-few.json"
import normal from "../history/Normal.json"
import simsiamFew from "../history/Simsiam-few.json"
import simsiamPretrain from "../history/Simsiam-pretrain.json"
import simsiamRound from "../history/Simsiam-round.json"
import simsiam from "../history/Simsiam.json"

const bfData = byolFew.map((data, idx) => ({
    experiment: "BYOL few",
    sisnr: data["Test SISNR"],
    similarity: -data["Train CL Loss"],
    epoch: idx,
}))
const brData = byolRound.map((data, idx) => ({
    experiment: "BYOL round",
    sisnr: data["Test SISNR"],
    similarity: -data["Train CL Loss"],
    epoch: idx,
}))
const br100sData = byolRound100Step.map((data, idx) => ({
    experiment: "BYOL round(100 s)",
    sisnr: data["Test SISNR"],
    similarity: -data["Train CL Loss"],
    epoch: idx,
}))
const bData = byol.map((data, idx) => ({
    experiment: "BYOL",
    sisnr: data["Test SISNR"],
    similarity: -data["Train CL Loss"],
    epoch: idx,
}))
const nfData = normalFew.map((data, idx) => ({
    experiment: "Normal few",
    sisnr: data["Test SISNR"],
    similarity: -data["Train CL Loss"],
    epoch: idx,
}))
const nData = normal.map((data, idx) => ({
    experiment: "Normal",
    sisnr: data["Test SISNR"],
    similarity: -data["Train CL Loss"],
    epoch: idx,
}))
const ssfData = simsiamFew.map((data, idx) => ({
    experiment: "SimSiam few",
    sisnr: data["Test SISNR"],
    similarity: -data["Train CL Loss"],
    epoch: idx,
}))
const sspData = simsiamPretrain.map((data, idx) => ({
    experiment: "SimSiam pretrain",
    sisnr: data["Test SISNR"],
    similarity: -data["Train CL Loss"],
    epoch: idx,
}))
const ssrData = simsiamRound.map((data, idx) => ({
    experiment: "SimSiam round",
    sisnr: data["Test SISNR"],
    similarity: -data["Train CL Loss"],
    epoch: idx,
}))
const ssData = simsiam.map((data, idx) => ({
    experiment: "SimSiam",
    sisnr: data["Test SISNR"],
    similarity: -data["Train CL Loss"],
    epoch: idx,
}))

const creatChart = (data, label: string, max: number, min: number) => (elem) => {
    const chart = new Chart({
        container: elem,
        width: 800,
        height: 600,
    })
    chart.scale(label, {
        max,
        min,
    })
    chart.scale("epoch", {
        max: 400,
    })
    chart.data(data)
    chart
        .axis(label, {
            label: {
                style: {
                    fontSize: 20,
                },
            },
        })
        .axis("epoch", {
            label: {
                style: {
                    fontSize: 20,
                },
            },
        })
        .legend("experiment", {
            itemName: {
                style: { fontSize: 20, fill: "rgb(255, 235, 205)" },
            },
        })
    chart.line().position(`epoch*${label}`).color("experiment")
    chart.render()
}
const round3 = (x) => Math.round(x * 10 ** 3) / 10 ** 3
const createTr = (
    data: { Model: string; [key: string]: any },
    name: string,
    labels: string[],
    style?: string[]
) => {
    return (
        <tr style={style}>
            <td colspan="2" style={[css.tx.left()]}>
                {name}
            </td>
            {labels.map((label) => (
                <td>{round3(data[label])}</td>
            ))}
        </tr>
    )
}

const DataPage = defineComponent((_, { slots }: { slots }) => {
    const chartRef: Ref<HTMLDivElement> = ref(null)
    onMounted(() => {
        slots.default(chartRef.value)
    })

    return () => <div ref={chartRef} />
})

export const experimentPages = [
    <Tmpl1>
        {{
            title: () => "Experiment",
            content: () => (
                <div style={[css.p.x(10)]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(35)]}></td>
                            <td>Normal</td>
                            <td>BYOL</td>
                            <td>SimSiam</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td colspan="1">使用 SE loss</td>
                            <td colspan="2">使用 Mix loss</td>
                        </tr>
                        <tr style={[css.tx.left()]}>
                            <td>Round</td>
                            <td colspan="3">
                                每 50 個 epoch 就更換一次 loss (Mix loss 與 SE loss 交替)
                            </td>
                        </tr>
                        <tr style={[css.tx.left()]}>
                            <td>Pretrain</td>
                            <td colspan="3">前 50 個 epoch 使用 Mix loss，之後都使用 SE loss</td>
                        </tr>
                        <tr style={[css.tx.left()]}>
                            <td>Round (100 step)</td>
                            <td colspan="3">
                                每 100 個 epoch 就更換一次 loss (Mix loss 與 SE loss 交替)
                            </td>
                        </tr>
                        <tr style={[css.tx.left()]}>
                            <td>Few</td>
                            <td colspan="3">將 train data 與 test data 交換</td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "Data",
            content: () => (
                <div style={[css.p.x(10)]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[]}></td>
                            <td style={[]}>Train</td>
                            <td style={[]}>Test</td>
                        </tr>
                        <tr>
                            <td>Speech</td>
                            <td>TIMIT(4120)</td>
                            <td>TIMIT(500)</td>
                        </tr>
                        <tr>
                            <td>Noise</td>
                            <td>Nonspeech(75)</td>
                            <td>Nonspeech(25)</td>
                        </tr>
                        <tr>
                            <td>SNR(dB)</td>
                            <td>-10, -5, 0, 5, 10</td>
                            <td>-7.5, -2.5, 2.5, 7.5</td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "Hyperparameter",
            content: () => (
                <div style={[css.p.x(20)]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td colspan="4"></td>
                        </tr>
                        <tr>
                            <td rowspan="2">Optimizer:SGD</td>
                            <td>lr</td>
                            <td>momentum</td>
                            <td>weight decay</td>
                        </tr>
                        <tr>
                            <td>0.05</td>
                            <td>0.9</td>
                            <td>0.0001</td>
                        </tr>
                        <tr>
                            <td>Batch Size</td>
                            <td colspan="3">
                                N<sub>1</sub>+N<sub>2</sub> = 128+128
                            </td>
                        </tr>
                        <tr>
                            <td>BYOL τ</td>
                            <td colspan="3">0.99</td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "CL vs Normal",
            content: () => (
                <DataPage style={[css.p.all(0), css.tx.center(), css.w.percent(100)]}>
                    {creatChart([...bData, ...ssData, ...nData], "sisnr", 11, -5)}
                </DataPage>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "BYOL",
            content: () => (
                <DataPage style={[css.p.all(0), css.tx.center(), css.w.percent(100)]}>
                    {creatChart([...brData, ...br100sData, ...bData], "sisnr", 11, -5)}
                </DataPage>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "SimSiam",
            content: () => (
                <DataPage style={[css.p.all(0), css.tx.center(), css.w.percent(100)]}>
                    {creatChart([...ssrData, ...sspData, ...ssData], "sisnr", 11, -5)}
                </DataPage>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "Train Similarity",
            content: () => (
                <DataPage style={[css.p.all(0), css.tx.center(), css.w.percent(100)]}>
                    {creatChart([...bData, ...brData, ...ssData, ...ssrData], "similarity", 1, 0)}
                </DataPage>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "Evaluation Metrics",
            content: () => (
                <div style={[css.p.x(10)]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td rowspan="2" colspan="2" style={[css.tx.left(), css.w.percent(34)]}>
                                Model
                            </td>
                            <td colspan="3">Evaluation Metrics</td>
                        </tr>
                        <tr>
                            <td style={[css.w.percent(22)]}>PESQ</td>
                            <td style={[css.w.percent(22)]}>STOI</td>
                            <td style={[css.w.percent(22)]}>SI-SNR</td>
                        </tr>
                        {createTr(
                            test.find((data) => data.Model == "Noisy"),
                            "Noisy",
                            ["PESQ", "STOI", "SI-SNR"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "Normal"),
                            "Normal",
                            ["PESQ", "STOI", "SI-SNR"],
                            [css.tx.color(100, 200, 255, 255)]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL"),
                            "BYOL",
                            ["PESQ", "STOI", "SI-SNR"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL-round"),
                            "BYOL round",
                            ["PESQ", "STOI", "SI-SNR"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL-round-100-step"),
                            "BYOL round(100 s)",
                            ["PESQ", "STOI", "SI-SNR"],
                            [css.tx.color(100, 255, 150, 255)]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "SimSiam"),
                            "SimSiam",
                            ["PESQ", "STOI", "SI-SNR"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "SimSiam-round"),
                            "SimSiam round",
                            ["PESQ", "STOI", "SI-SNR"],
                            [css.tx.color(100, 255, 150, 255)]
                        )}
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "PESQ",
            content: () => (
                <div style={[css.p.x(10)]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td rowspan="2" style={[css.tx.left(), css.w.percent(34 - 16.5)]}>
                                Model
                            </td>
                            <td style={[css.w.percent(16.5)]}>SNR:</td>
                            <td style={[css.w.percent(16.5)]}>-7.5</td>
                            <td style={[css.w.percent(16.5)]}>-2.5</td>
                            <td style={[css.w.percent(16.5)]}>2.5</td>
                            <td style={[css.w.percent(16.5)]}>7.5</td>
                        </tr>
                        <tr>
                            <td colspan="1"></td>
                            <td colspan="4">PESQ</td>
                        </tr>
                        {createTr(
                            test.find((data) => data.Model == "Noisy"),
                            "Noisy",
                            ["PESQ:-7.5", "PESQ:-2.5", "PESQ:2.5", "PESQ:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "Normal"),
                            "Normal",
                            ["PESQ:-7.5", "PESQ:-2.5", "PESQ:2.5", "PESQ:7.5"],
                            [css.tx.color(100, 200, 255, 255)]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL"),
                            "BYOL",
                            ["PESQ:-7.5", "PESQ:-2.5", "PESQ:2.5", "PESQ:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL-round"),
                            "BYOL round",
                            ["PESQ:-7.5", "PESQ:-2.5", "PESQ:2.5", "PESQ:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL-round-100-step"),
                            "BYOL round(100 s)",
                            ["PESQ:-7.5", "PESQ:-2.5", "PESQ:2.5", "PESQ:7.5"],
                            [css.tx.color(100, 255, 150, 255)]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "SimSiam"),
                            "SimSiam",
                            ["PESQ:-7.5", "PESQ:-2.5", "PESQ:2.5", "PESQ:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "SimSiam-round"),
                            "SimSiam round",
                            ["PESQ:-7.5", "PESQ:-2.5", "PESQ:2.5", "PESQ:7.5"],
                            [css.tx.color(100, 255, 150, 255)]
                        )}
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "STOI",
            content: () => (
                <div style={[css.p.x(10)]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td rowspan="2" style={[css.tx.left(), css.w.percent(34 - 16.5)]}>
                                Model
                            </td>
                            <td style={[css.w.percent(16.5)]}>SNR:</td>
                            <td style={[css.w.percent(16.5)]}>-7.5</td>
                            <td style={[css.w.percent(16.5)]}>-2.5</td>
                            <td style={[css.w.percent(16.5)]}>2.5</td>
                            <td style={[css.w.percent(16.5)]}>7.5</td>
                        </tr>
                        <tr>
                            <td colspan="1"></td>
                            <td colspan="4">STOI</td>
                        </tr>
                        {createTr(
                            test.find((data) => data.Model == "Noisy"),
                            "Noisy",
                            ["STOI:-7.5", "STOI:-2.5", "STOI:2.5", "STOI:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "Normal"),
                            "Normal",
                            ["STOI:-7.5", "STOI:-2.5", "STOI:2.5", "STOI:7.5"],
                            [css.tx.color(100, 200, 255, 255)]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL"),
                            "BYOL",
                            ["STOI:-7.5", "STOI:-2.5", "STOI:2.5", "STOI:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL-round"),
                            "BYOL round",
                            ["STOI:-7.5", "STOI:-2.5", "STOI:2.5", "STOI:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL-round-100-step"),
                            "BYOL round(100 s)",
                            ["STOI:-7.5", "STOI:-2.5", "STOI:2.5", "STOI:7.5"],
                            [css.tx.color(100, 255, 150, 255)]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "SimSiam"),
                            "SimSiam",
                            ["STOI:-7.5", "STOI:-2.5", "STOI:2.5", "STOI:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "SimSiam-round"),
                            "SimSiam round",
                            ["STOI:-7.5", "STOI:-2.5", "STOI:2.5", "STOI:7.5"],
                            [css.tx.color(100, 255, 150, 255)]
                        )}
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "SI-SNR",
            content: () => (
                <div style={[css.p.x(10)]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td rowspan="2" style={[css.tx.left(), css.w.percent(34 - 16.5)]}>
                                Model
                            </td>
                            <td style={[css.w.percent(16.5)]}>SNR:</td>
                            <td style={[css.w.percent(16.5)]}>-7.5</td>
                            <td style={[css.w.percent(16.5)]}>-2.5</td>
                            <td style={[css.w.percent(16.5)]}>2.5</td>
                            <td style={[css.w.percent(16.5)]}>7.5</td>
                        </tr>
                        <tr>
                            <td colspan="1"></td>
                            <td colspan="4">SI-SNR</td>
                        </tr>
                        {createTr(
                            test.find((data) => data.Model == "Noisy"),
                            "Noisy",
                            ["SI-SNR:-7.5", "SI-SNR:-2.5", "SI-SNR:2.5", "SI-SNR:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "Normal"),
                            "Normal",
                            ["SI-SNR:-7.5", "SI-SNR:-2.5", "SI-SNR:2.5", "SI-SNR:7.5"],
                            [css.tx.color(100, 200, 255, 255)]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL"),
                            "BYOL",
                            ["SI-SNR:-7.5", "SI-SNR:-2.5", "SI-SNR:2.5", "SI-SNR:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL-round"),
                            "BYOL round",
                            ["SI-SNR:-7.5", "SI-SNR:-2.5", "SI-SNR:2.5", "SI-SNR:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "BYOL-round-100-step"),
                            "BYOL round(100 s)",
                            ["SI-SNR:-7.5", "SI-SNR:-2.5", "SI-SNR:2.5", "SI-SNR:7.5"],
                            [css.tx.color(100, 255, 150, 255)]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "SimSiam"),
                            "SimSiam",
                            ["SI-SNR:-7.5", "SI-SNR:-2.5", "SI-SNR:2.5", "SI-SNR:7.5"]
                        )}
                        {createTr(
                            test.find((data) => data.Model == "SimSiam-round"),
                            "SimSiam round",
                            ["SI-SNR:-7.5", "SI-SNR:-2.5", "SI-SNR:2.5", "SI-SNR:7.5"],
                            [css.tx.color(100, 255, 150, 255)]
                        )}
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,

    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "Few Data",
            content: () => (
                <DataPage style={[css.p.all(0), css.tx.center(), css.w.percent(100)]}>
                    {creatChart([...bfData, ...ssfData, ...nfData], "sisnr", 11, -5)}
                </DataPage>
            ),
        }}
    </Tmpl2>,
]
