import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Tmpl1 } from "./template"

import { css } from "./css"
import { Chart } from "@antv/g2"

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
    epoch: idx,
}))
const brData = byolRound.map((data, idx) => ({
    experiment: "BYOL round",
    sisnr: data["Test SISNR"],
    epoch: idx,
}))
const br100sData = byolRound100Step.map((data, idx) => ({
    experiment: "BYOL round(100 s)",
    sisnr: data["Test SISNR"],
    epoch: idx,
}))
const bData = byol.map((data, idx) => ({
    experiment: "BYOL",
    sisnr: data["Test SISNR"],
    epoch: idx,
}))
const nfData = normalFew.map((data, idx) => ({
    experiment: "Normal few",
    sisnr: data["Test SISNR"],
    epoch: idx,
}))
const nData = normal.map((data, idx) => ({
    experiment: "Normal",
    sisnr: data["Test SISNR"],
    epoch: idx,
}))
const ssfData = simsiamFew.map((data, idx) => ({
    experiment: "SimSiam few",
    sisnr: data["Test SISNR"],
    epoch: idx,
}))
const sspData = simsiamPretrain.map((data, idx) => ({
    experiment: "SimSiam pretrain",
    sisnr: data["Test SISNR"],
    epoch: idx,
}))
const ssrData = simsiamRound.map((data, idx) => ({
    experiment: "SimSiam round",
    sisnr: data["Test SISNR"],
    epoch: idx,
}))
const ssData = simsiam.map((data, idx) => ({
    experiment: "SimSiam",
    sisnr: data["Test SISNR"],
    epoch: idx,
}))

const creatChart = (data) => (elem) => {
    const chart = new Chart({
        container: elem,
        width: 800,
        height: 600,
    })
    chart.scale("sisnr", {
        max: 11,
        min: -5,
    })
    chart.scale("epoch", {
        max: 400,
    })
    chart.data(data)
    chart
        .axis("sisnr", {
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
    chart.line().position("epoch*sisnr").color("experiment")
    chart.render()
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
            title: () => "CL vs Normal",
            content: () => (
                <DataPage style={[css.p.all(0), css.tx.center(), css.w.percent(100)]}>
                    {creatChart([...bData, ...ssData, ...nData])}
                </DataPage>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Few Data",
            content: () => (
                <DataPage style={[css.p.all(0), css.tx.center(), css.w.percent(100)]}>
                    {creatChart([...bfData, ...ssfData, ...nfData])}
                </DataPage>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "SimSiam",
            content: () => (
                <DataPage style={[css.p.all(0), css.tx.center(), css.w.percent(100)]}>
                    {creatChart([...ssrData, ...sspData, ...ssData])}
                </DataPage>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "BYOL",
            content: () => (
                <DataPage style={[css.p.all(0), css.tx.center(), css.w.percent(100)]}>
                    {creatChart([...brData, ...br100sData, ...bData])}
                </DataPage>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Introduction",
            content: () => (
                <div style={[css.p.x(10)]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td rowspan="2" style={[css.tx.left(), css.w.percent(28)]}>
                                Model
                            </td>
                            <td colspan="3">Evaluation Metrics</td>
                        </tr>
                        <tr>
                            <td style={[css.w.percent(24)]}>RESQ</td>
                            <td style={[css.w.percent(24)]}>STOI</td>
                            <td style={[css.w.percent(24)]}>SI-SNR</td>
                        </tr>
                        <tr>
                            <td style={[css.tx.left()]}>Noisy</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td style={[css.tx.left()]}>Normal</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td style={[css.tx.left()]}>BYOL</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td style={[css.tx.left()]}>BYOL round</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td style={[css.tx.left()]}>SimSiam</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td style={[css.tx.left()]}>SimSiam round</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl1>,
]
