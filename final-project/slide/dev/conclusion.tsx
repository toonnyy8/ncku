import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Tmpl1 } from "./template"

import { css } from "./css"
export const conclusionPages = [
    <Tmpl1>
        {{
            title: () => "Conclusion",
            content: () => (
                <div style={[css.m.x(10)]}>
                    <ul>
                        <li>在訓練前期利用 CL Loss 對中間特徵進行約束能夠加速模型收斂。</li>
                        <li>中後期使用 CL Loss 會降低模型的收斂速度與效能。</li>
                        <li>使用 CL Loss 能夠抑制 Overfitting 的問題。</li>
                        <li>與 SimSiam 相比，BYOL 的 CL Loss 需要更長一點的時間收斂。</li>
                    </ul>
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Todo",
            content: () => (
                <div style={[css.m.x(50)]}>
                    <ul>
                        <li>測試不同比例混和的 Mix Loss 效果。</li>
                        <li>使用複數的噪音跟語音混和進行訓練。</li>
                        <li>研究 Mix Loss 的自適應混合權重。</li>
                        <li>區分噪音種類進行訓練。</li>
                    </ul>
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Reference",
            content: () => (
                <div class="text-base" style={[css.m.x(10)]}>
                    <ul>
                        <li>
                            Bootstrap your own latent: A new approach to self-supervised learning.
                            CoRR, abs/2006.07733, 2020.
                        </li>
                        <br />
                        <li>
                            Exploring simple siamese representation learning. CoRR, abs/2011.10566,
                            2020.
                        </li>
                    </ul>
                </div>
            ),
        }}
    </Tmpl1>,
]
