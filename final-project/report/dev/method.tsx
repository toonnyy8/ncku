import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
// @ts-ignore
import byol_url from "../img/BYOL.png"
// @ts-ignore
import ss_url from "../img/SimSiam.png"
// @ts-ignore
import similarity_url from "../img/similarity.png"
// @ts-ignore
import ae_url from "../img/AutoEncoder.png"
// @ts-ignore
import model_url from "../img/model.png"
// @ts-ignore
import model_block_url from "../img/model-block.png"
// @ts-ignore
import dsb_url from "../img/down-sample-block.png"
// @ts-ignore
import mb_url from "../img/main-block.png"
import { Tmpl1 } from "./template"

import { css } from "./css"
export const methodPages = [
    <Tmpl1>
        {{
            title: () => "BYOL",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={byol_url} style={[css.w.percent(85)]} />
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "SimSiam",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={ss_url} style={[css.w.percent(70)]} />
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Model",
            content: () => (
                <table style={[css.tx.center(), css.w.percent(100)]}>
                    <tr>
                        <td style={[css.w.percent(10)]}></td>
                        <td style={[css.w.percent(35)]}>
                            <img src={ae_url} style={[css.w.percent(50)]} />
                        </td>
                        <td style={[css.w.percent(40)]}>
                            <img src={model_url} style={[css.w.percent(100)]} />
                        </td>
                        <td style={[css.w.percent(15)]}></td>
                    </tr>
                </table>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Model",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={model_block_url} style={[css.w.percent(85)]} />
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Model",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={dsb_url} style={[css.w.percent(85)]} />
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Model",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={mb_url} style={[css.w.percent(75)]} />
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Similarity",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={similarity_url} style={[css.w.percent(70)]} />
                </div>
            ),
        }}
    </Tmpl1>,
]
