///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const todo = (() => {
    return [
        template.default_page(
            "Todo",
            html.div({ class: ["text-lg"], style: [css.p.t(1)] })([
                html.ul()([
                    html.li()([
                        `U-Net：2D Conv vs 1D Conv`, html.br(),
                    ]),
                    html.li()([
                        `更多 vector quantization 的實驗`, html.br(),
                    ]),
                    html.li()([
                        `是否能將語音的頻譜分解成多個 Gaussian Kernel，並將其用來解決 SE 問題`, html.br(), html.br(),
                    ]),
                ]),
            ]),
        ),
    ]
})()