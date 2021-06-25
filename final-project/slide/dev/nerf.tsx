import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Tmpl1, Tmpl2 } from "./template"
// @ts-ignore
import nerf_url from "../img/NeRF.png"
// @ts-ignore
import nerf_coupling_url from "../img/NeRF-is-content-coupling.png"
// @ts-ignore
import pe_url from "../img/positional-encoding.png"
// @ts-ignore
import pe2_url from "../img/positional-encoding-2.png"

import { css } from "./css"
export const nerfPages = [
    <Tmpl1>
        {{
            title: () => "NeRF",
            content: () => (
                <div style={[css.tx.center()]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(40), css.tx.left()]}>
                                NeRF 在算繪時，會將每個體素的 Positional Encoding
                                輸入進類神經網路中，並獲取對應的 RGBA。
                                <br />
                                <br />
                                在利用體素與鏡頭的距離跟得到的 RGBA 值，合成出最終的視圖。
                                <br />
                                <br />
                                <br />
                            </td>
                            <td style={[css.w.percent(5)]}></td>
                            <td style={[css.w.percent(55)]}>
                                <img src={nerf_url} style={[css.w.percent(100)]} />
                            </td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl2>
        {{
            title1: () => "NeRF",
            title2: () => "Positional Encoding",
            content: () => (
                <div style={[css.tx.center()]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(45), css.tx.left()]}>
                                先利用相機姿態矩陣計算出視圖中每個像素的座標，再將座標通過下式轉換為
                                Positional Encoding。
                            </td>
                            <td style={[css.w.percent(55)]}>
                                <img src={pe2_url} style={[css.w.percent(100)]} />
                            </td>
                        </tr>
                    </table>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(15)]}></td>
                            <td style={[css.w.percent(70)]}>
                                <img src={pe_url} style={[css.w.percent(100)]} />
                            </td>
                            <td style={[css.w.percent(15)]}></td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,

    <Tmpl2>
        {{
            title1: () => "NeRF",
            title2: () => <span class="text-xl">NeRF is content coupling</span>,
            content: () => (
                <div style={[css.tx.center()]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td style={[css.w.percent(5)]}></td>
                            <td style={[css.w.percent(40)]}>
                                <img src={nerf_coupling_url} style={[css.w.percent(100)]} />
                            </td>
                            <td style={[css.w.percent(5)]}></td>
                            <td style={[css.w.percent(50), css.tx.left()]}>
                                NeRF
                                的做法會隱式的將場景資訊記錄到類神經網路中。再藉由輸入的位置編碼
                                (Positional Encoding, PE) 提取出該點的資訊。
                                <br />
                                <br />
                                因此，每個 NeRF 模型只會紀錄一種場景而且無法輕易切換。
                                <br />
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
]
