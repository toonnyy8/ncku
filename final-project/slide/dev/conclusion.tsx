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
                        <li>
                            目前只有在訓練時看過的物件才能成功重建，而沒有看過的物件在重建後會被扭曲成看過的物件。
                        </li>
                        <li>
                            推測原因有可能是在 Multihead Attention
                            時，類神經網路將位置資訊混進輸出中。導致模型退化成 NeRF + Object
                            Condition，使其缺乏泛化能力。
                        </li>
                    </ul>
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Todo",
            content: () => (
                <div style={[css.m.x(30)]}>
                    <ul>
                        <li>研究如何能確實泛化到沒看過的物件。</li>
                        <li>使用 VQVAE 作為 Encoder 與 Renderer。</li>
                        <li>嘗試在特徵層級就使用 Contrastive Learning 進行約束。</li>
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
                            Nerf: Representing scenes as neural radiance fields for view synthesis.
                            In ECCV, 2020.
                        </li>
                        <br />
                        <li>
                            Attention is all you need. In Proceedings of the 31st International
                            Conference on Neural Information Processing Systems, NIPS’17, page
                            6000–6010, Red Hook, NY, USA, 2017. Curran Associates Inc.
                        </li>
                    </ul>
                </div>
            ),
        }}
    </Tmpl1>,
]
