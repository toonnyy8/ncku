import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Tmpl1 } from "./template"

import { css } from "./css"
export const conclusionPages = [
    <Tmpl1>
        {{
            title: () => "Conclusion",
            content: () => "asd",
        }}
    </Tmpl1>,
]
