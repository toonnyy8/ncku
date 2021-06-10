// @ts-ignore
import arrow_back from "../icon/arrow_back_ios-white-18dp.svg"
// @ts-ignore
import arrow_forward from "../icon/arrow_forward_ios-white-18dp.svg"
import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Title, Outline, Tmpl1 } from "./template"
import { introductionPages } from "./introduction"
import { methodPages } from "./method"
import { experimentPages } from "./experiment"
import { conclusionPages } from "./conclusion"

import { css } from "./css"

import "./index.css"

const Page = defineComponent((props, { slots }) => {
    return () => {
        return <div class="page">{slots.default()}</div>
    }
})

const App = defineComponent(() => {
    const state = reactive({
        page: (() => {
            let page = Number(window.location.href.split("#/").pop())
            return Number.isNaN(page) ? 0 : page - 1
        })(),
    })

    const pages = [
        <Title>
            {{
                title: () => (
                    <>
                        Contrastive Learning
                        <br />
                        <span class="text-xl"> for</span>
                        <br />
                        Speech Enhancement
                    </>
                ),
                authors: () => [
                    // "郭品辰",
                    "黃仁鴻",
                ],
            }}
        </Title>,
        <Outline>{() => ["Introduction", "Method", "Experiment", "Conclusion"]}</Outline>,
        ...introductionPages,
        ...methodPages,
        ...experimentPages,
        ...conclusionPages,
    ]
    const forward = () => {
        if (state.page < pages.length - 1) {
            state.page++
            window.location.href = `#/${state.page + 1}`
        }
    }

    const back = () => {
        if (state.page > 0) {
            state.page--
            window.location.href = `#/${state.page + 1}`
        }
    }
    let buf = []
    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "PageUp":
            case "ArrowUp":
            case "ArrowLeft": {
                back()
                break
            }
            case "PageDown":
            case "ArrowDown":
            case "ArrowRight": {
                forward()
                break
            }
            case "Enter": {
                if (buf.length != 0) {
                    let target = Number(buf.reduce((prev, curr) => prev + curr, ""))
                    if (target < 1) {
                        target = 1
                    } else if (target > pages.length) {
                        target = pages.length
                    }
                    state.page = target - 1
                    window.location.href = `#/${target}`
                    buf = []
                }
                break
            }
            default: {
                if (e.key >= "0" && e.key <= "9") {
                    buf = buf.concat(e.key)
                } else {
                    buf = []
                }
            }
        }
    })

    return () => (
        <div style="width:100vw;height:100vh;">
            {pages.map((page, idx) => {
                return (
                    <Page class={idx != state.page ? "none" : ""}>
                        {() => (
                            <>
                                {page}
                                <div class={["page-num", "text-lg"]}>{idx + 1}</div>
                            </>
                        )}
                    </Page>
                )
            })}
            <img onClick={back} src={arrow_back} class="page-back-button"></img>
            <img onClick={forward} src={arrow_forward} class="page-forward-button"></img>
        </div>
    )
})

createApp(App).mount(document.body)
