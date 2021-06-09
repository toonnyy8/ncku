import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
// @ts-ignore
import byol_url from "../img/BYOL.png"
// @ts-ignore
import ss_url from "../img/SimSiam.png"
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
]
