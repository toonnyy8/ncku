///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const conclusion = (() => {
    return [
        template.default_page(
            "Conclusion",
            html.div({ class: ["text-lg"] })([
                html.ul()([
                    html.li({})([
                        `沒有銀彈。`
                    ]),
                    html.br(),
                    html.li({})([
                        `結合 Local Attention 與 Global Attention 的方式，可以在降低記憶體複雜度的情況維持正確率，但速度有瓶頸。`
                    ]),
                    html.br(),
                    html.li({})([
                        `基於 Low Rank 的方法，在「長序列任務」上具有優異的速度與低記憶體複雜度，但卻不適合用於自回歸任務上。`
                    ]),
                    html.br(),
                    html.li({})([
                        `長序列自回歸任務適合使用基於 Recurrence 的方法。`
                    ]),
                ]),
            ]),
        ),
        template.page2(0)(
            "Problem",
            `為何生成任務都要用自回歸模型？`,
            template.div_hc(0)([
                html.img({ src: "./img/problem.png", style: [css.w.percent(65)] })
            ]),
        ),
    ]
})()