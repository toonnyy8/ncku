///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const problems = (() => {
    return [
        template.default_page(
            "Problems",
            html.p({ style: [css.p.t(1)] })([
                html.ol({ class: ["text-lg"] })([
                    html.li({ style: [css.p.b(10)] })`在 PESQ 與 STOI 的評估標準上並未到達很理想的結果。`,
                    html.li()`即使是給予了正確聲學資訊的 Oracle 模型，與 Proposed 模型相比也沒有很大的提升。`
                ]),
            ])
        ),
    ]
})()