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
                        `關於將 GMM 使用於 SE 的可行性研究`, html.br(), html.br(),
                    ]),
                ]),
            ]),
        ),
    ]
})()