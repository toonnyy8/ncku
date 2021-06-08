// @ts-ignore
import arrow_back from "../icon/arrow_back_ios-white-18dp.svg"
// @ts-ignore
import arrow_forward from "../icon/arrow_forward_ios-white-18dp.svg"
import { h, reactive, defineComponent, createApp, Fragment } from "vue"
import { Title, Outline } from "./template"

const Page = defineComponent((props, { slots }) => {
    return () => {
        return <div class="page">{slots}</div>
    }
})
const App = defineComponent(() => {
    const state = reactive({
        page: 0,
    })

    const pages = reactive([
        <Title>
            {{
                title: (
                    <>
                        Contrastive Learning
                        <br />
                        <span class="text-xl"> for</span>
                        <br />
                        Speech Enhancement
                    </>
                ),
                authors: ["郭品辰", "黃仁鴻"],
            }}
        </Title>,
        <Outline>{[1, 2, 3]}</Outline>,
    ])

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
    const show = (page) => (_page) => {
        if (page == _page) {
            return ""
        } else {
            return "none"
        }
    }
    let buf = []
    window.addEventListener("keydown", (e) => {
        console.log(e.key)
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
                    state.page = Number(buf.reduce((prev, curr) => prev + curr, "")) - 1
                    window.location.href = `#/${state.page + 1}`
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
                        {page}
                        <div class={["page-num", "text-lg"]}>{idx + 1}</div>
                    </Page>
                )
            })}
            <img onClick={back} src={arrow_back} class="page-back-button"></img>
            <img onClick={forward} src={arrow_forward} class="page-forward-button"></img>
        </div>
    )
})

createApp(App).mount(document.body)

// // @ts-ignore
// import arrow_back from "../icon/arrow_back_ios-black-18dp.svg"
// // @ts-ignore
// import arrow_forward from "../icon/arrow_forward_ios-black-18dp.svg"

// import { title } from "./title"
// import { html } from "./html"
// const { render, img } = html
// const control = render(
//     ...title
//     // ...introduction,
//     // ...efficient_transformers,
//     // ...long_range_arena,
//     // ...experiments,
//     // ...conclusion
// )
// let pageNum = Number(window.location.href.split("#/")[1] || 1)
// control.jump(pageNum - 1)
// pageNum = control.at() + 1
// window.location.href = `#/${pageNum}`

// let back = () => {
//     control.prev()
//     pageNum = control.at() + 1
//     window.location.href = `#/${pageNum}`
// }
// let forward = () => {
//     control.next()
//     pageNum = control.at() + 1
//     window.location.href = `#/${pageNum}`
// }

// console.log(document.body.classList.contains("theme-light"))
// let backB, forwardB

// if (document.body.classList.contains("theme-light")) {
//     backB = img({ class: ["page-back-button"], src: arrow_back })
//     forwardB = img({ class: ["page-forward-button"], src: arrow_forward })
//     document.body.append(backB, forwardB)
// } else {
//     backB = img({ class: ["page-back-button"], src: "./icon/arrow_back_ios-white-18dp.svg" })
//     forwardB = img({
//         class: ["page-forward-button"],
//         src: "./icon/arrow_forward_ios-white-18dp.svg",
//     })
//     document.body.append(backB, forwardB)
// }
// backB.onclick = back
// forwardB.onclick = forward

// let buf = []
// window.addEventListener("keydown", (e) => {
//     console.log(e.key)
//     switch (e.key) {
//         case "PageUp":
//         case "ArrowUp":
//         case "ArrowLeft": {
//             back()
//             break
//         }
//         case "PageDown":
//         case "ArrowDown":
//         case "ArrowRight": {
//             forward()
//             break
//         }
//         case "Enter": {
//             if (buf.length != 0) {
//                 control.jump(Number(buf.reduce((prev, curr) => prev + curr, "")) - 1)
//                 pageNum = control.at() + 1
//                 window.location.href = `#/${pageNum}`
//                 buf = []
//             }
//             break
//         }
//         default: {
//             if (e.key >= "0" && e.key <= "9") {
//                 buf = buf.concat(e.key)
//             } else {
//                 buf = []
//             }
//         }
//     }
// })

// // import history from "../history/history.json"
// // import "./index.css"
// // import { title } from "./title"
// // import { html } from "./html"
// // import { Chart } from "@antv/g2"

// // let normalData = history.map((data, idx) => ({
// //     experiment: "Normal",
// //     sisnr: data["Normal Test SISNR"],
// //     epoch: idx,
// // }))
// // let normalFewData = history.map((data, idx) => ({
// //     experiment: "Normal Few",
// //     sisnr: data["Normal-few Test SISNR"],
// //     epoch: idx,
// // }))
// // let simsiamData = history.map((data, idx) => ({
// //     experiment: "SimSiam",
// //     sisnr: data["SimSiam Test SISNR"],
// //     epoch: idx,
// // }))
// // let simsiamFewData = history.map((data, idx) => ({
// //     experiment: "SimSiam Few",
// //     sisnr: data["SimSiam-few Test SISNR"],
// //     epoch: idx,
// // }))
// // let simsiamPretrainData = history.map((data, idx) => ({
// //     experiment: "SimSiam Pretrain",
// //     sisnr: data["SimSiam-pretrain Test SISNR"],
// //     epoch: idx,
// // }))
// // let simsiamRoundData = history.map((data, idx) => ({
// //     experiment: "SimSiam Round",
// //     sisnr: data["SimSiam-round Test SISNR"],
// //     epoch: idx,
// // }))
// // const data = [
// //     ...normalData,
// //     ...normalFewData,
// //     ...simsiamData,
// //     ...simsiamFewData,
// //     ...simsiamPretrainData,
// //     ...simsiamRoundData,
// // ]

// // const chart = new Chart({
// //     container: document.body,
// //     width: 800,
// //     height: 600,
// //     // padding: [20, 90, 95, 80],
// // })

// // chart.scale("sisnr", {
// //     max: 11,
// // })
// // chart.scale("epoch", {
// //     max: 400,
// // })
// // chart.data(data)

// // chart.line().position("epoch*sisnr").color("experiment")
// // chart.render()
