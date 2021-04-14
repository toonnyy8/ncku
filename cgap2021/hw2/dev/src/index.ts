import "../../../../css/build/main.css"
import { createApp } from "vue"
// @ts-ignore
import Ctrl from "./Ctrl.vue"
// @ts-ignore
import View from "./View.vue"

import "./imgMorph"

if (window.name == "") {
    window.name = "image morphing control"
}
const app = (() => {
    if (window.name == "image morphing control") {
        return createApp(Ctrl)
    } else if (window.name == "image morphing view") {
        return createApp(View)
    }
})()

app.mount(document.body)
