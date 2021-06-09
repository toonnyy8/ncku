import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Tmpl1 } from "./template"

import { css } from "./css"
export const introductionPages = [
    <Tmpl1>
        {{
            title: () => "Introduction",
            content: () => "asd",
        }}
    </Tmpl1>,
]
