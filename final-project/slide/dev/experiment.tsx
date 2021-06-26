import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Tmpl1, Tmpl2, Tmpl3 } from "./template"
// @ts-ignore
import train_0_url from "../img/experiment/train_0.png"
// @ts-ignore
import train_1_url from "../img/experiment/train_1.png"
// @ts-ignore
import train_2_url from "../img/experiment/train_2.png"
// @ts-ignore
import train_3_url from "../img/experiment/train_3.png"
// @ts-ignore
import train_4_url from "../img/experiment/train_4.png"

// @ts-ignore
import test_0_url from "../img/experiment/test_0.png"
// @ts-ignore
import test_1_url from "../img/experiment/test_1.png"
// @ts-ignore
import test_2_url from "../img/experiment/test_2.png"
// @ts-ignore
import test_3_url from "../img/experiment/test_3.png"
// @ts-ignore
import test_4_url from "../img/experiment/test_4.png"

import { css } from "./css"

export const experimentPages = [
    <Tmpl2>
        {{
            title1: () => "Experiment",
            title2: () => "Data",
            content: () => (
                <div style={[css.p.x(10)]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td colspan="2" style={[]}>
                                <a href="https://drive.google.com/drive/folders/128yBriW1IG_3NJ5Rp7APSTZsJqdJdfc1">
                                    nerf_synthetic
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style={[css.w.percent(40)]}>Train Object</td>
                            <td style={[css.tx.left()]}>
                                chair, drums, ficus, hotdog, lego, materials
                            </td>
                        </tr>
                        <tr>
                            <td>Test Object</td>
                            <td style={[css.tx.left()]}>mic, ship</td>
                        </tr>
                        <tr>
                            <td>Size</td>
                            <td style={[css.tx.left()]}>resize to 64x64 pixels</td>
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
                            <td colspan="3"></td>
                        </tr>
                        <tr>
                            <td rowspan="2">Optimizer:Adamax</td>
                            <td>lr</td>
                            <td>betas</td>
                        </tr>
                        <tr>
                            <td>0.002</td>
                            <td>(0.9, 0.999)</td>
                        </tr>
                        <tr>
                            <td>Batch Size</td>
                            <td colspan="2">
                                4x8 (基本 batch size 為 4，但會累計 8 個 batch 才更新一次權重)
                            </td>
                        </tr>
                        <tr>
                            <td>
                                PE：L<sub>embed</sub>
                            </td>
                            <td colspan="2">12</td>
                        </tr>
                        <tr>
                            <td>dim</td>
                            <td colspan="2">256</td>
                        </tr>
                        <tr>
                            <td rowspan="2">Multihead Attention</td>
                            <td>head number</td>
                            <td>head dim</td>
                        </tr>
                        <tr>
                            <td>32</td>
                            <td>32</td>
                        </tr>
                        <tr>
                            <td>Down/Upsample</td>
                            <td colspan="2">8</td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl3>
        {{
            title1: () => "Experiment",
            title2: () => "Result",
            title3: () => "Train Object",
            content: () => (
                <div style={[]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td>Pred</td>
                            <td>Target</td>
                            <td>Pred</td>
                            <td>Target</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <img src={train_0_url} style={[css.w.percent(100)]} />
                            </td>
                            <td colspan="2">
                                <img src={train_1_url} style={[css.w.percent(100)]} />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <img src={train_2_url} style={[css.w.percent(100)]} />
                            </td>
                            <td colspan="2">
                                <img src={train_3_url} style={[css.w.percent(100)]} />
                            </td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl3>,
    <Tmpl3>
        {{
            title1: () => "Experiment",
            title2: () => "Result",
            title3: () => "Test Object",
            content: () => (
                <div style={[]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td>Pred</td>
                            <td>Target</td>
                            <td>Pred</td>
                            <td>Target</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <img src={test_0_url} style={[css.w.percent(100)]} />
                            </td>
                            <td colspan="2">
                                <img src={test_2_url} style={[css.w.percent(100)]} />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <img src={test_3_url} style={[css.w.percent(100)]} />
                            </td>
                            <td colspan="2">
                                <img src={test_4_url} style={[css.w.percent(100)]} />
                            </td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl3>,
]
