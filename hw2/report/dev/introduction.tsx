import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Tmpl1 } from "./template"

import { css } from "./css"
export const introductionPages = [
    <Tmpl1>
        {{
            title: () => "Introduction",
            content: () => (
                <div style={[css.m.x(10)]}>
                    日常生活中有許多任務都仰賴語音作為資訊傳遞的媒介。
                    <br />
                    然而充滿在現實環境中的各種噪音干擾會嚴重影響語音任務的效能。
                    <br />
                    因此，將這些雜訊去除的語音增強技術就成了重要的前置處理單元。
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Introduction",
            content: () => (
                <div style={[css.m.x(10)]}>
                    而語音增強的問題就是不論在何種噪音環境，面對相同的語音，模型都能夠抽取出相同的特徵並將其還原。
                    <br />
                    這部分想法與近年流行自監督方法中的對比學習(Contrastive Learning)不謀而合。
                    <br />
                    對比學習希望相似樣本間的特徵編碼能越像越好，而負樣本的特徵差異則是越大越好。
                </div>
            ),
        }}
    </Tmpl1>,
    <Tmpl1>
        {{
            title: () => "Introduction",
            content: () => (
                <div style={[css.m.x(10)]}>
                    我認為，藉由 CL
                    的方法來學習語音特徵，應該會具備比一般深度學習的語音增強方法更高的性能。
                    <br />
                    然而，在 SE 問題中不容易訂定 frame level 的負樣本。
                    <br />
                    為此，本研究使用無須負樣本的 BYOL 與 SimSiam 這兩種方法作為研究主軸，並與未使用
                    CL 方法的模型進行比較。
                </div>
            ),
        }}
    </Tmpl1>,
]
