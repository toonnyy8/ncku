import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Tmpl1 } from "./template"

import { css } from "./css"
export const introductionPages = [
    <Tmpl1>
        {{
            title: () => "Introduction",
            content: () => (
                <div style={[css.m.x(10)]}>
                    於 2020 年提出的神經輻射場(Neural Radiance Field, NeRF)
                    利用簡單的類神經網路結構來擬合 Volume Rendering 的 3D 模型。 但 NeRF 的設計會將
                    Renderer 與 Scene 嵌入於同一個類神經網路中。 導致兩者具有高度耦合性而無法拆分。
                    因此需要更換場景時，NeRF就需要重新進行訓練。
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Introduction",
            content: () => (
                <div style={[css.m.x(10)]}>
                    然而，在一般 3D 場景的儲存與展示都是將 Scene 及 Renderer 拆分開來，並將 Scene
                    作為輸入以取得對應視角的照片。 這樣一來，Renderer 的部分就能重複利用於不同的 3D
                    場景上。
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Introduction",
            content: () => (
                <div style={[css.m.x(10)]}>
                    本次專題研究提出的 Decoupling NeRF， 便是利用 Scene Encoding Block
                    將照片編碼為場景特徵後，與目標視角一同輸入至 Renderer Block 生成目標圖片，
                    藉此讓 NeRF 能快速應用在各種場景而不需要重新擬合。
                </div>
            ),
        }}
    </Tmpl1>,
]
