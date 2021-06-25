import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"

// @ts-ignore
import dnerf_url from "../img/Decoupling-NeRF.png"
// @ts-ignore
import rebuild_view_url from "../img/rebuild-view.png"
// @ts-ignore
import rebuild_view2_url from "../img/rebuild-view-2.png"
// @ts-ignore
import mha_url from "../img/multihead-attention.png"
// @ts-ignore
import render_url from "../img/render-view.png"
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
            title2: () => "Decoupling NeRF",
            content: () => (
                <div style={[css.tx.center()]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(45), css.tx.left()]}>
                                本專題提出的 Decoupling NeRF 便是將場景資訊、場景彩現拆分開。
                                <br />
                                <br />在 Rebuild View 中會對場景編碼重新組織，再交由 Renderer Block
                                輸出畫面。
                                <br />
                                <br />
                                <br />
                            </td>
                            <td style={[css.w.percent(5)]}></td>
                            <td style={[css.w.percent(50)]}>
                                <img src={dnerf_url} style={[css.w.percent(100)]} />
                            </td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "Rebuild View",
            content: () => (
                <div style={[css.tx.center()]}>
                    <img src={rebuild_view_url} style={[css.w.percent(80)]} />
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "Rebuild View",
            content: () => (
                <div style={[css.tx.center()]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(45)]}>
                                <img src={rebuild_view2_url} style={[css.w.percent(100)]} />
                            </td>
                            <td style={[css.w.percent(5)]}></td>
                            <td class="text-lg" style={[css.w.percent(50), css.tx.left()]}>
                                將 View PE、Scene PE 與 Scene Image 分別編碼成 Query、Key 及 Value。
                                <br />
                                <br />
                                並利用 Multihead Attention 的方法把 Value(Scene Embedding)
                                合成為目標視角的場景結構編碼。
                                <br />
                                <br />
                                <br />
                            </td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "Rebuild View",
            content: () => (
                <div style={[css.tx.center()]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(45)]}>
                                <img src={rebuild_view2_url} style={[css.w.percent(100)]} />
                            </td>
                            <td style={[css.w.percent(5)]}></td>
                            <td class="text-lg" style={[css.w.percent(50), css.tx.left()]}>
                                而重構的編碼不直接包含視角資訊，因此可以避免類神經網路直接學習將 PE
                                映射成 3D 模型，使其強制從場景編碼生成目標景象。
                                <br />
                                <br />
                                <br />
                            </td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,
    <Tmpl3>
        {{
            title1: () => "Method",
            title2: () => "Rebuild View",
            title3: () => "Multihead Attention",
            content: () => (
                <div style={[css.tx.center()]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(15)]}></td>
                            <td style={[css.w.percent(70)]}>
                                <img src={mha_url} style={[css.w.percent(100)]} />
                            </td>
                            <td style={[css.w.percent(15)]}></td>
                        </tr>
                    </table>
                    <br />
                    Multihead Attention 是於 2017 年由 Vaswani et al 所提出的，最早是用在 NLP
                    任務上，近年也開始在 CV 領域上流行。
                </div>
            ),
        }}
    </Tmpl3>,
    <Tmpl2>
        {{
            title1: () => "Method",
            title2: () => "Volume Rendering",
            content: () => (
                <div style={[css.tx.center()]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(40), css.tx.left()]}>
                                Renderer Block 將不同深度的 View Embedding 轉換成多個 RGBA 圖層後，
                                會再利用 Volume Rendering 將其合成為單一影像。
                            </td>
                            <td style={[css.w.percent(60)]}>
                                <img src={render_url} style={[css.w.percent(100)]} />
                            </td>
                        </tr>
                    </table>
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
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(20)]}></td>
                            <td style={[css.w.percent(60)]}>
                                <img src={loss_url} style={[css.w.percent(100)]} />
                            </td>
                            <td style={[css.w.percent(20)]}></td>
                        </tr>
                    </table>
                    <br />
                    <p style={[css.tx.left()]}>
                        本次專案使用結構相似性指標 (Structural SIMilarity, SSIM) 作為損失函數。
                    </p>
                </div>
            ),
        }}
    </Tmpl2>,

    // <Tmpl3>
    //     {{
    //         title1: () => "Method",
    //         title2: () => "BYOL",
    //         title3: () => "Momentum Update",
    //         content: () => (
    //             <div style={[css.tx.center()]}>
    //                 <img src={momentum_url} style={[css.w.percent(60)]} />
    //                 <br />
    //                 <img src={byol_url} style={[css.w.percent(60)]} />
    //             </div>
    //         ),
    //     }}
    // </Tmpl3>,
    // <Tmpl3>
    //     {{
    //         title1: () => "Method",
    //         title2: () => "BYOL",
    //         title3: () => "BYOL CL Loss",
    //         content: () => (
    //             <div style={[css.tx.center()]}>
    //                 <img src={byol_loss_url} style={[css.w.percent(70)]} />
    //             </div>
    //         ),
    //     }}
    // </Tmpl3>,
    // <Tmpl2>
    //     {{
    //         title1: () => "Method",
    //         title2: () => "SimSiam",
    //         content: () => (
    //             <div style={[css.tx.center()]}>
    //                 <img src={ss_url} style={[css.w.percent(70)]} />
    //             </div>
    //         ),
    //     }}
    // </Tmpl2>,
    // <Tmpl3>
    //     {{
    //         title1: () => "Method",
    //         title2: () => "SimSiam",
    //         title3: () => "SimSiam CL Loss",
    //         content: () => (
    //             <div style={[css.tx.center()]}>
    //                 <img src={ss_loss_url} style={[css.w.percent(70)]} />
    //             </div>
    //         ),
    //     }}
    // </Tmpl3>,
    // <Tmpl2>
    //     {{
    //         title1: () => "Method",
    //         title2: () => "Similarity",
    //         content: () => (
    //             <div style={[css.tx.center()]}>
    //                 <img src={similarity_url} style={[css.w.percent(70)]} />
    //             </div>
    //         ),
    //     }}
    // </Tmpl2>,
    // <Tmpl2>
    //     {{
    //         title1: () => "Method",
    //         title2: () => "Loss",
    //         content: () => (
    //             <div style={[css.tx.center()]}>
    //                 <img src={loss_url} style={[css.w.percent(75)]} />
    //             </div>
    //         ),
    //     }}
    // </Tmpl2>,
    // <Tmpl2>
    //     {{
    //         title1: () => "Method",
    //         title2: () => "Model",
    //         content: () => (
    //             <table style={[css.tx.center(), css.w.percent(100)]}>
    //                 <tr>
    //                     <td style={[css.w.percent(10)]}></td>
    //                     <td style={[css.w.percent(35)]}>
    //                         <img src={ae_url} style={[css.w.percent(50)]} />
    //                     </td>
    //                     <td style={[css.w.percent(40)]}>
    //                         <img src={model_url} style={[css.w.percent(100)]} />
    //                     </td>
    //                     <td style={[css.w.percent(15)]}></td>
    //                 </tr>
    //             </table>
    //         ),
    //     }}
    // </Tmpl2>,
    // <Tmpl2>
    //     {{
    //         title1: () => "Method",
    //         title2: () => "Model",
    //         content: () => (
    //             <div style={[css.tx.center()]}>
    //                 <img src={model_block_url} style={[css.w.percent(85)]} />
    //             </div>
    //         ),
    //     }}
    // </Tmpl2>,
    // <Tmpl2>
    //     {{
    //         title1: () => "Method",
    //         title2: () => "Model",
    //         content: () => (
    //             <div style={[css.tx.center()]}>
    //                 <img src={dsb_url} style={[css.w.percent(85)]} />
    //             </div>
    //         ),
    //     }}
    // </Tmpl2>,
    // <Tmpl2>
    //     {{
    //         title1: () => "Method",
    //         title2: () => "Model",
    //         content: () => (
    //             <div style={[css.tx.center()]}>
    //                 <img src={mb_url} style={[css.w.percent(75)]} />
    //             </div>
    //         ),
    //     }}
    // </Tmpl2>,
]
