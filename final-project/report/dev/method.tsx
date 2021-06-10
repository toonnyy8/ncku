import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
// @ts-ignore
import byol_url from "../img/BYOL.png"
// @ts-ignore
import momentum_url from "../img/Momentum.png"
// @ts-ignore
import byol_loss_url from "../img/BYOL-loss.png"
// @ts-ignore
import ss_url from "../img/SimSiam.png"
// @ts-ignore
import ss_loss_url from "../img/SimSiam-loss.png"
// @ts-ignore
import similarity_url from "../img/similarity.png"
// @ts-ignore
import loss_url from "../img/loss.png"
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
import { Tmpl2, Tmpl3 } from "./template"

import { css } from "./css"
export const methodPages = [
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "BYOL",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={byol_url} style={[css.w.percent(85)]} />
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl3>
        {{
            title1: () => "Method",
            title2: () => "BYOL",
            title3: () => "Momentum Update",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={momentum_url} style={[css.w.percent(60)]} />
                    <br />
                    <img src={byol_url} style={[css.w.percent(60)]} />
                </div>
            ),
        }}
    </Tmpl3>,
    <Tmpl3>
        {{
            title1: () => "Method",
            title2: () => "BYOL",
            title3: () => "BYOL CL Loss",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={byol_loss_url} style={[css.w.percent(70)]} />
                </div>
            ),
        }}
    </Tmpl3>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "SimSiam",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={ss_url} style={[css.w.percent(70)]} />
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl3>
        {{
            title1: () => "Method",
            title2: () => "SimSiam",
            title3: () => "SimSiam CL Loss",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={ss_loss_url} style={[css.w.percent(70)]} />
                </div>
            ),
        }}
    </Tmpl3>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "Similarity",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={similarity_url} style={[css.w.percent(70)]} />
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "Loss",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={loss_url} style={[css.w.percent(75)]} />
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "Model",
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
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "Model",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={model_block_url} style={[css.w.percent(85)]} />
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "Model",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={dsb_url} style={[css.w.percent(85)]} />
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "Model",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={mb_url} style={[css.w.percent(75)]} />
                </div>
            ),
        }}
    </Tmpl2>,
]
