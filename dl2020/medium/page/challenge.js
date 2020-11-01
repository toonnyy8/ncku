///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const challenge = (() => {
    return [
        template.default_page(
            "Challenge",
            html.div({ style: [css.tx.center(), css.p.t(1)] })([
                html.p({ class: ["text-base"], style: [css.tx.left()] })([
                    `在訓練模型時，使用 Transformer Decoders 中間的隱藏向量進行強化學習。`
                ]),
                html.img({
                    src: "./img/RL.png",
                    style: [css.w.percent(60)]
                })
            ])

        ),
    ]
})()